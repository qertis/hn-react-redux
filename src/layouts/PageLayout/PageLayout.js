import React from 'react';
import {IndexLink} from 'react-router';
import PropTypes from 'prop-types';

export const PageLayout = ({children}) => (
  <div className='container text-center'>
    <nav>
      <IndexLink to='/' activeClassName='new'>Top</IndexLink>
    </nav>
    <div className='views'>{children}</div>
  </div>
);
PageLayout.propTypes = {
  children: PropTypes.node,
};

export default PageLayout;
