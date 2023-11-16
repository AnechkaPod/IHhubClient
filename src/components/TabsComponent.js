import { useState, useEffect } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import FormTableComponents from './common/FormTableComponents';
import BitzuimComponent from './natunim/BitzuimComponent';
import TnuotComponent from './tnuot/TnuotComponent';

function TabsComponent(props) {
  const [value, setValue] = useState(15);
  const [menu, setMenu] = useState({});

  // Log the initial value after the component has mounted
  useEffect(() => {
    console.log('props.mainScreen', props.mainScreen);
    //console.log('defaultScreenId subscreen id:', props.mainScreen.defaultScreenId);
    console.log('Initial value:', value);
    if (props !== null && props.menus.length > 0) {
      console.log(props.menus);
      var m;
      if (props.mainScreen) {

        m = props.menus.find((item) => item.id === props.mainScreen.defaultScreenId);
      }
      else//entering here only one time
      {
        m = props.menus.find((item) => item.id === value);
      }
      setMenu(m);
      console.log("menu 1: ", m);
      console.log("m.id===17 ", m.id === 17);


    }
  }, [props.menus]); // Empty dependency array for componentDidMount-like behavior
  /*   const handleMenuChange = (event, newValue) => {
      setValue(newValue);
      var menu = props.menus.find((item) => item.id === newValue);
      console.log("menu: ");
      console.log( menu);
      setMenu(menu);
    };
   */
  const handleMenuChange = (event, newValue) => {
    console.log("newValue: ", newValue);
    setValue(newValue);
    var m = props.menus.find((item) => item.id === newValue);
    console.log("menu: ", m);

    setMenu(m);
  };

  return (
<div style={{ height: '100%', backgroundColor: 'green' }}>
  <html style={{ height: '100%', minHeight: '100%', backgroundColor: 'yellow' }}>
    <body style={{ height: '100%', margin: 0, minHeight: '100%' }}>
      <Box sx={{ width: '100%', bgcolor: 'yellow', display: 'flex', flexDirection: 'row-reverse', height: '100%', minHeight: '100%' }}>
        <Tabs sx={{ background: '#66bcb4', color: 'white !important', width: '135px' }} value={value} orientation="vertical" onChange={handleMenuChange} centered
          scrollButtons="auto"
          color="white"
          aria-label="scrollable auto tabs example">
          {props.menus.map((item) => <Tab sx={{ color: 'white !important' }} label={item.screenName} value={item.id} />)}
        </Tabs>
        <div style={{ position: 'relative', width: '100%' }}>
          {menu?.isDataEntry === true &&
            <FormTableComponents url={props.url} menu={menu} style={{ position: 'relative', backgroundSize: 'cover', width: '100%', height: '100%', backgroundSize: 'cover', padding: 0, margin: 0 ,minHeight:'100%'}} />
          }
  {menu?.isDataEntry !== true && menu?.id===17 &&
           <BitzuimComponent></BitzuimComponent>
          }
            {menu?.isDataEntry !== true && menu?.id===23 &&
           <TnuotComponent></TnuotComponent>
          }
          {menu?.isDataEntry !== true && menu?.id!=17 &&
            <div>menu.id is {menu?.id} menunameis: {menu?.screenName}</div>
          }
        </div>
      </Box>
    </body>
  </html>
</div>
  )
}

export default TabsComponent