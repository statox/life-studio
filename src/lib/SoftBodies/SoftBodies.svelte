<script lang="ts">
    import type p5 from 'p5';
    import P5, { type Sketch } from 'p5-svelte';
    import { onDestroy } from 'svelte';

    type Point = {
        id: number;
        pos: { x: number; y: number };
        vel: { x: number; y: number };
        acc: { x: number; y: number };
        history: { x: number; y: number }[];
    };
    type Connection = {
        pointA: Point;
        pointB: Point;
        length: number;
    };

    const applyConnection = (connection: Connection) => {
        const { pointA, pointB, length } = connection;
        const { x: x1, y: y1 } = pointA.pos;
        const { x: x2, y: y2 } = pointB.pos;

        const d = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

        // Move pointA toward pointB to restrict the distance between them
        const m = (0.1 * (length - d)) / d;
        pointA.acc.x -= d === 0 ? 1 : (x2 - x1) * m;
        pointA.acc.y -= d === 0 ? 1 : (y2 - y1) * m;

        // Move pointB toward pointA to restrict the distance between them
        const m2 = (0.1 * (d - length)) / d;
        pointB.acc.x -= d === 0 ? 1 : (x2 - x1) * m2;
        pointB.acc.y -= d === 0 ? 1 : (y2 - y1) * m2;
    };

    const constrainToScreen = (point: Point) => {
        if (point.pos.x < 0) {
            point.pos.x = 1;
        }
        if (point.pos.x > _p5.width) {
            point.pos.x = _p5.width - 1;
        }
        if (point.pos.y < 0) {
            point.pos.y = 1;
        }
        if (point.pos.y > _p5.height) {
            point.pos.y = _p5.height - 1;
        }
    };

    const update = (points: Point[], connections: Connection[]) => {
        for (const point of points) {
            point.acc = { x: 0, y: 0 };
            // applyGravity(point);
        }
        for (const connection of connections) {
            applyConnection(connection);
        }
        for (const point of points) {
            point.vel.x += point.acc.x * 0.5;
            point.vel.y += point.acc.y * 0.5;

            point.pos.x += point.vel.x * 0.9;
            point.pos.y += point.vel.y * 0.9;
            constrainToScreen(point);

            point.history.push({ ...point.pos });
            if (point.history.length > 100) {
                point.history.shift();
            }
        }
    };

    let _p5: p5;
    let points: Point[] = [];
    let connections: Connection[] = [];
    const sketch: Sketch = (p5) => {
        p5.setup = () => {
            _p5 = p5;
            p5.createCanvas(500, 500);
            p5.noStroke();

            p5.fill(255);
            p5.noStroke();

            p5.frameRate(10);

            reset();
        };

        p5.draw = () => {
            p5.background(0);

            // Check if the mouse is in the canvas
            if (
                p5.mouseIsPressed &&
                p5.mouseX > 0 &&
                p5.mouseX < p5.width &&
                p5.mouseY > 0 &&
                p5.mouseY < p5.height
            ) {
                points[0].pos.x = p5.mouseX;
                points[0].pos.y = p5.mouseY;
            }

            update(points, connections);

            // for (const connection of connections) {
            //     const { pointA, pointB, length } = connection;
            //     const { x: x1, y: y1 } = pointA.pos;
            //     const { x: x2, y: y2 } = pointB.pos;

            //     const d = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

            //     if (d >= length) {
            //         const s = p5.map(d, length, 2 * length, 0, 1);
            //         const c = p5.lerpColor(p5.color('white'), p5.color('green'), s);
            //         p5.stroke(c);
            //     } else {
            //         const s = p5.map(d, length, 0, 0, 1);
            //         const c = p5.lerpColor(p5.color('white'), p5.color('red'), s);
            //         p5.stroke(c);
            //     }
            //     p5.line(x1, y1, x2, y2);
            // }

            for (let j = 0; j < points[0].history.length; j++) {
                for (let i = 0; i < points.length; i++) {
                    const point = points[i];
                    const c = [
                        [255, 0, 0],
                        [0, 255, 0],
                        [255, 255, 0]
                    ][i];
                    const normalizedJ = p5.map(j, 0, point.history.length, 0, 1);
                    const alpha = (1 - Math.exp(-normalizedJ)) * 255;
                    p5.fill([...c, alpha]);
                    p5.noStroke();
                    const p = point.history[j];
                    const size = (1 - Math.exp(-normalizedJ)) * 8;
                    p5.circle(p.x, p.y, size);
                }
            }
        };
    };

    const reset = () => {
        points = [];
        points.push({
            id: 1,
            // pos: { x: Math.random() * _p5.width, y: Math.random() * _p5.height },
            pos: { x: 250, y: 250 },
            vel: { x: 0, y: 0 },
            acc: { x: 0, y: 0 },
            history: []
        });
        points.push({
            id: 2,
            // pos: { x: Math.random() * _p5.width, y: Math.random() * _p5.height },
            pos: { x: 150, y: 250 },
            vel: { x: 0, y: 0 },
            acc: { x: 0, y: 0 },
            history: []
        });
        points.push({
            id: 2,
            // pos: { x: Math.random() * _p5.width, y: Math.random() * _p5.height },
            pos: { x: 350, y: 250 },
            vel: { x: 0, y: 0 },
            acc: { x: 0, y: 0 },
            history: []
        });

        connections = [];
        connections.push({ pointA: points[0], pointB: points[1], length: 100 });
        connections.push({ pointA: points[0], pointB: points[2], length: 100 });
        connections.push({ pointA: points[1], pointB: points[2], length: 100 });
    };

    onDestroy(() => _p5?.remove());
</script>

<P5 {sketch} />
<!-- button to call the reset function -->
<button on:click={reset}>Reset</button>
