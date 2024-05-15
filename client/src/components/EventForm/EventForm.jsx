import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEventRegistrationMutation } from "../../redux/api/eventsApi";
import { toast } from "react-toastify";

import styles from "./EventForm.module.css";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [register, { error }] = useEventRegistrationMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (error) {
      console.error(error);
      if (error.data && error.data.message) {
        toast.error(error.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  }, [error]);

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    try {
      const response = await register({ ...values, id });
      toast.success(response.data.message);
      resetForm();
      navigate("/events", { replace: true });
    } catch (e) {
      console.log(e);
    } finally {
      setIsSubmitting(false);
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
        if (!values.fullName) {
          errors.fullName = "*Field is required";
        }
        if (!values.email) {
          errors.email = "*Field is required";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
          errors.email = "*Invalid email address";
        }
        if (!values.dateOfBirth) {
          errors.dateOfBirth = "*Field is required";
        } else {
          const dob = new Date(values.dateOfBirth);
          const today = new Date();
          const age = today.getFullYear() - dob.getFullYear();
          const monthDiff = today.getMonth() - dob.getMonth();
          const ageDiff =
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < dob.getDate())
              ? 1
              : 0;
          if (age - ageDiff < 18) {
            errors.dateOfBirth = "*You must be at least 18 years old";
          }
        }
        if (!values.heardAboutEvent) {
          errors.heardAboutEvent = "*Choose one";
        }
        return errors;
      }}
    >
      <Form className={styles.formContainer}>
        <div>
          <label>Full Name:</label>
          <Field type="text" name="fullName" />
          <ErrorMessage
            name="fullName"
            component="div"
            className={styles.error}
          />
        </div>
        <div>
          <label>Email:</label>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" className={styles.error} />
        </div>
        <div>
          <label>Date of Birth:</label>
          <Field
            type="date"
            name="dateOfBirth"
            max={new Date().toISOString().split("T")[0]}
          />
          <ErrorMessage
            name="dateOfBirth"
            component="div"
            className={styles.error}
          />
        </div>

        <div>
          <label>Where did you hear about this event?</label>
          <div className={styles.formLabel}>
            <label>
              <Field type="radio" name="heardAboutEvent" value="Social media" />
              Social media
            </label>
            <label>
              <Field type="radio" name="heardAboutEvent" value="Friends" />
              Friends
            </label>
            <label>
              <Field type="radio" name="heardAboutEvent" value="Found myself" />
              Found myself
            </label>
          </div>
          <ErrorMessage
            name="heardAboutEvent"
            component="div"
            className={styles.error}
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          Register
        </button>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
