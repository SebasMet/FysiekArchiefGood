export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      dossier_pages: {
        Row: {
          actors_mentioned: Json | null
          annotations: Json | null
          created_at: string
          document_creation_timestamp: string | null
          document_creator: string | null
          document_type: string | null
          dossier_id: string
          embedding: string | null
          id: string
          importance: number | null
          markdown_text: string
          page_number: number | null
          summary: string | null
        }
        Insert: {
          actors_mentioned?: Json | null
          annotations?: Json | null
          created_at?: string
          document_creation_timestamp?: string | null
          document_creator?: string | null
          document_type?: string | null
          dossier_id: string
          embedding?: string | null
          id?: string
          importance?: number | null
          markdown_text: string
          page_number?: number | null
          summary?: string | null
        }
        Update: {
          actors_mentioned?: Json | null
          annotations?: Json | null
          created_at?: string
          document_creation_timestamp?: string | null
          document_creator?: string | null
          document_type?: string | null
          dossier_id?: string
          embedding?: string | null
          id?: string
          importance?: number | null
          markdown_text?: string
          page_number?: number | null
          summary?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dossiers_pages_dossier_id_fkey"
            columns: ["dossier_id"]
            isOneToOne: false
            referencedRelation: "dossiers"
            referencedColumns: ["id"]
          },
        ]
      }
      dossiers: {
        Row: {
          created_at: string
          created_by: string
          description: string
          id: string
          project_id: string
          storage_object_id: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string
          id?: string
          project_id: string
          storage_object_id: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string
          id?: string
          project_id?: string
          storage_object_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dossiers_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["id"]
          },
        ]
      }
      project: {
        Row: {
          actors: string[]
          created_at: string
          id: string
        }
        Insert: {
          actors: string[]
          created_at?: string
          id?: string
        }
        Update: {
          actors?: string[]
          created_at?: string
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      dossier_analysis_progress: {
        Row: {
          analyzed_pages: number | null
          archive_id: string | null
          missing_analysis_pages: number | null
          scanned_percentage: number | null
          total_pages: number | null
        }
        Relationships: [
          {
            foreignKeyName: "dossiers_pages_dossier_id_fkey"
            columns: ["archive_id"]
            isOneToOne: false
            referencedRelation: "dossiers"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string | null
          id: string | null
          raw_user_meta_data: Json | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string | null
          raw_user_meta_data?: Json | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string | null
          raw_user_meta_data?: Json | null
        }
        Relationships: []
      }
    }
    Functions: {
      background_tasks_service_url: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      match_archive_pages: {
        Args: { embedding: string; match_threshold: number }
        Returns: {
          actors_mentioned: Json | null
          annotations: Json | null
          created_at: string
          document_creation_timestamp: string | null
          document_creator: string | null
          document_type: string | null
          dossier_id: string
          embedding: string | null
          id: string
          importance: number | null
          markdown_text: string
          page_number: number | null
          summary: string | null
        }[]
      }
      supabase_url: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const

