import { Badge, Button, Col, Row, Tooltip } from 'antd';
import SvgIcons from 'components/SvgIcons';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { userInfo } from 'types/LoginInterface';
import styles from './styles.module.scss';

export default function HeaderComponent() {
  const location = useLocation();
  const [title, setTitle] = useState('dashboard');

  const [notification, setNotification] = useState(
    Math.floor(Math.random() * 100)
  );
  // const userInfo: userInfo = JSON.parse(
  //   localStorage.getItem('userInfo')?.toString() || ''
  // );

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      setTitle('dashboard');
    }

    if (path.includes('/employees')) {
      setTitle('Quản lý nhân viên');
    }

    if (path.includes('/users')) {
      setTitle('Quản lý người dùng');
    }
    if (path.includes('/customers')) {
      setTitle('Quản lý khách hàng');
    }
    if (path.includes('/missions')) {
      setTitle('Quản lý nhiệm vụ');
    }
    if (path.includes('/configuration')) {
      setTitle('Cấu hình');
    }
  }, [location]);

  const random = () => {
    const count = Math.floor(Math.random() * 100);
    setNotification(count);
  };
  return (
    <>
      <Row className={styles.wrapper}>
        <Col span={5}>
          <Link to="/">
            <div className={styles.wrapperBrand}>
              <span className={styles.blue}>V</span>
              <span className={styles.yellow}>i</span>
              <span className={styles.red}>n</span>
              <span className={styles.green}>a</span>
              <span className={styles.blue}>S</span>
              <span className={styles.red}>E</span>
              <span className={styles.yellow}>O</span>
            </div>
          </Link>
        </Col>

        <Col span={19}>
          <div className={styles.wrapperTitle}>
            <div className={styles.title}>{title}</div>

            <div className={styles.user}>
              <Badge count={notification}>
                <Tooltip title="Thông báo">
                  <Button
                    onClick={random}
                    icon={<SvgIcons name="notification" />}
                  />
                </Tooltip>
              </Badge>

              <div className={styles.userAvatar}>
                {/* <img src={userInfo.avatar} alt="" /> */}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
