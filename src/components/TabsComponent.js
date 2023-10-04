import { useState, useEffect } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MachshirimComponent from './maafyanimComponents/MachshirimComponent';
import NechasimComponent from './maafyanimComponents/NechasimComponent';
import BizuimComponent from './natunimComponents/BizuimComponent';
import NatuneiShuk from './natunimComponents/NatuneiShukComponent';
import MatbeotComponent from './maafyanimComponents/MatbeotComponent';
import BankComponent from './maafyanimComponents/BankComponent';
import FormTableComponents from './common/FormTableComponents';

function TabsComponent(props) {
  const [value, setValue] = useState(15);
  const [menu, setMenu] = useState({});


  const handleMenuChange = (event, newValue) => {
    setValue(newValue);
    var menu = props.menus.find((item) => item.id === newValue);
    console.log("menu: ");
    console.log( menu);
    setMenu(menu);
  /*   console.log(menu.rowsUrl);
    console.log(menu.columnsUrl);
    setRowsUrl(menu.rowsUrl);
    setColumnsUrl(menu.columnsUrl); */
  };

  // Log the initial value after the component has mounted
  useEffect(() => {
    console.log('Initial value:', value);
    if(props!==null && props.menus.length>0)
    {
      console.log(props.menus);
      var menu = props.menus.find((item) => item.id === value);
      setMenu(menu);
      console.log("menu: " + menu);
    }
  }, [props]); // Empty dependency array for componentDidMount-like behavior

  return (
    <div>
      <Box sx={{ width: '100%', bgcolor: 'background.paper', display: 'flex', flexDirection: 'row-reverse' }}>
        <Tabs value={value} orientation="vertical" onChange={handleMenuChange} centered
          scrollButtons="auto"
          aria-label="scrollable auto tabs example">
          {
            props.menus.map((item) => { return <Tab label={item.screenName} value={item.id} /> })
            /*  props.menus.map((item,index)=>{return  <Tab key={index} label={item} value={item}/>}) */
          }
        </Tabs>
        <div style={{ position: 'relative', width: "100%", height: "100%", backgroundSize: 'cover', padding: 0, margin: 0 }}>
          {
            <FormTableComponents menu={menu} style={{ position: 'relative', backgroundSize: 'cover', height: "100%", width: "100%", minWidth: "100%", minHight: "100%", backgroundSize: 'cover', padding: 0, margin: 0 }} />
       }
        </div>

        {/*           <FormTableComponents rowsUrl={rowsUrl} columnsUrl={columnsUrl}  />
 */}         {/*  <FormTableComponents rowsUrl={rowsUrl} columnsUrl={columnsUrl}  /> */}
        {/*          {value === "נכסים" && <NechasimComponent/>}
          {value === "מכשירים" && <MachshirimComponent/>}
          {value === "ביצועים" && <BizuimComponent/>}
          {value === "נתוני שוק" && <NatuneiShuk/>}
          {value === "מטבעות" && <MatbeotComponent/>}
          {value === "בנקים" && <BankComponent/>} */}
      </Box>

    </div>
  )
}

export default TabsComponent