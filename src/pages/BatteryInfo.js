import BatteryChart from "../components/BatteryChart";
import RoughText from "../components/RoughBorderText";

export default function BatteryInfo() {
  return (
    <div className="flex flex-col md:flex-row p-6 bg-gray-100 min-h-screen font-handwritten">
      {/* Battery Information */}
      <div className="md:w-1/2 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold flex items-center">
          🔋 Battery Information
        </h2>
        <p className="text-gray-500">Details about the installed battery</p>
        <div className="mt-4 space-y-2">
  {[
    { label: "NAME", value: "" },
    { label: "MANUFACTURER", value: "" },
    { label: "SERIAL NUMBER", value: "" },
    { label: "CHEMISTRY", value: "" },
    { label: "DESIGN CAPACITY", value: `mWh`, color: "blue" },
    { label: "FULL CHARGE CAPACITY", value: `mWh`, color: "red" },
    { label: "CYCLE COUNT", value: "" },
  ].map((item, index) => (
    <div key={index} className="flex justify-between border-b py-2">
      <span className="font-semibold text-gray-700">{item.label}</span>
      {item.color ? (
        <RoughText text={item.value} color={item.color} />
      ) : (
        <span className="font-medium text-gray-800">{item.value}</span>
      )}
    </div>
  ))}
</div>
      </div>

      {/* Battery Capacity History */}
      <div className="md:w-1/2 bg-white p-6 mt-4 md:mt-0 md:ml-4 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold">Battery Capacity History</h2>
        <p className="text-gray-500">Charge capacity history of the system’s batteries</p>
        <div className="mt-4">
          <BatteryChart />
        </div>
      </div>
    </div>
  );
}