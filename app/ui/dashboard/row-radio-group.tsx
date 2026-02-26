'use client';

import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { ChangeEvent } from 'react';


function generateRadioButtons(radioButtonLabels: Array<string>) {
    return radioButtonLabels.map((item) => 
        <FormControlLabel value={ item } control={<Radio/>} label={ item } />);
}

export default function RowRadioButtonsGroup(
    props: {value: any, onChange: ((event: ChangeEvent<HTMLInputElement>, value: string) => void), buttonLabels: Array<string>, groupLabel: string}) 
{
  return (
    <div style={{ display: 'flex',  justifyContent: 'center', alignItems: 'center', padding: '10px'}}>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">{props.groupLabel}</FormLabel>
          <RadioGroup
            row
            aria-labelledby="row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={props.value}
            onChange={props.onChange}
          >
            {generateRadioButtons(props.buttonLabels)}
          </RadioGroup>
        </FormControl>
    </div>
  );
}