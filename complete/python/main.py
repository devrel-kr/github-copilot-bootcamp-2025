import sqlite3
import datetime
from fastapi import FastAPI, Request, HTTPException, status, APIRouter, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

# Pydantic 모델 정의
class PostBase(BaseModel):
    userName: str
    content: str

class PostCreate(PostBase):
    pass

class PostUpdate(BaseModel):
    content: str

class Post(PostBase):
    id: int
    createdAt: str
    updatedAt: str
    likeCount: int
    commentCount: int

    class Config:
        from_attributes = True

class CommentBase(BaseModel):
    userName: str
    content: str

class CommentCreate(CommentBase):
    pass

class CommentUpdate(BaseModel):
    content: str

class Comment(CommentBase):
    id: int
    postId: int
    createdAt: str
    updatedAt: str

    class Config:
        from_attributes = True

class LikeBase(BaseModel):
    userName: str

class Like(LikeBase):
    postId: int

    class Config:
        from_attributes = True

# FastAPI 애플리케이션 생성
app = FastAPI(
    title="Simple SNS API",
    description="간단한 SQLite + FastAPI 예시 (Pydantic 모델 적용)",
    version="1.0.0"
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API 라우터 설정
api_router = APIRouter(prefix="/api")

@app.on_event("startup")
def startup():
    conn = sqlite3.connect("sns.db")
    c = conn.cursor()

    # 포스트 테이블
    c.execute("""
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userName TEXT NOT NULL,
      content TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      likeCount INTEGER NOT NULL,
      commentCount INTEGER NOT NULL
    )
    """)

    # 댓글 테이블
    c.execute("""
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      postId INTEGER NOT NULL,
      userName TEXT NOT NULL,
      content TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    )
    """)

    # 좋아요 테이블
    c.execute("""
    CREATE TABLE IF NOT EXISTS likes (
      postId INTEGER NOT NULL,
      userName TEXT NOT NULL,
      PRIMARY KEY (postId, userName)
    )
    """)

    conn.commit()
    conn.close()


# ------------------------------------------------
# (1) 모든 포스트 목록 조회 (GET /api/posts)
# ------------------------------------------------
@api_router.get("/posts", response_model=List[Post], operation_id="getPosts")
def get_posts():
    conn = sqlite3.connect("sns.db")
    c = conn.cursor()
    c.execute("SELECT * FROM posts ORDER BY id ASC")
    rows = c.fetchall()
    col = [desc[0] for desc in c.description]
    conn.close()

    # 튜플을 딕셔너리로 변환해서 반환
    return [dict(zip(col, row)) for row in rows]


# ------------------------------------------------
# (2) 새 포스트 작성 (POST /api/posts)
# ------------------------------------------------
@api_router.post("/posts", status_code=status.HTTP_201_CREATED, response_model=Post, operation_id="createPost")
def create_post(post: PostCreate):
    if not post.userName or not post.content:
        raise HTTPException(status_code=400, detail="userName, content가 필요합니다.")

    now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    conn = sqlite3.connect("sns.db")
    c = conn.cursor()
    c.execute("""
        INSERT INTO posts (userName, content, createdAt, updatedAt, likeCount, commentCount)
        VALUES (?, ?, ?, ?, 0, 0)
    """, (post.userName, post.content, now, now))
    post_id = c.lastrowid
    conn.commit()

    # 삽입 후 해당 포스트 정보를 다시 SELECT
    c.execute("SELECT * FROM posts WHERE id = ?", (post_id,))
    row = c.fetchone()
    col = [desc[0] for desc in c.description]
    conn.close()

    return dict(zip(col, row))


# ------------------------------------------------
# (3) 특정 포스트 조회 (GET /api/posts/{postId})
# ------------------------------------------------
@api_router.get("/posts/{postId}", response_model=Post, operation_id="getPost")
def get_post(postId: int):
    conn = sqlite3.connect("sns.db")
    c = conn.cursor()
    c.execute("SELECT * FROM posts WHERE id = ?", (postId,))
    row = c.fetchone()
    col = [desc[0] for desc in c.description] if c.description else []
    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="포스트를 찾을 수 없습니다.")
    return dict(zip(col, row))


# ------------------------------------------------
# (4) 특정 포스트 수정 (PATCH /api/posts/{postId})
# ------------------------------------------------
@api_router.patch("/posts/{postId}", response_model=Post, operation_id="updatePost")
def update_post(postId: int, post_update: PostUpdate):
    if not post_update.content:
        raise HTTPException(status_code=400, detail="수정할 content가 없습니다.")

    # 기존 포스트 확인
    conn = sqlite3.connect("sns.db")
    c = conn.cursor()
    c.execute("SELECT * FROM posts WHERE id = ?", (postId,))
    old = c.fetchone()
    if not old:
        conn.close()
        raise HTTPException(status_code=404, detail="포스트를 찾을 수 없습니다.")

    now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    c.execute("""
        UPDATE posts
        SET content = ?, updatedAt = ?
        WHERE id = ?
    """, (post_update.content, now, postId))
    conn.commit()

    # 수정된 내용 다시 SELECT
    c.execute("SELECT * FROM posts WHERE id = ?", (postId,))
    row = c.fetchone()
    col = [desc[0] for desc in c.description]
    conn.close()

    return dict(zip(col, row))


