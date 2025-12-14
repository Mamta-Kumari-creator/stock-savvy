interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="h-16 bg-card/50 backdrop-blur-sm border-b border-border flex items-center px-6">
      <h1 className="text-xl font-semibold text-foreground">{title}</h1>
    </header>
  );
}
