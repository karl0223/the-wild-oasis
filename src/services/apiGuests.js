import supabase from "./supabase";

export async function signup(obj) {
  const { data, error } = await supabase.from("guests").insert([obj]).select();

  if (error) throw new Error(error.message);

  return data;
}
