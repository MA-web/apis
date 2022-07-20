export interface user{
  email?: string;
  exp?: number;
  iat?: number;
  id?: number;
  role?: string;
  roles?: authority[] ;
  status?: string;
  sub?: string;
  username?: string;
}

export interface authority{
  authority?:string;
}
