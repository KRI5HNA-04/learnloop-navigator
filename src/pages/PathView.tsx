
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/Navbar";
import { technologies } from "@/data/technologies";
import { Technology } from "@/data/technologies";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, FileText, Video, Code, CheckSquare, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const PathView = () => {
  const { id } = useParams<{ id: string }>();
  const [technology, setTechnology] = useState<Technology | null>(null);
  const [activeTab, setActiveTab] = useState("roadmap");

  useEffect(() => {
    const tech = technologies.find(t => t.id === id);
    if (tech) {
      setTechnology(tech);
      document.title = `${tech.title} - PathWise`;
    }
  }, [id]);

  if (!technology) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-muted">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-20 text-center">
          <h1 className="text-3xl font-bold">Learning path not found</h1>
          <p className="mt-4 text-muted-foreground">
            The learning path you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{technology.title}</h1>
          <p className="text-muted-foreground mt-2">{technology.description}</p>
          <div className="flex items-center mt-4 space-x-4">
            <span className={`text-sm px-3 py-1 rounded-full ${
              technology.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
              technology.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {technology.difficulty}
            </span>
            <span className="text-sm text-muted-foreground">{technology.lessons} lessons</span>
            <span className="text-sm text-muted-foreground">{technology.students.toLocaleString()} students</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-0">
                <nav className="flex flex-col">
                  <Button 
                    variant={activeTab === "roadmap" ? "default" : "ghost"} 
                    className="justify-start rounded-none border-b"
                    onClick={() => setActiveTab("roadmap")}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Roadmap
                  </Button>
                  <Button 
                    variant={activeTab === "docs" ? "default" : "ghost"} 
                    className="justify-start rounded-none border-b"
                    onClick={() => setActiveTab("docs")}
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Documentation
                  </Button>
                  <Button 
                    variant={activeTab === "resources" ? "default" : "ghost"} 
                    className="justify-start rounded-none border-b"
                    onClick={() => setActiveTab("resources")}
                  >
                    <FolderOpen className="mr-2 h-4 w-4" />
                    Resources
                  </Button>
                  <Button 
                    variant={activeTab === "practice" ? "default" : "ghost"} 
                    className="justify-start rounded-none border-b"
                    onClick={() => setActiveTab("practice")}
                  >
                    <Code className="mr-2 h-4 w-4" />
                    Practice
                  </Button>
                  <Button 
                    variant={activeTab === "tests" ? "default" : "ghost"} 
                    className="justify-start rounded-none border-b"
                    onClick={() => setActiveTab("tests")}
                  >
                    <CheckSquare className="mr-2 h-4 w-4" />
                    Tests
                  </Button>
                  <Button 
                    variant={activeTab === "videos" ? "default" : "ghost"} 
                    className="justify-start rounded-none"
                    onClick={() => setActiveTab("videos")}
                  >
                    <Video className="mr-2 h-4 w-4" />
                    Videos
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main content area */}
          <div className="md:col-span-3">
            <Card className="p-6">
              {activeTab === "roadmap" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Learning Roadmap</h2>
                  <div className="relative border-l-2 border-primary pl-6 pb-6 space-y-8">
                    <div className="relative">
                      <div className="absolute -left-[25px] top-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white">1</div>
                      <h3 className="text-xl font-semibold">Fundamentals</h3>
                      <p className="text-muted-foreground mt-2">Master the basic concepts and syntax of {technology.title}.</p>
                      <ul className="mt-2 list-disc list-inside text-sm space-y-1">
                        <li>Introduction to {technology.title}</li>
                        <li>Setting up your development environment</li>
                        <li>Basic syntax and data structures</li>
                        <li>Control flow and functions</li>
                      </ul>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-[25px] top-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white">2</div>
                      <h3 className="text-xl font-semibold">Intermediate Concepts</h3>
                      <p className="text-muted-foreground mt-2">Build on your foundation with more advanced topics.</p>
                      <ul className="mt-2 list-disc list-inside text-sm space-y-1">
                        <li>Object-oriented programming</li>
                        <li>Error handling</li>
                        <li>Working with APIs</li>
                        <li>Best practices and patterns</li>
                      </ul>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-[25px] top-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white">3</div>
                      <h3 className="text-xl font-semibold">Advanced Topics</h3>
                      <p className="text-muted-foreground mt-2">Dive into specialized areas and real-world applications.</p>
                      <ul className="mt-2 list-disc list-inside text-sm space-y-1">
                        <li>Performance optimization</li>
                        <li>Security considerations</li>
                        <li>Industry applications</li>
                        <li>Building professional projects</li>
                      </ul>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-[25px] top-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white">4</div>
                      <h3 className="text-xl font-semibold">Mastery & Specialization</h3>
                      <p className="text-muted-foreground mt-2">Become an expert in specific domains.</p>
                      <ul className="mt-2 list-disc list-inside text-sm space-y-1">
                        <li>Frameworks and libraries</li>
                        <li>Advanced design patterns</li>
                        <li>Contributing to open source</li>
                        <li>Teaching and mentoring others</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "docs" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Documentation</h2>
                  <div className="prose max-w-none">
                    <h3>Introduction to {technology.title}</h3>
                    <p>
                      {technology.title} is a powerful technology used widely in the industry for building robust applications.
                      This comprehensive documentation will guide you through all aspects of {technology.title}, from basic concepts to advanced techniques.
                    </p>
                    
                    <h4 className="mt-6">Getting Started</h4>
                    <p>
                      To begin your journey with {technology.title}, you'll need to set up your development environment.
                      This involves installing the necessary tools and understanding the basic workflow.
                    </p>
                    
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                      <code>
                        # Example installation command
                        npm install {technology.id} --save
                      </code>
                    </pre>
                    
                    <h4 className="mt-6">Core Concepts</h4>
                    <p>
                      The core concepts in {technology.title} include understanding its architecture,
                      data flow, and design patterns. Mastering these fundamentals is crucial for becoming proficient.
                    </p>
                    
                    <ul className="list-disc pl-6">
                      <li>Fundamental principle 1</li>
                      <li>Fundamental principle 2</li>
                      <li>Fundamental principle 3</li>
                    </ul>
                    
                    <p className="text-sm text-muted-foreground mt-8">
                      This documentation is continuously updated to reflect the latest developments in {technology.title}.
                      Be sure to check back regularly for new information and best practices.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "resources" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Learning Resources</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h3 className="font-semibold">Official Documentation</h3>
                      <p className="text-sm text-muted-foreground">The official {technology.title} documentation with comprehensive guides.</p>
                      <Button variant="link" className="p-0 h-auto mt-2">Visit resource</Button>
                    </Card>
                    
                    <Card className="p-4">
                      <h3 className="font-semibold">Community Forum</h3>
                      <p className="text-sm text-muted-foreground">Connect with other learners and ask questions about {technology.title}.</p>
                      <Button variant="link" className="p-0 h-auto mt-2">Visit resource</Button>
                    </Card>
                    
                    <Card className="p-4">
                      <h3 className="font-semibold">GitHub Repository</h3>
                      <p className="text-sm text-muted-foreground">Explore the source code and contribute to {technology.title}.</p>
                      <Button variant="link" className="p-0 h-auto mt-2">Visit resource</Button>
                    </Card>
                    
                    <Card className="p-4">
                      <h3 className="font-semibold">Tutorial Series</h3>
                      <p className="text-sm text-muted-foreground">Step-by-step tutorials for learning {technology.title}.</p>
                      <Button variant="link" className="p-0 h-auto mt-2">Visit resource</Button>
                    </Card>
                  </div>
                </div>
              )}

              {activeTab === "practice" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Practice Coding</h2>
                  <div className="bg-muted p-4 rounded-md">
                    <p className="mb-4">
                      Join a collaborative coding session to practice {technology.title} with other learners.
                      Create or join a room to start coding together.
                    </p>
                    <div className="flex flex-col space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Room Name</label>
                        <input 
                          type="text" 
                          placeholder="Enter a room name..."
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <Button>Create Coding Room</Button>
                      </div>
                      <div className="flex items-center">
                        <div className="flex-1 h-px bg-border"></div>
                        <p className="mx-4 text-sm text-muted-foreground">or</p>
                        <div className="flex-1 h-px bg-border"></div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Join Existing Room</label>
                        <div className="flex space-x-2">
                          <input 
                            type="text" 
                            placeholder="Enter room ID..."
                            className="flex-1 px-3 py-2 border rounded-md"
                          />
                          <Button variant="outline">Join Room</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "tests" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Skill Assessment Tests</h2>
                  <div className="space-y-6">
                    <Card className="p-4">
                      <h3 className="font-semibold">Beginner Assessment</h3>
                      <p className="text-sm text-muted-foreground mt-1">Test your understanding of basic {technology.title} concepts.</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">30 minutes</span>
                        <Button size="sm">Start Test</Button>
                      </div>
                    </Card>
                    
                    <Card className="p-4">
                      <h3 className="font-semibold">Intermediate Assessment</h3>
                      <p className="text-sm text-muted-foreground mt-1">Evaluate your knowledge of more advanced topics.</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">45 minutes</span>
                        <Button size="sm">Start Test</Button>
                      </div>
                    </Card>
                    
                    <Card className="p-4">
                      <h3 className="font-semibold">Expert Assessment</h3>
                      <p className="text-sm text-muted-foreground mt-1">Challenge yourself with complex problems and scenarios.</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">60 minutes</span>
                        <Button size="sm">Start Test</Button>
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {activeTab === "videos" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Video Tutorials</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                        <Video className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium">{technology.title} for Beginners</h3>
                      <p className="text-sm text-muted-foreground">A comprehensive introduction to {technology.title} concepts.</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                        <Video className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium">Building Your First {technology.title} Project</h3>
                      <p className="text-sm text-muted-foreground">Step-by-step guide to creating a real-world application.</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                        <Video className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium">Advanced {technology.title} Techniques</h3>
                      <p className="text-sm text-muted-foreground">Deep dive into complex features and optimizations.</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                        <Video className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium">{technology.title} Best Practices</h3>
                      <p className="text-sm text-muted-foreground">Learn industry standards and professional workflows.</p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathView;
