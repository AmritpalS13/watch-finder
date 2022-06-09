import React, { useState }from 'react'

import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';

function InputField({ inputModel, inputName, inputRef, inputPrice, inputDesc, createPost }) {
  return (
        <div className='input-field'>
            <TextField
            required
            label="Model"
            onChange={(e) => {inputModel(e.target.value)}}
            />
            <TextField
            required
            label="Name"
            onChange={(e) => {inputName(e.target.value)}}
            />
            <br/>
            <TextField
            required
            label="Ref"
            onChange={(e) => {inputRef(e.target.value)}}
            />
            <InputLabel htmlFor="outlined-adornment-amount">
                Price
            </InputLabel>
            <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
            onChange={(e) => {inputPrice(e.target.value)}}
            />

            <br />
            <div className='input-desc'>
                <TextField
                id="outlined-multiline-static"
                label="Multiline"
                multiline
                rows={4}
                defaultValue="Default Value"
                onChange={(e) => {inputDesc(e.target.value)}}
                />
                </div>
                <Button onClick={() => {createPost()}}variant='outlined'>Submit</Button>
        </div>    
  )
}

export default InputField