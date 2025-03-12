
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StatsCard } from "@/components/StatsCard";
import { CourseCard } from "@/components/CourseCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted">
      <Navbar />
      <Hero />
      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Stats Section - Left Side */}
          <div className="lg:col-span-1 space-y-6">
            <StatsCard 
              title="Current Streak"
              value="15"
              unit="Days"
              progress={75}
              details={["Next reward in 5 days", "Current rank: #42"]}
            />
            <StatsCard 
              title="Total Rewards"
              value="2,500"
              unit="Coins"
              progress={65}
              details={["Silver tier reached", "Next tier: 500 coins away"]}
            />
            <StatsCard 
              title="Completion Rate"
              value="85"
              unit="%"
              progress={85}
              details={["Above average", "Top 25% learners"]}
            />
          </div>
          
          {/* Course Cards - Right Side */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold mb-6">Popular Learning Paths</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <CourseCard
                title="Machine Learning Fundamentals"
                students={15000}
                lessons={24}
                difficulty="Intermediate"
                color="bg-purple-100"
                icon="ml"
              />
              <CourseCard
                title="React Development"
                students={25000}
                lessons={32}
                difficulty="Beginner"
                color="bg-blue-100"
                icon="react"
              />
              <CourseCard
                title="Java Programming"
                students={20000}
                lessons={28}
                difficulty="Advanced"
                color="bg-green-100"
                icon="java"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
