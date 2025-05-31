import { useState } from "react";
import { Menu } from "lucide-react";

// Replace these URLs with your actual Cloudinary-hosted video URLs
const lessons = [
  {
    id: 1,
    title: "Introduction",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfrCN3BgB7g-_aAr5zKcfj7ZUzUlIaw2S_fQ&s",
    url: "https://res.cloudinary.com/demo/video/upload/v1690000000/sample_video.mp4", // <-- Replace with your Cloudinary video URL
  },
  {
    id: 2,
    title: "Lesson 1",
    thumbnail: "https://booxoul.com/wp-content/uploads/2023/07/10-Best-Harry-Potter-Movie-Scenes-We-Love.jpeg",
    url: "https://res.cloudinary.com/demo/video/upload/v1690000001/lesson1.mp4",
  },
  {
    id: 3,
    title: "Lesson 2",
    thumbnail: "https://variety.com/wp-content/uploads/2017/06/dobby-harry-potter.jpg",
    url: "https://res.cloudinary.com/demo/video/upload/v1690000002/lesson2.mp4",
  },
];

export default function VideoCourse() {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [showThumbnails, setShowThumbnails] = useState(true);

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen relative">
      {/* Back button */}
      <button
        className={`fixed bottom-4 right-4 p-3 bg-gray-800 text-white rounded-full shadow-lg z-10 transition-transform ${
          showThumbnails ? 'hidden' : 'block'
        } cursor-pointer`}
        onClick={() => {
          setCurrentVideo(null);
          setShowThumbnails(true);
        }}
      >
        <Menu size={24} />
      </button>

      {/* Video Player */}
      {currentVideo && !showThumbnails ? (
        <div className="w-3/4 mb-4">
          <video controls autoPlay className="w-full h-auto rounded-lg shadow-lg">
            <source src={currentVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6 w-3/4">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
              onClick={() => {
                setCurrentVideo(lesson.url);
                setShowThumbnails(false);
              }}
            >
              <img src={lesson.thumbnail} alt={lesson.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{lesson.title}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
