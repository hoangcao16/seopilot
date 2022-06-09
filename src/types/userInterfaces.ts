export interface User {
  key: number;
  ID: string;
  name: string;
  phone: string;
  mission: number;
  amount: number;
  cash: number;
}

export interface UserWithdraw {
  key: number;
  date: string;
  time: string;
  amountWithdrawn: number;
  remainingAmount: number;
}
export interface UserMission {
  key: number;
  time: string;
  mission: number;
  bountyAmount: number;
}
export interface Mission {
  status: string;
  nameMission: string;
  id: number;
  createAt: number;
  updateAt: number;
}
export interface InforUser {
  userKey: string;
  avatar: string;
  id: number;
  name: string;
  phone: string;
  email: string;
  amountMoneyReceive: number;
  moneyWithdrawn: number;
  moneyRemaining: number;
  missionDetailList: Mission[];
}
