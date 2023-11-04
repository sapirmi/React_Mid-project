import { useState } from 'react'
import './App.css'
import {getAll} from "./utils"
import { useEffect } from 'react'
import UsersComp from './comps/users'
import TitlesComp from './comps/titles'
import AddUserComp from './comps/addUser'

function App() {

  const URL = "https://jsonplaceholder.typicode.com"

  //DB
  const [users, setUsers] = useState([])
  const [todos, setTodos] = useState([])
  const [posts, setPosts] = useState([])

  const [search, setSearch] = useState("")
  const [filteredUsers, setFilteredUsers] = useState([])
  const [updatedUser, setUpdatedUser] = useState({})
  const [deleteUser, setDeleteUser] = useState(0)
  const [getTitles, setGetTitles] = useState("")
  const [addUser, setAddUser] = useState(false)
  
  //Get DB
  useEffect(() => {
    async function getData(){
      const {data: allUsers} = await getAll(`${URL}/users`)
      setUsers(allUsers)
      const {data: allTodo} = await getAll(`${URL}/todos`)
      setTodos(allTodo)
      const {data: allPosts} = await getAll(`${URL}/posts`)
      setPosts(allPosts)
    }
    getData()
  }, [])

  //Get users
  useEffect(() => {
    setFilteredUsers(users)
  }, [users])

  //Get filtered users
  useEffect(() => {
    setFilteredUsers(users.filter(user => user.name.includes(search) || user.email.includes(search)))
  }, [search])

  //Get is all tasks completed
  function getTasks(id){
    const tasks = todos.filter(todo => todo.userId === id).map(task => (task.completed))
    if(tasks.includes(false)){
      return false
    }else {return true}
  }

  //Update user in DB
  useEffect(() => {
    const newUser = users.find(user => user.id === updatedUser.id)
    const updated = {...newUser, "name": updatedUser.name, "email": updatedUser.email,
                    "address": {"street": updatedUser.street, "city": updatedUser.city,
                    "zipcode": updatedUser.zipcode}}
    const newUsers = users.map(user => user.id === newUser.id ? user = updated : user)
    setUsers(newUsers);
  }, [updatedUser])

  //Delete user in DB
  useEffect(() => {
    const newUsers = users.filter(user => user.id !== deleteUser)
    setUsers(newUsers);
  }, [deleteUser])

  //Get todo ID for todo complete mark
  function getTodoId(todoId){
    const complete = todos.find(todo => todo.id === todoId)
    const newTodo = {...complete, "completed": true}
    setTodos(todos.map(todo => todo.id === todoId ? todo = newTodo : todo))
  }


  return (
    <>
    <div className='rowDisplay'>
      <span className='columnDisplay'>
        Search: <input type='text' onChange={(e) => setSearch(e.target.value)}></input>
        <button className="yellowButton" onClick={() => setAddUser(true)}>Add New User</button><br/>
        <div>
          {filteredUsers.map(user => (
            <div key={user.id}>
              <UsersComp id={user.id} name={user.name} email={user.email}
              color={getTasks(user.id) ? "green" : "red"}
              street={user.address.street} city={user.address.city} zipcode={user.address.zipcode}
              update={(user) => setUpdatedUser(user)} toDelete={(userId) => setDeleteUser(userId)}
              titles={(userId) => setGetTitles(userId)}/>
              <br/>
            </div>
          ))}
        </div></span>
      <div className='columnDisplay'>
        {addUser ? <AddUserComp toCancel={() => setAddUser(false)}
                    nextUserId={users.length} sendUser={(newUser) => setUsers([...users, newUser])}
        ></AddUserComp>
        : getTitles !== "" && <TitlesComp id={getTitles} 
                              postsArr={posts.filter(post => post.userId === getTitles)}
                              todosArr={todos.filter(todo => todo.userId === getTitles)}
                              markComplete={getTodoId} nextTodoId={todos.length}
                              sendTodo={(newTodo) => setTodos([...todos, newTodo])}
                              nextPostId={posts.length} sendPost={(newPost => setPosts([...posts, newPost]))}/>}
      </div>
    </div>
    </>
  )
}

export default App
