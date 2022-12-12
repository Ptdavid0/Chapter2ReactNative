import React from "react";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";

import { Container } from "./styles";

const Input: React.FC<TextInputProps> = ({ ...rest }) => {
  const { COLORS } = useTheme();
  return (
    <Container {...rest} placeholderTextColor={COLORS.GRAY_300}></Container>
  );
};

export default Input;
