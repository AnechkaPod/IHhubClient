import React, { useEffect } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabsComponent from './TabsComponent';
import logo from '../sources/logo-blue.png';
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
      console.log("mains", mains);
      setMainScreen(mains);
      handleMenuChange(null, mainScreenID);
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
    <Box
      sx={{
        margin: '0 auto',  // Center the Box horizontally
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between', // Spread the content to both ends
        alignItems: 'center',
      }}
    >
      <div style={{ flex: 1 }}>
        <Tabs value={mainScreenID} onChange={handleMenuChange} centered>
          {menus.map((menu) => (
            <Tab
              label={menu.screenName}
              value={menu.id}
              key={menu.id}
            />
          ))}
        </Tabs>
      </div>
      <div>
        <img src={logo} alt="Logo" style={{ width: 180 }} />
      </div>
    </Box>
    <TabsComponent url={url} menus={subMenus} mainScreen={mainScreen} />
  </div>
  )
}

export default MainComponent