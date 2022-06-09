import React from 'react';
import LayoutHome from 'components/Layouts/LayoutHome';
import styles from './styles.module.scss';
import UserContainer from 'containers/UserContainer';

const Users = () => {
  return (
    <LayoutHome>
      <div className={styles.userContent}>
        <UserContainer />
      </div>
    </LayoutHome>
  );
};
export default Users;
