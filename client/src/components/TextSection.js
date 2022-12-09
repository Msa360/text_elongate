import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import React, { useState } from 'react'
import gptProcessText from '../api/gtpcall'


const TextSection = () => {
  const [textValue, setTextValue] = useState("")
  const [checkboxState, setCheckboxState] = useState(true);
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  // update text
  const handleTextChange = (e) => {
    setTextValue(e.target.value);
  }
  // button process clicked
  const handleClick = () => {
    // make api call
    // gptProcessText(textValue)
    if (checkboxState) {
      // auto insert 
      gptProcessText(textValue, (e) => console.log(e, e.data.choices[0].text))
    } else {
      // manual insert
      // gptProcessText(textValue, (e) => console.log(e, e.data.choices[0].text))

    }
  }
  // toggle checkbox
  const toggleCheckboxState = () => {
    setCheckboxState(current => !current);
  };

  return (
    <div style={{padding: 15}}>
        <TextField label="Enter your text here" value={textValue} onChange={handleTextChange} multiline fullWidth maxRows={5500}/>
        <div>
            <FormControlLabel control={<Checkbox {...label} onChange={toggleCheckboxState} defaultChecked />} label="auto-insert" />
            <Button variant="contained" onClick={handleClick} disableElevation>Process</Button>
        </div>
    </div>
  )
}


export default TextSection