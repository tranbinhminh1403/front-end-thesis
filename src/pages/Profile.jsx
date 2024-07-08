import React, { useState } from 'react';
import BasicInfo from '../components/basic_info/BasicInfo';
import Wishlist from '../components/list/Wishlist';

const Profile = () => {
  const [selectedMenu, setSelectedMenu] = useState('basicInfo');

  return (
    <div style={{ display: 'flex', marginTop: 20 }}>
      <div style={{ width: '250px', height: 550, borderRight: '2px solid #ddd', padding: '20px' }}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li
            style={{ borderBottom:'1px solid #ddd', fontSize:25, marginBottom: '10px', cursor: 'pointer',padding: 10, color: selectedMenu === 'basicInfo' ? 'green' : 'black' }}
            onClick={() => setSelectedMenu('basicInfo')}
          >
            Thông tin cơ bản
          </li>
          <li
            style={{ borderBottom:'1px solid #ddd', fontSize:25, cursor: 'pointer',padding: 10, color: selectedMenu === 'wishlist' ? 'green' : 'black' }}
            onClick={() => setSelectedMenu('wishlist')}
          >
            Danh sách theo dõi
          </li>
        </ul>
      </div>
      <div style={{ flex: 1, padding: '20px' }}>
        {selectedMenu === 'basicInfo' && <BasicInfo />}
        {selectedMenu === 'wishlist' && <Wishlist />}
      </div>
    </div>
  );
};

export default Profile;
