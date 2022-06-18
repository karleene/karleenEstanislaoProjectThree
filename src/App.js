import './App.css';
import firebase from './firebase';
import { getDatabase, ref, onValue, push, remove } from 'firebase/database'
import axios from 'axios';
import Header from './Header';
import Quote from './Quote';
import Form from './Form';
import Notes from './Notes';
import Footer from './Footer';
import { useState, useEffect } from 'react';
// import DateTime from './DateTime';


function App() {

  // useState to keep track of the 'quote of the day' and author
  const [ quote, setQuote ] = useState('');
  const [ author, setAuthor ] = useState('');

  // useState to keep track of the notes added / deleted
  const [notes, setNotes] = useState([]);

  // useState to keep track of what the user inputs
  const [userInput, setUserInput] = useState('');

  // on initial render/ component mount, useEffect to fetch the api for a random quote of the day to show on the page
  useEffect(() => {
    axios({
      url: 'https://morning-coast-00478.herokuapp.com/https://zenquotes.io?api=quotes',
      method: 'GET',
      dataResponse: 'json',
    }).then((apiData) => {
      setQuote(apiData.data[0].q);
      setAuthor(apiData.data[0].a);
    })
  }, [])  

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

  // Date object
  let current = new Date();

  // A function to fix how the minutes append to the page
  let minutes = function () {
    if (current.getMinutes() < 10) {
      return (minutes = "0" + current.getMinutes());
    } else {
      return (minutes = current.getMinutes());
    }
  };

  // Date variable
  const date = `${current.getDate()}-${current.getMonth() + 1}-${current.getFullYear()} ${current.getHours()}:${minutes()}`;
  
  // Create a handleInputChange function that will update our setUserInput
  const handleInputChange = (event) => {
    setUserInput(event.target.value)
  }

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
      <Quote 
      quote={quote}
      author={author}
      />
      <Form
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        value={userInput}
      />
      <Notes 
      notes={notes}
      handleRemove={handleRemove}
      />
      <Footer />
    </div>
  );
}

export default App;

