import React from "react";
import styled from "styled-components";
import { Delete, Edit, SearchRounded } from "@material-ui/icons";
import { Checkbox, IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import db, { auth } from "../../firebase";
import {
  selectTodos,
  setTodos,
  setTodoToEdit,
} from "../../features/todosSlice";
import { openModal } from "../../features/modalSlice";
import { Draggable } from "react-beautiful-dnd";

const Todo = ({ completed, deadline, timestamp, todo, id, index }) => {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);

  // delete todo

  const deleteTodo = (id) => {
    db.collection("todos")
      .doc(user.uid)
      .collection("todoArray")
      .doc(id)
      .delete()
      .then(() => {})
      .catch((e) => console.error("error"));
  };

  // updateTodo
  const updateTodo = (id) => {
    dispatch(openModal());
    dispatch(
      setTodoToEdit({
        id,
        EditingMode: true,
      })
    );
  };

  // change status
  const changeStatus = (id, status) => {
    db.collection("todos")
      .doc(user?.uid)
      .collection("todoArray")
      .doc(id)
      .update({ completed: !status });
  };
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Div2
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          id={id}
        >
          <Text>{todo}</Text>
          <DateTime>
            <Date>
              before {deadline.split("T")[0]}
              <Time> at {deadline.split("T")[1]}</Time>
            </Date>
          </DateTime>
          <IconButtons>
            <IconButton
              onClick={(e) => deleteTodo(id)}
              color="secondary"
              aria-label="delete"
            >
              <Delete />
            </IconButton>
            <IconButton
              onClick={(e) => updateTodo(id, completed)}
              color="primary"
            >
              <Edit />
            </IconButton>
            <Checkbox
              checked={completed}
              onChange={(e) => changeStatus(id, completed)}
              color="primary"
            />
          </IconButtons>
        </Div2>
      )}
    </Draggable>
  );
};

export default Todo;
const Div2 = styled.div`
  margin-bottom: 1rem;
  background-color: white;
  width: 25rem;
  padding: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;
const Text = styled.h4`
  margin: 0;
  color: gray;
  text-transform: capitalize;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;
const DateTime = styled.div`
  display: flex;
  align-items: center;
  width: 100;
  margin-top: 0;
  align-self: flex-end;
  color: gray;
`;

const Date = styled.p`
  margin: 0;
  font-size: 14px;
`;
const Time = styled.span`
  margin: 0;
  font-size: 14px;
`;

const IconButtons = styled.div`
  align-self: flex-end;
`;
