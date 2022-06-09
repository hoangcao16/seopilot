import LayoutFormLogin from 'components/FormLogin';
import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from '../LoginEmailForgot/styles.module.scss';
import stylesInput from '../../styles/inputLogin.module.scss';
import stylesButton from '../../styles/buttonLogin.module.scss';
import { useOTPContext } from 'context/otpContext';
import customAxios from 'services/ApiClient';
import { openNotification } from 'utils/openNotification';
export interface OtpForgotProps {
  otp: string | number;
}
const OtpForgot = () => {
  const navigate = useNavigate();
  const otpContext = useOTPContext();
  const [checking, setChecking] = useState(false);

  const onFinish = (values: OtpForgotProps) => {
    setChecking(true);
    const params = {
      ...values,
      id: otpContext.id,
    };

    customAxios
      .post(`${process.env.REACT_APP_API_URL}/check`, params)
      .then((res) => {
        setChecking(false);
        if (res.data) {
          openNotification('success', 'Nhập mật khẩu mới');
          navigate('/reset-password');
        }
      })
      .catch((err) => {
        setChecking(false);
        console.log(err);
        openNotification(
          'error',
          err.data.message,
          'Kiểm tra lại mã OTP của bạn!'
        );
      });
  };

  const handleBackLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    navigate('/forgot');
  };

  return (
    <LayoutFormLogin>
      <Form name="basic" onFinish={onFinish} autoComplete="off">
        <Form.Item
          required
          name="otp"
          rules={[{ required: true, message: 'OTP trống!' }]}
        >
          <Input
            type="number"
            placeholder="Nhập mã OTP"
            className={`email-forgot ${stylesInput.input}`}
          />
        </Form.Item>

        <div className={styles.group_input}>
          <Button
            className={stylesButton.primary}
            loading={checking}
            htmlType="submit"
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

export default OtpForgot;
