import { useState } from 'react'
import '../App.css'
import { useEffect } from 'react'
import './comps.css'

function PostsComp(props) {

  return (
   <>
    <span>Title: {props.title}</span><br></br>
    <span>Body: {props.body}</span>

   </>
  )
}

export default PostsComp
