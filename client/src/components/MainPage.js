
import { Button, IconButton } from '@mui/material'
import React from 'react'
import TextSection from './TextSection'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CopyToClipboard } from "react-copy-to-clipboard"



const MainPage = () => {
  
  return (
    // right now the keyword is "(insert)" for specific insertions
    <div style={{ textAlign: 'center', width: '100%', paddingBottom: '30%' }}>
        <div style={{ width: '75%', textAlign: 'center', display: 'inline-block' }}>
            <p>Add <span style={{color: 'black',backgroundColor: '#b5b5b5', borderRadius: '5px', padding: '3px'}} >(insert)</span>
              <CopyToClipboard text='(insert)'>
                <IconButton color="primary" aria-label="copy to clipboard" component="label">
                  <ContentCopyIcon fontSize='small' />
                </IconButton>
              </CopyToClipboard>
              tags if you want insertions to be made at specific places.<br/>If you let auto-insert, insertions will be made automatically, and a higher density will produce more insertions.<br/>
              Works best with longer texts (over 200 words) so it has enough context.
            </p>
            <TextSection />
        </div>
    </div>
  )
}

export default MainPage