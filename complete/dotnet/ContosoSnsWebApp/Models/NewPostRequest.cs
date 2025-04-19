// filepath: /workspaces/github-copilot-bootcamp-2025/dotnet/ContosoSnsWebApp/Models/NewPostRequest.cs
namespace ContosoSnsWebApp.Models;

// Changed from record to class with mutable properties for Blazor binding
public sealed class NewPostRequest
{
    public string UserName { get; set; } = "";
    public string Content { get; set; } = "";
    public string? ImageUrl { get; set; }

    // Add a constructor for easier initialization if needed
    public NewPostRequest(string userName, string content, string? imageUrl = null)
    {
        UserName = userName;
        Content = content;
        ImageUrl = imageUrl;
    }

    // Add a parameterless constructor required by some frameworks/serializers
    public NewPostRequest() { }
}
