import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";

import { Container } from "./styles";

type Props = TextInputProps & {
  inputRef?: React.RefObject<TextInput>;
};

const Input: React.FC<Props> = ({ inputRef, ...rest }) => {
  const { COLORS } = useTheme();
  return (
    <Container
      placeholderTextColor={COLORS.GRAY_300}
      ref={inputRef}
      {...rest}
    ></Container>
  );
};

export default Input;
