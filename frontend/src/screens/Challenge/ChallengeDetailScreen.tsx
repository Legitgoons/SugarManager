import React from 'react';
import styled from 'styled-components/native';
import { DefaultScreenContainer, DefaultText } from '@/styles';
import { rHeight, rWidth } from '@/utils';
import MultiSelect from '@/components/molecules/MultiSelect';
import Week from '@/types/week';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getChallengeDetail } from '@/apis/challenge';
import { useSelector } from 'react-redux';
import InputLine from '@/components/molecules/InputLine';
import { useRoute, RouteProp } from '@react-navigation/native';
import { selectNavigation } from '@/redux/slice/navigationSlice';
import weekDayArr from '@/config/weekConfig';

const ChallengeSquareWrapper = styled.View`
  border-width: 1px;
  width: ${rWidth(120)}px;
  height: ${rHeight(40)}px;
  border-color: ${(props) => props.theme.colors.secondary};
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ChallengeDetailScreenContainer = styled(DefaultScreenContainer)`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${rHeight(40)}px ${rWidth(35)}px ${rHeight(42)}px;
  position: relative;
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
  justify-content: flex-start;
  flex-direction: row;
  width: ${rWidth(320)}px;
`;
const ChallengeAlramTimeWrapper = styled.View`
  width: ${rWidth(320)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default function ChallengeDetailScreen() {
  let daysObj = {};
  const route =
    useRoute<RouteProp<{ params: { challengePk: number } }, 'params'>>();
  const { challengePk } = route.params;
  const { nickname } = useSelector(selectNavigation);
  const { data } = useSuspenseQuery({
    queryKey: ['getChallengeDetail', nickname, challengePk],
    queryFn: () => getChallengeDetail({ challengePk, nickname }),
  });

  const { response } = data;
  if (response && response !== null && response.days) {
    daysObj = weekDayArr.reduce(
      (acc, cur) => {
        acc[cur as Week] = (response.days as Week[]).includes(cur as Week);
        return acc;
      },
      {} as Record<Week, boolean>
    );
  }
  return (
    <ChallengeDetailScreenContainer>
      <ContentBox>
        <ChallengeTypeWrapper>
          <ChallengeTypeTitle color="black" typography="h4b">
            종류
          </ChallengeTypeTitle>
          <ChallengeSquareWrapper>
            <DefaultText typography="p2r" color="black">
              {response
                ? ((type) => {
                    switch (type) {
                      case 'CUSTOM':
                        return '기타';
                      case 'WALK':
                        return '만보기';
                      case 'CHECK':
                        return '횟수체크';
                      default:
                        return '알 수 없음';
                    }
                  })(response.type)
                : '서버에러'}
            </DefaultText>
          </ChallengeSquareWrapper>
        </ChallengeTypeWrapper>
        <InputLine
          placeholder="챌린지 타이틀"
          value={response?.title || '서버 에러!'}
          editable={false}
          width={rWidth(320)}
        />
        <InputLine
          placeholder="목표 횟수를 작성해주세요!"
          value={response?.goal || '서버 에러!'}
          keyboardType="numeric"
          editable={false}
          width={rWidth(320)}
        />
        {response && response.alert && (
          <>
            <ChallengeAlarmOpenWrapper>
              <ChallengeAlarmTitle typography="h4r" color="black">
                설정된 알람
              </ChallengeAlarmTitle>
            </ChallengeAlarmOpenWrapper>
            <ChallengeAlramTimeWrapper>
              <ChallengeSquareWrapper>
                <DefaultText typography="p2r" color="black">
                  {response.hour}시
                </DefaultText>
              </ChallengeSquareWrapper>
              <ChallengeSquareWrapper>
                <DefaultText typography="p2r" color="black">
                  {response.hour}분
                </DefaultText>
              </ChallengeSquareWrapper>
            </ChallengeAlramTimeWrapper>
            <MultiSelect subject="시작시간" items={daysObj} />
          </>
        )}
      </ContentBox>
    </ChallengeDetailScreenContainer>
  );
}
