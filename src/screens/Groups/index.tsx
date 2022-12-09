import Header from "@components/Header";
import HighLight from "@components/HighLight";
import React from "react";
import { Container } from "./styles";

const Groups: React.FC = () => {
  return (
    <Container>
      <Header showBackButton />
      <HighLight title="Grupos" subtitle="Crie ou entre em um grupo" />
    </Container>
  );
};

export default Groups;
