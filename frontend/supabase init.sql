-- RESET
drop table if exists public.settings cascade;

drop table if exists public.projects cascade;

drop table if exists public.about cascade;

drop table if exists public.contacts cascade;

drop table if exists public.leads cascade;

drop function if exists public.get_meta ();

drop function if exists public.get_projects_list ();

drop function if exists public.get_project (text);

drop function if exists public.get_about ();

drop function if exists public.get_contacts ();

-- SCHEMA
create table public.settings (
  id BIGSERIAL primary key,
  hero_bg_url text not null,
  site_logo_text text not null,
  site_logo_subtitle text not null,
  hero_scroll_label text not null,
  hero_intro_label text not null,
  hero_intro_description text not null,
  hero_intro_prompt text not null,
  hero_nav_label text not null,
  portfolio_section_title text not null,
  about_section_title text not null,
  contact_section_title text not null,
  contact_title text not null,
  contact_form_label text not null,
  contact_thanks_label text not null,
  owner_email text not null,
  policy_label text not null,
  project_overview_label text not null,
  project_stack_label text not null
);

create table public.projects (
  id BIGSERIAL primary key,
  slug TEXT not null unique,
  sort BIGINT not null,
  name TEXT not null,
  description TEXT not null,
  primary_image TEXT not null,
  secondary_image TEXT not null,
  url TEXT,
  overview TEXT not null,
  stack TEXT not null,
  published BOOLEAN not null default false
);

create table public.about (
  id BIGSERIAL primary key,
  image_url TEXT not null,
  sections JSONB not null default '[]'
);

create table public.contacts (
  id BIGSERIAL primary key,
  sort BIGINT not null,
  label TEXT not null,
  value TEXT not null
);

create table public.leads (
  id BIGSERIAL primary key,
  contact TEXT not null,
  is_read BOOLEAN not null default false,
  created_at timestamptz not null default now()
);

--SECURITY
revoke all on all TABLES in SCHEMA public
from
  anon,
  authenticated;

revoke all on all SEQUENCES in SCHEMA public
from
  anon,
  authenticated;

grant USAGE on SCHEMA public to anon,
authenticated;

--SEED
insert into
  public.settings (
    hero_bg_url,
    site_logo_text,
    site_logo_subtitle,
    hero_scroll_label,
    hero_intro_label,
    hero_intro_description,
    hero_intro_prompt,
    hero_nav_label,
    portfolio_section_title,
    about_section_title,
    contact_section_title,
    contact_title,
    contact_form_label,
    contact_thanks_label,
    owner_email,
    policy_label,
    project_overview_label,
    project_stack_label
  )
values
  (
    'https://dfpvdzjxicsyvptmttxi.supabase.co/storage/v1/object/public/meta/bg.avif',
    'seym.dev',
    'web design and development',
    'keep scrolling',
    'welcome',
    'seym.dev is an independent creative studio creating distinctive identities and digital experiences.',
    'explore selected projects, discover the studio, and find everything you need to get in touch.',
    'explore more info about...',
    'projects',
    'expertise',
    'contact',
    'let''s talk!',
    'How can I reach you?',
    'Thanks for stopping by!',
    'konstantinseym@proton.me',
    'Privacy policy',
    'OVERVIEW',
    'STACK'
  );

insert into
  public.projects (
    slug,
    sort,
    name,
    description,
    primary_image,
    secondary_image,
    url,
    overview,
    stack,
    published
  )
values
  (
    'jimmy-engine',
    1,
    'jimmy engine',
    'NEWS / BLOG WEB APP',
    'https://dfpvdzjxicsyvptmttxi.supabase.co/storage/v1/object/public/project-images/0003.png',
    'https://dfpvdzjxicsyvptmttxi.supabase.co/storage/v1/object/public/project-images/0002.png',
    'https://jimmy-engine.seym.dev',
    'A handcrafted custom blogging platform with an original interface, built-in CMS, authentication, posts, comments, likes, search, pagination, and responsive motion-driven interactions.',
    'Built with React, React Router, Tailwind CSS, Motion, TanStack Query, and Supabase for PostgreSQL, authentication, storage, server-side functions, and backend infrastructure.',
    true
  );

insert into
  public.about (image_url, sections)
