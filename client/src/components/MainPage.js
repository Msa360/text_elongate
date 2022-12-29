
import { Button, IconButton } from '@mui/material'
import React from 'react'
import TextSection from './TextSection'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


// "(insert)"
const MainPage = () => {
  const copyToClip = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert("successfully copied");
      })
      .catch(() => {
        alert("error, unable to copy to clipboard");
        console.log("something went wrong, couldn't copy to clipboard");
      });
  }
  return (
    <div style={{ textAlign: 'center', width: '100%', paddingBottom: '30%' }}>
        <div style={{ width: '75%', textAlign: 'center', display: 'inline-block' }}>
            <p>Add <span style={{color: 'black',backgroundColor: '#b5b5b5', borderRadius: '5px', padding: '3px'}} >(insert)</span>
              <IconButton color="primary" aria-label="upload picture" component="label"><input onClick={copyToClip("(insert)")} hidden />
                <ContentCopyIcon fontSize='small' />
              </IconButton>
              tags if you want insertions to be made at specific places.<br/>If you let auto-insert, insertions will be made automatically (still in beta). 
            </p>
            <TextSection />
        </div>
    </div>
  )
}

export default MainPage