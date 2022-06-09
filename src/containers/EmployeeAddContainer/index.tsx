import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Upload } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import customAxios from 'services/ApiClient';
import { openNotification } from 'utils/openNotification';
import styles from './styles.module.scss';

const EmployeeAddContainer = () => {
  const { Option } = Select;
  const listRoles = ['ADMIN', 'EMPLOYEE'];
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const [avatar, setAvatar] = useState('');

  const onFinish = (values: any) => {
    const param = { ...values, avatar: avatar };

    customAxios
      .post(`${process.env.REACT_APP_API_URL}/employees/`, param)
      .then((res) => {
        navigate('/employees');
        openNotification('success', 'Thông báo', 'Thêm Nhân viên thành công!');
      })
      .catch((err) => {
        console.log(err);
        const message = err.data.message;
        openNotification('error', 'Không thành công!', message);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleChange = (info: any) => {
    const formData = new FormData();
    formData.set('avatar', info.file.originFileObj);

    customAxios
      .post(`${process.env.REACT_APP_API_URL}/image/`, formData)
      .then((res) => {
        setAvatar(res.data);
      });
  };

  return (
    <div className={styles.UserDetail}>
      <Button
        className={styles.btnBack}
        type="default"
        shape="round"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftOutlined />
      </Button>

      <div className={`${styles.center} ${styles.userHeader}`}>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          onChange={handleChange}
        >
          {avatar.trim() === '' ? (
            <div>
              <UserOutlined />
            </div>
          ) : (
            <img src={avatar} alt="avatar" style={{ width: '100%' }} />
          )}
        </Upload>
        <span>Chọn avatar</span>
      </div>

      <div className={styles.userInfo}>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Nhập tên nhân viên',
              },
            ]}
          >
            <div className={styles.userInfoItem}>
              <label htmlFor="Name">Tên nhân viên</label>
              <Input
                type="text"
                id="Name"
                defaultValue=""
                placeholder={'Nhập tên nhân viên'}
              />
            </div>
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Nhập email',
              },
            ]}
          >
            <div className={styles.userInfoItem}>
              <label htmlFor="Email">Email</label>
              <Input type="text" defaultValue="" placeholder="Nhập email" />
            </div>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Nhập mật khẩu',
              },
            ]}
          >
            <div className={styles.password}>
              <label htmlFor="password">Mật khẩu</label>
              <Input.Password defaultValue="" placeholder="Nhập mật khẩu" />
            </div>
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: 'Nhập số điện thoại',
              },
            ]}
          >
            <div className={styles.userInfoItem}>
              <label htmlFor="phone">Số điện thoại</label>
              <Input
                type="text"
                defaultValue=""
                id="Password"
                placeholder="Nhập số điện thoại"
              />
            </div>
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            className={styles.select_item}
            rules={[
              {
                required: true,
                message: 'Chọn role',
              },
            ]}
          >
            <Select placeholder="Chọn role" className={styles.select}>
              {listRoles.map((item: string) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <div className={`${styles.center} ${styles.footer}`}>
            <Button onClick={handleBack}>Hủy</Button>
            <div className={styles.btnConfirm}>
              <Form.Item>
                <div>
                  <Button type="primary" htmlType="submit">
                    Tạo
                  </Button>
                </div>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EmployeeAddContainer;
