// src/app/auth-test/page.tsx
import { auth, signIn, signOut } from "@/auth"
import { Button } from "@/components/ui/button"

export default async function AuthTestPage() {
  const session = await auth()
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-normal tracking-wide text-primary font-barrio">
            Auth Test Page
          </h1>
          
          <div className="p-4 rounded-lg bg-white/50 shadow-sm">
            <h2 className="text-xl mb-4 font-pompiere">Current Session:</h2>
            <pre className="whitespace-pre-wrap break-all text-sm">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>

          <div className="flex justify-center gap-4">
            <form action={async () => {
              "use server"
              await signIn()
            }}>
              <Button type="submit" className="font-pompiere">
                Sign In
              </Button>
            </form>

            <form action={async () => {
              "use server"
              await signOut()
            }}>
              <Button type="submit" variant="outline" className="font-pompiere">
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}