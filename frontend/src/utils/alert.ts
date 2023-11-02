import { Alert, AlertButton } from 'react-native';

interface ShowAlertProps {
  title: string;
  content: string;
  onOk?: () => void;
  onCancel?: () => void;
}

const showAlert = ({ title, content, onOk, onCancel }: ShowAlertProps) => {
  const buttonArr: AlertButton[] = [];
  if (onCancel)
    buttonArr.push({
      text: '취소',
      onPress: onCancel,
      style: 'cancel',
    });
  if (onOk) buttonArr.push({ text: '확인', onPress: onOk });

  Alert.alert(title, content, [...buttonArr]);
};

export default showAlert;
