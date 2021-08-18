import React, { useState } from 'react';
import Lego from '../../components/lego/lego';
import { TextInput, MainButton, MainHeader } from '../../components';
import Personagens from '../../assets/personagens.png';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import {
  Container,
  PurpleSquare,
  Logo,
  Text,
  BoxText,
  ButtonSignup,
  WhiteSquare,
  Title,
  Imagem,
} from './signup-styles';
import * as Icon from 'react-icons/fa';
import { send } from 'emailjs-com';

const Signup: React.FC = () => {
  const history = useHistory();
  const [fisrtName, SetfisrtName] = useState('');
  const [lastName, SetlastName] = useState('');
  const [professorName, SetprofessorName] = useState('');
  const [email, Setemail] = useState('');
  const [password, SetPassword] = useState('');

  const handleClickButtonLogin = async () => {
    try {
      await api
        .post('/professor/register', {
          fisrtName: fisrtName,
          lastName: lastName,
          professorName: professorName,
          email: email,
          password: password,
        })
        .then(response => {
          history.push('/');
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
        <Logo />

        <TextInput
          onChange={(text: { target: { value: string } }) =>
          SetfisrtName(text.target.value)
        }
        type="text"
        placeholder="Primeiro Nome"
        >
          <Icon.FaUser color="#B0B0B0" size={25} />
        </TextInput>

        <TextInput
          onChange={(text: { target: { value: string } }) =>
          SetlastName(text.target.value)
        }
        type="text"
        placeholder="Sobrenome"
        >
          <Icon.FaUser color="#B0B0B0" size={25} />
        </TextInput>

        <TextInput
          onChange={(text: { target: { value: string } }) =>
          SetprofessorName(text.target.value)
        }
        type="text"
        placeholder="Apelido"
        >
          <Icon.FaUser color="#B0B0B0" size={25} />
        </TextInput>

        <TextInput
          onChange={(text: { target: { value: string } }) =>
          Setemail(text.target.value)
        }
        type="text"
        placeholder="Email"
        >
          <Icon.FaEnvelope color="#B0B0B0" size={25}/>
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

        <MainButton onClick={() => handleClickButtonLogin()} title="Registrar" />
      </PurpleSquare>
    </Container>
  );
};
export default Signup;
