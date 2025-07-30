"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Loader } from "lucide-react";
import useLogin from "./_hooks/useLogin";
import Link from "next/link";

const SignIn = () => {
  const { mutateAsync: login, isPending } = useLogin();

  return (
    <main className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/rog.png)' }}>
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-7xl p-8">
        {/* Left Column: Image */}
        {/* <div className="hidden md:block md:w-1/2 h-full">
          <img
            src="/zzz.png" // Replace with your actual image path
            alt="Event background"
            className="w-full h-full object-cover rounded-lg"
          />
        </div> */}

        {/* Right Column: Sign In Form */}
        <div className="flex-1 md:w-1/2 p-8">
          <Card className="w-full max-w-sm mx-auto bg-white p-8 rounded-lg shadow-xl">
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values) => {
                await login({ email: values.email, password: values.password });
              }}
            >
              <Form className="space-y-6">
                <CardHeader>
                  <CardTitle className="text-black text-3xl font-semibold">Login to your account</CardTitle>
                  <CardDescription className="text-gray-700 text-sm">Enter your email below to login to your account</CardDescription>
                </CardHeader>
                <CardContent className="text-black">
                  {/* EMAIL */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Field
                      name="email"
                      as={Input}
                      type="email"
                      placeholder="Your email"
                      className="bg-gray-100 text-black rounded-lg p-3 w-full"
                    />
                    <ErrorMessage name="email" component="p" className="text-sm text-red-500" />
                  </div>

                  {/* PASSWORD */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/forgot-password" className="text-sky-500 hover:text-sky-400">Forgot Password?</Link>
                    </div>
                    <Field
                      name="password"
                      as={Input}
                      type="password"
                      placeholder="Your password"
                      className="bg-gray-100 text-black rounded-lg p-3 w-full"
                    />
                    <ErrorMessage name="password" component="p" className="text-sm text-red-500" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600" disabled={isPending}>
                    {isPending ? <Loader className="animate-spin" /> : "Login"}
                  </Button>
                </CardFooter>
              </Form>
            </Formik>

            {/* Social Login Buttons */}
            <div className="flex justify-between gap-4 mt-6">
              <Button variant="outline" className="flex-1 py-3 bg-gray-200 text-black rounded-lg hover:bg-gray-300">
                GitHub
              </Button>
              <Button variant="outline" className="flex-1 py-3 bg-gray-200 text-black rounded-lg hover:bg-gray-300">
                Discord
              </Button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-4 text-center text-gray-700 text-sm">
              <p>Don’t have an account? <Link href="/sign-up" className="text-sky-500 hover:text-sky-400">Sign up</Link></p>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
