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

export default function Summary() {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchChart("capacity_by_year")
      .then((res) => setChartData(res.data))
      .catch((err) => setError(err.message));
  }, []);

  const data =
    chartData?.points?.map((p) => ({
      year: p.year,
      value: p.value,
    })) || [];

  return (
    <Layout>
      <section aria-labelledby="summary-heading" className="content">
        <h2 id="summary-heading">
          Planned sodium-ion capacity from Peak–Jupiter deal
        </h2>

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

                {/* Sodium-ion capacity: solid green line */}
                <Line
                  type="monotone"
                  dataKey="value"
                  name="Capacity (GWh)"
                  stroke="#2ca02c"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <figcaption>{chartData.title}</figcaption>
          </figure>
        )}

        <p>
          A practical sodium-ion battery capacity deployment path under the Peak
          Energy–Jupiter Power agreement is depicted in this chart. By 2030, new
          projects will boost the total capacity to over 4.75 GWh, with the
          first tranche of about 0.72 GWh scheduled for 2027. In order to
          illustrate how grid-scale storage might expand over several project
          cycles rather than all at once, the year-by-year distribution is
          modeled from publicly disclosed totals and timing. As more sodium-ion
          systems come online, they will be able to firm variable solar and wind
          output more and more, shifting clean energy into high-demand periods
          and evening peaks.
        </p>

        <p>
          <strong>Source:</strong>{" "}
          <a
            href="https://www.utilitydive.com/news/peak-energy-jupiter-sodium-ion-batteries/805784/"
            target="_blank"
            rel="noopener noreferrer"
          >
            UtilityDive – Peak Energy deal marks progress for sodium-ion
            batteries
          </a>
          .
        </p>
      </section>
    </Layout>
  );
}
