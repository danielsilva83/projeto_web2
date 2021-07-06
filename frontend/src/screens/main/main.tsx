import React, { useState } from 'react';
import Lego from '../../components/lego/lego';
import { TextInput, MainButton } from '../../components';
import {
  Container,
  PurpleSquare,
  WhiteSquare,
  Logo,
  Text,
  BoxText,
  ButtonSignup,
} from './main-styles';
import * as Icon from 'react-icons/fa';

const Main: React.FC = () => {
  const [login, SetLogin] = useState('');
  const [password, SetPassword] = useState('');

  console.log(login);

  console.log(password);
  return (
    <Container>
      <WhiteSquare></WhiteSquare>
      <PurpleSquare>
        <Logo marginTop={'100px'} />

        <TextInput
          onChange={(text: { target: { value: string } }) =>
            SetLogin(text.target.value)
          }
          type="text"
          placeholder="Login"
        >
          <Icon.FaUser color="#B0B0B0" size={25} />
        </TextInput>

        <TextInput
          onChange={(text: { target: { value: string } }) =>
            SetPassword(text.target.value)
          }
          type="password"
          placeholder="Password"
        >
          <Icon.FaLock color="#B0B0B0" size={25} />
        </TextInput>

        <MainButton onClick={() => console.log('clicou')} title="Signin" />

        <BoxText>
          <Text>Don't have an account?</Text>
          <ButtonSignup>SignUp</ButtonSignup>
        </BoxText>

        <ButtonSignup marginBottom="80px">Forgot password</ButtonSignup>
      </PurpleSquare>
    </Container>
  );
};
export default Main;
