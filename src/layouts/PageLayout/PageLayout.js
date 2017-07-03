import React from 'react';
import {IndexLink} from 'react-router';
import PropTypes from 'prop-types';

export const PageLayout = ({children, loading}) => (
  <div className='container text-center'>
    <nav>
      <IndexLink to='/' activeClassName='new'>Top</IndexLink>
    </nav>

    <div className='views'>
      {children}
    </div>

    {/*TODO: loading */}
    <div className="loading" hidden={!loading}>
      <div>• • •</div>
    </div>
  </div>
);
PageLayout.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
};

export default PageLayout;
