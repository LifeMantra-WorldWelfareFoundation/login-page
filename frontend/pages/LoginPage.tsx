import React, { useState } from 'react'
import {
  GoogleIcon,
  AppleIcon,
  FacebookIcon,
  SnapchatIcon,
  DiscordIcon,
  XIcon,
  TikTokIcon,
  EmailIcon,
  PasswordIcon,
  Logo,
} from '../components/icons'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    // Simulate server call
    setTimeout(() => {
      setLoading(false)
      if (email && password.length >= 6) {
        setSuccess('Success! Redirecting…')
        // TODO: do real redirect
      } else {
        setError('Invalid email or password. Please try again.')
      }
    }, 1500)
  }

  const handleSocialLogin = (provider: string) => {
    console.log(`Logging in with ${provider}`)
    // TODO: wire up your OAuth flows
  }

  return (
    <div className="login-container">
      <div className="logo-container">
        <div className="logo">
          <Logo size={40} color="white" className="logo-icon" />
        </div>
        <h1>Welcome back</h1>
        <p className="subtitle">Sign in to your account to continue</p>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="input-wrapper">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <EmailIcon className="input-icon icon" />
          </div>
        </div>

        <div className="form-group">
          <div className="input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <PasswordIcon className="input-icon icon" />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(v => !v)}
            >
              {showPassword
                ? <FaEyeSlash size={20} />
                : <FaEye      size={20} />}
            </button>
          </div>
        </div>

        <div className="remember-forgot">
          <label className="custom-checkbox">
            <input type="checkbox" id="remember" />
            <span className="checkmark" />
            Remember me
          </label>
          <a href="#" className="forgot-link">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className={`submit-btn${loading ? ' loading-state' : ''}`}
          disabled={loading}
        >
          <span className="btn-text">Sign in</span>
          <div className="loading" />
        </button>
      </form>

      <div className="divider">
        <span>or continue with</span>
      </div>

      <div className="social-buttons">
        <button
          className="social-btn primary"
          onClick={() => handleSocialLogin('google')}
        >
          <GoogleIcon className="icon" />
          Continue with Google
        </button>

        <button
          className="social-btn primary"
          onClick={() => handleSocialLogin('apple')}
        >
          <AppleIcon className="icon icon-apple" />
          Continue with Apple
        </button>

        <button
          className="social-btn primary"
          onClick={() => handleSocialLogin('facebook')}
        >
          <FacebookIcon className="icon" />
          Continue with Facebook
        </button>
      </div>

      <div className="social-grid">
        <button
          className="social-grid-btn"
          onClick={() => handleSocialLogin('snapchat')}
        >
          <SnapchatIcon className="icon icon-snapchat" />
        </button>
        <button
          className="social-grid-btn"
          onClick={() => handleSocialLogin('discord')}
        >
          <DiscordIcon className="icon" />
        </button>
        <button
          className="social-grid-btn"
          onClick={() => handleSocialLogin('x')}
        >
          <XIcon className="icon icon-x" />
        </button>
        <button
          className="social-grid-btn"
          onClick={() => handleSocialLogin('tiktok')}
        >
          <TikTokIcon className="icon icon-tiktok" />
        </button>
      </div>

      <p className="signup-link">
        Don't have an account? <a href="#">Sign up</a>
      </p>
    </div>
  )
}

export default LoginPage
