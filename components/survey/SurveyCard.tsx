'use client';

import { ReactNode } from 'react';

export interface SurveyCardProps {
  children: ReactNode;
  className?: string;
}

export default function SurveyCard({ children, className = '' }: SurveyCardProps) {
  return (
    <div
      className={`bg-zinc-900 border border-zinc-800 shadow-lg rounded-lg p-6 mb-6 ${className}`}
    >
      {children}
    </div>
  );
} 