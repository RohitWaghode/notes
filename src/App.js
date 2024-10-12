import React, { useEffect, useState } from "react";
import "./style.css";

const App = () => {
  const [notesText, setNotesText] = useState("");
  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("notes")) || [];
  });

  // console.log("notes", notes);
  // useEffect(() => {
  //   const storedNotes = JSON.parse(localStorage.getItem("notes"));
  //   console.log("storedNotes", storedNotes);
  //   if (storedNotes) {
  //     setNotes(storedNotes);
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    console.log("notes", notes);
  }, [notes]);

  const addNote = () => {
    if (!notesText.trim()) return;

    const newNote = {
      text: notesText,
      date: new Date().toLocaleString(),
    };
    setNotes([...notes, newNote]);
    setNotesText("");
  };

  const deleteNotes = (i) => {
    const updateNotes = [...notes];
    updateNotes.splice(i, 1);
    setNotes(updateNotes);
  };

  return (
    <div>
      <h1>Notes</h1>
      <input
        type="text"
        value={notesText}
        placeholder="Write a Notes here..."
        onChange={(e) => {
          setNotesText(e.target.value);
        }}
      />
      <button onClick={addNote}>Add Note</button>
      <table>
        <thead>
          <tr>
            <th>Sr.NO</th>
            <th>Notes</th>
            <th>Date</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{note.text}</td>
              <td>{note.date}</td>
              <td>
                <button onClick={() => deleteNotes(index)}>Delete Notes</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
