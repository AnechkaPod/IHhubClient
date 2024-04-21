import React, { useEffect } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabsComponent from './TabsComponent';
import logo from '../sources/logo-blue.png';
import { getAll, addItem, updateItem, deleteItem } from '../utils';
import BasicMenu from './BasicMenu';
const url = "http://localhost:5245/";
//const url = "http://trd-bi:8080/";
//localhost:7140
const MainComponent = () => {
  //const url =API_URL;
  const [mainScreenID, setMainScreenID] = React.useState(6);//setting the first menu id to be maafyanim
  const [mainScreen, setMainScreen] = React.useState({});
  const [subMenus, setSubMenus] = React.useState([]);
  const [menus, setMenus] = React.useState([]);
  const [allMenus, setallMenus] = React.useState([]);
  useEffect(() => {
    console.log("url", url);

    getAll(url + "api/Screens/GetMenus").then((response) => {
      setMenus(response.data);
      console.log("menus", menus);
    });

    getAll(url + "api/Screens/GetAllMenus").then((response) => {
      setallMenus(response.data);
      console.log("allMenus", response.data);
    }); 

  }, [])



    const handleMenuChange = (menu) => {
    console.log("handleMenuChange");
    console.log("newValue",menu.id);
    setMainScreenID(menu.id);
    console.log("allMenus",allMenus);
    setMainScreen(allMenus.find(m => m.id == menu.id));
  };

  return (
    <div>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end', // Align content to the right
          marginTop: '20px',
          marginLeft:'-100px',
        }}>
        <div style={{ marginLeft: 'auto',marginTop: '10px', backgroundColor:'white'}}>
          <BasicMenu  menus={menus} onChange={handleMenuChange} centered ></BasicMenu>
        </div>
        <div>
          <img src={logo} alt="Logo" style={{ width: 180 }} />
        </div>
      </Box>

      {/* buttom */}
      <TabsComponent url={url} mainScreen={mainScreen} />
    </div>
  )
}

export default MainComponent
