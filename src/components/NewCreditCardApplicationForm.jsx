import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { httpClient } from "../http/http-client";
import { useDispatch, useSelector } from "react-redux";
import { decode } from "../utils/jwt-utils";


export default function NewCreditCardApplicationForm(props) {

    var firstName;
    var lastName;
    const authStatus = useSelector((state) => state.auth);
    if (authStatus.isLoggedIn) {
      var userInfo = decode(authStatus.token);
        console.log(userInfo);
        const myArr = userInfo.unique_name.split(" ");
        const firstName = myArr[0];
        const lastName = myArr[1];
    }


    //yup validation
    const validationSchema = Yup.object({
      middleName: Yup.string().matches("^[A-Z ]{1,50}$"),
      dateOfBirth: Yup.string()
        .matches("^[0-9]{4}-[0-9]{2}-[0-9]{2}$")
        .required("Required"),
      gender: Yup.string().required("Gender"),
      PAN: Yup.string()
        .matches("^[A-Z]{5}[0-9]{4}[A-Z]{1}$")
        .required("PAN is required"),
      phoneNumber: Yup.string()
        .matches("^[6-9]{1}[0-9]{9}$")
        .required("Phone number"),
      secondaryPhoneNumber: Yup.string().matches("^[6-9]{1}[0-9]{9}$"),
      qualification: Yup.string(),
      annualIncome: Yup.number()
        .max(1000000000)
        .min(50000)
        .required("Annual Income"),
      employmentStatus: Yup.string().min(3).required("Employment Status"),
        limitRequired: Yup.number().min(10000).max(2500000).required("Limit Required"),
        username: Yup.string().required("Username"),
        
    });
    

    //Fromik 
    const formik = useFormik({
        initialValues: {
        firstName: firstName,
        middleName: "",
        lastName: lastName,
        dateOfBirth: "",
        gender: "",
        PAN: "",
        phoneNumber: "",
        secondaryPhoneNumber: "",
        qualification: "",
        annualIncome: 0,
        employmentStatus: "",
        creditCardId: null,
        limitRequired: 0,
        username: "",
        usePermanentAddressForCommunication: null,
        pAddressLine1: "",
        pAddressLine2: "",
        pAddressLine3: "",
        pCity: "",
        pState: "",
        pPIN: 0,
        cAddressLine1: "",
        cAddressLine2: "",
        cAddressLine3: "",
        cCity: "",
        cState: "",
        cPIN: 0,
      },
    });

    return (
        <>
            <div>
                <h1>New Credit Card Application Form</h1>
                <hr />

            </div>
        </>
    )
}
