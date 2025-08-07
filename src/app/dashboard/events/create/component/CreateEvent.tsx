"use client"

import { useState, type ChangeEvent } from "react"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import Image from "next/image"
import { Trash, CalendarIcon, Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import TiptapRichtextEditor from "@/components/TiptapRichtextEditor"
import useCreateEvent from "../_hooks/useCreateEvent"
import type { DateRange } from "react-day-picker"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

interface FormValues {
  title: string
  category: string
  location: string
  description: string
  dateRange: {
    from: Date | undefined
    to: Date | undefined
  }
  thumbnail: File | null
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  location: Yup.string().required("Location is required"),
  description: Yup.string().required("Description is required"),
  dateRange: Yup.object({
    from: Yup.date().required("Start date is required"),
    to: Yup.date().required("End date is required"),
  }).required("Date range is required"),
  thumbnail: Yup.mixed().required("Thumbnail is required"),
})

const CreateEvent = () => {
  const [previewImage, setPreviewImage] = useState<string>("")
  const { mutateAsync: createEvent, isPending } = useCreateEvent()

  const handleThumbnailChange = (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void,
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      setPreviewImage(URL.createObjectURL(file))
      setFieldValue("thumbnail", file)
    }
  }

  const handleRemoveThumbnail = (setFieldValue: (field: string, value: any) => void) => {
    setPreviewImage("")
    setFieldValue("thumbnail", null)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-2">
              Create <span className="text-orange-500">Event</span>
            </h1>
            <p className="text-gray-400 text-lg">Fill in the details to create your new event</p>
          </div>

          <Formik<FormValues>
            initialValues={{
              title: "",
              category: "",
              location: "",
              description: "",
              dateRange: { from: undefined, to: undefined },
              thumbnail: null,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              const { from, to } = values.dateRange
              const startDate = from ? from.toISOString() : ""
              const endDate = to ? to.toISOString() : ""
              await createEvent({
                title: values.title,
                category: values.category,
                location: values.location,
                description: values.description,
                startDate,
                endDate,
                thumbnail: values.thumbnail,
              })
            }}
          >
            {({ setFieldValue, values }) => (
              <Form className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Left Column */}
                  <div className="space-y-8">
                    {/* Event Title */}
                    <div className="space-y-3">
                      <Label htmlFor="title" className="text-white font-medium text-base">
                        Event Title *
                      </Label>
                      <Field
                        name="title"
                        as={Input}
                        placeholder="Enter your event title"
                        className="h-12 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-lg"
                      />
                      <ErrorMessage name="title" component="div" className="text-sm text-red-400" />
                    </div>

                    {/* Category */}
                    <div className="space-y-3">
                      <Label htmlFor="category" className="text-white font-medium text-base">
                        Category *
                      </Label>
                      <Field
                        as="select"
                        name="category"
                        className="h-12 w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 appearance-none"
                      >
                        <option value="" className="bg-gray-900">
                          Select category
                        </option>
                        <option value="music" className="bg-gray-900">
                          Music
                        </option>
                        <option value="nightlife" className="bg-gray-900">
                          Nightlife
                        </option>
                        <option value="arts" className="bg-gray-900">
                          Arts & Culture
                        </option>
                        <option value="food" className="bg-gray-900">
                          Food & Drink
                        </option>
                        <option value="business" className="bg-gray-900">
                          Business
                        </option>
                        <option value="sports" className="bg-gray-900">
                          Sports & Fitness
                        </option>
                        <option value="technology" className="bg-gray-900">
                          Technology
                        </option>
                        <option value="education" className="bg-gray-900">
                          Education
                        </option>
                      </Field>
                      <ErrorMessage name="category" component="div" className="text-sm text-red-400" />
                    </div>

                    {/* Location */}
                    <div className="space-y-3">
                      <Label htmlFor="location" className="text-white font-medium text-base">
                        Location *
                      </Label>
                      <Field
                        as="select"
                        name="location"
                        className="h-12 w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 appearance-none"
                      >
                        <option value="" className="bg-gray-900">
                          Select location
                        </option>
                        <option value="jakarta" className="bg-gray-900">
                          Jakarta
                        </option>
                        <option value="bandung" className="bg-gray-900">
                          Bandung
                        </option>
                        <option value="bali" className="bg-gray-900">
                          Bali
                        </option>
                        <option value="surabaya" className="bg-gray-900">
                          Surabaya
                        </option>
                        <option value="yogyakarta" className="bg-gray-900">
                          Yogyakarta
                        </option>
                        <option value="medan" className="bg-gray-900">
                          Medan
                        </option>
                      </Field>
                      <ErrorMessage name="location" component="div" className="text-sm text-red-400" />
                    </div>

                    {/* Event Date Range */}
                    <div className="space-y-3">
                      <Label htmlFor="dateRange" className="text-white font-medium text-base">
                        Event Date Range *
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="h-12 w-full justify-start text-left font-normal bg-gray-900 border-gray-700 text-white hover:bg-gray-800 hover:border-orange-500"
                          >
                            <CalendarIcon className="mr-3 h-5 w-5 text-orange-500" />
                            {values.dateRange.from && values.dateRange.to ? (
                              <span className="text-white">
                                {format(values.dateRange.from, "MMM d, yyyy")} -{" "}
                                {format(values.dateRange.to, "MMM d, yyyy")}
                              </span>
                            ) : (
                              <span className="text-gray-500">Pick event dates</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-700">
                          <Calendar
                            initialFocus
                            mode="range"
                            selected={values.dateRange}
                            onSelect={(range: DateRange | undefined) => setFieldValue("dateRange", range)}
                            numberOfMonths={2}
                            className="text-white"
                          />
                        </PopoverContent>
                      </Popover>
                      <ErrorMessage name="dateRange" component="div" className="text-sm text-red-400" />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-8">
                    {/* Event Thumbnail */}
                    <div className="space-y-3">
                      <Label htmlFor="thumbnail" className="text-white font-medium text-base">
                        Event Thumbnail *
                      </Label>
                      {previewImage ? (
                        <div className="relative">
                          <Image
                            src={previewImage || "/placeholder.svg"}
                            alt="Thumbnail preview"
                            width={500}
                            height={300}
                            className="w-full h-64 rounded-lg object-cover border-2 border-gray-700"
                          />
                          <Button
                            size="icon"
                            type="button"
                            className="absolute top-3 right-3 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg"
                            onClick={() => handleRemoveThumbnail(setFieldValue)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-gray-700 rounded-lg p-12 text-center hover:border-orange-500 transition-colors">
                          <div className="space-y-4">
                            <div className="mx-auto w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
                              <Upload className="h-8 w-8 text-gray-400" />
                            </div>
                            <div>
                              <Input
                                type="file"
                                name="thumbnail"
                                accept="image/*"
                                onChange={(e) => handleThumbnailChange(e, setFieldValue)}
                                className="hidden"
                                id="thumbnail-upload"
                              />
                              <label
                                htmlFor="thumbnail-upload"
                                className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg cursor-pointer font-medium transition-colors"
                              >
                                Choose Image
                              </label>
                              <p className="text-gray-400 text-sm mt-2">
                                Upload event thumbnail (JPG, PNG, GIF up to 10MB)
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      <ErrorMessage name="thumbnail" component="div" className="text-sm text-red-400" />
                    </div>

                    {/* Event Description */}
                    <div className="space-y-3">
                      <Label className="text-white font-medium text-base">Event Description *</Label>
                      <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                        <TiptapRichtextEditor name="description" label="" />
                      </div>
                      <ErrorMessage name="description" component="div" className="text-sm text-red-400" />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-8 border-t border-gray-700">
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="px-8 py-3 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      Save as Draft
                    </Button>
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isPending ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Creating Event...
                        </>
                      ) : (
                        "Create Event"
                      )}
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </main>
    </div>
  )
}

export default CreateEvent
