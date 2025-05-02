import { useState, useEffect } from "react";
import { getNotes } from "../api/api";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchNotes = async () => {
    try {
      const res = await getNotes();
      if (res.status === 200) {
        setNotes(res.data);
      }
    } catch (error) {
      console.error("Error fetching notes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter((note) =>
    note.noteTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-center my-4">Notes</h1>
      <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
        <input
          type="text"
          placeholder="Search documents..."
          className="mb-4 p-2 border rounded w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="w-3/4 bg-white p-4 shadow-lg rounded-lg">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <div key={note._id} className="mb-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  {note.noteTitle}
                </h3>
                <a
                  href={note.noteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {note.noteLink}
                </a>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No matching notes found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Notes;
