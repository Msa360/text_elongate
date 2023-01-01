import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import Slider, { SliderThumb, SliderValueLabelProps } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React, { useState } from 'react'
import sendText from '../api/gtpcall'
import Stack from '@mui/material/Stack';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';


const TextSection = () => {
  const [textValue, setTextValue] = useState("");
  const [checkboxState, setCheckboxState] = useState(false);
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const [receiveTextValue, setReceiveTextValue] = useState("")

  const [sliderValue, setSliderValue] = useState(0.30);

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };
  

  // button process clicked
  const handleClick = () => {
    // make api call
    // gptProcessText(textValue)
    if (checkboxState) {
      // auto insert 
      // sendText(textValue, (e) => console.log(e, e.data.choices[0].text));
      sendText(textValue, true, sliderValue, (r) => {
        // response data from the server is just the text so "r.data" to get text
        setReceiveTextValue(r.data);
      });
    } else {
      // manual insert
      // gptProcessText(textValue, (r) => console.log(r, r.data.choices[0].text))
      sendText(textValue, false, sliderValue, (r) => {
        // response data from the server is just the text so "r.data" to get text
        setReceiveTextValue(r.data); 
      });
    }
  }
  // toggle checkbox
  const toggleCheckboxState = () => {
    setCheckboxState(current => !current);
  };

  return (
    <div style={{padding: 15}}>
        <TextField label="Enter your text here" value={textValue} onChange={(e) => {setTextValue(e.target.value)}} multiline fullWidth maxRows={500}/>
        <div>
            <FormControlLabel control={<Checkbox {...label} onChange={toggleCheckboxState} />} label="auto-insert" />
            <Button variant="contained" onClick={handleClick} disableElevation>Process</Button>
            {checkboxState &&
              <div style={{padding: 15}}>
                <Typography gutterBottom>Text density</Typography>
                
                <Stack spacing={2} direction="row" sx={{ mb: 1, justifyContent: 'center' }} alignItems="center" >
                  <DensityMediumIcon />
                  <Slider aria-label="text density" valueLabelDisplay="auto" min={0} step={0.01} max={1} value={sliderValue} onChange={handleSliderChange} sx={{width: '220px'}} />
                  <FormatAlignJustifyIcon />
                </Stack>
              </div>
            }
        </div><br/>
        <TextField label="Receive your enhanced text here" value={receiveTextValue} onChange={(e) => {setReceiveTextValue(e.target.value)}} multiline fullWidth maxRows={500}/>
    </div>
  )
}


export default TextSection

