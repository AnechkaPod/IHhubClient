import React, { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function IHUBSelectComponents({ valueOptions }) {
    const [selectedValue, setSelectedValue] = useState(null);
    const [showSelect, setShowSelect] = useState(true);
  
    const handleSelectChange = (event) => {
      const selectedId = event.target.value;
      const selectedOption = valueOptions.find((option) => option.id === selectedId);
      if (selectedOption) {
        // Update the state to re-render the Select component
        setSelectedValue(selectedId);
        setShowSelect(false); // You can set it to false to hide the Select
      }
    };
  
    return (
      <div>
        {showSelect ? (
          <Select
            value={selectedValue}
            onChange={handleSelectChange}
          >
            {valueOptions.map((op) => (
              <MenuItem key={op.id} value={op.id}>
                {op.sugMutzar}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <p>Select hidden</p>
        )}
      </div>
    );
  }
  
  export default IHUBSelectComponents;