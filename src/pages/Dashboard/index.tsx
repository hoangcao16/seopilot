import LayoutHome from 'components/Layouts/LayoutHome';
import { Helmet } from 'react-helmet';
import styles from './styles.module.scss';

export default function Dashboard() {
  return (
    <LayoutHome>
      <Helmet>
        <meta charSet="utf-8" />
        <title>VinaSEO - Quản lý</title>
      </Helmet>
      <div className={styles.wrapper}></div>
    </LayoutHome>
  );
}
