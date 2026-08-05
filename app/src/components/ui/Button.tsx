import { motion } from 'framer-motion';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'success' | 'danger';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variant?: Variant;
  full?: boolean;
  size?: 'md' | 'lg' | 'sm';
  icon?: ReactNode;
  className?: string;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: 'bg-orange text-white shadow-[0_6px_0_0_var(--color-orange-dark)] active:shadow-none',
  secondary: 'bg-white text-navy border-2 border-navy/15 shadow-[0_4px_0_0_rgba(27,58,107,0.12)] active:shadow-none',
  ghost: 'bg-transparent text-navy',
  success: 'bg-green text-white shadow-[0_6px_0_0_var(--color-green-dark)] active:shadow-none',
  danger: 'bg-red-soft text-white shadow-[0_6px_0_0_#a83f2b] active:shadow-none',
};

const SIZE_CLASSES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3.5 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function Button({ variant = 'primary', full, size = 'md', icon, children, className = '', disabled, ...rest }: ButtonProps) {
  return (
    <motion.button
      whileTap={disabled ? undefined : { scale: 0.96, y: 2 }}
      className={`font-display inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-opacity active:brightness-95 disabled:opacity-40 disabled:pointer-events-none ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${full ? 'w-full' : ''} ${className}`}
      disabled={disabled}
      {...(rest as any)}
    >
      {icon}
      {children}
    </motion.button>
  );
}
