import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import * as AppActions from '../../store/actions';
import { makeSelectLogin } from '../../store/selectors';

const AuthenticatedRoute = ({
  component: Component,
  login,
  checkLogin,
  ...rest
}: any) => {
  useEffect(() => {
    if (!login) {
      checkLogin();
    }
  });

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!login) {
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          );
        }
        return <Component {...props} {...rest} />;
      }}
    />
  )
};

const mapStateToProps = createStructuredSelector<any, any>({
  login: makeSelectLogin(),
});

const mapDispatchToProps = (dispatch: any) => ({
  checkLogin: () => dispatch(AppActions.checkLogin.request()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedRoute);