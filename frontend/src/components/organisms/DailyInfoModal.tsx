import { getTimelineDetail } from '@/apis/timeline';
import { selectNavigation } from '@/redux/slice/navigationSlice';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

const ModalOverlay = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const ModalContent = styled.View`
  height: 80%;
  background-color: white;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  overflow: hidden;
`;

interface DailyInfoModalProps {
  isOpen: boolean;
  handleClose: () => void;
  time: {
    year: number;
    month: number;
    day: number;
  };
}
function DailyInfoModal({ isOpen, handleClose, time }: DailyInfoModalProps) {
  const { nickname } = useSelector(selectNavigation);
  const { year, month, day } = time;
  const { data, isLoading } = useQuery({
    queryKey: ['getTimelineDetail', nickname, time],
    queryFn: () => getTimelineDetail({ nickname, year, month, day }),
    enabled: day > 0 && isOpen,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return null;
  console.log(data);

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isOpen}
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <ModalOverlay>
          <TouchableWithoutFeedback>
            <ModalContent>
              <ScrollView>
                <Text>12345</Text>
              </ScrollView>
            </ModalContent>
          </TouchableWithoutFeedback>
        </ModalOverlay>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default DailyInfoModal;
