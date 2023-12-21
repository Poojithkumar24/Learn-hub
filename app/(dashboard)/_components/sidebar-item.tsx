'use client'

import { cn } from "@/lib/utils";
import {LucideIcon} from "lucide-react";
import {usePathname,useRouter} from "next/navigation";

interface SidebarProps{
    icon: LucideIcon,
    label:string,
    href:string;
};

export const SidebarItem = ({
    icon:Icon,
    label,
    href
}:SidebarProps)=>{

    const pathname = usePathname();
    const router = useRouter();

    const isActive = (pathname==="/" && href==="/") || pathname===href || pathname?.startsWith(`${href}/`);

    const onClick = () =>{
        router.push(href);
    }

    return(
        <button
        onClick={onClick}
        type="button"
        className={cn(
            "flex items-center gap-x-2 text-slate-600 text-sm-font-[500] pl-6 transition-all hover:text-black-500 hover:bg-sky-300", isActive && "text-black bg-sky-200 hover:bg-white-200 hover:text-stone-900"
        )}
        >

            <div className="flex items-center gap-x-2 py-4">
                <Icon  
                  size={24}
                  className={cn(
                    "text-slate-500",isActive && "text-slate-700"
                  )}
                />
                {label}
            </div>
            <div 
              className={cn(
                "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all" , isActive && "opacity-100"
              )}
            />

        </button>
        

        
    )
}

export default SidebarItem;