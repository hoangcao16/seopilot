import { notification } from 'antd';

export const openNotification = (
  type: 'open' | 'success' | 'error' | 'info' | 'warning' | 'warn',
  title?: string,
  desc?: string
) => {
  switch (type) {
    case 'open': {
      notification.open({
        message: title,
        description: desc,
        style: {
          boxShadow: 'blue 0px 10px 10px -10px',
        },
      });
      break;
    }

    case 'success': {
      notification.success({
        message: title,
        description: desc,
        style: {
          boxShadow: 'green 0px 10px 10px -10px',
        },
      });
      break;
    }

    case 'error': {
      notification.error({
        message: title,
        description: desc,
        style: {
          boxShadow: 'red 0px 10px 10px -10px',
        },
      });
      break;
    }

    case 'info': {
      notification.info({
        message: title,
        description: desc,
        style: {
          boxShadow: 'lightBlue 0px 10px 10px -10px',
        },
      });
      break;
    }

    case 'warning': {
      notification.warning({
        message: title,
        description: desc,
        style: {
          boxShadow: 'orange 0px 10px 10px -10px',
        },
      });
      break;
    }

    case 'warn': {
      notification.warn({
        message: title,
        description: desc,
        style: {
          boxShadow: 'orange 0px 10px 10px -10px',
        },
      });
      break;
    }
  }
};
