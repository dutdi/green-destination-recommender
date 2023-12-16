import React, { useState } from 'react';
import { Box, Checkbox, Chip } from '@mui/joy';
import CheckIcon from '@mui/icons-material/Check';

export default function InterestChips({ interests, clickable, handleInterestsChange }) {
    const [selected, setSelected] = useState([]);

    const handleInterestClick = (event, interest) => {
        setSelected((interests) => (!event.target.checked ? interests.filter((n) => n !== interest) : [...interests, interest]));
        handleInterestsChange((interests) => (!event.target.checked ? interests.filter((n) => n !== interest) : [...interests, interest]));
    };

    return (
        <Box p={1}>
            {interests.map((interest) => {
                const checked = selected.includes(interest);
                return (
                    <Chip
                        key={interest.name}
                        size='sm'
                        variant='plain'
                        color={checked ? 'primary' : 'gray'}
                        startDecorator={checked && <CheckIcon sx={{ zIndex: 1, pointerEvents: 'none' }} />}
                    >
                        <Checkbox
                            variant='plain'
                            size='sm'
                            color={checked ? 'primary' : 'gray'}
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
    );
}
