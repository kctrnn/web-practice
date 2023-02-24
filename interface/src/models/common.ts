export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  username: string;
  email: string;
  password: string;
}

export type PathSlug =
  | 'responsive-web-developer'
  | 'front-end-developer'
  | 'full-stack-developer';

// export interface ParamList {
//   pathSlug_like: PathSlug;

//   [key: string]: any;
// }
