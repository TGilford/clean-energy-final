import React from "react";
import Layout from "./Layout";

export default function Dashboard() {
  return (
    <Layout>
      <section aria-labelledby="dashboard-heading" className="content">
        <h2 id="dashboard-heading">
          Sodium-ion batteries for grid-scale storage
        </h2>

        <p>
          In late 2025, sodium-ion batteries transitioned from a promising lab technology 
          to a practical grid cleaning tool. A multi-year agreement was inked between U.S. 
          storage startup Peak Energy and utility-scale developer Jupiter Power to supply up to 
          4.75 GWh of sodium-ion battery systems for implementation between 2027 and 2030. 
          The initial 720 MWh installation will be the biggest sodium-ion project yet announced, 
          establishing a grid-scale real-world test bed for this chemistry.Because sodium is more 
          readily available than lithium, sodium-ion batteries can reduce material prices and lessen 
          supply-chain strain. Recent calculations indicate that as production increases, sodium-ion 
          cell prices may eventually drop to roughly $40 per kilowatt-hour, undercutting many lithium-ion 
          systems.  Additionally, Peak's design aims for reduced degradation and a passive cooling 
          architecture that uses less auxiliary power by eliminating the need for compressors and pumps.  
          Together, these characteristics could increase the dependability and affordability of renewable
          energy sources like solar and wind power by storing extra energy and releasing it during periods
          of high demand.  This agreement indicates that sodium-ion batteries are entering the early stages
          of commercial commercialization and have the potential to emerge as a significant clean-energy 
          innovation for large-scale storage within the next ten years.
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

        <h3>Technical overview</h3>
        <p>
          This single-page React application is hosted on port 80 via a web server
          It communicates with a Python FastAPI backend on port 3000. The backend saves 
          chart configuration data in a MySQL database hosted on a remote service and 
          employs JWT for authentication. Before accessing the database to retrieve chart 
          data, JWTs are verified on every API request, and all dashboard, summary, and report routes are secured.
        </p>
      </section>
    </Layout>
  );
}
