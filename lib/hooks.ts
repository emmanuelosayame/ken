"use client";

import { supabase } from "@/server/supabase";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    return data.subscription.unsubscribe;
  }, []);

  return session;
};
