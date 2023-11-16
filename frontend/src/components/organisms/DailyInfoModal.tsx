/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unused-prop-types */
import { getTimelineDetail } from '@/apis/timeline';
import { selectNavigation } from '@/redux/slice/navigationSlice';
import { DefaultScreenContainer, DefaultText } from '@/styles';
import { rHeight, rWidth } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import HeartIcon from '@/assets/img/heart.svg';
import CrownIcon from '@/assets/img/crown.svg';
import EyedropperIcon from '@/assets/img/eyedropper.svg';
import IconText from '../atoms/IconText';
import DailyInfoContentCard from '../molecules/DailyInfoContentCard';

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

const ContentContainer = styled(DefaultScreenContainer)`
  padding-top: ${rHeight(20)}px;
  justify-content: center;
  gap: ${rHeight(16)}px;
`;
const IconTextGroup = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${rWidth(8)}px;
  justify-content: center;
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

  if (isLoading || !data) return null;
  const { response } = data;

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
                <ContentContainer>
                  <View>
                    <IconTextGroup>
                      <IconText Icon={HeartIcon} text="혈당 측정" />
                      <IconText Icon={EyedropperIcon} text="식사 분석" />
                      <IconText Icon={CrownIcon} text="챌린지" />
                    </IconTextGroup>
                    <DefaultText typography="captionr" color="secondary">
                      기록을 누르면 상세 페이지로 이동 할 수 있어요!
                    </DefaultText>
                  </View>
                  {response.map(
                    (
                      {
                        hour,
                        minute,
                        category,
                        content,
                      }: {
                        hour: number;
                        minute: number;
                        category: string;
                        content: string;
                      },
                      idx: number
                    ) => (
                      <DailyInfoContentCard
                        key={`${hour}${minute}${category}${content}${idx}`}
                        hour={hour}
                        minute={minute}
                        category={category}
                        content={content}
                      />
                    )
                  )}
                </ContentContainer>
              </ScrollView>
            </ModalContent>
          </TouchableWithoutFeedback>
        </ModalOverlay>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default DailyInfoModal;
