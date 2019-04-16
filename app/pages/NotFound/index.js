import React from 'react';
import { Helmet } from 'react-helmet';

export default class NotFoundPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>404</title>
        </Helmet>
        <div className="container">
          <div className="row">
            <div className="col-lg-12" style={{ textAlign: "center", verticalAlign: "middle" }}>
              <h1 className="mt-5">404 - Not Found</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}