import supabase, { supabaseUrl } from "./supabase";

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  ); // create a random number and append it to the image name to create a unique name

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // https://hyaqdqmcgpqzwadsztue.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg       -- example of imagePath

  // 1. Create a new cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }]) // insert the image path into the newCabin object
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created.");
  }

  // 2. Upload the image

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image); // upload the image to the storage bucket

  // 3. Delete the cabin if the image upload fails
  if (storageError) {
    console.error(storageError);
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Image could not be uploaded");
  }

  return data;
}

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("An error occurred while fetching cabins");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