values
  (
    'https://dfpvdzjxicsyvptmttxi.supabase.co/storage/v1/object/public/meta/0001.jpg',
    '[{"section": "INDEPENDENT BY DESIGN", "value": "My name is Konstantin. SEYM.DEV is my independent web studio — built around one person, a laptop, and a genuine interest in creating things from scratch. I build modern websites and web applications that are fast, reliable and thoughtfully designed. Every project combines clean interfaces, solid architecture and practical solutions that work beyond the first release."}, {"section": "TECHNOLOGY", "value": "My journey into software development was built through continuous self-learning, experimentation and creating real products from scratch. From frontend experiences to backend systems and infrastructure, I handle every part of the process myself. The digital world is becoming increasingly global, and many products are starting to lose their identity through repeated templates and generic solutions. I believe there is still a place for originality, thoughtful design and products with character. At the same time, AI is transforming how we build software. I believe the value is not in avoiding new tools, but in using them responsibly — combining AI capabilities with human creativity, experience and judgment to create better products. SEYM.DEV is my way of contributing to a more thoughtful digital space — learning constantly, improving with every project and creating software Im proud to put my name on."}]'
  );

insert into
  public.contacts (sort, label, value)
values
  (1, 'Telegram', '@seymdev'),
  (2, 'Instagram', '@seymdev'),
  (3, 'Govnogram', '@seymdev'),
  (4, 'Lohogram', '@seym.dev');

--FUNCTIONS
create function public.get_meta () returns json language sql security definer
set
  search_path = '' as $$
SELECT json_build_object(
  'hero_bg_url', s.hero_bg_url,
  'site_logo_text', s.site_logo_text,
  'site_logo_subtitle', s.site_logo_subtitle,
  'hero_scroll_label', s.hero_scroll_label,
  'hero_intro_label', s.hero_intro_label,
  'hero_intro_description', s.hero_intro_description,
  'hero_intro_prompt', s.hero_intro_prompt,
  'hero_nav_label', s.hero_nav_label,
  'portfolio_section_title', s.portfolio_section_title,
  'about_section_title', s.about_section_title,
  'contact_section_title', s.contact_section_title,
  'contact_title', s.contact_title,
  'contact_form_label', s.contact_form_label,
  'contact_thanks_label', s.contact_thanks_label,
  'owner_email', s.owner_email,
  'policy_label', s.policy_label,
  'project_overview_label', s.project_overview_label,
  'project_stack_label', s.project_stack_label
) from public.settings as s limit 1;
  $$;

revoke
execute on function public.get_meta ()
from
  PUBLIC;

grant
execute on function public.get_meta () to anon,
authenticated;

create function public.get_projects_list () returns table (
  id bigint,
  slug text,
  name text,
  description text,
  primary_image text,
  secondary_image text
) language sql security definer
set
  search_path = '' as $$
select p.id, p.slug, p.name, p.description, p.primary_image, p.secondary_image from public.projects as p where p.published = true order by p.sort asc;
$$;

revoke
execute on function public.get_projects_list ()
from
  PUBLIC;

grant
execute on function public.get_projects_list () to anon,
authenticated;

create function public.get_project (p_slug text) returns json language sql security definer
set
  search_path = '' as $$
  select json_build_object(
    'name', p.name,
    'description', p.description,
    'primary_image', p.primary_image,
    'secondary_image', p.secondary_image,
    'url', p.url,
    'overview', p.overview,
    'stack', p.stack
  ) from public.projects as p where p.slug = p_slug and p.published = true;
  $$;

revoke
execute on function public.get_project (text)
from
  PUBLIC;

grant
execute on function public.get_project (text) to anon,
authenticated;

create function public.get_about () returns json language sql security definer
set
  search_path = '' as $$
  select json_build_object(
    'image_url', a.image_url,
    'sections', a.sections
  ) from public.about as a limit 1;
  $$;

revoke
execute on function public.get_about ()
from
  PUBLIC;

grant
execute on function public.get_about () to anon,
authenticated;

create function public.get_contacts () returns table (id bigint, label text, value text) language sql security definer
set
  search_path = '' as $$
select c.id, c.label, c. value from public.contacts as c order by c.sort asc;
$$;

revoke
execute on function public.get_contacts ()
from
  PUBLIC;

grant
execute on function public.get_contacts () to anon,
authenticated;