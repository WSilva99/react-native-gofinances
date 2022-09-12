import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';
import { Button, ButtonText, IconContainer } from './styles';

interface SignInButtonProps extends RectButtonProps {
  text: string;
  // icon: React.FC<SvgProps>
  icon: React.ReactNode;
}

export function SignInButton({text, icon, ...props}: SignInButtonProps) {
  return (
    <Button {...props}>
      <IconContainer>
        {icon}
      </IconContainer>
      <ButtonText>
        {text}
      </ButtonText>
    </Button>
  )
}