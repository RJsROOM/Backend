import { useState } from 'react'
import axios from 'axios'

function App() {

  const [notes, setNotes] = useState([
  {
    title: "test title 1",
    description: "test description"
  },
  {
    title: "test title 2",
    description: "test description"
  },
  {
    title: "test title 3",
    description: "test description"
  },
  {
    title: "test title 4",
    description: "test description"
  },
  ])

  axios.get('http://localhost:3000/notes')
  .then((res)=>{
    setNotes(res.data.notes)
  })


  return (
    <>
      <div className="notes">
        {
          notes.map(note=>{
            return <div className="note">
                      <h1>{note.title}</h1>
                      <p>{note.description}</p>
                    </div>
          })
        }
      </div>
    </>
  )
}

export default App
// for using backend APIs we created in the frontend we use AXIOS package to call for the APIs we've created in the backend.