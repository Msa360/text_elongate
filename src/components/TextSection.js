import { TextareaAutosize, TextField } from '@mui/material'
import React from 'react'

const TextSection = () => {
  return (
    <div style={{padding: 15}}>
        {/* <TextareaAutosize
          aria-label="empty textarea to place your text"
          placeholder="Copy your text here"
          style={{ width: 200, height: 200, font: 'Verdana', fontSize: 15 }}
          maxRows={10000}
        /> */}
        <TextField label="Enter your text here" multiline fullWidth maxRows={5500}/>
    </div>
  )
}


export default TextSection