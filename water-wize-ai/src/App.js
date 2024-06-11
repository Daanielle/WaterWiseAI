import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import Forum from "./pages/Forum";
import ContactUs from "./pages/ContactUs";
import Guide from "./pages/Guide";
import WaterCalculator from "./pages/WaterCalculator";
import Demo from "./pages/Demo";
import TasksList from "./pages/TasksList";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import UserDetails from "./pages/UserDetails"
import { LanguageProvider } from "./LanguageContext";
import { AuthProvider } from './AuthContext';


// const style =  {
//   backgroundImage: `url(${palm})`,
//   backgroundSize: 'cover', // Cover the entire container
//   backgroundRepeat: 'no-repeat', // Prevent repeating the background image
//   backgroundPosition: 'center', // Center the background image
//   height: '100vh',
// };

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/AboutUs", element: <AboutUs /> },
      { path: "/ContactUs", element: <ContactUs /> },
      { path: "/Guide", element: <Guide /> },
      { path: "/Forum", element: <Forum /> },
      { path: "/WaterCalculator", element: <WaterCalculator /> },
      { path: "/TasksList", element: <TasksList /> },
      { path: "/LogIn", element: <LogIn /> },
      { path: "/Register", element: <Register /> },
      { path: "/UserDetails", element: <UserDetails /> },
      { path: "/Demo", element: <Demo /> },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <div>
          <RouterProvider router={router}></RouterProvider>
        </div>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
