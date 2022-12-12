import Button from "@components/Button";
import Header from "@components/Header";
import HighLight from "@components/HighLight";
import Input from "@components/Input";
import React from "react";
import { Container, Content, Icon } from "./styles";
import { useNavigation } from "@react-navigation/native";

const NewGroup: React.FC = () => {
  const { navigate } = useNavigation();
  const handleNewGroup = () => {
    navigate("players", {
      group: "Rocket",
    });
  };
  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />

        <HighLight
          title="Nova turma"
          subtitle="Crie a turma para adicionar as pessoas"
        />

        <Input placeholder="Nome da Turma" />

        <Button
          title="Criar"
          style={{
            marginTop: 20,
          }}
          onPress={handleNewGroup}
        />
      </Content>
    </Container>
  );
};

export default NewGroup;
