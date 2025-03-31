
import { useState, useEffect } from "react";
import { User, Users, Copy, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const languages = [
  { label: "JavaScript", value: "javascript" },
  { label: "Python", value: "python" },
  { label: "HTML", value: "html" },
  { label: "CSS", value: "css" },
  { label: "TypeScript", value: "typescript" },
];

export function CollaborativeRoomEditor() {
  const { roomId } = useParams();
  const [code, setCode] = useState<string>('console.log("Hello, world!");');
  const [roomName, setRoomName] = useState<string>(`Coding Room ${roomId?.slice(0, 6) || 'New'}`);
  const [participants, setParticipants] = useState<string[]>([]);
  const [language, setLanguage] = useState("javascript");
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (roomId) {
      // In a real implementation, this would connect to a WebSocket
      // and sync code between participants
      setIsConnected(true);
      setParticipants([
        user?.email || "Current user",
        "user2@example.com",
        "user3@example.com",
      ]);

      toast({
        title: "Connected to room",
        description: `You've joined collaborative room ${roomId}`,
      });
    }

    return () => {
      // Disconnect logic would go here
      setIsConnected(false);
    };
  }, [roomId, toast, user?.email]);

  const copyRoomLink = () => {
    const url = `${window.location.origin}/collaborative-editor/${roomId}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Room link copied",
      description: "Share this link with others to invite them to your room",
    });
  };

  const leaveRoom = () => {
    navigate("/collaborative-editor");
    toast({
      title: "Left room",
      description: "You've left the collaborative room",
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          <Users className="h-5 w-5 text-primary" />
          <div>
            <h3 className="font-medium">{roomName}</h3>
            <p className="text-sm text-muted-foreground">
              {participants.length} participants
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={copyRoomLink}>
            <Copy className="h-4 w-4 mr-2" />
            Copy Link
          </Button>
          <Button variant="outline" size="sm" onClick={leaveRoom}>
            <LogOut className="h-4 w-4 mr-2" />
            Leave
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 h-full">
        <div className="col-span-1 border-r p-4 flex flex-col">
          <div className="mb-4">
            <Label htmlFor="language">Language</Label>
            <select
              id="language"
              className="w-full p-2 border rounded mt-1"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          <Separator className="my-4" />

          <div className="mb-4">
            <h4 className="font-medium mb-2">Participants</h4>
            <div className="space-y-2">
              {participants.map((participant, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 p-2 bg-muted/50 rounded"
                >
                  <User className="h-4 w-4" />
                  <span className="text-sm truncate">{participant}</span>
                  {index === 0 && (
                    <Badge variant="outline" className="ml-auto">
                      You
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto">
            <h4 className="font-medium mb-2">Room Information</h4>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-medium">Room ID:</span>{" "}
                {roomId || "Not joined"}
              </div>
              <div className="text-sm">
                <span className="font-medium">Status:</span>{" "}
                {isConnected ? "Connected" : "Disconnected"}
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-3 flex flex-col h-full">
          <div className="flex-1 p-4">
            <CodeMirror
              value={code}
              height="100%"
              extensions={[javascript()]}
              onChange={(value) => setCode(value)}
              theme="dark"
            />
          </div>
          <div className="border-t p-4">
            <Label htmlFor="output">Console Output</Label>
            <div
              id="output"
              className="mt-2 p-4 bg-gray-900 text-white rounded font-mono text-sm h-32 overflow-auto"
            >
              <p>// Console output will appear here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
