import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const UpcomingEvents = () => {
  const events = [
    {
      title: "Thunder Valley Rally",
      date: "March 15-17, 2024",
      location: "Sturgis, SD",
      type: "Rally",
      description: "Three days of riding, music, and brotherhood in the legendary Black Hills",
      status: "Open"
    },
    {
      title: "Midnight Canyon Run",
      date: "March 22, 2024",
      location: "Grand Canyon, AZ",
      type: "Night Ride",
      description: "Experience the mystical beauty of canyon roads under starlit skies",
      status: "Limited"
    },
    {
      title: "Coastal Highway Adventure",
      date: "April 5-7, 2024",
      location: "Pacific Coast, CA",
      type: "Tour",
      description: "Scenic coastal riding with ocean views and mountain passes",
      status: "Open"
    }
  ];

  return (
    <section id="events" className="py-20 bg-charcoal">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Upcoming <span className="text-amber">Rides</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join fellow riders for unforgettable adventures and create memories that last a lifetime
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <Card key={index} className="bg-card border-iron hover:border-amber transition-steel group hover:shadow-glow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge 
                    variant={event.status === "Limited" ? "destructive" : "secondary"}
                    className={event.status === "Limited" ? "bg-ember text-obsidian" : "bg-iron text-chrome"}
                  >
                    {event.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{event.type}</span>
                </div>
                <CardTitle className="text-xl text-foreground group-hover:text-amber transition-steel">
                  {event.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {event.date} • {event.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{event.description}</p>
                <Button variant="outline" className="border-iron text-foreground hover:bg-iron hover:text-amber w-full">
                  Join Event
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-gradient-accent text-obsidian hover:shadow-glow">
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;