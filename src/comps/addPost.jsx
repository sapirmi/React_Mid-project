import { useState } from 'react'
import '../App.css'
import { useEffect } from 'react'
import './comps.css'

function AddPostComp(props) {

  const cancel = false
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [newPost, setNewPost] = useState({"userId": props.id, "id": props.nextPostIdChild + 1})

  function sendPost(){
    props.sendPostChild({...newPost, "title": title, "body": body})
    setTitle("")
    setBody("")
  }


  return (
   <>

    <div>New Todo: User {props.id}</div>
    <div className='framing'>
      <span>Title: </span>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input><br></br>
      <span>Body: </span>
      <input type="text" value={body} onChange={(e) => setBody(e.target.value)}></input><br></br>
      <button className='yellowButton' onClick={() => props.toCancel(cancel)}>Cancel</button>
      <button className='yellowButton' onClick={sendPost}>Add</button>
    </div>

   </>
  )
}

export default AddPostComp
