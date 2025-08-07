"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Mail, Phone, Globe, ArrowLeft, Star, User } from 'lucide-react'
import Image from "next/image"
import { type FC } from "react"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import AdminReviewSection from "./AdminReviewSection"

// Static admin data
const staticAdminData = {
  id: 1,
  name: "Ray",
  email: "ray.johnson@eventhub.com",
  phone: "+62 812 3456 7890",
  website: "https://rayjohnson.com",
  pictureProfile: "/rog.png",
  bio: "Experienced event organizer with over 8 years in the industry. Passionate about creating memorable experiences and bringing people together through amazing cultural and entertainment events. Specialized in traditional Indonesian cultural events and modern entertainment shows.",
  role: "Senior Event Organizer",
  totalEvents: 42,
  totalAttendees: 2850,
  joinedDate: "2019-03-15",
}

const AdminProfile: FC = () => {
  const router = useRouter()
  const admin = staticAdminData

  // Function to get user initials
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <div className="border-b border-zinc-800 px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="text-gray-400 hover:text-white hover:bg-zinc-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
      </div>

      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8 lg:grid lg:grid-cols-[1fr_2fr] lg:gap-8 lg:space-y-0">
          {/* Left Sidebar - Profile Info */}
          <div className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  {admin.pictureProfile ? (
                    <Image
                      src={admin.pictureProfile || "/placeholder.svg"}
                      alt={admin.name}
                      width={120}
                      height={120}
                      className="h-30 w-30 rounded-full object-cover mx-auto"
                    />
                  ) : (
                    <div className="flex h-30 w-30 items-center justify-center rounded-full bg-orange-500 mx-auto">
                      <span className="text-3xl font-bold text-white">
                        {getUserInitials(admin.name)}
                      </span>
                    </div>
                  )}
                  <div>
                    <h1 className="text-2xl font-bold text-white">{admin.name}</h1>
                    <p className="text-gray-400">{admin.role}</p>
                  </div>
                  {admin.bio && (
                    <p className="text-sm text-gray-300 text-left">{admin.bio}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold text-white">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-orange-500" />
                    <span className="text-sm text-gray-300">{admin.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-orange-500" />
                    <span className="text-sm text-gray-300">{admin.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-orange-500" />
                    <a
                      href={admin.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-orange-500 hover:text-orange-400"
                    >
                      {admin.website}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">{admin.totalEvents}</div>
                    <div className="text-sm text-gray-400">Events Created</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">{admin.totalAttendees}</div>
                    <div className="text-sm text-gray-400">Total Attendees</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Content - Reviews */}
          <div className="space-y-6">
            <Tabs defaultValue="reviews" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-zinc-900 border border-zinc-700 rounded-lg p-1">
                <TabsTrigger
                  value="reviews"
                  className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-gray-400 hover:text-white rounded-md"
                >
                  Reviews
                </TabsTrigger>
                <TabsTrigger
                  value="about"
                  className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-gray-400 hover:text-white rounded-md"
                >
                  About
                </TabsTrigger>
              </TabsList>

              <TabsContent value="reviews" className="space-y-4 pt-6">
                <AdminReviewSection adminId={admin.id} />
              </TabsContent>

              <TabsContent value="about" className="pt-6">
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-white">About {admin.name}</h3>
                    <div className="text-sm text-gray-300 space-y-4">
                      <p>{admin.bio}</p>
                      <div className="pt-4 border-t border-zinc-700">
                        <p className="text-gray-400">
                          Member since {format(new Date(admin.joinedDate), "MMMM yyyy")}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium text-white">Specializations</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-orange-500/10 text-orange-400 border-orange-500/30">
                            Cultural Events
                          </Badge>
                          <Badge variant="outline" className="bg-orange-500/10 text-orange-400 border-orange-500/30">
                            Traditional Arts
                          </Badge>
                          <Badge variant="outline" className="bg-orange-500/10 text-orange-400 border-orange-500/30">
                            Entertainment Shows
                          </Badge>
                          <Badge variant="outline" className="bg-orange-500/10 text-orange-400 border-orange-500/30">
                            Workshops
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProfile
