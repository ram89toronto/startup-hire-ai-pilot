
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

export const GeminiApiKeySetting = () => {
  const [apiKey, setApiKey] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("gemini-api-key") || "";
    setApiKey(stored);
    setInput(stored);
  }, []);

  const handleSave = () => {
    if (!input.trim()) {
      toast.error("API key cannot be empty.");
      return;
    }
    localStorage.setItem("gemini-api-key", input.trim());
    setApiKey(input.trim());
    toast.success("Gemini API key updated!");
  };

  const handleRemove = () => {
    localStorage.removeItem("gemini-api-key");
    setApiKey("");
    setInput("");
    toast.success("Gemini API key removed.");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow border flex flex-col max-w-lg mx-auto gap-4">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="h-5 w-5 text-purple-600" />
        <h3 className="font-semibold text-lg">Gemini API Key</h3>
      </div>
      <p className="text-slate-600 text-sm mb-2">
        Enter your <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-purple-700 underline">Google Gemini API Key</a> to enable AI chat features.
      </p>
      <Input
        type="password"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Paste Gemini API Key here"
      />
      <div className="flex gap-2">
        <Button onClick={handleSave} className="bg-purple-600 text-white hover:bg-purple-700">
          Save Key
        </Button>
        <Button
          variant="outline"
          onClick={handleRemove}
          disabled={!apiKey}
        >
          Remove Key
        </Button>
      </div>
      {apiKey && (
        <div className="text-xs text-green-600 mt-2">
          API key is saved in your browser.
        </div>
      )}
    </div>
  );
};
