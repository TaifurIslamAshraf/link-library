'use client'

import { useEffect, useState } from "react";
import { signOut as firebaseSignOut, onAuthStateChanged } from "firebase/auth";

import { auth } from "@/config/firebase";


// export async function signOut() {
//   return firebaseSignOut(auth);
// }

export default function UserAuth() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => setUser(user));
  }, []);

  return user;
}