import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Stack from '@mui/joy/Stack';
import OrderBy from './OrderBy.jsx';
import { Colors } from '../../helpers/Colors.js';

export default function Filters({ handleSortChange, handleViewChange }) {
    const [value, setValue] = React.useState(0);

    const handleTabClicked = (event, newValue) => {
        setValue(newValue);
        handleViewChange(newValue === 0 ? 'card' : 'map');
    };
    return (
        <Stack
            useFlexGap
            direction='row'
            spacing={{ xs: 0, sm: 2 }}
            justifyContent={{ xs: 'space-between' }}
            flexWrap='wrap'
            sx={{ minWidth: 0, border: '1px solid' }}
        >
            <OrderBy disabled={value === 1} handleSortChange={handleSortChange} />
            <Box sx={{ mt: 2, mb: 2, backgroundColor: Colors.gray }}>
                <Tabs value={value} onChange={handleTabClicked}>
                    <Tab label='Card 🎴' />
                    <Tab label='Map 🗺️' />
                </Tabs>
            </Box>
        </Stack>
    );
}
