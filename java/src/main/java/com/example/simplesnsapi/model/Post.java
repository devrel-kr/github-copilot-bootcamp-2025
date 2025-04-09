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
public class Post {
    private Integer id;
    private String userName;
    private String content;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
    private Integer likeCount;
    private Integer commentCount;
}
