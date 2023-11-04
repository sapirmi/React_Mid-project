import { useState } from 'react'
import '../App.css'
import { useEffect } from 'react'
import './comps.css'

function AddUserComp(props) {

  const cancel = false
  const [user, setUser] = useState({"id": props.nextUserId + 1, 
                          "address": {"street": "", "city": "", "zipcode": ""}})
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  function getUser(){
    props.sendUser({...user, "name": name, "email": email})
    setName("")
    setEmail("")
  }

  return (
   <>

    <div>Add New User</div>
    <div className='framing'>
      <span>Name: </span>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input><br></br>
      <span>Email: </span>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input><br></br>
      <button className='yellowButton' onClick={() => props.toCancel(cancel)}>Cancel</button>
      <button className='yellowButton' onClick={getUser}>Add</button>
    </div>

   </>
  )
}

export default AddUserComp
