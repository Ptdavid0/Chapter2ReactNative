import Button from "@components/Button";
import ButtonIcon from "@components/ButtonIcon";
import Filter from "@components/Filter";
import Header from "@components/Header";
import HighLight from "@components/HighLight";
import Input from "@components/Input";
import ListEmpty from "@components/ListEmpty";
import PlayerCard from "@components/PlayerCard";
import React from "react";
import { Alert, FlatList } from "react-native";
import { useFocusEffect, useRoute } from "@react-navigation/native";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { groupGetTeam } from "@storage/group/groupGetTeam";
import { Group } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroup } from "@storage/player/playersGetByGroup";
import { playerGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";

type RouteParams = {
  params: {
    group: Group;
  };
};

const Players: React.FC = () => {
  const {
    params: { group },
  } = useRoute() as RouteParams;
  const [team, setTeam] = React.useState<string>("");
  const [players, setPlayers] = React.useState<PlayerStorageDTO[]>([]);
  const [newPlayer, setNewPlayer] = React.useState<string>("");

  const handleGetGroup = async () => {
    try {
      const currentGroup = await groupGetTeam(group.id);
      const parsedGroup = JSON.parse(currentGroup);
      setPlayers(parsedGroup[team]);
    } catch (error) {}
  };

  const handleAddPlayer = async () => {
    if (newPlayer.trim().length === 0) {
      return Alert.alert("Nova Pessoa", "Digite o nome da pessoa");
    } else if (team.trim().length === 0) {
      return Alert.alert("Time", "Selecione um time");
    }

    const newPlayers = {
      name: newPlayer,
      id: Math.random().toString(36).slice(2, 9),
      team,
    };

    try {
      await playerAddByGroup(newPlayers, group.id);
      fetchPlayersByTeam();
      setNewPlayer("");
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Erro", error.message);
      } else {
        Alert.alert("Erro", "Erro ao adicionar pessoa");
        console.log(error);
      }
    }
  };

  const fetchPlayersByTeam = async () => {
    try {
      const playersByTeam = await playerGetByGroupAndTeam(group.id, team);
      if (!playersByTeam) {
        return Alert.alert("Time", "Não há pessoas nesse time");
      }
      setPlayers(playersByTeam);
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Erro", error.message);
      } else {
        Alert.alert("Erro", "Erro ao buscar pessoas");
        console.log(error);
      }
    }
  };

  React.useEffect(() => {
    try {
      handleGetGroup();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Erro", error.message);
      } else {
        Alert.alert("Erro", "Erro ao buscar turmas");
        console.log(error);
      }
    }
  }, []);

  React.useEffect(() => {
    fetchPlayersByTeam();
  }, [group, team]);

  return (
    <Container>
      <Header showBackButton />

      <HighLight
        title={group.name}
        subtitle="Adicione a galera e separe os times"
      />
      <Form>
        <Input
          placeholder="Nome da Pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayer}
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => String(item)}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={team === item}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <PlayerCard name={item.name} onRemove={() => {}} />
        )}
        ListEmptyComponent={<ListEmpty message="Não há pessoas nesse time." />}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />
      <Button title="Remover Turma" type="SECONDARY" />
    </Container>
  );
};

export default Players;
