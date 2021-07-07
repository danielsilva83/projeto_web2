import React, { useState } from 'react';
import {
  Container,
  LeftSquare,
  RightSquare,
  Logo,
  Text,
  BoxText,

} from './fracoes-styles';
import Markdown from '../../components/markdown/markdown';

import conteudo from '../../assets/texto-conteudo.md';

const Sobre: React.FC = () => {
  return (
    <Container>
    <LeftSquare>
        <div>
        <Logo/></div>
        
    </LeftSquare>

      <RightSquare>
      <div>
        <Text>
          <Markdown path = {conteudo}/>
      </Text>
      </div>


      </RightSquare>
    </Container>
  );
};
export default Sobre;
