import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Skeleton, Upload } from 'antd';
import { useUsersContext } from 'context/userContext';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import customAxios from 'services/ApiClient';
import { EmployeeProps } from 'types/EmployeeInterface';
import { openNotification } from 'utils/openNotification';
import styles from './styles.module.scss';

const EmployeeDetailContainer = () => {
  const { Option } = Select;
  const listRoles = ['ADMIN', 'EMPLOYEE'];

  const navigate = useNavigate();
  const context = useUsersContext();

  const [isEditPage, setIsEditPage] = useState(true);

  const param = useParams();
  const initEmployee: EmployeeProps = {
    avatar: '',
    id: '',
    name: '',
    email: '',
    phone: '',
    role: '',
    password: '',
  };
  const [employee, setEmployee] = useState(initEmployee);

  const [loadingInfo, setLoadingInfo] = useState(false);

  useEffect(() => {
    setLoadingInfo(true);
    customAxios
      .get(`${process.env.REACT_APP_API_URL}/employees/${param.id}`)
      .then((res) => {
        // console.log('get info', res.data);
        setEmployee(res.data);
        setLoadingInfo(false);
      })
      .catch((err) => {
        // console.log(err);
        setLoadingInfo(false);
      });
  }, [param]);

  const handleEdit = () => {
    context.setIsDetailEmployee(false);
    setIsEditPage(false);
  };

  const handleBack = () => {
    isEditPage ? navigate(-1) : context.setIsDetailEmployee(true);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
    // navigate(-1);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onChangeInput = (e: any) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    // console.log('submit: ', employee);
    customAxios
      .put(
        `${process.env.REACT_APP_API_URL}/employees/${employee.id}`,
        employee
      )
      .then((res) => {
        // console.log(res);
        openNotification('success', 'Sửa thông tin thành công!');
        navigate('/employees');
      })
      .catch((err) => {
        // console.log(err);
        openNotification(
          'error',
          'Sửa thông tin không thành công!',
          'Kiểm tra lại các trường thông tin.'
        );
      });
  };

  // XÓA
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    'Bạn có chắc muốn xóa nhân viên này?'
  );

  const handleDelete = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText('Đang xóa nhân viên...');
    setConfirmLoading(true);

    customAxios
      .delete(`${process.env.REACT_APP_API_URL}/employees/${employee.id}`)
      .then((res) => {
        setVisible(false);
        setConfirmLoading(false);
        openNotification('success', 'Xóa thành công');
        navigate('/employees');
      })
      .catch((err) => {
        openNotification('error', 'Xóa thất bại');
      });
  };

  const handleCancel = () => {
    // console.log('Đã hủy hành động');
    setVisible(false);
  };

  const handleChange = (info: any) => {
    const formData = new FormData();
    formData.set('avatar', info.file.originFileObj);

    customAxios
      .post(`${process.env.REACT_APP_API_URL}/image/`, formData)
      .then((res) => {
        setEmployee({ ...employee, avatar: res.data });
      });
  };

  return (
    <div className={styles.UserDetail}>
      <div className={`${styles.center} ${styles.userHeader}`}>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          onChange={handleChange}
        >
          {employee.avatar === '' ? (
            <div>
              <UserOutlined />
            </div>
          ) : (
            <img src={employee.avatar} alt="avatar" style={{ width: '100%' }} />
          )}
        </Upload>
      </div>
      <div className={styles.userInfo}>
        {loadingInfo ? (
          <>
            <Skeleton active />
            <Skeleton active />
          </>
        ) : (
          <Form
            name="basic"
            initialValues={employee}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item>
              <div className={styles.userInfoItem}>
                <label>Mã nhân viên</label>
                <Input
                  type="text"
                  defaultValue=""
                  readOnly
                  value={`NV${employee.id}`}
                />
              </div>
            </Form.Item>
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
                  name="name"
                  type="text"
                  id="Name"
                  placeholder={'Nhập tên nhân viên'}
                  value={`${employee.name}`}
                  onChange={onChangeInput}
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
                <Input
                  name="email"
                  type="text"
                  defaultValue=""
                  placeholder="Nhập email"
                  value={`${employee.email}`}
                  onChange={onChangeInput}
                />
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
                <Input.Password
                  // type="password"
                  name="password"
                  defaultValue=""
                  placeholder="Nhập mật khẩu"
                  value={`${employee.password}`}
                  onChange={onChangeInput}
                />
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
                  name="phone"
                  value={`${employee.phone}`}
                  onChange={onChangeInput}
                />
              </div>
            </Form.Item>

            <Form.Item
              name="role"
              rules={[
                {
                  // required: true,
                  // message: 'Chọn role',
                },
              ]}
            >
              <div className={styles.userInfoItem}>
                <label className={styles.labelRole} htmlFor="role">
                  Role
                </label>
                <Select
                  placeholder="Chọn role"
                  className={styles.select}
                  value={employee.role}
                  onSelect={(value: string) => {
                    setEmployee({ ...employee, role: value });
                  }}
                >
                  {listRoles.map((item: string) => (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </div>
            </Form.Item>

            {context.isDetailEmployee ? (
              <div className={`${styles.center} ${styles.footer}`}>
                <Button onClick={handleDelete}>Xóa</Button>
                <div className={styles.btnConfirm}>
                  <Button htmlType="button" onClick={handleEdit} type="primary">
                    Sửa
                  </Button>
                </div>
              </div>
            ) : (
              <div className={`${styles.center} ${styles.footer}`}>
                <Button onClick={handleBack}>Hủy</Button>
                <div className={styles.btnConfirm}>
                  <Form.Item>
                    <div>
                      <Button
                        type="primary"
                        htmlType="button"
                        onClick={onSubmit}
                      >
                        Lưu
                      </Button>
                    </div>
                  </Form.Item>
                </div>
              </div>
            )}
          </Form>
        )}
      </div>
      <Button
        className={styles.btnBack}
        type="default"
        shape="round"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftOutlined />
      </Button>

      <Modal
        title="Xác nhận xóa Nhiệm vụ"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        cancelText="Không"
      >
        <p>{modalText}</p>
      </Modal>
    </div>
  );
};

export default EmployeeDetailContainer;
