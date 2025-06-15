
-- Enable Row Level Security for hiring_campaigns
ALTER TABLE public.hiring_campaigns ENABLE ROW LEVEL SECURITY;

-- Policies for hiring_campaigns
CREATE POLICY "Users can view their own hiring campaigns"
ON public.hiring_campaigns FOR SELECT
USING (auth.uid() = owner_id);

CREATE POLICY "Users can insert their own hiring campaigns"
ON public.hiring_campaigns FOR INSERT
WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own hiring campaigns"
ON public.hiring_campaigns FOR UPDATE
USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete their own hiring campaigns"
ON public.hiring_campaigns FOR DELETE
USING (auth.uid() = owner_id);

-- Enable Row Level Security for candidates
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;

-- Policies for candidates
CREATE POLICY "Campaign owners can view their candidates"
ON public.candidates FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.hiring_campaigns hc
  WHERE hc.id = candidates.campaign_id AND hc.owner_id = auth.uid()
));

CREATE POLICY "Campaign owners can insert candidates"
ON public.candidates FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM public.hiring_campaigns hc
  WHERE hc.id = candidates.campaign_id AND hc.owner_id = auth.uid()
));

CREATE POLICY "Campaign owners can update their candidates"
ON public.candidates FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM public.hiring_campaigns hc
  WHERE hc.id = candidates.campaign_id AND hc.owner_id = auth.uid()
));

CREATE POLICY "Campaign owners can delete their candidates"
ON public.candidates FOR DELETE
USING (EXISTS (
  SELECT 1 FROM public.hiring_campaigns hc
  WHERE hc.id = candidates.campaign_id AND hc.owner_id = auth.uid()
));
