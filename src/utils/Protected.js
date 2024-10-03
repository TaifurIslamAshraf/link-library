'use client'

import UserAuth from "@/hooks/useAuth"
import { useRouter } from "next/navigation"

export default function Protected({children}){
    const router = useRouter()

    const user = UserAuth()

    if(user === null){
        return router.push("/login")
    }else {
        return <>{children}</>
    }
}