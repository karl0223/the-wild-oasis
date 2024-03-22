import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

export async function signup(obj) {
  const { data, error } = await supabase.from("guests").insert([obj]).select();

  if (error) throw new Error(error.message);

  return data;
}

export async function getGuests({ filter, sortBy, page }) {
  let query = supabase.from("guests").select("*", {
    count: "exact",
  });

  // FILTER
  if (filter) {
    query = query[filter.method || "ilike"](filter.field, `%${filter.value}%`);
  }

  // SORT
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  // PAGINATION
  if (page) {
    const from = (page - 1) * PAGE_SIZE; // calculate the start index of the page
    const to = from + PAGE_SIZE - 1; // calculate the end index of the page
    query = query.range(from, to); // get the number of rows from the start index to the end index
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Guests could not be loaded.");
  }

  return { data, count };
}
