import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ReactNode } from 'react';


function generateMenuItems(menuItems: any[]) {
    return menuItems.map((item) => 
        <MenuItem key={item} value={item}>{item}</MenuItem>
    );
}

export default function SelectAutoWidth(props: { selectedStrategy: any; onChange: ((event: SelectChangeEvent<any>, child: ReactNode) => void) | undefined; menuItems: any[]; }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
            <FormControl sx={{ m: 1, minWidth: 420 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Strategy</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={props.selectedStrategy}
                    onChange={props.onChange}
                    autoWidth
                    label="Strategy"
                >
                    {generateMenuItems(props.menuItems)}
                </Select>
            </FormControl>
        </div>
    );
}