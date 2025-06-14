
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Search, GraduationCap, TrendingUp, MapPin, Sparkles } from 'lucide-react';
import { useGoogleApis } from '@/hooks/useGoogleApis';

export const GoogleApiToggles = () => {
  const { config, toggleApi } = useGoogleApis();

  const apiOptions = [
    {
      key: 'search' as const,
      icon: <Search className="h-4 w-4" />,
      label: 'Google Search',
      description: 'Company research & role insights',
      badge: 'Popular',
      badgeVariant: 'default' as const,
    },
    {
      key: 'scholar' as const,
      icon: <GraduationCap className="h-4 w-4" />,
      label: 'Google Scholar',
      description: 'Academic hiring research',
      badge: 'Pro',
      badgeVariant: 'secondary' as const,
    },
    {
      key: 'trends' as const,
      icon: <TrendingUp className="h-4 w-4" />,
      label: 'Google Trends',
      description: 'Skill demand analytics',
      badge: 'Trending',
      badgeVariant: 'outline' as const,
    },
    {
      key: 'maps' as const,
      icon: <MapPin className="h-4 w-4" />,
      label: 'Google Maps',
      description: 'Location & market data',
      badge: 'Beta',
      badgeVariant: 'destructive' as const,
    },
  ];

  return (
    <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-700">
          <Sparkles className="h-5 w-5" />
          Google API Integrations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {apiOptions.map((option) => (
          <div key={option.key} className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-100">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-slate-700">
                {option.icon}
                <Label htmlFor={option.key} className="font-medium cursor-pointer">
                  {option.label}
                </Label>
                <Badge variant={option.badgeVariant} className="text-xs">
                  {option.badge}
                </Badge>
              </div>
              <span className="text-sm text-slate-500">{option.description}</span>
            </div>
            <Switch
              id={option.key}
              checked={config[option.key]}
              onCheckedChange={() => toggleApi(option.key)}
            />
          </div>
        ))}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700">
            <strong>Smart Enhancement:</strong> Enabled APIs will automatically enhance your interview guides with real-time data and insights.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
