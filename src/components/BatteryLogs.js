import { useEffect, useState, useRef } from "react";
import { collection, addDoc, query, orderBy, limit, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { database, firestore } from "../firebase";
import { ref, onValue } from "firebase/database";

const BatteryLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const lastDataRef = useRef(null); // Persist last known data

  const storeBatteryLog = async (batteryData) => {
    try {
      const logData = {
        timestamp: new Date(),
        charge: batteryData.charge,
        current: batteryData.current,
        discharge: batteryData.discharge,
        voltage: batteryData.voltage
      };

      await addDoc(collection(firestore, "batteryLogs"), logData);
    } catch (error) {
      console.error("Error storing log:", error);
    }
  };

const formatTimestamp = (timestamp) => {
    return timestamp.toLocaleTimeString("en-US", { hour12: false });
  };

  useEffect(() => {
    const batteryRef = ref(database, "battery");
    let interval;
    interval = setInterval(() => {
    onValue(batteryRef, (snapshot) => {
      const data = snapshot.val();
      if (
        data &&
        (!lastDataRef.current ||
          data.charge !== lastDataRef.current.charge ||
          data.current !== lastDataRef.current.current ||
          data.discharge !== lastDataRef.current.discharge ||
          data.voltage !== lastDataRef.current.voltage)
      ) {
        lastDataRef.current = data; // Update last known data
        storeBatteryLog(data);
      }
    }, 20000);
    });

    const logsQuery = query(
      collection(firestore, "batteryLogs"),
      orderBy("timestamp", "desc"),
      limit(5) // Show only 5 latest logs
    );

    const unsubscribe = onSnapshot(logsQuery, (snapshot) => {
      const newLogs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate(),
      }));
      setLogs(newLogs);
      setLoading(false);
    });

    return () => {
        clearInterval(interval);
        unsubscribe();
      };
  }, []);

  const deleteLog = async (id) => {
    try {
      await deleteDoc(doc(firestore, "batteryLogs", id));
    } catch (error) {
      console.error("Error deleting log:", error);
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-marker text-white tracking-wider">Battery History Logs</h2>
        <span className="text-slate-400 font-caveat">Updates only on value change</span>
      </div>

      {loading ? (
        <div className="text-center text-slate-400 py-8 font-marker">Loading logs...</div>
      ) : (
        <div className="overflow-auto max-h-96">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
              <th className="p-3 text-left text-white font-marker">Time</th>
                <th className="p-3 text-left text-white font-marker">Charge</th>
                <th className="p-3 text-right text-white font-marker">Current</th>
                <th className="p-3 text-right text-white font-marker">Discharge</th>
                <th className="p-3 text-right text-white font-marker">Voltage</th>
                <th className="p-3 text-right text-white font-marker">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-700/50 transition-colors">
                     <td className="p-3 text-slate-300 font-caveat">
                    {formatTimestamp(log.timestamp, "HH:mm:ss")}
                  </td>
                  <td className="p-3 text-slate-300 font-caveat">{log.charge}%</td>
                  <td className="p-3 text-right text-slate-300 font-caveat">{log.current}A</td>
                  <td className="p-3 text-right text-slate-300 font-caveat">{log.discharge}W</td>
                  <td className="p-3 text-right text-slate-300 font-caveat">{log.voltage}V</td>
                  <td className="p-3 text-right">
                    <button onClick={() => deleteLog(log.id)} className="text-red-500 hover:text-red-700 font-bold">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BatteryLogs;