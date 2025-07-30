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
import useForgotPassword from "./_hooks/useForgotPassword";
import Link from "next/link";

const ForgotPassword = () => {
  const { mutateAsync: forgotPassword, isPending } = useForgotPassword();

  return (
    <main className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/rog.png)' }}>
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-7xl p-8">
        {/* Left Column: Image */}
        

        {/* Right Column: Forgot Password Form */}
        <div className="flex-1 md:w-1/2 p-8">
          <Card className="w-full max-w-sm mx-auto bg-white p-8 rounded-lg shadow-xl">
            <Formik
              initialValues={{ email: "" }}
              onSubmit={async (values) => {
                await forgotPassword({ email: values.email });
              }}
            >
              <Form className="space-y-6">
                <CardHeader>
                  <CardTitle className="text-black text-3xl font-semibold">Forgot Password</CardTitle>
                  <CardDescription className="text-gray-700 text-sm">Enter your email below to reset your account</CardDescription>
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
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600" disabled={isPending}>
                    {isPending ? <Loader className="animate-spin" /> : "Submit"}
                  </Button>
                </CardFooter>
              </Form>
            </Formik>

            {/* Sign In Link */}
            <div className="mt-4 text-center text-gray-700 text-sm">
              <p>Remembered your password? <Link href="/sign-in" className="text-sky-500 hover:text-sky-400">Sign in</Link></p>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
