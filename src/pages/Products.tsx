import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useInventoryStore } from '@/stores/inventoryStore';
import { Product } from '@/types/inventory';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Save, RefreshCw, Trash2, Pencil, Search } from 'lucide-react';
import { toast } from 'sonner';

const emptyProduct: Omit<Product, 'id'> = {
  category: '',
  supplier: '',
  name: '',
  price: 0,
  qty: 0,
  status: 'Active',
};

export default function Products() {
  const { products, categories, suppliers, addProduct, updateProduct, deleteProduct } = useInventoryStore();
  const [form, setForm] = useState<Omit<Product, 'id'> & { id?: string }>(emptyProduct);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    if (!form.name || !form.category || !form.supplier) {
      toast.error('Please fill in required fields');
      return;
    }
    
    if (isEditing && form.id) {
      updateProduct(form.id, form);
      toast.success('Product updated successfully');
    } else {
      const newId = (Math.max(...products.map(p => parseInt(p.id)), 0) + 1).toString();
      addProduct({ ...form, id: newId } as Product);
      toast.success('Product added successfully');
    }
    handleClear();
  };

  const handleEdit = (product: Product) => {
    setForm(product);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    toast.success('Product deleted successfully');
    handleClear();
  };

  const handleClear = () => {
    setForm(emptyProduct);
    setIsEditing(false);
  };

  return (
    <MainLayout title="Manage Product Details">
      <div className="space-y-6">
        {/* Search */}
        <div className="glass-card rounded-xl p-4 border border-border">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="glass-card rounded-xl p-6 border border-border">
            <h3 className="text-lg font-semibold mb-4">Product Details</h3>
            <div className="space-y-4">
              <div>
                <Label>Category*</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Supplier*</Label>
                <Select value={form.supplier} onValueChange={(v) => setForm({ ...form, supplier: v })}>
                  <SelectTrigger><SelectValue placeholder="Select supplier" /></SelectTrigger>
                  <SelectContent>
                    {suppliers.map((sup) => (
                      <SelectItem key={sup.id} value={sup.name}>{sup.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>P ID</Label>
                <Input value={form.id || 'Auto'} disabled className="bg-secondary/50" />
              </div>
              <div>
                <Label>Name*</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Price</Label>
                  <Input 
                    type="number" 
                    value={form.price} 
                    onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} 
                  />
                </div>
                <div>
                  <Label>Quantity</Label>
                  <Input 
                    type="number" 
                    value={form.qty} 
                    onChange={(e) => setForm({ ...form, qty: parseInt(e.target.value) || 0 })} 
                  />
                </div>
              </div>
              <div>
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as 'Active' | 'Inactive' })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSave} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  {isEditing ? 'Update' : 'Save'}
                </Button>
                <Button variant="outline" onClick={handleClear} className="flex-1">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="lg:col-span-2 glass-card rounded-xl p-6 border border-border">
            <h3 className="text-lg font-semibold mb-4">Product List</h3>
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>P ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.supplier}</TableCell>
                      <TableCell className="font-mono">{product.id}</TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell className="font-mono">₹{product.price.toLocaleString()}</TableCell>
                      <TableCell className="font-mono">{product.qty}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.status === 'Active' ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'
                        }`}>
                          {product.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" onClick={() => handleEdit(product)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => handleDelete(product.id)} className="text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
