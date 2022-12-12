import React from "react";
import logoImg from "@assets/logo.png";
import { Container, Logo, BackIcon, BackButton } from "./styles";
import { useNavigation } from "@react-navigation/native";

type Props = {
  showBackButton?: boolean;
};

const Header: React.FC<Props> = ({ showBackButton = false }) => {
  const { navigate } = useNavigation();
  const handleGoBack = () => {
    navigate("groups");
  };
  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={handleGoBack}>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={logoImg} />
    </Container>
  );
};

export default Header;
