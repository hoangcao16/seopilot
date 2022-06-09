export interface Mission {
  communication: string;
  companyName: string;
  customerName: string;
  deadTime: number;
  id: number;
  keyWord: string;
  link: string;
  missionDetails: Array<any>;
  missionKey: string;
  missionType: string;
  moneyReceived: null | string;
  name: string;
  priceUnit: number;
  quantity: number;
  quantityMade: number;
  customerKey: number;
}

export interface Detail {
  time: number;
  totalMission: number;
  totalMoney: number;
}
export interface MissionDetail {
 data: Detail[]
}