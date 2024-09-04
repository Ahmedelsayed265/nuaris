import Chart from "react-apexcharts";

const options = {
  chart: {
    type: "bar",
    height: 120,
    stacked: false,
    toolbar: {
      show: true,
    },
    zoom: {
      enabled: true,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
      endingShape: "rounded",
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    categories: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  },
  fill: {
    opacity: 1,
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
    offsetX: -10,
  },
  colors: ["#006980", "#FFDA8B", "#0D0D0D", "#666B88"],
};

const series = [
  {
    name: "Yachts",
    data: [480, 380, 320, 500, 390, 450, 220, 170, 410, 380, 420, 420],
  },
  {
    name: "Add ones",
    data: [480, 380, 320, 500, 390, 450, 220, 170, 410, 380, 420, 420],
  },
  {
    name: "Activities",
    data: [480, 380, 320, 500, 390, 450, 220, 170, 410, 380, 420, 420],
  },
  {
    name: "Packages",
    data: [250, 150, 280, 390, 300, 500, 170, 250, 250, 370, 480, 360],
  },
];

function SupplyDemandChart() {
  return <Chart options={options} series={series} type="bar" width="100%" />;
}

export default SupplyDemandChart;
