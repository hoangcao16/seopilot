import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

const LayoutFormLogin = ({ children }: any) => {
  return (
    <div className={styles.login}>
      <div className={styles.main}>
        <div>
          <Link to="/">
            <div className={styles.wrapperBrand}>
              <span className={styles.blue}>V</span>
              <span className={styles.yellow}>i</span>
              <span className={styles.red}>n</span>
              <span className={styles.green}>a</span>
              <span className={styles.blue}>S</span>
              <span className={styles.red}>E</span>
              <span className={styles.yellow}>O</span>
            </div>
          </Link>
        </div>
        <p className={styles.title}>Đăng nhập</p>
        {children}
      </div>
    </div>
  );
};

export default LayoutFormLogin;
