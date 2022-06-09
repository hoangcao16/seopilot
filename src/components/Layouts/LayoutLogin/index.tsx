import { Button, Form, Input } from 'antd';
import LayoutFormLogin from 'components/FormLogin';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import customAxios from 'services/ApiClient';
import { openNotification } from 'utils/openNotification';
import stylesButton from '../../../styles/buttonLogin.module.scss';
import stylesInput from '../../../styles/inputLogin.module.scss';
import { LoginProps } from '../../../types/LoginInterface';
import styles from './styles.module.scss';

const LayoutLogin = () => {
  const navigate = useNavigate();
  const [logging, setLogging] = useState(false);

  const onFinish = (values: LoginProps) => {
    setLogging(true);

    customAxios
      .post(`${process.env.REACT_APP_API_URL}/login`, values)
      .then((res) => {
        setLogging(false);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userInfo', JSON.stringify(res.data));

        navigate('/');
        openNotification('success', 'Đăng nhập', `Xin chào ${res.data.name}`);
      })
      .catch((err) => {
        // console.log(err);
        setLogging(false);

        navigate('/login');
        openNotification(
          'error',
          'Đăng nhập',
          'Đăng nhập thất bại! Kiểm ra lại email và password.'
        );
      });
  };

  return (
    <LayoutFormLogin>
      <Form
        className={styles.form}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Mời nhập đầy đủ email!' }]}
        >
          <Input
            type="email"
            className={stylesInput.input}
            placeholder="Nhập email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Mời nhập đầy đủ mật khẩu!' }]}
        >
          <Input.Password
            placeholder="Nhập password"
            className={stylesInput.password}
          />
        </Form.Item>
        <span className={styles.forgot} onClick={() => navigate('/forgot')}>
          Quên mật khẩu?
        </span>
        <Form.Item className={styles.buttonItem}>
          <Button
            className={`${stylesButton.primary} ${styles.button}`}
            htmlType="submit"
            loading={logging}
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </LayoutFormLogin>
  );
};
export default LayoutLogin;
