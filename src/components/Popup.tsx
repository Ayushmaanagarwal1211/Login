import React from 'react'

export default function Popup(props) {
  return (
    <div className='popup'><h5 style={{fontSize:"",fontWeight:"bold",justifySelf:"center",alignSelf:"center",height:"5px",position:"relative",bottom:"10px"}}>
    {props.msg}</h5>
    <p className='text1'></p></div>  )
}
