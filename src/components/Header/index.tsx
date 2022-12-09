import React from "react";
import logoImg from "@assets/logo.png";
import { Container, Logo, BackIcon, BackButton } from "./styles";

type Props = {
  showBackButton?: boolean;
};

const Header: React.FC<Props> = ({ showBackButton = false }) => {
  return (
    <Container>
      {showBackButton && (
        <BackButton>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={logoImg} />
    </Container>
  );
};

export default Header;
