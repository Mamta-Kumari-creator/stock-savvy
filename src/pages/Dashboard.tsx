import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { useInventoryStore } from '@/stores/inventoryStore';
import { Users, Truck, Package, ShoppingCart } from 'lucide-react';

export default function Dashboard() {
  const { employees, suppliers, products, sales } = useInventoryStore();

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
          title="Total Sales"
          value={sales.length}
          icon={ShoppingCart}
          color="info"
        />
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
            <h3 className="text-sm font-medium text-muted-foreground">Recent Sales</h3>
            {sales.slice(0, 3).map((sale) => (
              <div key={sale.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                <span className="font-medium">{sale.productName}</span>
                <span className="text-success font-mono">₹{sale.total.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
