import { Business, Notification, Post, User } from '../Types/allTypes';
import { BACKEND_SERVER_URL } from './Constants';

interface UserCredentials {
  email: string;
  password: string;
}

interface UserSignupData extends UserCredentials {
  firstName: string;
  lastName: string;
}

interface ReviewData {
  userId: string;
  businessId: string;
  title: string;
  content: string;
  images?: string[];
  rating: number;
}

interface ResetPasswordData {
  token: string;
  password: string;
}

interface SubmitResultsData {
  userId: string;
  score: number;
  totalQuestions: number;
  subject: string;
  level: string;
}


export const emailSignUp = async (email: string): Promise<any> => {
  const response = await fetch(`${BACKEND_SERVER_URL}/emailSignup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  });

  return response.status === 200;
}

export const userSignIn = async ({
  email,
  password
}: UserCredentials): Promise<any> => {
  const response = await fetch(`${BACKEND_SERVER_URL}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (response.status === 200) {
    return await response.json();
  } else {
    return { error: "InvalidCredentials" };
  }
};

export const getFeaturedBusinesses = async (): Promise<any[] | undefined> => {
  const response = await fetch(`${BACKEND_SERVER_URL}/featuredBusinesses`, {
    method: 'GET',
  });

  if (response.status === 200) {
    return response.json();
  } else {
    console.log(`Error: ${response.status}`);
  }
  return undefined;
};

export const addBusiness = async (data: Business): Promise<boolean> => {
  const response = await fetch(`${BACKEND_SERVER_URL}/addbusiness`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.json();
};

export const editBusiness = async (data: Business): Promise<boolean> => {
  console.log('Editing business with ID:', data._id);
  const response = await fetch(`${BACKEND_SERVER_URL}/editbusiness`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.json();
};

export const getBusinessById = async (id: string): Promise<any> => {
  console.log('Fetching business with ID:', id);
  const response = await fetch(`${BACKEND_SERVER_URL}/businessById/${id}`, {
    method: 'GET',
  });

  if (response.status === 200) {
    return response.json();
  } else {
    console.log(`Error: ${response.status}`);
  }
};

export const deleteComment = async (data: { postId: string; commentId: string }): Promise<boolean> => {
  const response = await fetch(`${BACKEND_SERVER_URL}/deleteComment`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.json();
}

export const addComment = async (data: { postId: string; userId: string; content: string }): Promise<boolean> => {
  const response = await fetch(`${BACKEND_SERVER_URL}/addComment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.json();
}

export const unlikePost = async (data: { postId: string; userId: string }): Promise<boolean> => {
  const response = await fetch(`${BACKEND_SERVER_URL}/unlikePost`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.json();
}

export const likePost = async (data: { postId: string; userId: string }): Promise<boolean> => {
  const response = await fetch(`${BACKEND_SERVER_URL}/likePost`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.json();
}

export const deletePost = async (data: { postId: string; businessId: string }): Promise<boolean> => {
  const response = await fetch(`${BACKEND_SERVER_URL}/deletePost`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.status === 200;
}

export const addPost = async (data: {
  businessId: string;
  content: string;
  media?: string[];
  userId: string;
}): Promise<any> => {
  const response = await fetch(`${BACKEND_SERVER_URL}/addpost`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.json();
};

export const getPosts = async (data: {businessId?: string, page?: string}): Promise<any> => {
  const queryParams = new URLSearchParams(data).toString();
  const response = await fetch(`${BACKEND_SERVER_URL}/posts?${queryParams}`, {
    method: 'GET',
  });

  if (response.status === 200) {
    return response.json();
  } else {
    console.log(`Error: ${response.status}`);
  }
}

export const getPostById = async (id: string): Promise<Post | undefined> => {
  const response = await fetch(`${BACKEND_SERVER_URL}/post/${id}`, {
    method: 'GET',
  });

  if (response.status === 200) {
    return response.json();
  } else {
    console.log(`Error: ${response.status}`);
  }
  return undefined;
};

export const getNotifications = async (userId: string): Promise<any> => {
  const response = await fetch(`${BACKEND_SERVER_URL}/notifications/${userId}`, {
    method: 'GET',
  });

  if (response.status === 200) {
    return response.json();
  } else {
    console.log(`Error: ${response.status}`);
  }
}

export const markNotificationAsRead = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${BACKEND_SERVER_URL}/notificationRead`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id}),
    });

    if (!response.ok) {
      console.error(`Error marking notification as read: ${response.status} ${response.statusText}`);
      return false;
    }

    return response.json();
  } catch (error) {
    console.error('Network error:', error);
    return false;
  }
}

export const sendNotification = async (notification: Notification): Promise<boolean> => {
  const response = await fetch(`${BACKEND_SERVER_URL}/sendNotification`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(notification)
  });

  return response.json();
}

