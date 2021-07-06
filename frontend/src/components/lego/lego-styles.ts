import styled from 'styled-components';

export const Container = styled.div`
  background-color: white;
  width: 300px;
  flex-direction: row;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 10px 10px 10px  black;
  border-radius: 15px;
`;

interface BoxCircleProps{
  color: string;
}
export const BoxCircle = styled.div<BoxCircleProps>`
  display: flex;
  flex-direction: row;
  width: 50%;
  justify-content: center;
  align-items:  center;
  background-color: ${props => props.color};
`;


export const Circle = styled.div`
  background-color: transparent;
  height: 100px;
  width: 100px;
  border-radius: 50px;
  margin-top: 10px;
  margin-bottom: 30px;
  margin-left: 10px;
  margin-right: 10px;
  box-shadow: 0px 15px 10px black;
  border-style: groove;
  border-width: 3px;
  border-color: gray;
`;
