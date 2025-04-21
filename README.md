# GitHub Copilot Bootcamp 2025

GitHub Copilot의 최신 기능을 이용해서 다양한 언어로 다양한 애플리케이션을 개발해 봅시다. 진정한 vibe coding에 올라타 보세요!

## 워크샵 목표

- GitHub Copilot의 다양한 기능을 활용해서 애플리케이션을 개발할 수 있습니다.
- GitHub Copilot의 Agent 모드를 이용해서 애플리케이션을 개발할 수 있습니다.
- GitHub Copilot에 사용자 지정 지침(Custom Instruction)을 추가하여 좀 더 정확하게 애플리케이션을 개발할 수 있습니다.
- GitHub Copilot에 다양한 MCP 서버를 추가하여 좀 더 정확하게 애플리케이션을 개발할 수 있습니다.

## 워크샵 사전 준비사항

GitHub Codespaces를 활용할 경우, 크로미움 계열의 웹 브라우저만 있으면 됩니다. 다만, 로컬 PC에서 직접 개발할 경우, 아래와 같은 내용을 직접 준비해야 합니다.

### 공통

- [Visual Studio Code](https://code.visualstudio.com/) 설치
- VS Code [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) 익스텐션 설치
- VS Code [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) 익스텐션 설치
- [PowerShell 7](https://learn.microsoft.com/powershell/scripting/install/installing-powershell) 설치 👉 Windows 사용자용
- [git CLI](https://git-scm.com/downloads) 설치
- [GitHub CLI](https://cli.github.com/) 설치
- [Docker Desktop](https://docs.docker.com/get-started/introduction/get-docker-desktop/) 설치

### Python

- [pyenv](https://github.com/pyenv/pyenv) 또는 [pyenv for Windows](https://github.com/pyenv-win/pyenv-win) 설치
- pyenv를 통한 Python 3.12+ 이상 설치
- VS Code [Python](https://marketplace.visualstudio.com/items/?itemName=ms-python.python) 익스텐션 설치
- VS Code [Pylance](https://marketplace.visualstudio.com/items/?itemName=ms-python.vscode-pylance) 익스텐션 설치
- VS Code [Python Debugger](https://marketplace.visualstudio.com/items/?itemName=ms-python.debugpy) 익스텐션 설치
- VS Code [autopep8](https://marketplace.visualstudio.com/items/?itemName=ms-python.autopep8) 익스텐션 설치

### JavaScript

- [nvm](https://github.com/nvm-sh/nvm) 또는 [nvm for Windows](https://github.com/coreybutler/nvm-windows) 설치
- nvm을 통한 [Node.js](https://nodejs.org/) 설치 (LTS 버전 권장)
- [Yarn](https://yarnpkg.com/getting-started/install) 패키지 매니저 설치

    ```bash
    npm install -g yarn
    ```

### Java

- [SDKMAN](https://sdkman.io/) 설치
- SDKMAN을 통한 [OpenJDK 21](https://learn.microsoft.com/java/openjdk/download) 설치
- VS Code [Extension Pack for Java](https://marketplace.visualstudio.com/items/?itemName=vscjava.vscode-java-pack) 익스텐션 설치
- VS Code [Spring Boot Extension Pack](https://marketplace.visualstudio.com/items/?itemName=vmware.vscode-boot-dev-pack) 익스텐션 설치

### .NET

- [.NET SDK 9](https://dotnet.microsoft.com/download/dotnet/9.0) 설치
- [VS Code C# Dev Kit](https://marketplace.visualstudio.com/items/?itemName=ms-dotnettools.csdevkit) 익스텐션 설치

## 시나리오

Contoso 아웃도어 컴파니는 회사의 다양한 아웃도어용 제품 홍보를 위한 마이크로 소셜미디어 사이트를 개발하려고 합니다. 현재 개발 부서에는 Python 개발자가 백엔드 API를, JavaScript 개발자가 프론트엔드 웹 UI를 담당하고 있습니다. 마케팅 팀에서는 기본적인 MVP를 제작해서 웹사이트를 론칭할 계획을 세웠습니다. 하지만, 개발 기간이 촉박해서 빠르게 제작을 해야 하는 상황입니다.

앗, 그런데 말입니다...

## 작업 문서

아래 문서를 통해 자기주도학습의 형태로 직접 애플리케이션을 개발해 보세요!

| 순서                   | 링크                                        |
|------------------------|---------------------------------------------|
| 00: 개발 환경 설정     | [00-setup.md](./docs/00-setup.md)           |
| 01: Python 앱 개발     | [01-python.md](./docs/01-python.md)         |
| 02: JavaScript 앱 개발 | [02-javascript.md](./docs/02-javascript.md) |
| 03: Java 앱 개발       | [03-java.md](./docs/03-java.md)             |
| 04: .NET 앱 개발       | [04-dotnet.md](./docs/04-dotnet.md)         |

## 완성본 예제 보기

모든 샘플 코드의 완성본 예제는 각 언어별 디렉토리에 있습니다. 하지만, 이는 GitHub Copilot으로 개발한 애플리케이션의 예시일 뿐 항상 이와 똑같이 만들어지는 것은 아닙니다.

| 언어       | 디렉토리                    |
|------------|-----------------------------|
| Python     | [python](./python/)         |
| JavaScript | [javascript](./javascript/) |
| Java       | [java](./java/)             |
| .NET       | [dotnet](./dotnet/)         |

## `openapi.yaml` 문서에 대하여...

`openapi.yaml` 파일은 우리가 만들 웹 API의 설계도라고 생각하면 좋습니다. 마치 건물을 짓기 전에 건축 도면이 필요한 것처럼, API를 개발하기 전에 이 파일로 전체 구조를 미리 계획합니다.

이 파일에서는 다음과 같은 내용을 정의합니다:

- 어떤 기능들(포스트 작성, 댓글 달기, 좋아요 등)을 만들지,
- 각 기능을 사용하려면 어떤 주소(URL)로 요청해야 하는지,
- 요청할 때 어떤 정보가 필요한지(예: 포스트 내용, 사용자 이름),
- 요청 후 어떤 응답이 돌아오는지

초보자에게 가장 큰 장점은:

- 개발 전에 API 구조를 명확히 볼 수 있어 전체 그림을 이해하기 쉽습니다.
- 여러 개발자가 같은 규칙으로 작업할 수 있습니다.
- 자동으로 API 문서와 테스트 페이지가 생성됩니다.
- 클라이언트(앱이나 웹) 개발자와 서버 개발자 간의 소통이 쉬워집니다.

마치 레고 조립 설명서처럼, 어떤 부품이 어디에 들어가는지 미리 알려주는 역할을 합니다.

`openapi.yaml`은 SNS 앱을 위한 API 설계도로, 다음 기능들을 정의합니다:

- 포스트 관련 API (5개)
  - 포스트 목록 조회, 작성, 상세 조회, 수정, 삭제
- 댓글 관련 API (5개)
  - 댓글 목록 조회, 작성, 상세 조회, 수정, 삭제
- 좋아요 관련 API (2개)
  - 좋아요 추가, 취소

각 API는 필요한 요청 정보와 응답 형식, 오류 처리 방법을 명확히 정의하고 있어 개발 시 일관성 있는 인터페이스를 구현할 수 있습니다.

## 참고 자료

- [GitHub Copilot 에이전트 모드 및 MCP](https://code.visualstudio.com/blogs/2025/04/07/agentMode)
- [GitHub Copilot 사용자 정의 지침(Custom Instruction)](https://code.visualstudio.com/docs/copilot/copilot-customization)
- [GitHub Copilot AI 모델 바꾸기](https://docs.github.com/ko/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-chat?tool=vscode)
- [GitHub Codespaces](https://docs.github.com/ko/codespaces/about-codespaces/what-are-codespaces)
