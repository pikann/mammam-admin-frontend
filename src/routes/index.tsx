import { Fragment } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import HelmetComponent from '../components/HelmetComponent';
import loginRoutes from './loginRoutes';
import homeRouters from './homeRoutes';

const routes = [
  ...loginRoutes,
  ...homeRouters,
];

const RenderRouter = ({
  route: Component,
  layout: Layout,
  title,
  ...rest
}: any) => (
  <Fragment>
    {title && <HelmetComponent title={title} />}
    {Layout ? <Layout>
      <Component {...rest} />
    </Layout> : <Component {...rest} />}
  </Fragment>
);

const Router = (
  <BrowserRouter>
    <Switch>
      {routes.map((routeItem: any, index: number) => {
        return (
          <RenderRouter
            route={routeItem.route}
            key={index}
            path={routeItem.path}
            component={routeItem.component}
            layout={routeItem.layout}
            roles={routeItem.roles}
            permission={routeItem.permission}
            title={routeItem.title}
            exact={routeItem.exact}
            tabs={routeItem.tabs ? routeItem.tabs : []}
          />
        );
      })}
    </Switch>
  </BrowserRouter>
);

export default Router;