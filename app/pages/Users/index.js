import React from 'react';
import PropTypes from "prop-types"
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { injectReducer, injectSaga } from '../../utils/injectors';

import { loadUsers } from "./redux/actions"
import reducer from './redux/reducer';
import saga from './redux/saga';
import { makeSelectUsers, makeSelectLoading, makeSelectError } from "./redux/selectors"

import Loader from "../../common/Loader"

export class UserPage extends React.PureComponent {
  componentDidMount() {
    const { loadUsers } = this.props;

    loadUsers();
  }

  render() {
    const { users, loading, error } = this.props

    return (
      <div>
        <Helmet>
          <title>Users</title>
          <meta
            name="description"
            content="List of users"
          />
        </Helmet>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h1 className="mt-5">List of Users</h1>
            </div>
          </div>
          {error && <h6>{`Error: ${error}`}</h6>}
          {loading && <Loader />}
          {users && !loading && !error &&
            <div className="row">
              <div className="col-lg-12">
                <ul className="list-group">
                  {users.map((u, i) => <li key={u.id} className="list-group-item">{`${u.phone} - ${u.name}`}</li>)}
                </ul>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

UserPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  users: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  loadUsers: PropTypes.func,
};

export const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: () => dispatch(loadUsers())
  };
}

const mapStateToProps = createStructuredSelector({
  users: makeSelectUsers(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withReducer = injectReducer({ key: 'users', reducer });
const withSaga = injectSaga({ key: 'users', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserPage);