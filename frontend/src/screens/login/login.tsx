import React, { useState } from 'react';
import Lego from '../../components/lego/lego';
import { TextInput, MainButton, MainHeader } from '../../components';
import Personagens from '../../assets/personagens.png';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api';

import {
  Container,
  PurpleSquare,
  WhiteSquare,
  Logo,
  Text,
  BoxText,
  ButtonSignup,
  Imagem,
  Title,
} from './login-styles';
import * as Icon from 'react-icons/fa';

const Login: React.FC = () => {
  const history = useHistory();
  const [login, SetLogin] = useState('');
  const [password, SetPassword] = useState('');

  const handleClickButtonLogin = async () => {
    try {
      await api
        .post('/users/login', {
          email: login,
          password: password,
        })
        .then(response => {
          console.log(response.data);
          toast.success('Usuário cadastrado com sucesso!');
        });
    } catch (error) {
      console.log(error);
      toast.error('Erro ao cadastrar usuário!');
    }
  };

  return (
    <Container>
      <WhiteSquare>
        <MainHeader />

        <Title>Aprendendo frações de maneira lúdica!</Title>
        <Imagem
          src={Personagens}
          height="300px"
          width="300px"
          hideImageOn800px={true}
        />
      </WhiteSquare>
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

        <MainButton onClick={() => handleClickButtonLogin()} title="Signin" />

        <BoxText>
          <Text>Don't have an account?</Text>
          <ButtonSignup onClick={() => history.push('/signup')}>
            SignUp
          </ButtonSignup>
        </BoxText>

        <ButtonSignup marginBottom="80px">Forgot password</ButtonSignup>
        <ToastContainer />
      </PurpleSquare>
    </Container>
  );
};
export default Login;
