export async function getAbout() {
  const { data, error } = await supabase.rpc("get_about");

  if (error) throw error;

  return data;
}
