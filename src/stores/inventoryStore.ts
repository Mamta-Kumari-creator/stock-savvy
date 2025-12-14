import { create } from 'zustand';
import { Employee, Supplier, Category, Product, ComponentPart } from '@/types/inventory';

interface InventoryState {
  employees: Employee[];
  suppliers: Supplier[];
  categories: Category[];
  products: Product[];
  componentParts: ComponentPart[];
  
  addEmployee: (employee: Employee) => void;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  
  addSupplier: (supplier: Supplier) => void;
  updateSupplier: (id: string, supplier: Partial<Supplier>) => void;
  deleteSupplier: (id: string) => void;
  
  addCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  addComponentPart: (part: ComponentPart) => void;
  deleteComponentPart: (id: string) => void;
}

export const useInventoryStore = create<InventoryState>((set) => ({
  employees: [
    {
      id: '102',
      name: 'Rangesh',
      email: 'webcode867@gmail.com',
      gender: 'Male',
      contact: '9876543210',
      dob: '2000-01-01',
      doj: '2020-01-20',
      password: '123456',
      userType: 'Admin',
      address: 'xyz',
      salary: 'NA',
    },
    {
      id: '103',
      name: 'Megha',
      email: 'megha@gmail.com',
      gender: 'Female',
      contact: '9876543210',
      dob: '2001-01-01',
      doj: '2020-01-20',
      password: '123456',
      userType: 'Employee',
      address: 'xyz',
      salary: '45000',
    },
  ],
  suppliers: [
    { id: '1', invoiceNo: '1001', name: 'Ajay', contact: '987654321', component: 'Mobile Parts', description: 'XYZ' },
    { id: '2', invoiceNo: '1002', name: 'Ajay2', contact: '987654321', component: 'Electronics', description: 'XYZ' },
  ],
  categories: [
    { id: '1', name: 'Electronics' },
    { id: '2', name: 'Clothes' },
    { id: '3', name: 'Mobile' },
  ],
  products: [
    { id: '1', category: 'Mobile', supplier: 'Ajay', name: 'Oppo X3', price: 69000, qty: 45, status: 'Active' },
    { id: '2', category: 'Mobile', supplier: 'Ajay', name: 'Poco X3', price: 21000, qty: 100, status: 'Inactive' },
  ],
  componentParts: [
    { id: '1', name: 'Microchips', quantity: 150 },
    { id: '2', name: 'Circuit Boards', quantity: 75 },
    { id: '3', name: 'Processors', quantity: 50 },
    { id: '4', name: 'Storage Units', quantity: 100 },
  ],
  
  addEmployee: (employee) => set((state) => ({ employees: [...state.employees, employee] })),
  updateEmployee: (id, employee) => set((state) => ({
    employees: state.employees.map((e) => (e.id === id ? { ...e, ...employee } : e)),
  })),
  deleteEmployee: (id) => set((state) => ({ employees: state.employees.filter((e) => e.id !== id) })),
  
  addSupplier: (supplier) => set((state) => ({ suppliers: [...state.suppliers, supplier] })),
  updateSupplier: (id, supplier) => set((state) => ({
    suppliers: state.suppliers.map((s) => (s.id === id ? { ...s, ...supplier } : s)),
  })),
  deleteSupplier: (id) => set((state) => ({ suppliers: state.suppliers.filter((s) => s.id !== id) })),
  
  addCategory: (category) => set((state) => ({ categories: [...state.categories, category] })),
  deleteCategory: (id) => set((state) => ({ categories: state.categories.filter((c) => c.id !== id) })),
  
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  updateProduct: (id, product) => set((state) => ({
    products: state.products.map((p) => (p.id === id ? { ...p, ...product } : p)),
  })),
  deleteProduct: (id) => set((state) => ({ products: state.products.filter((p) => p.id !== id) })),
  
  addComponentPart: (part) => set((state) => ({ componentParts: [...state.componentParts, part] })),
  deleteComponentPart: (id) => set((state) => ({ componentParts: state.componentParts.filter((p) => p.id !== id) })),
}));
