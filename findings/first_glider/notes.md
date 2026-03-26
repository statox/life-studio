# First glider

Commit: ac4270fd16
Page: Demo, so no parameter changed.
Step: "Slow equilibrium"
Universe: spatial repartition

```json

{
    "name": "spatial repartition",
    "description": "All colors repulse themselves but there is a white -> red -> green attraction chain.\n\nThis creates compact groups becoming still",
    "preferredInitialConfig": "uniform",
    "behavior": "converges",
    "structure": "patterns",
    "activeColors": 3,
    "convergenceSpeed": "slow",
    "energyLevel": "medium",
    "complexity": 1,
    "attractionTable": {
        "white": { "white": -1, "red": 1, "green": 0, "blue": 0 },
        "red": { "white": 0, "red": -1, "green": 1, "blue": 0 },
        "green": { "white": 1, "red": 0, "green": -1, "blue": 0 },
        "blue": { "white": 0, "red": 0, "green": 0, "blue": 0 }
    },
    "colorWeights": {
        "white": 500,
        "red": 500,
        "green": 500,
        "blue": 0
    },
    "nbParticles": 4000,
    "maxAttractionRadius": 32,
    "horizontalResolution": 30,
    "verticalResolution": 20,
    "friction": 0.5
},
```

Structure: 12 particles - 4 stages - 3 colors

Schema:

```
                            g

                            w
                g           r           g

                     w     g g      w

                g           r           g
```

Screenshot: ./Slow equilibrium_frame_12684_glider.png

Motion: Move bottom to top when oriented as shown on the previous schema

Sighing:
The structure was oriented SE and moved in a long diagonal before crashing into a larger structure.
In the video first_glider-2026-03-26_23.38.01.mkv (uploaded on my personal clipboard for now) the interesting part is between frames ~12500 and frame ~12900
