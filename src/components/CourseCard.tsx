import {
  GraduationCap,
  Code,
  BookOpen,
  Terminal,
  Globe,
  Cloud,
  Smartphone,
  Layers,
  Brain,
  GitBranch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  id: string;
  title: string;
  description?: string;
  students: number;
  lessons: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  color: string;
  icon:
    | "ml"
    | "react"
    | "java"
    | "python"
    | "js"
    | "cloud"
    | "mobile"
    | "blockchain"
    | "ai"
    | "devops";
}

export const CourseCard = ({
  id,
  title,
  description,
  students,
  lessons,
  difficulty,
  color,
  icon,
}: CourseCardProps) => {
  const navigate = useNavigate();

  const getIcon = () => {
    switch (icon) {
      case "ml":
        return <GraduationCap className="h-8 w-8" />;
      case "react":
        return <Code className="h-8 w-8" />;
      case "java":
        return <BookOpen className="h-8 w-8" />;
      case "python":
        return <Terminal className="h-8 w-8" />;
      case "js":
        return <Globe className="h-8 w-8" />;
      case "cloud":
        return <Cloud className="h-8 w-8" />;
      case "mobile":
        return <Smartphone className="h-8 w-8" />;
      case "blockchain":
        return <Layers className="h-8 w-8" />;
      case "ai":
        return <Brain className="h-8 w-8" />;
      case "devops":
        return <GitBranch className="h-8 w-8" />;
      default:
        return <BookOpen className="h-8 w-8" />;
    }
  };

  const handleViewPath = () => {
    // Custom navigation based on icon type
    switch (icon) {
      case "react":
        navigate("/react");
        break;
      case "python":
        navigate("/Python");
        break;
      case "js":
        navigate("/Javascript");
        break;
      default:
        // Default behavior for other course types
        navigate(`/path/${id}`);
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl p-6 card-shine border shadow-sm hover:shadow-md transition-shadow`}
    >
      <div
        className={`w-14 h-14 rounded-2xl mb-4 flex items-center justify-center ${color}`}
      >
        {getIcon()}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      {description && (
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
      )}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <GraduationCap className="h-4 w-4 mr-2" />
          <span>{students.toLocaleString()} students</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <BookOpen className="h-4 w-4 mr-2" />
          <span>{lessons} lessons</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span
          className={`text-sm px-3 py-1 rounded-full ${
            difficulty === "Beginner"
              ? "bg-green-100 text-green-700"
              : difficulty === "Intermediate"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {difficulty}
        </span>
        <Button variant="outline" className="ml-2" onClick={handleViewPath}>
          View Path
        </Button>
      </div>
    </div>
  );
};
