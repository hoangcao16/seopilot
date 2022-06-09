import styles from './styles.module.scss';
import { UserWithdraw } from 'types/userInterfaces';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { Table } from 'antd';
import { Withdraw } from 'types/EmployeeInterface';

interface UserTableWithdrawProps {
  id: any;
  user: Withdraw;
  handleSetUser: any;
}
interface WithdrawColumn {
  amount: number;
  moneyRemaining: number;
  createAt: number;
  updateAt: number;
}
var numeral = require('numeral');
const UserTableWithdraw = (props: UserTableWithdrawProps) => {
  const { id, user, handleSetUser } = props;
  const itemRender = (current: any, type: any, originalElement: any) => {
    if (type === 'prev') {
      return (
        <a href="/#" onClick={(e) => e.preventDefault()}>
          Sau
        </a>
      );
    }
    if (type === 'next') {
      return (
        <a href="/#" onClick={(e) => e.preventDefault()}>
          Tiếp
        </a>
      );
    }
    return originalElement;
  };

  const columns: ColumnsType<WithdrawColumn> = [
    {
      key: 'time',
      title: 'Time',
      dataIndex: 'time',
      render: (text, current: any) => {
        return (
          <div className={styles.amountTitle}>
            {`${moment(current.createdAt).format('HH:mm')} - ${moment(
              current.updateAt
            ).format('DD/MM/YYYY')}`}
          </div>
        );
      },
    },
    {
      key: 'amount-withdrawn',
      title: 'Amount Withdrawn',
      dataIndex: 'amountWithdrawn',

      render: (text, current: any) => {
        return (
          <div className={styles.inforWithdraw}>
            <p className={styles.amountTitle}>Bạn đã rút:</p>
            <p className={styles.amountValue}>
              {numeral(current.amount).format('0,0')} VNĐ
            </p>
          </div>
        );
      },
    },
    {
      key: 'remaining-amount',
      title: 'Remaining Amount',
      dataIndex: 'remainingAmount',
      render: (text, current: any) => {
        return (
          <div className={styles.inforWithdraw}>
            <p className={styles.amountTitle}>Số tiền còn lại:</p>
            <p className={styles.amountValue}>
              {numeral(current.moneyRemaining).format('0,0')} vnđ
            </p>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        pagination={{
          itemRender: itemRender,
          showSizeChanger: true,
          pageSizeOptions: ['20', '20', '20'],
        }}
        className={styles.UserTableWithdraw}
        showHeader={false}
        columns={columns}
        dataSource={user.data}
      />
    </div>
  );
};

export default UserTableWithdraw;
