const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const stageLabel = document.getElementById("stageLabel");
const frameCounter = document.getElementById("frameCounter");
const stageCounter = document.getElementById("stageCounter");
const progressCounter = document.getElementById("progressCounter");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const speedSlider = document.getElementById("speedSlider");

const scale = 90;
const framesPerStage = 60;
const densityFactor = 0.2; // Плотность точек
const pointSize = 2.5; // размер точек

let frame = 0;
let isPlaying = true;
let speed = 0.5;

// =====================================================================
// HELPER FUNCTIONS
// =====================================================================

function complex(re, im = 0) {
    return { re, im };
}

function complexAdd(a, b) {
    return { re: a.re + b.re, im: a.im + b.im };
}

function complexSub(a, b) {
    return { re: a.re - b.re, im: a.im - b.im };
}

function complexMul(a, b) {
    return {
        re: a.re * b.re - a.im * b.im,
        im: a.re * b.im + a.im * b.re
    };
}

function complexDiv(a, b) {
    const denom = b.re * b.re + b.im * b.im;
    return {
        re: (a.re * b.re + a.im * b.im) / denom,
        im: (a.im * b.re - a.re * b.im) / denom
    };
}

function complexExp(z) {
    const e = Math.exp(z.re);
    return {
        re: e * Math.cos(z.im),
        im: e * Math.sin(z.im)
    };
}

function lerp(a, b, t) {
    return {
        re: a.re * (1 - t) + b.re * t,
        im: a.im * (1 - t) + b.im * t
    };
}

// =====================================================================
// GENERATION OF D1 POINTS
// =====================================================================

function generateD1Points() {
    const points = [];

    // Верхний полукруг (граница)
    const numBoundary = Math.floor(200 * densityFactor);
    for (let i = 0; i <= numBoundary; i++) {
        const theta = (i / numBoundary) * Math.PI;
        points.push({
            re: Math.cos(theta),
            im: Math.sin(theta)
        });
    }

    // Диаметр
    const numDiameter = Math.floor(100 * densityFactor);
    for (let i = 1; i < numDiameter; i++) {
        const r = (i / numDiameter) * 2 - 1;
        points.push({
            re: r,
            im: 0
        });
    }

    // Радиусы (лучи от центра)
    const numRadii = 8;
    const numRadial = Math.floor(50 * densityFactor);
    for (let radIdx = 0; radIdx < numRadii; radIdx++) {
        const theta = (radIdx / numRadii) * Math.PI;
        for (let i = 1; i < numRadial; i++) {
            const r = i / numRadial;
            points.push({
                re: r * Math.cos(theta),
                im: r * Math.sin(theta)
            });
        }
    }

    // Концентрические дуги
    const numArcs = 5;
    const numArcPoints = Math.floor(100 * densityFactor);
    for (let arcIdx = 0; arcIdx < numArcs; arcIdx++) {
        const r = (arcIdx + 1) / (numArcs + 1);
        for (let i = 0; i <= numArcPoints; i++) {
            const theta = (i / numArcPoints) * Math.PI;
            points.push({
                re: r * Math.cos(theta),
                im: r * Math.sin(theta)
            });
        }
    }

    return points;
}

// =====================================================================
// THREE STAGES OF TRANSFORMATION
// =====================================================================


function stage1(z) {
    // ζ = (1+z)/(1-z)  -> первая четверть
    const numerator = complexAdd(complex(1, 0), z);
    const denominator = complexSub(complex(1, 0), z);
    return complexDiv(numerator, denominator);
}

function stage2(zeta) {
    // w = e^(iπ/4) * ζ  -> поворот на π/4
    const rotation = complexExp(complex(0, Math.PI / 4));
    return complexMul(rotation, zeta);
}

// =====================================================================
// DRAWING
// =====================================================================

function draw(points, stage) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.translate(canvas.width / 2, canvas.height / 2);

    // Сетка
    drawGrid();

    // Оси
    drawAxes();

    // Точки
    ctx.fillStyle = "#8c00ff";
    points.forEach(p => {
        const x = p.re * scale;
        const y = -p.im * scale;
        ctx.fillRect(x - pointSize / 2, y - pointSize / 2, pointSize, pointSize);
    });

    // Границы области
    if (stage === 1) {
        drawD1Boundary();
    } else if (stage === 2) {
        drawD2Boundary();
    }
}

