import React from 'react';
import { Box, Chip } from '@mui/joy';

export default function InterestChips({ interests }) {
    return (
        <Box p={0.1}>
            {interests.map((interest) => {
                return (
                    <Chip key={interest} size='sm' variant='plain' color='primary' sx={{ fontWeight: 'bold' }}>
                        {interest}
                    </Chip>
                );
            })}
        </Box>
    );
}
