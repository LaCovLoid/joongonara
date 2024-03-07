export const addPriceComma = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const calcTimestamp = (value: number) => {
  let result:string = "";
  const now:Date = new Date();
  const difference:number =  now.getTime() - Number(value);

  const minute:number = Math.trunc(difference / (120 * 30 * 24));
  const hour:number = Math.trunc(minute / 60);

  if (hour) result = String(hour) + "시간 " + String(minute % 60) + "분 전";
  else result = String(minute) + "분 전";
  
  return result;
}