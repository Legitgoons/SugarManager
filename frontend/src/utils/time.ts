/* eslint-disable no-param-reassign */
import weekDayArr from '@/config/weekConfig';
import { padNumber } from './formatDate';

interface GetMonthObjProps {
  year: number;
  month: number;
  monthStatus: [];
}

function format8Date(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString();
  const day = date.getDate().toString();

  return `${year}-${month}-${day}`;
}

function getMonthObj({ year, month, monthStatus }: GetMonthObjProps) {
  if (!monthStatus || typeof monthStatus !== 'object') {
    monthStatus = [];
  }
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);

  const monthInfo = [];
  let weekInfo = [];

  for (
    let day = new Date(firstDay);
    day <= lastDay;
    day.setDate(day.getDate() + 1)
  ) {
    const numberDay = day.getDate();
    const weekDay = weekDayArr[day.getDay()];

    weekInfo.push({
      numberDay,
      weekDay,
      isMarked:
        monthStatus !== undefined
          ? monthStatus.find((cur) => format8Date(day) === cur) !== undefined
          : false,
    });

    if (day.getDay() === 6) {
      monthInfo.push(weekInfo);
      weekInfo = [];
    }
  }

  if (weekInfo.length > 0) {
    monthInfo.push(weekInfo);
  }

  monthInfo.forEach((week) => {
    const firstNumberDay = week[0].numberDay;
    while (week.length < 7) {
      if (firstNumberDay === 1) {
        week.unshift({ numberDay: 0, weekDay: ' ', isMarked: false });
      } else {
        week.push({ numberDay: 0, weekDay: ' ', isMarked: false });
      }
    }
  });

  if (monthInfo.length === 5) {
    const arr = [];
    for (let i = 0; i < 7; i += 1) {
      arr.push({ numberDay: 0, weekDay: ' ', isMarked: false });
    }
    monthInfo.push(arr);
  }

  return monthInfo;
}

function getTimeSecondText(hour: number, minute: number) {
  const hourText = padNumber(hour);
  const minuteText = padNumber(minute);

  return `${hourText}:${minuteText}`;
}
export { getMonthObj, getTimeSecondText };
