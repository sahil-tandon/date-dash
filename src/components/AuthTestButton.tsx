// src/components/AuthTestButton.tsx
'use client';

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"

export function AuthTestButton() {
  return (
    <Button 
      onClick={() => signIn(undefined, { callbackUrl: '/' })}
      variant="outline" 
      className="font-pompiere"
    >
      Test Auth
    </Button>
  )
}