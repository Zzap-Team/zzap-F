import { useState } from 'react';
import { styled } from 'styled-components';

export function ToolBar({insertHeader, insertTypography}) {

  return (
    <ToolDiv>
      <button onClick={() => insertHeader(1)}>H1</button>
      <button onClick={() => insertHeader(2)}>H2</button>
      <button onClick={() => insertHeader(3)}>H3</button>
      <button onClick={() => insertHeader(4)}>H4</button>
      <button onClick={() => insertTypography('bold')}>B</button>
      <button onClick={() => insertTypography('italics')}>I</button>
      <button onClick={() => insertTypography('strikethrough')}>T</button>
    </ToolDiv>
  );
}

const ToolDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  
  button{
    width: 30px;
    height: 25px;
    border: none;
    background-color: transparent;
    margin: 20px 10px 20px 5px;
    &:hover{
      background-color: #FFC0CB;
      cursor: pointer;
    }
  }
`;




