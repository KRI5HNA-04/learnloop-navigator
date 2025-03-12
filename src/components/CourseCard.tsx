
import { GraduationCap, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  title: string;
  students: number;
  lessons: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  color: string;
  icon: 'ml' | 'react' | 'java';
}

export const CourseCard = ({ title, students, lessons, difficulty, color, icon }: CourseCardProps) => {
  const getIcon = () => {
    switch (icon) {
      case 'ml':
        return <GraduationCap className="h-8 w-8" />;
      case 'react':
        return <Users className="h-8 w-8" />;
      case 'java':
        return <BookOpen className="h-8 w-8" />;
      default:
        return <BookOpen className="h-8 w-8" />;
    }
  };

  return (
    <div className={`bg-white rounded-2xl p-6 card-shine border shadow-sm hover:shadow-md transition-shadow`}>
      <div className={`w-14 h-14 rounded-2xl mb-4 flex items-center justify-center ${color}`}>
        {getIcon()}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="h-4 w-4 mr-2" />
          <span>{students.toLocaleString()} students</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <BookOpen className="h-4 w-4 mr-2" />
          <span>{lessons} lessons</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className={`text-sm px-3 py-1 rounded-full ${
          difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
          difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          {difficulty}
        </span>
        <Button variant="outline" className="ml-2">
          View Path
        </Button>
      </div>
    </div>
  );
};
