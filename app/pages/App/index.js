import React from 'react';
import { Helmet } from 'react-helmet';

import Header from 'common/Header';
import Footer from 'common/Footer';

import RouteWrapper from "../../utils/routeWrapper"

import "../../assets/css/app.css"

const App = () => {
  return (
    <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <Helmet
        titleTemplate="%s - React App"
        defaultTitle="React App"
      >
        <meta name="description" content="An application built by React" />
      </Helmet>
      <Header />
      <RouteWrapper />
      <Footer />
    </div>
  );
}

export default App