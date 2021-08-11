import React, { useState } from 'react';
import Lego from '../../components/lego/lego';
import { TextInput, MainButton, MainHeader } from '../../components';
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
} from './contact-styles';
import * as Icon from 'react-icons/fa';
import { send } from 'emailjs-com';

const Contact: React.FC = () => {
  const [toSend, setToSend] = useState({
    from_name: '',
    message: '',
    reply_to: '',
  });
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
          onChange={(text: { target: { value: string } }) => {
            setToSend({ ...toSend, reply_to: text.target.value });
          }}
          type="text"
          placeholder="Email"
        >
          <Icon.FaEnvelope color="#B0B0B0" size={25} />
        </TextInput>

        <TextInput
          onChange={(text: { target: { value: string } }) => {
            setToSend({ ...toSend, from_name: text.target.value });
          }}
          type="text"
          placeholder="Nome"
        >
          <Icon.FaUser color="#B0B0B0" size={25} />
        </TextInput>

        <TextInput
          onChange={(text: { target: { value: string } }) => {
            setToSend({ ...toSend, message: text.target.value });
          }}
          type="text"
          placeholder="Mensagem"
        >
          <Icon.FaComment color="#B0B0B0" size={25} />
        </TextInput>

        <MainButton
          onClick={() => {
            send(
              'service_eez79mk',
              'template_fuap9rd',
              toSend,
              'user_i8GeHAJr5gbRtyMVKIwcJ',
            )
              .then(response => {
                console.log('SUCCESS!', response.status, response.text);
              })
              .catch(err => {
                console.log('FAILED...', err);
              });
          }}
          title="Enviar"
        >
          Enviar
        </MainButton>
      </PurpleSquare>
    </Container>
  );
};
export default Contact;
