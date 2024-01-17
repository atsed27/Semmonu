import Layout from '@/components/Layout';
import React from 'react';
import Avatar from 'react-avatar';
function AvatarN() {
  return (
    <Layout>
      <div className="flex items-center justify-center mt-10">
        <div style={{ padding: '100px' }}>
          {' '}
          <Avatar
            name={'dani'}
            size="60"
            round={true}
            color="#FF3423"
            fgColor="#000000"
            textSizeRatio={2}
          >
            D
          </Avatar>
        </div>
      </div>
    </Layout>
  );
}

export default AvatarN;
