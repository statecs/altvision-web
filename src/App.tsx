import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import TermsOfUse from './components/TermsOfUse';
import PrivacyPolicy from './components/PrivacyPolicy';
import placeholder from './images/placeholder.png';
import placeholder1 from './images/placeholder-1.png';

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
const HomePage = () => {
  const [currentImage, setCurrentImage] = React.useState(0);
  const images = [placeholder, placeholder1];

  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    if (isPaused) return; // Don't start the timer if paused

    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, images.length]); // Add both dependenciesncies

  return (
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
    
      <div className="mt-12 relative w-screen md:w-full -mx-4 md:mx-auto h-[600px] md:h-[800px]">
      <div 
        className="h-full animate-slide-up opacity-0 md:p-4 md:max-w-[1200px] md:mx-auto relative" 
        style={{ animationDelay: '0.6s' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {[placeholder, placeholder1].map((image, index) => (
          <img 
            key={index}
            src={image} 
            alt="App screenshot"
            className={`
              absolute top-0 left-0 w-full h-full object-cover rounded-none md:rounded-2xl
              transition-opacity duration-1000
              ${index === currentImage ? 'opacity-100' : 'opacity-0'}
            `}
          />
        ))}
      </div>
    </div>
  </section>

  <section className="py-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-300 mb-8 animate-slide-up opacity-0" style={{ animationDelay: '0.6s' }}>
            AltVision automatically generates precise alt text for your images by analyzing both the image and its surrounding context. The plugin considers headings, paragraphs, and captions near the image to create highly relevant descriptions. Stop spending hours writing manual descriptions – let AI do the heavy lifting!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mt-16">
          <div className="space-y-8 animate-slide-up opacity-0" style={{ animationDelay: '0.8s' }}>
            <h2 className="text-2xl font-bold text-blue-400">WordPress Plugin Features</h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <span className="mr-2">🎯</span>
                <span>One-click Generation: Generate intelligent alt text instantly</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🔌</span>
                <span>WordPress Ready: Seamless WordPress and Gutenberg integration</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🎨</span>
                <span>Format Support: Works with JPG, PNG, WebP, and more</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🔒</span>
                <span>Accessibility First: WCAG 2.1 compliance support</span>
              </li>
            </ul>
          </div>

          <div className="space-y-8 animate-slide-up opacity-0" style={{ animationDelay: '1s' }}>
            <h2 className="text-2xl font-bold text-blue-400">Chrome Extension Features</h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <span className="mr-2">🔍</span>
                <span>Alt Text Detection: Find and highlight images that need attention</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🧠</span>
                <span>Context-Aware: Create descriptive and accurate alternative texts using state-of-the-art AI</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🌍</span>
                <span>Multiple Languages: Available in English and Swedish</span>
              </li>
            </ul>
          </div>
        </div>
      </section>


   
    <Footer />
  </div>
  )
};

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