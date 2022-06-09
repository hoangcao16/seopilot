import styles from './styles.module.scss';
import UserTableWithdraw from 'components/UserTableWithdraw';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { Withdraw } from 'types/EmployeeInterface';
import { useEffect, useState } from 'react';
import customAxios from 'services/ApiClient';

const UserWithdrawContainer = () => {
  const { id } = useParams();
  const withdraw: Withdraw = {
    data: [],
  };
  const [user, setUser] = useState(withdraw);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const withdrawUser = (id: string | undefined) => {
    setLoadingInfo(true);
    customAxios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/users/${id}/withdrawn`)
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
    withdrawUser(id);
  }, []);
  const navigate = useNavigate();
  return (
    <div className={styles.userWithdrawContainer}>
      <p className={styles.userWithdrawTitle}>Lịch sử rút tiền</p>
      <UserTableWithdraw id={id} user={user} handleSetUser={handleSetUser} />
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
export default UserWithdrawContainer;
