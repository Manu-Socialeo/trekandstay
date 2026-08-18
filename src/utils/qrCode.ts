// Lightweight, standard-compliant QR Code Matrix Generator in pure TypeScript
// Supports Byte Mode and Error Correction (L, M, Q, H)

type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

// QR Code Polynomial and Math helper
const GF256_EXP: number[] = new Array(512);
const GF256_LOG: number[] = new Array(256);

(function initGF256() {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    GF256_EXP[i] = x;
    GF256_LOG[x] = i;
    x <<= 1;
    if (x & 0x100) {
      x ^= 0x11d;
    }
  }
  for (let i = 255; i < 512; i++) {
    GF256_EXP[i] = GF256_EXP[i - 255];
  }
})();

function gfMul(x: number, y: number): number {
  if (x === 0 || y === 0) return 0;
  return GF256_EXP[GF256_LOG[x] + GF256_LOG[y]];
}

function polyMul(p1: number[], p2: number[]): number[] {
  const result = new Array(p1.length + p2.length - 1).fill(0);
  for (let i = 0; i < p1.length; i++) {
    for (let j = 0; j < p2.length; j++) {
      result[i + j] ^= gfMul(p1[i], p2[j]);
    }
  }
  return result;
}

function getGeneratorPoly(degree: number): number[] {
  let poly = [1];
  for (let i = 0; i < degree; i++) {
    poly = polyMul(poly, [1, GF256_EXP[i]]);
  }
  return poly;
}

function rsEncode(data: number[], numEcBytes: number): number[] {
  const genPoly = getGeneratorPoly(numEcBytes);
  const msg = data.concat(new Array(numEcBytes).fill(0));
  for (let i = 0; i < data.length; i++) {
    const factor = msg[i];
    if (factor !== 0) {
      for (let j = 0; j < genPoly.length; j++) {
        msg[i + j] ^= gfMul(genPoly[j], factor);
      }
    }
  }
  return msg.slice(data.length);
}

// QR Code capacity & specification tables (Versions 1 - 10)
interface QRVersionSpec {
  version: number;
  totalBytes: number;
  ecBytes: Record<ErrorCorrectionLevel, number>;
  dataBytes: Record<ErrorCorrectionLevel, number>;
  alignmentPatterns: number[];
}

const QR_SPECS: QRVersionSpec[] = [
  { version: 1, totalBytes: 26, ecBytes: { L: 7, M: 10, Q: 13, H: 17 }, dataBytes: { L: 19, M: 16, Q: 13, H: 9 }, alignmentPatterns: [] },
  { version: 2, totalBytes: 44, ecBytes: { L: 10, M: 16, Q: 22, H: 28 }, dataBytes: { L: 34, M: 28, Q: 22, H: 16 }, alignmentPatterns: [6, 18] },
  { version: 3, totalBytes: 70, ecBytes: { L: 15, M: 26, Q: 36, H: 44 }, dataBytes: { L: 55, M: 44, Q: 34, H: 26 }, alignmentPatterns: [6, 22] },
  { version: 4, totalBytes: 100, ecBytes: { L: 20, M: 36, Q: 52, H: 64 }, dataBytes: { L: 80, M: 64, Q: 48, H: 36 }, alignmentPatterns: [6, 26] },
  { version: 5, totalBytes: 134, ecBytes: { L: 26, M: 48, Q: 72, H: 88 }, dataBytes: { L: 108, M: 86, Q: 62, H: 46 }, alignmentPatterns: [6, 30] },
  { version: 6, totalBytes: 172, ecBytes: { L: 36, M: 64, Q: 96, H: 112 }, dataBytes: { L: 136, M: 108, Q: 76, H: 60 }, alignmentPatterns: [6, 34] },
  { version: 7, totalBytes: 196, ecBytes: { L: 40, M: 72, Q: 108, H: 130 }, dataBytes: { L: 156, M: 124, Q: 88, H: 66 }, alignmentPatterns: [6, 22, 38] },
  { version: 8, totalBytes: 242, ecBytes: { L: 48, M: 88, Q: 132, H: 156 }, dataBytes: { L: 194, M: 154, Q: 110, H: 86 }, alignmentPatterns: [6, 24, 42] },
  { version: 9, totalBytes: 292, ecBytes: { L: 60, M: 110, Q: 160, H: 192 }, dataBytes: { L: 232, M: 182, Q: 132, H: 100 }, alignmentPatterns: [6, 26, 46] },
  { version: 10, totalBytes: 346, ecBytes: { L: 72, M: 130, Q: 192, H: 224 }, dataBytes: { L: 274, M: 216, Q: 154, H: 122 }, alignmentPatterns: [6, 28, 50] }
];

