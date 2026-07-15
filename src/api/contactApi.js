import { supabase } from "../lib/supabaseClient";

export async function getContacts() {
  const { data, error } = await supabase.rpc("get_contacts");

  if (error) throw error;

  return data;
}
