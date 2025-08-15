import BikerPortalHeader from "@/components/BikerPortalHeader";
import HeroSection from "@/components/HeroSection";
import FeaturedBikes from "@/components/FeaturedBikes";
import UpcomingEvents from "@/components/UpcomingEvents";
import CommunityHighlights from "@/components/CommunityHighlights";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <BikerPortalHeader />
      <HeroSection />
      <FeaturedBikes />
      <UpcomingEvents />
      <CommunityHighlights />
      <Footer />
    </div>
  );
};

export default Index;
