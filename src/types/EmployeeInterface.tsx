export interface EmployeeProps {
  avatar: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  password: string;
}
export interface WithdrawList {
  amount: number;
  moneyRemaining: number;
  createAt: number;
  updateAt: number;
}
export interface Withdraw {
  data: WithdrawList[];
}
