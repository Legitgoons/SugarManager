import { ColorType } from '@/styles/theme';

interface DefaultPressableProps {
  bgColor?: keyof ColorType;
  borderColor?: string;
  onPress?: () => void;
  title?: string | number;
}

export default DefaultPressableProps;
