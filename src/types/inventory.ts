export interface Employee {
  id: string;
  name: string;
  email: string;
  gender: 'Male' | 'Female' | 'Other';
  contact: string;
  dob: string;
  doj: string;
  password: string;
  userType: 'Admin' | 'Employee';
  address: string;
  salary: string;
}

export interface Supplier {
  id: string;
  invoiceNo: string;
  name: string;
  contact: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  category: string;
  supplier: string;
  name: string;
  price: number;
  qty: number;
  status: 'Active' | 'Inactive';
}

export interface Sale {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
  date: string;
  customer: string;
}
