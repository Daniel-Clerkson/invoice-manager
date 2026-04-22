import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const cookieStore = await cookies();
  
  // 1. Correctly initialize the server-side client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value; },
      },
    }
  );

  // 2. Authenticate using the server client
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  // 3. Use the 'user' object retrieved in Step 2
  const { data, error } = await supabase
    .from('invoices')
    .insert([{
      irn: body.irn,
      supplier_name: body.supplier_name,
      total_amount: body.total_amount,
      user_id: user.id, // <--- Correct: This comes from the server-side auth
      firs_payload: { ...body }
    }])
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ status: 'success', data });
}