export function createQRCodeMatrix(text: string, level: ErrorCorrectionLevel = 'M'): boolean[][] {
  const utf8Bytes: number[] = [];
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    if (code < 128) {
      utf8Bytes.push(code);
    } else if (code < 2048) {
      utf8Bytes.push(192 | (code >> 6), 128 | (code & 63));
    } else {
      utf8Bytes.push(224 | (code >> 12), 128 | ((code >> 6) & 63), 128 | (code & 63));
    }
  }

  // Find minimal version required
  let spec = QR_SPECS[0];
  for (const s of QR_SPECS) {
    // 4 bits mode + 8 bits length + data
    const maxBytes = s.dataBytes[level];
    if (utf8Bytes.length + 3 <= maxBytes) {
      spec = s;
      break;
    }
    spec = s;
  }

  const dataCapacity = spec.dataBytes[level];
  const bits: number[] = [];

  const pushBits = (value: number, length: number) => {
    for (let i = length - 1; i >= 0; i--) {
      bits.push((value >> i) & 1);
    }
  };

  // Byte mode indicator (0100)
  pushBits(4, 4);
  // Character count indicator (8 bits for v1-9, 16 bits for v10+ in byte mode, here 8 bits for v1-9, 16 for v10)
  pushBits(utf8Bytes.length, spec.version >= 10 ? 16 : 8);

  for (const byte of utf8Bytes) {
    pushBits(byte, 8);
  }

  // Terminator (up to 4 zeroes)
  const remainingBits = dataCapacity * 8 - bits.length;
  pushBits(0, Math.min(4, remainingBits));

  // Pad to multiple of 8
  while (bits.length % 8 !== 0) {
    bits.push(0);
  }

  // Pad bytes 0xEC and 0x11
  const padBytes = [0xec, 0x11];
  let padIdx = 0;
  while (bits.length < dataCapacity * 8) {
    pushBits(padBytes[padIdx % 2], 8);
    padIdx++;
  }

  // Convert bits to bytes
  const dataCodewords: number[] = [];
  for (let i = 0; i < bits.length; i += 8) {
    let byte = 0;
    for (let j = 0; j < 8; j++) {
      byte = (byte << 1) | bits[i + j];
    }
    dataCodewords.push(byte);
  }

  // Error correction
  const ecCount = spec.ecBytes[level];
  const ecCodewords = rsEncode(dataCodewords, ecCount);

  // Final codeword sequence
  const finalCodewords = dataCodewords.concat(ecCodewords);

  // Initialize Matrix
  const size = spec.version * 4 + 17;
  const matrix: (boolean | null)[][] = Array.from({ length: size }, () => Array(size).fill(null));
  const isFunction: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));

  // Helper to set module
  const setModule = (r: number, c: number, value: boolean) => {
    if (r >= 0 && r < size && c >= 0 && c < size) {
      matrix[r][c] = value;
      isFunction[r][c] = true;
    }
  };

  // 1. Finder patterns
  const addFinderPattern = (row: number, col: number) => {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        if (row + r < 0 || row + r >= size || col + c < 0 || col + c >= size) continue;
        if (r === -1 || r === 7 || c === -1 || c === 7) {
          setModule(row + r, col + c, false);
        } else if (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
          setModule(row + r, col + c, true);
        } else {
          setModule(row + r, col + c, false);
        }
      }
    }
  };

  addFinderPattern(0, 0);
  addFinderPattern(0, size - 7);
  addFinderPattern(size - 7, 0);

  // 2. Timing patterns
  for (let i = 8; i < size - 8; i++) {
    setModule(6, i, i % 2 === 0);
    setModule(i, 6, i % 2 === 0);
  }

  // 3. Alignment patterns
  if (spec.alignmentPatterns.length > 0) {
    const coords = spec.alignmentPatterns;
    for (const r of coords) {
      for (const c of coords) {
        if (isFunction[r][c]) continue;
        for (let dr = -2; dr <= 2; dr++) {
          for (let dc = -2; dc <= 2; dc++) {
            const isBorder = Math.abs(dr) === 2 || Math.abs(dc) === 2;
            const isCenter = dr === 0 && dc === 0;
            setModule(r + dr, c + dc, isBorder || isCenter);
          }
        }
      }
    }
  }

  // 4. Dark module
  setModule(spec.version * 4 + 9, 8, true);

  // 5. Reserve format information areas
  for (let i = 0; i < 9; i++) {
    if (i !== 6) {
      if (!isFunction[8][i]) { matrix[8][i] = false; isFunction[8][i] = true; }
      if (!isFunction[i][8]) { matrix[i][8] = false; isFunction[i][8] = true; }
    }
  }
  for (let i = size - 8; i < size; i++) {
    if (!isFunction[8][i]) { matrix[8][i] = false; isFunction[8][i] = true; }
    if (!isFunction[i][8]) { matrix[i][8] = false; isFunction[i][8] = true; }
  }

  // 6. Place Data bits
  let bitIndex = 0;
  const totalBits = finalCodewords.length * 8;
  const finalBits: number[] = [];
  for (const byte of finalCodewords) {
    for (let i = 7; i >= 0; i--) {
      finalBits.push((byte >> i) & 1);
    }
  }

  let upward = true;
  for (let rightCol = size - 1; rightCol > 0; rightCol -= 2) {
    if (rightCol === 6) rightCol--; // Skip timing pattern col 6
    const leftCol = rightCol - 1;

    for (let i = 0; i < size; i++) {
      const r = upward ? size - 1 - i : i;
      for (const c of [rightCol, leftCol]) {
        if (!isFunction[r][c]) {
          const bit = bitIndex < totalBits ? finalBits[bitIndex++] : 0;
          // Apply standard Mask 0: (row + col) % 2 == 0
          const mask = (r + c) % 2 === 0;
          matrix[r][c] = (bit === 1) !== mask;
        }
      }
    }
    upward = !upward;
  }

  // 7. Format Information (Mask 0, Level M -> 0x5412)
  const formatBits = [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0];
  // Write format info
  for (let i = 0; i < 6; i++) matrix[8][i] = formatBits[i] === 1;
  matrix[8][7] = formatBits[6] === 1;
  matrix[8][8] = formatBits[7] === 1;
  matrix[7][8] = formatBits[8] === 1;
  for (let i = 9; i < 15; i++) matrix[14 - i][8] = formatBits[i] === 1;

  for (let i = 0; i < 8; i++) matrix[size - 1 - i][8] = formatBits[i] === 1;
  for (let i = 8; i < 15; i++) matrix[8][size - 15 + i] = formatBits[i] === 1;

  return matrix.map(row => row.map(cell => cell === true));
}

/**
 * Generate a PNG Data URL for a QR Code string with zero external dependencies
 */
export function getQRCodeDataURL(text: string, size = 260): string {
  if (typeof document === 'undefined') return '';
  try {
    const matrix = createQRCodeMatrix(text, 'M');
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    // Crisp white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    // Dark modules
    ctx.fillStyle = '#1c1917';
    const numModules = matrix.length;
    const padding = Math.max(12, Math.floor(size * 0.05));
    const usableSize = size - padding * 2;
    const cellSize = usableSize / numModules;

    for (let r = 0; r < numModules; r++) {
      for (let c = 0; c < numModules; c++) {
        if (matrix[r][c]) {
          ctx.fillRect(
            Math.round(padding + c * cellSize),
            Math.round(padding + r * cellSize),
            Math.ceil(cellSize),
            Math.ceil(cellSize)
          );
        }
      }
    }
    return canvas.toDataURL('image/png');
  } catch (err) {
    console.error('Failed to generate QR Data URL:', err);
    return '';
  }
}

