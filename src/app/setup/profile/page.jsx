import SetupLayout from "@/app/components/SetupLayout";
import SetupHeader from "@/app/components/SetupHeader";
import Button from "@/app/components/Button";

export default function ProfilePage() {
	return (
		<SetupLayout>
            <SetupHeader />

			<div
				style={{ height: "50vh" }}
				className="flex items-end border-2 gap-4 pb-6    border-red-500"
			>
				<div className="max-w-xl w-full">
					<div className="mb-8">
						<label className="block text-lg font-semibold text-white mb-2">
							What do we call you ?
						</label>
						<input
							placeholder="John Doe"
							className="w-full bg-transparent border-b border-gray-400 py-3 text-lg text-white placeholder:text-white/60 outline-none"
						/>
					</div>
					<div className="">
						<label className="block text-lg font-semibold text-white mb-4">
							Where do you live ?
						</label>
						<div className="flex gap-4 flex-wrap">
							{["Select", "Type", "Block", "Room Number"].map((item) => (
								<span
									key={item}
									className="px-6 py-3 rounded-xl bg-green-900/60 text-white text-base font-medium shadow hover:bg-green-900/80 transition cursor-pointer"
								>
									h{item}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Button: 15vh, align top-left */}
			<div
				style={{ height: "20vh" }}
				className="flex items-start border-2 border-red-500"
			>
				<Button className="px-15 py-7 rounded-xl text-lg font-medium w-2/12">
					Next Step
				</Button>
			</div>
		</SetupLayout>
	);
}
