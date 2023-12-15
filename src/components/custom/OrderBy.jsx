import React, { useState } from 'react';
import MenuButton from '@mui/joy/MenuButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import Dropdown from '@mui/joy/Dropdown';

export default function OrderBy({ handleSortChange }) {
    const items = [
        { id: 'emission', name: 'Emission 🌿' },
        { id: 'seasonality', name: 'Seasonality 📅' },
        { id: 'popularity', name: 'Popularity 💹' },
        { id: 'duration', name: 'Duration ⏱️' },
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
                        {item.name}
                    </MenuItem>
                ))}
            </Menu>
        </Dropdown>
    );
}
