"use client"

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";

const DashboardEvents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const events = [
    {
      id: 1,
      thumbnail: "from-pink-500 to-rose-500",
      title: "Raisa Ambivert Showcase",
      status: "ACTIVE",
      location: "Tangerang",
      startDate: "11 Feb 2026",
      endDate: "13 Feb 2026",
      startTime: "19:00",
      endTime: "23:00",
    },
    {
      id: 2,
      thumbnail: "from-purple-500 to-indigo-500",
      title: "PLAYOFF IBL GOPAY 2025",
      status: "ACTIVE",
      location: "Surabaya",
      startDate: "31 Mar 2026",
      endDate: "01 Apr 2026",
      startTime: "19:00",
      endTime: "23:00",
    },
    // Add other events here
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEvents(events.map((event) => event.id));
    } else {
      setSelectedEvents([]);
    }
  };

  const handleSelectEvent = (eventId: number, checked: boolean) => {
    if (checked) {
      setSelectedEvents([...selectedEvents, eventId]);
    } else {
      setSelectedEvents(selectedEvents.filter((id) => id !== eventId));
    }
  };

  const isAllSelected = selectedEvents.length === events.length;
  const isIndeterminate = selectedEvents.length > 0 && selectedEvents.length < events.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-white">My Events</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80 py-3 px-4 bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-lg"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 bg-gray-800 text-white hover:bg-gray-700">
                Columns
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-gray-800 border border-gray-700">
              <DropdownMenuItem>
                <Checkbox className="mr-2 text-gray-400" checked />
                Thumbnail
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Checkbox className="mr-2 text-gray-400" checked />
                Title
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Checkbox className="mr-2 text-gray-400" checked />
                Status
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Checkbox className="mr-2 text-gray-400" checked />
                Location
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Checkbox className="mr-2 text-gray-400" checked />
                Start Date
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Checkbox className="mr-2 text-gray-400" checked />
                End Date
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Events Table */}
      <Card className="bg-gray-800 text-white shadow-lg">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-700 border-b">
                <tr>
                  <th className="text-left p-4 w-12">
                    
                  </th>
                  <th className="text-left p-4 text-sm font-medium">Thumbnail</th>
                  <th className="text-left p-4 text-sm font-medium">
                    <div className="flex items-center gap-1">
                      Title
                      <ChevronDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="text-left p-4 text-sm font-medium">Status</th>
                  <th className="text-left p-4 text-sm font-medium">Location</th>
                  <th className="text-left p-4 text-sm font-medium">Start Date</th>
                  <th className="text-left p-4 text-sm font-medium">End Date</th>
                  <th className="text-left p-4 text-sm font-medium">Start Time</th>
                  <th className="text-left p-4 text-sm font-medium">End Time</th>
                  <th className="text-left p-4 text-sm font-medium w-12"></th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id} className="border-b hover:bg-gray-700">
                    <td className="p-4">
                      
                    </td>
                    <td className="p-4">
                      <div className={`w-16 h-12 rounded bg-gradient-to-br ${event.thumbnail} flex items-center justify-center`}>
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-sm max-w-xs">{event.title}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {event.status}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-4 text-sm">{event.location}</td>
                    <td className="p-4 text-sm">{event.startDate}</td>
                    <td className="p-4 text-sm">{event.endDate}</td>
                    <td className="p-4 text-sm">{event.startTime}</td>
                    <td className="p-4 text-sm">{event.endTime}</td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Event
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Event
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-muted-foreground">
          {selectedEvents.length} of {events.length} row(s) selected.
        </div>

        <div className="flex items-center gap-6">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="flex items-center gap-1">
            <Button
              variant={currentPage === 1 ? "default" : "outline"}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setCurrentPage(1)}
            >
              1
            </Button>
            <Button
              variant={currentPage === 2 ? "default" : "outline"}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setCurrentPage(2)}
            >
              2
            </Button>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardEvents;
