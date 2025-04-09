package com.example.simplesnsapi.controller;

import com.example.simplesnsapi.dto.CreateCommentRequest;
import com.example.simplesnsapi.dto.UpdateCommentRequest;
import com.example.simplesnsapi.model.Comment;
import com.example.simplesnsapi.model.Post;
import com.example.simplesnsapi.repository.CommentRepository;
import com.example.simplesnsapi.repository.PostRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/posts/{postId}/comments")
public class CommentController {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    public CommentController(CommentRepository commentRepository, PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }

    @GetMapping
    public ResponseEntity<List<Comment>> getComments(@PathVariable Integer postId) {
        Post post = postRepository.findById(postId);
        if (post == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(commentRepository.findByPostId(postId));
    }

    @PostMapping
    public ResponseEntity<Comment> createComment(
            @PathVariable Integer postId,
            @Valid @RequestBody CreateCommentRequest request) {
        
        Post post = postRepository.findById(postId);
        if (post == null) {
            return ResponseEntity.notFound().build();
        }

        Comment newComment = Comment.builder()
                .postId(postId)
                .userName(request.getUserName())
                .content(request.getContent())
                .build();
        
        Comment savedComment = commentRepository.save(newComment);
        postRepository.incrementCommentCount(postId);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(savedComment);
    }

    @GetMapping("/{commentId}")
    public ResponseEntity<Comment> getComment(
            @PathVariable Integer postId,
            @PathVariable Integer commentId) {
        
        Post post = postRepository.findById(postId);
        if (post == null) {
            return ResponseEntity.notFound().build();
        }

        Comment comment = commentRepository.findById(commentId);
        if (comment == null || !comment.getPostId().equals(postId)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(comment);
    }

    @PatchMapping("/{commentId}")
    public ResponseEntity<Comment> updateComment(
            @PathVariable Integer postId,
            @PathVariable Integer commentId,
            @RequestBody UpdateCommentRequest request) {
        
        Post post = postRepository.findById(postId);
        if (post == null) {
            return ResponseEntity.notFound().build();
        }

        Comment existingComment = commentRepository.findById(commentId);
        if (existingComment == null || !existingComment.getPostId().equals(postId)) {
            return ResponseEntity.notFound().build();
        }

        if (request.getContent() != null) {
            existingComment.setContent(request.getContent());
        }

        Comment updatedComment = commentRepository.save(existingComment);
        return ResponseEntity.ok(updatedComment);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable Integer postId,
            @PathVariable Integer commentId) {
        
        Post post = postRepository.findById(postId);
        if (post == null) {
            return ResponseEntity.notFound().build();
        }

        Comment comment = commentRepository.findById(commentId);
        if (comment == null || !comment.getPostId().equals(postId)) {
            return ResponseEntity.notFound().build();
        }

        if (commentRepository.delete(commentId)) {
            postRepository.decrementCommentCount(postId);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
