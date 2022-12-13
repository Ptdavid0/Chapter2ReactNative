import Button from "@components/Button";
import ButtonIcon from "@components/ButtonIcon";
import Filter from "@components/Filter";
import Header from "@components/Header";
import HighLight from "@components/HighLight";
import Input from "@components/Input";
import ListEmpty from "@components/ListEmpty";
import PlayerCard from "@components/PlayerCard";
import React from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { Group } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playerGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveById } from "@storage/group/groupRemoveById";

type RouteParams = {
  params: {
    group: Group;
  };
};

const Players: React.FC = () => {
  const {
    params: { group },
  } = useRoute() as RouteParams;
  const [team, setTeam] = React.useState<string>("Time A");
  const [players, setPlayers] = React.useState<PlayerStorageDTO[]>([]);
  const [newPlayer, setNewPlayer] = React.useState<string>("");
  const { navigate } = useNavigation();

  const newPlayerInputRef = React.useRef<TextInput>(null);

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
      newPlayerInputRef.current?.blur();
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

  const handleRemovePlayer = async (playerId: string) => {
    try {
      await playerRemoveByGroup(group, playerId);
      fetchPlayersByTeam();
    } catch (error) {
      Alert.alert("Remover Pessoa", "Erro ao remover pessoa");
      console.log(error);
    }
  };

  const handleGroupRemove = () => {
    Alert.alert("Remover", "Deseja remover o grupo ?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => removeGroup(),
      },
    ]);
  };

  const removeGroup = async () => {
    try {
      await groupRemoveById(group.id);
      navigate("groups");
    } catch (error) {
      Alert.alert("Remover Grupo", "Erro ao remover grupo");
      console.log(error);
    }
  };

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
          inputRef={newPlayerInputRef}
          placeholder="Nome da Pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayer}
          value={newPlayer}
          onSubmitEditing={handleAddPlayer}
          // Change the keyboard type to "Send" when the user is typing the name
          returnKeyType="send"
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
          <PlayerCard
            name={item.name}
            onRemove={() => handleRemovePlayer(item.id)}
          />
        )}
        ListEmptyComponent={<ListEmpty message="Não há pessoas nesse time." />}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />
      <Button
        title="Remover turma"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />
    </Container>
  );
};

export default Players;
