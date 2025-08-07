"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Calendar, ChevronRight, ChevronLeft, Ticket } from 'lucide-react';
import Image from "next/image";
import { getOrders, Order } from "../[uuid]/_api/get-orders";

export default function OrderHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const itemsPerPage = 5;
  const router = useRouter();

  const fetchOrders = async () => {
    try {
      const result = await getOrders(currentPage, searchQuery);
      setOrders(result.data);
      setTotalOrders(result.total);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(totalOrders / itemsPerPage));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CREATED":
        return "bg-orange-500/10 border-orange-500/30 text-orange-400";
      case "WAITING_FOR_CONFIRMATION":
        return "bg-blue-500/10 border-blue-500/30 text-blue-400";
      case "PAID":
        return "bg-green-500/10 border-green-500/30 text-green-400";
      case "REJECT":
        return "bg-red-500/10 border-red-500/30 text-red-400";
      case "EXPIRED":
        return "bg-gray-500/10 border-gray-500/30 text-gray-400";
      default:
        return "bg-gray-500/10 border-gray-500/30 text-gray-400";
    }
  };

  const formatStatus = (status: string) => {
    switch (status) {
      case "CREATED":
        return "Waiting for Payment";
      case "WAITING_FOR_CONFIRMATION":
        return "Waiting for Confirmation";
      case "PAID":
        return "Paid";
      case "REJECT":
        return "Rejected";
      case "EXPIRED":
        return "Expired";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl p-4 sm:p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white sm:text-3xl mb-6">
            Order History
          </h1>

          {/* Search */}
          <div className="relative w-full max-w-md">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              placeholder="Search event title..."
              className="w-full bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 pl-10 focus:border-orange-500 focus:ring-orange-500"
              value={searchQuery}
              onChange={(e) => {
                setCurrentPage(1);
                setSearchQuery(e.target.value);
              }}
            />
          </div>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Ticket className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No orders found
              </h3>
              <p className="text-gray-400">
                {searchQuery
                  ? `No orders found for "${searchQuery}"`
                  : "You haven't made any orders yet"}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 mb-8">
            {orders.map((order) => (
              <div
                key={order.uuid}
                className="cursor-pointer rounded-xl border border-gray-700 bg-gray-900 p-6 transition-all hover:border-orange-500/50 hover:shadow-lg"
                onClick={() => router.push(`/orders/${order.uuid}`)}
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Event Image */}
                  <div className="relative w-full lg:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={order.image || "/placeholder.svg"}
                      alt={order.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 192px"
                    />
                  </div>

                  {/* Order Details */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-white">
                          {order.title}
                        </h3>

                        <div className="flex items-center text-sm text-gray-400">
                          <MapPin className="mr-2 h-4 w-4 text-orange-500" />
                          {order.location}
                        </div>

                        <div className="flex items-center text-sm text-gray-400">
                          <Calendar className="mr-2 h-4 w-4 text-orange-500" />
                          {order.dateRange}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <div className="text-right">
                          <div className="text-sm text-gray-400">
                            Order #{order.uuid.slice(-8).toUpperCase()}
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                      <div className="flex items-center gap-3">
                        <div
                          className={`rounded-lg px-3 py-1 text-xs font-medium border ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {formatStatus(order.status)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4">
            <Button
              variant="outline"
              className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    className={
                      currentPage === pageNum
                        ? "bg-orange-500 text-white hover:bg-orange-600"
                        : "bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                    }
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
