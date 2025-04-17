import React, { useState, useEffect } from 'react';
import { getPost, deletePost } from '../services/api';
import Button from './Button';
import CommentSection from './CommentSection';

const PostDetail = ({ postId, onClose, onDeleteSuccess, userName }) => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // 포스트 상세 정보 불러오기
  const fetchPostDetail = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const fetchedPost = await getPost(postId);
      setPost(fetchedPost);
    } catch (err) {
      console.error('포스트 상세 정보 불러오기 오류:', err);
      setError('포스트를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // 컴포넌트 마운트 시 포스트 상세 정보 불러오기
  useEffect(() => {
    if (postId) {
      fetchPostDetail();
    }
  }, [postId]);
  
  // 포스트 삭제 처리
  const handleDelete = async () => {
    if (!window.confirm('정말로 이 포스트를 삭제하시겠습니까?')) {
      return;
    }
    
    try {
      await deletePost(postId);
      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
      if (onClose) {
        onClose();
      }
    } catch (err) {
      console.error('포스트 삭제 오류:', err);
      setError('포스트 삭제에 실패했습니다.');
    }
  };
  
  // 날짜 포맷팅
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  };
  
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-3xl w-full mx-4">
          <p className="text-center">포스트를 불러오는 중...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-3xl w-full mx-4">
          <p className="text-red-500 text-center">{error}</p>
          <div className="flex justify-center mt-4">
            <Button onClick={onClose}>닫기</Button>
          </div>
        </div>
      </div>
    );
  }
  
  if (!post) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto py-10">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 my-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">{post.userName}의 포스트</h2>
            <Button variant="outline" small onClick={onClose}>닫기</Button>
          </div>
          
          {post.imageUrl && (
            <div className="mb-4">
              <img src={post.imageUrl} alt="포스트 이미지" className="rounded-lg w-full max-h-96 object-cover" />
            </div>
          )}
          
          <div className="mb-6">
            <p className="text-gray-800 text-lg">{post.content}</p>
            <p className="text-gray-500 text-sm mt-2">{formatDate(post.createdAt)}</p>
          </div>
          
          <div className="flex items-center justify-between border-t border-b py-4 mb-6">
            <div className="flex space-x-4">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-gray-700">{post.likeCount} 좋아요</span>
              </div>
              
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <span className="text-gray-700">{post.commentCount} 댓글</span>
              </div>
            </div>
            
            {post.userName === userName && (
              <Button onClick={handleDelete} variant="danger" small>
                삭제
              </Button>
            )}
          </div>
          
          <CommentSection postId={postId} userName={userName} />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;