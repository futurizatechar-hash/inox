'use client';

import React from 'react';
import { Minus, Plus } from 'lucide-react';
import styles from './QuantitySelector.module.css';

export interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({ value, onChange, min = 1, max = 99 }: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };

  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      if (val >= min && val <= max) onChange(val);
      if (val > max) onChange(max);
      if (val < min) onChange(min);
    }
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.button}
        onClick={handleDecrement}
        disabled={value <= min}
        aria-label="Disminuir cantidad"
      >
        <Minus size={18} />
      </button>
      <input
        type="number"
        className={styles.input}
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
      />
      <button
        type="button"
        className={styles.button}
        onClick={handleIncrement}
        disabled={value >= max}
        aria-label="Aumentar cantidad"
      >
        <Plus size={18} />
      </button>
    </div>
  );
}
