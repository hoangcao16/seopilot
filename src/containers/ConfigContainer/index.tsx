import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Spin,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import customAxios from 'services/ApiClient';
import { Configuration } from 'types/ConfigInterface';
import { openNotification } from 'utils/openNotification';
import stylesButton from '../../styles/buttonLogin.module.scss';
import styles from './styles.module.scss';

const initConfig: Configuration = {
  id: 0,
  maxMission: 0,
  missionLifeCycle: 0,
  isRepeat: true,
  subConfigs: [],
};

const ConfigContainer = () => {
  const navigate = useNavigate();
  const [config, setConfig] = useState(initConfig);
  const [loading, setLoading] = useState(false);

  const [params, setParams] = useState({
    ggBackLinkCustomerPay: 0,
    ggBackLinkMaxTime: 0,
    ggBackLinkMinTime: 0,
    ggBackLinkUserReceived: 0,
    ggKeyCustomerPay: 0,
    ggKeyMaxTime: 0,
    ggKeyMinTime: 0,
    ggKeyUserReceived: 0,
    ggMissionCustomerPay: 0,
    ggMissionMaxTime: 0,
    ggMissionMinTime: 0,
    ggMissionUserReceived: 0,
    isLoop: true,
    missionLifeCycle: 0,
    maxMission: 0,
    ytKeyCustomerPay: 0,
    ytKeyMaxTime: 0,
    ytKeyMinTime: 0,
    ytKeyUserReceived: 0,
  });

  const onFinish = () => {
    // console.log('🚀 param', params);

    customAxios
      .post(`${process.env.REACT_APP_API_URL}/config`, params)
      .then((res) => {
        navigate('/configuration');
        openNotification(
          'success',
          'Thông báo',
          'Thay đổi cấu hình thành công!'
        );
      })
      .catch((err) => {
        console.log(err);
        const message = err.data.message;
        openNotification('warning', 'Không thành công!', message);
      });
  };

  const getConfiguration = () => {
    setLoading(true);
    customAxios
      .get(`${process.env.REACT_APP_API_URL}/config`)
      .then((res) => {
        setConfig(res.data.config);
        setLoading(false);

        const subConfigs = res.data.config.subConfigs;

        setParams({
          ggBackLinkCustomerPay: subConfigs[2]?.customerPay,
          ggBackLinkMaxTime: subConfigs[2]?.maxTime,
          ggBackLinkMinTime: subConfigs[2]?.minTime,
          ggBackLinkUserReceived: subConfigs[2]?.userReceived,

          ggKeyCustomerPay: subConfigs[1]?.customerPay,
          ggKeyMaxTime: subConfigs[1]?.maxTime,
          ggKeyMinTime: subConfigs[1]?.minTime,
          ggKeyUserReceived: subConfigs[1]?.userReceived,

          ggMissionCustomerPay: subConfigs[3]?.customerPay,
          ggMissionMaxTime: subConfigs[3]?.maxTime,
          ggMissionMinTime: subConfigs[3]?.minTime,
          ggMissionUserReceived: subConfigs[3]?.userReceived,

          isLoop: res.data.config.isRepeat,
          missionLifeCycle: res.data.config.missionLifeCycle,
          maxMission: res.data.config.maxMission,

          ytKeyCustomerPay: subConfigs[0]?.customerPay,
          ytKeyMaxTime: subConfigs[0]?.maxTime,
          ytKeyMinTime: subConfigs[0]?.minTime,
          ytKeyUserReceived: subConfigs[0]?.userReceived,
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getConfiguration();
  }, []);

  const onChangeInput = (e: any) => {
    let value = e.target.value;
    if (value === '') {
      value = 0;
    }

    if (e.target.name === 'isLoop') {
      value = e.target.checked;
    }
    setParams({ ...params, [e.target.name]: parseInt(value) });
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <Spin
          size="large"
          style={{ margin: ' auto', display: 'block', padding: '100px' }}
        />
      ) : (
        <Form onFinish={onFinish} initialValues={config}>
          <div className={styles.main}>
            <Typography.Title level={5} className={styles.title}>
              Cấu hình Dwell time
            </Typography.Title>

            <Row gutter={[64, 24]}>
              {/* Youtube - Chạy từ khóa */}
              <Col xs={24} xl={12}>
                <Typography.Text className={styles.type}>
                  {`${config.subConfigs[0]?.communication} - ${config.subConfigs[0]?.type}`}
                </Typography.Text>

                <Form.Item name="ytKeyMinTime" className={styles.item}>
                  <div className={styles.item_input}>
                    <label htmlFor="">Min time</label>
                    <Input
                      name="ytKeyMinTime"
                      suffix="s"
                      type="number"
                      min="0"
                      value={params.ytKeyMinTime}
                      onChange={onChangeInput}
                    />
                  </div>
                </Form.Item>

                <Form.Item name="ytKeyMaxTime" className={styles.item}>
                  <div className={styles.item_input}>
                    <label htmlFor="">Max time</label>
                    <Input
                      suffix="s"
                      name="ytKeyMaxTime"
                      type="number"
                      min="0"
                      value={params.ytKeyMaxTime}
                      onChange={onChangeInput}
                    />
                  </div>
                </Form.Item>
              </Col>

              {/* Google - Chạy từ khóa */}
              <Col xs={24} xl={12}>
                <Typography.Text className={styles.type}>
                  {`${config.subConfigs[1]?.communication} - ${config.subConfigs[1]?.type}`}
                </Typography.Text>

                <Form.Item name="ggKeyMinTime" className={styles.item}>
                  <div className={styles.item_input}>
                    <label htmlFor="">Min time</label>
                    <Input
                      suffix="s"
                      name="ggKeyMinTime"
                      type="number"
                      min="0"
                      value={params.ggKeyMinTime}
                      onChange={onChangeInput}
                    />
                  </div>
                </Form.Item>

                <Form.Item name="ggKeyMaxTime" className={styles.item}>
                  <div className={styles.item_input}>
                    <label htmlFor="">Max time</label>
                    <Input
                      suffix="s"
                      name="ggKeyMaxTime"
                      type="number"
                      min="0"
                      value={params.ggKeyMaxTime}
                      onChange={onChangeInput}
                    />
                  </div>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[64, 24]}>
              {/* Google - Chạy backlink */}
              <Col xs={24} xl={12}>
                <Typography.Text className={styles.type}>
                  {`${config.subConfigs[2]?.communication} - ${config.subConfigs[2]?.type}`}
                </Typography.Text>

                <Form.Item name="ggBackLinkMinTime" className={styles.item}>
                  <div className={styles.item_input}>
                    <label htmlFor="">Min time</label>
                    <Input
                      suffix="s"
                      name="ggBackLinkMinTime"
                      type="number"
                      min="0"
                      value={params.ggBackLinkMinTime}
                      onChange={onChangeInput}
                    />
                  </div>
                </Form.Item>

                <Form.Item name="ggBackLinkMaxTime" className={styles.item}>
                  <div className={styles.item_input}>
                    <label htmlFor="">Max time</label>
                    <Input
                      suffix="s"
                      type="number"
                      name="ggBackLinkMaxTime"
                      min="0"
                      value={params.ggBackLinkMaxTime}
                      onChange={onChangeInput}
                    />
                  </div>
                </Form.Item>
              </Col>
              {/* Google - Nhiệm vụ phức tạp */}
              <Col xs={24} xl={12}>
                <Typography.Text className={styles.type}>
                  {`${config.subConfigs[3]?.communication} - ${config.subConfigs[3]?.type}`}
                </Typography.Text>

                <Form.Item name="ggMissionMinTime" className={styles.item}>
                  <div className={styles.item_input}>
                    <label htmlFor="">Min time</label>
                    <Input
                      suffix="s"
                      type="number"
                      name="ggMissionMinTime"
                      min="0"
                      value={params.ggMissionMinTime}
                      onChange={onChangeInput}
                    />
                  </div>
                </Form.Item>

                <Form.Item name="ggMissionMaxTime" className={styles.item}>
                  <div className={styles.item_input}>
                    <label htmlFor="">Max time</label>
                    <Input
                      suffix="s"
                      name="ggMissionMaxTime"
                      type="number"
                      min="0"
                      value={params.ggMissionMaxTime}
                      onChange={onChangeInput}
                    />
                  </div>
                </Form.Item>
              </Col>
            </Row>

            <Typography.Title level={5} className={styles.title}>
              Cấu hình giá tiền
            </Typography.Title>

            <Row gutter={[64, 24]}>
              {/* Youtube - Chạy từ khóa */}
              <Col xs={24} xl={12}>
                <Typography.Text className={styles.type}>
                  {`${config.subConfigs[0]?.communication} - ${config.subConfigs[0]?.type}`}
                </Typography.Text>

                <Form.Item name="ytKeyCustomerPay" className={styles.item}>
                  <div className={styles.item_input}>
                    <label htmlFor="">KH phải trả</label>
                    <Input
                      suffix="vnđ"
                      name="ytKeyCustomerPay"
                      type="number"
                      min="0"
                      value={params.ytKeyCustomerPay}
                      onChange={onChangeInput}
                    />
                  </div>
                </Form.Item>

                <Form.Item name="ytKeyUserReceived" className={styles.item}>
                  <div className={styles.item_input}>
                    <label htmlFor="">ND nhận được</label>
                    <Input
                      suffix="vnđ"
                      name="ytKeyUserReceived"
                      type="number"
                      min="0"
                      value={params.ytKeyUserReceived}
                      onChange={onChangeInput}
                    />
                  </div>
                </Form.Item>
              </Col>

              {/* Google - Chạy tử khóa */}
              <Col xs={24} xl={12}>
                <Typography.Text className={styles.type}>
                  {`${config.subConfigs[1]?.communication} - ${config.subConfigs[1]?.type}`}
                </Typography.Text>

                <Form.Item name="ggKeyCustomerPay" className={styles.item}>
                  <div className={styles.item_input}>
                    <label htmlFor="">KH phải trả</label>
                    <Input
                      suffix="vnđ"
                      name="ggKeyCustomerPay"
                      type="number"
                      min="0"
                      value={params.ggKeyCustomerPay}
                      onChange={onChangeInput}
                    />
                  </div>
                </Form.Item>

                <Form.Item name="ggKeyUserReceived" className={styles.item}>
                  <div className={styles.item_input}>
                    <label htmlFor="">ND nhận được</label>
                    <Input
                      suffix="vnđ"
                      name="ggKeyUserReceived"
                      type="number"
                      min="0"
                      value={params.ggKeyUserReceived}
                      onChange={onChangeInput}
                    />
                  </div>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[64, 24]}>
              {/* Google - Chạy backlink */}
              <Col xs={24} xl={12}>
                <Typography.Text className={styles.type}>
                  {`${config.subConfigs[2]?.communication} - ${config.subConfigs[2]?.type}`}
                </Typography.Text>

                <Form.Item name="ggBackLinkCustomerPay" className={styles.item}>
                  <div className={styles.item_input}>
                    <label htmlFor="">KH phải trả</label>
                    <Input
                      suffix="vnđ"
                      type="number"
                      name="ggBackLinkCustomerPay"
                      min="0"
                      value={params.ggBackLinkCustomerPay}
                      onChange={onChangeInput}
                    />
                  </div>
                </Form.Item>

                <Form.Item
                  name="ggBackLinkUserReceived"
                  className={styles.item}
                >
                  <div className={styles.item_input}>
                    <label htmlFor="">ND nhận được</label>
                    <Input
                      suffix="vnđ"
                      name="ggBackLinkUserReceived"
                      type="number"
                      min="0"
                      value={params.ggBackLinkUserReceived}
                      onChange={onChangeInput}
                    />
                  </div>
                </Form.Item>
              </Col>

              {/* Google - Nhiệm vụ phức tạp */}
              <Col xs={24} xl={12}>
                <Typography.Text className={styles.type}>
                  {`${config.subConfigs[3]?.communication} - ${config.subConfigs[3]?.type}`}
                </Typography.Text>

                <Form.Item name="ggMissionCustomerPay" className={styles.item}>
                  <div className={styles.item_input}>
                    <label htmlFor="">KH phải trả</label>
                    <Input
                      suffix="vnđ"
                      name="ggMissionCustomerPay"
                      type="number"
                      min="0"
                      value={params.ggMissionCustomerPay}
                      onChange={onChangeInput}
                    />
                  </div>
                </Form.Item>

                <Form.Item name="ggMissionUserReceived" className={styles.item}>
                  <div className={styles.item_input}>
                    <label htmlFor="">ND nhận được</label>
                    <Input
                      suffix="vnđ"
                      name="ggMissionUserReceived"
                      type="number"
                      min="0"
                      value={params.ggMissionUserReceived}
                      onChange={onChangeInput}
                    />
                  </div>
                </Form.Item>
              </Col>
            </Row>

            <div>
              <Row gutter={[48, 48]}>
                <Col xs={24} xl={12}>
                  <Typography.Title level={5} className={styles.title}>
                    Cấu hình nhiệm vụ
                  </Typography.Title>
                </Col>
              </Row>
              <Row>
                <Col xs={24} xl={15}>
                  <Form.Item name="maxMission" className={styles.item}>
                    <div className={styles.item_input}>
                      <label htmlFor="">Số nhiệm vụ tối đa/user/ngày</label>
                      <Input
                        suffix="nhiệm vụ"
                        type="number"
                        name="maxMission"
                        min="0"
                        value={params.maxMission}
                        onChange={onChangeInput}
                      />
                    </div>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col xs={24} xl={15} className={styles.has_checkbox}>
                  <Form.Item name="missionLifeCycle" className={styles.item}>
                    <div className={styles.item_input}>
                      <label htmlFor="">Vòng đời của nhiệm vụ</label>
                      <Input
                        suffix="ngày"
                        name="missionLifeCycle"
                        type="number"
                        min="0"
                        value={params.missionLifeCycle}
                        onChange={onChangeInput}
                      />
                    </div>
                  </Form.Item>
                  <Form.Item
                    name="isLoop"
                    valuePropName="checked"
                    className={styles.checkbox}
                  >
                    <Checkbox
                      name="isLoop"
                      checked={params.isLoop}
                      onChange={onChangeInput}
                    >
                      Không lặp lại
                    </Checkbox>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </div>
          <div className={styles.group_button}>
            <Button
              className={stylesButton.white}
              htmlType="button"
              onClick={() => navigate('/')}
            >
              Huỷ
            </Button>
            <Button className={stylesButton.primary} htmlType="submit">
              Lưu
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default ConfigContainer;
