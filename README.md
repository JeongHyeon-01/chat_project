Chat Application
--------
1. 기능 요구사항

- 1:1 대화를 주고 받는 웹 어플리케이션
- 화면은 이미지를 참고
- 대화 상대별로 대화방이 나뉘어 있으며, 각 대화방끼리 이동할 수 있어야 합니다. 
- 메시지를 전송하고 서로 이 내용을 확인할 수 있어야 합니다.
- 대화는 서버에 저장되어 언제든 확인할 수 있어야 합니다.
- Django 또는 Flask로 작성해 주시길 바랍니다.
- Github, Bitbucket 등 접속 가능한 Git Remote Repository로 전달 바랍니다.

2. 요구 사항 분석
   - 유저 : 로그인 로그아웃 | email, name, password
   - 대화방 : 생성, 전송, 읽음 여부, 참여자

RunBook
--------
- backend만 구동의 경우
  - pip install -r requirements.txt >> ./manage.py runserver 
- frontend만 구동의경우
  - npm install >> npm run dev
- 전체 구동
  - docker-compose up --build
