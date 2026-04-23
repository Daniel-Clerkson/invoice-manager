import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Navbar from './Navbar';

export default async function NavbarWrapper({ onOpenReview }: { onOpenReview?: () => void }) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get(name: string) { return cookieStore.get(name)?.value; } } }
  );

  const { data: { user } } = await supabase.auth.getUser();
  
  // Fetch role from your 'profiles' table (or metadata if that's where you store it)
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user?.id)
    .single();

  const userRole = profile?.role || 'user';

  return <Navbar userRole={userRole} onOpenReview={onOpenReview} />;
}