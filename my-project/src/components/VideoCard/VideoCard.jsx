import { useState } from "react";
import { Menu } from "lucide-react";

const lessons = [
  { id: 1, title: "Introduction", thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfrCN3BgB7g-_aAr5zKcfj7ZUzUlIaw2S_fQ&s", url: "https://drive.google.com/file/d/17zrdEPJFQb4JFVw7FtnW8MZJJVrJqYva/view?usp=sharing" },
  { id: 2, title: "Lesson 1", thumbnail: "https://booxoul.com/wp-content/uploads/2023/07/10-Best-Harry-Potter-Movie-Scenes-We-Love.jpeg", url: "https://drive.google.com/file/d/YOUR_VIDEO_ID_2/view?usp=sharing" },
  { id: 3, title: "Lesson 2", thumbnail: "https://variety.com/wp-content/uploads/2017/06/dobby-harry-potter.jpg", url: "https://drive.google.com/file/d/YOUR_VIDEO_ID_3/view?usp=sharing" },
];

const convertToPlayableURL = (url) => {
  const match = url.match(/drive\.google\.com\/file\/d\/(.+?)\//);
  return match ? `https://drive.google.com/file/d/${match[1]}/preview` : url;
};

export default function VideoCourse() {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [showThumbnails, setShowThumbnails] = useState(true);

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen relative">
      <button
        className={`fixed bottom-4 right-4 p-3 bg-gray-800 text-white rounded-full shadow-lg z-10 transition-transform ${showThumbnails ? 'hidden' : 'block'} cursor-pointer`}
        onClick={() => {
          setCurrentVideo(null);
          setShowThumbnails(true);
        }}
      >
        <Menu size={24} />
      </button>
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
