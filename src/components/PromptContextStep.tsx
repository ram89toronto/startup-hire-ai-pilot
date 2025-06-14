
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export function PromptContextStep({
  role,
  context,
  setContext,
}: {
  role: string;
  context: any;
  setContext: (ctx: any) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Details & Role Context</CardTitle>
        <CardDescription>
          Provide information about the company, challenge, and what you’re hiring for. Required fields marked *
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="roleTitle">Role Title *</Label>
          <Input
            id="roleTitle"
            required
            value={context.roleTitle}
            onChange={e => setContext({ ...context, roleTitle: e.target.value })}
            placeholder="e.g. Lead Backend Engineer, Product Owner"
          />
        </div>
        <div>
          <Label htmlFor="companyContext">Company Stage & Domain *</Label>
          <Input
            id="companyContext"
            required
            onChange={e => setContext({ ...context, companyContext: e.target.value })}
            value={context.companyContext}
            placeholder="e.g. Pre-seed fintech SaaS, ~5 employees"
          />
        </div>
        <div>
          <Label htmlFor="challenges">
            Top Challenges <span className="text-xs text-slate-400">(3-5 words)</span>
          </Label>
          <Textarea
            id="challenges"
            value={context.challenges}
            onChange={e => setContext({ ...context, challenges: e.target.value })}
            placeholder="e.g. scaling MVP; hiring first 10; entering new market"
          />
        </div>
        <div>
          <Label htmlFor="values">Company Values</Label>
          <Textarea
            id="values"
            value={context.values}
            onChange={e => setContext({ ...context, values: e.target.value })}
            placeholder="e.g. bias for action, extreme ownership"
          />
        </div>
      </CardContent>
    </Card>
  );
}
