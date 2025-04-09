package com.example.simplesnsapi.repository;

import com.example.simplesnsapi.model.Post;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

@Repository
public class PostRepository {

    private final Map<Integer, Post> posts = new HashMap<>();
    private final AtomicInteger idGenerator = new AtomicInteger(1);
    private final Map<Integer, Map<String, Boolean>> likes = new HashMap<>();

    public List<Post> findAll() {
        return new ArrayList<>(posts.values());
    }

    public Post findById(Integer id) {
        return posts.get(id);
    }

    public Post save(Post post) {
        if (post.getId() == null) {
            // Creating a new post
            post.setId(idGenerator.getAndIncrement());
            post.setCreatedAt(OffsetDateTime.now());
            post.setLikeCount(0);
            post.setCommentCount(0);
        }
        post.setUpdatedAt(OffsetDateTime.now());
        posts.put(post.getId(), post);
        return post;
    }

    public boolean delete(Integer id) {
        return posts.remove(id) != null;
    }

    public boolean addLike(Integer postId, String userName) {
        Post post = posts.get(postId);
        if (post == null) {
            return false;
        }

        Map<String, Boolean> postLikes = likes.computeIfAbsent(postId, k -> new HashMap<>());
        if (!postLikes.containsKey(userName)) {
            postLikes.put(userName, true);
            post.setLikeCount(post.getLikeCount() + 1);
            posts.put(postId, post);
            return true;
        }
        return false;
    }

    public boolean removeLike(Integer postId, String userName) {
        Post post = posts.get(postId);
        Map<String, Boolean> postLikes = likes.get(postId);
        
        if (post == null || postLikes == null || !postLikes.containsKey(userName)) {
            return false;
        }
        
        postLikes.remove(userName);
        post.setLikeCount(post.getLikeCount() - 1);
        posts.put(postId, post);
        return true;
    }

    public void incrementCommentCount(Integer postId) {
        Post post = posts.get(postId);
        if (post != null) {
            post.setCommentCount(post.getCommentCount() + 1);
            posts.put(postId, post);
        }
    }

    public void decrementCommentCount(Integer postId) {
        Post post = posts.get(postId);
        if (post != null && post.getCommentCount() > 0) {
            post.setCommentCount(post.getCommentCount() - 1);
            posts.put(postId, post);
        }
    }
}
