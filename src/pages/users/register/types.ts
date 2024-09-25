type FieldErrors = {
  [x: string]: string[] | undefined;
}

type ActionErrors = {
  record_errors?: FieldErrors;
}

export type ActionResult = {
  data?: { user: User };
  errors?: ActionErrors;
}
 
export type User = {
  name: string;
  email: string;
  username: string;
  password: string;
}