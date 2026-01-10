'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Checkbox } from '@/components/ui/checkbox'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    // Handle login logic here
    console.log('Login attempt:', { email, password })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-100 bg-canvas">
      <div className="w-full max-w-[400px]">
        {/* Logo/Brand Section */}
        <div className="flex flex-col items-center mb-200">
          <div className="mb-100">
            <h1 className="text-heading-h3 text-fg-primary">Maple Finance</h1>
          </div>
          <h2 className="text-heading-h5 text-fg-primary mb-50">Welcome back</h2>
          <p className="text-body-sm text-fg-secondary text-center">
            Sign in to your account to continue
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-150">
          <Field
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            size="md"
          />

          <div className="relative">
            <Field
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              size="md"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-75 top-[42px] text-fg-muted hover:text-fg-primary transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="size-icon-md" />
              ) : (
                <Eye className="size-icon-md" />
              )}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-50">
              <Checkbox
                id="remember-me"
                checked={rememberMe}
                onCheckedChange={setRememberMe}
                size="2xs"
              />
              <label htmlFor="remember-me" className="text-body-sm text-fg-secondary cursor-pointer select-none">
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="text-body-sm text-brand hover:text-brand-strong transition-colors"
            >
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={isLoading || !email || !password}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        {/* Sign up link */}
        <div className="mt-200 text-center">
          <p className="text-body-sm text-fg-secondary">
            Don't have an account?{' '}
            <a
              href="#"
              className="text-brand hover:text-brand-strong transition-colors font-medium"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
