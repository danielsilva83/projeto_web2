import React, { useState } from 'react';
import {
  Container,
  LeftSquare,
  RightSquare,
  Logo,
  Text,
  BoxText,
} from './fractions-styles';
import Markdown from '../../components/markdown/markdown';

import conteudo from '../../assets/texto-conteudo.md';

const Fractions: React.FC = () => {
  return (
    <Container>
      <LeftSquare>
        <div>
          <Logo />
        </div>
      </LeftSquare>

      <RightSquare>
        <div>
          <Text>
            <Markdown path={conteudo} />
          </Text>
        </div>
      </RightSquare>
    </Container>
  );
};
export default Fractions;
