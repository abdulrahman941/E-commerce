"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenu,DropdownMenuContent,DropdownMenuGroup,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import userImage from '../../../assets/userImage.webp'
import Image from "next/image"


export function DropdownMenuBasic({LogOut,closeComponent}:{LogOut:()=>void,closeComponent:()=>void}) {
 
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image width={35} height={35} src={userImage} alt='userImage'/>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link onClick={closeComponent} href={'/Profile'}>Profile</Link>
            </DropdownMenuItem>
             <DropdownMenuItem>
            <Link onClick={closeComponent} href={'/AllOrders'}>AllOrders</Link>
            </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="cursor-pointer" onClick={LogOut}>LogOut</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
