import EmployeeDetailContainer from 'containers/EmployeeDetailContainer';
import React from 'react';
import LayoutHome from 'components/Layouts/LayoutHome';
import styles from '../styles.module.scss';
import { Helmet } from 'react-helmet';
const EmployeeDetail = () => {
  return (
    <LayoutHome>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Chi tiết - Quản lý nhân viên</title>
      </Helmet>
      <div className={styles.employeeMain}>
        <EmployeeDetailContainer />
      </div>
    </LayoutHome>
  );
};

export default EmployeeDetail;
