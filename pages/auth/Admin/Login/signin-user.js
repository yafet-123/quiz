import { useState, useEffect } from "react";
import { signIn, getCsrfToken, getSession } from "next-auth/react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { MainHeader } from "../../../../components/common/MainHeader";
import Link from "next/link";
import React from "react";

export default function SignIn({ csrfToken }) {
  const router = useRouter();
  const [error, setError] = useState(null);
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") router.replace("/Admin");
  }, [status, router]);

  if (status === "unauthenticated")
    return (
      <React.Fragment>
        <MainHeader title="Admin Login" />

        <div className="py-24 flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-100 px-4">
          <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 transform transition-all hover:scale-[1.01]">
            <h1 className="text-3xl font-extrabold text-center mb-6 text-teal-700">
              Admin Login
            </h1>
            <p className="text-gray-500 text-center mb-8">
              Sign in to manage your platform and access the dashboard.
            </p>

            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={Yup.object({
                username: Yup.string().required("Please enter your username"),
                password: Yup.string().required("Please enter your password"),
              })}
              onSubmit={async (values, { setSubmitting }) => {
                const res = await signIn("user-credentials", {
                  username: values.username,
                  password: values.password,
                  callbackUrl: "/Admin",
                  type: "user",
                  redirect: false,
                });

                if (res?.error) setError(res.error);
                else setError(null);

                if (res.url) router.push(res.url);
                setSubmitting(false);
              }}
            >
              {(formik) => (
                <form onSubmit={formik.handleSubmit}>
                  <input
                    name="csrfToken"
                    type="hidden"
                    defaultValue={csrfToken}
                  />

                  {error && (
                    <div className="bg-red-100 text-red-600 text-center p-2 mb-4 rounded-md">
                      {error}
                    </div>
                  )}

                  <div className="mb-4">
                    <label
                      htmlFor="username"
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      Username
                    </label>
                    <Field
                      name="username"
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none bg-gray-50"
                      placeholder="Enter your username"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      Password
                    </label>
                    <Field
                      name="password"
                      type="password"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none bg-gray-50"
                      placeholder="Enter your password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="flex justify-end mb-5">
                    <Link
                      href="/Forgotpassword"
                      className="text-sm text-teal-600 hover:text-teal-800 font-semibold"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className={`w-full py-3 rounded-lg font-semibold transition-colors duration-300 ${
                      formik.isSubmitting
                        ? "bg-teal-300 text-white cursor-not-allowed"
                        : "bg-teal-600 hover:bg-teal-700 text-white"
                    }`}
                  >
                    {formik.isSubmitting ? "Please wait..." : "Sign In"}
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </React.Fragment>
    );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const userRole = session?.user?.role;

  if (userRole === "student") {
    return {
      redirect: {
        destination: "/auth/Student/Login/signin-student",
        permanent: false,
      },
    };
  }

  if (userRole === "teacher") {
    return {
      redirect: {
        destination: "/auth/Teacher/Login/signin-teacher",
        permanent: false,
      },
    };
  }

  if (userRole === "admin") {
    return {
      redirect: {
        destination: "/Admin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
