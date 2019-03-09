import React, { useState, useCallback } from "react";
import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem";
import { Container, List } from "./Styled";
import About from "./About";
import { useTodosWithLocalStorage, useKeyDown } from "./hooks";
import { useTitle as useDocumentTitle } from "react-use";

const incompleteTodoCount = todos =>
  todos.reduce((memo, todo) => (!todo.completed ? memo + 1 : memo), 0);

export default function TodoList() {
  const [newTodo, updateNewTodo] = useState("");
  const [todos, dispatch] = useTodosWithLocalStorage([]);
  const inCompleteCount = incompleteTodoCount(todos);
  const title = inCompleteCount ? `Todos (${inCompleteCount})` : "Todos";
  useDocumentTitle(title);
  let [showAbout, setShowAbout] = useKeyDown(
    { "?": true, Escape: false },
    false
  );
  const handleNewSubmit = e => {
    e.preventDefault();
    dispatch({ type: "ADD_TODO", text: newTodo });
    updateNewTodo("");
  };

  const handleChange = useCallback(
    id => dispatch({ type: "TOGGLE_TODO", id }),
    []
  );
  const handleDelete = useCallback(
    id =>
      dispatch({
        type: "DELETE_TODO",
        id
      }),
    []
  );

  return (
    <Container todos={todos}>
      <NewTodo
        onSubmit={handleNewSubmit}
        value={newTodo}
        onChange={e => updateNewTodo(e.target.value)}
      />
      {!!todos.length && (
        <List theme="dark">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onChange={handleChange}
              onDelete={handleDelete}
            />
          ))}
        </List>
      )}
      <About isOpen={showAbout} onClose={() => setShowAbout(false)} />
    </Container>
  );
}
