import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRegisterMutation } from "../../redux/api/registrationApi";

import styles from "./EventForm.module.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const RegistrationForm = () => {
  const { id } = useParams();
  console.log("🚀 ~ RegistrationForm ~ id:", id);
  const [register, { error }] = useRegisterMutation();
  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);
  const handleSubmit = async (values, { resetForm }) => {
    console.log("🚀 ~ handleSubmit ~ values:", values);
    try {
      const response = await register({ ...values, id });
      console.log("🚀 ~ handleSubmit ~ response:", response);
      console.log(response.data.message);
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        dateOfBirth: "",
        heardAboutEvent: "",
      }}
      onSubmit={handleSubmit}
      validate={(values) => {
        const errors = {};
        console.log("🚀 ~ RegistrationForm ~ errors:", errors);
        if (!values.fullName) {
          errors.fullName = "Required";
        }
        if (!values.email) {
          errors.email = "Required";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
          errors.email = "Invalid email address";
        }
        if (!values.dateOfBirth) {
          errors.dateOfBirth = "Required";
        }
        if (!values.heardAboutEvent) {
          errors.heardAboutEvent = "Required";
        }
        return errors;
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.formContainer}>
          <div>
            <label>Full Name:</label>
            <Field type="text" name="fullName" required />
            <ErrorMessage name="fullName" component="div" />
          </div>
          <div>
            <label>Email:</label>
            <Field type="email" name="email" required />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label>Date of Birth:</label>
            <Field type="date" name="dateOfBirth" required />
            <ErrorMessage name="dateOfBirth" component="div" />
          </div>
          <div>
            <label>Where did you hear about this event?</label>
            <div className={styles.formLabel}>
              <label>
                <Field
                  type="radio"
                  name="heardAboutEvent"
                  value="Social media"
                />
                Social media
              </label>
              <label>
                <Field type="radio" name="heardAboutEvent" value="Friends" />
                Friends
              </label>
              <label>
                <Field
                  type="radio"
                  name="heardAboutEvent"
                  value="Found myself"
                />
                Found myself
              </label>
            </div>
            <ErrorMessage name="heardAboutEvent" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
