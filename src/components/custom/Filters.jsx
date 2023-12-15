import React from 'react';
import Stack from '@mui/joy/Stack';
import OrderBy from './OrderBy.jsx';

export default function Filters({ handleSortChange }) {
    return (
        <Stack
            useFlexGap
            direction='row'
            spacing={{ xs: 0, sm: 2 }}
            justifyContent={{ xs: 'flex-start' }}
            flexWrap='wrap'
            sx={{ minWidth: 0 }}
        >
            <OrderBy handleSortChange={handleSortChange} />
        </Stack>
    );
}
