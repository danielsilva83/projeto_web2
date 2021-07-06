import styled from 'styled-components';

export const Container = styled.div`
  background-color: white;
  height: 60px;
  width: 70%;
  display: flex;
  border-radius: 30px;
  margin-top: 40px;
  align-items: center;
  justify-content: flex-start;
  padding: 5px;
`;

export const Input = styled.input`
  font-size: 30px;
  border: none;
  outline: none;
  width: 80%;
  cursor: pointer;
  color: #b0b0b0;

  :hover {
    background-color: #f2f2f2;
  }

  ::-webkit-input-placeholder {
    color: #b0b0b0;
  }
`;

export const ButtonEye = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const BoxIcon = styled.div`
  margin-left: 10px;
  margin-right: 20px;
`;
