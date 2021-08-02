import React, { useState } from 'react';
import {
  Container,
  LeftSquare,
  RightSquare,
  Logo,
  Text,
  BoxText,
} from './about-styles';
import Markdown from '../../components/markdown/markdown';

import equipe from '../../assets/texto-equipe.md';
import ferramentas from '../../assets/texto-ferramentas.md';
import conteudo from '../../assets/texto-conteudo.md';

const About: React.FC = () => {
  return (
    <Container>
      <LeftSquare>
        <div>
          <Logo />
        </div>

        <BoxText>
          <Markdown path={ferramentas} />
        </BoxText>
      </LeftSquare>

      <RightSquare>
        <div>
          <Text>
            <Markdown path={equipe} />
          </Text>
        </div>
      </RightSquare>
    </Container>
  );
};
export default About;
