import { Formik, Form } from "formik";
import Button from "./common/Button";
import Input from "./common/Input";
import Textarea from "./common/Textarea";
import * as Yup from "yup";

function handleSubmit(values, actions) {
  console.log(values);
  actions.resetForm();
}

const contactShema = Yup.object({
  name: Yup.string().min(4, "Name is too short").required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  message: Yup.string().min(8, "Message is too short").required("Required"),
});

function Contact() {
  return (
    <section className="min-h-screen flex gap-8 flex-col sm:flex-row p-8">
      <div className="text-night font-karla flex-1 bg-lightOrange rounded p-6 h-550">
        <h2 className="text-3xl sm:text-5xl  uppercase mb-3 font-bold">
          We would love to hear from you.
        </h2>
        <p className="text-lg sm:text-2xl">
          Whether you have questions about our app, or have feedback on how to
          improve, don&apos;t hesitate to reach out. Our team is dedicated to
          make the experience better for you. Fill out this form, and we will
          get back to you shortly.
        </p>
      </div>

      <Formik
        initialValues={{ name: "", email: "", message: "" }}
        validationSchema={contactShema}
        onSubmit={handleSubmit}
      >
        <Form className="flex-1  w-full">
          <Input
            name="name"
            label="Name"
            type="text"
            placeholder="Enter your name."
          />

          <Input
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email."
          />

          <Textarea
            name="message"
            label="Message"
            placeholder="Enter your message"
          />
          <div className="text-center">
            <Button
              type="submit"
              moreStyles="py-3 px-10 mt-6 sm:py-4 sm:px-8 uppercase font-bold tracking-wider rounded"
            >
              Send message
            </Button>
          </div>
        </Form>
      </Formik>
    </section>
  );
}

export default Contact;
