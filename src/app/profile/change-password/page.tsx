"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { FC } from "react"
import * as Yup from "yup"
import { Loader, Lock, Eye, EyeOff, Shield, ArrowLeft, CheckCircle } from 'lucide-react'
import { useState } from "react"
import Link from "next/link"
import useChangePassword from "./_hooks/useChangePassword"

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Current Password is required").min(6),
  newPassword: Yup.string().required("New Password is required").min(6),
  confirmPassword: Yup.string()
    .required("Confirm Password is Required")
    .oneOf([Yup.ref("newPassword")], "Your Password do not match"),
})

const ChangePasswordPage = () => {
  const { mutateAsync: resetPassword, isPending } = useChangePassword()
  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  })

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            className="text-gray-400 hover:text-white hover:bg-gray-800 p-0"
            asChild
          >
            <Link href="/profile" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Profile
            </Link>
          </Button>
        </div>

        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-orange-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Change <span className="text-orange-500">Password</span>
          </h1>
          <p className="text-gray-400 max-w-md mx-auto">
            Keep your account secure by updating your password regularly
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-md mx-auto">
          <Card className="bg-gray-900 border-gray-700 shadow-2xl">
            <Formik
              initialValues={{
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                await resetPassword({
                  oldPassword: values.oldPassword,
                  newPassword: values.newPassword,
                })
              }}
            >
              {({ values, errors, touched }) => (
                <Form className="space-y-6">
                  <CardHeader className="text-center pb-6">
                    <CardTitle className="text-xl font-semibold text-white">
                      Update Your Password
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Enter your current password and choose a new secure password
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Current Password */}
                    <div className="space-y-2">
                      <Label 
                        htmlFor="oldPassword" 
                        className="flex items-center gap-2 text-sm font-medium text-gray-300"
                      >
                        <Lock className="h-4 w-4 text-orange-500" />
                        Current Password
                      </Label>
                      <div className="relative">
                        <Field
                          name="oldPassword"
                          as={Input}
                          type={showPasswords.oldPassword ? "text" : "password"}
                          placeholder="Enter your current password"
                          className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 pr-10"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                          onClick={() => togglePasswordVisibility('oldPassword')}
                        >
                          {showPasswords.oldPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <ErrorMessage
                        name="oldPassword"
                        component="p"
                        className="text-sm text-red-400 flex items-center gap-1"
                      />
                    </div>

                    {/* New Password */}
                    <div className="space-y-2">
                      <Label 
                        htmlFor="newPassword" 
                        className="flex items-center gap-2 text-sm font-medium text-gray-300"
                      >
                        <Lock className="h-4 w-4 text-orange-500" />
                        New Password
                      </Label>
                      <div className="relative">
                        <Field
                          name="newPassword"
                          as={Input}
                          type={showPasswords.newPassword ? "text" : "password"}
                          placeholder="Enter your new password"
                          className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 pr-10"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                          onClick={() => togglePasswordVisibility('newPassword')}
                        >
                          {showPasswords.newPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <ErrorMessage
                        name="newPassword"
                        component="p"
                        className="text-sm text-red-400 flex items-center gap-1"
                      />
                      
                      {/* Password Strength Indicator */}
                      {values.newPassword && (
                        <div className="space-y-2">
                          <div className="text-xs text-gray-400">Password strength:</div>
                          <div className="flex gap-1">
                            <div className={`h-1 w-full rounded ${values.newPassword.length >= 6 ? 'bg-orange-500' : 'bg-gray-600'}`} />
                            <div className={`h-1 w-full rounded ${values.newPassword.length >= 8 ? 'bg-orange-500' : 'bg-gray-600'}`} />
                            <div className={`h-1 w-full rounded ${/[A-Z]/.test(values.newPassword) ? 'bg-orange-500' : 'bg-gray-600'}`} />
                            <div className={`h-1 w-full rounded ${/[0-9]/.test(values.newPassword) ? 'bg-orange-500' : 'bg-gray-600'}`} />
                          </div>
                          <div className="text-xs text-gray-500">
                            Use 8+ characters with uppercase, numbers for better security
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <Label 
                        htmlFor="confirmPassword" 
                        className="flex items-center gap-2 text-sm font-medium text-gray-300"
                      >
                        <CheckCircle className="h-4 w-4 text-orange-500" />
                        Confirm New Password
                      </Label>
                      <div className="relative">
                        <Field
                          name="confirmPassword"
                          as={Input}
                          type={showPasswords.confirmPassword ? "text" : "password"}
                          placeholder="Confirm your new password"
                          className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 pr-10"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                          onClick={() => togglePasswordVisibility('confirmPassword')}
                        >
                          {showPasswords.confirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <ErrorMessage
                        name="confirmPassword"
                        component="p"
                        className="text-sm text-red-400 flex items-center gap-1"
                      />
                    </div>

                    {/* Security Tips */}
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                        <Shield className="h-4 w-4 text-orange-500" />
                        Security Tips
                      </h4>
                      <ul className="text-xs text-gray-400 space-y-1">
                        <li>• Use at least 8 characters</li>
                        <li>• Include uppercase and lowercase letters</li>
                        <li>• Add numbers and special characters</li>
                        <li>• Avoid using personal information</li>
                      </ul>
                    </div>
                  </CardContent>

                  <CardFooter className="flex flex-col gap-4 pt-6">
                    <Button 
                      type="submit" 
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12 text-base font-medium" 
                      disabled={isPending}
                    >
                      {isPending ? (
                        <div className="flex items-center gap-2">
                          <Loader className="animate-spin h-4 w-4" />
                          Updating Password...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          Update Password
                        </div>
                      )}
                    </Button>
                    
                    <Button 
                      type="button"
                      variant="outline"
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                      asChild
                    >
                      <Link href="/profile">
                        Cancel
                      </Link>
                    </Button>
                  </CardFooter>
                </Form>
              )}
            </Formik>
          </Card>

          {/* Additional Security Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Your password will be encrypted and stored securely. 
              <br />
              You'll be logged out from all devices after changing your password.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangePasswordPage
