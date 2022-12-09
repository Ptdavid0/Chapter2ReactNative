import GroupCard from "@components/GroupCard";
import Header from "@components/Header";
import HighLight from "@components/HighLight";
import React from "react";
import { Container } from "./styles";

const Groups: React.FC = () => {
  return (
    <Container>
      <Header showBackButton />
      <HighLight title="Turmas" subtitle="Jogue com sua turma" />
      <GroupCard
        title="Turma 1"
        onPress={() => {
          alert("Turma 1");
        }}
      />
    </Container>
  );
};

export default Groups;
