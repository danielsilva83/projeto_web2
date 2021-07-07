import styled from 'styled-components';

import { ReactComponent as LogoTemRazao } from '../../assets/TemRazao-Logo.svg';

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: space-evenly;
  align-items: center;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const PurpleSquare = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #6a2673;
  width: 100%;
  height: 100vh;
  right: 0px;
  
  align-items: center;
  justify-content: flex-start;
  @media (max-width: 800px) {
    width: 100%;
  }
`;



interface LogoProps {
  size?: string;
  marginTop?: string;
}

export const Logo = styled(LogoTemRazao)<LogoProps>`
  height: ${props => (props.size ? props.size : '40%')};
  width: ${props => (props.size ? props.size : '70%')};
  margin-top: ${props => (props.marginTop ? props.marginTop : '0px')};

  @media (max-width: 800px) {
    height: 45%;
    width: 45%;
  }
`;

export const BoxText = styled.div`
  display: flex;
  width: 70%;
  margin-top: 50px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
export const Text = styled.h3`
  font-size: 25px;
  font-weight: normal;
  color: white;
`;

interface ButtonSignupProps {
  marginBottom?: string;
}
export const ButtonSignup = styled.button<ButtonSignupProps>`
  margin-left: 10px;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  color: white;
  font-weight: bold;
  font-size: 22px;

  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : '0px')};
`;
