import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: 'primary' | 'success' | 'warning' | 'info';
}

const colorClasses = {
  primary: 'bg-primary/10 text-primary border-primary/20',
  success: 'bg-success/10 text-success border-success/20',
  warning: 'bg-warning/10 text-warning border-warning/20',
  info: 'bg-info/10 text-info border-info/20',
};

const iconBgClasses = {
  primary: 'bg-primary/20',
  success: 'bg-success/20',
  warning: 'bg-warning/20',
  info: 'bg-info/20',
};

export function StatCard({ title, value, icon: Icon, color }: StatCardProps) {
  return (
    <div className={cn(
      'glass-card rounded-xl p-6 border transition-all duration-300 hover:scale-105 stat-glow',
      colorClasses[color]
    )}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm font-medium mb-1">{title}</p>
          <p className="text-4xl font-bold">{value}</p>
        </div>
        <div className={cn('w-14 h-14 rounded-xl flex items-center justify-center', iconBgClasses[color])}>
          <Icon className="w-7 h-7" />
        </div>
      </div>
    </div>
  );
}
