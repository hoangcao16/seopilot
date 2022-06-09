import LayoutHome from 'components/Layouts/LayoutHome';
import { useParams } from 'react-router-dom';
import styles from './styles.module.scss';
import UserMissionContainer from 'containers/UserMissionContainer';

const UserMission = () => {
  return (
    <LayoutHome>
      <div className={styles.userContent}>
        <UserMissionContainer />
      </div>
    </LayoutHome>
  );
};
export default UserMission;
