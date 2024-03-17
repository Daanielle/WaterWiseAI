import React, { useEffect, useState } from 'react';
import PageContainer from "../components/PageContainer";

function WaterCalculator() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api")
      .then(response => response.json())
      .then(data => {
        setUsers(data.users);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <PageContainer>
      <div>
        <h1>מחשבון מים</h1>
        <div>
          <h2>Users:</h2>
          <ul>
            {users.map((user, i) => (
              <li key={i}>{user}</li>
            ))}
          </ul>
        </div>
      </div>
    </PageContainer>
  );
}

export default WaterCalculator;

// import PageContainer from "../components/PageContainer";

// function WaterCalculator() {
//   return (
//     <PageContainer>
//       <h1>מחשבון מים</h1>
//       {(typeof backendData.users === 'undefined') ? (
//         <p>loading</p>
//       ): (
//         backendData.users.map((user, i) =>(
//           <p key={i}>{user}</p>
//         ))
//       )}
//     </PageContainer>
//   );
// }

// export default WaterCalculator;
