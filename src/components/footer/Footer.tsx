import React, { memo } from "react";
import styles from "./footer.module.css";

const Footer: React.FC = () => {
  return (
    <div className={styles.container}>
      Copyright © 2025 Himanshu Paliwal — All rights reserved.
    </div>
  );
};

export default memo(Footer);
