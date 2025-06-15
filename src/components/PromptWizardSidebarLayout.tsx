
import React, { ReactNode, useState } from "react";
import {
  FileText,
  Search,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EnhancedRagChat } from "@/components/chat/EnhancedRagChat";

type Tab = "preview" | "research" | "settings";

const sidebarTabs = [
  {
    key: "preview",
    label: "Preview",
    icon: FileText,
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
  initialTab?: "preview" | "chat" | "research" | "settings";
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
  const [activeTab, setActiveTab] = useState<Tab>(initialTab === "chat" ? "preview" : (initialTab as Tab));

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
      <main className="flex-1 min-w-0 relative flex flex-col lg:flex-row">
        {/* PDF preview modal, etc */}
        {pdfDialog}

        {/* Main tab panel */}
        <div className="flex-1 min-w-0 overflow-y-auto">
          {activeTab === "preview" && previewTab}
          {activeTab === "research" && researchTab}
          {activeTab === "settings" && settingsTab}
        </div>

        {/* AI Chat panel */}
        <div className="w-full lg:w-[450px] flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 flex flex-col">
          <div className="flex-1 flex overflow-hidden p-4 bg-slate-50/50 h-full">
            <EnhancedRagChat context={chatContext} />
          </div>
        </div>
      </main>
    </div>
  );
}
