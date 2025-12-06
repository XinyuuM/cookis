import Layout from '@theme/Layout';
import DigitalClock from '@site/src/components/digital-clock';
import React, { useState, useEffect, useCallback } from 'react';

function ClockPage() {
  return (
    <Layout
      title="时钟"
      description="精确的互联网时间服务，支持多时区切换"
    >
      <div className="container margin-vert--xl">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <header className="text--center margin-bottom--xl">
            </header>
            
            <DigitalClock 
              showTimezoneSelector={true}
              showDate={true}
              showSeconds={true}
              autoSwitch={true}
            />
            
            <div className="margin-top--lg text--center">
             
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ClockPage;