"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { Loader, Github } from "lucide-react"
import * as Yup from "yup"
import useRegister from "./_hooks/useRgister"
import Link from "next/link"

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").min(3),
  email: Yup.string().required("Email is required").email(),
  password: Yup.string().required("Password is required").min(6),
})

const SignUp = () => {
  const { mutateAsync: register, isPending } = useRegister()

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-50" />

      <div className="relative z-10 w-full max-w-md">
        <Card className="bg-gray-900 border-gray-800 shadow-2xl">
          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              await register(values)
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

                <CardTitle className="text-white text-2xl font-bold text-center">Create your account</CardTitle>
                <CardDescription className="text-gray-400 text-center">
                  Enter your information below to get started
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* NAME */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white text-sm font-medium">
                    Full Name
                  </Label>
                  <Field
                    name="name"
                    as={Input}
                    type="text"
                    placeholder="Enter your full name"
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500"
                  />
                  <ErrorMessage name="name" component="p" className="text-sm text-red-400" />
                </div>

                {/* EMAIL */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white text-sm font-medium">
                    Email
                  </Label>
                  <Field
                    name="email"
                    as={Input}
                    type="email"
                    placeholder="Enter your email"
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500"
                  />
                  <ErrorMessage name="email" component="p" className="text-sm text-red-400" />
                </div>

                {/* PASSWORD */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white text-sm font-medium">
                    Password
                  </Label>
                  <Field
                    name="password"
                    as={Input}
                    type="password"
                    placeholder="Create a password"
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500"
                  />
                  <ErrorMessage name="password" component="p" className="text-sm text-red-400" />
                  <p className="text-xs text-gray-500">Password must be at least 6 characters long</p>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-6 pt-6">
                {/* Sign Up Button with extra gap */}
                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 transition-colors"
                  disabled={isPending}
                >
                  {isPending ? (
                    <div className="flex items-center gap-2">
                      <Loader className="animate-spin h-4 w-4" />
                      Creating account...
                    </div>
                  ) : (
                    "Create account"
                  )}
                </Button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-700" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-gray-900 px-2 text-gray-400">Or continue with</span>
                  </div>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 hover:text-white transition-colors"
                    type="button"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 hover:text-white transition-colors"
                    type="button"
                  >
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                    Discord
                  </Button>
                </div>

                {/* Sign In Link */}
                <div className="text-center text-sm text-gray-400">
                  Already have an account?{" "}
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

export default SignUp
