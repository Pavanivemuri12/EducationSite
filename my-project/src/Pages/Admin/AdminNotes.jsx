import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { Plus, Pencil, Trash, X, Loader2, TriangleAlert } from "lucide-react";
import { addNotes, getNotes, deleteNotes, editNotes } from "../../api/api";

const sections = ["1-1", "1-2", "2-1", "2-2", "3-1", "3-2", "4-1", "4-2"];

const AdminNotes = () => {
  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentNote, setCurrentNote] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const noteTitleRef = useRef("");
  const noteLinkRef = useRef("");
  const [activeSectionForAdd, setActiveSectionForAdd] = useState(null); // which section opened add modal

  // Group notes by section for display (with trimming for safety)
  const groupedNotes = {};
  sections.forEach((sec) => (groupedNotes[sec] = []));
  if (notes) {
    notes.forEach((note) => {
      if (
        note &&
        note.section &&
        sections.includes(note.section.trim())
      ) {
        const trimmedSection = note.section.trim();
        groupedNotes[trimmedSection].push(note);
      } else {
        console.warn("Note with unknown or invalid section:", note);
      }
    });
  }

  const fetchData = async () => {
    try {
      const res = await getNotes();
      if (res.status === 200) {
        setNotes(res.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch notes.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!activeSectionForAdd) {
      toast.error("Invalid section for adding note.");
      return;
    }

    const newNote = {
      noteTitle: noteTitleRef.current.value,
      noteLink: noteLinkRef.current.value,
      section: activeSectionForAdd,
    };

    try {
      const response = await addNotes(newNote);
      console.log("Add response:", response);
      if (response.status === 201 || response.status === 200) {
        setShowAdd(false);
        toast.success("Note Added");
        fetchData(); // fetch fresh list after add
      }
    } catch (error) {
      toast.error("Error while Adding");
      console.error("error while adding", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteNotes(id);
      if (response.status === 200) {
        toast.success("Note Deleted");
        fetchData();
      }
    } catch (error) {
      toast.error("Error while Deleting");
      console.error(error);
    }
  };

  const handleEditOpen = (note) => {
    setCurrentNote(note);
    setShowEdit(true);
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const updatedNote = {
      noteTitle: noteTitleRef.current.value,
      noteLink: noteLinkRef.current.value,
      section: currentNote.section,
    };

    try {
      const response = await editNotes(updatedNote, currentNote._id);
      if (response.status === 200) {
        setShowEdit(false);
        fetchData();
        toast.success("Note Updated");
      }
    } catch (error) {
      toast.error("Error while Updating");
      console.error(error);
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
    <div className="w-full flex flex-col justify-start items-start gap-6">
      {sections.map((section) => (
        <div key={section} className="w-full border rounded-md p-4 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-lime-600">{`Sem ${section}`}</h2>

            {/* Show Add button for EVERY section */}
            <button
              className="flex items-center gap-1 border-2 border-green-500 rounded-md px-3 py-1 text-green-500 hover:bg-green-500 hover:text-white"
              onClick={() => {
                setActiveSectionForAdd(section);
                setShowAdd(true);
              }}
            >
              <Plus /> Add Note
            </button>
          </div>

          {/* Notes table per section */}
          {(!groupedNotes[section] || groupedNotes[section].length === 5) ? (
            <p className="text-gray-500 italic">No notes in this section.</p>
          ) : (
            <table className="w-full border-collapse border shadow rounded-md">
              <thead className="bg-orange-100 text-left font-semibold text-orange-600">
                <tr>
                  <th className="p-3 border-b border-orange-300">PID</th>
                  <th className="p-3 border-b border-orange-300">Note Title</th>
                  <th className="p-3 border-b border-orange-300">Note Link</th>
                  <th className="p-3 border-b border-orange-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {groupedNotes[section].map((note) => (
                  <tr key={note._id} className="hover:bg-orange-50">
                    <td className="p-3 border-b border-orange-300">{note._id}</td>
                    <td className="p-3 border-b border-orange-300">{note.noteTitle}</td>
                    <td className="p-3 border-b border-orange-300 text-blue-600 underline cursor-pointer">
                      <a href={note.noteLink} target="_blank" rel="noreferrer">
                        {note.noteLink}
                      </a>
                    </td>
                    <td className="p-3 border-b border-orange-300 flex gap-3">
                      {/* Delete button for all notes */}
                      <button
                        onClick={() => handleDelete(note._id)}
                        className="border-red-500 border-2 p-1 rounded-md text-red-500 shadow-md hover:bg-red-500 hover:text-white hover:shadow-red-500"
                        title="Delete Note"
                      >
                        <Trash />
                      </button>

                      {/* Edit button */}
                      <button
                        onClick={() => handleEditOpen(note)}
                        className="border-blue-500 border-2 p-1 rounded-md text-blue-500 shadow-md hover:bg-blue-500 hover:text-white hover:shadow-blue-500"
                        title="Edit Note"
                      >
                        <Pencil />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40">
          <div className="w-1/3 bg-white rounded-md shadow-2xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-green-600">Add Note to Section {activeSectionForAdd}</h2>
              <button
                onClick={() => setShowAdd(false)}
                className="text-red-500 hover:bg-red-500 hover:text-white rounded-full p-1"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAdd} className="flex flex-col gap-4">
              <input
                ref={noteTitleRef}
                type="text"
                placeholder="Note Title"
                required
                className="p-2 border rounded shadow-sm outline-none focus:border-green-500"
              />
              <input
                ref={noteLinkRef}
                type="url"
                placeholder="Note Link"
                required
                className="p-2 border rounded shadow-sm outline-none focus:border-green-500"
              />
              <button
                type="submit"
                className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
              >
                Add Note
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEdit && currentNote && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40">
          <div className="w-1/3 bg-white rounded-md shadow-2xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-blue-600">Edit Note</h2>
              <button
                onClick={() => setShowEdit(false)}
                className="text-red-500 hover:bg-red-500 hover:text-white rounded-full p-1"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEdit} className="flex flex-col gap-4">
              <input
                ref={noteTitleRef}
                defaultValue={currentNote.noteTitle}
                type="text"
                placeholder="Note Title"
                required
                className="p-2 border rounded shadow-sm outline-none focus:border-blue-500"
              />
              <input
                ref={noteLinkRef}
                defaultValue={currentNote.noteLink}
                type="url"
                placeholder="Note Link"
                required
                className="p-2 border rounded shadow-sm outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


export default AdminNotes;
