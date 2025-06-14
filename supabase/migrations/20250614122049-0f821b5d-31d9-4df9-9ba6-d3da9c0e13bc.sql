
-- 1. User Profiles Table (Profile info + company/plan)
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  company TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'Free',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. User Roles Table (admin, recruiter, interviewer)
CREATE TYPE public.app_role AS ENUM ('admin', 'recruiter', 'interviewer');
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, role)
);

-- 3. Hiring Campaigns Table
CREATE TABLE public.hiring_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  company TEXT,
  role_title TEXT NOT NULL,
  department TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'active'
);

-- 4. Candidates Table
CREATE TABLE public.candidates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES public.hiring_campaigns(id) ON DELETE CASCADE,
  added_by uuid REFERENCES auth.users(id),
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  resume_url TEXT,
  status TEXT DEFAULT 'applied',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Interviews Table
CREATE TABLE public.interviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id uuid REFERENCES public.candidates(id) ON DELETE CASCADE,
  scheduled_by uuid REFERENCES auth.users(id),
  scheduled_at TIMESTAMPTZ,
  outcome TEXT,
  feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Interview Guides Table (AI-generated content)
CREATE TABLE public.interview_guides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES public.hiring_campaigns(id) ON DELETE CASCADE,
  created_by uuid REFERENCES auth.users(id),
  guide_title TEXT NOT NULL,
  prompt_templates TEXT[],
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Scenario Bank Table
CREATE TABLE public.scenario_bank (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  campaign_id uuid REFERENCES public.hiring_campaigns(id) ON DELETE CASCADE,
  prompt_type TEXT,
  scenario TEXT,
  question TEXT,
  evaluation_criteria TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. Team Members Table
CREATE TABLE public.team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  campaign_id uuid REFERENCES public.hiring_campaigns(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  invited_by uuid REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, campaign_id)
);

-- 9. Usage Tracking Table
CREATE TABLE public.usage_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  tokens_used INTEGER DEFAULT 0,
  event_type TEXT,
  context TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ========== RLS Policies for Isolation ===============

-- Enable RLS on all tables for per-user access
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hiring_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scenario_bank ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_tracking ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert/update their own roles" ON public.user_roles
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own role" ON public.user_roles
  FOR UPDATE USING (auth.uid() = user_id);

-- Campaigns: Users who are owners or part of team can select/update
CREATE POLICY "Users can read their campaigns" ON public.hiring_campaigns
  FOR SELECT USING (
    owner_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE campaign_id = id AND user_id = auth.uid()
    )
  );
CREATE POLICY "Users can insert their campaigns" ON public.hiring_campaigns
  FOR INSERT WITH CHECK (owner_id = auth.uid());

-- Candidates: Only for campaigns user can access
CREATE POLICY "Users can read campaign candidates" ON public.candidates
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.hiring_campaigns c
      WHERE c.id = campaign_id
      AND (
        c.owner_id = auth.uid() OR
        EXISTS (SELECT 1 FROM public.team_members WHERE campaign_id = c.id AND user_id = auth.uid())
      )
    )
  );

-- Similar SELECT/INSERT/UPDATE/DELETE policies will be created for other tables (team_members, interviews, guides, scenario_bank, usage_tracking) based on team membership or campaign access.

-- ========== Helper Function for Admin Role =============
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- Auditing tables and further security features (such as full audit logs and privacy guardrails) can be added next depending on your compliance needs.

