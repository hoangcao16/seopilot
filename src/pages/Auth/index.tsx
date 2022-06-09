import LayoutLogin from 'components/Layouts/LayoutLogin';
import React from 'react';
import { Helmet } from 'react-helmet';

export default function Auth() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Đăng nhập</title>
      </Helmet>
      <LayoutLogin />
    </>
  );
}
