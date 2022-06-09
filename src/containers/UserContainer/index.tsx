import { Input, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import UserTable from 'components/UserTable';
import customAxios from 'services/ApiClient';
import { openNotification } from 'utils/openNotification';
import React, { useEffect, useState } from 'react';
// Search user

const UserContainer = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  const UserData = (valueSearch?: string) => {
    setLoading(true);
    let url = `${process.env.REACT_APP_API_URL}/api/v1/users/?pageSize=100`;
    if (valueSearch) {

      url = `${process.env.REACT_APP_API_URL}/api/v1/users/search?size=100&keyWord=${valueSearch}`;

    }
    customAxios.get(url).then((res) => {
      setUser(res.data.data);
      setLoading(false);
    });
  };
  const deleteUser = (id: string) => {
    customAxios
      .delete(`${process.env.REACT_APP_API_URL}/api/v1/users/delete?id=${id}`)
      .then((res) => {
        openNotification('success', 'Xóa thành công');
        UserData();
      })
      .catch((err) => {
        openNotification('error', 'Xóa thất bại');
      });
  };
  useEffect(() => {
    UserData();
  }, []);

  const handleSearch = (value: string) => {
    UserData(value);
  };
  const [valueSearch, setValueSearch] = useState('');

  const onEnterPress = () => {
    handleSearch(valueSearch);
  };
  return (
    <div className={styles.UserContainer}>
      <div className={styles.Search}>
        <Input
          placeholder="Tìm người dùng"
          prefix={<SearchOutlined />}
          onChange={(e: any) => handleSearch(e.target.value)}
          onPressEnter={onEnterPress}
        />
      </div>
      {loading ? (
        <Spin size="large" style={{ margin: '40px auto', display: 'block' }} />
      ) : (
        <UserTable user={user} deleteUser={deleteUser} />
      )}
    </div>
  );
};
export default UserContainer;
