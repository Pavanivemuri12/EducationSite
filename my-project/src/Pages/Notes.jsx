import { useState, useEffect } from "react";
import { getNotes } from "../api/api";

const sections = ["1-1", "1-2", "2-1", "2-2", "3-1", "3-2", "4-1", "4-2"];

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch notes
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

  // Group notes by section
  const groupedNotes = {};
  sections.forEach((sec) => {
    groupedNotes[sec] = [];
  });
  notes.forEach((note) => {
    if (note.section && sections.includes(note.section)) {
      groupedNotes[note.section].push(note);
    }
  });

  // Filter notes inside each section according to searchTerm
  const filteredGroupedNotes = {};
  sections.forEach((sec) => {
    filteredGroupedNotes[sec] = groupedNotes[sec].filter((note) =>
      note.noteTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="w-screen h-[90vh] flex justify-center items-center">
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-lime-700 mb-6">Notes</h1>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search notes..."
          className="p-2 border border-gray-300 rounded-md w-1/2 focus:outline-none focus:border-lime-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {sections.map((section) => (
        <div key={section} className="mb-8 border rounded-md shadow-md p-4">
          <h2 className="text-xl font-semibold text-lime-600 mb-4">
            Sem {section}
          </h2>

          {filteredGroupedNotes[section].length === 0 ? (
            <p className="italic text-gray-500">No notes found in this section.</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300 rounded-md overflow-hidden">
              <thead className="bg-lime-100 text-lime-700 font-semibold">
                <tr>
                  <th className="p-3 border border-lime-300 text-left">Note Title</th>
                  <th className="p-3 border border-lime-300 text-left">Note Link</th>
                </tr>
              </thead>
              <tbody>
                {filteredGroupedNotes[section].map((note) => (
                  <tr key={note._id} className="hover:bg-lime-50">
                    <td className="p-3 border border-lime-300">{note.noteTitle}</td>
                    <td className="p-3 border border-lime-300">
                      <a
                        href={note.noteLink}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-blue-600 hover:underline break-words"
                      >
                        {note.noteLink}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
};

export default Notes;
