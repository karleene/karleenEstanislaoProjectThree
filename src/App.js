import './App.css';
import firebase from './firebase';
import { getDatabase, ref, onValue, push, remove } from 'firebase/database'
import Header from './Header';
import Form from './Form';
import Footer from './Footer';
import { useState, useEffect } from 'react';


function App() {

  // useState to keep track of the notes added / deleted
  const [notes, setNotes] = useState([]);

  // useState to keep track of what the user inputs
  const [userInput, setUserInput] = useState('');

  // On initial render / component mount, useEffect to implement onValue to keep track of changes.And push those values in an array
  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);

    onValue(dbRef, (response) => {
      const data = response.val();
      const newState = []
      for (let key in data) {
        newState.push(
          {
            key: key,
            name: data[key]
          }
        )
      }

      setNotes(newState)
    })
  }, []);

  // Create a handleInputChange function that will update our setUserInput
  const handleInputChange = (event) => {
    setUserInput(event.target.value)
  }

  // Create a handleSubmit function that will push data to firebase, and to our userInput
  const handleSubmit = (event) => {
    event.preventDefault();

    const database = getDatabase(firebase);
    const dbRef = ref(database);

    push(dbRef, userInput);

    setUserInput('');
  }

  // Create a handleRemove function that will remove data from firebase
  const handleRemove = (noteId) => {
    const database = getDatabase(firebase);
    const dbRef = ref(database, `/${noteId}`);

    remove(dbRef);
  }

  return (
    <div className="app">
      <Header />
      <Form
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      {
        <div className="wrapper">
          <section className="noteSection">
            <ul className="listOfNotes">
              {
                notes.map((singleNote) => {
                  return (
                    <li key={singleNote.key}>
                      <p>{singleNote.name}</p>
                      <button className="delete" onClick={() => { handleRemove(singleNote.key) }}>delete 🗑️</button>
                    </li>
                  )
                })
              }
            </ul>
          </section>
        </div>
      }
      <Footer />
    </div>
  );
}

export default App;

// Error handle if can't connect to firebase