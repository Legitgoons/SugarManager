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
  foodMineral: number;
  foodFat: number;
  foodSalt: number;
  foodSugars: number;
}
