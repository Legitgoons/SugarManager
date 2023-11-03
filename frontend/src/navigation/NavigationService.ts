import { RootStackParam } from '@/types/navigation';
import {
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<RootStackParam>();

export function navigate(name: keyof RootStackParam) {
  if (navigationRef.isReady()) {
    navigationRef?.navigate(name);
  }
}

export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}

export function push(name: keyof RootStackParam) {
  if (navigationRef.isReady()) {
    const action = StackActions.push(name);
    navigationRef.dispatch(action);
  }
}
