import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Clock, Calendar } from 'lucide-react';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-16 bg-card/50 backdrop-blur-sm border-b border-border flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold text-foreground">{title}</h1>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-mono">{format(time, 'dd-MM-yyyy')}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-mono">{format(time, 'HH:mm:ss')}</span>
        </div>
      </div>
    </header>
  );
}
