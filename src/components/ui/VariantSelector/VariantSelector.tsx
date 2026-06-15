'use client';

import React from 'react';
import { clsx } from 'clsx';
import styles from './VariantSelector.module.css';

export interface VariantOption {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface VariantSelectorProps {
  label: string;
  options: VariantOption[];
  selectedValue: string;
  onChange: (id: string) => void;
}

export function VariantSelector({ label, options, selectedValue, onChange }: VariantSelectorProps) {
  return (
    <div className={styles.container}>
      <span className={styles.label}>{label}</span>
      <div className={styles.options}>
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className={clsx(styles.option, {
              [styles.selected]: selectedValue === option.id,
            })}
            disabled={option.disabled}
            onClick={() => onChange(option.id)}
            aria-pressed={selectedValue === option.id}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
