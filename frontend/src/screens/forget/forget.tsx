import React, { useState } from 'react';
import Lego from '../../components/lego/lego';
import { TextInput, MainButton, MainHeader } from '../../components';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import Personagens from '../../assets/personagens.png';
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
} from './forget-styles';
import * as Icon from 'react-icons/fa';

const Forget: React.FC = () => {

  
  const [email, Setemail] = useState('');

  const handleClickButtonLogin = async () => {
    try {
      await api
        .post('/users/forgot-password', {
          email: email,
        })
        .then(response => {
          console.log(response.data);
          toast.success('Mensagem emviada');
        });
    } catch (error) {
      console.log(error);
      toast.error('Erro ao enviar a mensagem!');
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

        <Text>Digite seu email para recuperação de senha</Text>
        <TextInput
          onChange={(text: { target: { value: string } }) =>
          Setemail(text.target.value)
        }
        type="text"
        placeholder="Email"
        >
          <Icon.FaEnvelope color="#B0B0B0" size={25}/>
        </TextInput>


        <MainButton onClick={() => handleClickButtonLogin()} title="Enviar" />

      </PurpleSquare>
    </Container>
  );
};
export default Forget;
