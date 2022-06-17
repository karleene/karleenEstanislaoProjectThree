import './App.css';
import firebase from './firebase';
import { getDatabase, ref, onValue, push, remove } from 'firebase/database'
// import axios from 'axios';
import Header from './Header';
import Form from './Form';
import Footer from './Footer';
import { useState, useEffect } from 'react';
// import DateTime from './DateTime';


function App() {

  // useState to keep track of the notes added / deleted
  const [notes, setNotes] = useState([]);

  // useState to keep track of what the user inputs
  const [userInput, setUserInput] = useState('');

  // useState to keep track of date changes
  const [noteDate, setNoteDate] = useState(null);

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
            name: data[key].message,
            date: data[key].date
          }
        )
      }

      setNotes(newState)
    })
  }, [userInput]);

  // useEffect( () => {
  //     axios({
  //       baseURL: 'http://worldtimeapi.org/api/ip',
  //       method: 'GET',
  //       dataResponse: 'json',
  //       // params: {
  //       //   api_key: 'dd5b39d470b74bf6ac72adcd4c90770c'
  //       // }
  //     }).then ( (apiData) => {
  //       // console.log(apiData.data.datetime);
  //       setNoteDate(apiData.data.datetime);
  //     })
  // }, [])

  // Create a handleInputChange function that will update our setUserInput
  const handleInputChange = (event) => {
    setUserInput(event.target.value)
  }

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()} ${current.getHours()}:${current.getMinutes()}`;

  // Create a handleSubmit function that will push data to firebase, and to our userInput
  const handleSubmit = (event) => {
    event.preventDefault();

    const database = getDatabase(firebase);
    const dbRef = ref(database);

    if(userInput) {
      const note = { 
        'message': userInput, 
        'date': date,
      }

      push(dbRef, note);
    } else {
      alert('Please enter a note')
    }

    window.scrollBy({ top: 200, behavior: "smooth" })

    setUserInput('');

    setNoteDate(noteDate)
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
        value={userInput}
      />
      {
        <div className="wrapper">
          <section className="noteSection">
            <ul className="listOfNotes">
              {
                notes.slice(0).reverse().map((singleNote) => {
                  return (
                    <li key={singleNote.key}>
                      <p>{singleNote.date}<br></br>{singleNote.name}<button className="delete" onClick={() => { handleRemove(singleNote.key) }}>❌</button></p>
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