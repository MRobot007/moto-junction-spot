import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FeaturedBikes = () => {
  const bikes = [
    {
      name: "Harley Davidson Street 750",
      type: "Cruiser",
      power: "750cc",
      description: "Perfect for city rides and weekend getaways",
      image: "🏍️"
    },
    {
      name: "Yamaha YZF-R1",
      type: "Sport",
      power: "998cc",
      description: "Ultimate racing machine for track enthusiasts",
      image: "🏁"
    },
    {
      name: "BMW R1250GS",
      type: "Adventure",
      power: "1254cc",
      description: "Conquer any terrain with legendary adventure spirit",
      image: "🗻"
    }
  ];

  return (
    <section id="bikes" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured <span className="text-amber">Machines</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the latest and greatest motorcycles that define the spirit of the road
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {bikes.map((bike, index) => (
            <Card key={index} className="bg-card border-iron hover:border-amber transition-steel group hover:shadow-chrome">
              <CardHeader className="text-center pb-4">
                <div className="text-6xl mb-4">{bike.image}</div>
                <CardTitle className="text-xl text-foreground group-hover:text-amber transition-steel">
                  {bike.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {bike.type} • {bike.power}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6">{bike.description}</p>
                <Button variant="outline" className="border-iron text-foreground hover:bg-iron hover:text-amber w-full">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-gradient-accent text-obsidian hover:shadow-glow">
            Browse All Bikes
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBikes;