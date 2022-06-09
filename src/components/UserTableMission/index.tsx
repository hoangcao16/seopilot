import styles from './styles.module.scss';
import { UserMission } from 'types/userInterfaces';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { Table } from 'antd';
import { MissionDetail } from 'types/Missions';

interface UserTableMissionProps {
  id: any;
  user: MissionDetail;
  handleSetUser: any;
}
interface DetailColum {
  time: number;
  totalMission: number;
  totalMoney: number;
}
var numeral = require('numeral');
const UserTableMission = (props: UserTableMissionProps) => {
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
  //fomat Time
  const formatTime = moment(
    moment(new Date(+new Date() - Math.floor(Math.random() * 10000000000)))
  ).format('DD/MM/YYYY');
  const columns: ColumnsType<DetailColum> = [
    {
      key: 'time',
      title: 'Time',
      dataIndex: 'time',
      render: (text, current: any) => {
        return (
          <div className={styles.amountTitle}>
            {`${moment(current.time).format('DD/MM/YYYY')}`}
          </div>
        );
      },
    },
    {
      key: 'mission',
      title: 'Mission',
      dataIndex: 'mission',
      align: 'center',
      render: (text, current: any) => {
        return (
          <div>
            <p className={styles.missionTitle}>Bạn đã thực hiện:</p>
            <p className={styles.missionValue}>
              {numeral(current.totalMission).format('0,0')} nhiệm vụ
            </p>
          </div>
        );
      },
    },
    {
      key: 'bountyAmount',
      title: 'Bounty Amount',
      dataIndex: 'bountyAmount',
      align: 'center',
      render: (text, current: any) => {
        return (
          <div>
            <p className={styles.missionTitle}>Số tiền kiếm được:</p>
            <p className={styles.missionValue}>
              {numeral(current.totalMoney).format('0,0')} VNĐ
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
          pageSizeOptions: ['10', '20', '30'],
        }}
        className={styles.UserTableMission}
        showHeader={false}
        columns={columns}
        dataSource={user.data}
      />
    </div>
  );
};

export default UserTableMission;
