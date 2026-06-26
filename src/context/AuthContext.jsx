import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadProfile = async (userId) => {
    if (!userId) {
      setProfile(null)
      return
    }

    const { data, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (profileError) {
      console.error('Profile load failed:', profileError)
      setProfile(null)
      return
    }

    setProfile(data)
  }

  useEffect(() => {
    const initialize = async () => {
      setLoading(true)
      const { data: sessionData } = await supabase.auth.getSession()
      const sessionUser = sessionData?.session?.user || null
      setUser(sessionUser)
      if (sessionUser) {
        await loadProfile(sessionUser.id)
      }
      setLoading(false)
    }

    initialize()

    const { data } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const sessionUser = session?.user || null
      setUser(sessionUser)
      if (sessionUser) {
        await loadProfile(sessionUser.id)
      } else {
        setProfile(null)
      }
    })

    return () => {
      if (data?.subscription) {
        data.subscription.unsubscribe()
      }
    }
  }, [])

  const signUp = async ({ fullName, email, password }) => {
    setLoading(true)
    setError(null)

    const { data, error: signUpError } = await supabase.auth.signUp({ email, password })
    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return { error: signUpError }
    }

    if (data?.user) {
      const profilePayload = {
        id: data.user.id,
        full_name: fullName,
        phone: '',
      }
      await supabase.from('profiles').upsert(profilePayload)
      await loadProfile(data.user.id)
      setUser(data.user)
      setLoading(false)
      return { user: data.user }
    }

    setLoading(false)
    return { error: signUpError }
  }

  const signIn = async ({ email, password }) => {
    setLoading(true)
    setError(null)
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    if (signInError) {
      setError(signInError.message)
      setLoading(false)
      return { error: signInError }
    }
    if (data?.user) {
      await loadProfile(data.user.id)
      setUser(data.user)
      setLoading(false)
      return { user: data.user }
    }
    setLoading(false)
    return { error: signInError }
  }

  const signOut = async () => {
    setLoading(true)
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    setLoading(false)
  }

  const value = useMemo(
    () => ({
      user,
      profile,
      loading,
      error,
      signUp,
      signIn,
      signOut,
      isAuthenticated: Boolean(user),
      isAdmin: profile?.role === 'admin',
    }),
    [user, profile, loading, error],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}
