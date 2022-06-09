import { PoweroffOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { MouseEventHandler } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

export interface ButtonComponentProps {
  children: JSX.Element | string;
  htmlType?: 'button' | 'reset' | 'submit';
  width?: number;
  height?: number;
  type: 'primary' | 'outline' | 'outlineBlue' | 'white';
  icon?: 'logout';
  borderRadius?: number;
  onClick?: MouseEventHandler<HTMLElement>;
}
export default function ButtonComponent(props: ButtonComponentProps) {
  const {
    children,
    htmlType,
    width,
    height,
    type,
    icon,
    borderRadius,
    onClick,
  } = props;

  const btnClass = classNames([`${styles.button}`], {
    [`${styles.buttonPrimary}`]: type === 'primary',
    [`${styles.buttonWhite}`]: type === 'white',
    [`${styles.buttonOutlineBlue}`]: type === 'outlineBlue',
    [`${styles.buttonOutline}`]: type === 'outline',
  });

  return (
    <Button
      className={btnClass}
      htmlType={htmlType}
      style={{ height: height, width: width, borderRadius: borderRadius }}
      onClick={onClick}
    >
      {icon === 'logout' && <PoweroffOutlined />}
      {children}
    </Button>
  );
}
