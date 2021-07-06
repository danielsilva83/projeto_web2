import React from 'react';
import { Container, TitleButton } from './main-button-styles';

interface MainButtonProps {
  title?: string;
  onClick?: () => void;
}
const MainButton: React.FC<MainButtonProps> = ({ title, onClick }) => {
  return (
    <Container onClick={onClick}>
      <TitleButton>{title}</TitleButton>
    </Container>
  );
};

export default MainButton;
