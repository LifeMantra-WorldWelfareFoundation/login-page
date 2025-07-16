import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function ConfirmPage() {
  const navigate = useNavigate()

  useEffect(() => {
  const run = async () => {
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) {
      console.error('Error confirming email:', error.message)
      return
    }

    if (session) {
      navigate('/dashboard')
    } else {
      console.warn("No active session after confirmation.")
    }
  }

  run()
}, [])


  return <p>Confirming your email...</p>
}
