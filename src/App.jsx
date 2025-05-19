import { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase'; // Make sure this is correctly pointing to your firebase config
import { collection, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import TrashIcon from './assets/icons8-trash.svg';
import { auth } from './firebase'; // Don't forget to import it

function App() {
  const [newconfession, setNewConfession] = useState('');
  const [confessions, setConfessions] = useState([]);

  // Real-time listener for Firestore data
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'confessions'), (snapshot) => {
      const confessionsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setConfessions(confessionsData.reverse()); // newest first
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'confessions', id));
      // No need to update local state manually because onSnapshot will catch it
    } catch (error) {
      console.error('Error deleting confession: ', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newconfession.trim() === '') return;
  
    try {
      await addDoc(collection(db, 'confessions'), {
        text: newconfession,
        timestamp: new Date(),
        userId: auth.currentUser.uid // Save the user's anon ID
      });
      setNewConfession('');
    } catch (error) {
      console.error('Error adding confession: ', error);
    }
  };
  

  return (
    <div className="App">
      <h1>Things I Can't Send</h1>
        <textarea
          className="confession-input"
          rows={4}
          cols={50}
          value={newconfession}
          onChange={(e) => setNewConfession(e.target.value)}
          placeholder="What's on your mind..."
        />
        <br />
        <button onClick = {handleSubmit}>Confess</button>

      <div className="confessions-grid">
        {confessions.map((conf) => (
          <div key={conf.id} className="sticky-note">
            {conf.text}
            {conf.userId === auth.currentUser?.uid && (
            <img
              src={TrashIcon}
              alt="Delete"
              className="delete-icon"
              onClick={() => handleDelete(conf.id)}
            />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