# ------------------------------------------------
# (5) 특정 포스트 삭제 (DELETE /api/posts/{postId})
# ------------------------------------------------
@api_router.delete("/posts/{postId}", status_code=status.HTTP_204_NO_CONTENT, operation_id="deletePost")
def delete_post(postId: int):
    conn = sqlite3.connect("sns.db")
    c = conn.cursor()
    c.execute("SELECT id FROM posts WHERE id = ?", (postId,))
    post = c.fetchone()
    if not post:
        conn.close()
        raise HTTPException(status_code=404, detail="포스트를 찾을 수 없습니다.")

    # 해당 포스트 연관된 댓글, 좋아요, 그리고 포스트 자체 삭제
    c.execute("DELETE FROM comments WHERE postId = ?", (postId,))
    c.execute("DELETE FROM likes WHERE postId = ?", (postId,))
    c.execute("DELETE FROM posts WHERE id = ?", (postId,))
    conn.commit()
    conn.close()
    return


# ------------------------------------------------
# (6) 특정 포스트의 댓글 목록 조회 (GET /api/posts/{postId}/comments)
# ------------------------------------------------
@api_router.get("/posts/{postId}/comments", response_model=List[Comment], operation_id="getComments")
def get_comments(postId: int):
    conn = sqlite3.connect("sns.db")
    c = conn.cursor()

    # 포스트 존재 확인
    c.execute("SELECT id FROM posts WHERE id = ?", (postId,))
    if not c.fetchone():
        conn.close()
        raise HTTPException(status_code=404, detail="포스트를 찾을 수 없습니다.")

    c.execute("SELECT * FROM comments WHERE postId = ? ORDER BY id ASC", (postId,))
    rows = c.fetchall()
    col = [desc[0] for desc in c.description]
    conn.close()

    return [dict(zip(col, row)) for row in rows]


# ------------------------------------------------
# (7) 특정 포스트에 댓글 작성 (POST /api/posts/{postId}/comments)
# ------------------------------------------------
@api_router.post("/posts/{postId}/comments", status_code=status.HTTP_201_CREATED, response_model=Comment, operation_id="createComment")
def create_comment(postId: int, comment: CommentCreate):
    if not comment.userName or not comment.content:
        raise HTTPException(status_code=400, detail="userName, content가 필요합니다.")

    conn = sqlite3.connect("sns.db")
    c = conn.cursor()

    # 포스트 존재 확인
    c.execute("SELECT id FROM posts WHERE id = ?", (postId,))
    if not c.fetchone():
        conn.close()
        raise HTTPException(status_code=404, detail="포스트를 찾을 수 없습니다.")

    now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    c.execute("""
        INSERT INTO comments (postId, userName, content, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?)
    """, (postId, comment.userName, comment.content, now, now))

    # 댓글 카운트 갱신
    c.execute("""
        UPDATE posts
        SET commentCount = commentCount + 1,
            updatedAt = ?
        WHERE id = ?
    """, (now, postId))
    conn.commit()

    comment_id = c.lastrowid
    c.execute("SELECT * FROM comments WHERE id = ?", (comment_id,))
    row = c.fetchone()
    col = [desc[0] for desc in c.description]
    conn.close()

    return dict(zip(col, row))


# ------------------------------------------------
# (8) 특정 댓글 조회 (GET /api/posts/{postId}/comments/{commentId})
# ------------------------------------------------
@api_router.get("/posts/{postId}/comments/{commentId}", response_model=Comment, operation_id="getComment")
def get_comment(postId: int, commentId: int):
    conn = sqlite3.connect("sns.db")
    c = conn.cursor()

    # 포스트 존재
    c.execute("SELECT id FROM posts WHERE id = ?", (postId,))
    if not c.fetchone():
        conn.close()
        raise HTTPException(status_code=404, detail="포스트를 찾을 수 없습니다.")

    # 해당 댓글
    c.execute("SELECT * FROM comments WHERE id = ?", (commentId,))
    row = c.fetchone()
    col = [desc[0] for desc in c.description] if c.description else []
    if not row or row[1] != postId:
        conn.close()
        raise HTTPException(status_code=404, detail="댓글을 찾을 수 없습니다.")
    conn.close()

    return dict(zip(col, row))


