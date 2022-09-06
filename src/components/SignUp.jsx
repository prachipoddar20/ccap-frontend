import React, { useState } from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from 'react-select'
import { httpClient } from "../http/http-client";


export default function SignUp() {


    const options = [
      { value: "admin", label: "Admin" },
      { value: "approver", label: "Approver" },
      { value: "issuer", label: "Issuer" },
      { value: "user", label: "User" },
    ];

    const validationSchema = Yup.object({
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string().matches("(^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!#$@%&? \"]).*$)",
        { message: "Password should have One Uppercase, Two Lowercase, One number and A Special character" })
        .min(8, "Password must be at least 6 characters").required("Required"),
        confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Required"),
    }); 


    const formik = useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        roles: [],
      },
      validationSchema: validationSchema,
      onSubmit: (e) => {
          delete e.confirmPassword;
          console.log(selectedOption);
          selectedOption.forEach((element) => {
            e.roles.push(element.value);
          });
          console.log(e.roles);
        if (e.roles.includes("user") && e.roles.length === 1) {
              delete e.roles;
              httpClient.post("auth/register-user", e).then(res => {
                  console.log(res);
              }).catch(err => console.log(err));
          } else {
              httpClient.post("auth/register-staff", e).then(res => {
                  console.log(res);
              }).catch(err => console.log(err));
          }
        }
    });
    const [selectedOption, setSelectedOption] = useState([]);



    return (
      <>
        <h3>Sign Form</h3>

        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="text-danger">{formik.errors.firstName}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="text-danger">{formik.errors.lastName}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-danger">{formik.errors.email}</div>
            ) : null}

            <div className="form-group">
              <label htmlFor="role">Select your Role</label>
                <Select
                id="roles"
                name="roles"
                className="my-2"
                isMulti={true}
                value={selectedOption}
                onChange={setSelectedOption}
                options={options}
              />
              {formik.touched.roles && formik.errors.roles ? (
                <div className="text-danger">{formik.errors.roles}</div>
              ) : null}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-danger">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-danger">{formik.errors.confirmPassword}</div>
            ) : null}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </>
    );
}
