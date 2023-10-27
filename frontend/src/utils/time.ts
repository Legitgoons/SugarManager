import weekDayArr from '@/config/weekConfig';

function getMonthObj(year: number, month: number) {
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

    weekInfo.push({ numberDay, weekDay });

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
        week.unshift({ numberDay: 0, weekDay: '' });
      } else {
        week.push({ numberDay: 0, weekDay: '' });
      }
    }
  });

  if (monthInfo.length === 5) {
    const arr = new Array(7);
    arr.forEach((cur, i) => {
      arr[i] = { numberDay: 0, weekDay: '' };
    });
    monthInfo.push(arr);
  }

  return monthInfo;
}
export default getMonthObj;
