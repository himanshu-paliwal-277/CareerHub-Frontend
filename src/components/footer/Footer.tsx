import React, { memo } from 'react';
import styles from './footer.module.css';

const Footer: React.FC = () => {
  return (
    <div className={styles.container}>
      footer
    </div>
  );
};

export default memo(Footer);