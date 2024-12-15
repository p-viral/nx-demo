import React from 'react';

const Address = React.lazy(() => import('./address'));
const Address2 = React.lazy(() => import('./address2'));

export const views = [
  {
    view: 'ADDRESS1_REMOTE1',
    icon: 'users',
    element: Address,
  },
  {
    view: 'ADDRESS2_REMOTE1',
    icon: 'users',
    element: Address2,
  },
];

export default views;
