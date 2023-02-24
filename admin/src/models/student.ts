export interface Student {
  name: string;
  age: number;
  mark: number;
  gender: "male" | "female";
  city: string;

  id?: string;

  createdAt?: number;
  updatedAt?: number;
}
