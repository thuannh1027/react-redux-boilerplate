import React from 'react';
import { Helmet } from 'react-helmet';

import BgHomePage from "../../assets/images/backgrounds/react.png"

import Img from "../../common/Img"

export class HomePage extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>Home Page</title>
          <meta
            name="description"
            content="Home page"
          />
        </Helmet>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h1 className="mt-5">React.js x Bootstrap</h1>
              <p>A modern application built with React.js, Bootstrap and Redux</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <Img src={BgHomePage} alt="React" />
            </div></div>
        </div>
      </div>
    );
  }
}

export default HomePage
