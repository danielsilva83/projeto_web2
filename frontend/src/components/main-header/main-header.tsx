import React from 'react';
import { Container, HeaderButton, Imagem } from './main-header-styles';
import LegoImage from '../../assets/lego-rosa.png';
import { useHistory } from 'react-router-dom';

const MainHeader: React.FC = () => {
  const history = useHistory();
  return (
    <Container>
      <Imagem src={LegoImage} marginLeft="20px" />
      <HeaderButton onClick={() => history.push('/fractions')}>
        Frações
      </HeaderButton>
      <HeaderButton onClick={() => history.push('/contact')}>Contato</HeaderButton>
      <HeaderButton>Tecnologias</HeaderButton>
      <HeaderButton onClick={() => history.push('/about')}>Sobre</HeaderButton>
    </Container>
  );
};

export default MainHeader;
