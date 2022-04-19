import { Button } from "@material-ui/core";
import { AddCircleSharp, Remove } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";

const Counter = ({
  addAmountBtnClicked,
  removeAmountBtnClicked,
  todoAmount,
  column,
}) => {
  return (
    <AmountContainer column={column}>
      <P> configure amount todos to </P>
      <Div1>
        <BtnAmount onClick={removeAmountBtnClicked}>
          <Remove />
        </BtnAmount>
        <Amount>{todoAmount}</Amount>
        <BtnAmount onClick={addAmountBtnClicked}>
          <AddCircleSharp />
        </BtnAmount>
      </Div1>
    </AmountContainer>
  );
};

export default Counter;
const AmountContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  align-items: center;
`;
const Amount = styled.h4`
  border: 1px solid gray;
  padding: 10px 15px;
  color: gray;
  margin: 0 5px;
`;
const BtnAmount = styled(Button)`
  border: 1px solid gray !important;
  margin: 0 5px !important;
  color: gray !important;
`;
const P = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  color: grey;
  margin-right: 1rem;
  font-size: 16px;
`;

const Div1 = styled.div`
  display: flex;
`;
