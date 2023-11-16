import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import styled from 'styled-components/native';
import { DefaultScreenContainer, DefaultText } from '@/styles';
import { rHeight, rWidth, showAlert } from '@/utils';
import Dropdown from '@/components/molecules/Dropdown';
import MainSwitch from '@/components/atoms/MainSwitch';
import MultiSelect from '@/components/molecules/MultiSelect';
import Week from '@/types/week';
import MainFillButton from '@/components/atoms/MainFillButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postChallengeAdd } from '@/apis/challenge';
import { useSelector } from 'react-redux';
import useRouter from '@/hooks/useRouter';
import InputLine from '@/components/molecules/InputLine';
import { selectUser } from '@/redux/slice/userSlice';
import {
  PostChallengeAddProps,
  ChallengeTypeEnum,
} from '@/types/api/request/challenge';
import extractNumber from '../../utils/number';
import DropdownItem from '../../types/dropdown';

const ChallengeMakeScreenContainer = styled(DefaultScreenContainer)`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${rHeight(40)}px ${rWidth(35)}px ${rHeight(42)}px;
  position: relative;
`;

const DownButtonWrapper = styled.View`
  position: absolute;
  bottom: ${rHeight(30)}px;
  align-items: center;
`;

const ContentBox = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${rHeight(20)}px;
`;
const ChallengeTypeWrapper = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: ${rWidth(320)}px;
`;
const ChallengeTypeTitle = styled(DefaultText)``;
const ChallengeAlarmTitle = styled(DefaultText)``;
const ChallengeAlarmOpenWrapper = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: ${rWidth(320)}px;
`;
const ChallengeAlramTimeWrapper = styled.View`
  width: ${rWidth(320)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export default function ChallengeMakeScreen() {
  const { uid, nickname } = useSelector(selectUser);
  const queryClient = useQueryClient();
  const router = useRouter();
  const [challengeType, setChallengeType] = useState<{
    id: string;
    value: string;
  } | null>(null);
  const [challengeTitle, setChallengeTitle] = useState('');
  const [challengeCount, setChallengeCount] = useState(0);
  const [isOpenAlarm, setIsOpenAlarm] = useState(false);
  const [alarmWeek, setAlarmWeek] = useState<Record<Week, boolean>>({
    일: false,
    월: false,
    화: false,
    수: false,
    목: false,
    금: false,
    토: false,
  });
  const [alarmHour, setAlarmHour] = useState<DropdownItem | null>(null);
  const [alarmMinute, setAlarmMinute] = useState<DropdownItem | null>(null);
  const getAlertWeekDays = (): Week[] =>
    (Object.keys(alarmWeek) as Week[]).filter((cur: Week) => alarmWeek[cur]);

  const mutation = useMutation({
    mutationFn: (body: PostChallengeAddProps) => postChallengeAdd(body),
  });

  useEffect(() => {
    if (!isOpenAlarm) {
      setAlarmWeek({
        일: false,
        월: false,
        화: false,
        수: false,
        목: false,
        금: false,
        토: false,
      });
      setAlarmHour(null);
      setAlarmMinute(null);
    }
  }, [isOpenAlarm]);

  const handleAddChallenge = () => {
    if (challengeTitle.length === 0) {
      showAlert({
        title: '등록 실패',
        content: '알람의 제목을 작성해주세요.',
        onOk: () => {},
      });
      return;
    }
    if (!challengeCount || challengeCount <= 0) {
      showAlert({
        title: '등록 실패',
        content: '알람의 목표치를 제대로 입력해주세요',
        onOk: () => {},
      });
      return;
    }

    if (isOpenAlarm) {
      if (alarmHour === null || alarmMinute === null) {
        showAlert({
          title: '등록 실패',
          content: '알람의 목표치를 제대로 입력해주세요',
          onOk: () => {},
        });
        return;
      }
      if (getAlertWeekDays().length === 0) {
        showAlert({
          title: '등록 실패',
          content: '알람의 목표치를 제대로 입력해주세요',
          onOk: () => {},
        });
        return;
      }
    }

    mutation.mutate(
      {
        title: challengeTitle,
        goal: challengeCount,
        type: challengeType
          ? (challengeType.id as ChallengeTypeEnum)
          : 'CUSTOM',
        alert: isOpenAlarm,
        hour: alarmHour ? extractNumber(alarmHour.id) : 0,
        minute: alarmMinute ? extractNumber(alarmMinute.id) : 0,
        days: getAlertWeekDays(),
        userPk: uid,
      },
      {
        onSuccess() {
          queryClient.invalidateQueries({
            queryKey: ['getChallengeList', nickname],
          });
          showAlert({
            title: '등록 성공',
            content: '챌린지 등록에 성공했습니다!',
            onOk: () => {
              router.navigate('ChallengeInfo');
            },
          });
        },
        onError() {
          showAlert({
            title: '등록 실패',
            content: '다시 시도해주세요',
            onOk: () => {},
          });
        },
      }
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ChallengeMakeScreenContainer>
        <ContentBox>
          <ChallengeTypeWrapper>
            <ChallengeTypeTitle color="black" typography="h4b">
              종류
            </ChallengeTypeTitle>
            <Dropdown
              placeholder="선택하기"
              list={[
                { id: 'CUSTOM', value: '기타' },
                { id: 'WALK', value: '만보기' },
                { id: 'CHECK', value: '횟수체크' },
              ]}
              selectItem={challengeType}
              setSelectItem={setChallengeType}
            />
          </ChallengeTypeWrapper>
          <InputLine
            placeholder="챌린지의 제목을 작성해주세요!"
            value={challengeTitle}
            onChangeText={setChallengeTitle}
            width={rWidth(320)}
          />
          <InputLine
            placeholder="목표 횟수를 작성해주세요!"
            value={challengeCount}
            onChangeText={setChallengeCount}
            keyboardType="numeric"
            width={rWidth(320)}
          />
          <ChallengeAlarmOpenWrapper>
            <ChallengeAlarmTitle typography="h4r" color="black">
              알람 여부
            </ChallengeAlarmTitle>
            <MainSwitch isOn={isOpenAlarm} setIsOn={setIsOpenAlarm} />
          </ChallengeAlarmOpenWrapper>
          {isOpenAlarm && (
            <>
              <ChallengeAlramTimeWrapper>
                <Dropdown
                  placeholder="시"
                  list={Array.from({ length: 24 }, (_, index) => ({
                    id: `${index}시`,
                    value: `${index}시`,
                  }))}
                  selectItem={alarmHour}
                  setSelectItem={setAlarmHour}
                />
                <Dropdown
                  placeholder="분"
                  list={Array.from({ length: 60 }, (_, index) => ({
                    id: `${index}분`,
                    value: `${index}분`,
                  }))}
                  selectItem={alarmMinute}
                  setSelectItem={setAlarmMinute}
                />
              </ChallengeAlramTimeWrapper>
              <MultiSelect
                subject="시작시간"
                items={alarmWeek}
                setItems={setAlarmWeek}
              />
            </>
          )}
        </ContentBox>
        <DownButtonWrapper>
          <MainFillButton
            title="챌린지 생성하기"
            bgColor="b4"
            onPress={handleAddChallenge}
          />
        </DownButtonWrapper>
      </ChallengeMakeScreenContainer>
    </KeyboardAvoidingView>
  );
}
