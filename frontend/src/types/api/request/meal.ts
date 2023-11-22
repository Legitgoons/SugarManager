export interface foodNutrients {
  nutrientsPk: number;
  nutrientsName: string;
  nutrientsFrom: string;
  nutrientsAmount: number;
  nutrientsUnit: string;
  nutrientsKcal: number;
  nutrientsProtein: number;
  nutrientsFat: number;
  nutrientsCh: number;
  nutrientsSugar: number;
  nutrientsOrg: string;
}

export interface MealSave {
  foodName: string;
  foodCal: number;
  foodGrams: number;
  foodCarbohydrate: number;
  foodProtein: number;
  foodDietaryFiber: number;
  foodVitamin: number;
  foodFat: number;
  foodSalt: number;
  foodSugars: number;
}

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
