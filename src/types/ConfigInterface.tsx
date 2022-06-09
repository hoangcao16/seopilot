export interface ConfigProps {
  title: string;
  configs: Array<ConfigsItemProps>;
}
export interface ConfigsItemProps {
  type: string;
  inputs: Array<{
    nameInput: string;
    labelInput: string;
  }>;
}

export interface SubConfiguration {
  id: string | number;
  communication: string;
  type: string;
  minTime: number;
  maxTime: number;
  customerPay: number;
  userReceived: number;
}

export interface Configuration {
  id: number | string;
  maxMission: number;
  missionLifeCycle: number;
  isRepeat: boolean;
  subConfigs: Array<SubConfiguration>;
}
