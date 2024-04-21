import * as React from 'react';
import { useState } from "react";
import '../App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function BasicMenu({ menus, onChange }) {
  const [menuVisibilities, setMenuVisibilities] = useState(
    new Array(menus.length).fill(false)
  );

  const handleMouseEnter = (index) => {
    const updatedVisibilities = new Array(menus.length).fill(false);
    updatedVisibilities[index] = true;
    setMenuVisibilities(updatedVisibilities);
  };

  const handleMouseLeave = (index) => {
    const updatedVisibilities = [...menuVisibilities];
    updatedVisibilities[index] = false;
    setMenuVisibilities(updatedVisibilities);
  };

  return (
    <div
      style={{
      
        display: "flex",
        position: "relative",
        justifyContent: "flex-end", // Align menu buttons to the right
        marginBottom: "20px", // Add margin to create space between menus and text
      }}
    >
      {menus.map((menu, index) => (
        <div
          key={index}
          style={{
            position: "relative", // Set position to relative to contain absolutely positioned dropdown
            marginRight: "40px",
          }}
          className="menu"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
        >
          <button class="menu-button" style={{ width: "150px",fontSize: "17px" , backgroundColor:'ButtonFace'  }}>{menu.menuName}
          </button>
          {menuVisibilities[index] && (
     <div
     className="dropdown-menu"
     style={{
        width: "150px",
        backgroundColor: "white",
        position: "absolute",
        top: "100%",
        left: `calc(50% - 85px)`, // Adjust the width as needed
        zIndex: 1,
      }}
   >
              <ul style={{ width: "140px" }}>
                {menu.subMenus.map((subMenu, subIndex) => (
                  <li key={subIndex} onClick={() => onChange(subMenu)}>{subMenu.menuName}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
