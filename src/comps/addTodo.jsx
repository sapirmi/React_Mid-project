import { useState } from 'react'
import '../App.css'
import { useEffect } from 'react'
import './comps.css'

function AddTodoComp(props) {

  const cancel = false
  const [newTodo, setNewTodo] = useState({"userId": props.id, "id": props.nextTodoIdChild + 1, "completed": false})
  const [title, setTitle] = useState("")

  function sendTodo(){
    props.sendTodoChild({...newTodo, "title": title})
    setTitle("")
  }

  return (
   <>

    <div>New Todo: User {props.id}</div>
    <div className='framing'>
      <span>Title: </span>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input><br></br>
      <button className='yellowButton' onClick={() => props.toCancel(cancel)}>Cancel</button>
      <button className='yellowButton' onClick={sendTodo}>Add</button>
    </div>

   </>
  )
}

export default AddTodoComp
