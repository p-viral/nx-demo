// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import * as React from 'react';
import { Link, useRoutes } from 'react-router-dom';
import { loadRemote } from '@module-federation/enhanced/runtime';
import Home from './home';
import ErrorBoundary from './ErrorBoundary';

// const Remote1 = React.lazy(() => loadRemote('remote1/Module') as any);
// const Remote2 = React.lazy(() => loadRemote('remote2/Module') as any);

export function App() {
  const [remoteViews, setRemoteViews] = React.useState<any>();

  const handleLoadRemote = () => {
    loadRemote('remote1/Module').then((module: any) => {
      setRemoteViews(module.views);
    });
  };

  const routes = React.useMemo(
    () => [
      { path: '/', element: <Home /> },
      ...(remoteViews?.map((view: any, index: number) => ({
        path: `/remote${index}`,
        element: <view.element />,
      })) || []),
    ],
    [remoteViews]
  );

  console.log('routes', routes);

  const element = useRoutes(routes);

  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <React.Suspense fallback={null}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/remote1">Remote 1</Link>
          </li>
          <li>
            <Link to="/remote2">Remote 2</Link>
          </li>
        </ul>
        <button onClick={handleLoadRemote}>Load Remote Module</button>
        {element}
      </React.Suspense>
    </ErrorBoundary>
  );
}

export default App;
