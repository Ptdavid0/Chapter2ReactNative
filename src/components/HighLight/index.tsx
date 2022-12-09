import React from "react";

import { Container, Title, Subtitle } from "./styles";

interface Props {
  title: string;
  subtitle: string;
}

const HighLight: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Container>
  );
};

export default HighLight;
