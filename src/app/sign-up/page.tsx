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
import { Wrench } from "lucide-react";
import * as Yup from "yup";
import useRegister from "./_hooks/useRgister";
import Link from "next/link";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").min(3),
  email: Yup.string().required("Email is required").email(),
  password: Yup.string().required("Password is required").min(6),
});

const SignUp = () => {
  const { mutateAsync: register, isPending } = useRegister();

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

        {/* Right Column: Sign Up Form */}
        <div className="flex-1 md:w-1/2 p-8">
          <Card className="w-full max-w-sm mx-auto bg-white p-8 rounded-lg shadow-xl">
            <Formik
              initialValues={{ name: "", email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                await register(values);
              }}
            >
              <Form className="space-y-6">
                <CardHeader>
                  <CardTitle className="text-black text-3xl font-semibold">Create your account</CardTitle>
                  <CardDescription className="text-gray-700 text-sm">Enter your information below to create your account</CardDescription>
                </CardHeader>
                <CardContent className="text-black">
                  {/* NAME */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Field
                      name="name"
                      as={Input}
                      type="text"
                      placeholder="Your name"
                      className="bg-gray-100 text-black rounded-lg p-3 w-full"
                    />
                    <ErrorMessage name="name" component="p" className="text-sm text-red-500" />
                  </div>

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
                    <Label htmlFor="password">Password</Label>
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
                    {isPending ? <Wrench className="animate-spin" /> : "Sign Up"}
                  </Button>
                </CardFooter>
              </Form>
            </Formik>

            {/* Sign In Link */}
            <div className="mt-4 text-center text-gray-700 text-sm">
              <p>Already have an account? <Link href="/sign-in" className="text-sky-500 hover:text-sky-400">Sign in</Link></p>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
