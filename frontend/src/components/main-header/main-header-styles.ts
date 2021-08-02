import styled from 'styled-components';

export const Container = styled.div`
  background-color: white;
  height: 10%;
  width: 100%;
  justify-content: left;
  align-items: center;
  display: flex;
`;

interface HeaderButtonProps {
  marginLeft?: string;
  marginRight?: string;
}
export const HeaderButton = styled.button<HeaderButtonProps>`
  font-size: 20px;
  color: #620184;
  text-align: center;
  font-weight: bold;
  background-color: transparent;
  border: none;
  cursor: pointer;

  margin-left: ${props => (props.marginLeft ? props.marginLeft : '20px')};
  margin-right: ${props => (props.marginRight ? props.marginRight : '0px')};

  :hover {
    color: #b0b0b0;
  }
`;

interface ImagemProps {
  height?: string;
  width?: string;
  marginLeft?: string;
  marginRight?: string;
}
export const Imagem = styled.img<ImagemProps>`
  width: ${props => (props.height ? props.height : '50px')};
  height: ${props => (props.width ? props.width : '50px')};
  margin-left: ${props => (props.marginLeft ? props.marginLeft : '0px')};
  margin-right: ${props => (props.marginRight ? props.marginRight : '0px')};
`;
