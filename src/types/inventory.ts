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
  component: string;
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

export interface ComponentPart {
  id: string;
  name: string;
  quantity: number;
}
