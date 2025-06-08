import { useRef, useState } from "react";
import "./TodoEditor.css";

// 부모 컴포넌트(App)에서 onCreate 함수를 props로 받아옴
const TodoEditor = ({ onCreate }) => {
  // 입력된 내용을 저장하는 상태 (비어있는 문자열로 시작)
  const [content, setContent] = useState("");

  // input 요소에 직접 접근하기 위한 참조
  const inputRef = useRef();

  // 사용자가 입력창에 글자를 입력할 때마다 상태 업데이트
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  // 할 일을 추가하는 함수
  const onSubmit = () => {
    // 입력창이 비어있으면 추가하지 않고 커서를 다시 입력창으로 이동
    if (content.trim() === "") {
      inputRef.current.focus(); // input에 포커스를 줌
      return;
    }

    // 부모 컴포넌트(App)의 onCreate 함수를 호출하여 새 할 일을 추가
    onCreate(content, priority);
    setPriority("중간"); //초기화

    // 입력창 초기화
    setContent("");
  };

  // 키보드로 Enter를 눌렀을 때도 할 일 추가되도록 설정
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  // 우선순위 설정 기능 추가
  const [priority, setPriority] = useState("중간"); //기본값:중간
  const onChangePriority = (e) => {
    setPriority(e.target.value);
  };
  const handleSubmit = () => {
    if (!content.trim()) return;
    onCreate(content, priority);
    setContent("");
    setPriority("중간");
  };

  // 실제 화면에 그려지는 부분 (JSX)
  return (
    <div className="TodoEditor">
      <h4>새로운 Todo 작성하기</h4>

      <div className="editor_wrapper">
        {/* 텍스트 입력창 */}
        <input
          ref={inputRef} // 입력창을 참조할 수 있도록 설정
          value={content} // 현재 입력된 값과 연결
          // onChange={onChangeContent} // 입력 내용이 바뀔 때 실행
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={onKeyDown} // 키보드 이벤트 (Enter) 처리
          placeholder="새로운 Todo..." // 입력 안내 문구
        />
        {/* 우선순위 설정 */}
        <select value={priority} onChange={onChangePriority}>
          <option value="높음">높음</option>
          <option value="중간">중간</option>
          <option value="낮음">낮음</option>
        </select>
        {/* 추가 버튼 */}
        <button onClick={onSubmit}>추가</button>
      </div>
    </div>
  );
};

export default TodoEditor;

// useState : 입력한 내용을 상태로 저장하고 변경될 때마다 다시 화면에 반영
// useRef : HTML 요소에 직접 접근하고 조작하기 위해 사용 (focus()에 사용됨)
// props : 부모 컴포넌트에서 내려준 함수(onCreate)를 실행하여 할 일 추가
