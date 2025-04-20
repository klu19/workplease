import { useState, useEffect, Dispatch, SetStateAction } from "react";

import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  UserCredential,
} from "firebase/auth";
import { auth } from "./firebase";

function useFirebase() {
  // @ts-ignore
  const [user, setUser]: [User | null, Dispatch<SetStateAction<User | null>>] =
    useState(null);

  // @ts-ignore
  const [token, setToken]: [
    string | null,
    Dispatch<SetStateAction<string | null>>
  ] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const signInWithEmail = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    auth.tenantId = process.env.NEXT_PUBLIC_ADMINS_TENANT_ID!;

    const result = await signInWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((error) => {
      alert(error);
    });
    const { user } = result as UserCredential;
    setUser(user);

    window.location.href = "/";
  };

  const signOut = async () => {
    auth.tenantId = process.env.NEXT_PUBLIC_ADMINS_TENANT_ID!;
    await firebaseSignOut(auth);
  };

  return {
    auth,
    signInWithEmail,
    signOut,
    user,
    token,
  };
}

export default useFirebase;
