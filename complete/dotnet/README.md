# .NET 앱 완성본

## 시작하기

### Java 백엔드 시작하기

[Java 백엔드 완성본 앱](../complete/java/) 문서를 참조하여 실행시킵니다.

### .NET 프론트엔드 시작하기

1. 리포지토리 루트를 확인합니다.

    ```bash
    # bash/zsh
    REPOSITORY_ROOT=$(git rev-parse --show-toplevel)
    ```

    ```powershell
    # PowerShell
    $REPOSITORY_ROOT = git rev-parse --show-toplevel
    ```

1. 앱을 실행시킵니다.

    ```bash
    dotnet run --project $REPOSITORY_ROOT/complete/dotnet/ContosoSnsWebApp/ContosoSnsWebApp.csproj
    ```

1. 터미널에 보이는 `http://localhost:5090` 링크를 `Ctrl` + 왼쪽 마우스 클릭(윈도우) 또는 `Cmd` + 왼쪽 마우스 클릭(맥 OS)으로 클릭하여 웹 브라우저로 접속합니다.

1. 웹 애플리케이션이 정상적으로 동작하는 것을 확인합니다.
