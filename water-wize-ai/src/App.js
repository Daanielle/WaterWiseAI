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
import { LanguageProvider } from "./LanguageContext";

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
      { path: "/Demo", element: <Demo /> },
    ],
  },
]);

function App() {
  return (
    <LanguageProvider>
      <div>
        <RouterProvider router={router}></RouterProvider>
      </div>
    </LanguageProvider>
  );
}

export default App;
