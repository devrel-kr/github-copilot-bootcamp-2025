using System.Net.Http.Json;
using ContosoSnsWebApp.Models;
using Microsoft.Extensions.Configuration;

namespace ContosoSnsWebApp.Services;

public sealed class ApiService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiBaseUrl;

    public ApiService(HttpClient httpClient, IConfiguration configuration)
    {
        ArgumentNullException.ThrowIfNull(httpClient);
        ArgumentNullException.ThrowIfNull(configuration);
        
        _httpClient = httpClient;
        // Use the environment variable with fallback to a local default
        _apiBaseUrl = configuration["ApiBaseUrl"]?.TrimEnd('/') + "/api" ?? "http://localhost:8080/api";
    }

    public async Task<List<Post>?> GetPostsAsync(CancellationToken cancellationToken = default)
    {
        try
        {
            return await _httpClient.GetFromJsonAsync<List<Post>>($"{_apiBaseUrl}/posts", cancellationToken);
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
            return await _httpClient.GetFromJsonAsync<Post>($"{_apiBaseUrl}/posts/{postId}", cancellationToken);
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
            var response = await _httpClient.PostAsJsonAsync($"{_apiBaseUrl}/posts", postData, cancellationToken);
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
            var response = await _httpClient.DeleteAsync($"{_apiBaseUrl}/posts/{postId}", cancellationToken);
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
            return await _httpClient.GetFromJsonAsync<List<Comment>>($"{_apiBaseUrl}/posts/{postId}/comments", cancellationToken);
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
            var response = await _httpClient.PostAsJsonAsync($"{_apiBaseUrl}/posts/{postId}/comments", commentData, cancellationToken);
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
            var response = await _httpClient.PostAsJsonAsync($"{_apiBaseUrl}/posts/{postId}/likes", likeData, cancellationToken);
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
            var request = new HttpRequestMessage(HttpMethod.Delete, $"{_apiBaseUrl}/posts/{postId}/likes")
            {
                Content = JsonContent.Create(unlikeData)
            };
            var response = await _httpClient.SendAsync(request, cancellationToken);
            return response.IsSuccessStatusCode;
        }
        catch (HttpRequestException ex)
        {
            Console.Error.WriteLine($"Error unliking post {postId}: {ex.Message}");
            return false;
        }
    }
}
