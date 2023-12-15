import React, { useState } from 'react';
import { Box, Checkbox, Chip, extendTheme, CssVarsProvider } from '@mui/joy';
import CheckIcon from '@mui/icons-material/Check';

const theme = extendTheme({
    components: {
        JoyChip: {
            styleOverrides: {
                root: ({ ownerState, theme }) => ({
                    ...(ownerState.color === 'urban' && {
                        color: '#ffffff',
                        backgroundColor: '#4CAF50',
                    }),
                    ...(ownerState.color === 'culinary' && {
                        color: '#ffffff',
                        backgroundColor: '#FF9100',
                    }),
                    ...(ownerState.color === 'entertainment' && {
                        color: '#ffffff',
                        backgroundColor: '#FF5722',
                    }),
                    ...(ownerState.color === 'outdoor' && {
                        color: '#ffffff',
                        backgroundColor: '#2196F3',
                    }),
                    ...(ownerState.color === 'art' && {
                        color: '#ffffff',
                        backgroundColor: '#9C27B0',
                    }),
                    ...(ownerState.color === 'community' && {
                        color: '#ffffff',
                        backgroundColor: '#FF0000',
                    }),
                    ...(ownerState.color === 'night' && {
                        color: '#ffffff',
                        backgroundColor: '#673AB7',
                    }),
                    ...(ownerState.color === 'cultural' && {
                        color: '#ffffff',
                        backgroundColor: '#DECA18',
                    }),
                    ...(ownerState.color === 'sports' && {
                        color: '#ffffff',
                        backgroundColor: '#006695',
                    }),
                    ...(ownerState.color === 'tech' && {
                        color: '#ffffff',
                        backgroundColor: '#E91E63',
                    }),
                }),
            },
        },
    },
});

export default function InterestChips({ interests, clickable, handleInterestsChange }) {
    const [selected, setSelected] = useState([]);

    const handleInterestClick = (event, interest) => {
        setSelected((interests) => (!event.target.checked ? interests.filter((n) => n !== interest) : [...interests, interest]));
        handleInterestsChange((interests) => (!event.target.checked ? interests.filter((n) => n !== interest) : [...interests, interest]));
    };

    return (
        <CssVarsProvider theme={theme}>
            <Box p={1}>
                {interests.map((interest) => {
                    const checked = selected.includes(interest);
                    return (
                        <Chip
                            key={interest.name}
                            size='sm'
                            variant='plain'
                            color={interest.name}
                            startDecorator={checked && <CheckIcon sx={{ zIndex: 1, pointerEvents: 'none' }} />}
                        >
                            <Checkbox
                                variant='plain'
                                size='sm'
                                color={interest.name}
                                disableIcon
                                overlay
                                label={interest.label}
                                checked={checked}
                                onChange={(event) => clickable && handleInterestClick(event, interest)}
                            />
                        </Chip>
                    );
                })}
            </Box>
        </CssVarsProvider>
    );
}
