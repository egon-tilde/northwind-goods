export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  thumbnail: string;
  images: string[];
  tags?: string[];
};

export type ProductList = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type Category = { slug: string; name: string; url: string };

export type CartLine = { id: number; title: string; price: number; thumbnail: string; quantity: number };

export type Filters = {
  category: string | null;
  sort: { by: 'price' | 'rating' | 'title'; order: 'asc' | 'desc' };
  range: { min: number; max: number };
};

export type Reviewer = {
  name: { first: string; last: string };
  location: { city: string; country: string };
  picture: { thumbnail: string; medium: string };
  login: { uuid: string };
};

export type AuthUser = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  accessToken: string;
  refreshToken: string;
};
