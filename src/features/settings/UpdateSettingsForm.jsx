import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
	const { isLoading, settings = {} } = useSettings();

	const { updateSetting, isUpdating } = useUpdateSetting();

	function handleUpdate(event) {
		const { name, value } = event.target;

		if (!value || settings[name] === Number(value)) return;

		updateSetting({
			[name]: value,
		});
	}

	if (isLoading) return <Spinner />;

	return (
		<Form>
			<FormRow label="Minimum nights/booking">
				<Input
					type="number"
					id="min-nights"
					name="minBookingLength"
					defaultValue={settings.minBookingLength}
					disabled={isUpdating}
					onBlur={handleUpdate}
				/>
			</FormRow>

			<FormRow label="Maximum nights/booking">
				<Input
					type="number"
					id="max-nights"
					name="maxBookingLength"
					defaultValue={settings.maxBookingLength}
					disabled={isUpdating}
					onBlur={handleUpdate}
				/>
			</FormRow>

			<FormRow label="Maximum guests/booking">
				<Input
					type="number"
					id="max-guests"
					name="maxGuestsPerBooking"
					defaultValue={settings.maxGuestsPerBooking}
					disabled={isUpdating}
					onBlur={handleUpdate}
				/>
			</FormRow>

			<FormRow label="Breakfast price">
				<Input
					type="number"
					id="breakfast-price"
					name="breakfastPrice"
					defaultValue={settings.breakfastPrice}
					disabled={isUpdating}
					onBlur={handleUpdate}
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
