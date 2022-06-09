import LayoutHome from 'components/Layouts/LayoutHome';
import { useParams } from 'react-router-dom';
import styles from './styles.module.scss';
import UserWithdrawContainer from 'containers/userWithdrawContainer';

const UserWithdraw = () => {
  return (
    <LayoutHome>
      <div className={styles.userContent}>
        <UserWithdrawContainer />
      </div>
    </LayoutHome>
  );
};
export default UserWithdraw;
