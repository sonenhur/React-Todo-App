import { useState } from "react";
import "./TodoItem.css";

// 부모 컴포넌트(TodoList)에서 props로 받은 정보들
const TodoItem = ({ id, content, isDone, createdDate, onUpdate, onDelete }) => {
  // 현재 이 항목이 수정 중인지 여부를 저장하는 상태
  const [isEdit, setIsEdit] = useState(false);

  // 수정 중일 때 입력한 내용을 저장하는 상태 (처음엔 기존 내용으로 초기화)
  const [localContent, setLocalContent] = useState(content);

  // 수정 모드를 켜거나 끄는 함수
  const toggleEdit = () => {
    setIsEdit(!isEdit); // true ↔ false 전환
    setLocalContent(content); // 수정 취소 시 원래 내용으로 복원
  };

  // 체크박스를 클릭했을 때 실행되는 함수
  const onChangeCheckbox = () => {
    if (!isEdit) {
      // 수정 중이 아닐 때만 완료 상태를 토글
      onUpdate(id); // 수정 내용 없이 호출하면 완료 상태 변경
    }
  };

  // 수정 후 저장 버튼을 눌렀을 때 실행되는 함수
  const handleSave = () => {
    // 빈 문자열이면 경고
    if (localContent.trim() === "") {
      alert("내용을 입력하세요!");
      return;
    }

    // 수정된 내용을 부모에게 전달
    onUpdate(id, localContent);

    // 수정 모드를 종료
    setIsEdit(false);
  };

  // 삭제 버튼을 눌렀을 때 실행되는 함수
  const onClickDelete = () => {
    onDelete(id);
  };

  // 실제 화면에 그려지는 JSX 부분
  return (
    <div className={`TodoItem ${isEdit ? "editing" : ""}`}>
      {/* 체크박스 영역 */}
      <div className="checkbox_col">
        <input
          type="checkbox"
          onChange={onChangeCheckbox}
          checked={isDone} // 체크 여부 상태
          disabled={isEdit} // 수정 중일 땐 체크 비활성화
        />
      </div>

      {/* 내용 영역 */}
      <div className="title_col">
        {isEdit ? (
          // 수정 모드일 때는 input 박스를 보여줌
          <input
            value={localContent} // 입력된 값
            onChange={(e) => setLocalContent(e.target.value)} // 값이 바뀔 때 상태 업데이트
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSave(); // Enter 키로 저장
              }
            }}
          />
        ) : (
          // 일반 모드일 때는 텍스트만 보여줌
          content
        )}
      </div>

      {/* 생성 날짜 표시 영역 */}
      <div className="date_col">
        {new Date(createdDate).toLocaleDateString()} {/* 보기 좋게 날짜 포맷 */}
      </div>

      {/* 버튼 영역 */}
      <div className="btn_col">
        {isEdit ? (
          // 수정 모드일 때 보여주는 버튼들
          <>
            <button onClick={handleSave}>저장</button>
            <button onClick={toggleEdit}>취소</button>
          </>
        ) : (
          // 일반 모드일 때 보여주는 버튼들
          <>
            <button onClick={toggleEdit}>수정</button>
            <button onClick={onClickDelete}>삭제</button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;

// useState : 각각의 TodoItem이 독립적으로 수정 상태를 관리
// onUpdate : 완료 체크 변경과 내용 수정을 모두 처리하는 함수 (부모로부터 전달받음)
// onDelete : 삭제 처리도 부모 컴포넌트에 위임
// onChange, onKeyDown : input의 값 처리와 키 이벤트 처리 방식
