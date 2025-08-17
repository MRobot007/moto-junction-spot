import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, ChevronLeft, ChevronRight, Settings, Share2, Heart } from 'lucide-react';

interface BikeData {
  name: string;
  type: string;
  power: string;
  price: string;
  horsepower: string;
  torque: string;
  topSpeed: string;
  zeroToSixty: string;
  description: string;
  image: string;
  features: string[];
  badge: string;
  availability: string;
}

interface GarageViewerProps {
  bike: BikeData;
  bikes: BikeData[];
  onClose: () => void;
  onBikeChange: (bike: BikeData) => void;
}

const GarageViewer: React.FC<GarageViewerProps> = ({ bike, bikes, onClose, onBikeChange }) => {
  const [currentBikeIndex, setCurrentBikeIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCurrentBikeIndex(bikes.findIndex(b => b.name === bike.name));
    
    // Initial entrance animation
    const tl = gsap.timeline();
    
    // Fade in background
    tl.fromTo('.garage-background', 
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" }
    );
    
    // Slide in bike image from left
    tl.fromTo('.bike-showcase', 
      { x: -100, opacity: 0, scale: 0.8 },
      { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
      0.3
    );
    
    // Slide in info panel from right
    tl.fromTo('.info-panel', 
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
      0.5
    );
    
    // Fade in controls
    tl.fromTo('.garage-controls', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      0.8
    );

    setIsLoading(false);
  }, [bike, bikes]);

  const handleBikeChange = (direction: 'prev' | 'next') => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    const currentIndex = bikes.findIndex(b => b.name === bike.name);
    let newIndex;

    if (direction === 'next') {
      newIndex = (currentIndex + 1) % bikes.length;
    } else {
      newIndex = currentIndex === 0 ? bikes.length - 1 : currentIndex - 1;
    }

    const newBike = bikes[newIndex];

    // Beautiful transition animation
    const tl = gsap.timeline();

    // Slide out current bike
    tl.to('.bike-showcase', {
      x: direction === 'next' ? -150 : 150,
      opacity: 0,
      scale: 0.9,
      duration: 0.6,
      ease: "power2.in"
    });

    // Slide out info panel
    tl.to('.info-panel', {
      x: direction === 'next' ? 150 : -150,
      opacity: 0,
      duration: 0.5,
      ease: "power2.in"
    }, 0.1);

    // Change bike data
    tl.call(() => {
      onBikeChange(newBike);
      setCurrentBikeIndex(newIndex);
    }, null, 0.6);

    // Slide in new bike from opposite side
    tl.fromTo('.bike-showcase', 
      { 
        x: direction === 'next' ? 150 : -150, 
        opacity: 0, 
        scale: 0.9 
      },
      { 
        x: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 0.8, 
        ease: "power3.out" 
      },
      0.8
    );

    // Slide in new info panel
    tl.fromTo('.info-panel', 
      { 
        x: direction === 'next' ? -150 : 150, 
        opacity: 0 
      },
      { 
        x: 0, 
        opacity: 1, 
        duration: 0.7, 
        ease: "power3.out" 
      },
      0.9
    );

    tl.call(() => {
      setIsTransitioning(false);
    }, null, 1.5);
  };

  const handleClose = () => {
    // Exit animation
    const tl = gsap.timeline();
    
    tl.to('.bike-showcase', {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: "power2.in"
    });
    
    tl.to('.info-panel', {
      x: 100,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in"
    }, 0.1);
    
    tl.to('.garage-controls', {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: "power2.in"
    }, 0.2);
    
    tl.to('.garage-background', {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: onClose
    }, 0.3);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-black to-gray-800 garage-background">
      {/* Loading Screen */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80">
          <div className="text-center">
            <div className="w-12 h-12 border-3 border-amber border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading Garage...</p>
          </div>
        </div>
      )}

      {/* Top Controls */}
      <div className="absolute top-0 left-0 right-0 p-6 z-20 garage-controls">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-white hover:bg-white/10 border border-white/20 backdrop-blur-sm"
            >
              <X className="w-6 h-6" />
            </Button>
            <h1 className="text-2xl font-bold text-white">Premium Garage</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 border border-white/20 backdrop-blur-sm"
            >
              <Heart className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 border border-white/20 backdrop-blur-sm"
            >
              <Share2 className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 border border-white/20 backdrop-blur-sm"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen p-6 pt-24">
        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Bike Showcase */}
          <div className="relative bike-showcase">
            <div className="relative group">
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber/20 via-transparent to-amber/20 rounded-3xl blur-3xl transform scale-110"></div>
              
              {/* Main bike image */}
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <img
                  src={bike.image}
                  alt={bike.name}
                  className="w-full h-auto object-contain transform transition-all duration-700 group-hover:scale-105"
                  style={{ filter: 'drop-shadow(0 20px 40px rgba(255, 191, 0, 0.3))' }}
                />
                
                {/* Floating badge */}
                <div className="absolute top-6 left-6">
                  <Badge className="bg-amber text-black font-semibold px-3 py-1 animate-pulse">
                    {bike.badge}
                  </Badge>
                </div>
                
                {/* Price tag */}
                <div className="absolute top-6 right-6 bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2 border border-amber/30">
                  <span className="text-amber font-bold text-xl">{bike.price}</span>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleBikeChange('prev')}
              disabled={isTransitioning}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-full bg-black/50 border-2 border-amber text-amber hover:bg-amber hover:text-black transition-all duration-300 backdrop-blur-sm disabled:opacity-50"
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleBikeChange('next')}
              disabled={isTransitioning}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-full bg-black/50 border-2 border-amber text-amber hover:bg-amber hover:text-black transition-all duration-300 backdrop-blur-sm disabled:opacity-50"
            >
              <ChevronRight className="w-8 h-8" />
            </Button>
          </div>

          {/* Information Panel */}
          <div className="info-panel">
            <div className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-white mb-3">{bike.name}</h2>
                <p className="text-amber text-xl font-medium">{bike.type} • {bike.power}</p>
                <p className="text-gray-300 mt-4 text-lg leading-relaxed">{bike.description}</p>
              </div>

              {/* Specifications Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 backdrop-blur-sm">
                  <div className="text-gray-400 text-sm mb-1">Power</div>
                  <div className="text-white font-bold text-lg">{bike.horsepower}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 backdrop-blur-sm">
                  <div className="text-gray-400 text-sm mb-1">Torque</div>
                  <div className="text-white font-bold text-lg">{bike.torque}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 backdrop-blur-sm">
                  <div className="text-gray-400 text-sm mb-1">Top Speed</div>
                  <div className="text-white font-bold text-lg">{bike.topSpeed}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 backdrop-blur-sm">
                  <div className="text-gray-400 text-sm mb-1">0-60 mph</div>
                  <div className="text-white font-bold text-lg">{bike.zeroToSixty}</div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-white font-semibold mb-4 text-lg">Key Features</h3>
                <div className="flex flex-wrap gap-2">
                  {bike.features.map((feature, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-amber/30 text-amber hover:bg-amber/10 backdrop-blur-sm"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button className="flex-1 bg-gradient-to-r from-amber to-orange-500 text-black font-semibold py-3 hover:shadow-lg hover:shadow-amber/25 transition-all duration-300">
                  Configure Now
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 border-amber text-amber hover:bg-amber hover:text-black py-3 transition-all duration-300"
                >
                  Schedule Test Ride
                </Button>
              </div>

              {/* Availability Status */}
              <div className="mt-6 text-center">
                <span className="text-green-400 font-medium">● {bike.availability}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Counter */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 garage-controls">
        <div className="bg-black/50 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
          <span className="text-amber font-semibold text-lg">
            {currentBikeIndex + 1} / {bikes.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GarageViewer;