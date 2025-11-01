import { useState, useEffect } from "react";
import { signIn, getCsrfToken } from "next-auth/react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";
import { MainHeader } from "../../../../components/common/MainHeader";
import { FaUser, FaLock } from "react-icons/fa";
import Link from "next/link";
import React from "react";

export default function SignIn({ csrfToken }) {
  const router = useRouter();
  const [error, setError] = useState(null);
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") router.replace("/Students");
  }, [status, router]);

  if (status === "unauthenticated")
    return (
      <React.Fragment>
        <MainHeader title="Login Student" />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-50 px-4">
          <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 border border-purple-100">
            <h2 className="text-3xl font-bold text-center text-purple-700 mb-2">
              Welcome Back 👋
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Sign in to access your student dashboard
            </p>

            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={Yup.object({
                username: Yup.string().required("Please enter your username"),
                password: Yup.string().required("Please enter your password"),
              })}
              onSubmit={async (values, { setSubmitting }) => {
                const res = await signIn("student-credentials", {
                  username: values.username,
                  password: values.password,
                  callbackUrl: "/Students",
                  type: "student",
                }); 

                if (res?.error) {
                  setError("Invalid username or password");
                  router.push(`/auth/error/student-credentials`);
                } else {
                  setError(null);
                  if (res.url) router.push(res.url);
                }
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
                    <div className="text-red-500 text-center mb-4 font-semibold">
                      {error}
                    </div>
                  )}

                  {/* Username Field */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                      Username
                    </label>
                    <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-purple-500">
                      <FaUser className="text-purple-600 mr-2" />
                      <Field
                        name="username"
                        type="text"
                        placeholder="Enter your username"
                        className="w-full outline-none"
                      />
                    </div>
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-1">
                      Password
                    </label>
                    <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-purple-500">
                      <FaLock className="text-purple-600 mr-2" />
                      <Field
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        className="w-full outline-none"
                      />
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Forgot Password */}
                  <div className="flex justify-end mb-5">
                    <Link
                      href="/Students/ForgotPassword"
                      className="text-sm text-purple-600 hover:text-purple-800 font-semibold"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className={`w-full py-3 rounded-lg font-semibold transition ${
                      formik.isSubmitting
                        ? "bg-purple-300 text-white cursor-not-allowed"
                        : "bg-purple-600 text-white hover:bg-purple-700"
                    }`}
                  >
                    {formik.isSubmitting ? "Please wait..." : "Sign In"}
                  </button>

                  {/* Signup Redirect */}
                  <p className="text-center text-gray-600 mt-6">
                    Don’t have an account?{" "}
                    <Link
                      href="/signup"
                      className="text-purple-700 font-semibold hover:underline"
                    >
                      Sign Up
                    </Link>
                  </p>
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
  const userRole = await session?.user?.role;
  console.log(userRole)
  if (userRole === "student") {
    return {
      redirect: { destination: "/Students", permanent: false },
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
        destination: "/auth/Admin/Login/signin-user",
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