export const getFilteredBusinesses = async ( selectedCategoryList:{
  searchValue?: string[],
  userListing?: string,
  showUnApprovedListings?: false
}): Promise<any[]> => {
  const queryParams = new URLSearchParams(selectedCategoryList as any).toString();
  const response = await fetch(`${BACKEND_SERVER_URL}/businesses?${queryParams}`, {
    method: 'GET',
  });

  if (response.status === 200) {
    return response.json();
  } else {
    console.log(`Error: ${response.status}`);
    return [];
  }
};

export const getCategories = async (): Promise<any[]> => {
  const response = await fetch(`${BACKEND_SERVER_URL}/allCategoriesList`, {
    method: 'GET',
  });

  if (response.status === 200) {
    return response.json();
  } else {
    console.log(`Error: ${response.status}`);
    return [];
  }
};

export const getCategoryById = async (id: string): Promise<any> => {
  const response = await fetch(`${BACKEND_SERVER_URL}/category/${id}`, {
    method: 'GET',
  });

  if (response.status === 200) {
    return response.json();
  } else {
    console.log(`Error: ${response.status}`);
  }
};

export const getSubcategories = async (category: string): Promise<any[] | undefined> => {
  const response = await fetch(`${BACKEND_SERVER_URL}/subcategoryList?category=${category}`, {
    method: 'GET',
  });

    if (response.status === 200) {
      return response.json();
    } else {
      console.log(`Error: ${response.status}`);
    }
      return undefined;
    };
  

export const verifyToken = async (token: string): Promise<any | false> => {
  const response = await fetch(`${BACKEND_SERVER_URL}/user/verify`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` },
  });

  return response.status === 200 ? response.json() : false;
};

export const editUser = async (data: {
  user: User;
  token: string;
}): Promise<any> => {
  const response = await fetch(`${BACKEND_SERVER_URL}/user/editUser/${data.token}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.status === 200) {
    return response.json();
  } else {
    console.log(`Error: ${response.status}`);
  }
}

export const userSignUp = async (data: UserSignupData): Promise<any> => {
  const response = await fetch(`${BACKEND_SERVER_URL}/user/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.status === 200) {
    return await response.json();
  } else if (response.status === 409) {
    return { error: "UserExists" };
  } else {
    return { error: "SignUpFailed" };
  }
};

export const userUpdatePassword = async (token: string, currentPassword: string, newPassword: string): Promise<any> => {
  const response = await fetch(`${BACKEND_SERVER_URL}/user/updatePassword/${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ currentPassword, newPassword })
  });

  if (response.status === 200) {
    return true;
  } else if (response.status === 401) {
    return { error: "IncorrectPassword" };
  } else {
    console.log(`Error: ${response.status}`);
    return { error: "ChangePasswordFailed" };
  }
};

export const getReviews = async (businessId: string): Promise<any[] | undefined> => {
  const response = await fetch(`${BACKEND_SERVER_URL}/reviews/${businessId}`, {
    method: 'GET',
  });

  if (response.status === 200) {
    return response.json();
  } else {
    console.log(`Error: ${response.status}`);
  }
  return undefined;
};

export const postReview = async (data: ReviewData): Promise<boolean> => {
  const response = await fetch(`${BACKEND_SERVER_URL}/addreview`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.json();
};

export const userDeleteAccount = async (token: string, password: string): Promise<any> => {
  const response = await fetch(`${BACKEND_SERVER_URL}/user/delete/${token}/${password}`, {
    method: 'DELETE',
  });

  if (response.status === 200) {
    return true;
  } else if (response.status === 401) {
    return { error: "IncorrectPassword" };
  } else {
    return { error: "DeleteAccountFailed" };
  }
};

export const getCategoryList = async (): Promise<any[] | undefined> => {
  const response = await fetch(`${BACKEND_SERVER_URL}/categoriesList`, {
    method: 'GET',
  });

  if (response.status === 200) {
    return response.json();
  } else {
    console.log(`Error: ${response.status}`);
  }
  return undefined;
};

export const getQuiz = async (category: string, difficulty: string): Promise<any> => {
  const response = await fetch(`${BACKEND_SERVER_URL}/quiz?category=${category}&difficulty=${difficulty}`, {
    method: 'GET',
  });

  if (response.status === 200) {
    return response.json();
  } else {
    console.log(`Error: ${response.status}`);
  }
};

export const submitResults = async (data: SubmitResultsData): Promise<void> => {
  const response = await fetch(`${BACKEND_SERVER_URL}/quizAttempts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  if (response.status === 201) {
    console.log('Success: Added new quiz attempt to DB');
  } else {
    console.log(`Error: ${response.status}`);
  }
};

export const forgotPassword = async (email: string): Promise<any> => {
  const response = await fetch(`${BACKEND_SERVER_URL}/user/forgotPassword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  });

  return response.json();
};

export const resetPassword = async (data: ResetPasswordData): Promise<any> => {
  const response = await fetch(`${BACKEND_SERVER_URL}/user/resetPassword/${data.token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password: data.password })
  });

  return response.json();
}