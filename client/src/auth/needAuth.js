import React from "react";
import axios from "axios";

axios.interceptors.request.use(
  function(requestConfig) {
    requestConfig.headers.authorization = localStorage.getItem("token");

    return requestConfig;
  },

  function(error) {
    return Promise.reject(error);
  }
);

export default function(Component) {
  return class Authenticated extends React.Component {
    render() {
      const token = localStorage.getItem("token");
      const notAuthorized = <h2>Please Login to view this page.</h2>;

      return <div>{token ? <Component {...this.props} /> : notAuthorized}</div>;
    }
  };
}
