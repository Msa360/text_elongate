import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import React, { useState } from 'react'
import sendText from '../api/gtpcall'


const TextSection = () => {
  const [textValue, setTextValue] = useState("");
  const [checkboxState, setCheckboxState] = useState(true);
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const [receiveTextValue, setReceiveTextValue] = useState("")
  

  // button process clicked
  const handleClick = () => {
    // make api call
    // gptProcessText(textValue)
    if (checkboxState) {
      // auto insert 
      // sendText(textValue, (e) => console.log(e, e.data.choices[0].text));
      sendText(textValue, true, (r) => {
        console.log(r.data);
        setReceiveTextValue(r.data.text)
      });
    } else {
      // manual insert
      // gptProcessText(textValue, (r) => console.log(r, r.data.choices[0].text))
      sendText(textValue, false, (r) => {
        console.log(r.data)
        setReceiveTextValue(r.data.text)
      });
    }
  }
  // toggle checkbox
  const toggleCheckboxState = () => {
    setCheckboxState(current => !current);
  };

  return (
    <div style={{padding: 15}}>
        <TextField label="Enter your text here" value={textValue} onChange={(e) => {setTextValue(e.target.value)}} multiline fullWidth maxRows={5500}/>
        <div>
            <FormControlLabel control={<Checkbox {...label} onChange={toggleCheckboxState} defaultChecked />} label="auto-insert" />
            <Button variant="contained" onClick={handleClick} disableElevation>Process</Button>
        </div><br/>
        <TextField label="Receive your enhanced text here" value={receiveTextValue} onChange={(e) => {setReceiveTextValue(e.target.value)}} multiline fullWidth maxRows={5500}/>
    </div>
  )
}


export default TextSection