import { motion } from 'framer-motion';
import { Binary, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export function Header({ isDark, onToggleTheme }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass-card rounded-2xl p-6 mb-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="text-primary"
          >
            <Binary className="w-10 h-10" />
          </motion.div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              BCD Arithmetic Simulator
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Interactive Binary Coded Decimal Learning Tool
            </p>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={onToggleTheme}
          className="rounded-full"
        >
          {isDark ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </motion.header>
  );
}
