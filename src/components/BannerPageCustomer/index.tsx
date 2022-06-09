import styles from './styles.module.scss';
import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
export interface CustomerProps {
  handleSearch: Function;
}
export const BannerCustomer = (props: CustomerProps) => {
  const { handleSearch } = props;
  const [valueSearch, setValueSearch] = useState('');

  const onChange = (e: any) => {
    setValueSearch(e.target.value);
  };

  const onEnterPress = () => {
    handleSearch(valueSearch);
  };
  return (
    <div className={styles.banner}>
      <Input
        size="large"
        className={styles.wrapper}
        placeholder="Tìm khách hàng"
        prefix={<SearchOutlined className={styles.icon} />}
        onChange={onChange}
        onPressEnter={onEnterPress}
      />
      <Button className={`${styles['ant-button']}`} key="customers/add">
        <Link to="/customers/add">
          <span style={{ color: '#4285f4' }}>Thêm mới</span>
        </Link>
      </Button>
    </div>
  );
};
