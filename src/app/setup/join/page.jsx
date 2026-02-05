import SetupLayout from "@/app/components/SetupLayout";
import SetupHeader from "@/app/components/SetupHeader";
import CustomButton from "@/app/components/CustomButton";

export default function JoinPage() {
	return (
		<SetupLayout>
			<SetupHeader />
			<div
				style={{ height: "50vh" }}
				className="flex items-end border-2 gap-4 pb-6    border-red-500"
			></div>

			{/* Button: 15vh, align top-left */}
			<div
				style={{ height: "20vh" }}
				className="flex items-start border-2 border-red-500"
			>
				<CustomButton className="px-15 py-7 rounded-xl text-lg font-medium w-2/12">
					Next Step
				</CustomButton>
			</div>
		</SetupLayout>
	);
}
