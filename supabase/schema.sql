-- Uprep: accounts, paid access and the paid course content.
-- Run once in Supabase > SQL Editor.

-- 1) One profile row per user. "paid" is set only by the Stripe webhook (service role), never by the user.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  paid boolean not null default false,
  paid_at timestamptz,
  stripe_session text,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
drop policy if exists "read own profile" on public.profiles;
create policy "read own profile" on public.profiles for select using (auth.uid() = id);
-- no insert/update/delete policies: users cannot mark themselves as paid.

-- create the profile automatically on sign-up
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email) on conflict (id) do nothing;
  return new;
end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- 2) Paid course content: one row per stage (id = s1, s2, ...). data = {"blocks":[...]} in the same format as content/stages.json.
create table if not exists public.course_stages (
  id text primary key,
  position int not null default 0,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.course_stages enable row level security;
drop policy if exists "paid users read course" on public.course_stages;
create policy "paid users read course" on public.course_stages for select
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.paid));
