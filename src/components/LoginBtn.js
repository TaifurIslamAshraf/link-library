'use client'

import UserAuth from "@/hooks/useAuth"
import { Button } from "@mui/material";
import Link from "next/link";
import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";
import LogoutIcon from "@mui/icons-material/Logout"


export default function LoginBtn(){

    const user = UserAuth()
  
    const handleLogout = async ()=>{
        await signOut(auth)
    }

    return (
        <div>
        {
            user ?   <div>
   
              <Button  variant="contained" color="success" onClick={handleLogout}>
                <LogoutIcon fontSize="15px" sx={{marginRight: "7px"}} />  Logout
              </Button>
            </div> :   <div>
          <Link href={"/login"}>
            <Button>
                Login
            </Button>
            </Link>
          </div>
        }
        </div>
    )
}