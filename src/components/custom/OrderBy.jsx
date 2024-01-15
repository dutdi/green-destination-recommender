import React, { useState } from 'react';
import { Menu, MenuButton, MenuItem, Dropdown } from '@mui/joy';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import { FcBarChart } from 'react-icons/fc';
import { MdOutlineCo2 } from 'react-icons/md';
import { FcBullish } from 'react-icons/fc';
import { FcCalendar } from 'react-icons/fc';

export default function OrderBy({ handleSortChange }) {
    const items = [
        { id: 'overall', name: 'Overall', icon: <FcBarChart /> },
        { id: 'emission', name: 'Emission', icon: <MdOutlineCo2 /> },
        { id: 'popularity', name: 'Popularity', icon: <FcBullish /> },
        { id: 'seasonality', name: 'Seasonality', icon: <FcCalendar /> },
    ];
    const [selectedItem, setSelectedItem] = useState(null);

    const handleMenuItemClick = (item) => {
        setSelectedItem(item);
        handleSortChange(item.id);
    };

    return (
        <Dropdown>
            <MenuButton variant='plain' color='primary' endDecorator={<ArrowDropDown />} sx={{ whiteSpace: 'nowrap' }}>
                {selectedItem ? selectedItem.name : 'Order by'}
            </MenuButton>
            <Menu sx={{ minWidth: 150 }}>
                {items.map((item) => (
                    <MenuItem key={item.id} selected={item === selectedItem} onClick={() => handleMenuItemClick(item)}>
                        {item.icon} {item.name}
                    </MenuItem>
                ))}
            </Menu>
        </Dropdown>
    );
}
