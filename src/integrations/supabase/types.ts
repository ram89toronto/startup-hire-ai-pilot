export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      candidates: {
        Row: {
          added_by: string | null
          campaign_id: string | null
          created_at: string | null
          email: string | null
          full_name: string
          id: string
          notes: string | null
          phone: string | null
          resume_url: string | null
          status: string | null
        }
        Insert: {
          added_by?: string | null
          campaign_id?: string | null
          created_at?: string | null
          email?: string | null
          full_name: string
          id?: string
          notes?: string | null
          phone?: string | null
          resume_url?: string | null
          status?: string | null
        }
        Update: {
          added_by?: string | null
          campaign_id?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string
          id?: string
          notes?: string | null
          phone?: string | null
          resume_url?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidates_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "hiring_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      hiring_campaigns: {
        Row: {
          company: string | null
          created_at: string | null
          department: string | null
          description: string | null
          id: string
          owner_id: string | null
          role_title: string
          status: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          department?: string | null
          description?: string | null
          id?: string
          owner_id?: string | null
          role_title: string
          status?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          department?: string | null
          description?: string | null
          id?: string
          owner_id?: string | null
          role_title?: string
          status?: string | null
        }
        Relationships: []
      }
      interview_guides: {
        Row: {
          campaign_id: string | null
          created_at: string | null
          created_by: string | null
          guide_title: string
          id: string
          prompt_templates: string[] | null
        }
        Insert: {
          campaign_id?: string | null
          created_at?: string | null
          created_by?: string | null
          guide_title: string
          id?: string
          prompt_templates?: string[] | null
        }
        Update: {
          campaign_id?: string | null
          created_at?: string | null
          created_by?: string | null
          guide_title?: string
          id?: string
          prompt_templates?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "interview_guides_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "hiring_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      interviews: {
        Row: {
          candidate_id: string | null
          created_at: string | null
          feedback: string | null
          id: string
          outcome: string | null
          scheduled_at: string | null
          scheduled_by: string | null
        }
        Insert: {
          candidate_id?: string | null
          created_at?: string | null
          feedback?: string | null
          id?: string
          outcome?: string | null
          scheduled_at?: string | null
          scheduled_by?: string | null
        }
        Update: {
          candidate_id?: string | null
          created_at?: string | null
          feedback?: string | null
          id?: string
          outcome?: string | null
          scheduled_at?: string | null
          scheduled_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interviews_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          gemini_api_key: string | null
          id: string
          subscription_tier: string | null
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          gemini_api_key?: string | null
          id: string
          subscription_tier?: string | null
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          gemini_api_key?: string | null
          id?: string
          subscription_tier?: string | null
        }
        Relationships: []
      }
      scenario_bank: {
        Row: {
          campaign_id: string | null
          created_at: string | null
          evaluation_criteria: string | null
          id: string
          owner_id: string | null
          prompt_type: string | null
          question: string | null
          scenario: string | null
        }
        Insert: {
          campaign_id?: string | null
          created_at?: string | null
          evaluation_criteria?: string | null
          id?: string
          owner_id?: string | null
          prompt_type?: string | null
          question?: string | null
          scenario?: string | null
        }
        Update: {
          campaign_id?: string | null
          created_at?: string | null
          evaluation_criteria?: string | null
          id?: string
          owner_id?: string | null
          prompt_type?: string | null
          question?: string | null
          scenario?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scenario_bank_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "hiring_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          campaign_id: string | null
          created_at: string | null
          id: string
          invited_by: string | null
          role: Database["public"]["Enums"]["app_role"]
          user_id: string | null
        }
        Insert: {
          campaign_id?: string | null
          created_at?: string | null
          id?: string
          invited_by?: string | null
          role: Database["public"]["Enums"]["app_role"]
          user_id?: string | null
        }
        Update: {
          campaign_id?: string | null
          created_at?: string | null
          id?: string
          invited_by?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_members_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "hiring_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      usage_tracking: {
        Row: {
          context: string | null
          created_at: string | null
          event_type: string | null
          id: string
          tokens_used: number | null
          user_id: string | null
        }
        Insert: {
          context?: string | null
          created_at?: string | null
          event_type?: string | null
          id?: string
          tokens_used?: number | null
          user_id?: string | null
        }
        Update: {
          context?: string | null
          created_at?: string | null
          event_type?: string | null
          id?: string
          tokens_used?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "recruiter" | "interviewer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "recruiter", "interviewer"],
    },
  },
} as const
