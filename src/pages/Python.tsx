import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  BookOpen,
  Code,
  FileText,
  Play,
  CheckCircle,
  Folder,
  ChevronDown,
  ChevronRight,
  MessageSquare,
  Video,
  Users,
  Award,
  BarChart,
  Circle,
  Clock,
} from "lucide-react";
import { technologies } from "@/data/technologies";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

const Python = () => {
  const { id } = useParams();
  const [tech, setTech] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState("roadmap");
  const [isEnrolled, setIsEnrolled] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Find the technology by id
    const foundTech = technologies.find((t) => t.id === id);
    if (foundTech) {
      setTech(foundTech);
    } else {
      // If not found by exact id, try to match by substring
      const matchedTech = technologies.find(
        (t) => t.id.includes(id || "") || id?.includes(t.id)
      );
      if (matchedTech) {
        setTech(matchedTech);
      }
    }
    // Check if user is already enrolled in this course
    const enrolledCourses = JSON.parse(
      localStorage.getItem("enrolledCourses") || "[]"
    );
    setIsEnrolled(enrolledCourses.some((course: string) => course === id));
  }, [id]);

  const handlePracticeClick = () => {
    toast({
      title: "Creating a collaborative room",
      description: "Loading collaborative editor in this view...",
    });
    setActiveTab("practice"); // Ensure the tab switches to "practice"
  };

  const handleEnrollClick = () => {
    // Get current enrolled courses from localStorage
    const enrolledCourses = JSON.parse(
      localStorage.getItem("enrolledCourses") || "[]"
    );

    // Add this course if not already enrolled
    if (!enrolledCourses.includes(id)) {
      enrolledCourses.push(id);
      localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
      setIsEnrolled(true);

      toast({
        title: "Successfully Enrolled!",
        description:
          "You're now enrolled in ${tech?.title}. Access this course from your dashboard.",
      });
    }
  };

  // Rest of your component code...

  return (
    // Your component JSX...
    <div>
      {/* Example button implementation */}
      {!isEnrolled && (
        <Button onClick={handleEnrollClick} className="w-full">
          Enroll Now
        </Button>
      )}
      {isEnrolled && (
        <Button disabled className="w-full bg-green-500">
          Enrolled
        </Button>
      )}
    </div>
  );
};

export default Python;
