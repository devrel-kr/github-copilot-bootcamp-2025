# Python 앱 완성본

## 시작하기

### 환경설정 방법

1. 터미널을 실행합니다.
2. 아래 명령어를 순서대로 실행합니다.

```
git clone https://github.com/devrel-kr/github-copilot-bootcamp-2025.git
cd github-copilot-bootcamp-2025
cd python
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 실행 방법

1. 터미널에서 아래 명령어를 수행합니다.

```
uvicorn main:app --reload
```

2. 아래와 같은 로그가 출력이 되면 정상적으로 실행이 된 것입니다.

```
INFO:     Will watch for changes in these directories: ['/???/github-copilot-bootcamp-2025/python']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [85427] using StatReload
INFO:     Started server process [85430]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

## 사용해보기

http://127.0.0.1:8000 에 접속하면 간단한 SNS 서비스를 사용해볼 수 있습니다. 간단한 프론트엔드가 함께 포함되어 있습니다. 배포된 데모 서비스는 아래와 같습니다. 

[데모 웹서비스](https://simplesns-axeyhcbsfnfscfe9.koreasouth-01.azurewebsites.net/)

http://127.0.0.1:8000/docs 에 접속하면, Swagger UI 기반의 API 문서를 확인할 수 있습니다. 이 페이지에서는 모든 API 엔드포인트를 확인하고 직접 테스트해볼 수 있습니다.

[데모 Swagger UI 서비스](https://simplesns-axeyhcbsfnfscfe9.koreasouth-01.azurewebsites.net/docs)



