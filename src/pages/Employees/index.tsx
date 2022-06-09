import LayoutHome from 'components/Layouts/LayoutHome';
import EmployeeContainer from 'containers/EmployeeContainer';
import React from 'react';
import { Helmet } from 'react-helmet';
import styles from './styles.module.scss';
export default function Employees() {
  return (
    <LayoutHome>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Quản lý nhân viên</title>
      </Helmet>
      <div className={styles.employeeMain}>
        <EmployeeContainer />
      </div>
    </LayoutHome>
  );
}
