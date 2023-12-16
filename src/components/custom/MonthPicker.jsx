import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function MonthPicker({ handleMonthChange }) {
    const [value, setValue] = useState(null);

    const handleMonthItemClick = (month) => {
        setValue(month);
        handleMonthChange(month.format('MMMM'));
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={{ monthAndYear: 'MMMM' }}>
            <DatePicker
                label='Month'
                openTo='month'
                views={['month']}
                value={value}
                onAccept={(newValue) => handleMonthItemClick(newValue)}
                renderInput={(params) => (
                    <div>
                        <input {...params.inputProps} value={value ? value.format('MMMM') : ''} readOnly />
                    </div>
                )}
            />
        </LocalizationProvider>
    );
}
