import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Layout from "./Layout";
import { fetchChart } from "../api";

export default function Reports() {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchChart("cost_projection")
      .then((res) => setChartData(res.data))
      .catch((err) => setError(err.message));
  }, []);

  const data =
    chartData?.points?.map((p) => ({
      year: p.year,
      li_ion: p.li_ion,
      na_ion: p.na_ion,
    })) || [];

  return (
    <Layout>
      <section aria-labelledby="reports-heading" className="content">
        <h2 id="reports-heading">Indicative storage cost trajectory</h2>

        {error && (
          <div role="alert" className="error">
            {error}
          </div>
        )}

        {chartData && (
          <figure aria-label={chartData.title}>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />

                {/* Li-ion: solid blue line */}
                <Line
                  type="monotone"
                  dataKey="li_ion"
                  name="Li-ion ($/kWh)"
                  stroke="#1f77b4"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />

                {/* Na-ion: dashed red line */}
                <Line
                  type="monotone"
                  dataKey="na_ion"
                  name="Na-ion ($/kWh)"
                  stroke="#d62728"
                  strokeWidth={3}
                  strokeDasharray="6 4"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <figcaption>{chartData.title}</figcaption>
          </figure>
        )}

        <p>
          An illustrative cost trajectory for sodium-ion and lithium-ion grid
          storage is contrasted in this graph. While lithium-ion continues to
          decrease more slowly, the sodium-ion series shows analysis indicating
          that cell costs may trend toward about $40 per kWh as production
          scales. In order to emphasize the possible cost benefit of sodium-ion
          technology, exact values are simplified estimations.
        </p>

        <p>
          <strong>Source inspiration:</strong>{" "}
          sodium-ion cost projections reported in recent public analyses of
          grid-scale storage technologies.
        </p>
      </section>
    </Layout>
  );
}
