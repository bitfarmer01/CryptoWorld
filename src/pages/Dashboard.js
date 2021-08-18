import { Line } from "react-chartjs-2";
import "./Graphs.css";
function Dashboard({ price, data }) {
  const opts = {
    tooltips: {
      intersect: false,
      mode: "index"
    },
    responsive: true,
    maintainAspectRatio: false
  };
  if (price === "0.00") {
    return <h2>please select a currency pair</h2>;
  }
  return (
    <div className="graph_dashboard">
      <h2>{`$${price}`}</h2>

      <div className="graph_chart-container">
        <Line data={data} options={opts} />
      </div>
    </div>
  );
}

export default Dashboard;
