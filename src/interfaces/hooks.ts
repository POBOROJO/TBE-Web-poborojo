export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

export interface UseUserReturnType {
  user: User | null;
  isAuth: boolean;
  loading: boolean;
}

export enum CertificateType{
  Webinar = 'Webinar',
  Shiksha = 'Shiksha'
}
