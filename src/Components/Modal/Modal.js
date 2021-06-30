import React, { useEffect, useState } from "react";
import styled from "styled-components";
import reactDom from "react-dom";
import { Button, IconButton } from "@material-ui/core";
import { Add, Close, Edit } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import db, { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";
import { useSelector } from "react-redux";
import {
  selectisEditingMode,
  selectTodos,
  selectTodoToEdit,
} from "../../features/todosSlice";
const Modal = ({ closeModal, isOpen }) => {
  const [user] = useAuthState(auth);
  // selectors
  const todos = useSelector(selectTodos);
  const todoToEdit = useSelector(selectTodoToEdit);
  const isEditingMode = useSelector(selectisEditingMode);
  // states
  const [todo, setTodo] = useState("");
  const [deadline, setDeadLine] = useState("");
  const [maxAmountTodo, setMaxAmountTodo] = useState(0);
  const [error, setError] = useState(false);
  // set modal fields when editing
  useEffect(() => {
    if (isEditingMode) {
      setTodo(todoToEdit[0].data.todo);
      setDeadLine(todoToEdit[0].data.deadline);
    }
  }, [todoToEdit]);
  // fetch max amount to do from db
  useEffect(() => {
    db.collection("todos")
      .doc(user?.uid)
      .get()
      .then((doc) => {
        setMaxAmountTodo(doc.data()?.maxTodo);
      });
  }, []);
  // handle submit fn
  const handleSubmit = (e) => {
    e.preventDefault();
    //! check if in editing mode if so edit todo
    if (isEditingMode) {
      return updateTodo();
    }
    //! controle if max amount is exceeded

    if (maxAmountTodo <= todos.length) {
      console.log(maxAmountTodo, todos.length);
      return setError(true);
    }
    //!add new todo
    db.collection("todos")
      .doc(user.uid)
      .collection("todoArray")
      .add({
        todo,
        deadline,
        completed: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setTodo("");
        setDeadLine("");
      })
      .catch((e) => alert(e.message));
  };

  // update todo function
  const updateTodo = () => {
    db.collection("todos")
      .doc(user.uid)
      .collection("todoArray")
      .doc(todoToEdit[0].id)
      .update({
        todo,
        deadline,
        completed: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setTodo("");
        setDeadLine("");
      });
  };
  return (
    isOpen &&
    reactDom.createPortal(
      <Container>
        {/* color overlay */}
        <ColorOverlay onClick={closeModal} />
        {/* actual modal */}
        <ModalContainer>
          {/* btn close */}
          <CloseBtn
            onClick={closeModal}
            startIcon={<Close />}
            color="primary"
            variant="outlined"
          />
          {/* todo form */}
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Input
              id="standard-secondary"
              label="what are u going to do?"
              color="primary"
              required
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <Input
              id="datetime-local"
              label="when is the deadline"
              type="datetime-local"
              value={deadline}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setDeadLine(e.target.value)}
            />
            {error && (
              <PError>
                max todo exceeded! you can change it from setting.
              </PError>
            )}
            <BtnSubmit
              type="submit"
              variant="contained"
              color="primary"
              startIcon={isEditingMode ? <Edit /> : <Add />}
            >
              {isEditingMode ? "update" : "add"}
            </BtnSubmit>
          </Form>
        </ModalContainer>
      </Container>,
      document.getElementById("portal")
    )
  );
};

export default Modal;
const Container = styled.div``;
const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 20%;
  left: 25%;
  bottom: 5%;
  width: 50%;
  background-color: whitesmoke;
  z-index: 1000;
  @media (max-width: 640px) {
    width: 100%;
    left: 0;
    top: 0;
  }
`;
const ColorOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.5);
`;

const CloseBtn = styled(Button)`
  padding: 15px 15px 15px 25px !important;
  align-self: flex-end;
  margin-top: 0;
`;
const Form = styled.form`
  width: 100%;
  padding: 10px;
`;
const Input = styled(TextField)`
  width: 90%;
  margin-bottom: 20px !important;
`;
const BtnSubmit = styled(Button)``;
const PError = styled.p`
  color: #f50157;
`;
