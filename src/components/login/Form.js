import React from "react";
import { FormBox } from "../common";
import { Form as ReForm } from "reactstrap";
import { isEmpty } from "validator";

const Form = ({ handleSubmit }) => {
  const [error, setError] = React.useState({});
  const [form, setForm] = React.useState({ userName: "", password: "" });
  const [errorLogin, setErrorLogin] = React.useState();
  // const loading = storeLogin.loading;
  const validate = () => {
    const errorState = {};
    // check validate
    if (isEmpty(form.userName)) {
      errorState.userName = "Please enter user name";
    }
    if (isEmpty(form.password)) {
      errorState.password = "Please enter password";
    }
    return errorState;
  };
  const handleSubmitForm = (event) => {
    event.preventDefault();
    const errorState = validate();
    if (Object.keys(errorState).length > 0) {
      return setError(errorState);
    }

    const formData = {
      userName: form.userName,
      password: form.password,
    };
    handleSubmit(formData);
  };
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleFocus = (event) => {
    setError({
      ...error,
      [event.target.name]: "",
    });
    setErrorLogin("");
  };

  return (
    <section onSubmit={handleSubmitForm} className="login">
      <div className="login__inner">
        <ReForm className="radius-l login__inner__form">
          <div className="login__inner__form__text">
            <p>Login to your account</p>
            <div className="error">{errorLogin}</div>
          </div>

          <FormBox
            propsInput={{
              name: "userName",
              placeholder: "username",
              onChange: handleChange,
              onFocus: handleFocus,
              value: form.userName,
              disabled: false,
            }}
            error={error.userName}
          />

          <FormBox
            propsInput={{
              type: "password",
              name: "password",
              placeholder: "password",
              onChange: handleChange,
              onFocus: handleFocus,
              value: form.password,
              disabled: false,
            }}
            error={error.password}
          />

          <div className="flex align-item flex-end-login">
            <button className="button button--secondary">Login</button>
          </div>
        </ReForm>
      </div>
    </section>
  );
};

export default Form;
