
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Sparkles, Loader2 } from "lucide-react";
import { useGeminiApiKey } from "@/hooks/useGeminiApiKey";

export const GeminiApiKeySetting = () => {
  const { apiKey, isLoading, saveApiKey, isSaving, removeApiKey, isRemoving } = useGeminiApiKey();
  const [input, setInput] = useState("");

  useEffect(() => {
    if (apiKey) {
      setInput(apiKey);
    } else {
      setInput("");
    }
  }, [apiKey]);

  const handleSave = () => {
    if (!input.trim()) {
      toast.error("API key cannot be empty.");
      return;
    }
    saveApiKey(input.trim());
  };

  const handleRemove = () => {
    removeApiKey();
  };

  if (isLoading) {
    return (
        <div className="bg-white p-6 rounded-xl shadow border flex flex-col max-w-lg mx-auto gap-4 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
            <p className="text-slate-600">Loading API Key...</p>
        </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow border flex flex-col max-w-lg mx-auto gap-4">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="h-5 w-5 text-purple-600" />
        <h3 className="font-semibold text-lg">Gemini API Key</h3>
      </div>
      <p className="text-slate-600 text-sm mb-2">
        Enter your <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-purple-700 underline">Google Gemini API Key</a> to enable AI chat features. Your key is securely stored in your user profile.
      </p>
      <Input
        type="password"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Paste Gemini API Key here"
      />
      <div className="flex gap-2">
        <Button onClick={handleSave} disabled={isSaving || isRemoving} className="bg-purple-600 text-white hover:bg-purple-700">
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isSaving ? 'Saving...' : 'Save Key'}
        </Button>
        <Button
          variant="outline"
          onClick={handleRemove}
          disabled={!apiKey || isSaving || isRemoving}
        >
            {isRemoving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isRemoving ? 'Removing...' : 'Remove Key'}
        </Button>
      </div>
      {apiKey && (
        <div className="text-xs text-green-600 mt-2">
          API key is saved to your profile.
        </div>
      )}
    </div>
  );
};
