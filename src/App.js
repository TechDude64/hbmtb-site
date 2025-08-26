import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './components/Logo';
import YouTubeVideos from './components/YouTubeVideos';

// Simple SVG Icons
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const FilmIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
    <line x1="7" y1="2" x2="7" y2="22"></line>
    <line x1="17" y1="2" x2="17" y2="22"></line>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <line x1="2" y1="7" x2="7" y2="7"></line>
    <line x1="2" y1="17" x2="7" y2="17"></line>
    <line x1="17" y1="17" x2="22" y2="17"></line>
    <line x1="17" y1="7" x2="22" y2="7"></line>
  </svg>
);

const ShoppingBagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

function Sidebar() {
  const location = useLocation();
  const navItems = [
    { path: "/", label: "Home", icon: <HomeIcon /> },
    { path: "/videos", label: "Videos", icon: <FilmIcon /> },
    { path: "/merch", label: "Merch", icon: <ShoppingBagIcon /> },
    { path: "/about", label: "About", icon: <InfoIcon /> },
  ];

  const socialLinks = [
    { 
      url: "https://youtube.com/@hbmtb26", 
      icon: <YoutubeIcon />, 
      label: 'YouTube' 
    },
  ];

  return (
    <div className="fixed top-0 left-0 h-[100dvh] w-24 bg-hb-darker/95 backdrop-blur-sm flex flex-col items-center py-6 z-50 border-r border-hb-gray/50">
      <div className="flex flex-col items-center h-full w-full">
        <div className="flex flex-col items-center w-full">
          {/* Logo */}
          <div className="mb-8 flex justify-center w-full">
            <Logo size="lg" className="rounded-full overflow-hidden border-2 border-hb-gray-light w-12 h-12" />
          </div>
          {/* Navigation */}
          <nav className="flex flex-col items-center space-y-6 w-full px-1">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`flex flex-col items-center group transition-all duration-200 w-full ${
                  // eslint-disable-next-line no-restricted-globals
                  location.pathname === item.path 
                    ? 'text-hb-blue hover:text-hb-blue-light' 
                    : 'text-hb-light/60 hover:text-hb-light hover:scale-105'
                }`}
              >
                <div className={`p-1.5 rounded-lg transition-all duration-200 ${
                  // eslint-disable-next-line no-restricted-globals
                  location.pathname === item.path 
                    ? 'bg-hb-gray-light/50' 
                    : 'group-hover:bg-hb-gray/30'
                }`}>
                  {item.icon && React.cloneElement(item.icon, { className: 'w-6 h-6' })}
                </div>
                <span className="text-[10px] mt-1 text-center leading-tight">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
      {/* Social Links */}
      <div className="mt-auto w-full flex flex-col items-center space-y-4 pt-4 border-t border-hb-gray/30 px-2">
        {socialLinks.map((social) => (
          <a 
            key={social.url}
            href={social.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-hb-light/50 hover:text-hb-blue hover:scale-110 transition-all duration-200"
            aria-label={social.label}
          >
            {social.icon && React.cloneElement(social.icon, { className: 'w-5 h-5' })}
          </a>
        ))}
      </div>
    </div>
  );
}

