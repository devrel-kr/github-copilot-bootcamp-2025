// 목업 데이터 - 백엔드 API가 없을 때 테스트용으로 사용

// 포스트 목록 샘플 데이터
const mockPosts = [
  {
    id: 1,
    userName: 'park_ranger',
    content: '새로운 트레일 러닝화를 구매했어요! Contoso 트레일러너 프로 모델은 정말 가볍고 내구성이 좋아요. 이번 주말 산행이 기대됩니다! #트레일러닝 #신발',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    createdAt: new Date(2025, 3, 15).toISOString(),
    updatedAt: new Date(2025, 3, 15).toISOString(),
    likeCount: 24,
    commentCount: 5,
  },
  {
    id: 2,
    userName: 'mountain_lover',
    content: 'Contoso 경량 텐트로 첫 백패킹을 다녀왔습니다. 무게는 가볍지만 강풍에도 끄떡없이 견고했어요! 높은 산에서의 일출은 정말 황홀했습니다. #백패킹 #텐트 #캠핑',
    imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4',
    createdAt: new Date(2025, 3, 10).toISOString(),
    updatedAt: new Date(2025, 3, 10).toISOString(),
    likeCount: 42,
    commentCount: 7,
  },
  {
    id: 3,
    userName: 'hiker_girl',
    content: '새로 출시된 Contoso 하이킹 부츠를 신고 처음으로 장거리 하이킹을 했어요. 발이 전혀 아프지 않았고 접지력도 훌륭해요! 다들 등산할 때 한번 신어보세요. #등산 #부츠 #아웃도어',
    imageUrl: 'https://images.unsplash.com/photo-1606402179428-a57976d71fa4',
    createdAt: new Date(2025, 3, 8).toISOString(),
    updatedAt: new Date(2025, 3, 8).toISOString(),
    likeCount: 18,
    commentCount: 3,
  },
  {
    id: 4,
    userName: 'outdoor_chef',
    content: 'Contoso 캠핑 스토브로 만든 야외 요리! 바람이 많이 불었지만 화력이 안정적이어서 맛있는 파스타를 만들 수 있었어요. 캠핑용 조리도구 중 최고입니다. #캠핑 #요리 #스토브',
    imageUrl: 'https://images.unsplash.com/photo-1547483238-2cbf881a559f',
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
    likeCount: 31,
    commentCount: 8,
  }
];

// 댓글 목록 샘플 데이터
const mockComments = {
  1: [
    {
      id: 101,
      postId: 1,
      userName: 'runner_pro',
      content: '저도 같은 모델 사용 중인데 정말 좋아요! 특히 충격 흡수가 뛰어나더라구요.',
      createdAt: new Date(2025, 3, 15, 14, 30).toISOString(),
      updatedAt: new Date(2025, 3, 15, 14, 30).toISOString(),
    },
    {
      id: 102,
      postId: 1,
      userName: 'trail_master',
      content: '색상이 어떤가요? 저는 블루 컬러를 고민하고 있어요.',
      createdAt: new Date(2025, 3, 15, 16, 45).toISOString(),
      updatedAt: new Date(2025, 3, 15, 16, 45).toISOString(),
    }
  ],
  2: [
    {
      id: 201,
      postId: 2,
      userName: 'camping_expert',
      content: '이 텐트 방수 성능은 어떤가요? 비가 많이 오면 괜찮나요?',
      createdAt: new Date(2025, 3, 10, 12, 15).toISOString(),
      updatedAt: new Date(2025, 3, 10, 12, 15).toISOString(),
    },
    {
      id: 202,
      postId: 2,
      userName: 'mountain_lover',
      content: '네! 갑작스런 소나기에도 내부는 완전히 건조했어요. 방수 처리가 잘 되어 있습니다.',
      createdAt: new Date(2025, 3, 10, 13, 5).toISOString(),
      updatedAt: new Date(2025, 3, 10, 13, 5).toISOString(),
    }
  ]
};

