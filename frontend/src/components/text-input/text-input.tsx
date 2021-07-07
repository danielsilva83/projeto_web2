import { type } from 'os';
import React, { useState } from 'react';
import { BoxIcon, ButtonEye, Container, Input } from './text-input-styles';
import * as Icon from 'react-icons/fa';

interface TextProps {
  text: { target: { value: string } };
}

interface InputProps {
  children?: React.ReactNode;
  onChange: any;
  placeholder?: string;
  type: 'text' | 'password'
  ;
}

const TextInput: React.FC<InputProps> = ({
  children,
  type,
  placeholder,
  onChange,
}) => {
  const [hidePassword, setHidePassword] = useState(
    type === 'password' ? true : false,
  );

  return (
    <Container>
      <BoxIcon>{children}</BoxIcon>

      <Input
        onChange={onChange}
        placeholder={placeholder}
        type={hidePassword ? 'password' : 'text'}
      />
      {type === 'password' ? (
        <ButtonEye onClick={() => setHidePassword(!hidePassword)}>
          <Icon.FaEye size="35" color="#B0B0B0" />
        </ButtonEye>
      ) : null}
      
    </Container>
  );
};

export default TextInput;
