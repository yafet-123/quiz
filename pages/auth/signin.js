import { useState, useEffect } from 'react';
import { signIn, getCsrfToken } from 'next-auth/react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { MainHeader } from '../../components/common/MainHeader';
import React from 'react';
import Link from 'next/link';

export default function SignIn({ csrfToken }) {
  const router = useRouter();
  const [error, setError] = useState(null);
  const { status,data } = useSession();

    useEffect(() => {
      if (status === 'authenticated') {
        const userType = data?.user?.type; // Assuming the user type is stored in data.user.type
        if (userType === 'student') {
          router.replace('/Students');
        } else if (userType === 'user') {
          router.replace('/Users'); // Change '/Users' to the appropriate route for regular users
        }
      }
    }, [status, data, router]);

  const handleSignIn = async (values, setSubmitting) => {
    try {
      const res = await signIn(values.type === 'student' ? 'student-credentials' : 'user-credentials', {
        username: values.username,
        password: values.password,
        callbackUrl: values.type === 'student' ? '/Students' : '/Admin',
        type: values.type,
      });

      if (res?.error) {
        setError(res.error);
      } else {
        setError(null);
      }

      if (res.url) router.push(res.url);
    } catch (error) {
      console.error('Sign In Failed', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <React.Fragment>
      <MainHeader title="Login" />
      <Formik
        initialValues={{ username: '', password: '', type: 'student' }} // Default to student type
        validationSchema={Yup.object({
          username: Yup.string().required('Please enter your username'),
          password: Yup.string().required('Please enter your password'),
        })}
        onSubmit={(values, { setSubmitting }) => handleSignIn(values, setSubmitting)}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div className="bg-gray-100  flex flex-col items-center justify-center min-h-screen py-2 shadow-lg">
              <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                <div className="text-red-400 text-md text-center rounded p-2">{error}</div>
                <div className="mb-4">
                  <label htmlFor="username" className="uppercase text-sm text-gray-600 font-bold">
                    User Name
                    <Field
                      name="username"
                      aria-label="enter your username"
                      aria-required="true"
                      type="text"
                      className="w-full bg-gray-300 text-gray-900 mt-2 p-3"
                    />
                  </label>
                  <div className="text-red-600 text-sm">
                    <ErrorMessage name="username" />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="password" className="uppercase text-sm text-gray-600 font-bold">
                    Password
                    <Field
                      name="password"
                      aria-label="enter your password"
                      aria-required="true"
                      type="password"
                      className="w-full bg-gray-300 text-gray-900 mt-2 p-3"
                    />
                  </label>
                  <div className="text-red-600 text-sm">
                    <ErrorMessage name="password" />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="type" className="uppercase text-sm text-gray-600 font-bold">
                    User Type
                    <Field as="select" name="type" className="w-full bg-gray-300 text-gray-900 mt-2 p-3">
                      <option value="student">Student</option>
                      <option value="user">User</option>
                      <option value="Teacher">Teacher</option>
                    </Field>
                  </label>
                </div>
                <Link href={`/${formik.values.type}/Forgotpassword`}>
                  <a className="font-bold flex justify-end text-lg lg:text-xl text-red-600 mb-5">
                    Forgot password?
                  </a>
                </Link>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className={
                      formik.isSubmitting
                        ? 'bg-green-200 text-gray-100 p-3 rounded-lg w-full'
                        : 'bg-green-600 text-gray-100 p-3 rounded-lg w-full'
                    }
                  >
                    {formik.isSubmitting ? 'Please wait...' : 'Sign In'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
