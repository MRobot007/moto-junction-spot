import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bike.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-75"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
          <span className="text-amber">Ride</span> Beyond <br />
          <span className="text-chrome">Limits</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join the ultimate community of passionate bikers. Discover epic routes, 
          connect with fellow riders, and live the freedom of the open road.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-gradient-accent text-obsidian hover:shadow-glow text-lg px-8 py-6 transition-steel"
          >
            Start Your Journey
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-chrome text-chrome hover:bg-chrome hover:text-obsidian text-lg px-8 py-6 transition-steel"
          >
            Explore Routes
          </Button>
        </div>
        
        {/* Stats */}
        <div className="mt-12 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-amber">12K+</div>
            <div className="text-sm text-muted-foreground">Active Riders</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber">500+</div>
            <div className="text-sm text-muted-foreground">Epic Routes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber">50+</div>
            <div className="text-sm text-muted-foreground">Weekly Events</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;