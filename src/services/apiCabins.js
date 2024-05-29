import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
	const { data, error } = await supabase.from("cabins").select("*");

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be loaded");
	}

	return data;
}

export async function deleteCabin(id) {
	const { data, error } = await supabase.from("cabins").delete().eq("id", id);

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be loaded");
	}

	return data;
}

export async function createEditCabin(cabin, id = null) {
	const newCabin = { ...cabin };
	const { image: newImage } = newCabin;

	// image - String, null, new File
	let imageName = null,
		imagePath = null;

	if (!newImage) {
		delete newCabin.image;
	} else if (typeof newImage === "string" || newImage instanceof String) {
		imagePath = newImage;
	} else {
		imageName = `${Math.random()}-${newImage.name}`.replaceAll("/", "");
		imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
	}

	const { data, error } = id
		? await supabase
				.from("cabins")
				.update({ ...newCabin, image: imagePath })
				.eq("id", id)
				.select()
				.single()
		: await supabase
				.from("cabins")
				.insert([{ ...newCabin, image: imagePath }])
				.select()
				.single();

	// upload the image to the bucket
	if (imageName !== null) {
		const { error: storageError } = await supabase.storage
			.from("cabin-images")
			.upload(imageName, newCabin.image);

		// if upload error occurs, remove the cabin
		if (storageError) {
			await supabase.from("cabins").delete().eq("id", data.id);
			console.error(storageError);
			throw new Error(
				"Cabin image could not be uploaded and the cabin was not created"
			);
		}
	}

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be created");
	}

	return data;
}
