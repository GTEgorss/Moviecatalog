export interface IMovie {
  id: number;
  title: string;
  year: number;
  country: string;
  genre: string; //TODO diff array
  director: string; //TODO diff type
  cast: string; //TODO diff type
  duration: number; //minutes
  age: number; // "age+"
  seasons: number;
  description: string;

  rating: number;
  reviewIds: number[];
}
