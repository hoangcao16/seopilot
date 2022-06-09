import { Table, Space, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import styles from './styles.module.scss';
import moment from 'moment';
import { useContext, createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Deposited } from 'types/customerInterfaces';

//import { Deposited } from 'types/customerInterfaces';

interface Context {
  isInfor?: boolean;
  setInfor?: any;
}
const UsersContext = createContext({} as Context);
var numeral = require('numeral');
export const UsersContextProvider: React.FC<{}> = ({ children }) => {
  const [isInfor, setInfor] = useState(true);
  const data: any = {
    isInfor,
    setInfor,
  };

  return <UsersContext.Provider value={data}>{children}</UsersContext.Provider>;
};

export const useCusContext = () => {
  return useContext(UsersContext);
};

interface DepositedProps {
  id: any;
  customer: Deposited;
  handleSetCustomer: any;
}

interface DespositedColumn {
  amount: number;
  moneyRemaining: number;
  createAt: number;
  updateAt: number;
}
export const DepositedCustomer = (props: DepositedProps) => {
  const { id, customer, handleSetCustomer } = props;
  function itemRender(current: any, type: any, originalElement: any) {
    if (type === 'prev') {
      return <p>Sau</p>;
    }
    if (type === 'next') {
      return <p>Tiếp</p>;
    }
    return originalElement;
  }
  const navigate = useNavigate();
  const columns: ColumnsType<DespositedColumn> = [
    {
      render: (text, record: any) => (
        <Space>
          <p className={styles.Text}>
            {`${moment(record.createdAt).format('HH:mm')} - ${moment(
              record.updateAt
            ).format('DD/MM/YYYY')}`}
          </p>
        </Space>
      ),
    },
    {
      render: (text, record: any) => (
        <Space size="middle">
          <div>
            <div className={styles.Text}>
              <p>Bạn đã nạp</p>
            </div>
            <div className={styles.Amount}>
              <p>{numeral(record.amount).format('0,0')} VNĐ</p>
            </div>
          </div>
        </Space>
      ),
    },
    {
      render: (text, record: any) => (
        <Space size="middle">
          <div>
            <div className={styles.Text}>
              <p>Số tiền còn lại</p>
            </div>
            <div className={styles.Amount}>
              <p>{numeral(record.moneyRemaining).format('0,0')} vnđ</p>
            </div>
          </div>
        </Space>
      ),
    },
  ];
  const formatDate = moment(
    moment(new Date(+new Date() - Math.floor(Math.random() * 10000000000)))
  ).format('DD/MM/YYYY');
  //const time = '15:30:00';
  const formatTime = moment(
    moment(
      new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
      'HH:mm'
    )
  ).format('hh : mm ');
  //console.log(formatTimme);

  return (
    <div className={styles.CusLayout}>
      <div className={styles.FormatLayout}>
        <div className={styles.Content}>
          <p>Lịch sử nạp tiền</p>
        </div>
        <Table
          showHeader={false}
          pagination={{
            itemRender: itemRender,
            showSizeChanger: true,
            pageSizeOptions: ['20', '20', '20'],
          }}
          columns={columns}
          dataSource={customer.data}
        />
      </div>
      <Button
        className={styles.btnBack}
        type="primary"
        onClick={() => navigate(-1)}
      >
        Trở về
      </Button>
    </div>
  );
};
