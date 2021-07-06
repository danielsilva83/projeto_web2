import React, { useState } from 'react';
import Lego from '../../components/lego/lego';
import { TextInput, MainButton } from '../../components';
import {
  Container,
  LeftSquare,
  RightSquare,
  Logo,
  Text,
  BoxText,

} from './sobre-styles';
import * as Icon from 'react-icons/fa';
import Markdown from '../../components/markdown/markdown';

import equipe from '../../assets/texto-equipe.md';
import conteudo from '../../assets/texto-conteudo.md';

const Sobre: React.FC = () => {
  const [login, SetLogin] = useState('');
  const [password, SetPassword] = useState('');

  console.log(login);

  console.log(password);
  return (
    <Container>
    <LeftSquare>
        <div>
        <Logo/></div>
        
        <BoxText>
        <Markdown path = {equipe}/>
      </BoxText>
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
