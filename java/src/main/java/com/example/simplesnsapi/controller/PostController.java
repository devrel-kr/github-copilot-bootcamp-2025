package com.example.simplesnsapi.controller;

import com.example.simplesnsapi.dto.CreatePostRequest;
import com.example.simplesnsapi.dto.LikeRequest;
import com.example.simplesnsapi.dto.UpdatePostRequest;
import com.example.simplesnsapi.model.Post;
import com.example.simplesnsapi.repository.PostRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostRepository postRepository;

    public PostController(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @GetMapping
    public ResponseEntity<List<Post>> getPosts() {
        return ResponseEntity.ok(postRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Post> createPost(@Valid @RequestBody CreatePostRequest request) {
        Post newPost = Post.builder()
                .userName(request.getUserName())
                .content(request.getContent())
                .build();
        
        Post savedPost = postRepository.save(newPost);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPost);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<Post> getPost(@PathVariable Integer postId) {
        Post post = postRepository.findById(postId);
        if (post == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(post);
    }

    @PatchMapping("/{postId}")
    public ResponseEntity<Post> updatePost(
            @PathVariable Integer postId,
            @RequestBody UpdatePostRequest request) {
        
        Post existingPost = postRepository.findById(postId);
        if (existingPost == null) {
            return ResponseEntity.notFound().build();
        }

        if (request.getContent() != null) {
            existingPost.setContent(request.getContent());
        }

        Post updatedPost = postRepository.save(existingPost);
        return ResponseEntity.ok(updatedPost);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> deletePost(@PathVariable Integer postId) {
        if (!postRepository.delete(postId)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{postId}/likes")
    public ResponseEntity<Void> likePost(
            @PathVariable Integer postId,
            @Valid @RequestBody LikeRequest request) {
        
        if (!postRepository.addLike(postId, request.getUserName())) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{postId}/likes")
    public ResponseEntity<Void> unlikePost(
            @PathVariable Integer postId,
            @Valid @RequestBody LikeRequest request) {
        
        if (!postRepository.removeLike(postId, request.getUserName())) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
