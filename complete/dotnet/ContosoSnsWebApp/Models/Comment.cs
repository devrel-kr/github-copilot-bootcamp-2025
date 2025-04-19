
// filepath: /workspaces/github-copilot-bootcamp-2025/dotnet/ContosoSnsWebApp/Models/Comment.cs
using System.Text.Json.Serialization;

namespace ContosoSnsWebApp.Models;

public sealed record Comment(
    [property: JsonPropertyName("id")] int Id,
    [property: JsonPropertyName("postId")] int PostId,
    [property: JsonPropertyName("userName")] string UserName,
    [property: JsonPropertyName("content")] string Content,
    [property: JsonPropertyName("createdAt")] DateTime CreatedAt
);
