import {axisArrows} from "./axisArrows.js";
import {axisAtZero} from "./axisZero.js";

const Chart = window.Chart;

const upper = [];
const base = [];
const step = 0.01;

for (let x = -1; x <= 1; x += step) {
    const y = Math.sqrt(1 - x * x);
    upper.push({ x, y });          // дуга
}

for (let x = 1; x >= -1; x -= step) {
    base.push({ x, y: 0 });        // ось x
}

const areaDataset = {
    label: "Область",
    type: "line",
    data: [...upper, ...base],     // замкнули контур
    borderColor: "purple",
    backgroundColor: "rgba(128,0,128,0.6)",
    fill: true,
    pointRadius: 0,
};

const arcDataset = {
    label: "Полукруг",
    type: "line",
    data: upper,
    borderColor: "black",
    borderWidth: 2,
    pointRadius: 0,
};


const ctx = document.getElementById("canvas");

new Chart(ctx, {
    type: "scatter",
    data: {
        datasets: [
            arcDataset,
            areaDataset,
            {
                label: "Точки",
                type: "scatter",
                data: [
                    {x: -1, y: 0},
                    {x: 0, y: 0},
                    {x: 1, y: 0},
                    {x: 0, y: 1},
                ],
                backgroundColor: "black",
                pointRadius: 4,
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {display: false},
        },
        layout: {
            padding: {left: 40, right: 40, top: 40, bottom: 40},
        },
        scales: {
            x: {
                type: "linear",
                min: -1.2,
                max: 1.2,
                position: {y: 0},      // ось x через y = 0
                ticks: {
                    stepSize: 0.5,
                    font: {size: 14},
                },
            },
            y: {
                type: "linear",
                min: -0.1,
                max: 1.2,
                position: {x: 0},      // ось y через x = 0
                ticks: {
                    stepSize: 0.5,
                    font: {size: 14},
                },
            },
        },
    },
    plugins: [axisArrows, axisAtZero],
});
