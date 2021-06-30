import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { Delete, Edit, SearchRounded } from "@material-ui/icons";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { IconButton } from "@material-ui/core";
import db, { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { openModal } from "../../features/modalSlice";
import {
  selectTodos,
  setTodos,
  setTodoToEdit,
} from "../../features/todosSlice";
import { useAuthState } from "react-firebase-hooks/auth";
const RenderTodos = ({ todos }) => {
  const [user] = useAuthState(auth);
  const todoss = useSelector(selectTodos);
  const [filter, setFilter] = useState("all");
  const dispatch = useDispatch();
  useEffect(() => {
    if (filter == "completed") {
      const filterd = todos?.filter((todo) => todo.data.completed == true);
      dispatch(setTodos(filterd));
    } else if (filter == "not completed") {
      const filterd = todos?.filter((todo) => todo.data.completed == false);
      dispatch(setTodos(filterd));
    } else {
      dispatch(setTodos(todos));
    }
  }, [filter, todos]);

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };
  // delete todo
  const deleteTodo = (id) => {
    // delete from db
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
    <Container>
      {/* search and filter container */}

      <Div1>
        <SearchContainer>
          <Input type="text" placeholder="search..." />
          <SearchRounded />
        </SearchContainer>
        <FormControl>
          <InputLabel id="demo-simple-select-label">filter</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            onChange={(e) => handleFilter(e)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="completed">completed</MenuItem>
            <MenuItem value="not completed">not completed</MenuItem>
          </Select>
        </FormControl>
      </Div1>
      {/* todos list */}
      <Title>you are going to</Title>
      {todoss?.map(({ id, data: { completed, deadline, timestamp, todo } }) => (
        <Div2 key={id} id={id}>
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
      ))}
    </Container>
  );
};

export default RenderTodos;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  padding: 10px;
  background-color: whitesmoke;
`;
const Div1 = styled.div`
  display: flex;
  align-items: flex-end;
  margin: 5px;
`;
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 2rem;
  color: gray;
  border: 1px solid gray;
  border-radius: 40px;
  padding: 8px;
`;
const Input = styled.input`
  border: none;
  outline: none;
  color: gray;
  background: none;
`;
const Title = styled.h2`
  color: gray;
  text-transform: uppercase;
  font-weight: 900;
  letter-spacing: 1.4px;
  padding-bottom: 5px;
  border-bottom: 1px solid gray;
`;
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
