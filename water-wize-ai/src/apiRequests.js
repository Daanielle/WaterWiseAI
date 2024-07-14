// import { AuthContext, updateUserDetails } from "./AuthContext";
// import { useContext } from "react";
// import updateUserDetails from "./AuthContext"

export const getCalculate = async (selectedArea, areaSize, date, kc) => {
  try {

    const calculationResponse = await fetch('/calculator/calculate', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selectedArea: selectedArea,
        areaSize: areaSize,
        date: date,
        userKc: kc
      }),
    });

    const recommendationData = await calculationResponse.json();
    return recommendationData;


  } catch (error) {
    console.error("Error:", error);
  }
};


export const saveRecommendation = async (recommendation, selectedDate) => {
  try {
    const calculationResponse = await fetch('/calculator/recommendations', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recommendation,
        selectedDate
      }),
    });
    const status = await calculationResponse.json();
    return status
  } catch (error) {
    console.error("Error:", error);
  }
};


export const getRecommendationsForUser = async (userId) => {
  try {
    const url = `/calculator/recommendations?userId=${userId}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status}: ${errorData.error}`);
    }

    const recommendations = await response.json();
    return recommendations;
  } catch (error) {
    console.error('Failed to fetch recommendations:', error);
    throw error;
  }
};


export const getRecommendationsById = async (recId) => {
  try {
    const url = `/calculator/recommendations/${recId}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status}: ${errorData.error}`);
    }

    const recommendation = await response.json();
    return recommendation;
  } catch (error) {
    console.error('Failed to fetch recommendations:', error);
    throw error;
  }
};


export const registerUser = async (firstName, lastName, email, password, image) => {
  try {
    const response = await fetch(`/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "password": password,
        "image": image,
      }),
    });
    const status = await response.json();
    return status
  } catch (error) {
    console.error("Error:", error);
  }
}


export const getLoggedInUserId = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  try {
    if (user) {
      const response = await fetch(`/users/${user._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'update failed!');
      }
      const data = await response.json(); // Parse the JSON response
      return data._id
    }
  } catch (error) {
    console.error("Error:", error);
  }

};


export const getLoggedInUserImage = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  try {
    if (user) {
      const response = await fetch(`/users/${user._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'update failed!');
      }
      const data = await response.json(); // Parse the JSON response
      return data.image
    }
  } catch (error) {
    console.error("Error:", error);
  }

};


export const getLoggedInUserEmail = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  try {
    if (user) {
      const response = await fetch(`/users/${user._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'update failed!');
      }
      const data = await response.json(); // Parse the JSON response
      return data.email
    }
  } catch (error) {
    console.error("Error:", error);
  }

};


export const getUserById = async (userId) => {
  try {
    const url = `/users/${userId}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status}: ${errorData.error}`);
    }
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}


export const getAllUsers = async (userId) => {
  try {
    const url = `/users`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status}: ${errorData.error}`);
    }

    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Failed to fetch recommendations:', error);
    throw error;
  }
}

export const patchUserDetails = async (editedUser) => {
  try {
    const response = await fetch("/users/" + editedUser._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedUser),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Update failed!');
    }
    const status = await response.json();
    return status
  } catch (error) {
    console.error("Error:", error);
  }
};

export const updatePassword = async (user, newPass) => {
  try {
    const response = await fetch("/users/" + user._id + "/password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({password: newPass}),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Update failed!');
    }
    const status = await response.json();
    return status
  } catch (error) {
    console.error("Error:", error);
  }
};

export const checkEmailExists = async (email) => {
  try {
    const response = await fetch("/users/check-email" , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: email}),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Update failed!');
    }
    const res = await response.json();
    return res
  } catch (error) {
    console.error("Error:", error);
  }
};

export const addNewForumMessage = async (message) => {
  try {
    const response = await fetch('/forum/newMessage', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(
        message
        // message.userId, message.title, message.body,
        // message.recommendation,
      ),
    });
    const status = await response.json();
    return status
  } catch (error) {
    console.error("Error:", error);
  }
}


export const getAllForumMessages = async () => {
  try {
    const response = await fetch('forum/messages', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const messages = await response.json();
    return messages
  } catch (error) {
    console.error("Error:", error);
  }
}


export const addNewForumComment = async (comment) => {
  try {
    const response = await fetch(`/forum/messages/${comment.message}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: comment.userId,
        title: comment.title,
        body: comment.body,
      }),
    });
    const status = await response.json();
    return status
  } catch (error) {
    console.error("Error:", error);
  }
}


export const getAllCommentsForMsg = async (msgId) => {
  try {
    const response = await fetch(`/forum/messages/${msgId}/comments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const comments = await response.json();
    return comments
  } catch (error) {
    console.error("Error:", error);
  }
}


export const getMyCoordinates = async () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const userLatitude = position.coords.latitude;
        const userLongitude = position.coords.longitude;

        try {
          const response = await fetch('/calculator/coordinates', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ latitude: userLatitude, longitude: userLongitude }),
          });

          if (response.ok) {
            const data = await response.json();
            const { closestArea, closestCity } = data;

            if (closestArea && closestCity) {
              let res = {
                selectedArea: {label: closestArea.name,  value: closestArea.id,  },
                closestCity: { label: closestCity },
                myCoordinates: {userLongitude, userLatitude}
              };
              resolve(res);
            } else {
              reject('No closest area or city found.');
            }
          } else {
            reject('Error fetching geolocation data: ' + response.statusText);
          }
        } catch (error) {
          reject('Error fetching geolocation data: ' + error.message);
        }
      }, (error) => {
        reject('Error fetching geolocation: ' + error.message);
      });
    } else {
      resolve("Geolocation is not supported by this browser.");
    }
  });
};
