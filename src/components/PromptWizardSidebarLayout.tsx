
import React, { ReactNode, useState } from "react";
import {
  FileText,
  MessageCircle,
  Search,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EnhancedRagChat } from "@/components/chat/EnhancedRagChat";
import { Card } from "@/components/ui/card";

type Tab = "preview" | "chat" | "research" | "settings";

const sidebarTabs = [
  {
    key: "preview",
    label: "Preview",
    icon: FileText,
  },
  {
    key: "chat",
    label: "AI Chat",
    icon: MessageCircle,
  },
  {
    key: "research",
    label: "Research",
    icon: Search,
  },
  {
    key: "settings",
    label: "Settings",
    icon: Settings,
  },
] as const;

interface Props {
  chatContext: any;
  showPdf: boolean;
  setShowPdf: (b: boolean) => void;
  previewTab: ReactNode;
  researchTab: ReactNode;
  settingsTab: ReactNode;
  pdfDialog: ReactNode;
  initialTab?: Tab;
}

export function PromptWizardSidebarLayout({
  chatContext,
  showPdf,
  setShowPdf,
  previewTab,
  researchTab,
  settingsTab,
  pdfDialog,
  initialTab = "preview",
}: Props) {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  // Sidebar uses vertical tabs
  return (
    <div className="flex flex-col lg:flex-row gap-0 w-full h-full min-h-[600px]">
      <aside className="flex-shrink-0 w-full lg:w-52 bg-white border-r border-blue-100 flex lg:flex-col flex-row">
        {sidebarTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              className={cn(
                "flex items-center px-6 py-4 lg:px-4 lg:py-6 justify-center w-full border-b border-blue-50 lg:border-b-0 lg:border-r rounded-none hover:bg-blue-50 transition-all gap-3 text-base font-medium",
                isActive
                  ? "bg-gradient-to-r lg:bg-gradient-to-b from-blue-100 to-indigo-50 text-blue-700 font-bold shadow"
                  : "text-slate-500 hover:text-blue-700"
              )}
              onClick={() => setActiveTab(tab.key as Tab)}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-5 w-5" />
              <span className="hidden lg:inline">{tab.label}</span>
            </button>
          );
        })}
      </aside>
      <main className="flex-1 min-w-0 p-0 relative flex flex-col">
        {/* PDF preview modal, etc */}
        {pdfDialog}

        {/* Main tab panel */}
        {activeTab === "preview" && previewTab}
        {activeTab === "research" && researchTab}
        {activeTab === "settings" && settingsTab}
        {/* AI Chat gets its own persistent area */}
        {activeTab === "chat" && (
          <div className="w-full h-full flex flex-col">
            <div className="flex-1 flex overflow-hidden">
              <div className="max-w-2xl w-full mx-auto my-4 flex-1 flex flex-col">
                <EnhancedRagChat context={chatContext} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
