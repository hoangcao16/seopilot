import { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Upload } from 'antd';
import { useUsersContext } from 'context/userContext';
import AvatarImg from './avatar.png';
import styles from './styles.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import customAxios from 'services/ApiClient';
import { InforUser } from 'types/userInterfaces';
import { openNotification } from 'utils/openNotification';
import { UserOutlined } from '@ant-design/icons';
const UserDetailContainer = () => {
  const navigate = useNavigate();
  const { isDetail, setIsDetail } = useUsersContext();
  const [isEdit, setIsEdit] = useState(false);
  const numeral = require('numeral');
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    'Bạn có chắc muốn xóa người dùng này?'
  );

  const param = useParams();
  const infor: InforUser = {
    avatar: '',
    id: 0,
    userKey: '',
    name: '',
    email: '',
    phone: '',
    amountMoneyReceive: 0,
    moneyWithdrawn: 0,
    moneyRemaining: 0,
    missionDetailList: [],
  };

  const [user, setUser] = useState(infor);
  const [loadingInfo, setLoadingInfo] = useState(false);

  useEffect(() => {
    setLoadingInfo(true);
    customAxios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/users/${param.id}`)
      .then((res) => {
        setUser(res.data);
        setLoadingInfo(false);
      })
      .catch((err) => {
        setLoadingInfo(false);
      });
  }, [param]);

  // handle click Delete
  const handleDelete = () => {
    setVisible(true);
  };
  //handle click Edit
  const handleEdit = () => {
    setIsDetail(false);
    setIsEdit(true);
  };
  //handle click Cancel
  const handleBack = () => {
    if (isEdit) {
      setIsDetail(true);
    } else {
      navigate(`/users/`);
    }
  };
  //handle click Save
  const handleSave = () => {
    customAxios
      .put(
        `${process.env.REACT_APP_API_URL}/api/v1/users/${user.id}?name=${user.name}&phone=${user.phone}`,
        user
      )
      .then((res) => {
        openNotification('success', 'Sửa thông tin thành công!');
        navigate('/users');
      })
      .catch((err) => {
        openNotification(
          'error',
          'Sửa thông tin không thành công!',
          'Kiểm tra lại các trường thông tin.'
        );
      });
  };
  const onFinish = (values: any) => {
    console.log('Success:', values);
    handleSave();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleOk = () => {
    setModalText('Đang xóa khách hàng...');
    setConfirmLoading(true);

    customAxios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/v1/users/delete?id=${user.id}`
      )
      .then((res) => {
        setVisible(false);
        setConfirmLoading(false);
        openNotification('success', 'Xóa thành công');
        navigate('/users');
      })
      .catch((err) => {
        openNotification('error', 'Xóa thất bại');
      });
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const handleChange = (info: any) => {
    const formData = new FormData();
    formData.set('avatar', info.file.originFileObj);
    customAxios
      .post(`${process.env.REACT_APP_API_URL}/image/`, formData)
      .then((res) => {
        setUser({ ...user, avatar: res.data });
      });
  };
  return (
    <div className={styles.UserDetail}>
      <div className={`${styles.center} ${styles.userHeader}`}>
        <Upload
          name="avatar"
          listType="picture-card"
          className={styles.PicLoad}
          showUploadList={false}
          onChange={handleChange}
          //style={{ width: '5%' }}
        >
          {user.avatar === '' ? (
            <div>
              <UserOutlined />
            </div>
          ) : (
            <img src={user.avatar} alt="avatar" style={{ width: '100%' }} />
          )}
        </Upload>
        <p
          style={{
            margin: '14px 0px',
          }}
        >
          {user.name}
        </p>
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
          <Form.Item>
            <div className={styles.userInfoItem}>
              <label>Mã người dùng</label>
              <Input type="text" value={`${user.userKey}`} readOnly />
            </div>
          </Form.Item>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Chỉnh sửa tên người dùng',
              },
            ]}
          >
            <div className={styles.userInfoItem}>
              <label htmlFor="Name">Tên người dùng</label>
              <Input
                type="text"
                id="name"
                name="name"
                value={`${user.name}`}
                placeholder={'Nhập tên người dùng'}
                readOnly={isDetail ? true : false}
                onChange={onChange}
              />
            </div>
          </Form.Item>
          <Form.Item>
            <div className={styles.userInfoItem}>
              <label htmlFor="Email">Email</label>
              <Input type="text" value={`${user.email}`} readOnly />
            </div>
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: 'Chỉnh sửa số điện thoại',
              },
            ]}
          >
            <div className={styles.userInfoItem}>
              <label htmlFor="Phone">Số điện thoại</label>
              <Input
                type="text"
                id="phone"
                name="phone"
                placeholder="Nhập số điện thoại"
                value={`${user.phone}`}
                readOnly={isDetail ? true : false}
                onChange={onChange}
              />
            </div>
          </Form.Item>
          <Form.Item>
            <div className={styles.userInfoItem}>
              <label>Số tiền kiếm được</label>
              <Input
                type="text"
                value={
                  numeral(`${user.amountMoneyReceive}`).format(',') + ' vnđ'
                }
                readOnly
              />
            </div>
          </Form.Item>
          <Form.Item>
            <div className={styles.userInfoItem}>
              <label>Số tiền còn lại</label>
              <Input
                type="text"
                value={numeral(`${user.moneyRemaining}`).format(',') + ' vnđ'}
                readOnly
              />
            </div>
          </Form.Item>
          <div className={styles.btnViewAll}>
            <Button
              type="primary"
              onClick={() => navigate(`/users/${user.id}/withdraw`)}
            >
              Xem lịch sử rút tiền
            </Button>
          </div>
          <div className={styles.userMission}>
            <p className={styles.userMissionTitle}>Nhiệm vụ đã thực hiện:</p>
            <div>
              {user.missionDetailList.map((e) => (
                <p className={styles.userMissionItem} key={e.id}>
                  {e.nameMission}
                </p>
              ))}
            </div>
          </div>
          <div className={styles.btnViewAll}>
            <Button
              type="primary"
              onClick={() => navigate(`/users/${user.id}/missiondetail`)}
            >
              Xem tất cả
            </Button>
          </div>
          {isDetail ? (
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
                      htmlType="submit"
                      onClick={handleSave}
                    >
                      Lưu
                    </Button>
                  </div>
                </Form.Item>
              </div>
            </div>
          )}
        </Form>
      </div>
      <Button
        className={styles.btnBack}
        type="primary"
        onClick={() => navigate(-1)}
      >
        Trở về
      </Button>
      <Modal
        title="Xác nhận xóa khách hàng"
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

export default UserDetailContainer;
