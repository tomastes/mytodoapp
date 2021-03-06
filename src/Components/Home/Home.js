import { IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectAppState } from "../../features/appSlice";
import { fetchProductsAsync, fetchTodosAsync } from "../../features/Middleware";
import {
  closeModal,
  openModal,
  selectModalState,
} from "../../features/modalSlice";
import {
  selectTodos,
  setTodos,
  setTodoToEdit,
} from "../../features/todosSlice";
import db, { auth } from "../../firebase";
import Modal from "../Modal/Modal";
import RenderTodos from "./RenderTodos";

const Home = () => {
  const todoss = useSelector(selectTodos);
  const darkModeState = useSelector(selectAppState);

  const [user] = useAuthState(auth);
  const [todos, setTodos] = useState([]);
  const dispatch = useDispatch();
  const modalState = useSelector(selectModalState);

  useEffect(() => {
    //? dispatch(fetchTodosAsync(user.uid));
    // test asyncThunk
    dispatch(fetchProductsAsync());
    fetchTodos();
  }, []);

  // fetch todo's
  const fetchTodos = () => {
    db.collection("todos")
      .doc(user?.uid)
      .collection("todoArray")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  };

  const dragEnded = (result) => {
    console.log(result);
    //console.log(todoss);
    const items = [...todoss];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodos(items);
  };
  return (
    <Container darkMode={darkModeState}>
      {/* modal */}
      <Modal
        isOpen={modalState}
        closeModal={(e) => {
          dispatch(
            setTodoToEdit({
              id: null,
              EditingMode: false,
            })
          );
          dispatch(closeModal());
        }}
      />
      {/* render todos compo */}
      <DragDropContext onDragEnd={dragEnded}>
        <RenderTodos todos={todos} />
      </DragDropContext>

      {/* btn modal toggler */}
      <BtnOpenModal onClick={(e) => dispatch(openModal())}>
        <AddIcon />
      </BtnOpenModal>
    </Container>
  );
};

export default Home;
const Container = styled.div`
  background-color: ${(props) =>
    props.darkMode == true ? "#303030" : "whitesmoke"};
  height: 100vh;
`;

const BtnOpenModal = styled(IconButton)`
  position: fixed !important;
  right: 6% !important;
  bottom: 5% !important;
  background-size: 200% auto;
  background-image: linear-gradient(
    to right,
    #ef32d9 0%,
    #89fffd 51%,
    #ef32d9 100%
  );
  transition: 0.5s;
  border-radius: 10px;
  transform: scale(1.8);
  color: #fff !important;

  &:hover {
    background-position: right center;
    color: gray !important;
    text-decoration: none;
    transition: 0.5s;
    transform: scale(1.9);
  }
  @media (max-width: 640px) {
    transform: scale(1.3);
    &:hover {
      transform: scale(1.4);
    }
  }
`;

const AddIcon = styled(MdAdd)``;
