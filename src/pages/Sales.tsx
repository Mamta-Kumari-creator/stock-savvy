import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useInventoryStore } from '@/stores/inventoryStore';
import { Sale } from '@/types/inventory';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ShoppingCart, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

export default function Sales() {
  const { sales, products, addSale } = useInventoryStore();
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [customer, setCustomer] = useState('');

  const selectedProductData = products.find(p => p.id === selectedProduct);

  const handleAddSale = () => {
    if (!selectedProduct || !customer) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (!selectedProductData) return;
    
    if (quantity > selectedProductData.qty) {
      toast.error('Insufficient stock');
      return;
    }

    const newSale: Sale = {
      id: (Math.max(...sales.map(s => parseInt(s.id)), 0) + 1).toString(),
      productId: selectedProduct,
      productName: selectedProductData.name,
      quantity,
      price: selectedProductData.price,
      total: selectedProductData.price * quantity,
      date: format(new Date(), 'yyyy-MM-dd'),
      customer,
    };

    addSale(newSale);
    toast.success('Sale recorded successfully');
    setSelectedProduct('');
    setQuantity(1);
    setCustomer('');
  };

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);

  return (
    <MainLayout title="Sales Management">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Sale Form */}
        <div className="glass-card rounded-xl p-6 border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-info/20 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-info" />
            </div>
            <h3 className="text-lg font-semibold">New Sale</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label>Customer Name*</Label>
              <Input 
                value={customer} 
                onChange={(e) => setCustomer(e.target.value)}
                placeholder="Enter customer name"
              />
            </div>
            <div>
              <Label>Product*</Label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger><SelectValue placeholder="Select product" /></SelectTrigger>
                <SelectContent>
                  {products.filter(p => p.status === 'Active' && p.qty > 0).map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name} (Stock: {product.qty})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Quantity</Label>
              <Input 
                type="number" 
                min={1}
                max={selectedProductData?.qty || 1}
                value={quantity} 
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} 
              />
            </div>
            
            {selectedProductData && (
              <div className="p-4 bg-secondary/50 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Unit Price:</span>
                  <span className="font-mono">₹{selectedProductData.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-primary font-mono">₹{(selectedProductData.price * quantity).toLocaleString()}</span>
                </div>
              </div>
            )}
            
            <Button onClick={handleAddSale} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Record Sale
            </Button>
          </div>
        </div>

        {/* Sales List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary Card */}
          <div className="glass-card rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Revenue</p>
                <p className="text-3xl font-bold text-success">₹{totalRevenue.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground text-sm">Total Transactions</p>
                <p className="text-3xl font-bold">{sales.length}</p>
              </div>
            </div>
          </div>

          {/* Sales Table */}
          <div className="glass-card rounded-xl p-6 border border-border">
            <h3 className="text-lg font-semibold mb-4">Sales History</h3>
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sales.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell className="font-mono">{sale.id}</TableCell>
                      <TableCell className="font-mono text-muted-foreground">{sale.date}</TableCell>
                      <TableCell>{sale.customer}</TableCell>
                      <TableCell className="font-medium">{sale.productName}</TableCell>
                      <TableCell className="font-mono">{sale.quantity}</TableCell>
                      <TableCell className="font-mono">₹{sale.price.toLocaleString()}</TableCell>
                      <TableCell className="font-mono text-success font-semibold">₹{sale.total.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                  {sales.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                        No sales recorded yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
