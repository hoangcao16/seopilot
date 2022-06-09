import { Affix, Col, Layout, Row } from 'antd';
import HeaderComponent from 'components/Header';
import LeftMenu from 'components/LeftMenu';
import { ReactNode } from 'react';
import styles from './styles.module.scss';

const { Header, Content } = Layout;

export interface LayoutHomeProps {
  children: ReactNode;
}

export default function LayoutHome({ children }: LayoutHomeProps) {
  return (
    <Layout className={styles.layoutHome}>
      <Affix offsetTop={0}>
        <div>
          <Header className={styles.headerWrapper}>
            <HeaderComponent />
          </Header>
        </div>
      </Affix>
      <Layout className={styles.headerContent}>
        <Row>
          <Col span={5}>
            <LeftMenu />
          </Col>
          <Col span={19}>
            <Content>{children}</Content>
          </Col>
        </Row>
      </Layout>
    </Layout>
  );
}
