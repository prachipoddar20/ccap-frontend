import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { decode } from "../utils/jwt-utils";
import {  useSelector } from "react-redux";


const NewApplication = (props) => {
  const cardId = +props.match.params.id;

  var firstName;
  var lastName;
  const authStatus = useSelector((state) => state.auth);
  if (authStatus.isLoggedIn) {
    var userInfo = decode(authStatus.token);
    const arr = userInfo.unique_name.split(" ");
    firstName = arr[0];
    lastName = arr[1];
  }


  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const employmentStatusOptions = [
    { value: "Salaried", label: "Salaried" },
    { value: "BusinessOwner", label: "Business Owner" },
    { value: "SelfEmployedProfessional", label: "Self Employed Professional" },
  ];

  const qualificationOptions = [
    { value: "Undergraduate", label: "Undergraduate" },
    { value: "Graduate", label: "Graduate" },
    { value: "Postgraduate", label: "Postgraduate or higher" },
  ];

  const creditCardIDOptions = [
    { value: 2, label: "Regular - Silver" },
    { value: 3, label: "Regular - Gold" },
    { value: 6, label: "Regular - Platinum" },
    { value: 12, label: "Premium - Ruby" },
    { value: 13, label: "Premium - Sapphire" },
    { value: 14, label: "Premium - Emerald" },
    { value: 15, label: "Super Premium - Millennia" },
    { value: 16, label: "Super Premium - Supremia" },
    { value: 17, label: "Super Premium - Infinia" },
  ];

  var cardName="";
  creditCardIDOptions.forEach((element) => {
    if (element.value == cardId) {
      cardName = element.label;
    }
  });


  const validationSchema = Yup.object({
    middleName: Yup.string().matches("^[A-Z ]{1,50}$").required("Required"),
    username: Yup.string().required("Required"),
    dateOfBirth: Yup.string().required("Required"),
    pan: Yup.string()
      .required("Required")
      .matches("^[A-Z]{5}[0-9]{4}[A-Z]{1}$"),
    phoneNumber: Yup.string()
      .required("Required")
      .matches("^[6-9]{1}[0-9]{9}$"),
    secondaryPhoneNumber: Yup.string().matches("^[6-9]{1}[0-9]{9}$"),
    limitRequired: Yup.string().required("Required"),
    annualIncome: Yup.number().required("Required").min(50000).max(1000000000),
    pAddressLine1: Yup.string().required("Required"),
    pAddressLine2: Yup.string().min(5).max(100),
    pCity: Yup.string().required("Required").min(3).max(100),
    pState: Yup.string().required("Required").min(3).max(100),
    pPin: Yup.number().required("Required").min(100000).max(999999),
  });

  const formik = useFormik({
    initialValues: {
      firstName: firstName,
      middleName: "",
      lastName: lastName,
      username: "",
      dateOfBirth: "",
      pan: "",
      phoneNumber: "",
      secondaryPhoneNumber: "",
      limitRequired: "",
      annualIncome: "",
      pAddressLine1: "",
      pAddressLine2: "",
      pCity: "",
      pState: "",
      pPin: "",
      gender: "",
      qualification: "",
      employmentStatus: "",
      creditCardId: cardId,
      cAddressLine1: "",
      cAddressLine2: "",
      cCity: "",
      cState: "",
      cPin: "",
    },
    validationSchema: validationSchema,
    onSubmit: (e) => {
      console.log("submitted",e);
    },
    validate: (values) => {
      console.log("validated",values);
    }
  });

  const [selectedGenderOption, setSelectedGenderOption] = useState([]);
  const [selectedEmploymentStatusOption, setSelectedEmploymentStatusOption] =
    useState([]);
  const [selectedQualificationOption, setSelectedQualificationOption] =
    useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <h3>Credit Card Application Form</h3>
      <hr />

      <form onSubmit={formik.handleSubmit}>
        <div class="d-flex bd-highlight">
          <div class="p-2 flex-fill bd-highlight">
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
          </div>
          <div class="p-2 flex-fill bd-highlight">
            <div className="form-group">
              <label htmlFor="middleName">Middle Name</label>
              <input
                type="text"
                className="form-control"
                id="middleName"
                name="middleName"
                value={formik.values.middleName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div class="p-2 flex-fill bd-highlight">
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
            </div>
          </div>
        </div>

        <div class="d-flex bd-highlight">
          <div class="p-2 flex-fill bd-highlight">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div class="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {formik.touched.username && formik.errors.username ? (
                <div className="text-danger">{formik.errors.username}</div>
              ) : null}
            </div>
          </div>

          <div class="p-2 flex-fill bd-highlight">
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formik.values.dateOfBirth}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                <div className="text-danger">{formik.errors.dateOfBirth}</div>
              ) : null}
              {/* <pre>
                {JSON.stringify(formik.errors, null, 2)}
              </pre> */}
            </div>
          </div>
        </div>

        <div class="d-flex bd-highlight">
          <div class="p-2 flex-fill bd-highlight">
            <div className="form-group">
              <label htmlFor="gender">Select gender</label>
              <Select
                id="gender"
                name="gender"
                className="my-2"
                value={selectedGenderOption}
                onChange={setSelectedGenderOption}
                options={genderOptions}
              />
            </div>
          </div>
          <div class="p-2 flex-fill bd-highlight">
            <div className="form-group">
              <label htmlFor="qualification">Select Your Qualification</label>
              <Select
                id="qualification"
                name="qualification"
                className="my-2"
                value={selectedQualificationOption}
                onChange={setSelectedQualificationOption}
                options={qualificationOptions}
              />
            </div>
          </div>
          <div class="p-2 flex-fill bd-highlight">
            <div className="form-group">
              <label htmlFor="employmentStatus">
                Select Your Employment Status
              </label>
              <Select
                id="employmentStatus"
                name="employmentStatus"
                className="my-2"
                value={selectedEmploymentStatusOption}
                onChange={setSelectedEmploymentStatusOption}
                options={employmentStatusOptions}
              />
            </div>
          </div>
        </div>

        <div class="d-flex bd-highlight">
          <div class="p-2 flex-fill bd-highlight">
            <div className="form-group">
              <label htmlFor="pan">Permanent Account Number</label>
              <input
                type="text"
                className="form-control"
                id="pan"
                name="pan"
                value={formik.values.pan}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.pan && formik.errors.pan ? (
                <div className="text-danger">{formik.errors.pan}</div>
              ) : null}
            </div>
          </div>
          <div class="p-2 flex-fill bd-highlight">
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <div class="input-group mb-3">
                <span class="input-group-text">+91</span>
                <input
                  type="text"
                  className="form-control"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <div className="text-danger">{formik.errors.phoneNumber}</div>
              ) : null}
            </div>
          </div>
          <div class="p-2 flex-fill bd-highlight">
            <div className="form-group">
              <label htmlFor="secondaryPhoneNumber">
                Secondary Phone Number
              </label>
              <div class="input-group mb-3">
                <span class="input-group-text">+91</span>
                <input
                  type="text"
                  className="form-control"
                  id="secondaryPhoneNumber"
                  name="secondaryPhoneNumber"
                  value={formik.values.secondaryPhoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {formik.touched.secondaryPhoneNumber &&
              formik.errors.secondaryPhoneNumber ? (
                <div className="text-danger">
                  {formik.errors.secondaryPhoneNumber}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div class="d-flex bd-highlight">
          <div class="p-2 flex-fill bd-highlight">
            <div className="form-group">
              <label htmlFor="creditCardID">Credit Card</label>
              <input
                type="text"
                id="creditCardName"
                name="creditCardName"
                className="my-2"
                value={cardName}
              />
              <input
                hidden
                type="text"
                id="creditCardID"
                name="creditCardID"
                className="my-2"
                value={cardId}
              />
            </div>
          </div>
          <div class="p-2 flex-fill bd-highlight">
            <div className="form-group">
              <label htmlFor="limitRequired">Limit Required</label>
              <div class="input-group mb-3">
                <span class="input-group-text">₹</span>
                <input
                  type="text"
                  className="form-control"
                  id="limitRequired"
                  name="limitRequired"
                  value={formik.values.limitRequired}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {formik.touched.limitRequired && formik.errors.limitRequired ? (
                <div className="text-danger">{formik.errors.limitRequired}</div>
              ) : null}
            </div>
          </div>
          <div class="p-2 flex-fill bd-highlight">
            <div className="form-group">
              <label htmlFor="annualIncome">Annual Income</label>
              <div class="input-group mb-3">
                <span class="input-group-text">₹</span>
                <input
                  type="text"
                  className="form-control"
                  id="annualIncome"
                  name="annualIncome"
                  value={formik.values.annualIncome}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {formik.touched.annualIncome && formik.errors.annualIncome ? (
                <div className="text-danger">{formik.errors.annualIncome}</div>
              ) : null}
            </div>
          </div>
        </div>

        <h5>Permanent Address</h5>
        <div className="form-group">
          <input
            placeholder="Address Line 1"
            type="text"
            className="form-control"
            id="pAddressLine1"
            name="pAddressLine1"
            value={formik.values.pAddressLine1}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.pAddressLine1 && formik.errors.pAddressLine1 ? (
            <div className="text-danger">{formik.errors.pAddressLine1}</div>
          ) : null}
        </div>
        <div className="form-group">
          <input
            placeholder="Address Line 2"
            type="text"
            className="form-control"
            id="pAddressLine2"
            name="pAddressLine2"
            value={formik.values.pAddressLine2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.pAddressLine2 && formik.errors.pAddressLine2 ? (
            <div className="text-danger">{formik.errors.pAddressLine2}</div>
          ) : null}
        </div>
        <div className="form-group">
          <input
            placeholder="Address Line 3"
            type="text"
            className="form-control"
            id="pAddressLine3"
            name="pAddressLine3"
            value={formik.values.pAddressLine3}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        <div class="d-flex bd-highlight">
          <div class="p-2 flex-fill bd-highlight">
            <div className="form-group">
              <input
                placeholder="City"
                type="text"
                className="form-control"
                id="pCity"
                name="pCity"
                value={formik.values.pCity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.pCity && formik.errors.pCity ? (
                <div className="text-danger">{formik.errors.pCity}</div>
              ) : null}
            </div>
          </div>
          <div class="p-2 flex-fill bd-highlight">
            <div className="form-group">
              <input
                placeholder="State"
                type="text"
                className="form-control"
                id="pState"
                name="pState"
                value={formik.values.pState}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.pState && formik.errors.pState ? (
                <div className="text-danger">{formik.errors.pState}</div>
              ) : null}
            </div>
          </div>
          <div class="p-2 flex-fill bd-highlight">
            <div className="form-group">
              <input
                placeholder="Pin"
                type="text"
                className="form-control"
                id="pPin"
                name="pPin"
                value={formik.values.pPin}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.pPin && formik.errors.pPin ? (
                <div className="text-danger">{formik.errors.pPin}</div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            id="usePermanentAddressForCommunication"
            name="usePermanentAddressForCommunication"
            value={handleOnChange}
            checked={isChecked}
            onChange={handleOnChange}
          />
          {isChecked ? "Use" : "Don't use"} permanent address for communication.
        </div>

        <br />

        <h5>Communication Address</h5>
        <div className="form-group">
          <input
            placeholder="Address Line 1"
            type="text"
            className="form-control"
            id="cAddressLine1"
            name="cAddressLine1"
            value={formik.values.cAddressLine1}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Address Line 2"
            type="text"
            className="form-control"
            id="cAddressLine2"
            name="cAddressLine2"
            value={formik.values.cAddressLine2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Address Line 3"
            type="text"
            className="form-control"
            id="cAddressLine3"
            name="cAddressLine3"
            value={formik.values.cAddressLine3}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        <div class="d-flex bd-highlight">
          <div class="p-2 flex-fill bd-highlight">
            <div className="form-group">
              <input
                placeholder="City"
                type="text"
                className="form-control"
                id="cCity"
                name="cCity"
                value={formik.values.cCity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div class="p-2 flex-fill bd-highlight">
            <div className="form-group">
              <input
                placeholder="State"
                type="text"
                className="form-control"
                id="cState"
                name="cState"
                value={formik.values.cState}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div class="p-2 flex-fill bd-highlight">
            <div className="form-group">
              <input
                placeholder="Pin"
                type="text"
                className="form-control"
                id="cPin"
                name="cPin"
                value={formik.values.cPin}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default NewApplication ;
