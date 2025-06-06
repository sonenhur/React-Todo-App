# ✅ React Todo App

간단하면서도 직관적인 할 일 목록(Todo List) 애플리케이션입니다.  
React를 활용하여 상태 관리, 이벤트 처리, 로컬 스토리지 연동 등을 지원합니다.  

---

## 📦 주요 기능

- ✅ 새로운 할 일 추가
- ✅ 할 일 완료 체크/해제
- ✅ 할 일 내용 수정 및 삭제
- ✅ 입력창 Enter 키로 빠르게 추가
- ✅ 검색어 입력으로 할 일 필터링
- ✅ 로컬 스토리지(localStorage) 자동 저장

---

## 🛠️ 사용 기술

- React
- Hooks (`useState`, `useEffect`, `useRef`)
- CSS Modules
- LocalStorage API

---

## 📁 프로젝트 구조

📦src  
┣ 📂component  
┃ ┣ 📄Header.jsx  
┃ ┣ 📄TodoEditor.jsx  
┃ ┣ 📄TodoItem.jsx  
┃ ┗ 📄TodoList.jsx  
┣ 📄App.jsx  
┣ 📄App.css  
┗ 📄index.js  

---

## 🚀 실행 방법

1. 이 저장소를 클론합니다:

   ```bash
   git clone https://github.com/sonenhur/React-Todo-App.git
   cd react-todo-app

2. 패키지를 설치합니다:
    ```bash
    npm install

3. 개발 서버를 실행합니다:
   ```bash
    npm run dev

4. 브라우저에서 http://localhost:5173 으로 접속하면 앱이 실행됩니다.

---

📌 로컬 스토리지 연동 설명  
	•	App.jsx에서 useEffect를 사용해 todo 상태가 바뀔 때마다 localStorage에 자동으로 저장합니다.  
	•	새로고침해도 데이터가 유지됩니다.  

---

✨ 향후 개선 아이디어  
	•	다크 모드  
	•	할 일 중요도(우선순위) 기능  
	•	날짜별 필터링  
	•	Firebase와 연동한 클라우드 저장  
