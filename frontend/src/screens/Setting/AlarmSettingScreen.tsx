import { getMyAlarm, postAlarmSave } from '@/apis';
import MainSwitch from '@/components/atoms/MainSwitch';
import Dropdown from '@/components/molecules/Dropdown';
import { DefaultScreenContainer, DefaultText } from '@/styles';
import { rHeight, rWidth, showAlert } from '@/utils';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components/native';
import DropdownItem from '@/types/dropdown';
import debounce from '@/utils/debounce';
import { PostAlarmSaveProps } from '@/types/api/request/member';
import MainFillButton from '@/components/atoms/MainFillButton';
import { Text } from 'react-native';
import extractNumber from '../../utils/number';

const AlarmSettingScreenContainer = styled(DefaultScreenContainer)`
  background-color: ${({ theme }) => theme.colors.background};
  gap: ${rHeight(60)}px;
`;

const AlarmSettingTitleWrapper = styled(DefaultText)``;
const AlarmContentBox = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${rHeight(20)}px;
`;

const AlarmContentWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${rWidth(320)}px;
`;

const AlarmContentHeaderTitle = styled(DefaultText)``;

export default function AlarmSettingScreen() {
  const { data } = useSuspenseQuery({
    queryKey: ['getMyAlarm'],
    queryFn: () => getMyAlarm(),
    staleTime: 1000 * 60 * 100,
    refetchOnWindowFocus: false,
  });
  const { response } = data;

  const [challengeStatus, setChallengeStatus] = useState<boolean>(
    response.alarms.CHALLENGE
  );
  const [bloodSugarStatus, setBloodSugarStatus] = useState<boolean>(
    response.alarms.BLOODSUGAR
  );
  const [bloodSugarHour, setBloodSugarHour] = useState<DropdownItem>({
    id: `${response.bloodHour}시`,
    value: `${response.bloodHour}시`,
  });
  const [pokeStatus, setPokeStatus] = useState<boolean>(response.alarms.POKE);
  const [isUsable, setIsUsable] = useState(false);

  const { mutateAsync } = useMutation({
    mutationFn: (body: PostAlarmSaveProps) => postAlarmSave(body),
  });

  const findAlarmStatus = useCallback(
    (category: string) =>
      response.alarms.find(
        (alarm: PostAlarmSaveProps) => alarm.category === category
      )?.status || false,
    [response.alarms]
  );

  const handleSaveModifiedAlarm = () => {
    const queryArr = [];
    const curBloodHour = extractNumber(bloodSugarHour.id);
    if (findAlarmStatus('CHALLENGE') !== challengeStatus) {
      queryArr.push(
        mutateAsync({
          category: 'CHALLENGE',
          status: challengeStatus,
          hour: null,
        })
      );
    }
    if (findAlarmStatus('POKE') !== challengeStatus) {
      mutateAsync({
        category: 'POKE',
        status: pokeStatus,
        hour: null,
      });
    }
    if (
      findAlarmStatus('BLOODSUGAR') !== bloodSugarStatus ||
      curBloodHour !== response.bloodHour
    ) {
      mutateAsync({
        category: 'BLOODSUGAR',
        status: bloodSugarStatus,
        hour: curBloodHour,
      });
    }
    Promise.allSettled(queryArr);
    showAlert({
      title: '수정 성공',
      content: '수정 내용을 저장했습니다.',
      onOk: () => {},
    });
  };

  useEffect(() => {
    debounce(() => {
      setIsUsable(
        findAlarmStatus('CHALLENGE') !== challengeStatus ||
          findAlarmStatus('POKE') !== pokeStatus ||
          findAlarmStatus('BLOODSUGAR') !== bloodSugarStatus ||
          Number(response.bloodHour) !== extractNumber(bloodSugarHour.id)
      );
    }, 1000);
  }, [
    challengeStatus,
    bloodSugarStatus,
    bloodSugarHour,
    pokeStatus,
    findAlarmStatus,
    response.bloodHour,
  ]);

  if (!response || response === null) return <Text>네트워크 에러!</Text>;

  return (
    <AlarmSettingScreenContainer>
      <AlarmSettingTitleWrapper color="black" typography="h4r">
        필요한 알람을 ON/OFF 해보세요
      </AlarmSettingTitleWrapper>
      <AlarmContentBox>
        <AlarmContentWrapper>
          <AlarmContentHeaderTitle typography="h4b" color="black">
            챌린지
          </AlarmContentHeaderTitle>
          <MainSwitch isOn={challengeStatus} setIsOn={setChallengeStatus} />
        </AlarmContentWrapper>
      </AlarmContentBox>
      <AlarmContentBox>
        <AlarmContentWrapper>
          <AlarmContentHeaderTitle typography="h4b" color="black">
            혈당
          </AlarmContentHeaderTitle>
          <MainSwitch isOn={bloodSugarStatus} setIsOn={setBloodSugarStatus} />
        </AlarmContentWrapper>
        {bloodSugarStatus && (
          <>
            <DefaultText color="black" typography="h4r">
              시간 설정
            </DefaultText>
            <Dropdown
              placeholder="시"
              list={Array.from({ length: 24 }, (_, index) => ({
                id: `${index}시`,
                value: `${index}시`,
              }))}
              selectItem={bloodSugarHour}
              setSelectItem={setBloodSugarHour}
            />
          </>
        )}
      </AlarmContentBox>
      <AlarmContentBox>
        <AlarmContentWrapper>
          <AlarmContentHeaderTitle typography="h4b" color="black">
            찌르기
          </AlarmContentHeaderTitle>
          <MainSwitch isOn={pokeStatus} setIsOn={setPokeStatus} />
        </AlarmContentWrapper>
      </AlarmContentBox>
      <MainFillButton
        title="저장하기"
        bgColor="b4"
        onPress={isUsable ? handleSaveModifiedAlarm : undefined}
      />
    </AlarmSettingScreenContainer>
  );
}
