import LayoutHome from 'components/Layouts/LayoutHome';
import { BannerCustomer } from 'components/BannerPageCustomer';
import CustomerTable from 'components/CustomerTable';
import styles from './styles.module.scss';
import React, { useEffect, useState } from 'react';
import customAxios from 'services/ApiClient';
import { openNotification } from 'utils/openNotification';
import { Spin } from 'antd';

export default function Customer() {
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(false);
  const CustomerData = (valueSearch?: string) => {
    setLoading(true);
    let url = `${process.env.REACT_APP_API_URL}/api/v1/customers/?pageSize=100`;
    if (valueSearch) {
      url = `${process.env.REACT_APP_API_URL}/api/v1/customers/search??pageSize=100&keyWord=${valueSearch}`;
    }
    customAxios.get(url).then((res) => {
      setCustomer(res.data.data);
      console.log('res', res.data.data);
      setLoading(false);
    });
  };

  const deleteCustomer = (id: string) => {
    customAxios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/v1/customers/delete?id=${id}`
      )
      .then((res) => {
        openNotification('success', 'Xóa thành công');
        CustomerData();
      })
      .catch((err) => {
        openNotification('error', 'Xóa thất bại');
      });
  };
  const handleSearch = (value: string) => {
    CustomerData(value);
  };
  useEffect(() => {
    CustomerData();
  }, []);
  return (
    <LayoutHome>
      <div className={styles.CusLayout}>
        <BannerCustomer handleSearch={handleSearch} />
        {loading ? (
          <Spin
            size="large"
            style={{ margin: '40px auto', display: 'block' }}
          />
        ) : (
          <CustomerTable customer={customer} deleteCustomer={deleteCustomer} />
        )}
      </div>
    </LayoutHome>
  );
}
