import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { httpClient } from '../http/http-client';
import { authSlice } from '../redux-store/auth-slice';
import { decode } from '../utils/jwt-utils';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = (props) => {
  console.log('Login props', props);
  const history = useHistory();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth);

 
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const formikInstance = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (e) => {
      // e.preventDefault();
      httpClient.post("auth/login", e).then((res) => {
        sessionStorage.setItem("token", res.data.jwt);
        const userInfo = decode(res.data.jwt);
        console.log(userInfo.Roles);
        dispatch(authSlice.actions.login({ userInfo, token: res.data.jwt }));

        const redirectPath = props.location.state?.returnUrl;
        console.log(redirectPath);

        if (redirectPath) {
          history.push(redirectPath);
        } else {
          history.push("/");
        }
      });
    },
    validationSchema: validationSchema,
  });
  return (
    <Fragment>
      <h3>Login Form</h3>
      <hr />
      <form onSubmit={formikInstance.handleSubmit}>
        <div className="form-group">
          {/* Username */}
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            onChange={formikInstance.handleChange}
            value={formikInstance.values.username}
            onBlur={formikInstance.handleBlur}
          />
          {formikInstance.touched.username && formikInstance.errors.username ? (
            <p className="text-danger">Username is required</p>
          ) : null}
        </div>
          {/* Password */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={formikInstance.handleChange}
            value={formikInstance.values.password}
            onBlur={formikInstance.handleBlur}
          />
          {formikInstance.touched.password && formikInstance.errors.password ? (
            <p className="text-danger">Password is required</p>
          ) : null}
        </div>

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </Fragment>
  );
};

export default Login;
