import React from 'react';
import Layout from '@theme/Layout';
import QSLList from '../../components/qslcard/QSLList';

function QSLPage() {
  return (
    <Layout
      title="QSL卡片查询"
      description="业余无线电QSL卡片查询系统"
    >
      <div style={{ minHeight: 'calc(100vh - 60px)' }}>
        <QSLList />
      </div>
    </Layout>
  );
}

export default QSLPage;