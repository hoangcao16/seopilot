import DetailsCus from 'components/CustomerDetails';
import LayoutHome from 'components/Layouts/LayoutHome';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { InforCustomer } from 'types/customerInterfaces';
import customAxios from 'services/ApiClient';
export default function Details() {
  const { id } = useParams();
  const infor: InforCustomer = {
    avatar: '',
    id: 0,
    customerKey: '',
    name: '',
    email: '',
    phone: '',
    missionList: [],
  };

  const [customer, setCustomer] = useState(infor);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const detailCustomer = (id: string | undefined) => {
    setLoadingInfo(true);
    customAxios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/customers/${id}`)
      .then((res) => {
        setCustomer(res.data);
        setLoadingInfo(false);
      })
      .catch((err) => {
        setLoadingInfo(false);
      });
  };

  const handleSetCustomer = (value: any) => {
    setCustomer(value);
  };

  useEffect(() => {
    detailCustomer(id);
  }, []);
  return (
    <LayoutHome>
      <DetailsCus
        id={id}
        customer={customer}
        handleSetCustomer={handleSetCustomer}
      />
    </LayoutHome>
  );
}
