package com.example.simplesnsapi.model;

import java.time.OffsetDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    private Integer id;
    private Integer postId;
    private String userName;
    private String content;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
}
