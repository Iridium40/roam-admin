import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient()

export const adminAuth = {
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    // Verify admin role
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('role, permissions')
      .eq('user_id', data.user.id)
      .eq('is_active', true)
      .single()
    if (!adminUser) {
      await supabase.auth.signOut()
      throw new Error('Access denied: Admin privileges required')
    }
    return { user: data.user, adminRole: adminUser.role }
  },
  checkAdminAccess: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('role, permissions')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .single()
    return adminUser ? { user, adminRole: adminUser.role } : null
  },
  signOut: async () => {
    await supabase.auth.signOut()
  }
} 