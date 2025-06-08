import { useEffect, useRef, useState } from "react";
import "./App.css";
import Header from "./component/Header";
import TodoEditor from "./component/TodoEditor";
import TodoList from "./component/TodoList";

function App() {
  // [1] 처음에 불러올 할 일 목록 (localStorage에서 불러오기)
  const loadTodoFromStorage = () => {
    const savedTodo = localStorage.getItem("todo"); // 저장된 값 꺼내기

    if (savedTodo) {
      try {
        // 저장된 문자열을 객체로 바꾸기 (JSON 파싱)
        return JSON.parse(savedTodo);
      } catch (error) {
        console.error("저장된 데이터를 읽을 수 없습니다:", error);
        return [];
      }
    }

    return []; // 아무것도 저장되어 있지 않으면 빈 배열
  };

  // [2] 현재 할 일 목록 상태값 저장
  const [todo, setTodo] = useState(loadTodoFromStorage);

  // [3] 고유한 id 생성을 위한 숫자 저장소
  const idRef = useRef(0); // 처음엔 0부터 시작

  // [4] 페이지가 처음 실행될 때, 가장 큰 id를 찾아서 다음 id로 설정
  useEffect(() => {
    if (todo.length > 0) {
      const maxId = todo.reduce((biggest, item) => {
        return item.id > biggest ? item.id : biggest;
      }, 0);
      idRef.current = maxId + 1; // 다음 생성될 아이템의 id 설정
    }
  }, []); // 한 번만 실행됨

  // [5] 할 일 목록이 바뀔 때마다 localStorage에 저장
  useEffect(() => {
    const todoString = JSON.stringify(todo); // 객체를 문자열로 변환
    localStorage.setItem("todo", todoString); // localStorage에 저장
  }, [todo]); // todo가 바뀔 때마다 실행됨

  // [6] 새로운 할 일 추가 함수
  const onCreate = (content, priority) => {
    const newTodo = {
      id: idRef.current,
      content: content,
      isDone: false,
      priority: priority || "중간",
      createdDate: new Date().getTime(), // 현재 시간 저장
    };
    // 새 할 일을 기존 목록 앞에 추가
    setTodo((prev) => [newTodo, ...prev]);
    // 다음 id를 위해 숫자 증가
    idRef.current += 1;
  };

  // [7] 할 일 완료 체크 or 수정 함수
  const onUpdate = (targetId, newContent, newPriority) => {
    const updatedTodo = todo.map((item) => {
      if (item.id === targetId) {
        return {
          ...item,
          isDone: newContent === undefined ? !item.isDone : item.isDone,
          content: newContent === undefined ? item.content : newContent,
          priority: newPriority === undefined ? item.priority : newPriority,
        };
      } else {
        return item;
      }
    });

    setTodo(updatedTodo);
  };

  // [8] 할 일 삭제 함수
  const onDelete = (targetId) => {
    const filteredTodo = todo.filter((item) => item.id !== targetId);
    setTodo(filteredTodo);
  };

  // [9] 실제 화면에 보여줄 내용
  return (
    <div className="App">
      <Header />
      <TodoEditor onCreate={onCreate} />
      <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;

// useState : 값(상태)을 기억하고 화면에 반영하기 위해 사용
// useEffect : 특정 작업을 실행할 시점을 제어할 때 사용 (처음 시작할 때, 값이 바뀔 때 등)
// useRef : 렌더링 없이 값을 기억하고 유지할 때 사용 (id 증가용)
