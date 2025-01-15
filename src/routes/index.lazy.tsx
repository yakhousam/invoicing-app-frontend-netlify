import { createLazyFileRoute } from '@tanstack/react-router'
import { useAuth } from 'react-oidc-context'

export const Route = createLazyFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  const auth = useAuth()
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <button onClick={() => auth.signinRedirect()}>Sign In</button>
    </div>
  )
}
