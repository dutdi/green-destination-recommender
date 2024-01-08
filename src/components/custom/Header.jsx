import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { Stack, Typography } from '@mui/joy';
import { FiGrid } from 'react-icons/fi';
import { FaMap } from 'react-icons/fa6';
import OrderBy from './OrderBy.jsx';
import { Colors } from '../../helpers/Colors.js';

const Header = ({ sortBy, handleSortChange, handleViewChange }) => {
    const [value, setValue] = React.useState(0);

    const popularityLegend = [
        { label: 'Rare Find', color: 'rgb(60, 179, 113)' },
        { label: 'Rising', color: 'rgb(255, 255, 0)' },
        { label: 'Traffic', color: 'rgb(255, 165, 0)' },
        { label: 'Hotspot', color: 'rgb(255, 0, 0)' },
        { label: 'No data', color: 'rgb(220, 220, 220)' },
    ];
    const seasonalityLegend = [
        { label: 'Quiet', color: 'rgb(60, 179, 113)' },
        { label: 'Off-Peak', color: 'rgb(255, 255, 0)' },
        { label: 'Busy', color: 'rgb(255, 165, 0)' },
        { label: 'Crowded', color: 'rgb(255, 0, 0)' },
        { label: 'No data', color: 'rgb(220, 220, 220)' },
    ];

    const legendItems = sortBy === 'popularity' ? popularityLegend : sortBy === 'seasonality' ? seasonalityLegend : [];

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
            sx={{ minWidth: 0, border: '2px solid', borderShadow: 'md', borderColor: Colors.gray }}
        >
            <OrderBy handleSortChange={handleSortChange} />
            {value === 0 && (
                <Box display='flex' alignItems='flex-end' justifyContent='space-around'>
                    {legendItems.map((item, index) => (
                        <Box key={index} display='flex' flexDirection='column' alignItems='center' sx={{ m: 2 }}>
                            <Box width={20} height={20} bgcolor={item.color} />
                            <Typography variant='caption'>{item.label}</Typography>
                        </Box>
                    ))}
                </Box>
            )}
            <Box sx={{ mt: 2, mb: 2, backgroundColor: Colors.gray }}>
                <Tabs value={value} onChange={handleTabClicked}>
                    <Tab label={<Typography startDecorator={<FiGrid></FiGrid>}>Card</Typography>} />
                    <Tab label={<Typography startDecorator={<FaMap></FaMap>}>Map</Typography>} />
                </Tabs>
            </Box>
        </Stack>
    );
};

export default Header;
