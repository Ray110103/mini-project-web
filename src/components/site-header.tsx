import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader() {
  return (
    <header className="flex h-[--header-height] shrink-0 items-center gap-2 border-b border-gray-700 bg-gray-900 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-[--header-height]">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 text-white hover:bg-gray-800 hover:text-white" />
        <Separator
          orientation="vertical"
          className="mx-2 bg-gray-600 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium text-white">EventHub Dashboard</h1>
        <div className="ml-auto flex items-center gap-2">
          
        </div>
      </div>
    </header>
  );
}
