import React from "react";

import { Container, Icon } from "./styles";
import { TouchableOpacityProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Props = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap;
  type?: string;
};

const ButtonIcon: React.FC<Props> = ({ icon, type = "PRIMARY", ...rest }) => {
  return (
    <Container {...rest}>
      <Icon name={icon} type={type} />
    </Container>
  );
};

export default ButtonIcon;
