import React, { useEffect } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabsComponent from './TabsComponent';
import { getAll, addItem, updateItem, deleteItem } from '../utils';
const url = "https://localhost:7140/";
const MainComponent = () => {

  const [value, setValue] = React.useState(6);//setting the first menu id to be maafyanim
  const [menus, setMenus] = React.useState([]);
  const [subMenus, setSubMenus] = React.useState([]);
  useEffect(() => {
    getAll(url + "api/Screens/GetMainMenus").then((response) => {
      setMenus(response.data);
      handleMenuChange(null,value);
    });
  }, [])

  const handleMenuChange = (event, newValue) => {
    setValue(newValue);
    getAll(url + "api/Screens/" + newValue).then((response) => {
      setSubMenus(response.data);
    });
  };

  return (
    <div>
      <h2>IHub</h2>
      <Box sx={{ width: '100%' }}>
        <Tabs value={value} onChange={handleMenuChange} centered>
          {menus.map((menu) => (
            <Tab
              label={menu.screenName}
              value={menu.id} // Set the value to menu.id
              key={menu.id}
            />
          ))}
        </Tabs>
        <TabsComponent url={url} menus={subMenus} />

      </Box>
    </div>
  )
}

export default MainComponent