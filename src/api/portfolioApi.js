import { supabase } from "../lib/supabaseClient";

export async function getProjectsList() {
  const { data, error } = await supabase.rpc("get_projects_list");

  if (error) throw error;

  return data;
}

export async function getProject(name) {
  const { data, error } = await supabase.rpc("get_project", { p_slug: name });

  if (error) throw error;

  return data;
}
