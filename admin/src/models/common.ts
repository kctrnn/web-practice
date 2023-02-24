export interface PaginationResponse {
  _limit: number;
  _page: number;
  _totalRows: number;
}

export interface ListResponse<T> {
  data: T[];
  pagination: PaginationResponse;
}

export interface ListParams {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: 'asc' | 'desc';

  [key: string]: any;
}

export type PathSlug =
  | 'responsive-web-developer'
  | 'front-end-developer'
  | 'full-stack-developer';
