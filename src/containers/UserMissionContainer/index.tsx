import styles from './styles.module.scss';
import UserTableMission from 'components/UserTableMission';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import customAxios from 'services/ApiClient';
import { MissionDetail } from 'types/Missions';
const UserMissionContainer = () => {
  const { id } = useParams();
  const missiondetail: MissionDetail = {
    data: [],
  };
  const [user, setUser] = useState(missiondetail);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const detailUser = (id: string | undefined) => {
    setLoadingInfo(true);
    customAxios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/users/${id}/missiondetail`)
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
        setLoadingInfo(false);
      })
      .catch((err) => {
        setLoadingInfo(false);
      });
  };
  const handleSetUser = (value: any) => {
    setUser(value);
  };
  useEffect(() => {
    detailUser(id);
  }, []);
  const navigate = useNavigate();

  return (
    <div className={styles.userMissionContainer}>
      <p className={styles.userMissionTitle}>Lịch sử nhiệm vụ</p>
      <UserTableMission id={id} user={user} handleSetUser={handleSetUser} />
      <Button
        className={styles.btnBack}
        type="primary"
        onClick={() => navigate(-1)}
      >
        Trở về
      </Button>
    </div>
  );
};
export default UserMissionContainer;
