// filepath: /workspaces/github-copilot-bootcamp-2025/dotnet/ContosoSnsWebApp/Models/NewCommentRequest.cs
namespace ContosoSnsWebApp.Models;

// Changed from record to class with mutable properties for Blazor binding
public sealed class NewCommentRequest
{
    public string UserName { get; set; } = "";
    public string Content { get; set; } = "";

    // Add a constructor for easier initialization if needed
    public NewCommentRequest(string userName, string content)
    {
        UserName = userName;
        Content = content;
    }
     // Add a parameterless constructor required by some frameworks/serializers
    public NewCommentRequest() { }
}
