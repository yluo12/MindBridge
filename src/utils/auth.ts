import supabaseClient from './supabaseClient';
import { User, AuthResponse } from '@supabase/supabase-js';

// Sign up with Email and Password
export async function signUpWithEmail(
  email: string,
  password: string
): Promise<{ user: User | null; error: Error | null }> {
  const { data, error }: AuthResponse = await supabaseClient.auth.signUp({
    email,
    password,
  });
  return { user: data?.user ?? null, error };
}

// Sign in with Email and Password
export async function signInWithEmail(
  email: string,
  password: string
): Promise<{ user: User | null; error: Error | null }> {
  const { data, error }: AuthResponse = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });
  return { user: data?.user ?? null, error };
}

// Sign in with Google OAuth
export async function signInWithGoogle(): Promise<Error | null> {
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: 'google',
  });
  return error;
}

// Sign out user
export async function signOut(): Promise<void> {
  await supabaseClient.auth.signOut();
}