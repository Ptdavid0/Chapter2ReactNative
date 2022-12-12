import Button from "@components/Button";
import GroupCard from "@components/GroupCard";
import Header from "@components/Header";
import HighLight from "@components/HighLight";
import ListEmpty from "@components/ListEmpty";
import React from "react";
import { FlatList } from "react-native";
import { Container } from "./styles";
import { useNavigation } from "@react-navigation/native";

const Groups: React.FC = () => {
  const navigation = useNavigation();
  const [groups, setGroups] = React.useState([
    {
      id: 1,
      title: "Turma 1",
    },
    {
      id: 2,
      title: "Turma 2",
    },
  ]);

  const handleNewGroup = () => {
    navigation.navigate("new");
  };

  return (
    <Container>
      <Header />
      <HighLight title="Turmas" subtitle="Jogue com sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={
          <ListEmpty message="Que tal cadastrar a primeira turma ?" />
        }
        contentContainerStyle={groups.length === 0 ? { flex: 1 } : {}}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <GroupCard
            title={item.title}
            onPress={() => {
              alert("Clicou " + item.title);
            }}
          />
        )}
      />
      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
};

export default Groups;
