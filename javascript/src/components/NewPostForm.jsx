import React, { useState } from 'react';
import Button from './Button';
import { createPost } from '../services/api';

const NewPostForm = ({ onPostCreated, userName, setUserName }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userName.trim()) {
      setError('사용자 이름을 입력해주세요.');
      return;
    }
    
    if (!content.trim()) {
      setError('내용을 입력해주세요.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const postData = {
        userName,
        content,
        ...(imageUrl && { imageUrl })
      };
      
      await createPost(postData);
      setContent('');
      setImageUrl('');
      
      if (onPostCreated) {
        onPostCreated();
      }
      
    } catch (error) {
      console.error('포스트 생성 중 오류:', error);
      setError('포스트 생성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">새 포스트 작성</h2>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
            사용자 이름
          </label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="이름을 입력하세요"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows="4"
            placeholder="무슨 생각을 하고 계신가요?"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
            이미지 URL (선택사항)
          </label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? '게시 중...' : '게시하기'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewPostForm;