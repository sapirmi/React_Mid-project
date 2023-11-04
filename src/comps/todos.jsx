import { useState } from 'react'
import '../App.css'
import { useEffect } from 'react'
import './comps.css'

function TodosComp(props) {

  const [todoId, setTodoId] = useState(0)

  useEffect(() => {
    props.markComplete(todoId)
  }, [todoId])

  return (
   <>
  <span>Title: {props.title}</span><br></br>
  <span>Completed: {props.completed ? "True" : "False"}</span>
  {props.completed ? <></> : <button className='yellowButton' onClick={() => setTodoId(props.id)}>Mark Completed</button>}
   </>
  )}

export default TodosComp
