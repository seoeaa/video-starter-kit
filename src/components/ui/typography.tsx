/**
 * Компонент типографики для централизованного управления стилями текста
 * Содержит компоненты для заголовков, подзаголовков, параграфов и других текстовых элементов
 */
import React from "react";
import { cn } from "@/lib/utils";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

// Заголовок H1 (крупный)
export function H1({ children, className, ...props }: TypographyProps) {
  return (
    <h1 
      className={cn(
        "text-5xl md:text-[64px] font-bold tracking-tight", 
        className
      )} 
      {...props}
    >
      {children}
    </h1>
  );
}

// Заголовок H2 (средний)
export function H2({ children, className, ...props }: TypographyProps) {
  return (
    <h2 
      className={cn(
        "text-4xl font-bold", 
        className
      )} 
      {...props}
    >
      {children}
    </h2>
  );
}

// Заголовок H3 (маленький)
export function H3({ children, className, ...props }: TypographyProps) {
  return (
    <h3 
      className={cn(
        "text-2xl font-semibold", 
        className
      )} 
      {...props}
    >
      {children}
    </h3>
  );
}

// Подзаголовок
export function Subtitle({ children, className, ...props }: TypographyProps) {
  return (
    <p 
      className={cn(
        "text-xl md:text-2xl", 
        className
      )} 
      {...props}
    >
      {children}
    </p>
  );
}

// Обычный текст
export function Text({ children, className, ...props }: TypographyProps) {
  return (
    <p 
      className={cn(
        "text-base md:text-lg", 
        className
      )} 
      {...props}
    >
      {children}
    </p>
  );
}

// Маленький текст
export function SmallText({ children, className, ...props }: TypographyProps) {
  return (
    <p 
      className={cn(
        "text-sm", 
        className
      )} 
      {...props}
    >
      {children}
    </p>
  );
}

// Текст для аккордеона
export function AccordionText({ children, className, ...props }: TypographyProps) {
  return (
    <p 
      className={cn(
        "text-lg font-semibold", 
        className
      )} 
      {...props}
    >
      {children}
    </p>
  );
}

// Текст для футера
export function FooterHeading({ children, className, ...props }: TypographyProps) {
  return (
    <h4 
      className={cn(
        "text-xl font-semibold", 
        className
      )} 
      {...props}
    >
      {children}
    </h4>
  );
}

// Текст для футера
export function FooterText({ children, className, ...props }: TypographyProps) {
  return (
    <p 
      className={cn(
        "text-base", 
        className
      )} 
      {...props}
    >
      {children}
    </p>
  );
}
