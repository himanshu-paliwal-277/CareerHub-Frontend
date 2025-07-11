import React, { memo } from 'react';
import styles from './heroSection.module.css';

const HeroSection: React.FC = () => {
  return (
    <div className={styles.container}>
      hero section
    </div>
  );
};

export default memo(HeroSection);