import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { useInventoryStore } from '@/stores/inventoryStore';
import { Users, Truck, Package, Cpu, CircuitBoard, Microchip, HardDrive } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Dashboard() {
  const { employees, suppliers, products, components, updateComponents } = useInventoryStore();
  const [componentForm, setComponentForm] = useState(components);

  const handleSaveComponents = () => {
    updateComponents(componentForm);
    toast.success('Components updated successfully');
  };

  return (
    <MainLayout title="Welcome to Inventory Management System">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Employees"
          value={employees.length}
          icon={Users}
          color="primary"
        />
        <StatCard
          title="Total Suppliers"
          value={suppliers.length}
          icon={Truck}
          color="success"
        />
        <StatCard
          title="Total Products"
          value={products.length}
          icon={Package}
          color="warning"
        />
        <StatCard
          title="Total Components"
          value={Object.values(componentForm).reduce((a, b) => a + b, 0)}
          icon={Cpu}
          color="info"
        />
      </div>
      
      <div className="mt-8 glass-card rounded-xl p-6 border border-border">
        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <CircuitBoard className="w-5 h-5 text-primary" />
          Component Parts Inventory
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Microchip className="w-4 h-4 text-primary" />
              Microchips
            </Label>
            <Input
              type="number"
              value={componentForm.microchips}
              onChange={(e) => setComponentForm({ ...componentForm, microchips: parseInt(e.target.value) || 0 })}
              placeholder="Enter quantity"
            />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <CircuitBoard className="w-4 h-4 text-success" />
              Circuit Boards
            </Label>
            <Input
              type="number"
              value={componentForm.circuitBoards}
              onChange={(e) => setComponentForm({ ...componentForm, circuitBoards: parseInt(e.target.value) || 0 })}
              placeholder="Enter quantity"
            />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-warning" />
              Processors
            </Label>
            <Input
              type="number"
              value={componentForm.processors}
              onChange={(e) => setComponentForm({ ...componentForm, processors: parseInt(e.target.value) || 0 })}
              placeholder="Enter quantity"
            />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-info" />
              Storage Units
            </Label>
            <Input
              type="number"
              value={componentForm.storageUnits}
              onChange={(e) => setComponentForm({ ...componentForm, storageUnits: parseInt(e.target.value) || 0 })}
              placeholder="Enter quantity"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSaveComponents}>
            Save Components
          </Button>
        </div>
      </div>

      <div className="mt-8 glass-card rounded-xl p-6 border border-border">
        <h2 className="text-lg font-semibold mb-4">Quick Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Recent Products</h3>
            {products.slice(0, 3).map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                <span className="font-medium">{product.name}</span>
                <span className="text-primary font-mono">₹{product.price.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Recent Suppliers</h3>
            {suppliers.slice(0, 3).map((supplier) => (
              <div key={supplier.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                <span className="font-medium">{supplier.name}</span>
                <span className="text-success font-mono">{supplier.component}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
