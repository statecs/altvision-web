import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import TermsOfUse from './components/TermsOfUse';
import PrivacyPolicy from './components/PrivacyPolicy';
import placeholder from './images/placeholder.png';

// Navigation Component
const Navigation = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="flex justify-between items-center p-4 bg-gray-900 border-b border-gray-800">
      <Link to="/" className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
        <span className="font-semibold">AltVision</span>
      </Link>
    </header>
  );
};

// Home Page
const HomePage = () => (
  <div className="container mx-auto px-4">
  <section className="pt-16 text-center">
    <h1 className="text-4xl font-bold mb-8 animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
    Make the web accessible<br />with AI-powered alt text
    </h1>
    <div className="mx-2 flex gap-4 justify-center">
      <a 
          href="https://wordpress.org/plugins/altvision-ai-alt-text-generator/"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium mt-4 animate-slide-up opacity-0 hover:bg-blue-700 transition-colors"
          style={{ animationDelay: '0.4s' }}
        >
          Wordpress Plugin
        </a>
        <a 
          href="https://chromewebstore.google.com/detail/altvision/iogpbgncdhijknmmhkllijfaioecfcoa"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium mt-4 animate-slide-up opacity-0 hover:bg-blue-700 transition-colors"
          style={{ animationDelay: '0.4s' }}
        >
          Chrome Extension
        </a>
      </div>
    
    <div className="mt-12 relative w-screen md:w-full -mx-4 md:mx-auto h-[600px] md:h-[800px]"> {/* Full screen width only on mobile */}
      <div 
        className="h-full animate-slide-up opacity-0 md:p-4 md:max-w-[1200px] md:mx-auto" 
        style={{ animationDelay: '0.6s' }}
      >
        <img 
          src={placeholder} 
          alt="App screenshot"
          className="w-full h-full object-cover rounded-none md:rounded-2xl" 
        />
      </div>
    </div>
  </section>

  <section className="pb-16 mt-16"> {/* Changed py-16 to py-32 and added mt-16 */}
      <div className="flex flex-col md:flex-row justify-center md:space-x-8 space-y-8 md:space-y-0 mb-8 items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left animate-slide-up opacity-0" style={{ animationDelay: '0.8s' }}>
        Empowering creators to build<br/>a more inclusive web experience
        </h1>
        <div className="flex gap-8 md:gap-12 animate-slide-up opacity-0" style={{ animationDelay: '1s' }}>
          <div className="text-center">
            <div className="text-blue-400 text-4xl md:text-5xl font-bold">1k+</div>
            <div className="text-gray-400 mt-2">Images processed</div>
          </div>
          <div className="text-center">
            <div className="text-blue-400 text-4xl md:text-5xl font-bold">4.9</div>
            <div className="text-gray-400 mt-2">Rating out of 5</div>
          </div>
        </div>
      </div>
    </section>


   
    <Footer />
  </div>
);

// Terms Page
const TermsPage = () => (
  <TermsOfUse />
);

// Privacy Page
const PrivacyPage = () => (
  <PrivacyPolicy />
);



// Main App Component
const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;