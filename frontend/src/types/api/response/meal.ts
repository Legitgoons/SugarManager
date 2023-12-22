import { ColorSquareType } from '@/types/colorSquare';

export interface MealPeriodResponseData {
  dayFoodCal: number;
  dayFoodSugars: number | null;
  dayFoodProtein: number | null;
  dayFoodCarbohydrate: number | null;
  dayFoodFat: number | null;
  time: string;
}

export interface MealPeriodApiResponse {
  success: boolean;
  response: MealPeriodResponseData[];
  error: any;
}

export interface Meals {
  menuPk: number;
  foodCal: number;
  foodSugars: number;
  foodProtein: number;
  foodCarbohydrate: number | null;
  foodFat: number;
  registedAt: string;
}

export interface MealDailyResponseData {
  daySugars: number;
  menuPreviews: Meals[];
}

export interface MealDailyApiResponse {
  success: boolean;
  response: Response;
  error: any;
}

export interface MenuImage {
  menuImagePk: string;
  menuImageUrl: string;
}

export interface BloodSugar {
  beforeLevel: number | null;
  beforeStatus: ColorSquareType;
  afterLevel: number | null;
  afterStatus: ColorSquareType;
}

export interface Food {
  foodPk: number;
  foodName: string;
  foodCal: number;
  foodGrams: number;
  foodCarbohydrate: number | null;
  foodProtein: number;
  foodDietaryFiber: number;
  foodVitamin: number;
  foodFat: number;
  foodSalt: number;
  foodSugars: number;
}

export interface MealDetailResponseData {
  menuPk: number;
  registedAt: string;
  menuImages: MenuImage[];
  bloodSugar: BloodSugar;
  foods: Food[];
}

export interface MealDetailApiResponse {
  success: boolean;
  response: MealDetailResponseData;
  error: any;
}
