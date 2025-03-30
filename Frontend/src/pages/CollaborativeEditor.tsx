
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Users, Code, User, Play, Copy, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast"; 
import { io, Socket } from "socket.io-client";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

// This would be replaced with a real backend URL
const SOCKET_URL = "https://api.example.com";

interface User {
  id: string;
  name: string;
  avatarUrl?: string;
}

const CollaborativeEditor = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  const [roomPin, setRoomPin] = useState<string>(roomId || "");
  const [joinRoomDialogOpen, setJoinRoomDialogOpen] = useState(false);
  const [createRoomDialogOpen, setCreateRoomDialogOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [code, setCode] = useState("// Start coding here\n\nfunction helloWorld() {\n  console.log('Hello, world!');\n}\n");
  const socketRef = useRef<Socket | null>(null);
  const { toast } = useToast();
  const [inputPin, setInputPin] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [username, setUsername] = useState("");
  
  // Connect to WebSocket when component mounts
  useEffect(() => {
    if (roomId) {
      joinRoom(roomId);
    }
    
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [roomId]);

  const connectSocket = () => {
    // In a real app, this would connect to your WebSocket server
    // For demo purposes, we'll simulate the connection
    console.log("Connecting to socket server...");
    
    // Simulate socket connection
    setTimeout(() => {
      setIsConnected(true);
      toast({
        title: "Connected to server",
        description: "You are now connected to the collaborative server",
      });
    }, 1000);
    
    // In a real application, you would do something like:
    // socketRef.current = io(SOCKET_URL);
    // socketRef.current.on('connect', () => setIsConnected(true));
    // socketRef.current.on('user-joined', (user) => {
    //   toast({ title: "User joined", description: `${user.name} joined the room` });
    //   setUsers(prev => [...prev, user]);
    // });
    // socketRef.current.on('code-update', (newCode) => {
    //   setCode(newCode);
    // });
  };

  const createRoom = () => {
    // Generate a 6-digit pin
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    setRoomPin(pin);
    
    connectSocket();
    
    // Add current user to the room
    const currentUser = {
      id: "current-user-id",
      name: username || "You",
      avatarUrl: "https://github.com/shadcn.png"
    };
    
    setUsers([currentUser]);
    
    toast({
      title: "Room created",
      description: `Your room has been created with PIN: ${pin}`,
    });
    
    // Close the dialog
    setCreateRoomDialogOpen(false);
    
    // Navigate to the room
    navigate(`/collaborative-editor/${pin}`);
  };
  
  const joinRoom = (pin: string) => {
    setRoomPin(pin);
    connectSocket();
    
    // Simulate joining a room
    setTimeout(() => {
      // Add current user to the room
      const currentUser = {
        id: "current-user-id",
        name: username || "You",
        avatarUrl: "https://github.com/shadcn.png"
      };
      
      // Add some fake users
      const fakeUsers = [
        { id: "user1", name: "Alice", avatarUrl: "https://i.pravatar.cc/150?img=1" },
        { id: "user2", name: "Bob", avatarUrl: "https://i.pravatar.cc/150?img=2" }
      ];
      
      setUsers([currentUser, ...fakeUsers]);
      
      // Show toast for each user (in a real app, this would come from WebSocket)
      fakeUsers.forEach(user => {
        toast({
          title: "User in room",
          description: `${user.name} is already in this room`,
        });
      });
    }, 1500);
    
    // Close the dialog
    setJoinRoomDialogOpen(false);
    
    // Navigate to the room
    navigate(`/collaborative-editor/${pin}`);
  };
  
  const handleCodeChange = (value: string) => {
    setCode(value);
    
    // In a real app, you would emit the change to the server
    // if (socketRef.current) {
    //   socketRef.current.emit('code-change', value);
    // }
  };
  
  const copyRoomPin = () => {
    navigator.clipboard.writeText(roomPin);
    toast({
      title: "PIN copied",
      description: "Room PIN copied to clipboard",
    });
  };

  // If not in a room yet, show the options
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-muted">
        <Navbar />
        <div className="container mx-auto pt-32 pb-20 px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Collaborative Coding</h1>
            <p className="text-muted-foreground mb-8">
              Practice coding together with other learners in real-time.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <Card className="border-2 hover:border-primary transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Code className="h-5 w-5" />
                    Create a Room
                  </CardTitle>
                  <CardDescription>
                    Start a new coding session and invite others
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Users className="h-20 w-20 mx-auto mb-4 text-muted-foreground" />
                  <p className="mb-4">Create a new collaborative room and get a PIN to share with others</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={() => setCreateRoomDialogOpen(true)}
                  >
                    Create Room
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border-2 hover:border-primary transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    Join a Room
                  </CardTitle>
                  <CardDescription>
                    Join an existing coding session
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Users className="h-20 w-20 mx-auto mb-4 text-muted-foreground" />
                  <p className="mb-4">Enter a PIN to join an existing collaborative coding room</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={() => setJoinRoomDialogOpen(true)}
                  >
                    Join Room
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Create Room Dialog */}
        <Dialog open={createRoomDialogOpen} onOpenChange={setCreateRoomDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a New Room</DialogTitle>
              <DialogDescription>
                Start a new collaborative coding session. You can invite up to 4 other people.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">Your Name</label>
                <Input 
                  id="username" 
                  placeholder="Enter your name" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateRoomDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={createRoom}>
                Create Room
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Join Room Dialog */}
        <Dialog open={joinRoomDialogOpen} onOpenChange={setJoinRoomDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Join a Room</DialogTitle>
              <DialogDescription>
                Enter the 6-digit PIN to join an existing coding session.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">Your Name</label>
                <Input 
                  id="username" 
                  placeholder="Enter your name" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="pin" className="text-sm font-medium">Room PIN</label>
                <Input 
                  id="pin" 
                  placeholder="Enter 6-digit PIN" 
                  value={inputPin} 
                  onChange={(e) => setInputPin(e.target.value)} 
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setJoinRoomDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => joinRoom(inputPin)}
                disabled={!inputPin || inputPin.length !== 6}
              >
                Join Room
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Connected to a room, show the editor
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-muted">
      <Navbar />
      <div className="container mx-auto flex-1 pt-20 pb-6 px-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Collaborative Editor</h1>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-sm text-muted-foreground">Room PIN: {roomPin}</p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0" 
                onClick={copyRoomPin}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {users.map((user, index) => (
              <div 
                key={user.id} 
                className="relative group"
                title={user.name}
              >
                {user.avatarUrl ? (
                  <img 
                    src={user.avatarUrl} 
                    alt={user.name} 
                    className="w-8 h-8 rounded-full border-2 border-primary" 
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    {user.name.charAt(0)}
                  </div>
                )}
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {user.name}
                </div>
              </div>
            ))}
            {users.length < 5 && (
              <div className="w-8 h-8 rounded-full border-2 border-dashed border-muted-foreground flex items-center justify-center text-muted-foreground">
                <span className="text-xs">{5 - users.length}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3 bg-white rounded-lg shadow overflow-hidden border">
            <div className="bg-muted p-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                <span className="text-sm font-medium">main.js</span>
              </div>
              <Button size="sm" variant="ghost">
                <Play className="h-4 w-4 mr-1" />
                Run
              </Button>
            </div>
            <div className="h-[calc(100vh-240px)]">
              <CodeMirror
                value={code}
                height="100%"
                theme={oneDark}
                extensions={[javascript()]}
                onChange={handleCodeChange}
              />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden border flex flex-col">
            <div className="bg-muted p-2 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Participants ({users.length}/5)</span>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-3">
                {users.map(user => (
                  <div key={user.id} className="flex items-center gap-3">
                    {user.avatarUrl ? (
                      <img 
                        src={user.avatarUrl} 
                        alt={user.name} 
                        className="w-8 h-8 rounded-full" 
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                        {user.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-green-500">Online</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 border-t">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full" 
                onClick={copyRoomPin}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Room PIN
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborativeEditor;
