import LayoutHome from 'components/Layouts/LayoutHome';
import ConfigContainer from 'containers/ConfigContainer';
import React from 'react';
import { Helmet } from 'react-helmet';

export default function Configuration() {
  return (
    <LayoutHome>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cấu hình</title>
      </Helmet>
      <ConfigContainer />
    </LayoutHome>
  );
}
