import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { technologies } from "@/data/technologies";
import { CourseCard } from "@/components/CourseCard";

const Path = () => {
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);

  useEffect(() => {
    // Fetch enrolled courses from localStorage when the component mounts
    const storedCourses = JSON.parse(
      localStorage.getItem("enrolledCourses") || "[]"
    );
    setEnrolledCourses(storedCourses);
  }, []);

  // Filter technologies based on enrolled courses in localStorage
  const enrolledTechnologies = technologies.filter((tech) =>
    enrolledCourses.includes(tech.id)
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-white to-muted flex justify-center">
        <div className="container mx-auto px-4 pb-20 pt-24">
          {/* Title at the top */}
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent text-center">
            Enrolled Courses
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center mt-10">
            {enrolledTechnologies.length > 0 ? (
              enrolledTechnologies.map((tech) => (
                <CourseCard key={tech.id} {...tech} />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No enrolled courses found.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Path;
