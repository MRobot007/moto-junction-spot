import { Button } from "@/components/ui/button";

const BikerPortalHeader = () => {
  return (
    <header className="bg-gradient-hero border-b border-iron">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center shadow-glow">
              <span className="text-obsidian font-bold text-xl">⚡</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">BikerZone</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#bikes" className="text-muted-foreground hover:text-amber transition-steel">Bikes</a>
            <a href="#events" className="text-muted-foreground hover:text-amber transition-steel">Events</a>
            <a href="#community" className="text-muted-foreground hover:text-amber transition-steel">Community</a>
            <a href="#gear" className="text-muted-foreground hover:text-amber transition-steel">Gear</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-iron text-foreground hover:bg-iron hover:text-amber">
              Login
            </Button>
            <Button className="bg-gradient-accent text-obsidian hover:shadow-glow">
              Join Crew
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BikerPortalHeader;