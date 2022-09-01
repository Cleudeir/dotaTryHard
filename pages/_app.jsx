const React = require('react');
import 'bootstrap/dist/css/bootstrap.min.css'; // Import bootstrap CSS

const MyApp = function app({Component, pageProps}) {
  return <Component {...pageProps} />;
};

export default MyApp;
