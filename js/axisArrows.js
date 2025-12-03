export const axisArrows = {
    id: 'axisArrows',
    afterDraw(chart, args, opts) {
        const {ctx, chartArea} = chart;
        const {left, right, top, bottom} = chartArea;

        ctx.save();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'black';

        // Ось X (горизонтальная линия + стрелка вправо)
        ctx.beginPath();
        ctx.moveTo(left, bottom);
        ctx.lineTo(right + 40, bottom); // чуть дальше области
        ctx.stroke();
        // стрелка на оси X
        ctx.beginPath();
        ctx.moveTo(right + 50, bottom);
        ctx.lineTo(right + 40, bottom - 5);
        ctx.lineTo(right + 40, bottom + 5);
        ctx.closePath();
        ctx.fill();

        // Подпись оси X
        ctx.font = '18px sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'top';
        ctx.fillText('x', right + 50, bottom + 10);

        // Ось Y (вертикальная линия + стрелка вверх)
        ctx.beginPath();
        ctx.moveTo(left, bottom + 1);
        ctx.lineTo(left, top - 30);
        ctx.stroke();
        // стрелка на оси Y
        ctx.beginPath();
        ctx.moveTo(left, top - 40);
        ctx.lineTo(left - 5, top - 30);
        ctx.lineTo(left + 5, top - 30);
        ctx.closePath();
        ctx.fill();

        // Подпись оси Y
        ctx.save();
        ctx.translate(left - 15, top - 35);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('y', 0, 0);
        ctx.restore();

        ctx.restore();
    }
};