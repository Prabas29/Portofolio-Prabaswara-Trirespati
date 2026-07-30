-- ============================================================
--  SETUP DATABASE UNTUK ADMIN DASHBOARD PORTOFOLIO
--  Jalankan sekali di Supabase: SQL Editor > New query > Run
-- ============================================================

-- 1. Tabel penyimpan seluruh konten website (satu baris, format JSON)
create table if not exists public.site_content (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

-- Semua orang boleh MEMBACA konten (dibutuhkan website publik)
drop policy if exists "site_content public read" on public.site_content;
create policy "site_content public read"
  on public.site_content for select
  using (true);

-- Hanya user yang sudah login yang boleh MENULIS (admin)
drop policy if exists "site_content auth insert" on public.site_content;
create policy "site_content auth insert"
  on public.site_content for insert
  to authenticated
  with check (true);

drop policy if exists "site_content auth update" on public.site_content;
create policy "site_content auth update"
  on public.site_content for update
  to authenticated
  using (true);


-- 2. Bucket penyimpanan gambar (logo, sertifikat, foto)
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- Semua orang boleh melihat gambar
drop policy if exists "media public read" on storage.objects;
create policy "media public read"
  on storage.objects for select
  using (bucket_id = 'media');

-- Hanya admin yang login boleh unggah / mengganti gambar
drop policy if exists "media auth insert" on storage.objects;
create policy "media auth insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media');

drop policy if exists "media auth update" on storage.objects;
create policy "media auth update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media');

drop policy if exists "media auth delete" on storage.objects;
create policy "media auth delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media');
