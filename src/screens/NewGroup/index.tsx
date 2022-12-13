import Button from "@components/Button";
import Header from "@components/Header";
import HighLight from "@components/HighLight";
import Input from "@components/Input";
import React from "react";
import { Container, Content, Icon } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";
import { Alert } from "react-native";

const NewGroup: React.FC = () => {
  const [group, setGroup] = React.useState<string>("");

  const { navigate } = useNavigation();

  const handleNewGroup = async () => {
    try {
      if (!group || group.trim().length === 0) {
        Alert.alert("Novo Grupo", "Preencha o nome da turma");
        return;
      }
      await groupCreate(group.trim());
      navigate("players", {
        group,
      });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Erro", error.message);
      } else {
        Alert.alert("Erro", "Erro ao criar turma");
        console.log(error);
      }
    }
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
