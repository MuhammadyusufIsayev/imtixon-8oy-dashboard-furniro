// src/types.ts

export interface Category {
  _id?: string;
  name: string;
  image: string;
}

export interface CategoryFormValues {
  name: string;
  image: string;
}

export interface Product {
  _id?: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  rate: number;
  price: number;
  size: number;
  color: string;
}

export interface ProductFormValues {
  title: string;
  subtitle: string;
  image: string;
  description: string;
  rate: number;
  price: number;
  size: number;
  color: string;
}
