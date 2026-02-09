import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const [notes, setNotes] = useState([])



  function fetchNotes(){
    axios.get("http://localhost:3000/notes")
    .then(res=>{
      setNotes(res.data.note)
    })
  }


  useEffect(()=>{
    fetchNotes()
  }, [])



  function handleSubmit(e){
    //this preventdefault prevents reload of the page on form submission
    e.preventDefault() 
     const {title, description}= e.target.elements
    //  console.log(title.value,description.value)
     axios.post("http://localhost:3000/notes", {
      title: title.value,
      description: description.value
     })
     .then(res=>{
      console.log(res.data)
      fetchNotes()
     })
  }


  function handleDelNote(noteId){
    axios.delete(`http://localhost:3000/notes/${noteId}`)
    .then(res=>{
      console.log(res.data)
      fetchNotes()
    })
  }


  //handleUpdate making is our home assignment and have to implement it by ourself.
  
  // function hanldeUpdate(noteId,e){
  //   e.preventDefault()
  //   const {description}= e.target.elements
  //   axios.patch(`http://localhost:3000/notes/${noteId}`,{
  //     description: description.value
  //   })
  //   .then(res=>{
  //     console.log(res.data)
  //     fetchNotes()
  //   })
  // }

  


  return (
    <>
    <form className='note-create-form' onSubmit={handleSubmit}>
      <input name='title' type="text" placeholder='Enter Title' />
      <input name='description' type="text" placeholder='Enter Description' />
      <button>Create Note</button>
    </form>
      <div className="notes">
        {
          notes.map(note=>{
            return <div className="note">
                      <h2>{note.title}</h2>
                      <p>{note.description}</p>
                      <button onClick={()=>{handleDelNote(note._id)}}>Del note</button>
                    </div>
          })
        }
      </div>
    </>
  )
}

export default App
// for using backend APIs we created in the frontend we use AXIOS package to call for the APIs we've created in the backend.
// whenever our app() component is rendered and the state variables which we have created [notes, setNotes] are initialised then our app() component is re-rendered this always happens when we perform any actions with the state variables. and this leads to infite re-rendering of our app() component. to avoid this we use useEffect() hook which only runs once when the component is mounted.