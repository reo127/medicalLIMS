"use client"
import { useState } from 'react';
import { 
  HomeIcon, 
  GearIcon, 
  DrawingPinIcon, 
  PersonIcon, 
  BackpackIcon, 
  ExitIcon,
  CheckIcon
} from '@radix-ui/react-icons';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function Sidebar({children}) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const menuItems = [
    { name: "Approve", icon: <CheckIcon className="h-5 w-5" />, href: "#" },
    { name: "Settings", icon: <GearIcon className="h-5 w-5" />, href: "#" },
    { name: "Payments", icon: <DrawingPinIcon className="h-5 w-5" />, href: "#" },
    { name: "Patients Dashboard", icon: <PersonIcon className="h-5 w-5" />, href: "#" },
    { name: "Inventory", icon: <BackpackIcon className="h-5 w-5" />, href: "#" },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div 
        className={cn(
          "h-screen bg-white flex flex-col transition-all duration-300 border-r shadow-lg z-10",
          isExpanded ? "w-64" : "w-16"
        )}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Logo */}
        <div className="flex items-center justify-center p-4">
          <div className="font-bold flex items-center justify-center">
            <HomeIcon className="h-6 w-6 text-blue-600" />
            {isExpanded && <span className="ml-2">MedApp</span>}
          </div>
        </div>
        
        <Separator />
        
        {/* Navigation Links */}
        <div className="flex-1 py-4">
          <nav className="space-y-1 px-2">
            <TooltipProvider delayDuration={0}>
              {menuItems.map((item, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isExpanded ? "ghost" : "ghost"}
                      className={cn(
                        "w-full justify-start mb-1",
                        isExpanded ? "px-4" : "px-2"
                      )}
                      asChild
                    >
                      <a href={item.href} className="flex items-center">
                        <span className="text-gray-500">{item.icon}</span>
                        {isExpanded && (
                          <span className="ml-4 text-sm font-medium">{item.name}</span>
                        )}
                      </a>
                    </Button>
                  </TooltipTrigger>
                  {!isExpanded && (
                    <TooltipContent side="right">
                      {item.name}
                    </TooltipContent>
                  )}
                </Tooltip>
              ))}
            </TooltipProvider>
          </nav>
        </div>
        
        <Separator />
        
        {/* Logout at bottom */}
        <div className="p-4">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50",
                    isExpanded ? "px-4" : "px-2"
                  )}
                  asChild
                >
                  <a href="#" className="flex items-center">
                    <ExitIcon className="h-5 w-5" />
                    {isExpanded && (
                      <span className="ml-4 text-sm font-medium">Logout</span>
                    )}
                  </a>
                </Button>
              </TooltipTrigger>
              {!isExpanded && (
                <TooltipContent side="right">
                  Logout
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Main content area with overlay when sidebar is expanded */}
      <div className="flex-1 relative">
        {/* Overlay that appears when sidebar expands */}
        {isExpanded && (
          <div className="absolute inset-0 bg-gray-800 bg-opacity-30 z-0 transition-opacity duration-300"></div>
        )}
        
        {/* Your main content would go here */}
        <div className="p-8">
        {children}
          {/* <h1 className="text-2xl font-bold text-gray-800">Main Content Area</h1>
          <p className="text-gray-600 mt-4">Your application content would display here.</p> */}
        </div>
      </div>
    </div>
  );
}