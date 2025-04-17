import React, { useState } from 'react';
import { likePost, unlikePost } from '../services/api';
import Button from './Button';

const PostCard = ({ post, onDeleteClick, refreshPosts, userName = "사용자" }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [isLoading, setIsLoading] = useState(false);
  
  // 좋아요 토글 핸들러
  const handleLikeToggle = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      if (isLiked) {
        await unlikePost(post.id, { userName });
        setLikeCount(prev => Math.max(0, prev - 1));
      } else {
        await likePost(post.id, { userName });
        setLikeCount(prev => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('좋아요 처리 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // 날짜 포맷팅
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {post.imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={post.imageUrl} 
            alt={`${post.userName}의 포스트`} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-gray-700">{post.userName}</span>
          <span className="text-sm text-gray-500">{formatDate(post.createdAt)}</span>
        </div>
        
        <p className="text-gray-800 mb-4">{post.content}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Button
              onClick={handleLikeToggle}
              variant={isLiked ? "primary" : "outline"}
              small
              className="flex items-center space-x-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={isLiked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{likeCount}</span>
            </Button>
            
            <Button
              variant="outline"
              small
              className="flex items-center space-x-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>{post.commentCount}</span>
            </Button>
          </div>
          
          {post.userName === userName && (
            <div className="flex space-x-2">
              <Button
                onClick={() => onDeleteClick(post.id)}
                variant="danger"
                small
              >
                삭제
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;