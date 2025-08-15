const Footer = () => {
  return (
    <footer className="bg-obsidian border-t border-iron py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center shadow-glow">
                <span className="text-obsidian font-bold text-xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground">BikerZone</h3>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              The ultimate destination for motorcycle enthusiasts. Join our community and 
              experience the freedom of the open road.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-charcoal rounded-lg flex items-center justify-center hover:bg-amber hover:text-obsidian transition-steel cursor-pointer">
                <span>📘</span>
              </div>
              <div className="w-10 h-10 bg-charcoal rounded-lg flex items-center justify-center hover:bg-amber hover:text-obsidian transition-steel cursor-pointer">
                <span>📷</span>
              </div>
              <div className="w-10 h-10 bg-charcoal rounded-lg flex items-center justify-center hover:bg-amber hover:text-obsidian transition-steel cursor-pointer">
                <span>🐦</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#bikes" className="text-muted-foreground hover:text-amber transition-steel">Motorcycles</a></li>
              <li><a href="#events" className="text-muted-foreground hover:text-amber transition-steel">Events</a></li>
              <li><a href="#community" className="text-muted-foreground hover:text-amber transition-steel">Community</a></li>
              <li><a href="#gear" className="text-muted-foreground hover:text-amber transition-steel">Gear</a></li>
              <li><a href="#routes" className="text-muted-foreground hover:text-amber transition-steel">Routes</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-amber transition-steel">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-amber transition-steel">Safety Tips</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-amber transition-steel">Contact Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-amber transition-steel">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-amber transition-steel">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-iron mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 BikerZone. All rights reserved. Ride safe, ride free.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;