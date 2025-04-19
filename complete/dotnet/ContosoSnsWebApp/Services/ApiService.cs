
using System.Net.Http.Json;
using ContosoSnsWebApp.Models;

namespace ContosoSnsWebApp.Services;

public sealed class ApiService(HttpClient httpClient)
{
    // TODO: Make this configurable
    private const string ApiBaseUrl = "http://localhost:8080/api"; // Assuming Java backend runs on 5050 as per later steps

    public async Task<List<Post>?> GetPostsAsync(CancellationToken cancellationToken = default)
    {
        try
        {
            return await httpClient.GetFromJsonAsync<List<Post>>($"{ApiBaseUrl}/posts", cancellationToken);
        }
        catch (HttpRequestException ex)
        {
            Console.Error.WriteLine($"Error fetching posts: {ex.Message}");
            // In a real app, use a proper logging framework
            return null;
        }
    }

    public async Task<Post?> GetPostAsync(int postId, CancellationToken cancellationToken = default)
    {
        try
        {
            return await httpClient.GetFromJsonAsync<Post>($"{ApiBaseUrl}/posts/{postId}", cancellationToken);
        }
        catch (HttpRequestException ex)
        {
            Console.Error.WriteLine($"Error fetching post {postId}: {ex.Message}");
            return null;
        }
    }

    public async Task<Post?> CreatePostAsync(NewPostRequest postData, CancellationToken cancellationToken = default)
    {
        try
        {
            var response = await httpClient.PostAsJsonAsync($"{ApiBaseUrl}/posts", postData, cancellationToken);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadFromJsonAsync<Post>(cancellationToken: cancellationToken);
        }
        catch (HttpRequestException ex)
        {
            Console.Error.WriteLine($"Error creating post: {ex.Message}");
            return null;
        }
    }

    public async Task<bool> DeletePostAsync(int postId, CancellationToken cancellationToken = default)
    {
        try
        {
            var response = await httpClient.DeleteAsync($"{ApiBaseUrl}/posts/{postId}", cancellationToken);
            return response.IsSuccessStatusCode;
        }
        catch (HttpRequestException ex)
        {
            Console.Error.WriteLine($"Error deleting post {postId}: {ex.Message}");
            return false;
        }
    }

    public async Task<List<Comment>?> GetCommentsAsync(int postId, CancellationToken cancellationToken = default)
    {
        try
        {
            return await httpClient.GetFromJsonAsync<List<Comment>>($"{ApiBaseUrl}/posts/{postId}/comments", cancellationToken);
        }
        catch (HttpRequestException ex)
        {
            Console.Error.WriteLine($"Error fetching comments for post {postId}: {ex.Message}");
            return null;
        }
    }

    public async Task<Comment?> CreateCommentAsync(int postId, NewCommentRequest commentData, CancellationToken cancellationToken = default)
    {
        try
        {
            var response = await httpClient.PostAsJsonAsync($"{ApiBaseUrl}/posts/{postId}/comments", commentData, cancellationToken);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadFromJsonAsync<Comment>(cancellationToken: cancellationToken);
        }
        catch (HttpRequestException ex)
        {
            Console.Error.WriteLine($"Error creating comment for post {postId}: {ex.Message}");
            return null;
        }
    }

    public async Task<bool> LikePostAsync(int postId, LikeRequest likeData, CancellationToken cancellationToken = default)
    {
        try
        {
            var response = await httpClient.PostAsJsonAsync($"{ApiBaseUrl}/posts/{postId}/likes", likeData, cancellationToken);
            return response.IsSuccessStatusCode;
        }
        catch (HttpRequestException ex)
        {
            Console.Error.WriteLine($"Error liking post {postId}: {ex.Message}");
            return false;
        }
    }

    public async Task<bool> UnlikePostAsync(int postId, LikeRequest unlikeData, CancellationToken cancellationToken = default)
    {
         try
        {
            // The React code uses DELETE, but the Java backend might expect POST with specific data or a different endpoint.
            // Assuming DELETE for now based on React code. Adjust if backend differs.
            var request = new HttpRequestMessage(HttpMethod.Delete, $"{ApiBaseUrl}/posts/{postId}/likes")
            {
                Content = JsonContent.Create(unlikeData)
            };
            var response = await httpClient.SendAsync(request, cancellationToken);
            return response.IsSuccessStatusCode;
        }
        catch (HttpRequestException ex)
        {
            Console.Error.WriteLine($"Error unliking post {postId}: {ex.Message}");
            return false;
        }
    }
}
