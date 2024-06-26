import { AuthContext } from "./AuthContext";
import { useContext } from "react";


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

export const saveRecommendation = async (recommendation) => {
  try {
    const calculationResponse = await fetch('/calculator/recommendations', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recommendation,
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


export const addNewForumMessage = async (message) => {
  try {
    //const recommendations = message.recommendation.map(id => ObjectId(id));
    console.log("fffffffffff" + message.recommendations)
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
    console.log(msgId)
    const response = await fetch(`/forum/messages/${msgId}/comments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const comments = await response.json();
    console.log(comments)
    return comments
  } catch (error) {
    console.error("Error:", error);
  }
}
