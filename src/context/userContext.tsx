import { useContext, createContext, useState } from 'react';
import { userInfo } from 'types/LoginInterface';

interface InitContext {
  isDetail?: boolean;
  setIsDetail?: any;
  isDetailCustomer?: boolean;
  setIsDetailCustomer?: any;
  isDetailEmployee?: boolean;
  setIsDetailEmployee?: any;

  userInfo?: userInfo;
  setUserInfo?: any;
}

export const UsersContext = createContext({} as InitContext);

export const UsersContextProvider: React.FC<{}> = ({ children }) => {
  const [isDetail, setIsDetail] = useState(true);
  const [isDetailCustomer, setIsDetailCustomer] = useState(true);
  const [isDetailEmployee, setIsDetailEmployee] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  const data: any = {
    isDetail,
    setIsDetail,
    isDetailCustomer,
    setIsDetailCustomer,
    isDetailEmployee,
    setIsDetailEmployee,
    userInfo,
    setUserInfo,
  };

  return <UsersContext.Provider value={data}>{children}</UsersContext.Provider>;
};

export const useUsersContext = () => {
  return useContext(UsersContext);
};
