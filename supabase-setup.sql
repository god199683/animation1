-- Supabase SQL Editor에서 한 번 실행하세요. 공개 publishable key만 사용하는 데스크톱 앱을 위한 안전한 보관함 테이블입니다.
create table if not exists public.video_archives (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  category text not null,
  payload jsonb not null,
  created_at timestamptz not null default now(),
  primary key (user_id, category)
);
alter table public.video_archives enable row level security;
grant select, insert, update, delete on public.video_archives to authenticated;
drop policy if exists "archive readable" on public.video_archives;
create policy "archive readable" on public.video_archives for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists "archive insert" on public.video_archives;
create policy "archive insert" on public.video_archives for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists "archive update" on public.video_archives;
create policy "archive update" on public.video_archives for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists "archive delete" on public.video_archives;
create policy "archive delete" on public.video_archives for delete to authenticated using ((select auth.uid()) = user_id);
