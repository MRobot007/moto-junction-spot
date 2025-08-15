import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CommunityHighlights = () => {
  const highlights = [
    {
      title: "Route of the Week",
      author: "Mike Thunder",
      content: "Just discovered this incredible mountain pass in Colorado. 200 miles of pure riding bliss!",
      likes: 247,
      comments: 34,
      avatar: "MT"
    },
    {
      title: "New Member Spotlight",
      author: "Sarah Wheels",
      content: "Finally got my first bike! Thanks to everyone in the community for the amazing advice.",
      likes: 189,
      comments: 56,
      avatar: "SW"
    },
    {
      title: "Safety Tip Tuesday",
      author: "Road Captain Joe",
      content: "Always check your tire pressure before long rides. It could save your life!",
      likes: 312,
      comments: 23,
      avatar: "RJ"
    }
  ];

  return (
    <section id="community" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Community <span className="text-amber">Stories</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what our riders are sharing, learning, and experiencing on the road
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <Card key={index} className="bg-card border-iron hover:border-amber transition-steel group hover:shadow-chrome">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="border-2 border-iron">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-charcoal text-amber font-bold">
                      {highlight.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg text-foreground">{highlight.author}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {highlight.title}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{highlight.content}</p>
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <span>🔥</span>
                    <span>{highlight.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>💬</span>
                    <span>{highlight.comments}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="bg-charcoal rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Join the <span className="text-amber">Brotherhood?</span>
            </h3>
            <p className="text-muted-foreground mb-6">
              Connect with thousands of passionate riders, share your adventures, and discover new horizons.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-accent text-obsidian px-6 py-3 rounded-lg font-semibold hover:shadow-glow transition-steel">
                Join Community
              </button>
              <button className="border border-iron text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-iron hover:text-amber transition-steel">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityHighlights;