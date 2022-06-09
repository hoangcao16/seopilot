import { useContext, createContext, useState } from 'react';

interface InitContext {
  email: string;
  setEmail: Function;
  id: string | number;
  setId: Function;
  otp: number;
  setOtp: Function;
}

export const OTPContext = createContext({} as InitContext);

export const OTPContextProvider: React.FC<{}> = ({ children }) => {
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [otp, setOtp] = useState('');

  const data: any = {
    email,
    setEmail,
    id,
    setId,
    otp,
    setOtp,
  };

  return <OTPContext.Provider value={data}>{children}</OTPContext.Provider>;
};

export const useOTPContext = () => {
  return useContext(OTPContext);
};
