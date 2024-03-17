import { NavLink } from "react-router-dom";
import classes from "../styles/NavigationBar.module.css";
import WaterWizeAILogo from "../resources/images/WaterWizeAI-logo.png";

function NavigationBar() {
  return (
    <>
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
              <li>בית</li>
            </NavLink>
            <NavLink
              to="/AboutUs"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              <li>עלינו</li>
            </NavLink>

            <NavLink
              to="/ContactUs"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              <li>צרו קשר</li>
            </NavLink>

            <NavLink
              to="/Guide"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              <li>תמיכה והדרכה</li>
            </NavLink>

            <NavLink
              to="/WaterCalculator"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              <li>מחשבון מים</li>
            </NavLink>

            <NavLink
            to="/TasksList"
            className={({ isActive }) =>
              isActive ? classes.active : classes.inactive
            }
          >
            <li>ניהול משימות</li>
          </NavLink>

            <NavLink
              to="/Forum"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              <li>פורום</li>
            </NavLink>
            <NavLink
            to="/Demo"
            className={({ isActive }) =>
              isActive ? classes.active : classes.inactive
            }
          >
            <li>דמו</li>
          </NavLink>
          </ul>

        </nav>

        <NavLink to="/">
        <img src={WaterWizeAILogo} alt="WaterWizeAI logo" />
      </NavLink>
      </header>
    </>
  );
}

export default NavigationBar;
