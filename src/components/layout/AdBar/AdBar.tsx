import React from 'react';
import { Zap } from 'lucide-react';
import styles from './AdBar.module.css';

export function AdBar() {
  return (
    <div className={styles.adBar}>
      <div className={styles.content}>
        <Zap size={14} />
        <span>ENVÍO GRATIS en compras mayores a $159.000</span>
      </div>
    </div>
  );
}
