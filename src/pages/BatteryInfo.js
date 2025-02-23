import BatteryChart from "../components/BatteryChart";
import BatteryLogs from "../components/BatteryLogs";
import RoughText from "../components/RoughBorderText";

export default function BatteryInfo() {
  const batteryData = [
    { label: "NAME", value: "Lithium ION battery" },
    { label: "MANUFACTURER", value: "NA" },
    { label: "SERIAL NUMBER", value: "NA" },
    { label: "CHEMISTRY", value: "Li Ion" },
    { label: "DESIGN CAPACITY", value: `2600mAh mWh`, color: "blue" },
    { label: "FULL CHARGE CAPACITY", value: `2600mAh mWh`, color: "red" },
    { label: "CYCLE COUNT", value: "1500" },
  ];

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-900 min-h-screen font-marker">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Battery Information Card */}
        <div className="md:w-1/2 bg-slate-800 rounded-xl shadow-xl border border-slate-700">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🔋</span>
              <div>
                <h2 className="text-2xl font-semibold text-white tracking-wider">
                  Battery Information
                </h2>
                <p className="text-slate-400 text-sm font-caveat tracking-wide">
                  Details about the installed battery
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              {batteryData.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b border-slate-700 py-3 group hover:bg-slate-700/50 rounded-lg px-2 transition-all duration-200"
                >
                  <span className="font-medium text-slate-300 group-hover:text-white tracking-wide">
                    {item.label}
                  </span>
                  {item.color ? (
                    <RoughText
                      text={item.value}
                      color={item.color}
                      className="text-white font-caveat text-lg"
                    />
                  ) : (
                    <span className="font-medium text-slate-200 font-caveat text-lg">
                      {item.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Battery Charts */}
        <div className="md:w-1/2">
          <BatteryChart />
        </div>
      </div>

      {/* Battery Logs Section */}
      <div className="w-full">
        <BatteryLogs />
      </div>
    </div>
  );
}