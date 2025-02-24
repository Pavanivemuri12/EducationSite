

import { useState } from "react";

const documents = [
  { id: 1, title: "English Notes", url: "https://drive.google.com/file/d/YOUR_DOC_ID_1/view?usp=sharing" },
  { id: 2, title: "DevOps Notes", url: "https://drive.google.com/file/d/YOUR_DOC_ID_2/view?usp=sharing" },
  { id: 3, title: "Operating System Notes", url: "https://drive.google.com/file/d/YOUR_DOC_ID_3/view?usp=sharing" },
];

export default function DocumentLinks() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDocs = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <h1 className="text-2xl font-bold">
    Notes
    </h1>
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <input
        type="text"
        placeholder="Search documents..."
        className="mb-4 p-2 border rounded w-1/2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="w-3/4 bg-white p-4 shadow-lg rounded-lg">
        {filteredDocs.map((doc) => (
          <div key={doc.id} className="mb-3">
            <h3 className="text-lg font-semibold text-gray-800">{doc.title}</h3>
            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {doc.url}
            </a>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
