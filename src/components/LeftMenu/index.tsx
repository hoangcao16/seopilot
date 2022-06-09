import { Menu } from 'antd';
import ButtonComponent from 'components/ButtonComponent';
import SvgIcons from 'components/SvgIcons';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { userInfo } from 'types/LoginInterface';
import { openNotification } from 'utils/openNotification';
import styles from './styles.module.scss';

export default function LeftMenu() {
  const location = useLocation();
  const navigate = useNavigate();

  // const userInfo: userInfo = JSON.parse(
  //   localStorage.getItem('userInfo')?.toString() || ''
  // );

  const handleLogout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');

    openNotification('success', 'Đăng xuất');
  };

  return (
    <div className={styles.leftMenu}>
      <div className={styles.userInfo}>
        {/* <img src={userInfo.avatar} alt="" /> */}
        <div>
          {/* <p className={styles.userInfoName}>{userInfo.name}</p> */}
          {/* <p className={styles.userInfoEmail}>{userInfo.email}</p> */}
        </div>
      </div>

      <div className={styles.menuContainer}>
        <Menu
          theme="light"
          defaultSelectedKeys={['']}
          selectedKeys={[location.pathname.split('/')[1]]}
        >
          <Menu.Item key="" icon={<SvgIcons name="dashboard" />}>
            <Link to="/">
              <span>Dashboard</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="employees" icon={<SvgIcons name="employees" />}>
            <Link to="/employees">
              <span>Quản lý nhân viên</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="users" icon={<SvgIcons name="users" />}>
            <Link to="/users">
              <span>Quản lý người dùng</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="customers" icon={<SvgIcons name="customers" />}>
            <Link to="/customers">
              <span>Quản lý khách hàng</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="missions" icon={<SvgIcons name="missions" />}>
            <Link to="/missions">
              <span>Quản lý nhiệm vụ</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="configuration" icon={<SvgIcons name="setting" />}>
            <Link to="/configuration">
              <span>Cấu hình</span>
            </Link>
          </Menu.Item>
        </Menu>

        <div className={styles.buttonLogout}>
          <ButtonComponent
            icon="logout"
            height={48}
            htmlType="button"
            type="white"
            borderRadius={8}
            onClick={handleLogout}
          >
            Đăng xuất
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
}
