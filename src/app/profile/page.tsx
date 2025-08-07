"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useGetProfile } from "./_hooks/useGetProfile"
import { User, Mail, Shield, Gift, Edit, Lock, Settings, UserCircle, ArrowLeft, Home } from 'lucide-react'

export default function ProfilePage() {
  const { data: user, isLoading, isError } = useGetProfile()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Skeleton */}
            <div className="lg:col-span-1">
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-6 space-y-4">
                  <Skeleton className="h-8 w-3/4 bg-gray-800" />
                  <Skeleton className="h-6 w-full bg-gray-800" />
                  <Skeleton className="h-6 w-full bg-gray-800" />
                  <Skeleton className="h-6 w-2/3 bg-gray-800" />
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content Skeleton */}
            <div className="lg:col-span-3 space-y-6">
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-6 mb-6">
                    <Skeleton className="w-24 h-24 rounded-full bg-gray-800" />
                    <div className="space-y-2">
                      <Skeleton className="h-8 w-48 bg-gray-800" />
                      <Skeleton className="h-4 w-32 bg-gray-800" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Skeleton className="h-16 bg-gray-800" />
                    <Skeleton className="h-16 bg-gray-800" />
                    <Skeleton className="h-16 bg-gray-800" />
                    <Skeleton className="h-16 bg-gray-800" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isError || !user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Card className="bg-gray-900 border-gray-700 max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserCircle className="h-8 w-8 text-red-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Profile Not Found</h3>
            <p className="text-gray-400 mb-6">
              Failed to load profile information. Please try again.
            </p>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'default'
      case 'user':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            className="text-gray-400 hover:text-white hover:bg-gray-800 p-0 mb-6"
            asChild
          >
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                My <span className="text-orange-500">Profile</span>
              </h1>
              <p className="text-gray-400">Manage your account settings and preferences</p>
            </div>
            
            {/* Home Button */}
            <Button 
              variant="outline"
              className="border-gray-600 text-white hover:bg-gray-800 hover:border-orange-500 w-fit"
              asChild
            >
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Settings className="h-5 w-5 text-orange-500" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  <Link href="/profile">
                    <div className={cn(
                      "flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors",
                      "bg-orange-500/10 text-orange-400 border-r-2 border-orange-500"
                    )}>
                      <User className="h-4 w-4" />
                      Profile Information
                    </div>
                  </Link>
                  <Link href="/profile/change-password">
                    <div className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
                      <Lock className="h-4 w-4" />
                      Change Password
                    </div>
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Header Card */}
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  {/* Profile Picture */}
                  <div className="relative">
                    {user.pictureProfile ? (
                      <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-orange-500/20">
                        <Image
                          src={user.pictureProfile || "/placeholder.svg"}
                          alt="Profile Picture"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center border-4 border-orange-500/20">
                        <span className="text-2xl font-bold text-white">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-900 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                      <Badge 
                        variant={getRoleBadgeVariant(user.role)}
                        className="w-fit"
                      >
                        {user.role}
                      </Badge>
                    </div>
                    <p className="text-gray-400 mb-4">{user.email}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Active Account</span>
                    </div>
                  </div>

                  {/* Edit Button */}
                  <Button 
                    asChild
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    <Link href="/profile/edit">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Profile Details Card */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-gray-300">
                      <User className="h-4 w-4 text-orange-500" />
                      Full Name
                    </Label>
                    <Input 
                      value={user.name} 
                      disabled 
                      className="bg-gray-800 border-gray-600 text-white disabled:opacity-70"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-gray-300">
                      <Mail className="h-4 w-4 text-orange-500" />
                      Email Address
                    </Label>
                    <Input 
                      value={user.email} 
                      disabled 
                      className="bg-gray-800 border-gray-600 text-white disabled:opacity-70"
                    />
                  </div>

                  {/* Referral Code Field */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-gray-300">
                      <Gift className="h-4 w-4 text-orange-500" />
                      Referral Code
                    </Label>
                    <div className="relative">
                      <Input 
                        value={user.referralCode} 
                        disabled 
                        className="bg-gray-800 border-gray-600 text-white disabled:opacity-70 pr-20"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute right-1 top-1 h-8 px-3 text-orange-500 hover:text-orange-400 hover:bg-orange-500/10"
                        onClick={() => navigator.clipboard.writeText(user.referralCode)}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>

                  {/* Role Field */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-gray-300">
                      <Shield className="h-4 w-4 text-orange-500" />
                      Account Role
                    </Label>
                    <Input 
                      value={user.role} 
                      disabled 
                      className="bg-gray-800 border-gray-600 text-white disabled:opacity-70"
                    />
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                {/* Account Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    asChild
                    size="lg"
                    className="bg-orange-500 hover:bg-orange-600 text-white flex-1"
                  >
                    <Link href="/profile/edit">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Link>
                  </Button>
                  <Button 
                    asChild
                    variant="outline"
                    size="lg"
                    className="bg-orange-500 hover:bg-orange-600 text-white flex-1"
                  >
                    <Link href="/profile/change-password">
                      <Lock className="h-4 w-4 mr-2" />
                      Change Password
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
