import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function MonthPicker({ handleMonthChange }) {
    const [value, setValue] = useState('');

    const handleMonthItemClick = (month) => {
        setValue(month);
        handleMonthChange(new Date(month).toLocaleString('default', { month: 'long' }));
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label='Date'
                openTo='month'
                views={['year', 'month']}
                value={value}
                onAccept={(newValue) => handleMonthItemClick(newValue)}
            />
        </LocalizationProvider>
    );
}
