import weekDayArr from '@/config/weekConfig';

interface GetMonthObjProps {
  year: number;
  month: number;
  monthStatus: Record<string, boolean>;
}

function format8Date(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}${month}${day}`;
}

function getMonthObj({ year, month, monthStatus }: GetMonthObjProps) {
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
      isMarked: monthStatus[format8Date(day)],
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

export default getMonthObj;
