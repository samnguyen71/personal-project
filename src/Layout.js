import React, { useState } from 'react';
import Main from './Main';

function Layout({ setLocale }) {
  const [toggled, setToggled] = useState(false);


  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  return (
    <div className={`app ${toggled ? 'toggled' : ''}`}>
      <Main
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
      />
    </div>
  );
}

export default Layout;
