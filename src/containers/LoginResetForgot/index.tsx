import LayoutFormLogin from 'components/FormLogin';
import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from '../LoginEmailForgot/styles.module.scss';
import stylesInput from '../../styles/inputLogin.module.scss';
import stylesButton from '../../styles/buttonLogin.module.scss';
import { openNotification } from 'utils/openNotification';
import customAxios from 'services/ApiClient';
import { useOTPContext } from 'context/otpContext';
export interface ResetForgotProps {
  newPassword: string;
  confirmPassword: string;
}
const ResetPassword = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(false);
  const otpContext = useOTPContext();

  const onFinish = (values: ResetForgotProps) => {
    setChecking(true);

    if (values.newPassword === values.confirmPassword) {
      const params = {
        newPassword: values.confirmPassword,
        reNewPassword: values.confirmPassword,
      };

      customAxios
        .patch(
          `${process.env.REACT_APP_API_URL}/reset/${otpContext.id}`,
          params
        )
        .then((res) => {
          setChecking(false);
          openNotification('success', 'Đăng nhập với mật khẩu mới');
          navigate('/login');
        })
        .catch((err) => {
          setChecking(false);
          console.log(err);
          openNotification(
            'error',
            err.data.message,
            'Mật khẩu ít nhất 8 ký tự và bao gồm có ký tự chữ và số!'
          );
        });
    } else {
      setChecking(false);
      openNotification('warning', 'Mật khẩu mới không khớp!');
    }
  };

  const handleBackLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    navigate('/otp');
  };

  return (
    <LayoutFormLogin>
      <Form name="basic" onFinish={onFinish} autoComplete="off">
        <Form.Item
          name="newPassword"
          rules={[{ required: true, message: 'Password trống!' }]}
        >
          <Input.Password
            placeholder="Nhập password mới"
            className={` ${stylesInput.password}`}
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[{ required: true, message: 'Password trống!' }]}
        >
          <Input.Password
            placeholder="Nhập lại password mới"
            className={`${stylesInput.password}`}
          />
        </Form.Item>

        <div className={styles.group_input}>
          <Button
            className={stylesButton.primary}
            htmlType="submit"
            loading={checking}
          >
            Tiếp tục
          </Button>
          <Button
            className={stylesButton.white}
            htmlType="button"
            onClick={handleBackLogin}
          >
            Quay lại
          </Button>
        </div>
      </Form>{' '}
    </LayoutFormLogin>
  );
};

export default ResetPassword;
