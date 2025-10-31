import { motion } from 'framer-motion';
import { Github, BookOpen, Heart } from 'lucide-react';

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="glass-card rounded-2xl p-6 mt-6"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-accent fill-accent" />
          <span>for Computer Organization & Architecture</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://en.wikipedia.org/wiki/Binary-coded_decimal"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Learn BCD
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
