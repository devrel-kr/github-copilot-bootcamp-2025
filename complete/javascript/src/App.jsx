import React, { useState, useEffect } from 'react';
import PostCard from './components/PostCard';
import NewPostForm from './components/NewPostForm';
import PostDetail from './components/PostDetail';
import { getPosts, deletePost } from './services/api';

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('userName') || '';
  });
  const [selectedPostId, setSelectedPostId] = useState(null);
  
  // 로컬 스토리지에 사용자 이름 저장
  useEffect(() => {
    if (userName) {
      localStorage.setItem('userName', userName);
    }
  }, [userName]);
  
  // 포스트 목록 불러오기
  const loadPosts = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      console.error('포스트 불러오기 오류:', err);
      setError('포스트를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // 컴포넌트 마운트 시 포스트 불러오기
  useEffect(() => {
    loadPosts();
  }, []);
  
  // 포스트 클릭 핸들러
  const handlePostClick = (postId) => {
    setSelectedPostId(postId);
  };
  
  // 포스트 삭제 핸들러
  const handleDeletePost = async (postId) => {
    if (!window.confirm('정말로 이 포스트를 삭제하시겠습니까?')) {
      return;
    }
    
    try {
      await deletePost(postId);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (err) {
      console.error('포스트 삭제 오류:', err);
      alert('포스트 삭제에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Contoso 아웃도어 소셜</h1>
          <p className="text-gray-600 mt-1">아웃도어 컴퍼니를 위한 소셜 미디어 플랫폼</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* 왼쪽 사이드바 - 데스크톱에서만 표시 */}
            <div className="hidden lg:block lg:w-1/4">
              <div className="bg-white p-5 rounded-lg shadow-md">
                <h2 className="text-lg font-medium mb-4">Contoso 아웃도어</h2>
                <p className="text-gray-600 mb-4">
                  최고 품질의 아웃도어 장비와 액세서리를 제공합니다. 
                  자연을 탐험하고 모험을 즐기세요!
                </p>
                <hr className="my-4" />
                <div className="mb-3">
                  <h3 className="font-medium">인기 태그</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">#등산</span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">#캠핑</span>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">#트레킹</span>
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">#아웃도어</span>
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">#백패킹</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 메인 콘텐츠 영역 */}
            <div className="flex-1 lg:w-2/4">
              {/* 새 포스트 폼 */}
              <NewPostForm onPostCreated={loadPosts} userName={userName} setUserName={setUserName} />

              {/* 포스트 목록 */}
              <div>
                <h2 className="text-xl font-bold mb-4">최근 포스트</h2>
                
                {error && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
                    {error}
                  </div>
                )}
                
                {isLoading ? (
                  <div className="text-center py-10">
                    <p className="text-gray-500">포스트를 불러오는 중...</p>
                  </div>
                ) : posts.length === 0 ? (
                  <div className="text-center py-10 bg-white rounded-lg shadow-md">
                    <p className="text-gray-500">아직 포스트가 없습니다.</p>
                    <p className="text-gray-500">첫 번째 포스트를 작성해 보세요!</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {posts.map((post) => (
                      <div key={post.id} onClick={() => handlePostClick(post.id)} className="cursor-pointer">
                        <PostCard
                          post={post}
                          onDeleteClick={(e) => {
                            e.stopPropagation();
                            handleDeletePost(post.id);
                          }}
                          refreshPosts={loadPosts}
                          userName={userName}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* 오른쪽 사이드바 - 데스크톱에서만 표시 */}
            <div className="hidden lg:block lg:w-1/4">
              <div className="bg-white p-5 rounded-lg shadow-md mb-6">
                <h2 className="text-lg font-medium mb-4">신제품 소식</h2>
                <ul className="space-y-3">
                  <li className="text-sm">
                    <p className="font-medium">새로운 경량 텐트 출시</p>
                    <p className="text-gray-600">초경량 2인용 텐트를 지금 만나보세요!</p>
                  </li>
                  <li className="text-sm">
                    <p className="font-medium">여름 시즌 하이킹 부츠</p>
                    <p className="text-gray-600">더운 여름을 위한 특별 설계 부츠</p>
                  </li>
                  <li className="text-sm">
                    <p className="font-medium">방수 재킷 할인 이벤트</p>
                    <p className="text-gray-600">이번 주까지 전 제품 20% 할인</p>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-md">
                <h2 className="text-lg font-medium mb-4">사용 안내</h2>
                <p className="text-sm text-gray-600 mb-3">
                  Contoso 아웃도어 제품과 관련된 경험을 공유하고 다른 사용자들과 소통하세요.
                </p>
                <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                  <li>제품 사진과 함께 리뷰를 남겨주세요</li>
                  <li>다른 사용자들의 포스트에 댓글을 달아보세요</li>
                  <li>유용한 팁과 노하우를 공유해 보세요</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* 푸터 */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; 2025 Contoso 아웃도어 컴패니. All rights reserved.
          </p>
        </div>
      </footer>
      
      {/* 포스트 상세 모달 */}
      {selectedPostId && (
        <PostDetail
          postId={selectedPostId}
          onClose={() => setSelectedPostId(null)}
          onDeleteSuccess={loadPosts}
          userName={userName}
        />
      )}
    </div>
  );
}

export default App;