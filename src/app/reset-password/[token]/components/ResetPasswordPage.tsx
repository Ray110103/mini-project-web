"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ErrorMessage, Field, Form, Formik } from "formik"
import useResetPassword from "../_hooks/useResetPassword"
import * as Yup from "yup"
import { Loader, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface ResetPasswordPageProps {
  token: string
}

const validationSchema = Yup.object().shape({
  password: Yup.string().required("Password is required").min(6),
  confirmPassword: Yup.string()
    .required("Confirm Password Is Required")
    .oneOf([Yup.ref("password")], "Your Password Do Not Match"),
})

const ResetPasswordPage = ({ token }: ResetPasswordPageProps) => {
  const { mutateAsync: resetPassword, isPending } = useResetPassword(token)

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-50" />

      <div className="relative z-10 w-full max-w-md">
        <Card className="bg-gray-900 border-gray-800 shadow-2xl">
          <Formik
            initialValues={{ password: "", confirmPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              await resetPassword({ password: values.password })
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

                <CardTitle className="text-white text-2xl font-bold text-center">Reset Password</CardTitle>
                <CardDescription className="text-gray-400 text-center">
                  Enter your password below to reset your account
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* PASSWORD */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white text-sm font-medium">
                    Password
                  </Label>
                  <Field
                    name="password"
                    as={Input}
                    type="password"
                    placeholder="Your password"
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500"
                  />
                  <ErrorMessage name="password" component="p" className="text-sm text-red-400" />
                  <p className="text-xs text-gray-500">Password must be at least 6 characters long</p>
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white text-sm font-medium">
                    Confirm Password
                  </Label>
                  <Field
                    name="confirmPassword"
                    as={Input}
                    type="password"
                    placeholder="Confirm your password"
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500"
                  />
                  <ErrorMessage name="confirmPassword" component="p" className="text-sm text-red-400" />
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-6 pt-6">
                {/* Reset Password Button with extra gap */}
                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 transition-colors"
                  disabled={isPending}
                >
                  {isPending ? (
                    <div className="flex items-center gap-2">
                      <Loader className="animate-spin h-4 w-4" />
                      Resetting password...
                    </div>
                  ) : (
                    "Reset Password"
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
              </CardFooter>
            </Form>
          </Formik>
        </Card>
      </div>
    </main>
  )
}

export default ResetPasswordPage
