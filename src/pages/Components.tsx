import { MainLayout } from '@/components/layout/MainLayout';
import { useInventoryStore } from '@/stores/inventoryStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Trash2, Cpu } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { ComponentPart } from '@/types/inventory';

const emptyComponent: Omit<ComponentPart, 'id'> = {
  name: '',
  quantity: 0,
};

export default function Components() {
  const { componentParts, addComponentPart, deleteComponentPart } = useInventoryStore();
  const [form, setForm] = useState(emptyComponent);
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    if (!form.name) {
      toast.error('Please enter component name');
      return;
    }
    addComponentPart({
      id: Date.now().toString(),
      ...form,
    });
    toast.success('Component added successfully');
    setForm(emptyComponent);
    setOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    deleteComponentPart(id);
    toast.success(`${name} deleted successfully`);
  };

  const totalQuantity = componentParts.reduce((sum, part) => sum + part.quantity, 0);

  return (
    <MainLayout title="Component Parts">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Cpu className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Components</p>
              <p className="text-2xl font-bold text-primary">{totalQuantity}</p>
            </div>
          </div>
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Component
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Component</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label>Component Name</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g., Microchips, Capacitors"
                  />
                </div>
                <div>
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) || 0 })}
                    placeholder="Enter quantity"
                  />
                </div>
                <Button onClick={handleSubmit} className="w-full">
                  Add Component
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="glass-card rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Component Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {componentParts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                    No components added yet. Click "Add Component" to get started.
                  </TableCell>
                </TableRow>
              ) : (
                componentParts.map((part) => (
                  <TableRow key={part.id}>
                    <TableCell className="font-medium">{part.name}</TableCell>
                    <TableCell>
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-mono">
                        {part.quantity}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(part.id, part.name)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
}
