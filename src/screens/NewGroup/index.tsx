import Button from "@components/Button";
import Header from "@components/Header";
import HighLight from "@components/HighLight";
import Input from "@components/Input";
import React from "react";
import { Container, Content, Icon } from "./styles";
import { useNavigation } from "@react-navigation/native";

const NewGroup: React.FC = () => {
  const [group, setGroup] = React.useState<string>("");

  const { navigate } = useNavigation();
  const handleNewGroup = () => {
    navigate("players", {
      group,
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

        <Input placeholder="Nome da Turma" onChangeText={setGroup} />

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
