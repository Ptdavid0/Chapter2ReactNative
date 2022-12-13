import Button from "@components/Button";
import GroupCard from "@components/GroupCard";
import Header from "@components/Header";
import HighLight from "@components/HighLight";
import ListEmpty from "@components/ListEmpty";
import React, { useEffect, useState, useCallback } from "react";
import { Alert, FlatList } from "react-native";
import { Container } from "./styles";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { groupGetAll } from "@storage/group/groupGetAll";
import { Group } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";

const Groups: React.FC = () => {
  const navigation = useNavigation();
  const [groups, setGroups] = useState<Group[]>([]);

  const handleNewGroup = () => {
    navigation.navigate("new");
  };

  const fetchGroups = async () => {
    try {
      const groups = await groupGetAll();
      const groupsParsed = groups.map((group) => {
        return JSON.parse(group);
      });
      setGroups(groupsParsed);
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Erro", error.message);
      } else {
        Alert.alert("Erro", "Erro ao buscar turmas");
        console.log(error);
      }
    }
  };

  // Used to fetch groups when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

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
            title={item.name}
            onPress={() => {
              alert("Clicou " + item.name);
            }}
          />
        )}
      />
      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
};

export default Groups;
