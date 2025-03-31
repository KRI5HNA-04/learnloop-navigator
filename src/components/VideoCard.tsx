import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Youtube, PlayCircle, Clock } from "lucide-react";

interface VideoCardProps {
  title: string;
  description: string;
  views: string;
  duration: string;
  videoId: string;
  isExpanded: boolean;
  setActiveVideoId: (videoId: string | null) => void;
}

const VideoCard = ({
  title,
  description,
  views,
  duration,
  videoId,
  isExpanded,
  setActiveVideoId,
}: VideoCardProps) => {
  const handleClick = () => {
    setActiveVideoId(isExpanded ? null : videoId); // Collapse if already expanded, otherwise expand this one
  };

  return (
    <Card className="overflow-hidden transition-transform hover:scale-105 hover:shadow-lg">
      <CardContent className="p-0">
        {/* Thumbnail and Info Section */}
        <div className="cursor-pointer" onClick={handleClick}>
          <div className="relative bg-muted aspect-video group">
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/70 transition-colors">
              <Youtube className="h-12 w-12 text-red-600" />
              <PlayCircle className="absolute h-16 w-16 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-medium mb-1 text-indigo-700 group-hover:text-indigo-800">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">{description}</p>
            <div className="flex items-center text-sm">
              <span className="flex items-center mr-4">
                <PlayCircle className="h-3 w-3 mr-1" />
                {views} views
              </span>
              <span className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {duration}
              </span>
            </div>
          </div>
        </div>

        {/* Embedded YouTube Player with iframe */}
        {isExpanded && (
          <div className="p-4">
            <iframe
              width="100%"
              height="390"
              src={`https://www.youtube.com/embed/${videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoCard;
