import React, { useState } from 'react';
import { Menu, MenuButton, MenuItem, Dropdown } from '@mui/joy';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';

export default function OrderBy({ handleSortChange }) {
    const items = [
        { id: 'emission', name: 'Emission 🌿' },
        { id: 'popularity', name: 'Popularity 💹' },
        { id: 'seasonality', name: 'Seasonality 📅' },
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
