// API 서비스 - 백엔드와의 통신을 담당
import {
  mockGetPosts,
  mockGetPost,
  mockCreatePost,
  mockUpdatePost,
  mockDeletePost,
  mockGetComments,
  mockCreateComment,
  mockLikePost,
  mockUnlikePost
} from './mockData';

const API_URL = 'http://localhost:8000/api';

// 백엔드 API 사용 여부 (false면 목업 데이터 사용)
const USE_REAL_API = true;

// 포스트 관련 API 함수
export const getPosts = async () => {
  if (USE_REAL_API) {
    const response = await fetch(`${API_URL}/posts`);
    if (!response.ok) {
      throw new Error('포스트를 불러오는데 실패했습니다');
    }
    return response.json();
  } else {
    return mockGetPosts();
  }
};

export const getPost = async (postId) => {
  if (USE_REAL_API) {
    const response = await fetch(`${API_URL}/posts/${postId}`);
    if (!response.ok) {
      throw new Error('포스트를 불러오는데 실패했습니다');
    }
    return response.json();
  } else {
    return mockGetPost(postId);
  }
};

export const createPost = async (postData) => {
  if (USE_REAL_API) {
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });
    if (!response.ok) {
      throw new Error('포스트 작성에 실패했습니다');
    }
    return response.json();
  } else {
    return mockCreatePost(postData);
  }
};

export const updatePost = async (postId, postData) => {
  if (USE_REAL_API) {
    const response = await fetch(`${API_URL}/posts/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });
    if (!response.ok) {
      throw new Error('포스트 수정에 실패했습니다');
    }
    return response.json();
  } else {
    return mockUpdatePost(postId, postData);
  }
};

export const deletePost = async (postId) => {
  if (USE_REAL_API) {
    const response = await fetch(`${API_URL}/posts/${postId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('포스트 삭제에 실패했습니다');
    }
    return true;
  } else {
    return mockDeletePost(postId);
  }
};

// 댓글 관련 API 함수
export const getComments = async (postId) => {
  if (USE_REAL_API) {
    const response = await fetch(`${API_URL}/posts/${postId}/comments`);
    if (!response.ok) {
      throw new Error('댓글을 불러오는데 실패했습니다');
    }
    return response.json();
  } else {
    return mockGetComments(postId);
  }
};

export const createComment = async (postId, commentData) => {
  if (USE_REAL_API) {
    const response = await fetch(`${API_URL}/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentData)
    });
    if (!response.ok) {
      throw new Error('댓글 작성에 실패했습니다');
    }
    return response.json();
  } else {
    return mockCreateComment(postId, commentData);
  }
};

// 좋아요 관련 API 함수
export const likePost = async (postId, userData) => {
  if (USE_REAL_API) {
    const response = await fetch(`${API_URL}/posts/${postId}/likes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    if (!response.ok) {
      throw new Error('좋아요에 실패했습니다');
    }
    return true;
  } else {
    return mockLikePost(postId, userData);
  }
};

export const unlikePost = async (postId, userData) => {
  if (USE_REAL_API) {
    const response = await fetch(`${API_URL}/posts/${postId}/likes`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    if (!response.ok) {
      throw new Error('좋아요 취소에 실패했습니다');
    }
    return true;
  } else {
    return mockUnlikePost(postId, userData);
  }
};