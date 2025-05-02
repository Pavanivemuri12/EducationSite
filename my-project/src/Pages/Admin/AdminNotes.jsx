import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { Plus, Pencil, Trash, X, Loader2, TriangleAlert } from "lucide-react";
import { addNotes, getNotes, deleteNotes, editNotes } from "../../api/api"; // Ensure you have these API methods.

const AdminNotes = () => {
  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentNote, setCurrentNote] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const noteTitleRef = useRef("");
  const noteLinkRef = useRef("");

  const fetchData = async () => {
    try {
      const res = await getNotes();
      if (res.status === 200) {
        setNotes(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const newNote = {
      noteTitle: noteTitleRef.current.value,
      noteLink: noteLinkRef.current.value,
    };
  
    try {
      const response = await addNotes(newNote);
      if (response.status === 201 || response.status === 200) {
        setShowAdd(false);
        toast.success("Note Added");
  
        setNotes((prevNotes) => [...prevNotes, response.data]);
      }
    } catch (error) {
      toast.error("Error while Adding");
      console.error("error while adding", error);
    }
  };
  

  const handleEdit = async (e) => {
    e.preventDefault();
    const updatedNote = {
      noteTitle: noteTitleRef.current.value,
      noteLink: noteLinkRef.current.value,
    };

    try {
      const response = await editNotes(updatedNote, currentNote._id);
      if (response.status === 200) {
        setShowEdit(!showEdit);
        fetchData();
      }
    } catch (error) {
      toast.error("Error while Updating");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteNotes(id);
      if (response.status === 200) {
        console.log("Note deleted");
        fetchData();
      }
    } catch (error) {
      toast.error("error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-[90vh] flex flex-col justify-center items-center">
        <Loader2 className="text-blue-600 h-14 w-14 animate-spin" />
      </div>
    );
  }

  if (!notes || notes.length === 0) {
    return (
      <div className="w-screen h-[90vh] flex flex-col justify-center items-center">
        <TriangleAlert className="text-orange-400 h-12 w-12" />
        <p>No Notes Available !</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-start items-start">
      <div className="w-full flex flex-row justify-between items-center my-4 shadow-md rounded-md p-1 border">
        <button
          className="w-10 h-10 font-bold flex justify-center items-center border-2 border-green-500 rounded-md text-green-500 shadow-md hover:text-white hover:bg-green-500 hover:shadow-md"
          onClick={() => setShowAdd(!showAdd)}
        >
          <Plus className="w-8 h-8" />
        </button>
      </div>
      <table className="w-full h-full border-collapse border shadow-lg rounded-md">
        <thead className="shadow-md font-bold text-orange-500 text-left rounded-md">
          <tr>
            <th className="p-6">PID</th>
            <th className="p-6">Note Title</th>
            <th className="p-6">Note Link</th>
            <th className="p-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note, index) => (
            <tr key={index}>
              <td className="p-4">{note._id}</td>
              <td className="p-4">{note.noteTitle}</td>
              <td className="p-4 text-blue-600 underline cursor-pointer">{note.noteLink}</td>
              <td className="p-4 flex h-full w-full flex-row justify-start items-center gap-4">
                <button
                  className="h-15 w-15 border-emerald-500 border-2 p-1 rounded-md text-emerald-500 shadow-md hover:bg-emerald-500 hover:text-white hover:shadow-emerald-500"
                  onClick={() => {
                    setCurrentNote(note);
                    setShowEdit(true);
                  }}
                >
                  <Pencil />
                </button>
                <button
                  className="h-15 w-15 border-red-500 border-2 p-1 rounded-md text-red-500 shadow-md hover:bg-red-500 hover:text-white hover:shadow-red-500"
                  onClick={() => handleDelete(note._id)}
                >
                  <Trash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Modal */}
      {showAdd && (
        <div className="absolute top-0 left-0 z-50 h-screen w-screen flex justify-center items-center bg-black/40 ">
          <div className="h-[65%] w-1/3 flex flex-col justify-center items-center bg-white shadow-2xl rounded-md">
            <div className="h-full w-full flex flex-col justify-center items-center text-lg font-semibold">
              <div className="h-[20%] w-[80%] flex flex-row justify-center items-center">
                <h1 className="w-1/2 text-left text-xl my-6 font-bold text-green-500">Add Note</h1>
                <div
                  className="w-1/2 flex justify-end items-center text-red-500 cursor-pointer"
                  onClick={() => {
                    setShowAdd(!showAdd);
                  }}
                >
                  <X className="h-8 w-8 border-2 p-1 border-red-500 rounded-full hover:bg-red-500 hover:text-white" />
                </div>
              </div>
              <form
                className="h-[90%] w-[80%] flex flex-col justify-center items-center gap-6"
                onSubmit={handleAdd}
              >
                <input ref={noteTitleRef} type="text" placeholder="Note Title" className="w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-2 focus:shadow-lg focus:border-lime-400 rounded-sm" required />
                <input ref={noteLinkRef} type="text" placeholder="Note Link" className="w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-2 focus:shadow-lg focus:border-lime-400 rounded-sm" required />
                <button type="submit" className="w-full h-[3rem] bg-green-500 text-white rounded-sm shadow-lg hover:shadow-green-400">Add</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEdit && (
        <div className="absolute top-0 left-0 z-50 h-screen w-screen flex justify-center items-center bg-black/40 ">
          <div className="h-[75%] w-1/3 flex flex-col justify-center items-center bg-white shadow-2xl rounded-md">
            <div className="h-full w-full flex flex-col justify-center items-center text-lg font-semibold">
              <div className="h-[20%] w-[80%] flex flex-row justify-center items-center">
                <h1 className="w-1/2 text-left text-xl my-6 font-bold text-blue-500">Edit Note</h1>
                <div
                  className="w-1/2 flex justify-end items-center text-red-500 cursor-pointer"
                  onClick={() => {
                    setShowEdit(!showEdit);
                  }}
                >
                  <X className="h-8 w-8 border-2 p-1 border-red-500 rounded-full hover:bg-red-500 hover:text-white" />
                </div>
              </div>
              <form
                className="h-[75%] w-[80%] flex flex-col justify-center items-center gap-8"
                onSubmit={handleEdit}
              >
                <input ref={noteTitleRef} type="text" placeholder="Note Title" defaultValue={currentNote.noteTitle} className="w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-blue-400 rounded-sm" required />
                <input ref={noteLinkRef} type="text" placeholder="Note Link" defaultValue={currentNote.noteLink} className="w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-blue-400 rounded-sm" required />
                <button type="submit" className="w-full h-[3rem] bg-blue-500 text-white rounded-sm shadow-lg hover:shadow-blue-400">Save</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNotes;
