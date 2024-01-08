import React from 'react';
import { Tabs, Tab, Box, Grid } from '@mui/material';
import { Typography } from '@mui/joy';
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
        <Grid
            container
            sx={{
                minWidth: 0,
                border: '2px solid',
                borderShadow: 'md',
                borderColor: Colors.gray,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                <OrderBy handleSortChange={handleSortChange} />
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                {value === 0 && (
                    <Box display='flex' alignItems='center' justifyContent='center'>
                        {legendItems.map((item, index) => (
                            <Box key={index} display='flex' flexDirection='column' alignItems='center' sx={{ ml: 1, mr: 1 }}>
                                <Box width={20} height={20} bgcolor={item.color} />
                                <Typography variant='caption'>{item.label}</Typography>
                            </Box>
                        ))}
                    </Box>
                )}
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                <Box sx={{ mt: 2, mb: 2, backgroundColor: Colors.gray }}>
                    <Tabs value={value} onChange={handleTabClicked}>
                        <Tab label={<Typography startDecorator={<FiGrid></FiGrid>}>Card</Typography>} />
                        <Tab label={<Typography startDecorator={<FaMap></FaMap>}>Map</Typography>} />
                    </Tabs>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Header;
