"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Calendar, Ticket, Upload, Clock, CreditCard, Building2, User, Hash, CheckCircle, AlertCircle, XCircle } from 'lucide-react'
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import { toast } from "sonner"
import useGetTransaction from "../_hooks/useGetTransaction"
import useUploadPaymentProof from "../[uuid]/_api/useUploadPaymentProof"
import { applyVoucher } from "../[uuid]/_api/voucher"

type OrderDetailsProps = {
  uuid: string
}

export default function OrderDetails({ uuid }: OrderDetailsProps) {
  const [voucherCode, setVoucherCode] = useState("")
  const [paymentProof, setPaymentProof] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [showUpload, setShowUpload] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [total, setTotal] = useState<number | null>(null)
  const [errorMessage, setErrorMessage] = useState("")
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const { data: transaction, isPending } = useGetTransaction(uuid)
  const { mutateAsync: uploadProof, isPending: isUploading } = useUploadPaymentProof(uuid)

  const ticket = transaction?.transactionDetail?.[0]
  const baseTotal = (ticket?.qty ?? 0) * (ticket?.price ?? 0)

  useEffect(() => {
    if (transaction) {
      toast.success("Checkout success!")
    }
  }, [transaction])

  const handleApplyVoucher = async () => {
    try {
      setErrorMessage("")
      const token = localStorage.getItem("token")
      if (!token) throw new Error("Unauthorized")
      const res = await applyVoucher(uuid, voucherCode, token)
      setTotal(res.pricing.total)
    } catch (err: any) {
      setErrorMessage(err.message)
    }
  }

  const formatStatus = (status: string) =>
    status
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase())

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "WAITING_FOR_PAYMENT":
        return <Clock className="h-4 w-4" />
      case "PAID":
        return <CheckCircle className="h-4 w-4" />
      case "REJECTED":
        return <XCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "WAITING_FOR_PAYMENT":
        return "secondary"
      case "PAID":
        return "default"
      case "REJECTED":
        return "destructive"
      default:
        return "outline"
    }
  }

  if (isPending) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          <div className="text-white text-xl">Loading order details...</div>
        </div>
      </div>
    )
  }

  if (!transaction || !ticket) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="h-8 w-8 text-red-400" />
          </div>
          <div className="text-white text-xl mb-2">Order not found</div>
          <div className="text-gray-400">The order you're looking for doesn't exist or has been removed.</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Order Details</h1>
              <p className="text-gray-400 mt-1">Order #{transaction.uuid.slice(-8).toUpperCase()}</p>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(transaction.status)}
              <Badge 
                variant={getStatusVariant(transaction.status)}
                className="text-sm px-3 py-1"
              >
                {formatStatus(transaction.status)}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* Event Information */}
            <Card className="bg-gray-900 border-gray-700 overflow-hidden">
              <div className="relative">
                {transaction?.event?.thumbnail && (
                  <div className="relative w-full h-64 sm:h-80">
                    <Image
                      src={transaction.event.thumbnail || "/placeholder.svg"}
                      alt="Event Thumbnail"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">{transaction?.event?.title}</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 text-gray-300">
                        <div className="p-2 bg-orange-500/20 rounded-lg">
                          <MapPin className="h-4 w-4 text-orange-500" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Location</p>
                          <p className="font-medium">{transaction?.event?.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 text-gray-300">
                        <div className="p-2 bg-orange-500/20 rounded-lg">
                          <Calendar className="h-4 w-4 text-orange-500" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Date</p>
                          <p className="font-medium">
                            {transaction?.event?.startDate &&
                              format(new Date(transaction.event.startDate), "dd MMM yyyy")}
                            {transaction?.event?.endDate &&
                              transaction.event.startDate !== transaction.event.endDate &&
                              ` - ${format(new Date(transaction.event.endDate), "dd MMM yyyy")}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>

            {/* Ticket Information */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Ticket className="h-5 w-5 text-orange-500" />
                  Ticket Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-white">{ticket.ticket.title}</h3>
                    <p className="text-sm text-gray-400">{ticket.qty} ticket{ticket.qty > 1 ? 's' : ''}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-white">Rp {ticket.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-400">per ticket</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <CreditCard className="h-5 w-5 text-orange-500" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Building2 className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Bank</p>
                      <p className="font-medium text-white">BCA</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <User className="h-4 w-4 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Account Name</p>
                      <p className="font-medium text-white">PT Suka Suka</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Hash className="h-4 w-4 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Account Number</p>
                      <p className="font-medium text-white">123123123</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Voucher Section */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-white">Apply Voucher</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter voucher code"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500"
                  />
                  <Button
                    onClick={handleApplyVoucher}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6"
                  >
                    Apply
                  </Button>
                </div>
                {errorMessage && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-sm text-red-400">{errorMessage}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Ticket price</span>
                    <span className="text-white">Rp {ticket.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Quantity</span>
                    <span className="text-white">{ticket.qty}</span>
                  </div>
                  <Separator className="bg-gray-700" />
                  <div className="flex justify-between font-semibold">
                    <span className="text-white">Total</span>
                    <span className="text-orange-500 text-lg">Rp {(total ?? baseTotal).toLocaleString()}</span>
                  </div>
                </div>

                {!showUpload && (
                  <Button
                    className="w-full bg-orange-500 text-white hover:bg-orange-600 h-12 text-base font-medium"
                    onClick={() => setShowConfirmModal(true)}
                  >
                    Proceed to Payment
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Upload Payment Proof */}
            {showUpload && (
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Upload Payment Proof</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {previewImage ? (
                    <div className="space-y-4">
                      <div className="relative w-full h-40 rounded-lg overflow-hidden border-2 border-gray-700">
                        <Image
                          src={previewImage || "/placeholder.svg"}
                          alt="Payment proof preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            setPaymentProof(file)
                            setPreviewImage(URL.createObjectURL(file))
                          }
                        }}
                        className="bg-gray-800 border-gray-600 text-white file:bg-orange-500 file:text-white file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4"
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div 
                        className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-orange-500 transition-colors cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-white font-medium mb-2">Upload Payment Proof</p>
                        <p className="text-sm text-gray-400">Click to browse or drag and drop your image</p>
                      </div>
                      <Input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            setPaymentProof(file)
                            setPreviewImage(URL.createObjectURL(file))
                          }
                        }}
                        className="hidden"
                      />
                    </div>
                  )}

                  <Button
                    disabled={!paymentProof || isUploading}
                    onClick={async () => {
                      if (!paymentProof) return
                      await uploadProof({ paymentProof })
                      setShowUpload(false)
                      toast.success("Payment proof uploaded successfully!")
                    }}
                    className="w-full bg-green-600 text-white hover:bg-green-700 h-12 text-base font-medium"
                  >
                    {isUploading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Uploading...
                      </div>
                    ) : (
                      "Submit Payment Proof"
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Confirm Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-[90%] max-w-md rounded-xl border border-gray-700 bg-gray-900 p-6 shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-8 w-8 text-orange-500" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Confirm Payment</h2>
                <p className="text-sm text-gray-400">
                  Please confirm that you want to proceed with this payment. Make sure to transfer the exact amount to the provided bank account.
                </p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Amount</span>
                  <span className="text-xl font-bold text-orange-500">
                    Rp {(total ?? baseTotal).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent border-gray-600 text-white hover:bg-gray-800"
                  onClick={() => setShowConfirmModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-orange-500 text-white hover:bg-orange-600"
                  onClick={() => {
                    setShowUpload(true)
                    setShowConfirmModal(false)
                    toast.info("Please upload your payment proof after making the transfer.")
                  }}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
