import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useInventoryStore } from '@/stores/inventoryStore';
import { Employee } from '@/types/inventory';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Save, RefreshCw, Trash2, Pencil } from 'lucide-react';
import { toast } from 'sonner';

const emptyEmployee: Omit<Employee, 'id'> = {
  name: '',
  email: '',
  gender: 'Male',
  contact: '',
  dob: '',
  doj: '',
  password: '',
  userType: 'Employee',
  address: '',
  salary: '',
};

export default function Employees() {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useInventoryStore();
  const [form, setForm] = useState<Omit<Employee, 'id'> & { id?: string }>(emptyEmployee);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [isEditing, setIsEditing] = useState(false);

  const filteredEmployees = employees.filter((emp) => {
    if (!searchTerm) return true;
    const value = emp[searchType as keyof Employee]?.toString().toLowerCase() || '';
    return value.includes(searchTerm.toLowerCase());
  });

  const handleSave = () => {
    if (!form.name || !form.email) {
      toast.error('Please fill in required fields');
      return;
    }
    
    if (isEditing && form.id) {
      updateEmployee(form.id, form);
      toast.success('Employee updated successfully');
    } else {
      const newId = (Math.max(...employees.map(e => parseInt(e.id)), 100) + 1).toString();
      addEmployee({ ...form, id: newId } as Employee);
      toast.success('Employee added successfully');
    }
    handleClear();
  };

  const handleEdit = (emp: Employee) => {
    setForm(emp);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    deleteEmployee(id);
    toast.success('Employee deleted successfully');
    handleClear();
  };

  const handleClear = () => {
    setForm(emptyEmployee);
    setIsEditing(false);
  };

  return (
    <MainLayout title="Employee Management">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search Section */}
        <div className="lg:col-span-3 glass-card rounded-xl p-4 border border-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Search Employee</h3>
          <div className="flex gap-4">
            <Select value={searchType} onValueChange={setSearchType}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="id">Emp ID</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="contact">Contact</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="glass-card rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Employee Details</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Emp ID</Label>
                <Input value={form.id || 'Auto'} disabled className="bg-secondary/50" />
              </div>
              <div>
                <Label>Gender</Label>
                <Select value={form.gender} onValueChange={(v) => setForm({ ...form, gender: v as 'Male' | 'Female' | 'Other' })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Name*</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <Label>Contact</Label>
                <Input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>D.O.B</Label>
                <Input type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} />
              </div>
              <div>
                <Label>D.O.J</Label>
                <Input type="date" value={form.doj} onChange={(e) => setForm({ ...form, doj: e.target.value })} />
              </div>
            </div>
            <div>
              <Label>Email*</Label>
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Password</Label>
                <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              </div>
              <div>
                <Label>User Type</Label>
                <Select value={form.userType} onValueChange={(v) => setForm({ ...form, userType: v as 'Admin' | 'Employee' })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Employee">Employee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Address</Label>
              <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </div>
            <div>
              <Label>Salary</Label>
              <Input value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} />
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
        <div className="lg:col-span-2 glass-card rounded-xl p-6 border border-border overflow-hidden">
          <h3 className="text-lg font-semibold mb-4">Employee List</h3>
          <div className="overflow-auto max-h-[500px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((emp) => (
                  <TableRow key={emp.id}>
                    <TableCell className="font-mono">{emp.id}</TableCell>
                    <TableCell>{emp.name}</TableCell>
                    <TableCell className="text-muted-foreground">{emp.email}</TableCell>
                    <TableCell>{emp.contact}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        emp.userType === 'Admin' ? 'bg-primary/20 text-primary' : 'bg-secondary text-secondary-foreground'
                      }`}>
                        {emp.userType}
                      </span>
                    </TableCell>
                    <TableCell className="font-mono">{emp.salary}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" onClick={() => handleEdit(emp)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => handleDelete(emp.id)} className="text-destructive hover:text-destructive">
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