function drawGrid() {
    ctx.strokeStyle = "rgba(100, 100, 100, 0.2)";
    ctx.lineWidth = 0.5;

    for (let x = -2; x <= 2; x += 0.5) {
        ctx.beginPath();
        ctx.moveTo(x * scale, -3 * scale);
        ctx.lineTo(x * scale, 3 * scale);
        ctx.stroke();
    }

    for (let y = -3; y <= 3; y += 0.5) {
        ctx.beginPath();
        ctx.moveTo(-2 * scale, -y * scale);
        ctx.lineTo(2 * scale, -y * scale);
        ctx.stroke();
    }
}

function drawAxes() {
    ctx.strokeStyle = "#666";
    ctx.lineWidth = 1;

    // X-axis
    ctx.beginPath();
    ctx.moveTo(-2 * scale, 0);
    ctx.lineTo(2 * scale, 0);
    ctx.stroke();

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(0, -3 * scale);
    ctx.lineTo(0, 3 * scale);
    ctx.stroke();

    // Тики
    ctx.fillStyle = "#999";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    for (let i = -2; i <= 2; i++) {
        if (i !== 0) {
            ctx.fillText(i.toString(), i * scale, 10);
        }
    }
}

function drawD1Boundary() {
    ctx.strokeStyle = "rgba(255, 255, 255, 1)";
    ctx.lineWidth = 3;

    // Полукруг
    ctx.beginPath();
    ctx.arc(0, 0, scale, 0, Math.PI, true);
    ctx.stroke();

    // Диаметр
    ctx.beginPath();
    ctx.moveTo(-scale, 0);
    ctx.lineTo(scale, 0);
    ctx.stroke();
}

function drawD2Boundary() {
    ctx.strokeStyle = "rgba(255, 255, 255, 1)";
    ctx.lineWidth = 2;

    // Два луча
    const angle1 = Math.PI / 4;
    const angle2 = (3 * Math.PI) / 4;
    const rayLen = 3 * scale;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(rayLen * Math.cos(angle1), -rayLen * Math.sin(angle1));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(rayLen * Math.cos(angle2), -rayLen * Math.sin(angle2));
    ctx.stroke();
}

// =====================================================================
// ANIMATION LOOP
// =====================================================================

function animate() {
    let stageIndex = Math.floor(frame / framesPerStage);
    const t = (frame % framesPerStage) / framesPerStage;
    const progress = Math.round(t * 100);

    let from, to;
    let stageName;

    if (stageIndex === 0) {
        from = D1;
        to = Z1;
        stageName = "Stage 1: Möbius Transform ζ = i(1+z)/(1-z)";
    } else if (stageIndex === 1) {
        from = Z1;
        to = Z2;
        stageName = "Stage 2: Square Root η = √ζ";
    } else {
        frame = 0;
        stageIndex = 0;
        from = D1;
        to = Z1;
        stageName = "Stage 1: Möbius Transform ζ = i(1+z)/(1-z)";
    }

    const current = from.map((p, i) => lerp(p, to[i], t));
    draw(current, stageIndex + 1);

    // Update labels
    stageLabel.textContent = stageName;
    frameCounter.textContent = Math.round(frame).toString();
    stageCounter.textContent = (stageIndex + 1).toString();
    progressCounter.textContent = progress + "%";

    if (isPlaying) {
        frame += speed;
    }

    requestAnimationFrame(animate);
}

// =====================================================================
// PRE-COMPUTE ALL STAGES
// =====================================================================

const D1 = generateD1Points();
const Z1 = D1.map(stage1);
const Z2 = Z1.map(stage2);

// =====================================================================
// CONTROLS
// =====================================================================

playBtn.addEventListener("click", () => {
    isPlaying = true;
});

pauseBtn.addEventListener("click", () => {
    isPlaying = false;
});

resetBtn.addEventListener("click", () => {
    frame = 0;
    isPlaying = true;
});

speedSlider.addEventListener("input", (e) => {
    speed = parseFloat(e.target.value);
});

// Start animation
animate();