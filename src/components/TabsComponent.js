import { useState, useEffect } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import FormTableComponents from './common/FormTableComponents';
import BitzuimComponent from './natunim/BitzuimComponent';
import TnuotComponent from './tnuot/TnuotComponent';
import IshurTnuotComponent from './tnuot/IshurTnuotComponent';
import logo from '../sources/logo-blue.png';
//import { app, BrowserWindow, ipcMain } from 'electron';

function TabsComponent(props) {
  const [value, setValue] = useState(15);
  const [menu, setMenu] = useState({});
  const [menus, setMenus] = useState();
  // Log the initial value after the component has mounted
  useEffect(() => {
    console.log('props.mainScreen', props.mainScreen.id);
    setMenu(props.mainScreen);
  }, [props.mainScreen]);
  return (
    <div style={{ height: '100%'}}>
 
          {
            (props.mainScreen !== undefined) && props.mainScreen.screenName
          }
          <Box sx={{ width: '100%', bgcolor: 'white', display: 'flex', flexDirection: 'row-reverse', height: '100%', minHeight: '100%' }}>
            {/* <Tabs sx={{ background: '#66bcb4', color: 'white !important', width: '135px' }} value={value} orientation="vertical" onChange={handleMenuChange} centered
              scrollButtons="auto"
              color="white"
              aria-label="scrollable auto tabs example">
              {
              props.menus.map((item) => <Tab sx={{ color: 'white !important' }} label={item.screenName} value={item.id} />)
              }
            </Tabs> */}
            <div style={{ position: 'relative', width: '100%' }}>
              {
                (props.mainScreen.id === undefined) &&
                <div>
                  <img src={logo} alt="Logo" style={{ width: 500 }} />
                  <div>
                    לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית הועניב היושבב שערש שמחויט - שלושע ותלברו חשלו שעותלשך וחאית נובש ערששף. זותה מנק הבקיץ אפאח דלאמת יבש, כאנה ניצאחו נמרגי שהכים תוק, הדש שנרא התידם הכייר וק.

                    סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט - לפתיעם ברשג - ולתיעם גדדיש. קוויז דומור ליאמום בלינך רוגצה. לפמעט מוסן מנת. הועניב היושבב שערש שמחויט - שלושע ותלברו חשלו שעותלשך וחאית נובש ערששף. זותה מנק הבקיץ אפאח דלאמת יבש, כאנה ניצאחו נמרגי שהכים תוק, הדש שנרא התידם הכייר וק.

                    ליבם סולגק. בראיט ולחת צורק מונחף, בגורמי מגמש. תרבנך וסתעד לכנו סתשם השמה - לתכי מורגם בורק? לתיג ישבעס.

                    גולר מונפרר סוברט לורם שבצק יהול, לכנוץ בעריר גק ליץ, ושבעגט ליבם סולגק. בראיט ולחת צורק מונחף, בגורמי מגמש. תרבנך וסתעד לכנו סתשם השמה - לתכי מורגם בורק? לתיג ישבעס.

                    גולר מונפרר סוברט לורם שבצק יהול, לכנוץ בעריר גק ליץ, להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורךגולר מונפרר סוברט לורם שבצק יהול, לכנוץ בעריר גק ליץ, ושבעגט. לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידום בעליק. קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים. קלאצי קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים. קלאצי לפרומי בלוף קינץ תתיח לרעח. לת צשחמי צש בליא, מנסוטו צמלח לביקו ננבי, צמוקו בלוקריה שיצמה ברורק. לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידום בעליק. קונדימנטום קורוס בליקרה, נונסטי קלובר בריקנה סטום, לפריקך תצטריק לרטי.

                    מוסן מנת. להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורך. ושבעגט ליבם סולגק. בראיט ולחת צורק מונחף, בגורמי מגמש. תרבנך וסתעד לכנו סתשם השמה - לתכי מורגם בורק? לתיג ישבעס.

                    קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידום בעליק. קונדימנטום קורוס בליקרה, נונסטי קלובר בריקנה סטום, לפריקך תצטריק לרטי.
                  </div>
                </div>
              }
              {menu?.isDataEntry === true &&
                <FormTableComponents url={props.url} menu={menu} style={{  position: 'relative', backgroundSize: 'cover', width: '100%', height: '100%', backgroundSize: 'cover', padding: 0, margin: 0, minHeight: '100%' }} />
              }
              {
                menu?.isDataEntry !== true && menu?.id === 17 &&
                <BitzuimComponent></BitzuimComponent>
              }
              {
                menu?.isDataEntry !== true && menu?.id === 23 &&
                <TnuotComponent></TnuotComponent>
              }
              {
                menu?.isDataEntry !== true && menu?.id === 24 &&
                <IshurTnuotComponent></IshurTnuotComponent>
              }
              {
                menu?.isDataEntry !== true && menu?.id != 17 &&
                <div>menu.id is {menu?.id} menunameis: {menu?.screenName}</div>
              }
            </div>
          </Box>

    </div>
  )
}

export default TabsComponent