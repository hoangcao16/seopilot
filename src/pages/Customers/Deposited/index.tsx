import LayoutHome from 'components/Layouts/LayoutHome';
import { DepositedCustomer } from 'components/CustomerDeposited';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Deposited } from 'types/customerInterfaces';
import customAxios from 'services/ApiClient';
export default function AddCustomer() {
  const { id } = useParams();
  const deposited: Deposited = {
    data: [],
  };
  const [customer, setCustomer] = useState(deposited);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const depositedCustomer = (id: string | undefined) => {
    setLoadingInfo(true);
    customAxios
      .get(
        `${process.env.REACT_APP_API_URL}/api/v1/customers/${id}/deposited?pageSize=100`
      )
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
    depositedCustomer(id);
  }, []);
  return (
    <LayoutHome>
      <DepositedCustomer
        id={id}
        customer={customer}
        handleSetCustomer={handleSetCustomer}
      />
    </LayoutHome>
  );
}
