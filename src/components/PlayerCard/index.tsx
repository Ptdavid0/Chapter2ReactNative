import ButtonIcon from "@components/ButtonIcon";
import React from "react";
import { Container, Icon, Name } from "./styles";

type Props = {
  name: string;
  onRemove: () => void;
};

const PlayerCard: React.FC<Props> = ({ name, onRemove }) => {
  return (
    <Container>
      <Icon name="person" />

      <Name>{name}</Name>

      <ButtonIcon icon="close" type="SECUNDARY" onPress={onRemove} />
    </Container>
  );
};

export default PlayerCard;
