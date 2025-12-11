import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useInventoryStore } from '@/stores/inventoryStore';
import { Category } from '@/types/inventory';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2, Tags } from 'lucide-react';
import { toast } from 'sonner';

export default function Categories() {
  const { categories, addCategory, deleteCategory } = useInventoryStore();
  const [categoryName, setCategoryName] = useState('');

  const handleAdd = () => {
    if (!categoryName.trim()) {
      toast.error('Please enter a category name');
      return;
    }
    
    if (categories.some(c => c.name.toLowerCase() === categoryName.toLowerCase())) {
      toast.error('Category already exists');
      return;
    }
    
    const newId = (Math.max(...categories.map(c => parseInt(c.id)), 0) + 1).toString();
    addCategory({ id: newId, name: categoryName.trim() });
    setCategoryName('');
    toast.success('Category added successfully');
  };

  const handleDelete = (id: string) => {
    deleteCategory(id);
    toast.success('Category deleted successfully');
  };

  return (
    <MainLayout title="Manage Product Category">
      <div className="max-w-2xl mx-auto">
        <div className="glass-card rounded-xl p-6 border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Tags className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Product Categories</h3>
          </div>
          
          {/* Add Category Form */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <Label className="sr-only">Category Name</Label>
              <Input
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter Category Name"
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              />
            </div>
            <Button onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
          
          {/* Categories Table */}
          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">CID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="w-24">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-mono text-muted-foreground">{category.id}</TableCell>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        onClick={() => handleDelete(category.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {categories.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                      No categories found. Add one above.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
