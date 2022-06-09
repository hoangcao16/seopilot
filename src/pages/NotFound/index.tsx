import { Result } from 'antd';
import ButtonComponent from 'components/ButtonComponent';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

export default function NotFound() {
  return (
    <div>
      <Result status="404" title="404" subTitle="Trang này không tồn tại!" />
      <div className={styles.buttonNotFound}>
        <Link to="/">
          <ButtonComponent type="primary">Trang chủ</ButtonComponent>
        </Link>
      </div>
    </div>
  );
}
