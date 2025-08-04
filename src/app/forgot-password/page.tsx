"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { Loader, ArrowLeft } from "lucide-react"
import useForgotPassword from "./_hooks/useForgotPassword"
import Link from "next/link"

const ForgotPassword = () => {
  const { mutateAsync: forgotPassword, isPending } = useForgotPassword()

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-50" />

      <div className="relative z-10 w-full max-w-md">
        <Card className="bg-gray-900 border-gray-800 shadow-2xl">
          <Formik
            initialValues={{ email: "" }}
            onSubmit={async (values) => {
              await forgotPassword({ email: values.email })
            }}
          >
            <Form>
              <CardHeader className="space-y-1 pb-6">
                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">EH</span>
                  </div>
                  <span className="text-2xl font-bold text-white">
                    Event<span className="text-orange-500">Hub</span>
                  </span>
                </div>

                <CardTitle className="text-white text-2xl font-bold text-center">Forgot Password</CardTitle>
                <CardDescription className="text-gray-400 text-center">
                  Enter your email below to reset your account
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* EMAIL */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white text-sm font-medium">
                    Email
                  </Label>
                  <Field
                    name="email"
                    as={Input}
                    type="email"
                    placeholder="Your email"
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500"
                  />
                  <ErrorMessage name="email" component="p" className="text-sm text-red-400" />
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-6 pt-6">
                {/* Submit Button with extra gap */}
                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 transition-colors"
                  disabled={isPending}
                >
                  {isPending ? (
                    <div className="flex items-center gap-2">
                      <Loader className="animate-spin h-4 w-4" />
                      Submitting...
                    </div>
                  ) : (
                    "Submit"
                  )}
                </Button>

                {/* Back to Sign In Link */}
                <div className="text-center">
                  <Link
                    href="/sign-in"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to sign in
                  </Link>
                </div>

                {/* Sign In Link */}
                <div className="text-center text-sm text-gray-400">
                  Remembered your password?{" "}
                  <Link href="/sign-in" className="text-orange-500 hover:text-orange-400 font-medium transition-colors">
                    Sign in
                  </Link>
                </div>
              </CardFooter>
            </Form>
          </Formik>
        </Card>
      </div>
    </main>
  )
}

export default ForgotPassword
