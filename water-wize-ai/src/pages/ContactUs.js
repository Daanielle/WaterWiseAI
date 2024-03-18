import PageContainer from "../components/PageContainer";

function ContactUs() {
  return (
    <PageContainer>
      <h1>צרו קשר</h1>
    </PageContainer>
  );
}

export default ContactUs;
// import React, { useEffect, useState } from 'react';
// import PageContainer from "../components/PageContainer";

// function WaterCalculator() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetch("/api")
//       .then(response => response.json())
//       .then(data => {
//         setUsers(data.users);
//       })
//       .catch(error => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   return (
//     <PageContainer>
//       <div>
//         <h1>מחשבון מים</h1>
//         <div>
//           <h2>Users:</h2>
//           <ul>
//             {users.map((user, i) => (
//               <li key={i}>{user}</li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </PageContainer>
//   );
// }

// export default WaterCalculator;