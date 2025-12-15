export const axisArrows = {
    id: "axisArrows",
    afterDraw(chart) {
        const { ctx, chartArea, scales } = chart;
        const { left, right, top, bottom } = chartArea;

        const xZero = scales.x.getPixelForValue(0);
        const yZero = scales.y.getPixelForValue(0);

        ctx.save();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        ctx.fillStyle = "black";

        // ось X
        ctx.beginPath();
        ctx.moveTo(left, yZero);
        ctx.lineTo(right + 40, yZero);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(right + 50, yZero);
        ctx.lineTo(right + 40, yZero - 5);
        ctx.lineTo(right + 40, yZero + 5);
        ctx.closePath();
        ctx.fill();
        ctx.font = "18px sans-serif";
        ctx.textAlign = "right";
        ctx.textBaseline = "top";
        ctx.fillText("x", right + 50, yZero + 10);

        // ось Y
        ctx.beginPath();
        ctx.moveTo(xZero, bottom + 1);
        ctx.lineTo(xZero, top - 30);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(xZero, top - 40);
        ctx.lineTo(xZero - 5, top - 30);
        ctx.lineTo(xZero + 5, top - 30);
        ctx.closePath();
        ctx.fill();

        ctx.save();
        ctx.translate(xZero - 15, top - 35);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("i", 0, 0);
        ctx.restore();

        ctx.restore();
    }
};
