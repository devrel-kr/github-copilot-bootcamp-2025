
// filepath: /workspaces/github-copilot-bootcamp-2025/dotnet/ContosoSnsWebApp/Models/Post.cs
using System.Text.Json.Serialization;

namespace ContosoSnsWebApp.Models;

public sealed record Post(
    [property: JsonPropertyName("id")] int Id,
    [property: JsonPropertyName("userName")] string UserName,
    [property: JsonPropertyName("content")] string Content,
    [property: JsonPropertyName("imageUrl")] string? ImageUrl,
    [property: JsonPropertyName("createdAt")] DateTime CreatedAt,
    [property: JsonPropertyName("likeCount")] int LikeCount,
    [property: JsonPropertyName("commentCount")] int CommentCount
);
