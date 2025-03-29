
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent 
} from "@/components/ui/collapsible";
import { 
  BookOpen, Code, FileText, Play, CheckCircle, 
  Folder, ChevronDown, ChevronRight, MessageSquare, 
  Video, Users, Award, BarChart, Circle, Clock
} from "lucide-react";
import { technologies } from "@/data/technologies";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

const PathView = () => {
  const { id } = useParams();
  const [tech, setTech] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState("roadmap");
  const { toast } = useToast();

  useEffect(() => {
    // Find the technology by id
    const foundTech = technologies.find(t => t.id === id);
    if (foundTech) {
      setTech(foundTech);
    } else {
      // If not found by exact id, try to match by substring
      const matchedTech = technologies.find(t => 
        t.id.includes(id || "") || id?.includes(t.id)
      );
      if (matchedTech) {
        setTech(matchedTech);
      }
    }
  }, [id]);

  const handlePracticeClick = () => {
    toast({
      title: "Creating a collaborative room",
      description: "Initializing a new collaborative coding session...",
    });
    // In a real app, this would create a room and redirect to it
  };

  if (!tech) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-muted flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Technology not found</h2>
          <p className="text-muted-foreground mb-6">The learning path you're looking for doesn't exist yet.</p>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted">
      <Navbar />
      <div className="pt-20 pb-10 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-3">
              <div className="bg-white shadow rounded-lg p-6 sticky top-24">
                <div className={`w-14 h-14 rounded-lg mb-4 flex items-center justify-center ${tech.color}`}>
                  {tech.icon === 'react' && <Code className="h-8 w-8" />}
                  {tech.icon === 'python' && <Code className="h-8 w-8" />}
                  {tech.icon === 'js' && <Code className="h-8 w-8" />}
                  {tech.icon === 'ml' && <BarChart className="h-8 w-8" />}
                  {/* Add other icons as needed */}
                </div>
                <h1 className="text-2xl font-bold mb-2">{tech.title}</h1>
                <p className="text-muted-foreground mb-6">{tech.description}</p>
                
                <div className="space-y-1">
                  <Button
                    variant={activeTab === "roadmap" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("roadmap")}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Roadmap
                  </Button>
                  <Button
                    variant={activeTab === "docs" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("docs")}
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Documentation
                  </Button>
                  <Button
                    variant={activeTab === "resources" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("resources")}
                  >
                    <Folder className="mr-2 h-4 w-4" />
                    Resources
                  </Button>
                  <Button
                    variant={activeTab === "practice" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      setActiveTab("practice");
                      handlePracticeClick();
                    }}
                  >
                    <Code className="mr-2 h-4 w-4" />
                    Practice
                  </Button>
                  <Button
                    variant={activeTab === "tests" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("tests")}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Tests
                  </Button>
                  <Button
                    variant={activeTab === "videos" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("videos")}
                  >
                    <Video className="mr-2 h-4 w-4" />
                    Videos
                  </Button>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {tech.students.toLocaleString()} enrolled
                    </span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {tech.lessons} lessons
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Certificate available
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="md:col-span-9">
              <div className="bg-white shadow rounded-lg p-6">
                {activeTab === "roadmap" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Learning Roadmap</h2>
                    <p className="mb-6 text-muted-foreground">
                      Follow this step-by-step roadmap to master {tech.title}
                    </p>

                    <div className="space-y-4">
                      <Collapsible className="border rounded-lg overflow-hidden">
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted/50 hover:bg-muted transition-colors">
                          <div className="flex items-center">
                            <div className="bg-primary/10 p-2 rounded-full mr-3">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div className="text-left">
                              <h3 className="font-medium">Fundamentals</h3>
                              <p className="text-sm text-muted-foreground">Core concepts and basics</p>
                            </div>
                          </div>
                          <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-4 border-t">
                          <ul className="space-y-3">
                            <li className="flex items-center p-2 hover:bg-muted/50 rounded-md transition-colors">
                              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                              <span>Introduction to {tech.title}</span>
                            </li>
                            <li className="flex items-center p-2 hover:bg-muted/50 rounded-md transition-colors">
                              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                              <span>Setting up your environment</span>
                            </li>
                            <li className="flex items-center p-2 hover:bg-muted/50 rounded-md transition-colors">
                              <Circle className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>Core syntax and structures</span>
                            </li>
                          </ul>
                        </CollapsibleContent>
                      </Collapsible>

                      <Collapsible className="border rounded-lg overflow-hidden">
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted/50 hover:bg-muted transition-colors">
                          <div className="flex items-center">
                            <div className="bg-primary/10 p-2 rounded-full mr-3">
                              <Code className="h-5 w-5 text-primary" />
                            </div>
                            <div className="text-left">
                              <h3 className="font-medium">Intermediate Concepts</h3>
                              <p className="text-sm text-muted-foreground">Building on the basics</p>
                            </div>
                          </div>
                          <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-4 border-t">
                          <ul className="space-y-3">
                            <li className="flex items-center p-2 hover:bg-muted/50 rounded-md transition-colors">
                              <Circle className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>Advanced patterns</span>
                            </li>
                            <li className="flex items-center p-2 hover:bg-muted/50 rounded-md transition-colors">
                              <Circle className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>Best practices</span>
                            </li>
                            <li className="flex items-center p-2 hover:bg-muted/50 rounded-md transition-colors">
                              <Circle className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>Common architectures</span>
                            </li>
                          </ul>
                        </CollapsibleContent>
                      </Collapsible>

                      <Collapsible className="border rounded-lg overflow-hidden">
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted/50 hover:bg-muted transition-colors">
                          <div className="flex items-center">
                            <div className="bg-primary/10 p-2 rounded-full mr-3">
                              <BarChart className="h-5 w-5 text-primary" />
                            </div>
                            <div className="text-left">
                              <h3 className="font-medium">Advanced Topics</h3>
                              <p className="text-sm text-muted-foreground">Expert-level material</p>
                            </div>
                          </div>
                          <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-4 border-t">
                          <ul className="space-y-3">
                            <li className="flex items-center p-2 hover:bg-muted/50 rounded-md transition-colors">
                              <Circle className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>Optimization techniques</span>
                            </li>
                            <li className="flex items-center p-2 hover:bg-muted/50 rounded-md transition-colors">
                              <Circle className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>Enterprise integration</span>
                            </li>
                            <li className="flex items-center p-2 hover:bg-muted/50 rounded-md transition-colors">
                              <Circle className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>Bleeding-edge features</span>
                            </li>
                          </ul>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  </div>
                )}

                {activeTab === "docs" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Documentation</h2>
                    <ScrollArea className="h-[600px] pr-4">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-medium mb-3">Introduction</h3>
                          <p className="leading-relaxed">
                            {tech.title} is a powerful technology that enables developers to build modern, 
                            efficient applications. This documentation will guide you through all the 
                            essential concepts and techniques required to become proficient.
                          </p>
                        </div>
                        <Separator />
                        <div>
                          <h3 className="text-xl font-medium mb-3">Getting Started</h3>
                          <p className="leading-relaxed mb-4">
                            Before diving into {tech.title}, you'll need to set up your development environment.
                            Follow these steps to get started:
                          </p>
                          <div className="bg-muted/50 p-4 rounded-lg mb-4">
                            <pre className="text-sm overflow-x-auto">
                              <code>
                                {`# Install the necessary tools
$ npm install -g ${tech.id}-cli

# Create a new project
$ ${tech.id} create my-project

# Navigate to the project directory
$ cd my-project

# Start the development server
$ ${tech.id} start`}
                              </code>
                            </pre>
                          </div>
                          <p className="leading-relaxed">
                            Once you've completed these steps, you'll have a working development 
                            environment ready for building applications with {tech.title}.
                          </p>
                        </div>
                        <Separator />
                        <div>
                          <h3 className="text-xl font-medium mb-3">Core Concepts</h3>
                          <p className="leading-relaxed mb-4">
                            Understanding the core concepts of {tech.title} is essential for 
                            becoming proficient. Here are the fundamental ideas you need to grasp:
                          </p>
                          <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li>Fundamental principle one</li>
                            <li>Key concept two</li>
                            <li>Essential pattern three</li>
                            <li>Critical understanding four</li>
                          </ul>
                          <p className="leading-relaxed">
                            These concepts form the foundation upon which you'll build your expertise.
                          </p>
                        </div>
                        {/* More documentation sections here */}
                      </div>
                    </ScrollArea>
                  </div>
                )}

                {activeTab === "resources" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Learning Resources</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="text-lg font-medium mb-2">Official Documentation</h3>
                          <p className="text-muted-foreground mb-4">The official guides and API references</p>
                          <Button variant="outline" className="w-full">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Visit Documentation
                          </Button>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="text-lg font-medium mb-2">GitHub Repository</h3>
                          <p className="text-muted-foreground mb-4">Source code and examples</p>
                          <Button variant="outline" className="w-full">
                            <Code className="mr-2 h-4 w-4" />
                            View on GitHub
                          </Button>
                        </CardContent>
                      </Card>
                    </div>

                    <h3 className="text-xl font-medium mb-4">Recommended Books</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                      <Card>
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          <div className="bg-muted w-full h-40 rounded-md mb-4 flex items-center justify-center">
                            <BookOpen className="h-12 w-12 text-muted-foreground" />
                          </div>
                          <h4 className="font-medium mb-1">Definitive Guide</h4>
                          <p className="text-sm text-muted-foreground">Comprehensive coverage of all topics</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          <div className="bg-muted w-full h-40 rounded-md mb-4 flex items-center justify-center">
                            <BookOpen className="h-12 w-12 text-muted-foreground" />
                          </div>
                          <h4 className="font-medium mb-1">For Beginners</h4>
                          <p className="text-sm text-muted-foreground">Start your journey with this friendly guide</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          <div className="bg-muted w-full h-40 rounded-md mb-4 flex items-center justify-center">
                            <BookOpen className="h-12 w-12 text-muted-foreground" />
                          </div>
                          <h4 className="font-medium mb-1">Advanced Patterns</h4>
                          <p className="text-sm text-muted-foreground">Master expert-level techniques and concepts</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {activeTab === "practice" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Collaborative Practice</h2>
                    <p className="mb-6 text-muted-foreground">
                      Join or create a collaborative coding session to practice with peers.
                    </p>
                    
                    <div className="space-y-6">
                      <Card className="border-2 border-primary/50">
                        <CardContent className="p-6">
                          <h3 className="text-lg font-medium mb-2">Create a New Room</h3>
                          <p className="text-muted-foreground mb-4">
                            Start a collaborative coding session and invite others to join.
                          </p>
                          <Button className="w-full" onClick={handlePracticeClick}>
                            <Users className="mr-2 h-4 w-4" />
                            Create Collaborative Room
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <h3 className="text-xl font-medium mt-8 mb-4">Active Rooms</h3>
                      <div className="space-y-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-medium">{tech.title} Basics Room</h4>
                                <p className="text-sm text-muted-foreground">3 participants • Beginner level</p>
                              </div>
                              <Button variant="outline" size="sm">
                                Join
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-medium">Advanced {tech.title} Practice</h4>
                                <p className="text-sm text-muted-foreground">2 participants • Advanced level</p>
                              </div>
                              <Button variant="outline" size="sm">
                                Join
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-medium">Project Collaboration</h4>
                                <p className="text-sm text-muted-foreground">5 participants • Intermediate level</p>
                              </div>
                              <Button variant="outline" size="sm">
                                Join
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "tests" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Knowledge Assessment</h2>
                    <p className="mb-6 text-muted-foreground">
                      Test your understanding of {tech.title} with these assessments.
                    </p>
                    
                    <div className="space-y-6">
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-medium mb-2">Fundamentals Quiz</h3>
                              <p className="text-muted-foreground mb-2">10 questions • 15 minutes</p>
                              <div className="flex items-center space-x-2 text-sm">
                                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Beginner</span>
                                <span>78% completion rate</span>
                              </div>
                            </div>
                            <Button>Start Quiz</Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-medium mb-2">Intermediate Assessment</h3>
                              <p className="text-muted-foreground mb-2">15 questions • 25 minutes</p>
                              <div className="flex items-center space-x-2 text-sm">
                                <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Intermediate</span>
                                <span>54% completion rate</span>
                              </div>
                            </div>
                            <Button>Start Quiz</Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-medium mb-2">Expert Certification</h3>
                              <p className="text-muted-foreground mb-2">30 questions • 45 minutes</p>
                              <div className="flex items-center space-x-2 text-sm">
                                <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Advanced</span>
                                <span>32% completion rate</span>
                              </div>
                            </div>
                            <Button>Start Quiz</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {activeTab === "videos" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Video Tutorials</h2>
                    <p className="mb-6 text-muted-foreground">
                      Learn {tech.title} through video lessons from top instructors.
                    </p>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardContent className="p-0">
                            <div className="bg-muted aspect-video flex items-center justify-center">
                              <Play className="h-12 w-12 text-muted-foreground" />
                            </div>
                            <div className="p-4">
                              <h3 className="font-medium mb-1">{tech.title} Crash Course</h3>
                              <p className="text-sm text-muted-foreground mb-2">
                                A complete beginner's guide to {tech.title}
                              </p>
                              <div className="flex items-center text-sm">
                                <span className="flex items-center mr-4">
                                  <Play className="h-3 w-3 mr-1" />
                                  1.2M views
                                </span>
                                <span className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  45 minutes
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-0">
                            <div className="bg-muted aspect-video flex items-center justify-center">
                              <Play className="h-12 w-12 text-muted-foreground" />
                            </div>
                            <div className="p-4">
                              <h3 className="font-medium mb-1">Advanced {tech.title} Techniques</h3>
                              <p className="text-sm text-muted-foreground mb-2">
                                Master the advanced concepts and patterns
                              </p>
                              <div className="flex items-center text-sm">
                                <span className="flex items-center mr-4">
                                  <Play className="h-3 w-3 mr-1" />
                                  850K views
                                </span>
                                <span className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  1 hour 20 minutes
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-0">
                            <div className="bg-muted aspect-video flex items-center justify-center">
                              <Play className="h-12 w-12 text-muted-foreground" />
                            </div>
                            <div className="p-4">
                              <h3 className="font-medium mb-1">{tech.title} Project Tutorial</h3>
                              <p className="text-sm text-muted-foreground mb-2">
                                Build a complete project from scratch
                              </p>
                              <div className="flex items-center text-sm">
                                <span className="flex items-center mr-4">
                                  <Play className="h-3 w-3 mr-1" />
                                  675K views
                                </span>
                                <span className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  2 hours 15 minutes
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-0">
                            <div className="bg-muted aspect-video flex items-center justify-center">
                              <Play className="h-12 w-12 text-muted-foreground" />
                            </div>
                            <div className="p-4">
                              <h3 className="font-medium mb-1">{tech.title} Tips and Tricks</h3>
                              <p className="text-sm text-muted-foreground mb-2">
                                Productivity hacks and best practices
                              </p>
                              <div className="flex items-center text-sm">
                                <span className="flex items-center mr-4">
                                  <Play className="h-3 w-3 mr-1" />
                                  520K views
                                </span>
                                <span className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  55 minutes
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathView;
