# 04: .NET 앱 개발

Use Claude 3.7 Sonnet

```markdown
I have a react app under the javascript directory. I want to containerise it using Dockerfile. Create a Dockerfile for me. The generated Dockerfile should be located in the javascript directory
```

```markdown
Build the dockerfile and run the container for me
```

```markdown
stop the container and remove it
```

```markdown
This time, do the same thing under the java directory for me, but only create a dockerfile, create the container image and run it
```

```markdown
stop the container and remove it
```

```markdown
Let's create a .NET Aspire project that does all the container orchestration. I have two Dockerfiles one in the javascript directory and the other in the java directory. With these two Dockerfles, the .NET Aspire will orchestrate both applications as containers. The javascript one looks after the frontend, and the java one takes care of the backend. Make sure that you have relevant .NET Aspire NuGet packages for both node.js and Java, and orchestrate both.
```

```markdown
Let's create a .NET Aspire project. First of all get all the list of aspire project and tell me which one to choose. Then, based on the choice, create the .NET Aspire project under the dotnet directory
```

```markdown
Yes, let's use the empty starter
```

```markdown
let's slightly change the name to simply "SimpleSns"
```

```markdown
OK. Let's add backend api to .NET Aspire. I've got a dockerfile under the java directory as a backend api.
```

```markdown
OK. Let's add backend api to .NET Aspire. I've got a spring boot app the java directory as a backend api. Add relevant NuGet package for the orchestration
```

```markdown
download java open-telemetry agent to the java/agents directory
```

```markdown
There's a React app under the javascript directory. Now, let's migrate it to Blazor app and store it to the dotnet directory. First of all, get all the list of Blazor project and tell me which one to choose. Then, based on the choice create the Blazor project under the dotnet directory.
```

```markdown
Let's use Blazor Web App
```

```markdown
Now, we need to migrate the existing React app from the javascript directory to this Blazor app
```

```markdown
Let's create a docker compose file to orchestrate both java app and dotnet app and store it under the project root. There are dockerfile under each directory
```