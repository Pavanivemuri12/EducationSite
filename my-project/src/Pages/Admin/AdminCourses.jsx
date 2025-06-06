import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { Loader2, Pencil, Plus, Trash, X } from "lucide-react";
import { getCourses, deleteCourses, editCourses } from "../../api/api";

const AdminCourses = () => {
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const courseNameRef = useRef("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const uploadToCloudinary = async (file, resourceType) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.error?.message || "Upload failed");

    return data.secure_url;
  };

  const fetchData = async () => {
    try {
      const res = await getCourses();
      if (res.status === 200) {
        setCourses(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setAdding(true);

    try {
      const thumbnailUrl = await uploadToCloudinary(thumbnailFile, "image");

      const formData = new FormData();
      formData.append("courseName", courseNameRef.current.value);
      formData.append("thumbnailUrl", thumbnailUrl);
      formData.append("video", videoFile);

      const res = await fetch("http://localhost:3000/courses/add", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add course");
      }

      const data = await res.json();
      setShowAdd(false);
      toast.success("Course Added");
      setCourses((prevCourses) => [...prevCourses, data.course]);
    } catch (error) {
      toast.error("Error while Adding");
      console.error("error while adding", error);
    } finally {
      setAdding(false);
    }
  };

  const editHelper = (product) => {
    setCurrentProduct(product);
    setShowEdit(true);
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const product = {
      courseName: courseNameRef.current.value,
      thumbnailUrl: currentProduct.thumbnailUrl,
      videoUrl: currentProduct.videoUrl,
    };

    try {
      const response = await editCourses(product, currentProduct._id);
      if (response.status === 200) {
        setShowEdit(false);
        fetchData();
        toast.success("Course Updated");
      }
    } catch (error) {
      toast.error("Error while Updating");
      console.error("Error while editing", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteCourses(id);
      if (response.status === 200) {
        fetchData();
        toast.success("Course Deleted");
      }
    } catch (error) {
      toast.error("Error while Deleting");
      console.error("Error while deleting", error);
    }
  };

  const convertToPlayableURL = (url) => {
    const match = url.match(/drive\.google\.com\/file\/d\/(.+?)\//);
    return match ? `https://drive.google.com/file/d/${match[1]}/preview` : url;
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-[90vh] flex flex-col justify-center items-center">
        <Loader2 className="text-lime-500 h-14 w-14 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-start items-start px-2 md:px-6">
      <div className="w-full flex flex-row justify-between items-center my-4 shadow-md rounded-md p-1 border">
        <button
          className="w-10 h-10 font-bold flex justify-center items-center border-2 border-green-500 rounded-md text-green-500 shadow-md hover:text-white hover:bg-green-500 hover:shadow-md hover:shadow-green-400"
          onClick={() => setShowAdd(!showAdd)}
        >
          <Plus className="w-8 h-8" />
        </button>
      </div>

      {/* Responsive wrapper for table with horizontal scroll on small screens */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[600px] md:min-w-full border-collapse border shadow-lg rounded-md">
          <thead className="shadow-md font-bold text-lime-500 text-left rounded-md bg-lime-100">
            <tr>
              <th className="p-4 md:p-6">PID</th>
              <th className="p-4 md:p-6">Course Name</th>
              <th className="p-4 md:p-6">Thumbnail</th>
              <th className="p-4 md:p-6">Video</th>
              <th className="p-4 md:p-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses?.map((product, index) => (
              <tr
                key={index}
                className="border-b last:border-none hover:bg-lime-50 transition-colors"
              >
                <td className="p-2 md:p-4 break-all">{product._id}</td>
                <td className="p-2 md:p-4 break-words max-w-[150px] md:max-w-none">
                  {product.courseName}
                </td>
                <td className="flex justify-start px-2 md:px-4 items-center">
                  <img
                    src={product.thumbnailUrl}
                    alt={product.title}
                    className="h-12 w-12 object-cover rounded-full shadow-md bg-lime-500"
                  />
                </td>
                <td
                  className="p-2 md:p-4 text-blue-600 underline cursor-pointer break-all max-w-[150px] md:max-w-none"
                  onClick={() => setSelectedVideo(product.videoUrl)}
                >
                  {product.videoUrl}
                </td>
                <td className="p-2 md:p-4 flex flex-wrap gap-2 md:gap-4">
                  <button
                    className="border-blue-500 border-2 p-1 rounded-md text-blue-500 shadow-md hover:bg-blue-500 hover:text-white flex items-center justify-center"
                    onClick={() => editHelper(product)}
                    aria-label={`Edit course ${product.courseName}`}
                  >
                    <Pencil />
                  </button>
                  <button
                    className="border-red-500 border-2 p-1 rounded-md text-red-500 shadow-md hover:bg-red-500 hover:text-white flex items-center justify-center"
                    onClick={() => handleDelete(product._id)}
                    aria-label={`Delete course ${product.courseName}`}
                  >
                    <Trash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed top-0 left-0 z-50 h-screen w-screen flex justify-center items-center bg-black/40 p-4">
          <div className="w-full max-w-md bg-white shadow-2xl rounded-md flex flex-col items-center max-h-[90vh] overflow-y-auto">
            <div className="w-[90%] flex justify-between items-center mt-4">
              <h1 className="text-xl font-bold text-green-500">Add Course</h1>
              <X
                className="text-red-500 cursor-pointer"
                onClick={() => setShowAdd(false)}
              />
            </div>
            <form
              className="w-[90%] flex flex-col gap-4 mt-6"
              onSubmit={handleAdd}
            >
              <input
                ref={courseNameRef}
                type="text"
                placeholder="Course Name"
                required
                className="p-2 bg-[#f5f5f7] border-b-2 focus:border-lime-400 outline-none rounded-sm w-full"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnailFile(e.target.files[0])}
                required
                className="w-full"
              />
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files[0])}
                required
                className="w-full"
              />
              <button
                type="submit"
                disabled={adding}
                className={`h-12 rounded-md shadow-md text-white flex items-center justify-center gap-2 w-full
                  ${adding ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}
              >
                {adding && <Loader2 className="animate-spin h-5 w-5" />}
                {adding ? "Uploading..." : "Add"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-4xl relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-red-500 hover:bg-red-500 hover:text-white border border-red-500 rounded-full p-1"
              onClick={() => setSelectedVideo(null)}
              aria-label="Close video"
            >
              <X />
            </button>
            {selectedVideo.includes("drive.google.com") ? (
              <iframe
                src={convertToPlayableURL(selectedVideo)}
                width="100%"
                height="500px"
                allow="autoplay"
                frameBorder="0"
                title="Google Drive Video"
                allowFullScreen
              />
            ) : (
              <video
                controls
                width="100%"
                height="500px"
                className="rounded-md max-w-full"
                src={selectedVideo}
              />
            )}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEdit && (
        <div className="fixed top-0 left-0 z-50 h-screen w-screen flex justify-center items-center bg-black/40 p-4">
          <div className="w-full max-w-md bg-white shadow-2xl rounded-md flex flex-col items-center max-h-[80vh] overflow-y-auto">
            <div className="w-[90%] flex justify-between items-center mt-4">
              <h1 className="text-xl font-bold text-green-500">Edit Course</h1>
              <X
                className="text-red-500 cursor-pointer"
                onClick={() => setShowEdit(false)}
              />
            </div>
            <form
              className="w-[90%] flex flex-col gap-4 mt-6"
              onSubmit={handleEdit}
            >
              <input
                ref={courseNameRef}
                defaultValue={currentProduct?.courseName}
                type="text"
                placeholder="Course Name"
                required
                className="p-2 bg-[#f5f5f7] border-b-2 focus:border-lime-400 outline-none rounded-sm w-full"
              />
              {/* Optionally add inputs to update thumbnail/video here */}
              <button
                type="submit"
                className="h-12 rounded-md bg-green-500 shadow-md text-white hover:bg-green-600 w-full"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCourses;
