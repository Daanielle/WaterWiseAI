import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import RootLayout from './pages/Root';
import ErrorPage from './pages/ErrorPage';
import Forum from './pages/Forum';
import ContactUs from './pages/ContactUs';
import Guide from './pages/Guide';
import WaterCalculator from './pages/WaterCalculator';
import Demo from './pages/Demo';
// import React, { useEffect, useState } from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/AboutUs', element: <AboutUs /> },
      { path: '/ContactUs', element: <ContactUs /> },
      { path: '/Guide', element: <Guide /> },
      { path: '/Forum', element: <Forum /> },
      { path: '/WaterCalculator', element: <WaterCalculator /> },
      { path: '/Demo', element: <Demo /> },
    ]
  },
]);

function App() {
  // const [backendData, setBackendData] = useState([]);

  // useEffect(() => {
  //   fetch("/api")
  //     .then(response => response.json())
  //     .then(data => {
  //       setBackendData(data.users);
  //     })
  //     .catch(error => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  return (
    <RouterProvider router={router}>
      {/* <div>
        {backendData.length === 0 ? (
          <p>Loading...</p>
        ) : (
          backendData.map((user, i) => (
            <p key={i}>{user}</p>
          ))
        )}
      </div> */}
    </RouterProvider>
  );
}

export default App;

// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Home from './pages/Home';
// import AboutUs from './pages/AboutUs';
// import RootLayout from './pages/Root';
// import ErrorPage from './pages/ErrorPage';
// import Forum from './pages/Forum';
// import ContactUs from './pages/ContactUs';
// import Guide from './pages/Guide';
// import WaterCalculator from './pages/WaterCalculator';
// import Demo from './pages/Demo';
// import React, { useEffect, useState } from 'react';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <RootLayout />,
//     errorElement: <ErrorPage />,
//     children: [
//       { path: '/', element: <Home /> },
//       { path: '/AboutUs', element: <AboutUs /> },
//       { path: '/ContactUs', element: <ContactUs /> },
//       { path: '/Guide', element: <Guide /> },
//       { path: '/Forum', element: <Forum /> },
//       { path: '/WaterCalculator', element: <WaterCalculator /> },
//       { path: '/Demo', element: <Demo /> },
//     ]
//   },
// ])

// function App() {
//   const [backendData, setBackendData] = useState([]);

//   useEffect(() => {
//     fetch("/api")
//       .then(response => response.json())
//       .then(data => {
//         setBackendData(data.users); // Update to set backendData directly to the array
//       })
//       .catch(error => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   return (
//     <div>
//       {backendData.length === 0 ? (
//         <p>Loading...</p>
//       ) : (
//         backendData.map((user, i) => (
//           <p key={i}>{user}</p>
//         ))
//       )}
//     </div>
//   );
// }

// export default App;
