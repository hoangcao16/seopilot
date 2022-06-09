import LayoutHome from 'components/Layouts/LayoutHome';
import EmployeeAddContainer from 'containers/EmployeeAddContainer';
import React from 'react';
import { Helmet } from 'react-helmet';
import styles from './styles.module.scss';
export default function EmployeeAdd() {
  return (
    <LayoutHome>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Thêm mới - Quản lý nhân viên</title>
      </Helmet>
      <div className={styles.employeeMain}>
        <EmployeeAddContainer />
      </div>
    </LayoutHome>
  );
}
