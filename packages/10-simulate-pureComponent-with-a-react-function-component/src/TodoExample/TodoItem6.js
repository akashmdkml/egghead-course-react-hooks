import React, { useContext } from "react";
import Checkbox from "./Checkbox";
import ThemeContext from "../Theme/ThemeContext";
import { Button, Item } from "./Styled";

const TodoItem = React.memo(
  ({ todo, onChange, onDelete }) => {
    console.log("TodoItem6", { todo, onChange, onDelete });
    const theme = useContext(ThemeContext);
    return (
      <Item key={todo.id} theme={theme}>
        <Checkbox
          id={todo.id}
          label={todo.text}
          checked={todo.completed}
          onChange={onChange.bind(this, todo.id)}
        />
        <Button onClick={onDelete.bind(this, todo.id)} theme={theme}>
          x
        </Button>
      </Item>
    );
  },
  ({ todo: prevTodo }, { todo: nextTodo }) => prevTodo === nextTodo
);

export default TodoItem;
