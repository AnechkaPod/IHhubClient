import React, { useEffect } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabsComponent from './TabsComponent';
import { getAll, addItem, updateItem, deleteItem } from '../utils';
const url = "https://localhost:7140/";
const MainComponent = () => {

  const [mainScreenID, setMainScreenID] = React.useState(6);//setting the first menu id to be maafyanim
  const [mainScreen, setMainScreen] = React.useState({});
  const [menus, setMenus] = React.useState([]);
  const [subMenus, setSubMenus] = React.useState([]);
  useEffect(() => {
    getAll(url + "api/Screens/GetMainMenus").then((response) => {
      setMenus(response.data);
      var mains = response.data.find(menu => menu.id == mainScreenID);
      console.log("mains",mains);
      setMainScreen(mains);
      handleMenuChange(null,mainScreenID);
    });
  }, [])

  const handleMenuChange = (event, newValue) => {
    setMainScreenID(newValue);
    setMainScreen(menus.find(menu => menu.id == newValue));
    getAll(url + "api/Screens/" + newValue).then((response) => {
      setSubMenus(response.data);
    });
  };

  return (
    <div>
      <h2>IHub</h2>
      <Box sx={{ width: '100%' }}>
        <Tabs value={mainScreenID} onChange={handleMenuChange} centered>
          {menus.map((menu) => (
            <Tab
              label={menu.screenName}
              value={menu.id} // Set the value to menu.id
              key={menu.id}
            />
          ))}
        </Tabs>
        <TabsComponent url={url} menus={subMenus} mainScreen={mainScreen}/>

      </Box>
    </div>
  )
}

export default MainComponent