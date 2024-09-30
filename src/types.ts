
export type EBook = {
  id: number;
  name: string;
  ownerId: number;
  status: string;
  price: number;
}

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  created_at: string;
}