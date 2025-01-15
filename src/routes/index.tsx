import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from 'react-oidc-context'

export const Route = createFileRoute('/')({
  component: HomeComponent
})

function HomeComponent() {
  const auth = useAuth()
  console.log('index page auth', auth)
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <button onClick={() => auth.signinRedirect()}>Sign In</button>
    </div>
  )
}
