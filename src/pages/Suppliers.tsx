import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useInventoryStore } from '@/stores/inventoryStore';
import { Supplier } from '@/types/inventory';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Save, RefreshCw, Trash2, Pencil } from 'lucide-react';
import { toast } from 'sonner';

const emptySupplier: Omit<Supplier, 'id'> = {
  invoiceNo: '',
  name: '',
  contact: '',
  component: '',
  description: '',
};

export default function Suppliers() {
  const { suppliers, addSupplier, updateSupplier, deleteSupplier } = useInventoryStore();
  const [form, setForm] = useState<Omit<Supplier, 'id'> & { id?: string }>(emptySupplier);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    if (!form.invoiceNo || !form.name) {
      toast.error('Please fill in required fields');
      return;
    }
    
    if (isEditing && form.id) {
      updateSupplier(form.id, form);
      toast.success('Supplier updated successfully');
    } else {
      const newId = (Math.max(...suppliers.map(s => parseInt(s.id)), 0) + 1).toString();
      addSupplier({ ...form, id: newId } as Supplier);
      toast.success('Supplier added successfully');
    }
    handleClear();
  };

  const handleEdit = (supplier: Supplier) => {
    setForm(supplier);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    deleteSupplier(id);
    toast.success('Supplier deleted successfully');
    handleClear();
  };

  const handleClear = () => {
    setForm(emptySupplier);
    setIsEditing(false);
  };

  return (
    <MainLayout title="Supplier Management">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="glass-card rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Supplier Details</h3>
          <div className="space-y-4">
            <div>
              <Label>Invoice No.*</Label>
              <Input 
                value={form.invoiceNo} 
                onChange={(e) => setForm({ ...form, invoiceNo: e.target.value })}
                placeholder="e.g., 1001"
              />
            </div>
            <div>
              <Label>Name*</Label>
              <Input 
                value={form.name} 
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Supplier name"
              />
            </div>
            <div>
              <Label>Contact</Label>
              <Input 
                value={form.contact} 
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                placeholder="Phone number"
              />
            </div>
            <div>
              <Label>Component</Label>
              <Input 
                value={form.component} 
                onChange={(e) => setForm({ ...form, component: e.target.value })}
                placeholder="Component supplied"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea 
                value={form.description} 
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Additional details..."
                rows={4}
              />
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
          <h3 className="text-lg font-semibold mb-4">Supplier List</h3>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice No.</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Component</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell className="font-mono">{supplier.invoiceNo}</TableCell>
                    <TableCell className="font-medium">{supplier.name}</TableCell>
                    <TableCell>{supplier.contact}</TableCell>
                    <TableCell>{supplier.component}</TableCell>
                    <TableCell className="text-muted-foreground max-w-[200px] truncate">{supplier.description}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" onClick={() => handleEdit(supplier)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => handleDelete(supplier.id)} className="text-destructive hover:text-destructive">
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
    </MainLayout>
  );
}
