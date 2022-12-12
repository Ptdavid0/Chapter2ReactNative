import Button from "@components/Button";
import ButtonIcon from "@components/ButtonIcon";
import Filter from "@components/Filter";
import Header from "@components/Header";
import HighLight from "@components/HighLight";
import Input from "@components/Input";
import ListEmpty from "@components/ListEmpty";
import PlayerCard from "@components/PlayerCard";
import React from "react";
import { FlatList } from "react-native";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

const Players: React.FC = () => {
  const [team, setTeam] = React.useState<string>("Time A");
  const [players, setPlayers] = React.useState<string[]>([
    "João",
    "Maria",
    "José",
    "Ana",
    "Pedro",
    "Paulo",
    "Joaquim",
    "Luna",
  ]);
  return (
    <Container>
      <Header showBackButton />

      <HighLight
        title="Nome da Turma"
        subtitle="Adicione a galera e separe os times"
      />
      <Form>
        <Input placeholder="Nome da Pessoa" autoCorrect={false} />
        <ButtonIcon icon="add" />
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
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => {}} />
        )}
        ListEmptyComponent={<ListEmpty message="Não há pessoas nesse time." />}
        showsVerticalScrollIndicator={false}
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
