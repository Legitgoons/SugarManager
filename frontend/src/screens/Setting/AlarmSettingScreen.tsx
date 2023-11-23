import { getMyAlarm, postAlarmSave } from '@/apis';
import { DefaultScreenContainer, DefaultText } from '@/styles';
import { rHeight, showAlert, extractNumber } from '@/utils';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import React, { useState, useCallback } from 'react';
import styled from 'styled-components/native';
import DropdownItem from '@/types/dropdown';
import { PostAlarmSaveProps } from '@/types/api/request/member';
import MainFillButton from '@/components/atoms/MainFillButton';
import { Text } from 'react-native';
import alertConfig from '@/config/alertConfig';
import AlarmSettingContent from '@/components/molecules/AlarmSettingContent';
import TitleDropdown from '@/components/molecules/TitleDropdown';
import useDebounceEffect from '@/hooks/useDebounceEffect';

const AlarmSettingScreenContainer = styled(DefaultScreenContainer)`
  padding-top: ${rHeight(60)}px;
  background-color: ${({ theme }) => theme.colors.background};
  gap: ${rHeight(60)}px;
`;

const AlarmSettingTitleWrapper = styled(DefaultText)``;

const DownButtonWrapper = styled.View`
  position: absolute;
  bottom: ${rHeight(30)}px;
  align-items: center;
`;

export default function AlarmSettingScreen() {
  const queryClient = useQueryClient();
  const { normalSuccess, normalFail } = alertConfig;
  const { data } = useSuspenseQuery({
    queryKey: ['getMyAlarm'],
    queryFn: () => getMyAlarm(),
    staleTime: 1000 * 60 * 100,
    refetchOnWindowFocus: false,
  });
  const { response } = data;

  const [challengeStatus, setChallengeStatus] = useState<boolean>(
    response.alarms.find((cur: any) => cur.category === 'CHALLENGE').status
  );
  const [bloodSugarStatus, setBloodSugarStatus] = useState<boolean>(
    response.alarms.find((cur: any) => cur.category === 'BLOOD').status
  );
  const [bloodSugarHour, setBloodSugarHour] = useState<DropdownItem | null>({
    id: `${response.bloodSugarHour}시`,
    value: `${response.bloodSugarHour}시`,
  });
  const [pokeStatus, setPokeStatus] = useState<boolean>(
    response.alarms.find((cur: any) => cur.category === 'POKE').status
  );
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

  const handleSaveModifiedAlarm = async () => {
    const queryArr = [];
    if (bloodSugarHour === null) return;
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
      findAlarmStatus('BLOOD') !== bloodSugarStatus ||
      curBloodHour !== response.bloodHour
    ) {
      mutateAsync({
        category: 'BLOOD',
        status: bloodSugarStatus,
        hour: curBloodHour,
      });
    }
    const results = await Promise.allSettled(queryArr);
    const allSuccess = results.every((result) => result.status === 'fulfilled');
    if (allSuccess) {
      showAlert({
        title: normalSuccess.title('알람 수정'),
        content: normalSuccess.content('알람 수정'),
        onOk: () => {},
      });
      queryClient.invalidateQueries({ queryKey: ['getMyAlarm'] });
    } else {
      showAlert({
        title: normalFail.title('알람 수정'),
        content: normalFail.content,
        onOk: () => {},
      });
    }
  };

  useDebounceEffect({
    fn: () => {
      setIsUsable(
        findAlarmStatus('CHALLENGE') !== challengeStatus ||
          findAlarmStatus('POKE') !== pokeStatus ||
          findAlarmStatus('BLOOD') !== bloodSugarStatus ||
          Number(response.bloodSugarHour) !==
            extractNumber((bloodSugarHour as DropdownItem).id)
      );
    },
    delay: 1000,
    dependencyList: [
      challengeStatus,
      bloodSugarStatus,
      bloodSugarHour,
      pokeStatus,
      findAlarmStatus,
      response.bloodSugarHour,
    ],
  });

  if (!response || response === null) return <Text>네트워크 에러!</Text>;

  return (
    <AlarmSettingScreenContainer>
      <AlarmSettingTitleWrapper color="black" typography="h4r">
        필요한 알람을 ON/OFF 해보세요
      </AlarmSettingTitleWrapper>
      <AlarmSettingContent
        title="챌린지"
        isOn={challengeStatus}
        setIsOn={setChallengeStatus}
      />
      <AlarmSettingContent
        title="혈당"
        isOn={bloodSugarStatus}
        setIsOn={setBloodSugarStatus}
      >
        {bloodSugarStatus && (
          <TitleDropdown
            title="시간 설정"
            placeholder="시"
            list={Array.from({ length: 24 }, (_, index) => ({
              id: `${index}시`,
              value: `${index}시`,
            }))}
            selectItem={bloodSugarHour}
            setSelectItem={setBloodSugarHour}
          />
        )}
      </AlarmSettingContent>
      <AlarmSettingContent
        title="찌르기"
        isOn={pokeStatus}
        setIsOn={setPokeStatus}
      />
      <DownButtonWrapper>
        <MainFillButton
          title="저장하기"
          bgColor="b4"
          disabled={!isUsable}
          onPress={handleSaveModifiedAlarm}
        />
      </DownButtonWrapper>
    </AlarmSettingScreenContainer>
  );
}