// 사용자별 좋아요 상태 저장 (실제로는 서버에서 관리됨)
let userLikes = {};

// 마지막으로 생성된 ID 추적 (새 아이템 생성 시 사용)
let lastPostId = 4;
let lastCommentId = 202;

// 모의 서비스 함수 시작
export const mockGetPosts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockPosts]);
    }, 500); // 0.5초 지연
  });
};

export const mockGetPost = (postId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const post = mockPosts.find(p => p.id === Number(postId));
      
      if (post) {
        resolve({...post});
      } else {
        reject(new Error('포스트를 찾을 수 없습니다.'));
      }
    }, 300);
  });
};

export const mockCreatePost = (postData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newPost = {
        id: ++lastPostId,
        ...postData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        likeCount: 0,
        commentCount: 0,
      };
      
      mockPosts.unshift(newPost); // 맨 앞에 추가
      resolve({...newPost});
    }, 700);
  });
};

export const mockUpdatePost = (postId, postData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockPosts.findIndex(p => p.id === Number(postId));
      
      if (index !== -1) {
        const updatedPost = {
          ...mockPosts[index],
          ...postData,
          updatedAt: new Date().toISOString()
        };
        
        mockPosts[index] = updatedPost;
        resolve({...updatedPost});
      } else {
        reject(new Error('포스트를 찾을 수 없습니다.'));
      }
    }, 500);
  });
};

export const mockDeletePost = (postId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockPosts.findIndex(p => p.id === Number(postId));
      
      if (index !== -1) {
        mockPosts.splice(index, 1);
        resolve(true);
      } else {
        reject(new Error('포스트를 찾을 수 없습니다.'));
      }
    }, 500);
  });
};

export const mockGetComments = (postId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const comments = mockComments[postId] || [];
      resolve([...comments]);
    }, 400);
  });
};

export const mockCreateComment = (postId, commentData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const post = mockPosts.find(p => p.id === Number(postId));
      
      if (!post) {
        reject(new Error('포스트를 찾을 수 없습니다.'));
        return;
      }
      
      // 새 댓글 생성
      const newComment = {
        id: ++lastCommentId,
        postId: Number(postId),
        ...commentData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // 댓글 저장
      if (!mockComments[postId]) {
        mockComments[postId] = [];
      }
      mockComments[postId].push(newComment);
      
      // 포스트의 댓글 카운트 증가
      post.commentCount++;
      
      resolve({...newComment});
    }, 600);
  });
};

export const mockLikePost = (postId, userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const post = mockPosts.find(p => p.id === Number(postId));
      
      if (!post) {
        reject(new Error('포스트를 찾을 수 없습니다.'));
        return;
      }
      
      const userKey = `${userData.userName}_${postId}`;
      
      // 이미 좋아요를 누른 경우
      if (userLikes[userKey]) {
        reject(new Error('이미 좋아요를 눌렀습니다.'));
        return;
      }
      
      // 좋아요 상태 저장
      userLikes[userKey] = true;
      
      // 포스트의 좋아요 카운트 증가
      post.likeCount++;
      
      resolve(true);
    }, 300);
  });
};

export const mockUnlikePost = (postId, userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const post = mockPosts.find(p => p.id === Number(postId));
      
      if (!post) {
        reject(new Error('포스트를 찾을 수 없습니다.'));
        return;
      }
      
      const userKey = `${userData.userName}_${postId}`;
      
      // 좋아요를 누르지 않은 경우
      if (!userLikes[userKey]) {
        reject(new Error('좋아요를 누르지 않았습니다.'));
        return;
      }
      
      // 좋아요 상태 제거
      delete userLikes[userKey];
      
      // 포스트의 좋아요 카운트 감소
      post.likeCount = Math.max(0, post.likeCount - 1);
      
      resolve(true);
    }, 300);
  });
};