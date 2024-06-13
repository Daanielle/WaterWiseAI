import { NavLink } from "react-router-dom";
import classes from "../styles/NavigationBar.module.css";
import WaterWizeAILogo from "../resources/images/WaterWizeAI-logo.png";
import LanguageSwitch from "./LanguageSwitch";
import useDictionary from "../resources/Dictionary/Dictionary";
import UserDetailsBar from "./UserDetailsBar";
import { useLanguage } from "../LanguageContext";

function NavigationBar() {
  const { lang, setLang } = useLanguage();
  const dict = useDictionary();

  const navItems = [
    { path: "/AboutUs", key: "aboutUs" },
    { path: "/ContactUs", key: "contuctUs" },
    { path: "/Guide", key: "support" },
    { path: "/WaterCalculator", key: "waterCalculator" },
    { path: "/TasksList", key: "tasksManagement" },
    { path: "/Forum", key: "forum" },
  ];
  const rearrangedNavItems = lang === 'heb' ? navItems.reverse() : navItems;
  return (

    <div className={classes.container}>
    {/* <UserDetailsBar className={classes.userDetailsBarhebrew} /> */}
    {/* <div> */}
  {lang === 'heb' ? (
    <>
    <div className={classes.userDetailsBarhebrew}>
      <UserDetailsBar />
    </div>


      
    <header className={classes.navbarhebrew}>
    <div className={classes.logoContainer}>
              <NavLink to="/">
                <img src={WaterWizeAILogo} alt="WaterWizeAI logo" />
              </NavLink>
    </div>
    <div className={classes.langSwitch}>
              <LanguageSwitch setLang={setLang} />
      </div>
      <nav>
        <ul className={classes.list}>
          {rearrangedNavItems.map(item => (
              <NavLink
                  key={item.key}
                  to={item.path}
                  className={({ isActive }) =>
                  isActive ? classes.active : classes.inactive
                }
                >
                <li>{dict[item.key]}</li>
              </NavLink>
          ))}
        </ul>
      </nav>

    </header>
    

    </>





  ) : (
    <>
    <div className={classes.userDetailsBarenglish}>
      <UserDetailsBar />
    </div>
    <header className={classes.navbarenglish}>
      <nav>
        <ul className={classes.list}>
          {rearrangedNavItems.map(item => (
            <NavLink
              key={item.key}
              to={item.path}
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              <li>{dict[item.key]}</li>
            </NavLink>
          ))}
        </ul>
      </nav><div className={classes.langSwitch}>
              <LanguageSwitch setLang={setLang} />
    </div>
      <div className={classes.logoContainer}>
              <NavLink to="/">
                <img src={WaterWizeAILogo} alt="WaterWizeAI logo" />
              </NavLink>
    </div>
    
    </header>
    
    </>
    
  )}
{/* </div>     */}




    {/* <header className={classes.navbarhebrew}>
      {lang === 'heb' ? (
          <>
          <nav>
          <ul className={classes.list}>
          <NavLink to="/">
          <img src={WaterWizeAILogo} alt="WaterWizeAI logo" />
          </NavLink>
          <LanguageSwitch className={classes.langSwitch} setLang={setLang} />
            {rearrangedNavItems.map(item => (
              <NavLink
                key={item.key}
                to={item.path}
                className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
              >
              <li>{dict[item.key]}</li>
              </NavLink>
          ))}
        </ul>
      </nav>
          </>
        ) : (
          <>
            <nav>
        <ul className={classes.list}>
          {rearrangedNavItems.map(item => (
            <NavLink
              key={item.key}
              to={item.path}
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              <li>{dict[item.key]}</li>
            </NavLink>
          ))}
        </ul>
      </nav>
      <div className={classes.logoContainer}>
              <NavLink to="/">
                <img src={WaterWizeAILogo} alt="WaterWizeAI logo" />
              </NavLink>
            </div>
            <div className={classes.langSwitch}>
              <LanguageSwitch setLang={setLang} />
            </div>
          </>
        )}
    </header> */}
  </div>

  );
}

export default NavigationBar;
