import React from 'react';
import { useIntl } from 'react-intl';

const Home = ({
  handleToggleSidebar,
}) => {
  const intl = useIntl();
  return (
    <main>
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
      </div>
      <header>
        <h1> Algorithms Visualizer Personal Project</h1>
        <p>Animations of some algorithms with react (only the sorting animations are working, everything else is broken)</p>
        <p1></p1>
      </header>
    </main>
  );
};

export default Home;
