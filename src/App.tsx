/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Destinations } from './components/Destinations';
import { CampsitesAndHQ } from './components/CampsitesAndHQ';
import { About } from './components/About';
import { Stats } from './components/Stats';
import { VideoTour } from './components/VideoTour';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Blog } from './components/Blog';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { VideoModal } from './components/VideoModal';
import { BlogModal } from './components/BlogModal';
import { DestinationDetailModal } from './components/DestinationDetailModal';
import { PaymentQrModal } from './components/PaymentQrModal';
import { destinationsData, DestinationDetail, hqDetails } from './data/destinationsData';
import { allBlogsData, BlogPostDetail } from './data/blogData';

export type AppView = 'home' | 'packages' | 'upcoming' | 'blogs' | 'campsites' | 'story' | 'help' | 'terms' | 'privacy' | 'cookies' | 'gallery';

import { StoryView } from './components/StoryView';
import { HelpCenterView } from './components/HelpCenterView';
import { PolicyView } from './components/PolicyView';
import { BlogsPageView } from './components/BlogsPageView';
import { PackagesPageView } from './components/PackagesPageView';
import { UpcomingTripsPageView } from './components/UpcomingTripsPageView';
import { DocumentBrochureView } from './components/DocumentBrochureView';
import { CampsitesPageView } from './components/CampsitesPageView';
import { GalleryView } from './components/GalleryView';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState('Maharashtra Monsoon Trails');
  const [selectedPrice, setSelectedPrice] = useState('₹13,499');
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPostDetail | null>(null);
  const [selectedDestinationDetail, setSelectedDestinationDetail] = useState<DestinationDetail | null>(null);
  const [activeBlogSlug, setActiveBlogSlug] = useState<string | null>(null);

  // Check URL hash on initial load or popstate for SEO and deep-linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('destination-')) {
        const slug = hash.replace('destination-', '');
        const match = destinationsData.find(d => d.slug === slug || d.id === slug);
        if (match) {
          setSelectedDestinationDetail(match);
          setCurrentView('home');
        }
      } else if (hash.startsWith('blog-')) {
        const slug = hash.replace('blog-', '');
        const blogMatch = allBlogsData.find(b => b.slug === slug || b.id === slug);
        if (blogMatch) {
          setActiveBlogSlug(slug);
          setCurrentView('blogs');
        }
      } else if (hash === 'blogs' || hash === 'blog') {
        setActiveBlogSlug(null);
        setCurrentView('blogs');
      } else if (hash === 'upcoming' || hash === 'upcoming-itinerary' || hash === 'itinerary' || hash === 'dodham' || hash === 'dodham-yatra' || hash === 'upcoming-trips' || hash === 'batches') {
        setCurrentView('upcoming');
      } else if (hash === 'packages' || hash === 'destinations') {
        setCurrentView('packages');
      } else if (hash === 'gallery' || hash === 'photos') {
        setCurrentView('gallery');
      } else if (hash === 'campsites' || hash === 'campsites-hq') {
        setCurrentView('campsites');
      } else if (hash === 'pay' || hash === 'payment' || hash === 'upi') {
        setIsPaymentOpen(true);
      } else if (hash === 'terms' || hash === 'privacy' || hash === 'cookies' || hash === 'story' || hash === 'help') {
        setCurrentView(hash as AppView);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenBooking = (destination = 'Maharashtra Monsoon Trails', price = '₹13,499') => {
    setSelectedDestination(destination);
    setSelectedPrice(price);
    setIsBookingOpen(true);
  };

  const handleOpenPayment = () => {
    setIsPaymentOpen(true);
  };

  const handleSelectDestination = (dest: DestinationDetail) => {
    setSelectedDestinationDetail(dest);
    window.history.pushState(null, '', `#destination-${dest.slug}`);
  };

  const handleCloseDestinationModal = () => {
    setSelectedDestinationDetail(null);
    if (window.location.hash.startsWith('#destination-')) {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  const handleNavigate = (view: AppView, hash?: string) => {
    setCurrentView(view);
    if (view === 'home' && hash) {
      window.history.pushState(null, '', `#${hash}`);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 60);
    } else {
      if (view !== 'home') {
        window.history.pushState(null, '', `#${view}`);
      } else {
        window.history.pushState(null, '', window.location.pathname);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-emerald-100 selection:text-emerald-900 font-sans scroll-smooth flex flex-col justify-between">
      {/* Top Navbar */}
      <div className={currentView !== 'home' ? 'bg-slate-950 relative' : ''}>
        <Navbar 
          onOpenBooking={() => handleOpenBooking()} 
          onOpenPayment={handleOpenPayment}
          onNavigate={handleNavigate}
          activeView={currentView}
        />
      </div>
      
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero onOpenBooking={handleOpenBooking} />
            <Destinations 
              onOpenBooking={handleOpenBooking} 
              onSelectDestination={handleSelectDestination}
              onNavigateToPackages={() => handleNavigate('packages')}
            />
            <About onOpenBooking={() => handleOpenBooking('Maharashtra Monsoon Trails', '₹13,499')} />
            <Stats />
            <VideoTour onOpenVideo={() => setIsVideoOpen(true)} />
            <Testimonials />
            <FAQ />
            <CTA onOpenBooking={() => handleOpenBooking('Maharashtra Monsoon Trails', '₹13,499')} />
          </>
        )}

        {currentView === 'upcoming' && (
          <DocumentBrochureView
            onNavigateHome={() => handleNavigate('home')}
            onOpenGlobalBooking={handleOpenBooking}
            onOpenGlobalPayment={handleOpenPayment}
          />
        )}

        {currentView === 'packages' && (
          <PackagesPageView 
            onOpenBooking={handleOpenBooking}
            onSelectDestination={handleSelectDestination}
            onNavigateHome={handleNavigate}
          />
        )}

        {currentView === 'campsites' && (
          <CampsitesPageView 
            onOpenBooking={handleOpenBooking}
            onNavigateHome={handleNavigate}
          />
        )}

        {currentView === 'blogs' && (
          <BlogsPageView 
            onOpenBooking={(destTitle) => handleOpenBooking(destTitle || 'Maharashtra Monsoon Trails', '₹13,499')}
            onNavigateHome={handleNavigate}
            initialSelectedSlug={activeBlogSlug}
          />
        )}

        {currentView === 'gallery' && (
          <GalleryView 
            onNavigateHome={handleNavigate}
          />
        )}

        {currentView === 'story' && (
          <StoryView onOpenBooking={() => handleOpenBooking('Maharashtra Monsoon Trails', '₹13,499')} />
        )}

        {currentView === 'help' && (
          <HelpCenterView 
            onOpenBooking={() => handleOpenBooking()} 
            onOpenPaymentModal={handleOpenPayment}
          />
        )}

        {(currentView === 'terms' || currentView === 'privacy' || currentView === 'cookies') && (
          <PolicyView 
            key={currentView}
            initialTab={currentView} 
            onOpenBooking={() => handleOpenBooking()} 
            onTabChange={(tab) => setCurrentView(tab)}
          />
        )}
      </main>

      <Footer 
        onOpenBooking={handleOpenBooking} 
        onOpenPayment={handleOpenPayment}
        onNavigate={handleNavigate}
      />

      {/* Destination Story & Itinerary Deep-Dive Modal */}
      <DestinationDetailModal
        destination={selectedDestinationDetail}
        onClose={handleCloseDestinationModal}
        onOpenBooking={handleOpenBooking}
      />

      {/* Global Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialDestination={selectedDestination}
        initialPrice={selectedPrice}
      />

      {/* Global UPI QR & Payment Modal */}
      <PaymentQrModal
        isOpen={isPaymentOpen}
        onClose={() => {
          setIsPaymentOpen(false);
          if (window.location.hash === '#pay' || window.location.hash === '#payment' || window.location.hash === '#upi') {
            window.history.pushState(null, '', window.location.pathname);
          }
        }}
      />

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />

      <BlogModal
        post={selectedBlogPost}
        onClose={() => {
          setSelectedBlogPost(null);
          if (window.location.hash.startsWith('#blog-')) {
            window.history.pushState(null, '', window.location.pathname);
          }
        }}
        onOpenBooking={(destTitle) => {
          handleOpenBooking(destTitle || 'Maharashtra Monsoon Trails', '₹13,499');
        }}
      />
    </div>
  );
}
