import supabase from "./supabase";

export async function signup(obj) {
  const { data, error } = await supabase.from("guests").insert([obj]).select();

  if (error) throw new Error(error.message);

  return data;
}

export async function getGuests() {
  let query = supabase.from("guests").select("*");

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return data;
}
