import LayoutHome from 'components/Layouts/LayoutHome';
import UserDetailContainer from 'containers/UserDetailContainer';
import styles from './styles.module.scss';

const UserDetail = () => {
  return (
    <LayoutHome>
      <div className={styles.userContent}>
        <UserDetailContainer />
      </div>
    </LayoutHome>
  );
};
export default UserDetail;
