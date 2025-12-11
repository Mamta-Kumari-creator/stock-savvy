import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Truck, 
  Tags, 
  Package, 
  ShoppingCart,
  LogOut,
  Box
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Employees', path: '/employees' },
  { icon: Truck, label: 'Suppliers', path: '/suppliers' },
  { icon: Tags, label: 'Categories', path: '/categories' },
  { icon: Package, label: 'Products', path: '/products' },
  { icon: ShoppingCart, label: 'Sales', path: '/sales' },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar sidebar-glow flex flex-col z-50">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Box className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">IMS</h1>
            <p className="text-xs text-muted-foreground">Inventory System</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                'text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent',
                isActive && 'bg-primary/10 text-primary border-l-2 border-primary'
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Exit</span>
        </button>
      </div>
      
      <div className="p-4 text-center border-t border-sidebar-border">
        <p className="text-xs text-muted-foreground">Developed By</p>
        <p className="text-sm font-medium text-primary">Rangesh</p>
      </div>
    </aside>
  );
}
