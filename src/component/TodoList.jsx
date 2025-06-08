import { useState } from "react";
import TodoItem from "./TodoItem"; // 하나의 Todo 항목 컴포넌트
import "./TodoList.css";

// TodoList 컴포넌트: 전체 할 일 목록과 검색 기능 제공
const TodoList = ({ todo, onUpdate, onDelete }) => {
  // 검색어를 저장하는 상태 변수 (초기값은 빈 문자열)
  const [search, setSearch] = useState("");
  // 완료 항목을 숨길지 여부
  const [hideDone, setHideDone] = useState(false);
  // 검색어 input이 변경될 때 실행되는 함수
  const onChangeSearch = (e) => {
    setSearch(e.target.value); // 입력값으로 상태 업데이트
  };

  // 검색어에 따라 필터링된 결과를 반환하는 함수
  const getSearchResult = () => {
    if (!Array.isArray(todo)) return [];

    let filtered = todo;

    if (search !== "") {
      filtered = filtered.filter(
        (item) =>
          item.content?.toLowerCase().includes(search.toLowerCase()) ||
          item.priority?.includes(search)
      );
    }

    if (hideDone) {
      filtered = filtered.filter((item) => !item.isDone);
    }

    return filtered;
  };
  //   if (search === "") {
  //     // 검색어가 없으면 전체 목록 반환
  //     return todo;
  //   } else {
  //     // 검색어가 있으면 일치하는 항목만 필터링
  //     return todo.filter(
  //       (item) => item.content.toLowerCase().includes(search.toLowerCase())
  //       // content에 검색어가 포함되어 있는지 (대소문자 구분 X)
  //     );
  //   }
  // };

  // 화면에 보여지는 실제 UI
  return (
    <div className="TodoList">
      <h4>Todo List</h4>

      {/* 검색창 */}
      <input
        value={search} // 현재 입력된 검색어
        onChange={onChangeSearch} // 입력이 바뀔 때마다 onChangeSearch 실행
        className="searchbar" // CSS 클래스
        placeholder="검색어를 입력하세요" // 입력창 힌트
      />
      {/* 완료 항목 숨기기 버튼 */}
      <button
        onClick={() => setHideDone(!hideDone)}
        className="toggle_hide_done"
      >
        {hideDone ? "완료 항목 보기" : "완료 항목 숨기기"}
      </button>
      {/* 할 일 목록을 감싸는 div */}
      <div className="list_wrapper">
        {/* getSearchResult()로 필터링한 결과를 map으로 돌면서 TodoItem을 생성 */}
        {getSearchResult().map((item) => (
          <TodoItem
            key={item.id} // 리액트가 각 항목을 구분하기 위한 고유 키
            {...item} // item의 모든 속성(id, content 등)을 TodoItem에 전달
            onUpdate={onUpdate} // 체크박스 변경, 수정 시 부모로 전달되는 함수
            onDelete={onDelete} // 삭제 버튼 눌렀을 때 호출되는 함수
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;

// useState : 검색어 상태 저장
// onChange 이벤트 : 입력값이 바뀔 때 상태도 바뀌도록 함
// map() : 필터링된 항목들을 각각 화면에 렌더링
// key 속성 : React가 리스트 항목을 효율적으로 렌더링하기 위해 필요
