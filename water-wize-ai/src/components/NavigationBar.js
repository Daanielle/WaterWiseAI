import { NavLink } from "react-router-dom";
import classes from "../styles/NavigationBar.module.css";
import WaterWizeAILogo from "../resources/images/WaterWizeAI-logo.png";
import LanguageSwitch from "./LanguageSwitch";
import useDictionary from "../resources/Dictionary/Dictionary";
import UserDetailsBar from "./UserDetailsBar";

function NavigationBar() {
  const dict = useDictionary();

  return (
    <div className={classes.container}>
    <div className={classes.userDetailsBar}>
      <UserDetailsBar />
      </div>
      <header className={classes.navbar}>
        <nav>
          <ul className={classes.list}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
              end
            >
              <li>{dict.home}</li>
            </NavLink>
            <NavLink
              to="/AboutUs"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              <li>{dict.aboutUs}</li>
            </NavLink>

            <NavLink
              to="/ContactUs"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              <li>{dict.contuctUs}</li>
            </NavLink>

            <NavLink
              to="/Guide"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              <li>{dict.support}</li>
            </NavLink>

            <NavLink
              to="/WaterCalculator"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              <li>{dict.waterCalculator}</li>
            </NavLink>

            <NavLink
              to="/TasksList"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              <li>{dict.tasksManagement}</li>
            </NavLink>

            <NavLink
              to="/Forum"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              <li>{dict.forum}</li>
            </NavLink>
          </ul>
        </nav>
        <div className={classes.container}>
          <div className={classes.langSwitch}>
            <LanguageSwitch />
          </div>
          <NavLink to="/">
            <img src={WaterWizeAILogo} alt="WaterWizeAI logo" />
          </NavLink>
        </div>
      </header>
    </div>
  );
}

export default NavigationBar;
