import { RootStackParam, HomeDropdownParam } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function useRouter<
  T extends RootStackParam & HomeDropdownParam,
>() {
  const navigation = useNavigation<NativeStackNavigationProp<T>>();
  return navigation;
}
