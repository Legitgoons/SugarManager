import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { getPeriodBloodSugar } from '@/apis/bloodSugar';
import { BloodSugarPeriodResponseData } from '@/types/api/response/bloodSugar';
import { useSelector, useDispatch } from 'react-redux';
import { selectNavigation } from '@/redux/slice/navigationSlice';
import useRouter from '@/hooks/useRouter';
import BloodSugarContentCard from '@/components/organisms/BloodSugarContentCard';
import DatePickerController from '@/components/organisms/DatePickerController';
import MainFillButton from '@/components/atoms/MainFillButton';
import { rWidth } from '@/utils';
import TwinLineGraph from '@/components/molecules/TwinLineGraph';
import { setTime } from '@/redux/slice/bloodSugarSlice';
import { formatToMonthDay } from '@/utils/formatDate';
import getRoundOrNull from '@/utils/getRoundOrNull';
import useSafeDate from '@/hooks/useSafeDate';
import useScroll from '@/hooks/useScroll';

const Container = styled.View`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 10%;
  background-color: ${({ theme }) => theme.colors.background};
`;

const DatePickerControllerWrapper = styled.View`
  width: ${rWidth(320)}px;
`;

const CardWrapper = styled.View`
  width: ${rWidth(320)}px;
  padding-top: ${rWidth(20)}px;
`;

const FillButtonWrapper = styled.View`
  width: ${rWidth(320)}px;
  position: absolute;
  bottom: 52px;
  width: 100%;
  align-items: center;
`;

export default function BloodSugarScreen() {
  const { startDate, endDate, setStartDateSafe, setEndDateSafe } =
    useSafeDate();
  const { nickname } = useSelector(selectNavigation);
  const [bloodSugarData, setBloodSugarData] = useState<
    BloodSugarPeriodResponseData[]
  >([]);
  const [page, setPage] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const { isTop, handleScroll } = useScroll();
  const router = useRouter();
  const dispatch = useDispatch();

  const getBloodSugarData = useCallback(async () => {
    const data = await getPeriodBloodSugar({
      nickname,
      startDate,
      endDate,
      page,
    });
    if (data.response.length === 0) {
      setIsEnd(true);
    } else {
      setBloodSugarData((prevData) => [...prevData, ...data.response]);
    }
  }, [nickname, startDate, endDate, page]);

  useEffect(() => {
    setBloodSugarData([]);
    setPage(0);
    setIsEnd(false);
  }, [nickname, startDate, endDate]);

  useEffect(() => {
    getBloodSugarData();
  }, [getBloodSugarData]);

  const bloodSugarGraphList = useMemo(
    () =>
      bloodSugarData.map(({ bloodSugarBefore, bloodSugarAfter, time }) => [
        time,
        bloodSugarBefore,
        bloodSugarAfter,
      ]),
    [bloodSugarData]
  );

  return (
    <Container>
      <TwinLineGraph list={bloodSugarGraphList} />
      <FlatList
        onScroll={(event) => handleScroll(event, isEnd, setPage)}
        data={bloodSugarData}
        ListHeaderComponent={
          <DatePickerControllerWrapper>
            <DatePickerController
              startDate={startDate}
              setStartDate={setStartDateSafe}
              endDate={endDate}
              setEndDate={setEndDateSafe}
            />
          </DatePickerControllerWrapper>
        }
        keyExtractor={(item) => item.time}
        renderItem={({
          item: {
            count,
            time,
            bloodSugarBefore,
            bloodSugarAfter,
            bloodSugarBeforeStatus,
            bloodSugarAfterStatus,
          },
        }) => (
          <CardWrapper key={time}>
            <BloodSugarContentCard
              onPress={() => {
                dispatch(setTime(time));
                router.navigate('BloodSugarDetail');
              }}
              size="lg"
              key={time}
              date={formatToMonthDay(time)}
              count={count}
              beforeNum={getRoundOrNull(bloodSugarBefore)}
              beforeType={bloodSugarBeforeStatus}
              afterNum={getRoundOrNull(bloodSugarAfter)}
              afterType={bloodSugarAfterStatus}
            />
          </CardWrapper>
        )}
      />
      {isTop && (
        <FillButtonWrapper>
          <MainFillButton
            bgColor="b4"
            title="혈당 등록하기"
            onPress={() => {
              router.navigate('BloodSugarWrite');
            }}
          />
        </FillButtonWrapper>
      )}
    </Container>
  );
}
