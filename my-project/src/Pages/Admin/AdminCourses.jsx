import { useEffect, useState, useRef } from "react";
import {  PlusCircle, Edit, Trash2 } from "lucide-react";
import { getCourses, addCourses, editCourses, deleteCourses } from "../../api/api.jsx";

const convertToPlayableURL = (url) => {
    const match = url.match(/drive\.google\.com\/file\/d\/(.+?)\//);
    return match ? `https://drive.google.com/file/d/${match[1]}/preview` : url;
};

const AdminCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [showThumbnails, setShowThumbnails] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const courseNameRef = useRef();
    const thumbnailUrlRef = useRef();
    const videoUrlRef = useRef();

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

    const handleAddCourse = async (e) => {
      e.preventDefault();
      const newCourse = {
          courseName: courseNameRef.current.value,
          thumbnailUrl: thumbnailUrlRef.current.value,
          videoUrl: videoUrlRef.current.value,
      };
  
      try {
          const response = await addCourses(newCourse);
          if (response.status === 200) {
              console.log("Course Added");
  
              // Fetch latest courses from backend
              const updatedResponse = await getCourses();
              setCourses(updatedResponse.data);  // Update state with latest data
              
              setShowAddForm(false);
          }
      } catch (error) {
          console.error("Error while adding course", error);
      }
  };
  
  

    const handleEditCourse = async (id) => {
        try {
            const updatedCourse = await editCourses(id);
            setCourses(courses.map(course => course.id === id ? updatedCourse : course));
        } catch (error) {
            console.error("Error editing course:", error);
        }
    };

    const handleDeleteCourse = async (id) => {
        try {
            await deleteCourses(id);
            setCourses(courses.filter(course => course.id !== id));
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    };

    if (loading) return <p>Loading courses...</p>;
    if (error) return <p>{error}</p>;
    if (courses.length === 0) return <p>No courses available.</p>;

    return (
        <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen relative">
            <button
                className="fixed bottom-16 right-10 p-4 bg-blue-600 text-white rounded-full shadow-lg z-10 cursor-pointer"
                onClick={() => setShowAddForm(true)}
            >
                <PlusCircle size={40} />
            </button>
            {showAddForm && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white p-6 shadow-lg rounded-lg z-20 w-96">
                    <h3 className="text-xl font-bold mb-4">Add New Course</h3>
                    <form onSubmit={handleAddCourse} className="flex flex-col space-y-4">
                        <input ref={courseNameRef} type="text" placeholder="Course Name" className="border p-2 rounded" required />
                        <input ref={thumbnailUrlRef} type="text" placeholder="Thumbnail URL" className="border p-2 rounded" required />
                        <input ref={videoUrlRef} type="text" placeholder="Video URL" className="border p-2 rounded" required />
                        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Add Course</button>
              
                        <button type="button" className="bg-gray-400 text-white p-2 rounded" onClick={() => setShowAddForm(false)}>Cancel</button>
                    </form>
                </div>
            )}
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
                            className="relative cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
                        >
                            <img src={thumbnailUrl} alt={courseName} className="w-full h-48 object-cover" onClick={() => {
                                setCurrentVideo(videoUrl);
                                setShowThumbnails(false);
                            }}/>
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-gray-800">{courseName}</h3>
                            </div>
                            <div className="absolute top-2 right-2 flex space-x-10 bg-gray-100 p-2 rounded-lg shadow-md">
                                <Edit size={24} className="text-blue-600 cursor-pointer" onClick={() => handleEditCourse(id)} />
                                <Trash2 size={24} className="text-red-600 cursor-pointer" onClick={() => handleDeleteCourse(id)} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminCourses;