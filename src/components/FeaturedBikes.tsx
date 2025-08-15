import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import GarageViewer from "./GarageViewer";
import harleyStreet750 from "@/assets/harley-street-750.jpg";
import yamahaR1 from "@/assets/yamaha-r1.jpg";
import bmwR1250GS from "@/assets/bmw-r1250gs.jpg";
import ducatiPanigaleV4 from "@/assets/ducati-panigale-v4.jpg";
import hondaGoldWing from "@/assets/honda-goldwing.jpg";
import kawasakiNinjaH2 from "@/assets/kawasaki-ninja-h2.jpg";

const FeaturedBikes = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [selectedBike, setSelectedBike] = useState<any>(null);
  const [showGarage, setShowGarage] = useState(false);

  const bikes = [
    {
      name: "Harley Davidson Street 750",
      type: "Cruiser",
      power: "750cc",
      price: "$7,599",
      horsepower: "53 HP",
      torque: "59 Nm",
      topSpeed: "185 km/h",
      zeroToSixty: "4.2s",
      description: "Perfect for city rides and weekend getaways with classic American styling",
      image: harleyStreet750,
      features: ["LED Lighting", "Digital Display", "ABS Brakes"],
      badge: "Classic",
      availability: "In Stock"
    },
    {
      name: "Yamaha YZF-R1",
      type: "Sport",
      power: "998cc",
      price: "$17,399",
      horsepower: "200 HP",
      torque: "112 Nm",
      topSpeed: "299 km/h",
      zeroToSixty: "2.9s",
      description: "Ultimate racing machine for track enthusiasts with MotoGP technology",
      image: yamahaR1,
      features: ["Quick Shifter", "Traction Control", "Slide Control"],
      badge: "Track Ready",
      availability: "Limited Stock"
    },
    {
      name: "BMW R1250GS",
      type: "Adventure",
      power: "1254cc",
      price: "$17,895",
      horsepower: "136 HP",
      torque: "143 Nm",
      topSpeed: "200 km/h",
      zeroToSixty: "3.2s",
      description: "Conquer any terrain with legendary adventure spirit and cutting-edge tech",
      image: bmwR1250GS,
      features: ["Dynamic ESA", "Ride Modes", "Hill Start Control"],
      badge: "Adventure",
      availability: "In Stock"
    },
    {
      name: "Ducati Panigale V4",
      type: "Superbike",
      power: "1103cc",
      price: "$22,995",
      horsepower: "214 HP",
      torque: "124 Nm",
      topSpeed: "306 km/h",
      zeroToSixty: "2.8s",
      description: "Italian engineering masterpiece with MotoGP-derived V4 engine",
      image: ducatiPanigaleV4,
      features: ["Cornering ABS", "Wheelie Control", "Engine Brake Control"],
      badge: "Premium",
      availability: "Pre-Order"
    },
    {
      name: "Honda Gold Wing",
      type: "Touring",
      power: "1833cc",
      price: "$23,800",
      horsepower: "126 HP",
      torque: "170 Nm",
      topSpeed: "180 km/h",
      zeroToSixty: "3.8s",
      description: "Ultimate touring comfort with advanced technology and luxury features",
      image: hondaGoldWing,
      features: ["Apple CarPlay", "Airbag", "Heated Seats"],
      badge: "Luxury",
      availability: "In Stock"
    },
    {
      name: "Kawasaki Ninja H2",
      type: "Hypersport",
      power: "998cc",
      price: "$29,400",
      horsepower: "231 HP",
      torque: "141 Nm",
      topSpeed: "337 km/h",
      zeroToSixty: "2.5s",
      description: "Supercharged beast pushing the boundaries of motorcycle performance",
      image: kawasakiNinjaH2,
      features: ["Supercharged Engine", "Launch Control", "Carbon Fiber"],
      badge: "Exclusive",
      availability: "Special Order"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.bike-card-observer');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case 'Premium':
      case 'Exclusive':
        return 'default';
      case 'Track Ready':
        return 'secondary';
      case 'Adventure':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'In Stock':
        return 'text-green-400';
      case 'Limited Stock':
        return 'text-amber';
      case 'Pre-Order':
      case 'Special Order':
        return 'text-steel';
      default:
        return 'text-muted-foreground';
    }
  };

  const handleViewDetails = (bike: any) => {
    setSelectedBike(bike);
    setShowGarage(true);
  };

  const handleCloseGarage = () => {
    setShowGarage(false);
    setSelectedBike(null);
  };

  const handleBikeChange = (bike: any) => {
    setSelectedBike(bike);
  };

  return (
    <>
    <section id="bikes" className="relative py-20 bg-background overflow-hidden">
      {/* Parallax Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-accent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-gradient-steel rounded-full blur-3xl animate-float delay-300"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="text-reveal">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Premium <span className="bg-gradient-accent bg-clip-text text-transparent">Machines</span>
            </h2>
          </div>
          <div className="text-reveal delay-200">
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the finest motorcycles that define the pinnacle of engineering excellence and riding passion
            </p>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {bikes.map((bike, index) => (
            <div
              key={index}
              data-index={index}
              className={`bike-card-observer bike-card-3d group ${
                visibleCards.includes(index) ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <Card className="bike-card-inner bike-card-reflection bg-card/80 backdrop-blur-sm border-iron hover:border-amber transition-all duration-700 hover:shadow-3d group-hover:shadow-hover overflow-hidden">
                <div className="bike-image-container relative h-64">
                  <img
                    src={bike.image}
                    alt={bike.name}
                    className="bike-image-3d w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-3d-light opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Floating Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge 
                      variant={getBadgeVariant(bike.badge)}
                      className="bg-amber/90 text-obsidian border-0 animate-glow-pulse"
                    >
                      {bike.badge}
                    </Badge>
                  </div>

                  {/* Price Overlay */}
                  <div className="absolute top-4 right-4 bg-obsidian/80 backdrop-blur-sm rounded-lg px-3 py-1">
                    <span className="text-amber font-bold text-lg">{bike.price}</span>
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl text-foreground group-hover:text-amber transition-colors duration-500">
                      {bike.name}
                    </CardTitle>
                    <span className={`text-sm font-medium ${getAvailabilityColor(bike.availability)}`}>
                      {bike.availability}
                    </span>
                  </div>
                  <CardDescription className="text-muted-foreground">
                    {bike.type} • {bike.power}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">{bike.description}</p>
                  
                  {/* Performance Specs */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Power:</span>
                      <span className="text-foreground font-medium">{bike.horsepower}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Torque:</span>
                      <span className="text-foreground font-medium">{bike.torque}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Top Speed:</span>
                      <span className="text-foreground font-medium">{bike.topSpeed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">0-60 mph:</span>
                      <span className="text-foreground font-medium">{bike.zeroToSixty}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Key Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {bike.features.map((feature, featureIndex) => (
                        <Badge
                          key={featureIndex}
                          variant="outline"
                          className="text-xs border-iron/50 text-muted-foreground hover:border-amber hover:text-amber transition-colors"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      onClick={() => handleViewDetails(bike)}
                      className="flex-1 border-iron text-foreground hover:bg-amber hover:text-obsidian hover:border-amber transition-all duration-500"
                    >
                      View Details
                    </Button>
                    <Button 
                      className="flex-1 bg-gradient-accent text-obsidian hover:shadow-glow transition-all duration-500"
                    >
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="text-reveal delay-600">
            <Button size="lg" className="bg-gradient-accent text-obsidian hover:shadow-glow hover:scale-105 transition-all duration-500 px-8 py-3">
              Explore Full Collection
            </Button>
          </div>
        </div>
      </div>
    </section>

      {/* 3D Garage Viewer */}
      {showGarage && selectedBike && (
        <GarageViewer
          bike={selectedBike}
          bikes={bikes}
          onClose={handleCloseGarage}
          onBikeChange={handleBikeChange}
        />
      )}
    </>
  );
};

export default FeaturedBikes;