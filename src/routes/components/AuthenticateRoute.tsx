import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import * as AppActions from '../../store/actions';
import { makeSelectLogin } from '../../store/selectors';

const AuthenticateRoute = ({
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
          return <Component {...props} {...rest} />;
        }
        return (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateRoute);