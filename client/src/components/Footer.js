import { Grid, Link } from '@mui/material';
import React from 'react';
import Stack from '@mui/material/Stack';

const Footer = () => {
  return (
    <div>
        
    <Grid container spacing={2}>
        <Grid xs={4}>
            <Stack spacing={2}>
                <Link href="https://openai.com/blog/gpt-3-edit-insert/">How it works?</Link>
                
            </Stack>
        </Grid>
        <Grid xs={4}>
            <Stack spacing={2}>
                <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Rick</Link>
            </Stack>
        </Grid>
        <Grid xs={4}>
            <Stack spacing={2}>
                <Link href="https://github.com/Msa360/">GitHub</Link>
            </Stack>
        </Grid>
        {/* <Grid xs={4}>
            <Item>xs=4</Item>
        </Grid>
        <Grid xs={8}>
            <Item>xs=8</Item>
        </Grid> */}
    </Grid>
    </div>
  )
}

export default Footer;