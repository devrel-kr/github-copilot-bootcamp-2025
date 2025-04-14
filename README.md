# GitHub Copilot Bootcamp 2025

GitHub Copilot의 최신 기능을 이용해서 다양한 언어로 다양한 애플리케이션을 개발해 봅시다. 진정한 vibe coding에 올라타 보세요!

## 워크샵 목표

- GitHub Copilot의 다양한 기능을 활용해서 애플리케이션을 개발할 수 있습니다.
- GitHub Copilot의 Agent 모드를 이용해서 애플리케이션을 개발할 수 있습니다.
- GitHub Copilot에 사용자 지정 지침(Custom Instruction)을 추가하여 좀 더 정확하게 애플리케이션을 개발할 수 있습니다.
- GitHub Copilot에 다양한 MCP 서버를 추가하여 좀 더 정확하게 애플리케이션을 개발할 수 있습니다.

## 워크샵 사전 준비사항

GitHub Codespaces를 활용할 경우, 크로미움 계열의 웹 브라우저만 있으면 됩니다. 다만, 로컬 PC에서 직접 개발할 경우, 아래와 같은 내용을 준비해야 합니다.

### 공통

- [Visual Studio Code](https://code.visualstudio.com/) 설치
- [PowerShell 7](https://learn.microsoft.com/powershell/scripting/install/installing-powershell) 설치 👉 Windows 사용자용
- [git CLI](https://git-scm.com/downloads) 설치
- [GitHub CLI](https://cli.github.com/) 설치
- [Docker Desktop](https://docs.docker.com/get-started/introduction/get-docker-desktop/) 설치

### Python

- [pyenv](https://github.com/pyenv/pyenv) 또는 [pyenv for Windows](https://github.com/pyenv-win/pyenv-win) 설치
- VS Code [Python](https://marketplace.visualstudio.com/items/?itemName=ms-python.python) 익스텐션 설치치
- VS Code [Pylance](https://marketplace.visualstudio.com/items/?itemName=ms-python.vscode-pylance) 익스텐션 설치
- VS Code [Python Debugger](https://marketplace.visualstudio.com/items/?itemName=ms-python.debugpy) 익스텐션 설치
- VS Code [autopep8](https://marketplace.visualstudio.com/items/?itemName=ms-python.autopep8) 익스텐션 설치

### JavaScript

TBD

### Java

- [OpenJDK 21](https://learn.microsoft.com/java/openjdk/download) 설치
- VS Code [Extension Pack for Java](https://marketplace.visualstudio.com/items/?itemName=vscjava.vscode-java-pack) 익스텐션 설치
- VS Code [Spring Boot Extension Pack](https://marketplace.visualstudio.com/items/?itemName=vmware.vscode-boot-dev-pack) 익스텐션 설치

### .NET

- [.NET SDK 9](https://dotnet.microsoft.com/download/dotnet/9.0) 설치
- [VS Code C# Dev Kit](https://marketplace.visualstudio.com/items/?itemName=ms-dotnettools.csdevkit) 익스텐션 설치

## 시작하기

## 시나리오

Contoso 아웃도어 컴파니는 회사의 다양한 아웃도어용 제품 홍보를 위한 마이크로 소셜미디어 사이트를 개발하려고 합니다. 현재 개발 부서에는 Python 개발자가 백엔드 API를, JavaScript 개발자가 프론트엔드 웹 UI를 담당하고 있습니다. 마케팅 팀에서는 기본적인 MVP를 제작해서 웹사이트를 론칭할 계획을 세웠습니다. 하지만, 개발 기간이 촉박해서 빠르게 제작을 해야 하는 상황입니다.

## 작업 문서

아래 문서를 통해 자기주도학습의 형태로 직접 애플리케이션을 개발해 보세요!

| 순서                   | 링크                                        |
|------------------------|---------------------------------------------|
| 00: 개발 환경 설정     | [00-setup.md](./docs/00-setup.md)           |
| 01: Python 앱 개발     | [01-python.md](./docs/01-python.md)         |
| 02: JavaScript 앱 개발 | [02-javascript.md](./docs/02-javascript.md) |
| 03: Java 앱 개발       | [03-java.md](./docs/03-java.md)             |
| 04: .NET 앱 개발       | [04-dotnet.md](./docs/04-dotnet.md)         |

### 완성본 예제 보기

모든 샘플 코드의 완성본 예제는 각 언어별 디렉토리에 있습니다. 하지만, 이는 GitHub Copilot으로 개발한 애플리케이션의 예시일 뿐 항상 이와 똑같이 만들어지는 것은 아닙니다.

| 언어       | 디렉토리                    |
|------------|-----------------------------|
| Python     | [python](./python/)         |
| JavaScript | [javascript](./javascript/) |
| Java       | [java](./java/)             |
| .NET       | [dotnet](./dotnet/)         |

