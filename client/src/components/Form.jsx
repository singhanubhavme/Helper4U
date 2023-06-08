import { ToastContainer } from 'react-toastify';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { Fragment, useEffect } from 'react';
import { showToast } from '../utils/showToast';
import axios from 'axios';
import { API_DOMAIN } from '../constants/constants';

const Form = () => {
  const schema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[a-zA-Z ]+$/, 'Invalid Name')
      .required('Name is required'),
    email: Yup.string()
      .matches(/@.*\.com$/, 'Invalid email')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^[1-9]\d{9}$/, 'Invalid phone number')
      .required('Phone is required'),
    dob: Yup.string().required('DOB is required'),
    address: Yup.string().required('Address is required'),
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      dob: '',
      address: '',
    },
    validationSchema: schema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (data) => {
      (async () => {
        try {
          await axios.post(`${API_DOMAIN}/api/form/submit`, {
            data,
          });
          showToast('Form Filled Success', 'success');
        } catch (err) {
          showToast('Can not submit form', 'fail');
        }
      })();
    },
  });

  useEffect(() => {
    for (const key in formik.errors) {
      const value = formik.errors[key];
      showToast(value, 'fail');
    }
  }, [formik.errors]);

  return (
    <Fragment>
      <ToastContainer />
      <div className="antialiased text-gray-900 px-6 mx-auto">
        <h2 className="flex flex-row flex-nowrap items-center my-8">
          <span className="flex-grow block border-t border-black"></span>
          <span className="flex-none block mx-4 px-4 py-2.5 text-xl leading-none font-medium bg-black text-white">
            USER DATA
          </span>
          <span className="flex-grow block border-t border-black"></span>
        </h2>
        <div className="divide-y">
          <Formik>
            <div className="mt-8 max-w-md mx-auto">
              <div className="grid grid-cols-1 gap-6">
                <label className="block">
                  <span className="text-gray-700">Name</span>
                  <input
                    type="text"
                    className="
                  mt-1
                  block
                  w-full
                  rounded-md
                  bg-gray-100
                  border-transparent
                  focus:border-gray-500 focus:bg-white focus:ring-0"
                    name="name"
                    id="name"
                    placeholder="John Doe"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Email address</span>
                  <input
                    type="email"
                    className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    bg-gray-100
                    border-transparent
                    focus:border-gray-500 focus:bg-white focus:ring-0"
                    name="email"
                    id="email"
                    placeholder="john@example.com"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Phone</span>
                  <input
                    type="text"
                    className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    bg-gray-100
                    border-transparent
                    focus:border-gray-500 focus:bg-white focus:ring-0
                  "
                    name="phone"
                    id="phone"
                    placeholder="9999999999"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Date of Birth</span>
                  <input
                    type="date"
                    className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    bg-gray-100
                    border-transparent
                    focus:border-gray-500 focus:bg-white focus:ring-0
                  "
                    name="dob"
                    id="dob"
                    onChange={formik.handleChange}
                    value={formik.values.dob}
                  />
                </label>

                <label className="block">
                  <span className="text-gray-700">Resident Address</span>
                  <textarea
                    className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    bg-gray-100
                    border-transparent
                    focus:border-gray-500 focus:bg-white focus:ring-0
                  "
                    rows="3"
                    name="address"
                    id="address"
                    placeholder="X Street, Y Lane"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                  ></textarea>
                </label>

                <button
                  type="submit"
                  onClick={formik.handleSubmit}
                  className="group relative h-12 w-48 mt-2 overflow-hidden rounded-lg bg-white text-lg shadow mx-auto mb-4"
                >
                  <div className="absolute inset-0 w-3 bg-gray-100 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                  <span className="relative text-black text-lg font-[500]">
                    Submit
                  </span>
                </button>
              </div>
            </div>
          </Formik>
        </div>
      </div>
    </Fragment>
  );
};

export default Form;
