export interface PeriodMealData {
  dayFoodCal: number;
  dayFoodSugars: number | null;
  dayFoodProtein: number | null;
  dayFoodCarbohydrate: number | null;
  dayFoodFat: number | null;
  time: string;
}

export interface PeriodResponseData {
  success: boolean;
  response: PeriodMealData[];
  error: any;
}
