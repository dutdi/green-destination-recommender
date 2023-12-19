import React from 'react';
import { Box, Chip } from '@mui/joy';

export default function InterestChips({ interests }) {
    return (
        <Box p={1}>
            {interests.map((interest) => {
                return (
                    <Chip key={interest.name} size='sm' variant='plain' color='danger' sx={{ fontWeight: 'bold' }}>
                        {interest.label}
                    </Chip>
                );
            })}
        </Box>
    );
}
