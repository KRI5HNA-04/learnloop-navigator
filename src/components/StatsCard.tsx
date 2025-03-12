
import { CircleIcon } from "lucide-react";

export const StatsCard = () => {
  const progressRingCircumference = 2 * Math.PI * 45;
  const progress = 75; // Example progress percentage
  const offset = progressRingCircumference - (progress / 100) * progressRingCircumference;

  return (
    <div className="bg-white rounded-2xl p-6 card-shine border shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Current Streak</p>
          <h3 className="text-2xl font-bold mt-1">15 Days</h3>
        </div>
        <svg width="100" height="100" className="transform -rotate-90">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#F1F5F9"
            strokeWidth="10"
            fill="none"
          />
          <circle
            className="progress-ring"
            cx="50"
            cy="50"
            r="45"
            stroke="#6366F1"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={progressRingCircumference}
            strokeDashoffset={offset}
          />
        </svg>
      </div>
      <div className="space-y-2">
        <div className="flex items-center text-sm">
          <CircleIcon className="h-2 w-2 mr-2 text-primary" />
          <span className="text-muted-foreground">Next reward in 5 days</span>
        </div>
        <div className="flex items-center text-sm">
          <CircleIcon className="h-2 w-2 mr-2 text-accent" />
          <span className="text-muted-foreground">Current rank: #42</span>
        </div>
      </div>
    </div>
  );
};
