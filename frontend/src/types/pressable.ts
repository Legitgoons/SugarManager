import { ColorType } from '@/styles/theme';

interface DefaultPressableProps {
  bgColor?: keyof ColorType;
  borderColor?: keyof ColorType;
  onPress?: () => void;
  title?: string | number;
}

export default DefaultPressableProps;
