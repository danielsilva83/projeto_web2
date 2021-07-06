import React, {useCallback} from 'react';
import { BoxCircle, Circle, Container } from './lego-styles';

interface LegoProps {
  color: string;
  numbersSelecteds: number
}

const Lego:React.FC<LegoProps> = ({color, numbersSelecteds}) => {
  const returnNumbersSelecteds = useCallback (() => {
    let numbers = [];

    for (let index = 0; index < numbersSelecteds; index++) {
      numbers.push(
        <BoxCircle color={color}>
          <Circle/>
        </BoxCircle>
       );
    }

    while(numbers.length < 10){
      numbers.push(
        <BoxCircle color={'#dcdcdc'}>
          <Circle/>
        </BoxCircle>
       );
    }

    return numbers;
  }, [numbersSelecteds, color]);



return (
  <Container>
    {returnNumbersSelecteds()}
  </Container>
  );
}
export default Lego;
