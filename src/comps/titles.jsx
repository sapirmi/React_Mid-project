import { useState } from 'react'
import '../App.css'
import { useEffect } from 'react'
import './comps.css'
import TodosComp from './todos'
import PostsComp from './posts'
import AddTodoComp from './addTodo'
import AddPostComp from './addPost'

function TitlesComp(props) {

  const posts = props.postsArr
  const todos = props.todosArr

  const [todoId, setTodoId] = useState(0)
  const [addTodo, setAddTodo] = useState(false)
  const [addPost, setAddPost] = useState(false)

  useEffect(() => {
    props.markComplete(todoId)
  }, [todoId]);


  return (
   <>
  <div>Todos - User {props.id}</div>
  <button className='yellowButton' onClick={() => setAddTodo(true)}>Add</button>
  <div className='framing' style={{"width": "400px"}}>
  {addTodo ? <AddTodoComp id={props.id} toCancel={(cancel) => setAddTodo(cancel)}
              nextTodoIdChild={props.nextTodoId} sendTodoChild={(newTodo) => props.sendTodo(newTodo)}></AddTodoComp>
  : todos.map(todo => (
    <div key={todo.id} className='titleFraming'>
      <TodosComp id={todo.id} completed={todo.completed} title={todo.title}
      markComplete={(todoId) => setTodoId(todoId)}></TodosComp>
    </div>
  ))}
  </div>
  <br></br>

  
  <div>Posts - User {props.id}</div>
  <button className='yellowButton' onClick={() => setAddPost(true)}>Add</button>
  <div className='framing' style={{"width": "400px"}}>
  {addPost ? <AddPostComp id={props.id} toCancel={(cancel) => setAddPost(cancel)}
              nextPostIdChild={props.nextPostId} sendPostChild={(newPost) => props.sendPost(newPost)}></AddPostComp>
  : posts.map(post => (
    <div key={post.id} className='titleFraming'>
      <PostsComp title={post.title} body={post.body}></PostsComp>
    </div>
  ))}
  </div>  
   </>
  )
}

export default TitlesComp
