export interface UserProfileData {
  id: string;
  display_name: string;
  email: string;
  avatar_url: string;
  created_at: string;
}

export interface AuthError {
  message: string;
  code?: string;
}

export type OAuthProvider = 'google' | 'facebook' | 'twitter' | 'snapchat' | 'discord';