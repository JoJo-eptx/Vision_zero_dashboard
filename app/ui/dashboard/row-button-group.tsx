import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { MouseEvent } from 'react';


function generateButtonItems(buttonLabels: Array<string>) {
  return buttonLabels.map((item) => (
    <ToggleButton
      key={item}
      value={item}
      className="btn btn-primary"
      sx={{
        '&.Mui-selected': {
          color: 'black',
          // Optional: change background to highlight selection better
          backgroundColor: 'gray',
          '&:hover': {
            backgroundColor: 'lightgray',
          },
        },
      }}
    >
      {item}
    </ToggleButton>
  ));
}

export default function RowButtonGroup(
    props: {
        value: any, 
        onChange: ((event: MouseEvent<HTMLElement>, value: any) => void) | undefined,
        buttonLabels: Array<string>
    }
)
{
    return (
        <div style={{ display: 'flex',  justifyContent: 'center', alignItems: 'center', padding: '10px'}}>
            <ToggleButtonGroup 
                color='primary' 
                value={props.value} 
                exclusive 
                onChange={props.onChange}
                aria-label='Platform'>
            {generateButtonItems(props.buttonLabels)}
            </ToggleButtonGroup>
        </div>
    )
}
