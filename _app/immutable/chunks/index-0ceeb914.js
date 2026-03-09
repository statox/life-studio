const e=[{name:"Still",description:"No forces in the universe, everything is still",preferredInitialConfig:"uniform",attractionTable:{white:{white:0,red:0,green:0,blue:0},red:{white:0,red:0,green:0,blue:0},green:{white:0,red:0,green:0,blue:0},blue:{white:0,red:0,green:0,blue:0}},colorWeights:{white:500,red:500,green:500,blue:500},nbParticles:4e3,maxAttractionRadius:32,horizontalResolution:30,verticalResolution:20},{name:"Uniform repulsion",description:"This is a test universe with a simple all negative attraction table",preferredInitialConfig:"uniform",attractionTable:{white:{white:-1,red:-1,green:-1,blue:-1},red:{white:-1,red:-1,green:-1,blue:-1},green:{white:-1,red:-1,green:-1,blue:-1},blue:{white:-1,red:-1,green:-1,blue:-1}},colorWeights:{white:500,red:500,green:500,blue:500},nbParticles:1e3,maxAttractionRadius:32,horizontalResolution:30,verticalResolution:20},{name:"Central circle spread",description:`Cells neither attract or repulse each others. When initially placed in a circle they will just spread until none of them has a neighbor touching it.

This replicates the initial phase of the simulation where we try to avoid cells overlaping each other. At the beginning of the simulation we let a few frames running like this before we start applying the attraction table. This is to add some stability to the system.

The simulation stabilize in approximately 2700 frames (which is about 45 seconds at 60fps)`,preferredInitialConfig:"center",attractionTable:{white:{white:0,red:0,green:0,blue:0},red:{white:0,red:0,green:0,blue:0},green:{white:0,red:0,green:0,blue:0},blue:{white:0,red:0,green:0,blue:0}},colorWeights:{white:500,red:500,green:512,blue:518},nbParticles:4e3,maxAttractionRadius:32,horizontalResolution:30,verticalResolution:20},{name:"2 colors own attraction",description:`Red and White form groups of their color.

The universe stabilize quickly.

We can see some groups at the border moving which is probably the symptom of a wrapping bug`,preferredInitialConfig:"uniform",attractionTable:{white:{white:1,red:0,green:0,blue:0},red:{white:0,red:1,green:0,blue:0},green:{white:0,red:0,green:0,blue:0},blue:{white:0,red:0,green:0,blue:0}},colorWeights:{white:500,red:500,green:0,blue:0},nbParticles:4e3,maxAttractionRadius:32,horizontalResolution:30,verticalResolution:20},{name:"2 colors own repulsion",description:`Red and White repulse their color.

The universe stabilize quickly.

We can see some groups at the border moving which is probably the symptom of a wrapping bug`,preferredInitialConfig:"uniform",attractionTable:{white:{white:-1,red:0,green:0,blue:0},red:{white:0,red:-1,green:0,blue:0},green:{white:0,red:0,green:0,blue:0},blue:{white:0,red:0,green:0,blue:0}},colorWeights:{white:500,red:500,green:0,blue:0},nbParticles:4e3,maxAttractionRadius:32,horizontalResolution:30,verticalResolution:20},{name:"2 colors chase",description:`White is attracted to red which is repulsed by white.

We start seeing some chaotic motion, swarms of red are pushed by swarms of white.

Since the only attraction force has a corresponding repulsion force the system remains chaotic because we are creating constant energy and no equilibrium.`,preferredInitialConfig:"center",attractionTable:{white:{white:0,red:1,green:0,blue:0},red:{white:-1,red:0,green:0,blue:0},green:{white:0,red:0,green:0,blue:0},blue:{white:0,red:0,green:0,blue:0}},colorWeights:{white:500,red:500,green:0,blue:0},nbParticles:4e3,maxAttractionRadius:32,horizontalResolution:30,verticalResolution:20},{name:"2 colors chase - White attraction",description:`From the 2 colors chase make white attract white.

We quickly end up in groups of white which coagulated. Around them there is a border empty of cells caused by the repulsion of red.

The simulation takes a long time to stabilize completely because some isolated white cells keep being attracted by all the red cells around them but when they get close of a white group, the empty border because big enough so that the group attraction doesn't reach the isolated cell.

Eventually they still end up merging and the universe becomes stable.`,preferredInitialConfig:"center",attractionTable:{white:{white:1,red:1,green:0,blue:0},red:{white:-1,red:0,green:0,blue:0},green:{white:0,red:0,green:0,blue:0},blue:{white:0,red:0,green:0,blue:0}},colorWeights:{white:500,red:500,green:0,blue:0},nbParticles:2e3,maxAttractionRadius:32,horizontalResolution:30,verticalResolution:20},{name:"2 Colors - Vessels",description:`From the 2 colors chase add red self-attraction.

Suddenly we start to see some kind off dynamic cohesion. The red cells attract each other forming groups which attract groups of white cells chasing them.

But since there is no strong structures the vessels are fragile and approaching other vessels tends to create chaos which disperse them.

As time goes by vessels become bigger and more stable.

It seems the only thing which keeps them disassembling are the wrapping inaccuracies.`,preferredInitialConfig:"uniform",attractionTable:{white:{white:0,red:1,green:0,blue:0},red:{white:-1,red:1,green:0,blue:0},green:{white:0,red:0,green:0,blue:0},blue:{white:0,red:0,green:0,blue:0}},colorWeights:{white:500,red:500,green:0,blue:0},nbParticles:2e3,maxAttractionRadius:32,horizontalResolution:30,verticalResolution:20},{name:"2 Colors - Red self repulsion",description:`From 2 Colors Chase add red self repulsion.

The universe never stabilize. We don't see the waves of white chasing red anymore because red tends to spread more, which in turns also spreads white more.

Note that add white self repulsion of red gives a similar pattern`,preferredInitialConfig:"uniform",attractionTable:{white:{white:0,red:1,green:0,blue:0},red:{white:-1,red:-1,green:0,blue:0},green:{white:0,red:0,green:0,blue:0},blue:{white:0,red:0,green:0,blue:0}},colorWeights:{white:500,red:500,green:0,blue:0},nbParticles:4e3,maxAttractionRadius:32,horizontalResolution:30,verticalResolution:20},{name:"2 Colors - White self repulsion",description:`See "2 Colors - Red self repulsion"

TODO Document the differences more precisely. It seems to create a slightly more structured universe but I'm not sure why.`,preferredInitialConfig:"uniform",attractionTable:{white:{white:-1,red:1,green:0,blue:0},red:{white:-1,red:0,green:0,blue:0},green:{white:0,red:0,green:0,blue:0},blue:{white:0,red:0,green:0,blue:0}},colorWeights:{white:500,red:500,green:0,blue:0},nbParticles:4e3,maxAttractionRadius:32,horizontalResolution:30,verticalResolution:20},{name:"Cellular strips",description:`I'm not sure which analogy to use here.

Expands quickly into a stable universe with organic shapes of red-blue and white-green separated by empty strips.`,preferredInitialConfig:"center",attractionTable:{white:{white:0,red:-1,green:0,blue:0},red:{white:0,red:0,green:-1,blue:0},green:{white:0,red:0,green:0,blue:-1},blue:{white:-1,red:0,green:0,blue:0}},colorWeights:{white:495,red:500,green:495,blue:505},nbParticles:4e3,maxAttractionRadius:32,horizontalResolution:30,verticalResolution:20},{name:"Cellular strips 2",description:"It seems that the additional repulsions create thinner strips.",preferredInitialConfig:"center",attractionTable:{white:{white:0,red:-1,green:0,blue:-1},red:{white:-1,red:0,green:-1,blue:0},green:{white:0,red:-1,green:0,blue:-1},blue:{white:-1,red:0,green:-1,blue:0}},colorWeights:{white:495,red:500,green:495,blue:505},nbParticles:4e3,maxAttractionRadius:32,horizontalResolution:30,verticalResolution:20},{name:"Cellular strips 2",description:`Shifted the matrix of repulsion horizontally.

There is much more spread (Probably due to the lack of internal group cohesion) to the full universe and that makes much more and thinner paths`,preferredInitialConfig:"center",attractionTable:{white:{white:-1,red:0,green:-1,blue:0},red:{white:0,red:-1,green:0,blue:-1},green:{white:-1,red:0,green:-1,blue:0},blue:{white:0,red:-1,green:0,blue:-1}},colorWeights:{white:495,red:500,green:495,blue:505},nbParticles:4e3,maxAttractionRadius:32,horizontalResolution:30,verticalResolution:20}],t=()=>e;export{t as g};
