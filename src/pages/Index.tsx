
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StatsCard } from "@/components/StatsCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted">
      <Navbar />
      <Hero />
      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard />
          <StatsCard />
          <StatsCard />
        </div>
      </div>
    </div>
  );
};

export default Index;
