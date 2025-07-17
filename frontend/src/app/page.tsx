"use client";

import { useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const BASE_URL = "http://localhost:4000";

export default function Home() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  interface GraphDataItem {
    resultTime: string;
    availability: number;
  }
  const [graphData, setGraphData] = useState<GraphDataItem[]>([]);
  const [params, setParams] = useState({
    enodebId: "",
    cellId: "",
  });

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("files", file);

    try {
      await axios.post(`${BASE_URL}/raw-data/upload`, formData);
      setUploadStatus("Upload berhasil!");
    } catch (error: any) {
      setUploadStatus(
        "Upload gagal: " + error.response?.data?.message || error.message
      );
    }
  };

  const handleGraphFetch = async () => {
    if (!params.enodebId || !params.cellId) {
      alert("Semua field wajib diisi!");
      return;
    }

    try {
      const res = await axios.get(`${BASE_URL}/raw-data/graph`, {
        params,
      });
      setGraphData(res.data);
      if (res.data.length === 0) {
        alert("Tidak ada data untuk grafik ini");
      }
    } catch (err) {
      console.error(err);
      alert("Gagal mengambil data grafik");
    }
  };

  const chartData = {
    labels: graphData.map((d) => new Date(d.resultTime).toLocaleString()),
    datasets: [
      {
        label: "Availability (%)",
        data: graphData.map((d) => d.availability),
        borderColor: "#4F46E5",
        fill: false,
      },
    ],
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Upload CSV</h1>
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-2 border-2 border-gray-300 p-2 rounded me-2"
      />
      <button
        className={`bg-blue-600 text-white px-4 py-2 rounded ${
          !file ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={!file}
        onClick={handleUpload}
      >
        Upload
      </button>
      {uploadStatus && <p className="mt-2">{uploadStatus}</p>}

      <hr className="my-6" />

      <h2 className="text-lg font-semibold mb-2">Tampilkan Grafik</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="enodebId"
          className="border p-2"
          onChange={(e) =>
            setParams((p) => ({ ...p, enodebId: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="cellId"
          className="border p-2"
          onChange={(e) => setParams((p) => ({ ...p, cellId: e.target.value }))}
        />
      </div>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={handleGraphFetch}
      >
        Tampilkan Grafik
      </button>

      {graphData.length > 0 && (
        <div className="mt-6">
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
}
