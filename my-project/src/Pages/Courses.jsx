import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { getCourses } from "../api/api.jsx";

const convertToPlayableURL = (url) => {
    const match = url.match(/drive\.google\.com\/file\/d\/(.+?)\//);
    return match ? `https://drive.google.com/file/d/${match[1]}/preview` : url;
};

const CoursesList = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [showThumbnails, setShowThumbnails] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await getCourses();
                console.log("Fetched courses:", response);
                const formattedCourses = Array.isArray(response.data)
                    ? response.data.map(({ courseName, thumbnailUrl, videoUrl, _id }) => ({
                          id: _id,
                          courseName,
                          thumbnailUrl,
                          videoUrl,
                      }))
                    : [];
                setCourses(formattedCourses);
            } catch (error) {
                console.error("Error fetching courses:", error);
                setError("Failed to fetch courses");
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    if (loading) return <p>Loading courses...</p>;
    if (error) return <p>{error}</p>;
    if (courses.length === 0) return <p>No courses available.</p>;

    return (
        <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen relative">
            {currentVideo && !showThumbnails ? (
                <div className="w-3/4 mb-4">
                    {currentVideo.includes("drive.google.com") ? (
                        <iframe
                            src={convertToPlayableURL(currentVideo)}
                            width="100%"
                            height="500px"
                            allow="autoplay"
                            className="rounded-lg shadow-lg"
                        ></iframe>
                    ) : (
                        <video controls autoPlay className="w-full h-auto rounded-lg shadow-lg">
                            <source src={currentVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-6 w-3/4">
                    {courses.map(({ id, courseName, thumbnailUrl, videoUrl }) => (
                        <div
                            key={id}
                            className="cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
                            onClick={() => {
                                setCurrentVideo(videoUrl);
                                setShowThumbnails(false);
                            }}
                        >
                            <img src={thumbnailUrl} alt={courseName} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-gray-800">{courseName}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <button
                className={`fixed bottom-4 right-4 p-3 bg-gray-800 text-white rounded-full shadow-lg z-10 transition-transform ${showThumbnails ? 'hidden' : 'block'} cursor-pointer`}
                onClick={() => {
                    setCurrentVideo(null);
                    setShowThumbnails(true);
                }}
            >
                <Menu size={24} />
            </button>
        </div>
    );
};

export default CoursesList;
