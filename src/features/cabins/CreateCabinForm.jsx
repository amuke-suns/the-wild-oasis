import { useForm } from "react-hook-form";
import Textarea from "../../ui/Textarea";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import FormRow from "../../ui/FormRow";
import { useCreateEditCabin as useCreateEditCabin } from "./useCreateEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
	const { id: editId, ...editValues } = cabinToEdit;
	const { isUploading, isEditSession, mutate } = useCreateEditCabin(editId);

	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: editValues,
	});
	const { errors } = formState;

	function onSubmit(data) {
		// when no initial image has been uploaded
		if (editValues.image === null) {
			mutate(
				{ ...data, image: data.image !== null ? data.image[0] : null },
				editId
			);
		} else {
			// check if image is still the already uploaded image on supabase
			const isImageUnchanged =
				typeof data.image === "string" || data.image instanceof String;

			mutate(
				{ ...data, image: isImageUnchanged ? data.image : data.image[0] },
				{
					onSuccess: () => {
						onCloseModal?.();
						reset();
					},
				},
				editId
			);
		}
	}

	function onError() {
		// console.log(errors);
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit, onError)}
			type={onCloseModal ? "modal" : "regular"}
		>
			<FormRow label="Cabin name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isUploading}
					{...register("name", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isUploading}
					{...register("maxCapacity", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Maximum capacity should be at least 1",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Regular price" error={errors?.regularPrice?.message}>
				<Input
					type="number"
					id="regularPrice"
					disabled={isUploading}
					{...register("regularPrice", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Price should be at least 1",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Discount" error={errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					disabled={isUploading}
					defaultValue={0}
					{...register("discount", {
						required: "This field is required",
						min: {
							value: 0,
							message: "Discount must be positive",
						},
						validate: (value) =>
							Number(value) < Number(getValues().regularPrice) ||
							"Discount must be less than regular price",
					})}
				/>
			</FormRow>

			<FormRow
				label="Description for website"
				error={errors?.description?.message}
			>
				<Textarea
					type="number"
					id="description"
					disabled={isUploading}
					defaultValue=""
					{...register("description", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="Cabin photo" error={errors?.image?.message}>
				<FileInput
					id="image"
					type="file"
					disabled={isUploading}
					accept="image/*"
					{...register("image", {
						required: isEditSession ? false : "This field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					variation="secondary"
					type="reset"
					onClick={() => onCloseModal?.()}
				>
					Cancel
				</Button>
				<Button disabled={isUploading}>
					{isEditSession ? "Edit cabin" : "Add cabin"}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
