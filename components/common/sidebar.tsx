"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { RouterOptions } from "@/constants/router.constant"
import { cn } from "@/lib/utils"


export default function Sidebar() {
  const pathName = usePathname();

  return <nav className="dark:bg-black h-screen overflow-scroll justify-between flex items-center flex-col gap-10 py-6 px-2">
    <div className="flex flex-col items-center gap-8 p-2">
      <Link href={"/"} className="flex font-bold flex-row text-sm">s.f</Link>
      <TooltipProvider>
        {RouterOptions.map((item) => (
          <ul key={item.name}>
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <li>
                  <Link 
                    href={item.href}
                    className={cn(
                      "group h-8 w-8 flex items-center justify-center scale-[1.5] rounded-lg p-[3px] cursor-pointer",
                      {
                        "dark:bg-[#2F006B] bg-[#EEE0FF]":
                        pathName === item.href
                      }
                    )}
                  >
                    <item.icon />
                  </Link>
                </li>
              </TooltipTrigger>
              <TooltipContent
                side={"right"}
                className="backdrop-blur-xl"
              >
                <p>{item.name}</p>
              </TooltipContent>
            </Tooltip>
          </ul>
        ))}
      </TooltipProvider>
      <Separator />
    </div>
  </nav>
}

