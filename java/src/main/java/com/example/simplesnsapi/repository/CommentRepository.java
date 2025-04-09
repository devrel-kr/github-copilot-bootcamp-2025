package com.example.simplesnsapi.repository;

import com.example.simplesnsapi.model.Comment;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Repository
public class CommentRepository {

    private final Map<Integer, Comment> comments = new HashMap<>();
    private final AtomicInteger idGenerator = new AtomicInteger(100);

    public List<Comment> findByPostId(Integer postId) {
        return comments.values().stream()
                .filter(comment -> comment.getPostId().equals(postId))
                .collect(Collectors.toList());
    }

    public Comment findById(Integer id) {
        return comments.get(id);
    }

    public Comment save(Comment comment) {
        if (comment.getId() == null) {
            // Creating a new comment
            comment.setId(idGenerator.getAndIncrement());
            comment.setCreatedAt(OffsetDateTime.now());
        }
        comment.setUpdatedAt(OffsetDateTime.now());
        comments.put(comment.getId(), comment);
        return comment;
    }

    public boolean delete(Integer id) {
        return comments.remove(id) != null;
    }
}
