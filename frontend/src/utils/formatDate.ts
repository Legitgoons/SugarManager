export function padNumber(num: number) {
  return `${num.toString().padStart(2, '0')}`;
}

export function formatToApiDateTime(date: Date) {
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  const hour = `0${date.getHours()}`.slice(-2);
  const minute = `0${date.getMinutes()}`.slice(-2);

  return `${year}-${month}-${day} ${hour}:${minute}`;
}

export function periodDate(date: Date) {
  const month = padNumber(date.getMonth() + 1);
  const day = padNumber(date.getDate());
  return `${date.getFullYear()}-${month}-${day}`;
}

export function formatToMonthDay(time: string) {
  const date = new Date(time);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${padNumber(month)}/${padNumber(day)}`;
}

export function formatToTime(time: string) {
  const date = new Date(time);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${padNumber(hours)}:${padNumber(minutes)}`;
}
