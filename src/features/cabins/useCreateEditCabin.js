import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateEditCabin(editId = null) {
	const queryClient = useQueryClient();

	const { isLoading: isUploading, mutate } = useMutation({
		mutationFn: (data) => createEditCabin(data, editId),
		onSuccess: () => {
			toast.success(`New cabin ${editId ? "edited" : "created"} successfully`);
			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return {
		isUploading,
		mutate,
		isEditSession: Boolean(editId),
	};
}
