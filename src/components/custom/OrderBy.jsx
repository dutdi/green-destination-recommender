import React, { useState } from 'react';
import { Menu, MenuButton, MenuItem, Dropdown } from '@mui/joy';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';

export default function OrderBy({ disabled, handleSortChange }) {
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

    const menuButtonStyle = disabled ? { color: 'gray', pointerEvents: 'none' } : {};

    return (
        <Dropdown>
            <MenuButton variant='plain' color='primary' endDecorator={<ArrowDropDown />} sx={{ whiteSpace: 'nowrap', ...menuButtonStyle }}>
                {selectedItem ? selectedItem.name : 'Order by'}
            </MenuButton>
            <Menu sx={{ minWidth: 150 }}>
                {items.map((item) => (
                    <MenuItem key={item.id} selected={item === selectedItem} onClick={() => handleMenuItemClick(item)} disabled={disabled}>
                        {item.name}
                    </MenuItem>
                ))}
            </Menu>
        </Dropdown>
    );
}
