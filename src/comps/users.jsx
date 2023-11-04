import { useState } from 'react'
import '../App.css'
import { useEffect } from 'react'
import './comps.css'

function UsersComp(props) {

  const userId = props.id
  const [isOver, setIsOver] = useState(false)
  const [updateUser, setUpdateUser] = useState({"id": userId, "name": props.name, "email": props.email,
                                                "street": props.street, "city": props.city, "zipcode": props.zipcode})
  const [selectId, setSelectId] = useState(false)

  function clickID(){
    setSelectId(!selectId)
    props.titles(userId)
  }
  
  return (
    <div style={{"border": `1px solid ${props.color}`,"backgroundColor": selectId? "orange" : "white"}}>
      ID: <span onClick={clickID}>{props.id}</span><br/>
      Name: <input type='text' defaultValue={props.name} onChange={(e) => setUpdateUser({...updateUser, "name": e.target.value})}></input><br/>
      Email: <input type='text' defaultValue={props.email} onChange={(e) => setUpdateUser({...updateUser, "email": e.target.value})}></input><br/><br/>
      <button className="greyButton" onMouseOver={(e) => setIsOver(true)} onClick={(e) => setIsOver(false)}>Other data</button>    
      <button className="yellowButton" onClick={() => props.update(updateUser)}>Update</button>
      <button className="yellowButton" onClick={() => props.toDelete(userId)}>Delete</button>
      {isOver && <div className='framing'>
        Street: <input type='text' defaultValue={props.street} onChange={(e) => setUpdateUser({...updateUser, "street": e.target.value})}></input><br/>
        City: <input type='text' defaultValue={props.city} onChange={(e) => setUpdateUser({...updateUser, "city": e.target.value})}></input><br/>
        Zip Code: <input type='text' defaultValue={props.zipcode} onChange={(e) => setUpdateUser({...updateUser, "zipcode": e.target.value})}></input>
        </div>}
    </div>
  )
}

export default UsersComp
