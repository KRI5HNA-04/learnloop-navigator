
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight hero-gradient bg-clip-text text-transparent">
          Your Personalized Learning Journey Starts Here
        </h1>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Discover the perfect path to master any technology. Learn, track progress,
          and compete with others in your learning journey.
        </p>
        <div className="max-w-xl mx-auto relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Search for any technology or topic..."
            className="w-full pl-12 pr-4 py-3 rounded-full border bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
          <Button 
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-primary hover:bg-primary/90 transition-all"
          >
            Explore
          </Button>
        </div>
        <div className="mt-12 flex items-center justify-center space-x-8">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">1000+</p>
            <p className="text-sm text-muted-foreground">Learning Paths</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">50K+</p>
            <p className="text-sm text-muted-foreground">Active Learners</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">95%</p>
            <p className="text-sm text-muted-foreground">Success Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};
