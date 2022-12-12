import React from "react";

import { Container, Message } from "./styles";

interface Props {
  message: string;
}

const ListEmpty: React.FC<Props> = ({ message }) => {
  return (
    <Container>
      <Message>{message}</Message>
    </Container>
  );
};

export default ListEmpty;
