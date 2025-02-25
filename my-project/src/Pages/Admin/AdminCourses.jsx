import { toast } from "sonner";

import { useEffect, useRef, useState } from "react";
import { Loader2, Pencil, Plus, Trash, TriangleAlert, X } from "lucide-react";
import { addCourses, getCourses,deleteCourses,editCourses } from "../../api/api";

//import BasicFruits from "../BasicFruits";
const AdminCourses = () => {
  //null -> products[] | Store the data
  const [courses, setCourses] = useState(null);
  //true (shows loading screen) -> false(hide loading screen) | Condition Render
  const [loading, setLoading] = useState(true);
  const [currentProduct, setCurrentProduct] = useState(null)
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false)
  const courseNameRef = useRef("");
  const thumbnailUrlRef = useRef("");
  const videoUrlRef = useRef("");
  const fetchData = async () => {
    try {
      const res = await getCourses();
      if (res.status === 200) {
        console.log(res.data);
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
    const newCourse = {
      courseName: courseNameRef.current.value,
      thumbnailUrl: thumbnailUrlRef.current.value,
      videoUrl: videoUrlRef.current.value
    };
  
    try {
      const response = await addCourses(newCourse);
      console.log("Response Data:", response.data); // Debugging
  
      if (response.status === 200 ) {
        setShowAdd(false);
        fetchData();
        console.log(fetchData());
        toast.success('Course Added');
  
        setCourses((prevCourses) => [...prevCourses, { ...response.data }]);
  
        
      }
    } catch (error) {
      toast.error("Error while Adding");
      console.log("error while adding", error);
    }
  };
  

  const editHelper = (product) => {
    setCurrentProduct(product)
    setShowEdit(true)

  }
  const handleEdit = async (e) => {
    e.preventDefault()
    const product = {
      courseName: courseNameRef.current.value,
      thumbnail: thumbnailUrlRef.current.value,
      videourl: videoUrlRef.current.value
    }
    try {
      const response = await editCourses(product, currentProduct._id)
      if (response.status === 200) {
        setShowEdit(!showEdit)
        fetchData()
        //info("Product Updated !")
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Error while Updating")
      
    }
  }
  const handleDelete = async (id) => {
    try {
      const response = await deleteCourses(id);
      if (response.status === 200) {
        console.log("Product deleted");
        fetchData();
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
     // console.error(error);
     toast.error("error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <div className="w-screen h-[90vh] flex flex-col justify-center items-center">
          <Loader2 className="text-lime-500 h-14 w-14 animate-spin" />
        </div>
      </>
    );
  }
  if (!courses || courses.length === 0) {
    return (
      <>
        <div className="w-screen h-[90vh] flex flex-col justify-center items-center">
          <TriangleAlert className="text-orange-400 h-12 w-12" />
          <p>No Products Available !</p>
        </div>
      </>
    );
  }
  return (
    <div className="w-full flex flex-col justify-start items-start">
      <div className="w-full flex flex-row justify-between items-center my-4 shadow-md rounded-md p-1 border">
       
        <button
          className="w-10 h-10 font-bold flex justify-center items-center border-2 border-green-500 rounded-md
         text-green-500 shadow-md hover:text-white hover:bg-green-500 hover:shadow-md
          hover:shadow-green-400"
          onClick={() => setShowAdd(!showAdd)}

        >
          <Plus className="w-8 h-8" />
        </button>
      </div>
      <table className="w-full h-full border-collapse border shadow-lg rounded-md">
        <thead className="shadow-md font-bold text-lime-500 text-left rounded-md">
          <tr>
            <th className="p-6">PID</th>
            <th className="p-6">courseName</th>
            <th className="p-6">Thumbnail</th>
            <th className="p-6">video</th>
            <th className="p-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((product, index) => (
            <tr key={index}>
              <td className="p-4">{product._id} </td>
              <td className="p-4">{product.courseName} </td>
              <td className="flex justify-start px-4 items-center">
                <img
                  src={product.thumbnailUrl}
                  alt={product.title}
                  className="h-12 w-12 object-cover rounded-full shadow-md bg-lime-500"
                />
              </td>

              <td className="p-4">{product.videoUrl}</td>
              <td className="p-4 flex h-full w-full flex-row justify-start items-center gap-4">
                <button
                  className="h-15 w-15 border-blue-500 border-2 p-1 rounded-md text-blue-500 shadow-md
               hover:bg-blue-500 hover:text-white hover:shadow-blue-500"
               onClick={() => { editHelper(product) }} >
                  <Pencil />
                </button>
                <button
                  className="h-15 w-15 border-red-500 border-2 p-1 rounded-md text-red-500 shadow-md
               hover:bg-red-500 hover:text-white hover:shadow-red-500"
                  onClick={() => {
                    handleDelete(product._id);
                  }}
                >
                  <Trash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

       {showAdd && (
        <>
          <div className="absolute top-0 left-0 z-50 h-screen w-screen flex justify-center items-center bg-black/40 ">
            <div className="h-[65%] w-1/3 flex flex-col justify-center items-center bg-white shadow-2xl rounded-md">
              <div className="h-full w-full flex flex-col justify-center items-center text-lg font-semibold">
                <div className="h-[20%] w-[80%] flex flex-row justify-center items-center">
                  <h1 className="w-1/2 text-left text-xl my-6 font-bold text-green-500">
                    Add Product
                  </h1>
                  <div
                    className="w-1/2 flex justify-end items-center text-red-500 cursor-pointer"
                    onClick={() => {
                      setShowAdd(!showAdd);
                    }}
                  >
                    <X className="h-8 w-8 border-2 p-1  border-red-500 rounded-full  hover:bg-red-500 hover:text-white" />
                  </div>
                </div>
                <form
                  className="h-[90%] w-[80%] flex flex-col justify-center items-center gap-6"
                  onSubmit={handleAdd}
                >
                  <input
                    ref={courseNameRef}
                    type="text"
                    title=""
                    id="courseName"
                    placeholder="courseName"
                    className="w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-2 focus:shadow-lg focus:border-b-2 focus:border-lime-400 rounded-sm"
                    required
                  />
                  <input
                    ref={thumbnailUrlRef}
                    type="text"
                    name=""
                    id="thumbnailUrl"
                    placeholder="Image URL"
                    className="w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-2 focus:shadow-lg focus:border-b-2 focus:border-lime-400 rounded-sm"
                    required
                  />
                  <input
                    ref={videoUrlRef}
                    type="text"
                    name=""
                    id="videoUrl"
                    placeholder="videoUrl"
                    className="w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-2 focus:shadow-lg focus:border-b-2 focus:border-lime-400 rounded-sm"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full h-[3rem]  shadow-lg shadow-gray-400 hover:shadow-green-400 bg-green-500 text-white rounded-sm outline-none"
                  >
                    Add
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )} 
      {showEdit && (
        <>
          <div className="absolute top-0 left-0 z-50 h-screen w-screen flex justify-center items-center bg-black/40 ">
            <div className='h-[75%] w-1/3 flex flex-col justify-center items-center bg-white shadow-2xl rounded-md'>
              <div className='h-full w-full flex flex-col justify-center items-center text-lg font-semibold'>
                <div className="h-[20%] w-[80%] flex flex-row justify-center items-center">
                  <h1 className='w-1/2 text-left text-xl my-6 font-bold text-blue-500'>Edit Product</h1>
                  <div className="w-1/2 flex justify-end items-center text-red-500 cursor-pointer" onClick={() => { setShowEdit(!showEdit) }}>
                    <X className="h-8 w-8 border-2 p-1  border-red-500 rounded-full  hover:bg-red-500 hover:text-white" />
                  </div>
                </div>
                <form className='h-[75%] w-[80%] flex flex-col justify-center items-center gap-8' onSubmit={handleEdit}>
                  <input ref={courseNameRef} type="text" name="" id="name" placeholder='courseName' defaultValue={currentProduct.courseName} className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-b-2 focus:border-blue-400 rounded-sm' required autoFocus />
                  <input ref={thumbnailUrlRef} type="text" name="" id="thumbnailUrl" placeholder='Image URL' defaultValue={currentProduct.thumbnailUrl} className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-b-2 focus:border-blue-400 rounded-sm' required />
                  <input ref={videoUrlRef} type="text" name="" id="videoUrl" placeholder='video url' defaultValue={currentProduct.videoUrl} className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-b-2 focus:border-blue-400 rounded-sm' required />
                  <button type="submit" className="w-full h-[3rem]  shadow-lg shadow-gray-400 hover:shadow-blue-400 bg-blue-500 text-white rounded-sm outline-none">Save</button>
                </form>
              </div>
            </div>
          </div>
        </> 
      )} 
    </div>
  );
};

export default AdminCourses;