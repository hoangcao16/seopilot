export interface Customer {
  key: number;
  id: string;
  name: string;
  phone: string;
  mission: number;
  amount: number;
}
export interface Mission {
  id?: number;
  missionKey: string;
  name: string;
  communication: string;
  missionType: string;
  quantity?: number;
  quantityMade?: number;
  keyWord: string;
  link: string;
  status: string;
}
export interface InforCustomer {
  avatar: string;
  id: number;
  customerKey: string;
  name: string;
  email: string;
  phone: string;
  moneyRemaining?: number;
  moneyAvailable?: number;
  missionList: Mission[];
}
export interface Transaction {
  amount: number;
  moneyRemaining: number;
  createAt: number;
  updateAt: number;
}
export interface Deposited {
  data: Transaction[];
}
