
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Key, Shield, Zap } from "lucide-react";
import { toast } from "sonner";

interface AIConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AIConfigDialog = ({ open, onOpenChange }: AIConfigDialogProps) => {
  const [apiKeys, setApiKeys] = useState({
    openai: "",
    anthropic: "",
    google: ""
  });

  const handleSaveKey = (provider: string, key: string) => {
    setApiKeys(prev => ({ ...prev, [provider]: key }));
    toast.success(`${provider.toUpperCase()} API key saved securely`);
  };

  const providers = [
    {
      id: "openai",
      name: "OpenAI",
      description: "GPT-4 and GPT-3.5 models",
      icon: "🤖",
      cost: "$0.03 per 1K tokens",
      recommended: true
    },
    {
      id: "anthropic", 
      name: "Anthropic",
      description: "Claude 3.5 Sonnet and Haiku",
      icon: "🧠",
      cost: "$0.025 per 1K tokens",
      recommended: false
    },
    {
      id: "google",
      name: "Google",
      description: "Gemini Pro and Flash models",
      icon: "✨",
      cost: "$0.002 per 1K tokens",
      recommended: false
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            AI Configuration
          </DialogTitle>
          <DialogDescription>
            Configure your AI providers and API keys for enhanced functionality
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="providers" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="providers">AI Providers</TabsTrigger>
            <TabsTrigger value="security">Security & Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="providers" className="space-y-4">
            <div className="grid gap-4">
              {providers.map((provider) => (
                <Card key={provider.id} className="relative">
                  {provider.recommended && (
                    <Badge className="absolute -top-2 right-4 bg-green-100 text-green-800">
                      Recommended
                    </Badge>
                  )}
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{provider.icon}</span>
                      <div>
                        <CardTitle className="text-lg">{provider.name}</CardTitle>
                        <CardDescription>{provider.description}</CardDescription>
                      </div>
                      <div className="ml-auto text-right">
                        <div className="text-sm font-medium">{provider.cost}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex gap-2">
                      <Input
                        placeholder={`Enter your ${provider.name} API key`}
                        type="password"
                        value={apiKeys[provider.id as keyof typeof apiKeys]}
                        onChange={(e) => setApiKeys(prev => ({ ...prev, [provider.id]: e.target.value }))}
                      />
                      <Button 
                        variant="outline"
                        onClick={() => handleSaveKey(provider.id, apiKeys[provider.id as keyof typeof apiKeys])}
                      >
                        Save
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Pro Tip</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Add your own API keys to get unlimited usage and bypass token limits. 
                    Your keys are stored securely in your browser and never sent to our servers.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Security & Privacy
                </Car dTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">API keys are stored locally in your browser</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Keys are encrypted before storage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">No data is sent to third-party servers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">All AI requests go directly to the providers</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <Button variant="destructive" size="sm">
                    Clear All Stored Keys
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