# ------------------------------------------------
# (9) 특정 댓글 수정 (PATCH /api/posts/{postId}/comments/{commentId})
# ------------------------------------------------
@api_router.patch("/posts/{postId}/comments/{commentId}", response_model=Comment, operation_id="updateComment")
def update_comment(postId: int, commentId: int, comment_update: CommentUpdate):
    if not comment_update.content:
        raise HTTPException(status_code=400, detail="수정할 content가 필요합니다.")

    conn = sqlite3.connect("sns.db")
    c = conn.cursor()

    # 포스트 확인
    c.execute("SELECT id FROM posts WHERE id = ?", (postId,))
    if not c.fetchone():
        conn.close()
        raise HTTPException(status_code=404, detail="포스트를 찾을 수 없습니다.")

    # 댓글 확인
    c.execute("SELECT * FROM comments WHERE id = ?", (commentId,))
    row = c.fetchone()
    if not row or row[1] != postId:
        conn.close()
        raise HTTPException(status_code=404, detail="댓글을 찾을 수 없습니다.")

    now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    c.execute("""
        UPDATE comments
        SET content = ?, updatedAt = ?
        WHERE id = ?
    """, (comment_update.content, now, commentId))
    conn.commit()

    c.execute("SELECT * FROM comments WHERE id = ?", (commentId,))
    updated = c.fetchone()
    col = [desc[0] for desc in c.description]
    conn.close()

    return dict(zip(col, updated))


# ------------------------------------------------
# (10) 특정 댓글 삭제 (DELETE /api/posts/{postId}/comments/{commentId})
# ------------------------------------------------
@api_router.delete("/posts/{postId}/comments/{commentId}", status_code=status.HTTP_204_NO_CONTENT, operation_id="deleteComment")
def delete_comment(postId: int, commentId: int):
    conn = sqlite3.connect("sns.db")
    c = conn.cursor()

    # 포스트 확인
    c.execute("SELECT id FROM posts WHERE id = ?", (postId,))
    if not c.fetchone():
        conn.close()
        raise HTTPException(status_code=404, detail="포스트를 찾을 수 없습니다.")

    # 댓글 확인
    c.execute("SELECT * FROM comments WHERE id = ?", (commentId,))
    row = c.fetchone()
    if not row or row[1] != postId:
        conn.close()
        raise HTTPException(status_code=404, detail="댓글을 찾을 수 없습니다.")

    # 댓글 삭제
    c.execute("DELETE FROM comments WHERE id = ?", (commentId,))

    # commentCount 재계산
    now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    c.execute("""
        UPDATE posts
        SET commentCount = (SELECT COUNT(*) FROM comments WHERE postId = ?),
            updatedAt = ?
        WHERE id = ?
    """, (postId, now, postId))

    conn.commit()
    conn.close()
    return


# ------------------------------------------------
# (11) 특정 포스트에 좋아요 (POST /api/posts/{postId}/likes)
# ------------------------------------------------
@api_router.post("/posts/{postId}/likes", status_code=status.HTTP_201_CREATED, operation_id="likePost")
def like_post(postId: int, like: LikeBase):
    if not like.userName:
        raise HTTPException(status_code=400, detail="userName이 필요합니다.")

    conn = sqlite3.connect("sns.db")
    c = conn.cursor()

    # 포스트 확인
    c.execute("SELECT * FROM posts WHERE id = ?", (postId,))
    post = c.fetchone()
    if not post:
        conn.close()
        raise HTTPException(status_code=404, detail="포스트를 찾을 수 없습니다.")

    # 이미 좋아요 눌렀는지 확인
    c.execute("SELECT * FROM likes WHERE postId = ? AND userName = ?", (postId, like.userName))
    if c.fetchone():
        conn.close()
        raise HTTPException(status_code=400, detail="이미 좋아요를 눌렀습니다.")

    # 좋아요 추가
    c.execute("INSERT INTO likes (postId, userName) VALUES (?, ?)", (postId, like.userName))

    # likeCount +1
    now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    c.execute("""
        UPDATE posts
        SET likeCount = likeCount + 1,
            updatedAt = ?
        WHERE id = ?
    """, (now, postId))

    conn.commit()
    conn.close()

    return {"message": "좋아요 성공"}


# ------------------------------------------------
# (12) 특정 포스트의 좋아요 취소 (DELETE /api/posts/{postId}/likes)
# ------------------------------------------------
@api_router.delete("/posts/{postId}/likes", status_code=status.HTTP_204_NO_CONTENT, operation_id="unlikePost")
def unlike_post(postId: int, like: LikeBase):
    if not like.userName:
        raise HTTPException(status_code=400, detail="userName이 필요합니다.")

    conn = sqlite3.connect("sns.db")
    c = conn.cursor()

    # 포스트 확인
    c.execute("SELECT * FROM posts WHERE id = ?", (postId,))
    post = c.fetchone()
    if not post:
        conn.close()
        raise HTTPException(status_code=404, detail="포스트를 찾을 수 없습니다.")

    # 좋아요 존재 여부 확인
    c.execute("SELECT * FROM likes WHERE postId = ? AND userName = ?", (postId, like.userName))
    if not c.fetchone():
        conn.close()
        raise HTTPException(status_code=404, detail="좋아요 정보가 없습니다.")

    # 좋아요 삭제
    c.execute("DELETE FROM likes WHERE postId = ? AND userName = ?", (postId, like.userName))

    # likeCount -1
    now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    c.execute("""
        UPDATE posts
        SET likeCount = likeCount - 1,
            updatedAt = ?
        WHERE id = ?
    """, (now, postId))

    conn.commit()
    conn.close()
    return

# API 라우터 등록
app.include_router(api_router)