function Home() {
  const merchItems = [
    { id: 1, name: "HBMTB T-Shirt", image: "https://via.placeholder.com/300x300/1A1A1A/FFFFFF?text=HBMTB+Shirt" },
    { id: 2, name: "HBMTB Cap", image: "https://via.placeholder.com/300x300/1A1A1A/1E88E5?text=HBMTB+Cap" },
    { id: 3, name: "HBMTB Bottle", image: "https://via.placeholder.com/300x300/1A1A1A/FFFFFF?text=HBMTB+Bottle" },
    { id: 4, name: "HBMTB Gloves", image: "https://via.placeholder.com/300x300/1A1A1A/1E88E5?text=HBMTB+Gloves" },
    { id: 5, name: "HBMTB Jersey", image: "https://via.placeholder.com/300x300/1A1A1A/FFFFFF?text=HBMTB+Jersey" }
  ];
  const scrollingMerch = [...merchItems, ...merchItems]; // Duplicate for seamless scroll

  return (
    <motion.div 
      className="w-full max-w-full px-4 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="mb-16">
        <div className="bg-gradient-to-r from-hb-blue/5 to-hb-darker/80 p-8 rounded-2xl border border-hb-gray/30 shadow-lg">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-hb-blue/80 bg-clip-text text-transparent">
            Ride Hard.<br />Ride Free.
          </h1>
          <p className="text-xl text-hb-light/80 mb-8 max-w-2xl">
            Join the HBMTB community for epic mountain biking adventures, gear reviews, and trail guides.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="https://youtube.com/@hbmtb26" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn bg-hb-blue hover:bg-hb-blue/90 text-white"
            >
              Watch on YouTube
            </a>
            <Link 
              to="/videos" 
              className="btn border border-hb-light/20 hover:bg-hb-light/5 text-hb-light"
            >
              Browse Videos
            </Link>
          </div>
        </div>
      </section>

      {/* Scrolling Merch Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <span className="w-2 h-6 bg-hb-blue rounded-full mr-3"></span>
          Featured Merch
        </h2>
        <div className="relative h-64 overflow-hidden bg-hb-gray/20 rounded-2xl border border-hb-gray/30 group">
          <div className="absolute top-0 left-0 flex items-center animate-scroll group-hover:pause">
            {scrollingMerch.map((item, i) => (
              <div key={i} className="flex-shrink-0 w-64 mx-4">
                <div className="bg-hb-gray/50 rounded-xl p-4">
                  <img src={item.image} alt={item.name} className="w-full h-auto rounded-lg" />
                  <p className="text-center mt-2 text-sm text-hb-light/80">{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <span className="w-2 h-6 bg-hb-blue rounded-full mr-3"></span>
            Latest Videos
          </h2>
          <Link to="/videos" className="text-hb-blue hover:underline flex items-center text-sm">
            View All 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </Link>
        </div>
        
        <YouTubeVideos />
      </section>
    </motion.div>
  );
}

function Videos() {
  return (
    <div className="w-full py-8">
      <div className="w-full max-w-[1600px] mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4 text-hb-light">Videos</h1>
        <p className="text-hb-light/70 mb-8">Watch our latest mountain biking adventures, tutorials, and more.</p>
        <YouTubeVideos />
      </div>
    </div>
  );
}

function Merch() {
  const products = [
    {
      id: 1,
      name: 'HBMTB T-Shirt',
      price: '$29.99',
      image: 'https://via.placeholder.com/400x400/1A1A1A/FFFFFF?text=HBMTB+Shirt',
      colors: ['#000000', '#1E88E5', '#FFFFFF'],
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 2,
      name: 'HBMTB Cap',
      price: '$24.99',
      image: 'https://via.placeholder.com/300x300/1A1A1A/1E88E5?text=HBMTB+Cap',
      colors: ['#000000', '#1A1A1A'],
      sizes: ['One Size']
    }
  ];

  return (
    <div className="w-full py-8">
      <motion.div 
        className="w-full max-w-[1600px] mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-hb-light">HBMTB Merch</h1>
          <p className="text-hb-light/70">Gear up with official HBMTB merchandise</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-hb-gray/30 rounded-xl overflow-hidden border border-hb-gray/30 hover:border-hb-blue/50 transition-colors">
              <div className="aspect-square bg-hb-gray">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-hb-light mb-2">{product.name}</h3>
                <p className="text-hb-blue text-lg font-medium mb-4">{product.price}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-hb-light/70 mb-2">Colors</h4>
                  <div className="flex space-x-2">
                    {product.colors.map((color, idx) => (
                      <div 
                        key={idx}
                        className="w-6 h-6 rounded-full border border-hb-gray/50"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-hb-light/70 mb-2">Sizes</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 text-xs rounded-full bg-hb-gray/50 text-hb-light"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="w-full py-2 bg-hb-blue hover:bg-hb-blue-dark text-white rounded-lg transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function About() {
  const stats = [
    { value: "500K+", label: "Subscribers" },
    { value: "50M+", label: "Views" },
    { value: "1000+", label: "Trails Ridden" },
    { value: "7", label: "Years Riding" }
  ];

  const features = [
    {
      title: "Epic Rides",
      description: "Join me on the most thrilling mountain bike trails around the world.",
      icon: (
        <svg className="w-8 h-8 text-hb-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Pro Tips",
      description: "Learn from my years of experience with in-depth tutorials and technique guides.",
      icon: (
        <svg className="w-8 h-8 text-hb-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: "Gear Reviews",
      description: "Honest reviews of the latest mountain biking gear and equipment.",
      icon: (
        <svg className="w-8 h-8 text-hb-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      title: "Community",
      description: "Join a growing community of passionate mountain bikers.",
      icon: (
        <svg className="w-8 h-8 text-hb-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="w-full py-8">
      <motion.div
        className="w-full max-w-[1600px] mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-hb-blue to-hb-blue-light bg-clip-text text-transparent mb-4">
            Ride With Purpose
          </h1>
          <p className="text-xl text-hb-light/80 max-w-3xl">
            Sharing the stoke of mountain biking through epic adventures, helpful tutorials, and honest gear reviews.
          </p>
        </div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="bg-hb-gray/30 p-6 rounded-2xl shadow-md text-center border border-hb-gray/50">
              <div className="text-3xl font-bold text-hb-blue mb-2">{stat.value}</div>
              <div className="text-hb-light/70">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-hb-gray/30 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all border border-hb-gray/50 hover:border-hb-blue/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-hb-blue/10 p-2 rounded-lg mr-4">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-hb-light/80">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* About Text */}
        <motion.div 
          className="bg-hb-gray/30 p-8 rounded-2xl shadow-md mb-12 border border-hb-gray/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-hb-light">My Story</h2>
          <div className="prose max-w-none text-hb-light/80 space-y-4 prose-headings:text-hb-light prose-strong:text-hb-light">
            <p>
              What started as a weekend hobby quickly turned into a full-blown passion. I picked up my first mountain bike seven years ago, and I've been hooked ever since. There's something magical about the combination of speed, skill, and nature that keeps me coming back to the trails.
            </p>
            <p>
              I created HBMTB to share this passion with others. Whether you're a seasoned rider or just getting started, my goal is to inspire, educate, and entertain. Through my videos, I want to show the world the incredible experiences that mountain biking offers and help others improve their skills along the way.
            </p>
            <p>
              When I'm not riding or filming, you can find me tinkering with bikes, planning the next adventure, or connecting with the amazing MTB community. Thanks for being part of this journey!
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="bg-gradient-to-r from-hb-blue to-hb-blue-dark rounded-2xl p-8 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">Ready to Ride?</h2>
          <p className="mb-6 text-blue-100 max-w-2xl mx-auto">
            Join the HBMTB community and never miss an adventure. Subscribe to the channel and hit the notification bell for the latest videos!
          </p>
          <a 
            href="https://youtube.com/@hbmtb26" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-hb-blue bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors"
          >
            <svg className="w-5 h-5 mr-2 text-hb-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"></path>
            </svg>
            Subscribe on YouTube
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  return (
    <div className="min-h-screen flex w-full bg-hb-dark text-hb-light">
      <Sidebar />
      <main className="flex-1 h-[100dvh] overflow-y-auto overflow-x-hidden bg-hb-dark pl-24">
        <div className="w-full max-w-[1600px] mx-auto px-4 py-4">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/merch" element={<Merch />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </AnimatePresence>
          
          {/* Footer */}
          <footer className="border-t border-hb-gray/30 mt-16 py-8 bg-hb-darker/50">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center space-x-3">
                  <div className="rounded-full overflow-hidden border-2 border-hb-gray-light">
                    <Logo size="sm" className="w-10 h-10" />
                  </div>
                  <span className="text-xl font-bold text-hb-light">HBMTB</span>
                  </div>
                  <p className="text-sm text-hb-light/50 mt-2">© {new Date().getFullYear()} HBMTB. All rights reserved.</p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                  {[
                    { name: 'Home', path: '/' },
                    { name: 'Videos', path: '/videos' },
                    { name: 'Merch', path: '/merch' },
                    { name: 'About', path: '/about' },
                  ].map((item) => (
                    <Link 
                      key={item.name}
                      to={item.path}
                      className="text-hb-light/60 hover:text-hb-red transition-colors hover:scale-105 transform"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </footer>
          </div>
        </main>
      </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
