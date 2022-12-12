import React from "react";

import { Container, FilterStyleProps } from "./styles";

import { TouchableOpacityProps } from "react-native";
import { Title } from "@components/Filter/styles";

type Props = TouchableOpacityProps &
  FilterStyleProps & {
    title: string;
  };

const Filter: React.FC<Props> = ({ title, isActive = false, ...rest }) => {
  return (
    <Container isActive={isActive} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
};

export default Filter;
