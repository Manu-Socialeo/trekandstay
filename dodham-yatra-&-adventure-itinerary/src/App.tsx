import React from 'react';
import { DocumentBrochureView } from './components/DocumentBrochureView';

export default function App() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 selection:bg-amber-600 selection:text-white">
      <DocumentBrochureView />
    </div>
  );
}
