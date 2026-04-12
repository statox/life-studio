import{a as V,f as U,c as ut,t as be}from"../chunks/Bv8eSc2G.js";import{i as xe}from"../chunks/Bx9fPhU8.js";import{as as h,aq as ce,ar as ee,at as O,au as K,aH as ve,p as oe,a as re,ab as Q,u as w,av as le,aa as de,ax as $e,ay as Xe}from"../chunks/BXQTrBbb.js";import{T as Ne,a as je,b as we,c as _e}from"../chunks/CmEGFO4Z.js";import{s as L,r as Le}from"../chunks/fXYcjCYz.js";import{b as F}from"../chunks/y9rpFuIy.js";import{_ as he}from"../chunks/CmsKOCeN.js";import{a as se,o as pe}from"../chunks/B-DfUvdC.js";import{s as ae}from"../chunks/D2GJRcva.js";import{d as ue,a as Y,e as me}from"../chunks/ymcTNaBl.js";import{s as Re,b as Te}from"../chunks/B0MZupaL.js";import{i as Pe}from"../chunks/BsuiGJbp.js";import{P as ge}from"../chunks/C29Rg4vQ.js";import{R as ye}from"../chunks/CRqdw40p.js";import{e as Ce,i as ze}from"../chunks/CsRGmMdf.js";import{b as Fe}from"../chunks/CLKxd0E7.js";import{p as ft}from"../chunks/BuN6g5Oy.js";function Ze(t){return function(...o){var e=o[0];return e.preventDefault(),t?.apply(this,o)}}var mt=U(`<h1>Gray-Scott model for Reaction-Diffusion systems</h1> <p>This page contains my experiementations aroud <a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Reaction%E2%80%93diffusion_system">reaction-diffusion systems</a>.</p> <p>The system I am considering is a mathematical model of a physical system in which two chemical
    substances react with each other while also diffusing in the environment. The simulation allows
    to compute the concentration of these chemical on a virtual grid and visualize these
    concentrations over time. This representation shows how the reactions create various pattern
    with different properties.</p> <p>The main parameters for the simulation are the <code>f</code> and <code>k</code> variables. They
    correspond to the <code>f</code> and <code>k</code> parameters found in the litterature (<a target="_blank" rel="noopener noreferrer" href="https://www.mrob.com/pub/comp/xmorphia/index.html#formula">[1]</a>, <a target="_blank" rel="noopener noreferrer" href="https://karlsims.com/rd.html">[2]</a>). I
    chose to constrain these parameters to the following intervals <code>f: [0, 0.12]</code> <code>k: [0.03, 0.07]</code> which is a slighty larger parameters space than the <a target="_blank" rel="noopener noreferrer" href="https://mrob.com/pub/comp/xmorphia/uskate-world.html">uskate world</a> characterized by Robert Munafo.</p> <p>The next sections explain more about these parameters, for now if you don't know what they are
    just keep in mind that varying <code>f</code> and <code>k</code> make the simulation generate different
    kinds of patterns.</p> <p>The application contains 4 tabs you can explore.</p> <h3>Manual</h3> <p>This is an interactive view of the model.</p> <p>The menu on the left allows the user to change the <code>f</code> and <code>k</code> parameters of
    the simulation and see how they influence the reaction. It is also possible to select a preset with
    the drop down menu.</p> <img alt="fkselector" style="width: 20vw"/> <p>In the center screen the user can drop some amout of solution by moving the mouse around and
    clicking the left mouse button, the solution can also be removed with the right mouse button.
    The user can also zoom in the simulation by holding the <code>Ctrl</code> button and scrolling with
    the mouse wheel (note that there is a bug in the zoom mecanism which move the simulation around when
    zooming in/out).</p> <img alt="interface" style="width: 20vw"/> <p>Finally the menu on the right allows the user to tweak various parameters like the color scheme
    used, the speed of the simulation (which you might want to adjust proportionally to <code>f</code>), the initial conditions, the pen setting to add or remove the solution, etc...</p> <img alt="settings" style="width: 20vw"/> <p>Unlike the Auto tab, this simulation lets the user tweak the parameters as they want. This is a
    good tool to understand how each parameter impacts the simulation. A few tips to get interesting
    patterns:</p> <ul><li>Don't change the <code>f</code> and <code>k</code> values too quickly, abrupt changes tend to
        stabilize the system very quickly.</li> <li>If the simulation stabilize completely either use the mouse to add new chemical, hit <code>r</code> to reset the world or move <code>fk</code> around.</li> <li>In the selection menu on the left the orange area of the parameters map is the area which
        tends to produce more patterns. By moving around you'll find that there are a few different
        areas: the bottom left tends to produce largely chaotic patterns, a little bit higher and on
        the right we find patterns ressembling cells divisions, higher up are worms on the left and
        dots on the right with different characteristics as we go higher on the <code>f</code> axis. On
        his website Robert Munafo represents these areas like this:</li></ul> <img alt="pearsons-parameter-space1.jpg" style="width: 20vw"/> <img alt="pearsons-parameter-space2.png" style="width: 20vw"/> <p>You can try to find many different patterns like the following:</p> <img alt="pattern5" style="width: 20vw"/> <img alt="pattern4" style="width: 20vw"/> <img alt="pattern1" style="width: 20vw"/> <img alt="pattern2" style="width: 20vw"/> <img alt="pattern3" style="width: 20vw"/> <h3>Auto</h3> <p>This is my "artistic" stake at this simulation. My goal was to explore infinite simulation. I
    wanted to have a screen which would be infinitely smoothly evolving.</p> <p>The <code>f</code> and <code>k</code> parameters are contiually changing to automatically generate
    different kinds of patterns. A mecanism also regularly regenerates some amount of solution so that
    there is as few stable states as possible. The user doesn't have to do anything, just load the tab
    and watch funny colors move on the screen.</p> <p>You can use the menu on the left to tweak how fast the <code>f</code> and <code>k</code> parameters change and how much they change at each step. In this tab the <code>fk</code> parameters
    are bound to the white polygon as this is the area with the most interesting parameters classes.</p> <img alt="fkrandomizer.gif" style="width: 20vw"/> <p>There are several configurations to try out and which give various results:</p> <ul><li>Increasing the change magnitude impacts the stability of the system. Small change magnitudes
        keeps <code>f</code> and <code>k</code> in a smaller area so the diversity of patterns generated
        is reduced, on the other hand larger magnitudes will create larger changes in the parameters space
        so it might create situations where the one of the chemical reacts with all of the other leaving
        a uniform colored texture.</li> <li>Increasing the change rate update the parameters more often which might give more time for
        configurations to stabilize and display all of their features.</li></ul> <h3>Parameters map</h3> <p>I used this tab to generate the parameters map used in the parameters selection menu. Here the
    difference with the other tabs is that the <code>f</code> and <code>k</code> parameters are not uniform
    accross the grid, they vary accross the screen to show the different possible patterns.</p> <p>At the top of the page there is an input allowing to change the size of the underlying
    simulation. Increasing this parameter increases the definition of the simulation and gives a
    more detailled parameter map, naturally that also increases the load on the GPU runing the
    simulation. By default this setting is set lower than what I used to generate the final
    parameter map. To generate the parameters map in the <code>fk</code> selector of the other tabs I
    used a world size of 12 (which makes a texture of 4096x4096 pixels) and the simulation ran for ~140.000
    iterations. I was curious to see what would happen with more iterations but it turns out the evolution
    is not significant after the first hundred thousands iterations:</p> <img alt="parameters_map_timelapse_0" style="width: 20vw"/> <img alt="parameters_map_timelapse_1" style="width: 20vw"/> <img alt="parameters_map_timelapse_2" style="width: 20vw"/> <img alt="parameters_map_timelapse_3" style="width: 20vw"/> <img alt="parameters_map_timelapse_4" style="width: 20vw"/> <h3>Previous versions</h3> <p>It took me several iterations to get the results shown in the other tabs. This tab regroups my
    different iterations and a section later in this page describes the different versions.</p> <h2>Gray-Scott model</h2> <p>The Gray-Scott model is a simulation of two chemicals reacting together. Here the chemicals are
    named U and V.</p> <p>The environement is represented with a 2D grid in which each pixel holds a level of
    concentration of each chemical. The simulation consist in updating the grid following these
    equations (picture taken <a target="_blank" rel="noopener noreferrer" href="https://groups.csail.mit.edu/mac/projects/amorphous/GrayScott/">here</a>):</p> <img alt="gray scott equations" style="width: 20vw"/> <p>The chemical reaction section shows that when 1 unit of U and 2 units of V are in contact they
    react to become 3 units of V. The second part showing that V produces P is not really considered
    in the implementation, P only represents a byproduct of the reaction which is necessary for the
    math to work but doesn't really impacts the simulation <em>(at least to the extent of my understanding)</em>.</p> <p>The equations show 3 things:</p> <ul><li>Both chemicals diffuse over time and the diffusion from one spot depends on the
        concentration of the chemical in the surrounding spots</li> <li>The chemicals react together and that impacts their concentration (which makes sense if 1 U
        and 2 V create 3 V then during the reaction the concentration of U diminishes and the
        concentration of P increases)</li> <li><code>f</code> and <code>k</code> are respectively a "feed rate" at which we add some U and a
        "kill rate" at we we remove some V. This allows the model to keep evolving.</li></ul> <p><a target="_blank" rel="noopener noreferrer" href="https://karlsims.com/rd.html">Karlsims</a> has the clearest explaination of these equations.<br/> <a target="_blank" rel="noopener noreferrer" href="https://www.mrob.com/pub/comp/xmorphia/index.html#formula">mrob</a> also has a good explanation.</p> <p>The way that I represents this system in my mind is as follow:</p> <ul><li>Let's have two tanks containing the solutions one on top of the other.</li> <li>Both tanks are separated by a semi porous membrane which only allow the U solution from the
        bottom to go the tank above containing V.</li> <li>What we see in my simulation is the surface of the top tank while the U solution is slowly
        introduced to the V and both react together.</li></ul> <h2>Turing patterns</h2> <p>The reason why this model is so fascinating is because it gives us a glance at how ordered
    patterns can emerge from the randomness of nature. This is related to a concept which was
    theorized in 1952 by Alan Turing and is named <a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Turing_pattern">Turing patterns</a></p> <p>This is hard to reproduce exact existing patterns because nature is complex whereas this model
    is quite simple but here are a few similarities I have found:</p> <p>This are two <a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Madrepora">madrepora corals</a> I took in picture at <a target="_blank" rel="noopener noreferrer" href="https://fr.wikipedia.org/wiki/Grande_galerie_de_l%27%C3%89volution">La Grande galerie de l'Évolution</a> in Paris:</p> <img alt="madrepore_museum_spots.JPEG" style="width: 20vw"/> <img alt="madrepore_simulation_spots.png" style="width: 20vw"/> <img alt="madrepore_museum_stripes.png" style="width: 20vw"/> <img alt="madrepore_simulation_stripes1.png" style="width: 20vw"/> <img alt="madrepore_simulation_stripes2.png" style="width: 20vw"/> <p>This is a puffer fish picture from wikipedia (<a target="_blank" rel="noopener noreferrer" href="https://commons.wikimedia.org/wiki/File:Giant_Puffer_fish_skin_pattern.JPG">[1]</a> <a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/File:Giant_Pufferfish_skin_pattern_detail.jpg">[2]</a>)</p> <img alt="800px-Giant_Puffer_fish_skin_pattern.JPG" style="width: 20vw"/> <img alt="Giant_Pufferfish_skin_pattern_detail.jpg" style="width: 20vw"/> <img alt="tbd_simulation_stripes.png" style="width: 20vw"/> <img alt="tbd_simulation_stripes_spots.png" style="width: 20vw"/> <p>Here are some behavior ressembling to cells mitosis:</p> <img alt="cells_division.gif" style="width: 20vw"/> <img alt="cells_division2.gif" style="width: 20vw"/> <p>A fish <a target="_blank" rel="noopener noreferrer" href="https://www.shutterstock.com/image-photo/goldspotted-rabbitfish-siganus-punctatus-bali-521298034">from shutterstock</a> not sure which specy this is:</p> <img alt="fish_spots.jpg" style="width: 20vw"/> <img alt="tbd_simulation_regular_spots.png" style="width: 20vw"/> <h2>Resources</h2> <p>Here are some resources which I found useful while making this project.</p> <h3>Gray-Scott model</h3> <ul><li>Karlsims tutorial about Reaction-diffusion, very good introduction and good explanation of
        the formula<br/> <a target="_blank" rel="noopener noreferrer" href="https://karlsims.com/rd.html">https://karlsims.com/rd.html</a></li> <li>Mrob list of a lot of interesting parameter classes<br/> <a target="_blank" rel="noopener noreferrer" href="https://www.mrob.com/pub/comp/xmorphia/pearson-classes.html#eta">https://www.mrob.com/pub/comp/xmorphia/pearson-classes.html#eta</a></li> <li>Mrob Uskate parameter space<br/> <a target="_blank" rel="noopener noreferrer" href="https://mrob.com/pub/comp/xmorphia/uskate-world.html">https://mrob.com/pub/comp/xmorphia/uskate-world.html</a></li> <li>A very good high level introduction to reaction diffusion with some great analogies with the
        particule approach. Lot of interesting links.<br/> <a target="_blank" rel="noopener noreferrer" href="https://www.redblobgames.com/x/2202-turing-patterns/">https://www.redblobgames.com/x/2202-turing-patterns/</a></li> <li>Redblobgames implementation of the parameter map visualisation<br/> <a target="_blank" rel="noopener noreferrer" href="https://www.redblobgames.com/x/2203-reaction-diffusion/art/parameter-map.html">https://www.redblobgames.com/x/2203-reaction-diffusion/art/parameter-map.html</a></li> <li>Good schema of the experience, one clue about the color map and a parameter space graph
        visualisation<br/> <a target="_blank" rel="noopener noreferrer" href="https://itp.uni-frankfurt.de/~gros/StudentProjects/Applets_2014_GrayScott/">https://itp.uni-frankfurt.de/~gros/StudentProjects/Applets_2014_GrayScott/</a></li> <li>A scientific paper "Spatially localized structures in the Gray-Scott model"<br/> <a target="_blank" rel="noopener noreferrer" href="https://royalsocietypublishing.org/doi/10.1098/rsta.2017.0375">https://royalsocietypublishing.org/doi/10.1098/rsta.2017.0375</a></li></ul> <h3>Color maps</h3> <ul><li>General approach to color maps. Lot of visual representations of colormaps. The interesting
        one here is the diverging method.<br/> <a target="_blank" rel="noopener noreferrer" href="https://matplotlib.org/stable/tutorials/colors/colormaps.html#diverging">https://matplotlib.org/stable/tutorials/colors/colormaps.html#diverging</a></li> <li>A lot of colormaps implemented in glsl, I reused a few of them in my code.<br/> <a target="_blank" rel="noopener noreferrer" href="https://github.com/Polymole/glsl-colormap">https://github.com/Polymole/glsl-colormap</a></li></ul> <h3>Other implementations</h3> <ul><li><a target="_blank" rel="noopener noreferrer" href="https://www.redblobgames.com/x/2203-reaction-diffusion/">Redblobgames</a> Various configurations with creative results.</li> <li><a target="_blank" rel="noopener noreferrer" href="https://www.mrob.com/pub/comp/xmorphia/ogl/index.html">Robert Munafo</a> Lots of presets to play with and a very good color picker.</li> <li><a target="_blank" rel="noopener noreferrer" href="https://pmneila.github.io/jsexp/grayscott/">pmneila</a> About the same set of features as Robert's implementation, with a dark theme.</li> <li><a target="_blank" rel="noopener noreferrer" href="https://www.karlsims.com/rdtool.html">Karlsims</a> Very good looking 3D like effect, flows applied to the whole grid and great interface.</li></ul> <h2>History of the project</h2> <p>The code of all the versions described here is available <a target="_blank" rel="noopener noreferrer" href="https://github.com/statox/particles-life/tree/main/src/lib/ReactionDiffusion">on this project's repo on Github</a>.</p> <h3>Prototyping with P5.js (v1, v2, v3)</h3> <p>In versions v1, v2 and v3 were prototyping to validate my understanding of the math behind the
    model and of the general idea of the simulation.</p> <p>These versions use the <a target="_blank" rel="noopener noreferrer" href="https://p5js.org/">p5.js</a> framework to render and update the simulation. The world is represented by a 2D array in typescript
    and the update is a simple nested for loop iterating on each item of the grid and applying the formula.</p> <p>The main difference between these 3 versions is the way I was updating the grid. In v1 I started
    with a very naive approach where I recreated the grid on each iteration. In v3 the algorithm is
    smarter, I create two grids when I build the world and then each update reads from one of the
    grids and writes to the other one which is then used by p5 to draw the canvas. This is a
    classical but inefficient approach to this kind problem.</p> <p>With a grid of 500x500 pixels the frame rate is around 1 fps with 1 iteration by frame which
    isn't great. In comparison on the same machine my final version runs grids of 512x512 pixels
    rendered on a full screen at ~55fps with 50 iterations by frame, which is much better!</p> <h3>Dabbling with WebGL (v4)</h3> <p>With the 3 previous versions I validated I understood the model and in v4 I started to make the
    simulation larger by using the GPU to update the world instead of doing that on the CPU in
    typescript. This was my first experience with <a target="_blank" rel="noopener noreferrer" href="https://github.com/regl-project/regl">regl</a> which is an incredibly cool framework to make working with WebGL much easier. This version was laying
    the fundations for my WebGL simulation: First, in typescript we generate a grid representing the world
    and we generate two WebGL texture where each pixel is an item of the generated grid.</p> <p>For each pixel we only generate a value on the red and green channels. Each value is comprised
    between <code>0.0</code> and <code>1.0</code> and corresponds to the concentration of the two chemicals
    U and V in each discrete position of the world.</p> <p>Once this is done we create two regl commands:</p> <ul><li>The <code>update</code> command which is responsible for reading from one of the created texture
        and updating the new state in the other texture.</li> <li>The <code>draw</code> command which simply takes the last updated texture and draws it directly
        on the canvas. The texture is drawn "raw" as in the red and green channels are used directly in
        the shader.</li></ul> <pre><code></code></pre> <h3>Adding basic controls to the simulation (v5)</h3> <p>Once my simulation was working properly on the GPU I wanted to add some interactivity.</p> <p>It was the opportunity to play with <a target="_blank" rel="noopener noreferrer" href="https://github.com/dataarts/dat.gui/">dat.gui</a>. This is a library which allows to easily create a graphical interface to modify the
    properties of a javascript object. I had already experimented with this library in my <a target="_blank" rel="noopener noreferrer">previous game of life project</a></p> <p>In this simulation I added the following settings:</p> <ul><li>A very crude manual selection of <code>f</code> and <code>k</code> parameters, allowing me to
        better grasp the impact of the feed rate and kill rate.</li> <li>Some additional presets seletions for <code>f</code> and <code>k</code>. I took these
        presets from the examples in <a target="_blank" rel="noopener noreferrer" href="https://www.mrob.com/pub/comp/xmorphia/pearson-classes.html">Robert Munafo's extended pearsons classification</a>. The fact that the classes I took from Robert's website were producing results similar to
        his own implementation was an encouraging sign that I was going in the right direction.</li> <li>A setting allowing to use different initial conditions for the world. It is useful because
        this version doesn't allow to modify the world with the mouse so having different starting
        worlds allowed me to test different <code>f</code> and <code>k</code> parameters.</li> <li>Some basic settings like the ability to pause and reset the simulation or see the current
        iteration number.</li></ul> <h3>Using the mouse to change the world (v6)</h3> <p>v6 saw a big improvement in my way to handle the glsl code for my shaders: instead of writing
    the shader code directly in the initialization of the regl commands (as it's shown in <a target="_blank" rel="noopener noreferrer" href="https://github.com/regl-project/regl/blob/gh-pages/example/basic.js">regl's examples</a>) I created a mechanism which allows me to write the shader code in separate <code>.glsl</code> files
    which are imported in the typescript code and then injected in the regl commands properties.</p> <p>Having a better separated code allowed me to pass more uniforms to my shaders and particularly
    to pass the mouse state to the update shader. Now the shader takes the position of the mouse as
    well as the state of each mouse button as uniforms. This way when updating each pixel if the
    pixel is close enough from the mouse and the button is pressed we can override the new value of
    the pixel (and ignore the value coming from the simulation). That allows to artifically increase
    the concentration of one of the chemicals on specific spots of the world.</p> <h3>Zoom and <code>fk</code> selection (v7)</h3> <p>In v7 I focused on the UI of the application. A lot of things changed on this iteration.</p> <p>Firstly I reworked the regl code and created two separate pipelines for the simulation itself
    and for its rendering. The simulation pipeline is basically the same one as in the previous
    versions.</p> <p>The graphic pipeline is pretty different:</p> <p>This version introduce a system where I use several texture to apply different transformations
    to the simulation texture before displaying it on the screen:</p> <ul><li>Step 1 "Zoom": In the vertex shader of the graphical pipeline I pass as uniforms the state
        of the zoom (i.e. the zoom level and the pan on the x and y axis). These uniforms allows me
        to draw only the parts of the texture which are currently in a zoomed in area.</li> <li>Step 2 "Colors": To make the simulation more visally appealing the first stage takes the raw
        red and green channels of the simulation texture and transform them to use a wider spectrum
        of colors. Since regl makes the glsl code quite modular I was able to create different
        fragment shaders applying different color palettes.</li> <li>Step 3 "Grid": To help me debugging the implementation of my zoom mecanism I added a step
        which overlays a grid on the resulting texture. The goal was to have a grid with a fixed
        sized which would better show the resolution of the zoom.</li> <li>Step 4 "Cursor": To make the mouse drawing more intuitive I add another overlay showing the
        area which the cursor will drawn on.</li></ul> <p>This approach has the big advantage of keeping my code very modular and making it easier to
    implement the different steps. The main drawback is that it requires to keep one texture for
    each step of the pipeline which has an impact on the GPU. An alternative solution would be to do
    all the transformations in the same shader but I haven't experimented with that already and I'm
    not sure what are the best practices for this topic.</p> <p>I also created the interface to select <code>f</code> and <code>k</code> on the parameters map.
    To do that, the first step was to create another type of simulation largely based on my previous
    experiements but where the <code>f</code> and <code>k</code> parameters are varying among the world.
    This way when initializing the world with small concentrations of the solutions and letting the simulation
    run for a few hundreds of thousands of iteration we get a nice map like this one</p> <img alt="parameter map" style="width: 20vw"/> <p>Some inpsiration I had for the parameters map:</p> <ul><li><a target="_blank" rel="noopener noreferrer" href="https://mrob.com/pub/comp/xmorphia/uskate-world.html">mrob</a></li> <li><a target="_blank" rel="noopener noreferrer" href="https://www.redblobgames.com/x/2203-reaction-diffusion/art/parameter-map.html">RebBlobGames</a></li></ul> <h3>"Auto Visualizer" (v8)</h3> <p>My last goal for this project was to create an infinite visualization based on the simulation.
    The issue with the raw simulation is that most of the parameters classes tend to create stable
    states after a number of iterations. Stable states are interesting to study the Gray-Scott
    system but they get boring quickly so I created the Auto Visualizer based on two ideas:</p> <p>First the <code>f</code> and <code>k</code> parameters need to change regularly to create new patterns
    but they need to change slowly. A big step between two values of (f, k) often tend to destroy all
    the concentrations of chemicals. So reusing the menu component I created to select f and k, I added
    a bounding box of the values which create the most interesting patterns and then used a noise function
    to make the parameters vary slowly and consistenly over time.</p> <p>Even when changing <code>f</code> and <code>k</code> the chemicals tends to disappear from the system
    so I have a mecanism which simulates the user clicking on the screen to add more chemical.</p>`,1);function dt(t){var o=mt(),e=h(ce(o),18),n=h(e,4),r=h(n,4),a=h(r,6),i=h(a,2),l=h(i,4),m=h(l,2),g=h(m,2),y=h(g,2),C=h(y,2),d=h(C,10),E=h(d,12),D=h(E,2),T=h(D,2),_=h(T,2),k=h(_,2),B=h(k,12),b=h(B,22),$=h(b,2),I=h($,2),s=h(I,2),c=h(s,2),p=h(c,4),P=h(p,2),u=h(P,2),v=h(u,2),A=h(v,4),R=h(A,2),M=h(R,4),G=h(M,2),f=h(G,42),x=O(f);x.textContent=`precision mediump float;
uniform sampler2D prevState;    // The state of the simulation to render
varying vec2 uv;                // The position of the vertex in the simulation texture
void main() {
    vec2 state = texture2D(prevState, uv).rg;   // Read the red and green channel in the simulation
    gl_FragColor = vec4(state, 0, 1);           // Use them directly in the color
}`,K(f);var S=h(f,6),z=h(O(S),3);K(S);var H=h(S,28);ve(12),ee(()=>{L(e,"src",`${F??""}/reaction_diffusion_about/fkselector.gif`),L(n,"src",`${F??""}/reaction_diffusion_about/interface.gif`),L(r,"src",`${F??""}/reaction_diffusion_about/settings.png`),L(a,"src",`${F??""}/reaction_diffusion_about/pearsons-parameter-space1.jpg`),L(i,"src",`${F??""}/reaction_diffusion_about/pearsons-parameter-space2.png`),L(l,"src",`${F??""}/reaction_diffusion_about/pattern5.png`),L(m,"src",`${F??""}/reaction_diffusion_about/pattern4.png`),L(g,"src",`${F??""}/reaction_diffusion_about/pattern1.png`),L(y,"src",`${F??""}/reaction_diffusion_about/pattern2.png`),L(C,"src",`${F??""}/reaction_diffusion_about/pattern3.png`),L(d,"src",`${F??""}/reaction_diffusion_about/fkrandomizer.gif`),L(E,"src",`${F??""}/reaction_diffusion_about/parameters_map_timelapse_0.png`),L(D,"src",`${F??""}/reaction_diffusion_about/parameters_map_timelapse_1.png`),L(T,"src",`${F??""}/reaction_diffusion_about/parameters_map_timelapse_2.png`),L(_,"src",`${F??""}/reaction_diffusion_about/parameters_map_timelapse_3.png`),L(k,"src",`${F??""}/reaction_diffusion_about/parameters_map_timelapse_4.png`),L(B,"src",`${F??""}/reaction_diffusion_about/gray-scott-equations.gif`),L(b,"src",`${F??""}/reaction_diffusion_about/gallery/madrepore_museum_spots.JPEG`),L($,"src",`${F??""}/reaction_diffusion_about/gallery/madrepore_simulation_spots.png`),L(I,"src",`${F??""}/reaction_diffusion_about/gallery/madrepore_museum_stripes.png`),L(s,"src",`${F??""}/reaction_diffusion_about/gallery/madrepore_simulation_stripes1.png`),L(c,"src",`${F??""}/reaction_diffusion_about/gallery/madrepore_simulation_stripes2.png`),L(p,"src",`${F??""}/reaction_diffusion_about/gallery/800px-Giant_Puffer_fish_skin_pattern.JPG`),L(P,"src",`${F??""}/reaction_diffusion_about/gallery/Giant_Pufferfish_skin_pattern_detail.jpg`),L(u,"src",`${F??""}/reaction_diffusion_about/gallery/tbd_simulation_stripes.png`),L(v,"src",`${F??""}/reaction_diffusion_about/gallery/tbd_simulation_stripes_spots.png`),L(A,"src",`${F??""}/reaction_diffusion_about/gallery/cells_division.gif`),L(R,"src",`${F??""}/reaction_diffusion_about/gallery/cells_division2.gif`),L(M,"src",`${F??""}/reaction_diffusion_about/gallery/fish_spots.jpg`),L(G,"src",`${F??""}/reaction_diffusion_about/gallery/tbd_simulation_regular_spots.png`),L(z,"href",`${F??""}/gameoflife`),L(H,"src",`${F??""}/parameters_map.png`)}),V(t,o)}const fe=[{name:"KarlSims",type:"Unknown",f:.055,k:.062},{name:"STX 1",type:"N.A",f:.0353,k:.0614},{name:"STX 2",type:"N.A",f:.0201,k:.0602},{name:"STX 2",type:"N.A",f:.0181,k:.0435},{name:"α 1",type:"alpha",f:.01,k:.047},{name:"α 2",type:"alpha",f:.014,k:.053},{name:"β 1",type:"beta",f:.014,k:.039},{name:"β 2",type:"beta",f:.026,k:.051},{name:"δ 1",type:"delta",f:.03,k:.055},{name:"δ 2",type:"delta",f:.042,k:.059},{name:"ε 1",type:"epsilon",f:.018,k:.055},{name:"ε 2",type:"epsilon",f:.022,k:.059},{name:"η 1",type:"eta",f:.034,k:.063},{name:"γ 1",type:"gamma",f:.022,k:.051},{name:"γ 2",type:"gamma",f:.026,k:.055},{name:"ι 1",type:"iota",f:.046,k:.0594},{name:"κ 1",type:"kappa",f:.082,k:.06},{name:"κ 2",type:"kappa",f:.058,k:.063},{name:"λ 1",type:"lambda",f:.026,k:.061},{name:"λ 2",type:"lambda",f:.034,k:.065},{name:"μ 1",type:"mu",f:.046,k:.065},{name:"μ 2",type:"mu",f:.058,k:.065},{name:"ν 2",type:"nu",f:.046,k:.067},{name:"π 1",type:"pi",f:.062,k:.061},{name:"ρ 1",type:"rho",f:.09,k:.059},{name:"ρ 2",type:"rho",f:.102,k:.055},{name:"σ 1",type:"sigma",f:.09,k:.057},{name:"θ 2",type:"sigma",f:.11,k:.0523},{name:"θ 1",type:"theta",f:.03,k:.057},{name:"θ 2",type:"theta",f:.038,k:.061},{name:"ξ 1",type:"xi",f:.01,k:.041},{name:"ξ 2",type:"xi",f:.014,k:.047},{name:"ζ 1",type:"zeta",f:.022,k:.061},{name:"ζ 2",type:"zeta",f:.026,k:.059}];var pt=U(`<div>Modify the change rate to change how fast the selector walks around the parameters space
            and the change magnitude to change how big each step taken by the selector is.</div> <div><label for="changeMag">changeMag</label> <span id="changeMag"></span> </div> <div><label for="changeRate">changeRate</label> <span id="changeRate"></span> </div> <!>`,1),vt=U('<div id="container"><button class="full-width svelte-10z1gqk" id="toggleButton"> </button> <!></div>');function xt(t,o){oe(o,!0);let e=fe[0],n=le(!0),r=le(1),a=le(100);const i=[0,.12],l=[.03,.07],m={f:.0433,k:.0621},g=[{f:.1045,k:.0553},{f:.0829,k:.0582},{f:.0664,k:.0595},{f:.0511,k:.0594},{f:.0307,k:.0549},{f:.017,k:.0467},{f:.005,k:.0335},{f:.0076,k:.0472},{f:.0166,k:.0594},{f:.0277,k:.0657},{f:.046,k:.0675},{f:.0757,k:.0643},{f:.0949,k:.0594}],y=f=>{const{f:x,k:S}=f,z=s.map(S,l[0],l[1],0,s.width),H=s.map(x,i[0],i[1],s.height,0);return{x:z,y:H}},C=f=>{const{x,y:S}=f,z=s.map(S,s.height,0,i[0],i[1]),H=s.map(x,0,s.width,l[0],l[1]);return{f:z,k:H}},d=f=>{const x=f.mouseX,S=f.mouseY;if(x<0||S<0||x>f.width||S>f.height)return;const{f:z,k:H}=C({x:f.mouseX,y:f.mouseY});e={f:z,k:H,name:"custom",type:"manual"},o.onfkupdated?.(e)},E=f=>{f.noStroke();const x=f.textSize();for(const S of fe){const{x:z,y:H}=y({f:S.f,k:S.k}),W=S.f===e.f&&S.k===e.k;f.circle(z,H,3),f.textSize(W?x*2:x),f.fill(W?[240,240,150]:[255,255,255]),f.text(S.name,z-f.textWidth(S.name)/2,H-10)}},D=f=>{f.noFill(),f.stroke("red"),f.strokeWeight(1);const{x,y:S}=y(e);f.text("F",10,S>10?S-5:S+15),f.line(0,S,f.width,S),f.text("K",x<f.width-10?x+5:x-15,f.height-10),f.line(x,0,x,f.height),f.circle(x,S,10)},T=f=>{const{f:x,k:S}=e,z=`F: ${x.toFixed(4)}`,H=`K: ${S.toFixed(4)}`,W=f.textSize(),q=f.height*.05;f.textStyle(f.BOLD),f.textSize(q),f.fill("white"),f.stroke(0),f.strokeWeight(1),f.text(z,f.width*.05,f.textSize()),f.text(H,f.width*.05,f.textSize()+f.textSize()+6),f.textStyle(f.NORMAL),f.textSize(W)},_=f=>{for(let x=0;x<g.length;x++){const{x:S,y:z}=y(g[x]),{x:H,y:W}=y(g[(x+1)%g.length]);f.fill("white"),f.stroke("white"),f.strokeWeight(1),f.circle(S,z,3),f.circle(H,W,3),f.line(S,z,H,W)}};function k(f,x){let S=!1,z=1/0,H=null;for(let W=0;W<x.length;W++){const q=x[W],te=x[(W+1)%x.length];if(f[0]===q[0]&&f[1]===q[1])return f;q[1]>f[1]!=te[1]>f[1]&&f[0]<(te[0]-q[0])*(f[1]-q[1])/(te[1]-q[1])+q[0]&&(S=!S);const Ie=B(f,q,te);Ie<z&&(z=Ie,H=b(f,q,te))}if(S)return f;if(!H)throw new Error("Now closest point found");return H}function B(f,x,S){const z=[S[0]-x[0],S[1]-x[1]],H=[f[0]-x[0],f[1]-x[1]],W=z[0]*H[0]+z[1]*H[1],q=z[0]*z[0]+z[1]*z[1],te=W/q;let ie;return te<0?ie=x:te>1?ie=S:ie=[x[0]+te*z[0],x[1]+te*z[1]],Math.sqrt((f[0]-ie[0])**2+(f[1]-ie[1])**2)}function b(f,x,S){const z=[S[0]-x[0],S[1]-x[1]],H=[f[0]-x[0],f[1]-x[1]],W=z[0]*H[0]+z[1]*H[1],q=z[0]*z[0]+z[1]*z[1],te=W/q;let ie;return te<0?ie=x:te>1?ie=S:ie=[x[0]+te*z[0],x[1]+te*z[1]],ie}const $=()=>{const f=[e.f,e.k],x=g.map(z=>[z.f,z.k]),S=k(f,x);e.f=S[0],e.k=S[1]},I=()=>{let{f,k:x}=e;const S=s.noise(s.frameCount*.01),z=s.noise(5321+s.frameCount*.01),W=Math.random()<.97?.001:.01;f=f+(z*2-1)*(i[1]-i[0])*W*w(r),x=x+(S*2-1)*(l[1]-l[0])*W*w(r);const q={f:f-m.f,k:x-m.k};f=f-q.f*.001*(w(r)/2),x=x-q.k*.001*(w(r)/2),e={f,k:x,name:"custom",type:"manual"},$(),o.onfkupdated?.(e)};let s,c=le(!1);const p=f=>{s=f;let x,S,z;f.preload=()=>{x=f.loadImage(F+"/parameters_map.png")},f.setup=()=>{f.createCanvas(400,400),f.frameRate(55),S=f.createSlider(0,10,6,0);const H=f.select("#changeMag");if(!H)throw new Error("changeMag slider container not ready");S.parent(H),z=f.createSlider(1,80,30,1);const W=f.select("#changeRate");if(!W)throw new Error("changeRate slider container not ready");z.parent(W)},f.draw=()=>{f.background(255),f.tint(150,190),f.image(x,0,0,f.width,f.height),E(f),_(f),D(f),T(f),f.frameCount%w(a)===0&&I(),Q(c,!1),f.mouseIsPressed&&(d(f),Q(c,!0)),Q(r,Number(S.value()),!0),Q(a,Number(z.value()),!0)}},P=()=>{Q(n,!w(n)),w(n)||s.remove()};se(()=>s?.remove());var u=vt();let v;var A=O(u),R=O(A,!0);K(A);var M=h(A,2);{var G=f=>{var x=pt(),S=h(ce(x),2),z=h(O(S),3,!0);K(S);var H=h(S,2),W=h(O(H),3,!0);K(H);var q=h(H,2);ge(q,{sketch:p}),ee((te,ie)=>{ae(z,te),ae(W,ie)},[()=>w(r).toFixed(2),()=>w(a).toFixed(2)]),V(f,x)};Pe(M,f=>{w(n)&&f(G)})}K(u),ee(()=>{v=Re(u,1,"svelte-10z1gqk",null,v,{"no-cursor":w(c)}),ae(R,w(n)?"Close":"F/K selection")}),Y("click",A,P),V(t,u),re()}ue(["click"]);const ht=`precision mediump float;
attribute vec2 position;
uniform float zoomLevel;    // 1 full size, 0 max zoom
uniform vec2 pan;   // in range [0, 1], [0, 0]  is bottom left, [1, 1] top right
varying vec2 uv;

void main() {
    uv = 0.5 * (position + 1.0) * zoomLevel + pan * (1.0 - zoomLevel);
    gl_Position = vec4(position, 0, 1);
}
`,gt=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    gl_FragColor = vec4(A, B, 0.0, 1.0);
}

`,yt=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float PI = 3.14159265359;
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    float val = sin(iteration*PI/180.0);
    if (val < 0.0) {
        val = -1.0 * val;
    }
    gl_FragColor = vec4(A, B, val, 1.0);
}
`,bt=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    float val = (A + B) / 2.0;

    gl_FragColor = vec4(val, val, val, 1.0);
}

`,wt=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    float val = (1.0 + A - B) / 2.0;

    gl_FragColor = vec4(1.0 - val, 1.0 - val, 1.0 - val, 1.0);
}
`,_t=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    float val = (1.0 + A - B) / 2.0;

    gl_FragColor = vec4(val, val, val, 1.0);
}
`,St=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

// All components are in the range [0...1], including hue. (https://stackoverflow.com/a/17897228)
vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

// All components are in the range [0...1], including hue. (https://stackoverflow.com/a/17897228)
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    // vec3 color1 = vec3(1.0, 0.0, 0.0);
    // vec3 color2 = vec3(0.0, 1.0, 0.0);
    // vec3 result = color1 * A + color2 * B;

    vec3 color1RGB = vec3(0.639, 0.941, 0.717);
    vec3 color2RGB = vec3(0.929, 0.082, 0.705);

    vec3 color1HSV = rgb2hsv(color1RGB);
    vec3 color2HSV = rgb2hsv(color2RGB);

    float color1Offset = (cos(iteration * 0.001) + 1.0) * 0.5;
    float color1newH = 0.5 * (color1HSV.x + color1Offset);
    vec3 color1newHSV = vec3(color1newH, color1HSV.g, color1HSV.b);

    float color2Offset = (cos(iteration * 0.002)) * 0.5;
    float color2newH = 0.5 * (color2HSV.x + color2Offset + 0.33);
    vec3 color2newHSV = vec3(color2newH, color2HSV.g, color2HSV.b);


    vec3 resultHSV = color1newHSV * A + color2newHSV * B;
    vec3 result = hsv2rgb(resultHSV);

    gl_FragColor = vec4(result, 1.0);
}
`,Et=`// Colors scheme inspired by Robert Munafo described here:
// https://www.mrob.com/pub/comp/xmorphia/index.html
// 
// A is blue
// B is red

precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    float red = A; // The more A the redder
    float blue = 1.0 - A; // The less A the bleuer

    float green = max(A, B) - min(A, B);

    vec3 result = vec3(red, green, blue);

    gl_FragColor = vec4(result, 1.0);
}
`,kt=`// Colors scheme inspired by Robert Munafo described here:
// https://www.mrob.com/pub/comp/xmorphia/index.html
// 
// A is blue
// B is red

precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec3 color1 = vec3(0.0, 0.0, 1.0);
    vec3 color2 = vec3(1.0, 0.0, 0.0);
    vec3 result = vec3(A, 0.0, 1.0-A);

    gl_FragColor = vec4(result, 1.0);
}
`,At=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    if (A > 0.9) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    } else if (A > 0.4) {
        gl_FragColor = vec4(1.0 - A, 0.0, 0.0, 1.0);
    } else { 
        gl_FragColor = vec4(0.0, A, 0.0, 1.0);
    }
}
`,Dt=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec4 black = vec4(0.0, 0.0, 0.0, 1.0);

    vec4 red = vec4(1.0, 0.0, 0.0, 1.0);
    vec4 blue = vec4(0.0, 0.0, 1.0, 1.0);
    vec4 color = mix(blue, red, A);

    vec4 softRed = vec4(0.8588, 0.2824, 0.3765, 1.0);
    vec4 softBlue = vec4(0.2824, 0.3882, 0.8588, 1.0);
    // vec4 softColor = mix(blue, red, (A-0.4)/0.6);
    // vec4 softColor = mix(blue, red, (A-0.4)/0.4);
    vec4 softColor = mix(softBlue, softRed, 1.0-A);


    if (A < 0.4) {
        gl_FragColor = vec4(black);
    } else {
        gl_FragColor = vec4(color);
    }

}
`,Bt=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

// https://github.com/Polymole/glsl-colormap/blob/master/shaders/MATLAB_cool.frag
float colormap_red(float x) {
    return (1.0 + 1.0 / 63.0) * x - 1.0 / 63.0;
}

float colormap_green(float x) {
    return -(1.0 + 1.0 / 63.0) * x + (1.0 + 1.0 / 63.0);
}

vec4 colormap(float x) {
    float r = clamp(colormap_red(x), 0.0, 1.0);
    float g = clamp(colormap_green(x), 0.0, 1.0);
    float b = 1.0;
    return vec4(r, g, b, 1.0);
}

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec4 black = vec4(0.0, 0.0, 0.0, 1.0);

    vec4 softColor = colormap((A-0.4)*(1.0/0.6));


    if (A < 0.4) {
        gl_FragColor = vec4(black);
    } else {
        gl_FragColor = vec4(softColor);
    }

}
`,Ct=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

// https://github.com/Polymole/glsl-colormap/blob/master/shaders/MATLAB_parula.frag
 vec4 colormap(float x) {
    if (x < 0.0) {
        return vec4(0.0, 0.0, 0.0, 0.0);
    } else if (1.0 < x) {
        return vec4(0.0, 0.0, 0.0, 0.0);
    }
    if (x < 3.1250000000000000e-02) {
        float dx = x - 1.5625000000000000e-02;
        return ((vec4(-1.4151576683620706e+02,  2.4271369358056621e+01,  4.5510373586485706e+01, 1.0) * dx
               + vec4( 0.0000000000000000e+00,  0.0000000000000000e+00,  0.0000000000000000e+00, 1.0)) * dx
               + vec4( 2.6007355728658488e-01,  1.4968553250962457e+00,  3.0913652594248364e+00, 1.0)) * dx
               + vec4( 2.0810000000000001e-01,  1.6630000000000000e-01,  5.2920000000000000e-01, 1.0);
    } else if (x < 4.6875000000000000e-02) {
        float dx = x - 3.1250000000000000e-02;
        return ((vec4(-5.1390461057291191e+01,  1.2211762733842230e+01, -1.2843448884986955e+01, 1.0) * dx
               + vec4(-6.6335515704472066e+00,  1.1377204386589042e+00,  2.1332987618665173e+00, 1.0)) * dx
               + vec4( 1.5642431399834725e-01,  1.5146322069502911e+00,  3.1246980525790007e+00, 1.0)) * dx
               + vec4( 2.1162380952380999e-01,  1.8978095238095199e-01,  5.7767619047619101e-01, 1.0);
    } else if (x < 6.2500000000000000e-02) {
        float dx = x - 4.6875000000000000e-02;
        return ((vec4(-1.4725107464858192e+02,  1.3014608277362621e+01,  5.8634219534912217e+00, 1.0) * dx
               + vec4(-9.0424794325077311e+00,  1.7101468168077587e+00,  1.5312620953827538e+00, 1.0)) * dx
               + vec4(-8.8513670422823654e-02,  1.5591301328169576e+00,  3.1819568159735203e+00, 1.0)) * dx
               + vec4( 2.1225238095238100e-01,  2.1377142857142900e-01,  6.2697142857142896e-01, 1.0);
    } else if (x < 7.8125000000000000e-02) {
        float dx = x - 6.2500000000000000e-02;
        return ((vec4(-2.1469400225321081e+02, -1.4338005366630648e+01, -4.1817857976177763e+01, 1.0) * dx
               + vec4(-1.5944873556660008e+01,  2.3202065798091316e+00,  1.8061099994526548e+00, 1.0)) * dx
               + vec4(-4.7894106087856969e-01,  1.6221044046390967e+00,  3.2341032549553237e+00, 1.0)) * dx
               + vec4( 2.0810000000000001e-01,  2.3860000000000001e-01,  6.7708571428571396e-01, 1.0);
    } else if (x < 9.3750000000000000e-02) {
        float dx = x - 7.8125000000000000e-02;
        return ((vec4(-2.8846495443400278e+02,  2.0037550842697090e+02,  1.1771734328417965e+02, 1.0) * dx
               + vec4(-2.6008654912279265e+01,  1.6481125782483199e+00, -1.5410209318067788e-01, 1.0)) * dx
               + vec4(-1.1344649432057459e+00,  1.6841093914837442e+00,  3.2599158784908235e+00, 1.0)) * dx
               + vec4( 1.9590476190476200e-01,  2.6445714285714300e-01,  7.2789999999999999e-01, 1.0);
    } else if (x < 1.0937500000000000e-01) {
        float dx = x - 9.3750000000000000e-02;
        return ((vec4(-5.4509738001026233e+02,  5.1696771659011155e+01, -6.5374637230314454e+02, 1.0) * dx
               + vec4(-3.9530449651373146e+01,  1.1040714535762580e+01,  5.3638983732652425e+00, 1.0)) * dx
               + vec4(-2.1585134520128149e+00,  1.8823723151401646e+00,  3.3413189453671448e+00, 1.0)) * dx
               + vec4( 1.7072857142857101e-01,  2.9193809523809500e-01,  7.7924761904761897e-01, 1.0);
    } else if (x < 1.2500000000000000e-01) {
        float dx = x - 1.0937500000000000e-01;
        return ((vec4( 2.3639968744743715e+03, -8.1036503315845437e+02, -8.1573269216733058e+02, 1.0) * dx
               + vec4(-6.5081889339354191e+01,  1.3464000707278728e+01, -2.5280462828444659e+01, 1.0)) * dx
               + vec4(-3.7930812487429293e+00,  2.2652584908126849e+00,  3.0301226257549660e+00, 1.0)) * dx
               + vec4( 1.2527142857142901e-01,  3.2424285714285700e-01,  8.3027142857142899e-01, 1.0);
    } else if (x < 1.4062500000000000e-01) {
        float dx = x - 1.2500000000000000e-01;
        return ((vec4( 1.4125902630655582e+03,  2.5375056097507152e+02,  9.0826266478267496e+02, 1.0) * dx
               + vec4( 4.5730464151631985e+01, -2.4521860222023822e+01, -6.3517932773788282e+01, 1.0)) * dx
               + vec4(-4.0954472673010889e+00,  2.0924794358947931e+00,  1.6426476944700765e+00, 1.0)) * dx
               + vec4( 5.9133333333333399e-02,  3.5983333333333301e-01,  8.6833333333333296e-01, 1.0);
    } else if (x < 1.5625000000000000e-01) {
        float dx = x - 1.4062500000000000e-01;
        return ((vec4(-1.9850459267366693e+03,  1.4738473211499172e+02,  2.4976683303608979e+02, 1.0) * dx
               + vec4( 1.1194563273283002e+02, -1.2627302676317344e+01, -2.0943120362100398e+01, 1.0)) * dx
               + vec4(-1.6317582534813697e+00,  1.5120237656082123e+00,  3.2294373922181602e-01, 1.0)) * dx
               + vec4( 1.1695238095238101e-02,  3.8750952380952403e-01,  8.8195714285714299e-01, 1.0);
    } else if (x < 1.7187500000000000e-01) {
        float dx = x - 1.5625000000000000e-01;
        return ((vec4(-1.3211246088080517e+02,  6.1731462945951478e+01,  9.6199145930320853e+01, 1.0) * dx
               + vec4( 1.8896604917048652e+01, -5.7186433584271068e+00, -9.2353000635336890e+00, 1.0)) * dx
               + vec4( 4.1265170979798449e-01,  1.2253683588153301e+00, -1.4859407992871662e-01, 1.0)) * dx
               + vec4( 5.9571428571428596e-03,  4.0861428571428599e-01,  8.8284285714285704e-01, 1.0);
    } else if (x < 1.8750000000000000e-01) {
        float dx = x - 1.7187500000000000e-01;
        return ((vec4(-2.4276114402580023e+02,  1.8878292291818184e+01,  5.4500811814199913e+01, 1.0) * dx
               + vec4( 1.2703833313260910e+01, -2.8249810328356313e+00, -4.7259650980498993e+00, 1.0)) * dx
               + vec4( 9.0640855714657143e-01,  1.0918742277018498e+00, -3.6673884807846019e-01, 1.0)) * dx
               + vec4( 1.6514285714285700e-02,  4.2659999999999998e-01,  8.7863333333333304e-01, 1.0);
    } else if (x < 2.0312500000000000e-01) {
        float dx = x - 1.8750000000000000e-01;
        return ((vec4(-2.4875702015890445e+02,  2.7531596458333780e+01,  1.1605149669749400e+01, 1.0) * dx
               + vec4( 1.3244046870515243e+00, -1.9400610816566539e+00, -2.1712395442592785e+00, 1.0)) * dx
               + vec4( 1.1255997759014531e+00,  1.0174204446629080e+00, -4.7450767061454108e-01, 1.0)) * dx
               + vec4( 3.2852380952381001e-02,  4.4304285714285702e-01,  8.7195714285714299e-01, 1.0);
    } else if (x < 2.1875000000000000e-01) {
        float dx = x - 2.0312500000000000e-01;
        return ((vec4( 6.6879357994795782e+01,  3.3156266362545779e+00,  3.1398894268734253e+01, 1.0) * dx
               + vec4(-1.0336080632897122e+01, -6.4951749767225808e-01, -1.6272481534897754e+00, 1.0)) * dx
               + vec4( 9.8479233924761567e-01,  9.7695827936089374e-01, -5.3385904089187008e-01, 1.0)) * dx
               + vec4( 4.9814285714285700e-02,  4.5857142857142902e-01,  8.6405714285714297e-01, 1.0);
    } else if (x < 2.3437500000000000e-01) {
        float dx = x - 2.1875000000000000e-01;
        return ((vec4(-3.7807546774099214e+00,  2.9110963663947160e+01,  2.0085673255558202e+01, 1.0) * dx
               + vec4(-7.2011107268910699e+00, -4.9409749909782474e-01, -1.5542498464285720e-01, 1.0)) * dx
               + vec4( 7.1077372425092522e-01,  9.5908929503636120e-01, -5.6171330867519242e-01, 1.0)) * dx
               + vec4( 6.2933333333333299e-02,  4.7369047619047600e-01,  8.5543809523809500e-01, 1.0);
    } else if (x < 2.5000000000000000e-01) {
        float dx = x - 2.3437500000000000e-01;
        return ((vec4(-1.8052110713761824e+01,  7.5676044216235097e+00,  2.6820241280346455e+01, 1.0) * dx
               + vec4(-7.3783336023946600e+00,  8.7047892264969851e-01,  7.8609094921143352e-01, 1.0)) * dx
               + vec4( 4.8296990660583561e-01,  9.6497025477935916e-01, -5.5185915297880839e-01, 1.0)) * dx
               + vec4( 7.2266666666666701e-02,  4.8866666666666703e-01,  8.4670000000000001e-01, 1.0);
    } else if (x < 2.6562500000000000e-01) {
        float dx = x - 2.5000000000000000e-01;
        return ((vec4(-8.5042116753280467e+01,  3.9234694840689350e+01,  6.3623990194130904e+01, 1.0) * dx
               + vec4(-8.2245262921022455e+00,  1.2252103799133005e+00,  2.0432897592276738e+00, 1.0)) * dx
               + vec4( 2.3917522075432149e-01,  9.9771540013190607e-01, -5.0765007940944740e-01, 1.0)) * dx
               + vec4( 7.7942857142857203e-02,  5.0398571428571404e-01,  8.3837142857142899e-01, 1.0);
    } else if (x < 2.8125000000000000e-01) {
        float dx = x - 2.6562500000000000e-01;
        return ((vec4(-4.4981860368289709e+01,  3.5222378119677195e+01,  1.8276940800992332e+01, 1.0) * dx
               + vec4(-1.2210875514912267e+01,  3.0643367005706139e+00,  5.0256642995775600e+00, 1.0)) * dx
               + vec4(-8.0127932480280273e-02,  1.0647395732644671e+00, -3.9719767224061564e-01, 1.0)) * dx
               + vec4( 7.9347619047619000e-02,  5.2002380952381000e-01,  8.3118095238095202e-01, 1.0);
    } else if (x < 2.9687500000000000e-01) {
        float dx = x - 2.8125000000000000e-01;
        return ((vec4( 8.8958586797831074e+01, -6.4031864461777545e+01, -5.4343639113056135e+01, 1.0) * dx
               + vec4(-1.4319400219675847e+01,  4.7153856749304826e+00,  5.8823958996240755e+00, 1.0)) * dx
               + vec4(-4.9466349083321959e-01,  1.1862977353816719e+00, -2.2675923162809006e-01, 1.0)) * dx
               + vec4( 7.4942857142857103e-02,  5.3754285714285699e-01,  8.2627142857142899e-01, 1.0);
    } else if (x < 3.1250000000000000e-01) {
        float dx = x - 2.9687500000000000e-01;
        return ((vec4( 2.3465669412937996e+02, -7.4943148843863256e+01, -1.7040059387215410e+02, 1.0) * dx
               + vec4(-1.0149466463527515e+01,  1.7138920282846606e+00,  3.3350378161995691e+00, 1.0)) * dx
               + vec4(-8.7698953275827207e-01,  1.2867551994944084e+00, -8.2736829818345611e-02, 1.0)) * dx
               + vec4( 6.4057142857142799e-02,  5.5698571428571397e-01,  8.2395714285714305e-01, 1.0);
    } else if (x < 3.2812500000000000e-01) {
        float dx = x - 3.1250000000000000e-01;
        return ((vec4( 3.5054309382746595e+02, -7.5598816353949772e+01, -5.9224118732067950e+01, 1.0) * dx
               + vec4( 8.5006607378717081e-01, -1.7990680737714295e+00, -4.6524900215576546e+00, 1.0)) * dx
               + vec4(-1.0222926638479650e+00,  1.2854243237836778e+00, -1.0332202052706571e-01, 1.0)) * dx
               + vec4( 4.8771428571428597e-02,  5.7722380952381003e-01,  8.2282857142857202e-01, 1.0);
    } else if (x < 3.4375000000000000e-01) {
        float dx = x - 3.2812500000000000e-01;
        return ((vec4(-1.3511844086782639e+02,  2.1571557117596814e+01,  6.5912402293741552e+00, 1.0) * dx
               + vec4( 1.7281773596949638e+01, -5.3427625903628249e+00, -7.4286205871233397e+00, 1.0)) * dx
               + vec4(-7.3898266899270237e-01,  1.1738332196565799e+00, -2.9208937378770627e-01, 1.0)) * dx
               + vec4( 3.4342857142857203e-02,  5.9658095238095199e-01,  8.1985238095238100e-01, 1.0);
    } else if (x < 3.5937500000000000e-01) {
        float dx = x - 3.4375000000000000e-01;
        return ((vec4(-1.6458788273706924e+02,  1.0533768835542057e+01,  3.0362548290707878e+01, 1.0) * dx
               + vec4( 1.0948096681270275e+01, -4.3315958504754741e+00, -7.1196562013714262e+00, 1.0)) * dx
               + vec4(-2.9789094589551629e-01,  1.0226713690184817e+00, -5.1940619860793691e-01, 1.0)) * dx
               + vec4( 2.6499999999999999e-02,  6.1370000000000002e-01,  8.1350000000000000e-01, 1.0);
    } else if (x < 3.7500000000000000e-01) {
        float dx = x - 3.5937500000000000e-01;
        return ((vec4(-1.0406115199344315e+02,  1.9929786587720105e+01,  3.6734795179105028e+01, 1.0) * dx
               + vec4( 3.2330396779701545e+00, -3.8378254363094402e+00, -5.6964117502444944e+00, 1.0)) * dx
               + vec4(-7.6310690282384588e-02,  8.9502416141246732e-01, -7.1965726035193567e-01, 1.0)) * dx
               + vec4( 2.3890476190476202e-02,  6.2866190476190498e-01,  8.0376190476190501e-01, 1.0);
    } else if (x < 3.9062500000000000e-01) {
        float dx = x - 3.7500000000000000e-01;
        return ((vec4( 2.3255546213942225e+02,  1.8349599099637384e+01,  1.7433813849989207e+01, 1.0) * dx
               + vec4(-1.6448268217224928e+00, -2.9036166900100602e+00, -3.9744682262239461e+00, 1.0)) * dx
               + vec4(-5.1494864403514876e-02,  7.8968912818872505e-01, -8.7076475998425507e-01, 1.0)) * dx
               + vec4( 2.3090476190476199e-02,  6.4178571428571396e-01,  7.9126666666666701e-01, 1.0);
    } else if (x < 4.0625000000000000e-01) {
        float dx = x - 3.9062500000000000e-01;
        return ((vec4( 1.5126193200717549e+02,  2.0267550346934740e+01,  2.0857035135376179e+01, 1.0) * dx
               + vec4( 9.2562104660629245e+00, -2.0434792322145579e+00, -3.1572582020057021e+00, 1.0)) * dx
               + vec4( 6.7433005039304356e-02,  7.1239075440396538e-01, -9.8219798542534331e-01, 1.0)) * dx
               + vec4( 2.2771428571428599e-02,  6.5348571428571400e-01,  7.7675714285714303e-01, 1.0);
    } else if (x < 4.2187500000000000e-01) {
        float dx = x - 4.0625000000000000e-01;
        return ((vec4( 1.0861181935568159e+02, -5.7969433444380156e+00,  3.9956456082908054e+00, 1.0) * dx
               + vec4( 1.6346613528899276e+01, -1.0934378097019919e+00, -2.1795846800349437e+00, 1.0)) * dx
               + vec4( 4.6747712996058871e-01,  6.6337642562401933e-01, -1.0655861554572283e+00, 1.0)) * dx
               + vec4( 2.6661904761904800e-02,  6.6419523809523795e-01,  7.6071904761904796e-01, 1.0);
    } else if (x < 4.3750000000000000e-01) {
        float dx = x - 4.2187500000000000e-01;
        return ((vec4(-3.0484063800132168e+02,  1.4154965887634640e+01, -3.1353889969814710e+00, 1.0) * dx
               + vec4( 2.1437792561196851e+01, -1.3651695289725239e+00, -1.9922887921463122e+00, 1.0)) * dx
               + vec4( 1.0578584751183406e+00,  6.2496068595722998e-01, -1.1307716784600605e+00, 1.0)) * dx
               + vec4( 3.8371428571428598e-02,  6.7427142857142897e-01,  7.4355238095238096e-01, 1.0);
    } else if (x < 4.5312500000000000e-01) {
        float dx = x - 4.3750000000000000e-01;
        return ((vec4( 1.9732370744832981e+01, -3.3873392535419122e+00, -5.1854420010455629e+00, 1.0) * dx
               + vec4( 7.1483876548848961e+00, -7.0165550298965007e-01, -2.1392601513798186e+00, 1.0)) * dx
               + vec4( 1.5045175409946179e+00,  5.9266654483282100e-01, -1.1953271307026563e+00, 1.0)) * dx
               + vec4( 5.8971428571428598e-02,  6.8375714285714295e-01,  7.2538571428571397e-01, 1.0);
    } else if (x < 4.6875000000000000e-01) {
        float dx = x - 4.5312500000000000e-01;
        return ((vec4(-5.2460806882781675e+01, -6.0560887320505685e-01,  1.3890718905419471e+01, 1.0) * dx
               + vec4( 8.0733425335489422e+00, -8.6043703049942721e-01, -2.3823277451788294e+00, 1.0)) * dx
               + vec4( 1.7423570751888966e+00,  5.6825884899705426e-01, -1.2659769415863851e+00, 1.0)) * dx
               + vec4( 8.4300000000000000e-02,  6.9283333333333297e-01,  7.0616666666666705e-01, 1.0);
    } else if (x < 4.8437500000000000e-01) {
        float dx = x - 4.6875000000000000e-01;
        return ((vec4( 1.0354971072183483e+01,  5.8097747460711062e+00, -5.4384621916749820e+00, 1.0) * dx
               + vec4( 5.6142422109185510e+00, -8.8882494643091425e-01, -1.7312002964872917e+00, 1.0)) * dx
               + vec4( 1.9562255868212013e+00,  5.4092663060751767e-01, -1.3302508172374183e+00, 1.0)) * dx
               + vec4( 1.1329523809523800e-01,  7.0150000000000001e-01,  6.8585714285714305e-01, 1.0);
    } else if (x < 5.0000000000000000e-01) {
        float dx = x - 4.8437500000000000e-01;
        return ((vec4(-1.3925172644537971e+01, -8.9021377300786071e+00, -4.6199177582688593e+00, 1.0) * dx
               + vec4( 6.0996314799271518e+00, -6.1649175520883115e-01, -1.9861282117220564e+00, 1.0)) * dx
               + vec4( 2.1392548632406654e+00,  5.1740605714439658e-01, -1.3883340751781894e+00, 1.0)) * dx
               + vec4( 1.4527142857142900e-01,  7.0975714285714298e-01,  6.6462857142857201e-01, 1.0);
    } else if (x < 5.1562500000000000e-01) {
        float dx = x - 5.0000000000000000e-01;
        return ((vec4( 3.1614367125520630e+01, -1.1395280968671647e+01,  2.1421523701702025e+01, 1.0) * dx
               + vec4( 5.4468890122144344e+00, -1.0337794613062659e+00, -2.2026868566409092e+00, 1.0)) * dx
               + vec4( 2.3196692459303776e+00,  4.9162056938634824e-01, -1.4537843106213608e+00, 1.0)) * dx
               + vec4( 1.8013333333333301e-01,  7.1765714285714299e-01,  6.4243333333333297e-01, 1.0);
    } else if (x < 5.3125000000000000e-01) {
        float dx = x - 5.1562500000000000e-01;
        return ((vec4(-3.7634010143333590e+01,  2.0544616050328934e+00,  1.3219372364175872e+00, 1.0) * dx
               + vec4( 6.9288124712232140e+00, -1.5679332567127493e+00, -1.1985529331236269e+00, 1.0)) * dx
               + vec4( 2.5130395816090907e+00,  4.5096880816730112e-01, -1.5069286823364316e+00, 1.0)) * dx
               + vec4( 2.1782857142857101e-01,  7.2504285714285699e-01,  6.1926190476190501e-01, 1.0);
    } else if (x < 5.4687500000000000e-01) {
        float dx = x - 5.3125000000000000e-01;
        return ((vec4( 1.2815768685879013e+01, -1.4298832118473902e+01,  3.9450879734146490e+01, 1.0) * dx
               + vec4( 5.1647182457544520e+00, -1.4716303689768324e+00, -1.1365871251665525e+00, 1.0)) * dx
               + vec4( 2.7020009990618670e+00,  4.0347562651590141e-01, -1.5434152457472157e+00, 1.0)) * dx
               + vec4( 2.5864285714285701e-01,  7.3171428571428598e-01,  5.9542857142857097e-01, 1.0);
    } else if (x < 5.6250000000000000e-01) {
        float dx = x - 5.4687500000000000e-01;
        return ((vec4(-7.8540912219456771e+01, -1.8509114083431125e+01,  3.3113477160250433e+01, 1.0) * dx
               + vec4( 5.7654574029050307e+00, -2.1418881245302965e+00,  7.1267286237156402e-01, 1.0)) * dx
               + vec4( 2.8727849935721714e+00,  3.4701440005485251e-01, -1.5500389061033872e+00, 1.0)) * dx
               + vec4( 3.0217142857142898e-01,  7.3760476190476199e-01,  5.7118571428571396e-01, 1.0);
    } else if (x < 5.7812500000000000e-01) {
        float dx = x - 5.6250000000000000e-01;
        return ((vec4(-5.8163891236508938e+01,  9.6920884524980497e+00,  3.0320583052976861e+01, 1.0) * dx
               + vec4( 2.0838521426179946e+00, -3.0095028471911305e+00,  2.2648671042583031e+00, 1.0)) * dx
               + vec4( 2.9954304552209687e+00,  2.6652391612170523e-01, -1.5035148441247956e+00, 1.0)) * dx
               + vec4( 3.4816666666666701e-01,  7.4243333333333295e-01,  5.4726666666666701e-01, 1.0);
    } else if (x < 5.9375000000000000e-01) {
        float dx = x - 5.7812500000000000e-01;
        return ((vec4(-6.4543256167712116e+01, -2.8636353652780144e-01,  2.8905906284068501e+00, 1.0) * dx
               + vec4(-6.4258025909336181e-01, -2.5551862009802844e+00,  3.6861444348665935e+00, 1.0)) * dx
               + vec4( 3.0179503284010409e+00,  1.7957564974402687e-01, -1.4105302888259692e+00, 1.0)) * dx
               + vec4( 3.9525714285714297e-01,  7.4590000000000001e-01,  5.2444285714285699e-01, 1.0);
    } else if (x < 6.0937500000000000e-01) {
        float dx = x - 5.9375000000000000e-01;
        return ((vec4(-2.4450284092939786e+01,  1.3922851408411924e+01, -1.6916850328844372e+01, 1.0) * dx
               + vec4(-3.6680453919548675e+00, -2.5686094917550251e+00,  3.8216408705731646e+00, 1.0)) * dx
               + vec4( 2.9505968026034126e+00,  9.9516342045037676e-02, -1.2932211434284731e+00, 1.0)) * dx
               + vec4( 4.4200952380952402e-01,  7.4808095238095196e-01,  5.0331428571428605e-01, 1.0);
    } else if (x < 6.2500000000000000e-01) {
        float dx = x - 6.0937500000000000e-01;
        return ((vec4( 1.2547821111311350e+01,  1.5748329330961459e+01, -1.7611303598786566e+01, 1.0) * dx
               + vec4(-4.8141524588114200e+00, -1.9159758319857161e+00,  3.0286635114085847e+00, 1.0)) * dx
               + vec4( 2.8180624611851890e+00,  2.9444696361588602e-02, -1.1861851374600081e+00, 1.0)) * dx
               + vec4( 4.8712380952380901e-01,  7.4906190476190504e-01,  4.8397619047619100e-01, 1.0);
    } else if (x < 6.4062500000000000e-01) {
        float dx = x - 6.2500000000000000e-01;
        return ((vec4( 9.2115329809656430e+00, -3.2661877796437579e+00, -1.2675733711774058e+00, 1.0) * dx
               + vec4(-4.2259733442187004e+00, -1.1777728945968977e+00,  2.2031336552154643e+00, 1.0)) * dx
               + vec4( 2.6768104955128438e+00, -1.8895127491264742e-02, -1.1044383067315073e+00, 1.0)) * dx
               + vec4( 5.3002857142857096e-01,  7.4911428571428595e-01,  4.6611428571428598e-01, 1.0);
    } else if (x < 6.5625000000000000e-01) {
        float dx = x - 6.4062500000000000e-01;
        return ((vec4( 1.4269589821681299e+01,  7.3028598827757278e+00, -8.5260219639800940e+00, 1.0) * dx
               + vec4(-3.7941827357359359e+00, -1.3308754467676989e+00,  2.1437161534415234e+00, 1.0)) * dx
               + vec4( 2.5514955567635522e+00, -5.8092757825086563e-02, -1.0365187784712420e+00, 1.0)) * dx
               + vec4( 5.7085714285714295e-01,  7.4851904761904797e-01,  4.4939047619047601e-01, 1.0);
    } else if (x < 6.7187500000000000e-01) {
        float dx = x - 6.5625000000000000e-01;
        return ((vec4( 8.6083934467238432e+00,  2.6914824850885094e-01, -1.7057138772896455e+01, 1.0) * dx
               + vec4(-3.1252957128446250e+00, -9.8855388976258662e-01,  1.7440588738799565e+00, 1.0)) * dx
               + vec4( 2.4433787060044811e+00, -9.4333841208372265e-02, -9.7577229366934382e-01, 1.0)) * dx
               + vec4( 6.0985238095238103e-01,  7.4731428571428604e-01,  4.3368571428571401e-01, 1.0);
    } else if (x < 6.8750000000000000e-01) {
        float dx = x - 6.7187500000000000e-01;
        return ((vec4( 8.7188554392023345e+00,  1.7834947123447904e+01, -1.8886229447019101e+00, 1.0) * dx
               + vec4(-2.7217772700294449e+00, -9.7593756561373424e-01,  9.4450549390043514e-01, 1.0)) * dx
               + vec4( 2.3520181906470738e+00, -1.2502902019862727e-01, -9.3376347542277516e-01, 1.0)) * dx
               + vec4( 6.4729999999999999e-01,  7.4560000000000004e-01,  4.1880000000000001e-01, 1.0);
    } else if (x < 7.0312500000000000e-01) {
        float dx = x - 6.8750000000000000e-01;
        return ((vec4( 8.9449847961700044e+00, -2.1676746266635202e+01, -4.0993789718798466e+00, 1.0) * dx
               + vec4(-2.3130809213168355e+00, -1.3992441920211368e-01,  8.5597629336753311e-01, 1.0)) * dx
               + vec4( 2.2733485314072883e+00, -1.4246436371137491e-01, -9.0563094749671313e-01, 1.0)) * dx
               + vec4( 6.8341904761904804e-01,  7.4347619047619096e-01,  4.0443333333333298e-01, 1.0);
    } else if (x < 7.1875000000000000e-01) {
        float dx = x - 7.0312500000000000e-01;
        return ((vec4( 1.1674919661892304e+01,  2.3933066515154213e+01, -1.1673175453308831e+01, 1.0) * dx
               + vec4(-1.8937847589963666e+00, -1.1560219004506387e+00,  6.6381790406066532e-01, 1.0)) * dx
               + vec4( 2.2076162551523946e+00, -1.6271352495594915e-01, -8.8188416316189755e-01, 1.0)) * dx
               + vec4( 7.1840952380952405e-01,  7.4113333333333298e-01,  3.9047619047618998e-01, 1.0);
    } else if (x < 7.3437500000000000e-01) {
        float dx = x - 7.1875000000000000e-01;
        return ((vec4(-4.4641682053710623e+00,  2.0910706819426692e+00,  4.6048045942407727e+00, 1.0) * dx
               + vec4(-1.3465228998451648e+00, -3.4159407552784897e-02,  1.1663780468681384e-01, 1.0)) * dx
               + vec4( 2.1569864479829954e+00, -1.8131010789350266e-01, -8.6968954271271826e-01, 1.0)) * dx
               + vec4( 7.5248571428571398e-01,  7.3839999999999995e-01,  3.7681428571428599e-01, 1.0);
    } else if (x < 7.5000000000000000e-01) {
        float dx = x - 7.3437500000000000e-01;
        return ((vec4( 1.2423276968973711e+01, -6.0829492432479162e+00, -2.1725700066572116e+01, 1.0) * dx
               + vec4(-1.5557807844719334e+00,  6.3859530663277708e-02,  3.3248802004185007e-01, 1.0)) * dx
               + vec4( 2.1116379529155407e+00, -1.8084604346990121e-01, -8.6267195170133282e-01, 1.0)) * dx
               + vec4( 7.8584285714285695e-01,  7.3556666666666704e-01,  3.6327142857142902e-01, 1.0);
    } else if (x < 7.6562500000000000e-01) {
        float dx = x - 7.5000000000000000e-01;
        return ((vec4( 3.4549460436900552e+00,  2.2240726291601970e+01, -7.5799471847609725e+00, 1.0) * dx
               + vec4(-9.7343967655129060e-01, -2.2127871511396835e-01, -6.8590417057871789e-01, 1.0)) * dx
               + vec4( 2.0721188832120530e+00, -1.8330571822694325e-01, -8.6819407905347146e-01, 1.0)) * dx
               + vec4( 8.1850476190476196e-01,  7.3273333333333301e-01,  3.4979047619047599e-01, 1.0);
    } else if (x < 7.8125000000000000e-01) {
        float dx = x - 7.6562500000000000e-01;
        return ((vec4( 8.7094721894791203e+00,  1.3239510743088688e+01, -2.2852796908624047e+01, 1.0) * dx
               + vec4(-8.1148908075331927e-01,  8.2125532980487381e-01, -1.0412141948643885e+00, 1.0)) * dx
               + vec4( 2.0442293713791684e+00, -1.7393108362239784e-01, -8.9518030351351996e-01, 1.0)) * dx
               + vec4( 8.5065714285714300e-01,  7.2989999999999999e-01,  3.3602857142857101e-01, 1.0);
    } else if (x < 7.9687500000000000e-01) {
        float dx = x - 7.8125000000000000e-01;
        return ((vec4(-1.2078434801289291e+01,  4.3390183117236198e+01, -3.9570693752303733e+01, 1.0) * dx
               + vec4(-4.0323257187148548e-01,  1.4418573958871561e+00, -2.1124390499561407e+00, 1.0)) * dx
               + vec4( 2.0252493455569058e+00, -1.3856994728345987e-01, -9.4445613546384066e-01, 1.0)) * dx
               + vec4( 8.8243333333333296e-01,  7.2743333333333304e-01,  3.2169999999999999e-01, 1.0);
    } else if (x < 8.1250000000000000e-01) {
        float dx = x - 7.9687500000000000e-01;
        return ((vec4(-1.2824532984374384e+01,  1.1653781393088177e+02, -1.1096774236821523e+02, 1.0) * dx
               + vec4(-9.6940920318192092e-01,  3.4757722295076028e+00, -3.9673153195953783e+00, 1.0)) * dx
               + vec4( 2.0038018178216963e+00, -6.1731984386666772e-02, -1.0394522974880831e+00, 1.0)) * dx
               + vec4( 9.1393333333333304e-01,  7.2578571428571403e-01,  3.0627619047619098e-01, 1.0);
    } else if (x < 8.2812500000000000e-01) {
        float dx = x - 8.1250000000000000e-01;
        return ((vec4(-3.5855044278532131e+02,  2.7064903734930277e+02, -8.0792089155266083e+01, 1.0) * dx
               + vec4(-1.5705591868244702e+00,  8.9384822575176859e+00, -9.1689282431054675e+00, 1.0)) * dx
               + vec4( 1.9641148117278464e+00,  1.3224074197310332e-01, -1.2447061031552840e+00, 1.0)) * dx
               + vec4( 9.4495714285714305e-01,  7.2611428571428605e-01,  2.8864285714285698e-01, 1.0);
    } else if (x < 8.4375000000000000e-01) {
        float dx = x - 8.2812500000000000e-01;
        return ((vec4(-3.8174017206443654e+02, -1.9549693475620506e+02,  4.4911575613188438e+02, 1.0) * dx
               + vec4(-1.8377611192386407e+01,  2.1625155883266252e+01, -1.2956057422258565e+01, 1.0)) * dx
               + vec4( 1.6524246495526764e+00,  6.0979758792285232e-01, -1.5904090041765968e+00, 1.0)) * dx
               + vec4( 9.7389523809523804e-01,  7.3139523809523799e-01,  2.6664761904761902e-01, 1.0);
    } else if (x < 8.5937500000000000e-01) {
        float dx = x - 8.4375000000000000e-01;
        return ((vec4( 4.3248438818547703e+02, -2.7134838403902307e+02,  3.3204036056432756e+01, 1.0) * dx
               + vec4(-3.6271681757906869e+01,  1.2461237066569140e+01,  8.0962436464235150e+00, 1.0)) * dx
               + vec4( 7.9852944720434427e-01,  1.1423974777640304e+00, -1.6663435944240195e+00, 1.0)) * dx
               + vec4( 9.9377142857142897e-01,  7.4545714285714304e-01,  2.4034761904761900e-01, 1.0);
    } else if (x < 8.7500000000000000e-01) {
        float dx = x - 8.5937500000000000e-01;
        return ((vec4( 1.7847934313241271e+02, -6.1117386114828536e+00, -1.0882439559595376e+02, 1.0) * dx
               + vec4(-1.5998976061712632e+01, -2.5821843526006538e-01,  9.6526828365688004e+00, 1.0)) * dx
               + vec4(-1.8199581227210410e-02,  1.3330696438782346e+00, -1.3890166181272647e+00, 1.0)) * dx
               + vec4( 9.9904285714285701e-01,  7.6531428571428595e-01,  2.1641428571428600e-01, 1.0);
    } else if (x < 8.9062500000000000e-01) {
        float dx = x - 8.7500000000000000e-01;
        return ((vec4( 1.0065469642774150e+02,  1.1181852770679304e+01, -4.2302948910418884e+01, 1.0) * dx
               + vec4(-7.6327568523807861e+00, -5.4470618267332416e-01,  4.5515392930084682e+00, 1.0)) * dx
               + vec4(-3.8744540800992006e-01,  1.3205239467230254e+00, -1.1670756473526198e+00, 1.0)) * dx
               + vec4( 9.9553333333333305e-01,  7.8605714285714301e-01,  1.9665238095238100e-01, 1.0);
    } else if (x < 9.0625000000000000e-01) {
        float dx = x - 8.9062500000000000e-01;
        return ((vec4( 5.1792385442186948e+01,  1.3813127528788970e+01, -4.7771351619749993e+01, 1.0) * dx
               + vec4(-2.9145679573304033e+00, -2.0556834047731776e-02,  2.5685885628325829e+00, 1.0)) * dx
               + vec4(-5.5224735816165738e-01,  1.3116917120867588e+00, -1.0558236496051034e+00, 1.0)) * dx
               + vec4( 9.8799999999999999e-01,  8.0659999999999998e-01,  1.7936666666666701e-01, 1.0);
    } else if (x < 9.2187500000000000e-01) {
        float dx = x - 9.0625000000000000e-01;
        return ((vec4( 1.1035785704157649e+02,  5.2154589495154021e+01, -3.9990387467675163e+01, 1.0) * dx
               + vec4(-4.8679988972789023e-01,  6.2693351886425119e-01,  3.2930645565680206e-01, 1.0)) * dx
               + vec4(-6.0539373077194325e-01,  1.3211663477870170e+00, -1.0105440399412067e+00, 1.0)) * dx
               + vec4( 9.7885714285714298e-01,  8.2714285714285696e-01,  1.6331428571428599e-01, 1.0);
    } else if (x < 9.3750000000000000e-01) {
        float dx = x - 9.2187500000000000e-01;
        return ((vec4( 4.6043843534396274e+01,  2.0987943062129727e+01, -2.3203479461840441e+01, 1.0) * dx
               + vec4( 4.6862246590960082e+00,  3.0716799014495959e+00, -1.5452429568904713e+00, 1.0)) * dx
               + vec4(-5.3977771875056635e-01,  1.3789571824794209e+00, -1.0295430477729828e+00, 1.0)) * dx
               + vec4( 9.6970000000000001e-01,  8.4813809523809502e-01,  1.4745238095238100e-01, 1.0);
    } else if (x < 9.5312500000000000e-01) {
        float dx = x - 9.3750000000000000e-01;
        return ((vec4( 6.1233625963980650e+01,  2.8669866827404956e+01,  2.4201791029260814e+01, 1.0) * dx
               + vec4( 6.8445298247708335e+00,  4.0554897324869268e+00, -2.6329060566642419e+00, 1.0)) * dx
               + vec4(-3.5960967994014698e-01,  1.4903192080096790e+00, -1.0948266261097752e+00, 1.0)) * dx
               + vec4( 9.6258571428571404e-01,  8.7051428571428602e-01,  1.3089999999999999e-01, 1.0);
    } else if (x < 9.6875000000000000e-01) {
        float dx = x - 9.5312500000000000e-01;
        return ((vec4( 4.1070719275903762e+01,  5.3910277236601019e+00,  2.0019172487757277e+01, 1.0) * dx
               + vec4( 9.7148560418324266e+00,  5.3993897400215340e+00, -1.4984471021676413e+00, 1.0)) * dx
               + vec4(-1.0086927577447102e-01,  1.6380516997676238e+00, -1.1593790192165234e+00, 1.0)) * dx
               + vec4( 9.5887142857142904e-01,  8.9490000000000003e-01,  1.1324285714285701e-01, 1.0);
    } else if (x < 9.8437500000000000e-01) {
        float dx = x - 9.6875000000000000e-01;
        return ((vec4(-5.3250445924665847e+01, -1.6529749150400146e+01, -1.4422423336140781e+02, 1.0) * dx
               + vec4( 1.1640046007890415e+01,  5.6520941645681013e+00, -5.6004839180401900e-01, 1.0)) * dx
               + vec4( 2.3280106875244833e-01,  1.8107311357768368e+00, -1.1915430113098306e+00, 1.0)) * dx
               + vec4( 9.5982380952380997e-01,  9.2183333333333295e-01,  9.4838095238095305e-02, 1.0);
    } else if (x < 1.0000000000000000e+00) {
        float dx = x - 9.8437500000000000e-01;
        return ((vec4(-1.9507053557699635e+02, -1.0404825969371934e+02,  1.5617193238656020e+02, 1.0) * dx
               + vec4( 9.1439313551717039e+00,  4.8772621731430945e+00, -7.3205593306200099e+00, 1.0)) * dx
               + vec4( 5.5755071505029385e-01,  1.9752523285535741e+00, -1.3146775069727061e+00, 1.0)) * dx
               + vec4( 9.6609999999999996e-01,  9.5144285714285703e-01,  7.5533333333333300e-02, 1.0);
    } else {
        float dx = x - 1.0000000000000000e+00;
        return ((vec4( 0.0000000000000000e+00,  3.4202936336155174e+00,  3.0625241907655076e+00, 1.0) * dx
               + vec4( 0.0000000000000000e+00,  0.0000000000000000e+00,  0.0000000000000000e+00, 1.0)) * dx
               + vec4( 0.0000000000000000e+00,  0.0000000000000000e+00,  0.0000000000000000e+00, 1.0)) * dx
               + vec4( 9.7629999999999995e-01,  9.8309999999999997e-01,  5.3800000000000001e-02, 1.0);
    }
}

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec4 black = vec4(0.0, 0.0, 0.0, 1.0);

    vec4 softColor = colormap((A-0.4)*(1.0/0.6));


    if (A < 0.4) {
        gl_FragColor = vec4(black);
    } else {
        gl_FragColor = vec4(softColor);
    }
}
`,zt=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

// https://github.com/Polymole/glsl-colormap/blob/master/shaders/IDL_CB-RdBu.frag
float colormap_red(float x) {
	if (x < 0.09771832105856419) {
		return 7.60263247863246E+02 * x + 1.02931623931624E+02;
	} else if (x < 0.3017162107441106) {
		return (-2.54380938558548E+02 * x + 4.29911571188803E+02) * x + 1.37642085716717E+02;
	} else if (x < 0.4014205790737471) {
		return 8.67103448276151E+01 * x + 2.18034482758611E+02;
	} else if (x < 0.5019932233215039) {
		return -6.15461538461498E+01 * x + 2.77547692307680E+02;
	} else if (x < 0.5969483882550937) {
		return -3.77588522588624E+02 * x + 4.36198819698878E+02;
	} else if (x < 0.8046060096654594) {
		return (-6.51345897546620E+02 * x + 2.09780968434337E+02) * x + 3.17674951640855E+02;
	} else {
		return -3.08431855203590E+02 * x + 3.12956742081421E+02;
	}
}

float colormap_green(float x) {
	if (x < 0.09881640500975222) {
		return 2.41408547008547E+02 * x + 3.50427350427364E-01;
	} else if (x < 0.5000816285610199) {
		return ((((1.98531871433258E+04 * x - 2.64108262469187E+04) * x + 1.10991785969817E+04) * x - 1.92958444776211E+03) * x + 8.39569642882186E+02) * x - 4.82944517518776E+01;
	} else if (x < 0.8922355473041534) {
		return (((6.16712686949223E+03 * x - 1.59084026055125E+04) * x + 1.45172137257997E+04) * x - 5.80944127411621E+03) * x + 1.12477959061948E+03;
	} else {
		return -5.28313797313699E+02 * x + 5.78459299959206E+02;
	}
}

float colormap_blue(float x) {
	if (x < 0.1033699568661857) {
		return 1.30256410256410E+02 * x + 3.08518518518519E+01;
	} else if (x < 0.2037526071071625) {
		return 3.38458128078815E+02 * x + 9.33004926108412E+00;
	} else if (x < 0.2973267734050751) {
		return (-1.06345054944861E+02 * x + 5.93327252747168E+02) * x - 3.81852747252658E+01;
	} else if (x < 0.4029109179973602) {
		return 6.68959706959723E+02 * x - 7.00740740740798E+01;
	} else if (x < 0.5006715489526758) {
		return 4.87348695652202E+02 * x + 3.09898550724286E+00;
	} else if (x < 0.6004396902588283) {
		return -6.85799999999829E+01 * x + 2.81436666666663E+02;
	} else if (x < 0.702576607465744) {
		return -1.81331701891043E+02 * x + 3.49137263626287E+02;
	} else if (x < 0.9010407030582428) {
		return (2.06124143164576E+02 * x - 5.78166906665595E+02) * x + 5.26198653917172E+02;
	} else {
		return -7.36990769230737E+02 * x + 8.36652307692262E+02;
	}
}

vec4 colormap(float x) {
	float r = clamp(colormap_red(x) / 255.0, 0.0, 1.0);
	float g = clamp(colormap_green(x) / 255.0, 0.0, 1.0);
	float b = clamp(colormap_blue(x) / 255.0, 0.0, 1.0);
	return vec4(r, g, b, 1.0);
}

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec4 black = vec4(0.0, 0.0, 0.0, 1.0);

    vec4 softColor = colormap((A-0.4)*(1.0/0.6));


    if (A < 0.4) {
        gl_FragColor = vec4(black);
    } else {
        gl_FragColor = vec4(softColor);
    }

}
`,$t=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

// https://github.com/Polymole/glsl-colormap/blob/master/shaders/IDL_CB-RdYiBu.frag
float colormap_red(float x) {
	if (x < 0.09790863520700754) {
		return 5.14512820512820E+02 * x + 1.64641025641026E+02;
	} else if (x < 0.2001887081633112) {
		return 2.83195402298854E+02 * x + 1.87288998357964E+02;
	} else if (x < 0.3190117539655621) {
		return 9.27301587301214E+01 * x + 2.25417989417999E+02;
	} else if (x < 0.500517389125164) {
		return 255.0;
	} else if (x < 0.6068377196788788) {
		return -3.04674876847379E+02 * x + 4.07495073891681E+02;
	} else if (x < 0.9017468988895416) {
		return (1.55336390191951E+02 * x - 7.56394659038288E+02) * x + 6.24412733169483E+02;
	} else {
		return -1.88350769230735E+02 * x + 2.38492307692292E+02;
	}
}

float colormap_green(float x) {
	if (x < 0.09638568758964539) {
		return 4.81427692307692E+02 * x + 4.61538461538488E-01;
	} else if (x < 0.4987066686153412) {
		return ((((3.25545903568267E+04 * x - 4.24067109461319E+04) * x + 1.83751375886345E+04) * x - 3.19145329617892E+03) * x + 8.08315127034676E+02) * x - 1.44611527812961E+01;
	} else if (x < 0.6047312345537269) {
		return -1.18449917898218E+02 * x + 3.14234811165860E+02;
	} else if (x < 0.7067635953426361) {
		return -2.70822112753102E+02 * x + 4.06379036672115E+02;
	} else {
		return (-4.62308723214883E+02 * x + 2.42936159122279E+02) * x + 2.74203431802418E+02;
	}
}

float colormap_blue(float x) {
	if (x < 0.09982818011951204) {
		return 1.64123076923076E+01 * x + 3.72646153846154E+01;
	} else if (x < 0.2958717460833126) {
		return 2.87014675052409E+02 * x + 1.02508735150248E+01;
	} else if (x < 0.4900527540014758) {
		return 4.65475113122167E+02 * x - 4.25505279034673E+01;
	} else if (x < 0.6017014681258838) {
		return 5.61032967032998E+02 * x - 8.93789173789407E+01;
	} else if (x < 0.7015737100463595) {
		return -1.51655677655728E+02 * x + 3.39446886446912E+02;
	} else if (x < 0.8237156500567735) {
		return -2.43405347593559E+02 * x + 4.03816042780725E+02;
	} else {
		return -3.00296889157305E+02 * x + 4.50678495922638E+02;
	}
}

vec4 colormap(float x) {
	float r = clamp(colormap_red(x) / 255.0, 0.0, 1.0);
	float g = clamp(colormap_green(x) / 255.0, 0.0, 1.0);
	float b = clamp(colormap_blue(x) / 255.0, 0.0, 1.0);
	return vec4(r, g, b, 1.0);
}

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec4 black = vec4(0.0, 0.0, 0.0, 1.0);

    vec4 softColor = colormap((A-0.4)*(1.0/0.6));


    if (A < 0.4) {
        gl_FragColor = vec4(black);
    } else {
        gl_FragColor = vec4(softColor);
    }

}
`,Lt=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

// https://github.com/Polymole/glsl-colormap/blob/master/shaders/IDL_CB-RdYiBu.frag
float colormap_red(float x) {
	if (x < 0.09790863520700754) {
		return 5.14512820512820E+02 * x + 1.64641025641026E+02;
	} else if (x < 0.2001887081633112) {
		return 2.83195402298854E+02 * x + 1.87288998357964E+02;
	} else if (x < 0.3190117539655621) {
		return 9.27301587301214E+01 * x + 2.25417989417999E+02;
	} else if (x < 0.500517389125164) {
		return 255.0;
	} else if (x < 0.6068377196788788) {
		return -3.04674876847379E+02 * x + 4.07495073891681E+02;
	} else if (x < 0.9017468988895416) {
		return (1.55336390191951E+02 * x - 7.56394659038288E+02) * x + 6.24412733169483E+02;
	} else {
		return -1.88350769230735E+02 * x + 2.38492307692292E+02;
	}
}

float colormap_green(float x) {
	if (x < 0.09638568758964539) {
		return 4.81427692307692E+02 * x + 4.61538461538488E-01;
	} else if (x < 0.4987066686153412) {
		return ((((3.25545903568267E+04 * x - 4.24067109461319E+04) * x + 1.83751375886345E+04) * x - 3.19145329617892E+03) * x + 8.08315127034676E+02) * x - 1.44611527812961E+01;
	} else if (x < 0.6047312345537269) {
		return -1.18449917898218E+02 * x + 3.14234811165860E+02;
	} else if (x < 0.7067635953426361) {
		return -2.70822112753102E+02 * x + 4.06379036672115E+02;
	} else {
		return (-4.62308723214883E+02 * x + 2.42936159122279E+02) * x + 2.74203431802418E+02;
	}
}

float colormap_blue(float x) {
	if (x < 0.09982818011951204) {
		return 1.64123076923076E+01 * x + 3.72646153846154E+01;
	} else if (x < 0.2958717460833126) {
		return 2.87014675052409E+02 * x + 1.02508735150248E+01;
	} else if (x < 0.4900527540014758) {
		return 4.65475113122167E+02 * x - 4.25505279034673E+01;
	} else if (x < 0.6017014681258838) {
		return 5.61032967032998E+02 * x - 8.93789173789407E+01;
	} else if (x < 0.7015737100463595) {
		return -1.51655677655728E+02 * x + 3.39446886446912E+02;
	} else if (x < 0.8237156500567735) {
		return -2.43405347593559E+02 * x + 4.03816042780725E+02;
	} else {
		return -3.00296889157305E+02 * x + 4.50678495922638E+02;
	}
}

vec4 colormap(float x) {
	float r = clamp(colormap_red(x) / 255.0, 0.0, 1.0);
	float g = clamp(colormap_green(x) / 255.0, 0.0, 1.0);
	float b = clamp(colormap_blue(x) / 255.0, 0.0, 1.0);
	return vec4(r, g, b, 1.0);
}

void main() {
    float A = texture2D(prevState, uv).r;

    vec4 black = vec4(0.0, 0.0, 0.0, 1.0);

    vec4 softColor = colormap(1.0 - (A-0.4)*(1.0/0.6));


    if (A > 0.6) {
        gl_FragColor = vec4(black);
    } else {
        gl_FragColor = vec4(softColor);
    }

}
`,Tt=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

// https://github.com/Polymole/glsl-colormap/blob/master/shaders/transform_seismic.frag
float colormap_f(float x) {
    return ((-2010.0 * x + 2502.5950459) * x - 481.763180924) / 255.0;
}

float colormap_red(float x) {
    if (x < 0.0) {
        return 3.0 / 255.0;
    } else if (x < 0.238) {
        return ((-1810.0 * x + 414.49) * x + 3.87702) / 255.0;
    } else if (x < 51611.0 / 108060.0) {
        return (344441250.0 / 323659.0 * x - 23422005.0 / 92474.0) / 255.0;
    } else if (x < 25851.0 / 34402.0) {
        return 1.0;
    } else if (x <= 1.0) {
        return (-688.04 * x + 772.02) / 255.0;
    } else {
        return 83.0 / 255.0;
    }
}

float colormap_green(float x) {
    if (x < 0.0) {
        return 0.0;
    } else if (x < 0.238) {
        return 0.0;
    } else if (x < 51611.0 / 108060.0) {
        return colormap_f(x);
    } else if (x < 0.739376978894039) {
        float xx = x - 51611.0 / 108060.0;
        return ((-914.74 * xx - 734.72) * xx + 255.) / 255.0;
    } else {
        return 0.0;
    }
}

float colormap_blue(float x) {
    if (x < 0.0) {
        return 19.0 / 255.0;
    } else if (x < 0.238) {
        float xx = x - 0.238;
        return (((1624.6 * xx + 1191.4) * xx + 1180.2) * xx + 255.0) / 255.0;
    } else if (x < 51611.0 / 108060.0) {
        return 1.0;
    } else if (x < 174.5 / 256.0) {
        return (-951.67322673866 * x + 709.532730938451) / 255.0;
    } else if (x < 0.745745353439206) {
        return (-705.250074130877 * x + 559.620050530617) / 255.0;
    } else if (x <= 1.0) {
        return ((-399.29 * x + 655.71) * x - 233.25) / 255.0;
    } else {
        return 23.0 / 255.0;
    }
}

vec4 colormap(float x) {
    return vec4(colormap_red(x), colormap_green(x), colormap_blue(x), 1.0);
}

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec4 black = vec4(0.0, 0.0, 0.0, 1.0);

    vec4 softColor = colormap((A-0.4)*(1.0/0.6));


    if (A < 0.4) {
        gl_FragColor = vec4(black);
    } else {
        gl_FragColor = vec4(softColor);
    }

}
`,Rt=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

// https://github.com/Polymole/glsl-colormap/blob/master/shaders/IDL_CB-RdYiBu.frag
float colormap_red(float x) {
	if (x < 0.09790863520700754) {
		return 5.14512820512820E+02 * x + 1.64641025641026E+02;
	} else if (x < 0.2001887081633112) {
		return 2.83195402298854E+02 * x + 1.87288998357964E+02;
	} else if (x < 0.3190117539655621) {
		return 9.27301587301214E+01 * x + 2.25417989417999E+02;
	} else if (x < 0.500517389125164) {
		return 255.0;
	} else if (x < 0.6068377196788788) {
		return -3.04674876847379E+02 * x + 4.07495073891681E+02;
	} else if (x < 0.9017468988895416) {
		return (1.55336390191951E+02 * x - 7.56394659038288E+02) * x + 6.24412733169483E+02;
	} else {
		return -1.88350769230735E+02 * x + 2.38492307692292E+02;
	}
}

float colormap_green(float x) {
	if (x < 0.09638568758964539) {
		return 4.81427692307692E+02 * x + 4.61538461538488E-01;
	} else if (x < 0.4987066686153412) {
		return ((((3.25545903568267E+04 * x - 4.24067109461319E+04) * x + 1.83751375886345E+04) * x - 3.19145329617892E+03) * x + 8.08315127034676E+02) * x - 1.44611527812961E+01;
	} else if (x < 0.6047312345537269) {
		return -1.18449917898218E+02 * x + 3.14234811165860E+02;
	} else if (x < 0.7067635953426361) {
		return -2.70822112753102E+02 * x + 4.06379036672115E+02;
	} else {
		return (-4.62308723214883E+02 * x + 2.42936159122279E+02) * x + 2.74203431802418E+02;
	}
}

float colormap_blue(float x) {
	if (x < 0.09982818011951204) {
		return 1.64123076923076E+01 * x + 3.72646153846154E+01;
	} else if (x < 0.2958717460833126) {
		return 2.87014675052409E+02 * x + 1.02508735150248E+01;
	} else if (x < 0.4900527540014758) {
		return 4.65475113122167E+02 * x - 4.25505279034673E+01;
	} else if (x < 0.6017014681258838) {
		return 5.61032967032998E+02 * x - 8.93789173789407E+01;
	} else if (x < 0.7015737100463595) {
		return -1.51655677655728E+02 * x + 3.39446886446912E+02;
	} else if (x < 0.8237156500567735) {
		return -2.43405347593559E+02 * x + 4.03816042780725E+02;
	} else {
		return -3.00296889157305E+02 * x + 4.50678495922638E+02;
	}
}

vec4 colormap(float x) {
	float r = clamp(colormap_red(x) / 255.0, 0.0, 1.0);
	float g = clamp(colormap_green(x) / 255.0, 0.0, 1.0);
	float b = clamp(colormap_blue(x) / 255.0, 0.0, 1.0);
	return vec4(r, g, b, 1.0);
}

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec4 black = vec4(0.0, 0.0, 0.0, 1.0);

    vec4 softColor = colormap((B-0.1)*(1.0/0.9));


    if (B < 0.1) {
        gl_FragColor = vec4(black);
    } else {
        gl_FragColor = vec4(softColor);
    }

}
`,j={},Pt=t=>{const o=n=>t.prop(n),e={vert:ht,attributes:{position:[[1,-1],[-1,-1],[1,1],[1,1],[-1,-1],[-1,1]]},count:6,framebuffer:o("outputBuffer"),uniforms:{iteration:o("iteration"),zoomLevel:o("zoomLevel"),pan:o("pan"),prevState:o("inputBuffer")}};j.raw=t({frag:gt,...e}),j.A_transform_seismic=t({frag:Tt,...e}),j.A_gradiant1=t({frag:At,...e}),j.A_gradiant2=t({frag:Dt,...e}),j.A_MATLAB_cool=t({frag:Bt,...e}),j.A_MATLAB_parula=t({frag:Ct,...e}),j.A_IDL_CB_RdBu=t({frag:zt,...e}),j.A_IDL_CB_RdYiBu=t({frag:$t,...e}),j.A_IDL_CB_BuYiRd=t({frag:Lt,...e}),j.B_IDL_CB_RdYiBu=t({frag:Rt,...e}),j.grayscale=t({frag:bt,...e}),j.blackwhite=t({frag:wt,...e}),j.whiteblack=t({frag:_t,...e}),j.timebasedblue=t({frag:yt,...e}),j.lerp=t({frag:St,...e}),j.mrob=t({frag:Et,...e}),j.redblue=t({frag:kt,...e})},It=t=>{const{colorMode:o,inputBuffer:e,iteration:n,outputBuffer:r,zoomState:a}=t;(j[o]||j.raw)({inputBuffer:e,iteration:n,outputBuffer:r,pan:[a.panX,a.panY],zoomLevel:a.zoomLevel})},Ft=`precision mediump float;

uniform float radius;
uniform sampler2D prevState;
uniform bool pauseSimulation;
uniform float Da;
uniform float Db;
uniform float f;
uniform float k;

uniform bool penIsActive;
uniform bool eraserIsActive;
uniform float penDensity;

varying vec2 uv;
varying vec2 mouseUv;
varying float scaledPenRadius;

// https://thebookofshaders.com/10/
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}

vec2 laplacianDiff() {
    vec2 r = vec2(0.0, 0.0);

    // top left
    r += texture2D(prevState, uv+vec2(-1,-1)/float(radius)).rg * 0.05;
    // top
    r += texture2D(prevState, uv+vec2(0,-1)/float(radius)).rg * 0.2;
    // top right
    r += texture2D(prevState, uv+vec2(1,-1)/float(radius)).rg * 0.05;

    // left
    r += texture2D(prevState, uv+vec2(-1,0)/float(radius)).rg * 0.2;
    // middle
    r += texture2D(prevState, uv+vec2(0,0)/float(radius)).rg * -1.0;
    // right
    r += texture2D(prevState, uv+vec2(1,0)/float(radius)).rg * 0.2;

    // bottom left
    r += texture2D(prevState, uv+vec2(-1,1)/float(radius)).rg * 0.05;
    // bottom
    r += texture2D(prevState, uv+vec2(0,1)/float(radius)).rg * 0.2;
    // bottom right
    r += texture2D(prevState, uv+vec2(1,1)/float(radius)).rg * 0.05;

    return r;
}

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec2 L = laplacianDiff();
    float La = L.r;
    float Lb = L.g;

    float newA = A + ((Da * La) - (A * B * B) + (f * (1.0 - A)));
    float newB = B + ((Db * Lb) + (A * B * B) - ((k + f) * B));


    float rnd = random(uv);
    if (penIsActive && rnd < penDensity && distance(uv, mouseUv) < scaledPenRadius) {
        gl_FragColor = vec4(0.0, 1.0, 0, 1);
    } else if (eraserIsActive && rnd < penDensity && distance(uv, mouseUv) < scaledPenRadius) {
        gl_FragColor = vec4(1.0, 0.0, 0, 1);
    } else if (pauseSimulation) {
        gl_FragColor = vec4(A, B, 0, 1);
    } else {
        gl_FragColor = vec4(newA, newB, 0, 1);
    }
}
`,Mt=`precision mediump float;

uniform vec2 mousePosition; // in range [0, 1] on the zoomed screen
uniform float zoomLevel;    // 1 full size, 0 max zoom
uniform vec2 pan;   // in range [0, 1], [0, 0]  is bottom left, [1, 1] top right
uniform float penRadius;

attribute vec2 position;

varying vec2 uv;
varying vec2 mouseUv;
varying float scaledPenRadius;

void main() {
    uv = 0.5 * (position + 1.0);
    mouseUv = (mousePosition * zoomLevel) + pan * (1.0 - zoomLevel);
    scaledPenRadius = penRadius * zoomLevel;
    gl_Position = vec4(position, 0, 1);
}
`;let Je;const Kt=(t,o)=>{const e=n=>t.prop(n);Je=t({frag:Ft,vert:Mt,attributes:{position:[-4,-4,4,-4,0,4]},count:3,framebuffer:e("outputBuffer"),uniforms:{prevState:e("inputBuffer"),Da:1,Db:.5,f:e("f"),k:e("k"),radius:o,pauseSimulation:e("pauseSimulation"),mousePosition:e("mousePosition"),penRadius:e("penRadius"),penDensity:e("penDensity"),penIsActive:e("penIsActive"),eraserIsActive:e("eraserIsActive"),zoomLevel:e("zoomLevel"),pan:e("pan")}})},Ht=t=>{const{inputBuffer:o,outputBuffer:e,pauseSimulation:n,mouseState:r,simulationParameters:a,worldSize:i}=t;Je({inputBuffer:o,outputBuffer:e,pauseSimulation:n,zoomLevel:r.zoomLevel,pan:[r.panX,r.panY],mousePosition:[r.x,r.y],penRadius:1/2**(i-r.penSize),penDensity:r.penDensity,penIsActive:r.pressedLeft,eraserIsActive:r.pressedRight,...a})},Yt=(t,o)=>t==="randomSpots"?Ot(o,.001):t==="middleCircleAndRandomSpots"?Vt(o,.005,.05):t==="empty"?Gt(o):Ut(o,.02),Vt=(t,o,e)=>{const n=t*e;return Array(t*t).fill(0).map((r,a)=>{const i=Math.floor(a/t),l=a%t;return Math.hypot(t/2-l,t/2-i)<n?[0,1,0,1]:Math.random()<o?[0,1,0,1]:[1,0,0,1]}).flat()},Gt=t=>Array(t*t).fill(0).map(()=>[0,0,0,1]).flat(),Ot=(t,o)=>Array(t*t).fill(0).map(()=>Math.random()<o?[0,1,0,1]:[1,0,0,1]).flat(),Ut=(t,o)=>Array(t*t).fill(0).map((e,n)=>{const r=Math.floor(n/t),a=n%t;return Math.hypot(t/2-a,t/2-r)<o*t?[0,1,0,1]:[1,0,0,1]}).flat(),Wt=`precision highp float;

attribute vec2 position;

uniform float zoomLevel;    // 1 full size, 0 max zoom
uniform vec2 pan;   // in range [0, 1], [0, 0]  is bottom left, [1, 1] top right

varying vec2 uv;

void main() {
    uv = 0.5 * (position + 1.0) * zoomLevel + pan * (1.0 - zoomLevel);
    gl_Position = vec4(position, 0, 1);
}
`,qt=`precision highp float;

uniform sampler2D prevState;

varying vec2 uv;

void main() {
    vec4 color = texture2D(prevState, uv);

    float division = 10.0;
    float column = mod(uv.x, 1.0 / division);
    float c = column * division;

    float row = mod(uv.y, 1.0 / division);
    float r = row * division;

    // I haven't found a way to compare the value to an exact value
    // Might be a precision issue, or just that I'm missing something
    if (c < 0.05 || r < 0.05) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    } else {
       gl_FragColor = color;
    }
}
`;let Qe;const Xt=t=>{const o=e=>t.prop(e);Qe=t({vert:Wt,frag:qt,attributes:{position:[[1,-1],[-1,-1],[1,1],[1,1],[-1,-1],[-1,1]]},count:6,framebuffer:o("outputBuffer"),uniforms:{prevState:o("inputBuffer"),zoomLevel:o("zoomLevel"),pan:o("pan")}})},Nt=t=>{const{inputBuffer:o,outputBuffer:e,zoomState:n}=t;Qe({inputBuffer:o,outputBuffer:e,zoomLevel:n.zoomLevel,pan:[n.panX,n.panY]})},jt=`precision mediump float;

uniform vec2 mousePosition; // in range [0, 1] on the zoomed screen
uniform float zoomLevel;    // 1 full size, 0 max zoom
uniform vec2 pan;   // in range [0, 1], [0, 0]  is bottom left, [1, 1] top right

attribute vec2 position;

varying vec2 uv;

void main() {
    uv = 0.5 * (position + 1.0);
    gl_Position = vec4(position, 0, 1);
}
`,Zt=`precision mediump float;

uniform sampler2D prevState;
uniform vec2 mousePosition;
uniform float penRadius;

varying vec2 uv;

void main() {
    vec4 color = texture2D(prevState, uv);

    float d = distance(uv, mousePosition);
    if (
        (d >= penRadius && d <= penRadius + 0.001) ||
        (uv.x >= mousePosition.x - 0.001 && uv.x <= mousePosition.x + 0.001 && uv.y >= mousePosition.y - 0.01 && uv.y <= mousePosition.y + 0.01) ||
        (uv.x >= mousePosition.x - 0.01 && uv.x <= mousePosition.x + 0.01 && uv.y >= mousePosition.y - 0.001 && uv.y <= mousePosition.y + 0.001))
    {
        gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
    } else {
        gl_FragColor = color;
    }
}
`;let et;const Jt=t=>{const o=e=>t.prop(e);et=t({frag:Zt,vert:jt,attributes:{position:[[1,-1],[-1,-1],[1,1],[1,1],[-1,-1],[-1,1]]},count:6,framebuffer:o("outputBuffer"),uniforms:{mousePosition:o("mousePosition"),penRadius:o("penRadius"),zoomLevel:o("zoomLevel"),pan:o("pan"),prevState:o("inputBuffer")}})},Qt=t=>{const{inputBuffer:o,mouseState:e,outputBuffer:n,worldSize:r}=t;et({inputBuffer:o,outputBuffer:n,mousePosition:[e.x,e.y],penRadius:1/2**(r-e.penSize),zoomLevel:e.zoomLevel,pan:[e.panX,e.panY]})},tt=t=>{const{controls:o,info:e,mouseState:n,simulationParameters:r}=t,a=document.getElementById("canvas");if(!a)throw new Error("Canvas container not ready");const i=ye({extensions:["OES_texture_float"],canvas:a});e.iteration=0;const l=2**e.worldSize,m=Yt(o.initialConditions,l),g=()=>i.framebuffer({color:i.texture({radius:l,data:m,wrap:"repeat",type:"float"}),depthStencil:!1}),y=Array(2).fill(0).map(g),C=Array(2).fill(0).map(g);return Kt(i,l),Pt(i),Xt(i),Jt(i),i.frame(()=>{o.pause||e.iteration++;let d=y[(e.iteration+1)%2];for(let E=0;E<o.speed;E++){e.iteration++;const D=y[e.iteration%2];d=y[(e.iteration+1)%2],Ht({inputBuffer:D,outputBuffer:d,worldSize:e.worldSize,pauseSimulation:o.pause,mouseState:n,simulationParameters:r})}e0({inputTexture:d,graphicsTextures:C,controls:o,info:e,mouseState:n})}),i},e0=t=>{const{inputTexture:o,graphicsTextures:e,controls:n,info:r,mouseState:a}=t;let i=0;i++;const l=o;let m=e[i%2];if(!n.grid&&!n.pen&&(m=null),It({colorMode:n.colors,inputBuffer:l,iteration:r.iteration,outputBuffer:m,zoomState:a}),n.grid){i++;const g=e[(i+1)%2];let y=e[i%2];n.pen||(y=null),Nt({inputBuffer:g,outputBuffer:y,zoomState:a})}if(n.pen){i++;const g=e[(i+1)%2];Qt({mouseState:a,worldSize:r.worldSize,inputBuffer:g,outputBuffer:null})}};var t0=U('<main><!> <div id="datgui-container" class="svelte-1t8eqx3"></div> <div><label for="worldSize">World Size:</label> <input id="worldSize" type="number" step="1"/> <span> </span></div> <canvas id="canvas" class="svelte-1t8eqx3"></canvas></main>');function n0(t,o){oe(o,!0);const e={width:Math.min(window.innerWidth,window.innerHeight)*.9,height:Math.min(window.innerWidth,window.innerHeight)*.9},n={colors:"A_transform_seismic",initialConditions:"middleCircleAndRandomSpots",reset:()=>E(),pause:!1,grid:!1,pen:!1,speed:50},r={pressedLeft:!1,pressedRight:!1,x:0,y:0,penSize:3,penDensity:.3,zoomLevel:1,panX:.5,panY:.5},a=de({iteration:0,worldSize:8}),i={f:fe[0].f,k:fe[0].k};let l,m;const g=async()=>{const c=await he(()=>import("../chunks/QkjeJdyK.js"),[],import.meta.url);l=new c.GUI({autoPlace:!1,closeOnTop:!0}),l.domElement.id="datgui";const p=document.getElementById("datgui-container");if(!p)throw new Error("Gui container not ready");p.appendChild(l.domElement),l.add(n,"pause").name("Pause"),l.add(n,"grid").name("Debug grid"),l.add(n,"pen").name("Show pen"),l.add(n,"reset").name("Reset simulation"),l.add(n,"colors",["grayscale","blackwhite","whiteblack","raw","timebasedblue","lerp","mrob","redblue","A_gradiant1","A_gradiant2","A_MATLAB_cool","A_MATLAB_parula","A_IDL_CB_RdBu","A_IDL_CB_RdYiBu","A_IDL_CB_BuYiRd","A_transform_seismic","B_IDL_CB_RdYiBu"]).name("Color scheme");const P={"Random spots":"randomSpots","Middle spot":"middleSpot","Middle + random":"middleCircleAndRandomSpots",Empty:"empty"};l.add(n,"initialConditions",P).onFinishChange(n.reset).name("Initial conditions");const u=l.add(a,"iteration").listen();u.domElement.style.pointerEvents="none",l.add(n,"speed",1,200).name("Simulation speed").listen(),l.add(r,"penSize",0,a.worldSize).name("Pen size").listen(),l.add(r,"penDensity",0,1).name("Pen density"),l.add(r,"zoomLevel",0,1).name("Zoom level").listen(),l.add(r,"panX",0,1).name("pan x").listen(),l.add(r,"panY",0,1).name("pan y").listen()},y=c=>{if(c.code==="Space"){n.pause=!n.pause,c.preventDefault();return}if(c.code==="KeyR"&&!c.getModifierState("Control")){E(),c.preventDefault();return}};let C;const d=()=>{r.x=Math.random(),r.y=Math.random(),r.penSize=Math.random()*3,r.pressedLeft=!0,setTimeout(()=>r.pressedLeft=!1,500),C=setTimeout(d,Math.random()*5e3)},E=()=>{isNaN(a.worldSize)||(a.worldSize>11&&(a.worldSize=11),a.worldSize<1&&(a.worldSize=1),l&&(document.getElementById(l.domElement.id)?.remove(),l.destroy()),m?.destroy(),g(),m=tt({controls:n,info:a,mouseState:r,simulationParameters:i}),C&&clearTimeout(C),d())},D=c=>{i.f=c.f,i.k=c.k,i.f>.06?n.speed=70:i.f>.03?n.speed=50:n.speed=2};pe(()=>{E()}),se(()=>{l.destroy(),m.destroy()});var T=t0();me("keydown",$e,y);var _=O(T);xt(_,{onfkupdated:D});var k=h(_,4),B=h(O(k),2);Le(B);var b=h(B,2),$=O(b);K(b),K(k);var I=h(k,2),s=Xe(()=>Ze(c=>c));K(T),ee(()=>{ae($,`(${2**a.worldSize} x ${2**a.worldSize} : ${2**(a.worldSize+1)})`),L(I,"width",e.width),L(I,"height",e.height)}),Y("change",B,E),Te(B,()=>a.worldSize,c=>a.worldSize=c),Y("contextmenu",I,function(...c){w(s)?.apply(this,c)}),V(t,T),re()}ue(["change","contextmenu"]);var o0=U("<option> </option>"),r0=U('<div>Select f and k parameters on the map of use a preset</div> <select class="full-width svelte-oovm3e"></select> <!>',1),a0=U('<div id="container"><button class="full-width svelte-oovm3e" id="toggleButton"> </button> <!></div>');function i0(t,o){oe(o,!0);let e=le(de(fe[0])),n=le(!0);const r=[0,.12],a=[.03,.07],i=s=>{const{f:c,k:p}=s,P=d.map(p,a[0],a[1],0,d.width),u=d.map(c,r[0],r[1],d.height,0);return{x:P,y:u}},l=s=>{const{x:c,y:p}=s,P=d.map(p,d.height,0,r[0],r[1]),u=d.map(c,0,d.width,a[0],a[1]);return{f:P,k:u}},m=s=>{const c=s.mouseX,p=s.mouseY;if(c<0||p<0||c>s.width||p>s.height)return;const{f:P,k:u}=l({x:s.mouseX,y:s.mouseY});Q(e,{f:P,k:u,name:"custom",type:"manual"},!0),o.onfkupdated?.(w(e))},g=s=>{s.noStroke();const c=s.textSize();for(const p of fe){const{x:P,y:u}=i({f:p.f,k:p.k}),v=p.f===w(e).f&&p.k===w(e).k;s.circle(P,u,3),s.textSize(v?c*2:c),s.fill(v?[240,240,150]:[255,255,255]),s.text(p.name,P-s.textWidth(p.name)/2,u-10)}},y=s=>{s.noFill(),s.stroke("red");const{x:c,y:p}=i(w(e));s.text("F",10,p>10?p-5:p+15),s.line(0,p,s.width,p),s.text("K",c<s.width-10?c+5:c-15,s.height-10),s.line(c,0,c,s.height),s.circle(c,p,10)},C=s=>{const{f:c,k:p}=w(e),P=`F: ${c.toFixed(4)}`,u=`K: ${p.toFixed(4)}`,v=s.textSize(),A=s.height*.05;s.textStyle(s.BOLD),s.textSize(A),s.fill("white"),s.stroke(0),s.strokeWeight(1),s.text(P,s.width*.05,s.textSize()),s.text(u,s.width*.05,s.textSize()+s.textSize()+6),s.textStyle(s.NORMAL),s.textSize(v)};let d,E=le(!1);const D=s=>{d=s;let c;s.preload=()=>{c=s.loadImage(F+"/parameters_map.png")},s.setup=()=>{s.createCanvas(400,400),s.frameRate(55)},s.draw=()=>{s.background(255),s.tint(150,190),s.image(c,0,0,s.width,s.height),g(s),y(s),C(s),Q(E,!1),s.mouseIsPressed&&(m(s),Q(E,!0))}},T=()=>{Q(n,!w(n)),w(n)||d.remove()};se(()=>d?.remove());var _=a0();let k;var B=O(_),b=O(B,!0);K(B);var $=h(B,2);{var I=s=>{var c=r0(),p=h(ce(c),2);Ce(p,21,()=>fe,ze,(u,v)=>{var A=o0(),R=O(A);K(A);var M={};ee(()=>{ae(R,`${w(v).type??""} - ${w(v).name??""} (f/k ${w(v).f??""} / ${w(v).k??""})`),M!==(M=w(v))&&(A.value=(A.__value=w(v))??"")}),V(u,A)}),K(p);var P=h(p,2);ge(P,{sketch:D}),Y("change",p,()=>o.onfkupdated?.(w(e))),Fe(p,()=>w(e),u=>Q(e,u)),V(s,c)};Pe($,s=>{w(n)&&s(I)})}K(_),ee(()=>{k=Re(_,1,"svelte-oovm3e",null,k,{"no-cursor":w(E)}),ae(b,w(n)?"Close":"F/K selection")}),Y("click",B,T),V(t,_),re()}ue(["click","change"]);const Me=t=>{if(!t.currentTarget)throw new Error("Event has no currentTarget");const o=t.currentTarget,e=o.getBoundingClientRect(),n=t.clientX-e.left,r=t.clientY-e.top,{width:a,height:i}=o,l=n/a,m=(i-r)/i;return{x:l,y:m}};var l0=U('<main class="svelte-1jpwm26"><!> <div id="datgui-container" class="svelte-1jpwm26"></div> <div><label for="worldSize">World Size:</label> <input id="worldSize" type="number" step="1"/> <span> </span></div> <canvas id="canvas" class="svelte-1jpwm26"></canvas></main>');function s0(t,o){oe(o,!0);const e={width:Math.min(window.innerWidth,window.innerHeight)*.9,height:Math.min(window.innerWidth,window.innerHeight)*.9},n={colors:"A_transform_seismic",initialConditions:"middleCircleAndRandomSpots",reset:()=>D(),pause:!1,grid:!1,pen:!0,speed:50},r={pressedLeft:!1,pressedRight:!1,x:0,y:0,penSize:3,penDensity:.3,zoomLevel:1,panX:.5,panY:.5},a=de({iteration:0,worldSize:8}),i={f:fe[0].f,k:fe[0].k};let l,m;const g=async()=>{const c=await he(()=>import("../chunks/QkjeJdyK.js"),[],import.meta.url);l=new c.GUI({autoPlace:!1,closeOnTop:!0}),l.domElement.id="datgui";const p=document.getElementById("datgui-container");if(!p)throw new Error("Gui container not ready");p.appendChild(l.domElement),l.add(n,"pause").name("Pause"),l.add(n,"grid").name("Debug grid"),l.add(n,"pen").name("Show pen"),l.add(n,"reset").name("Reset simulation"),l.add(n,"colors",["grayscale","blackwhite","whiteblack","raw","timebasedblue","lerp","mrob","redblue","A_gradiant1","A_gradiant2","A_MATLAB_cool","A_MATLAB_parula","A_IDL_CB_RdBu","A_IDL_CB_RdYiBu","A_IDL_CB_BuYiRd","A_transform_seismic","B_IDL_CB_RdYiBu"]).name("Color scheme");const P={"Random spots":"randomSpots","Middle spot":"middleSpot","Middle + random":"middleCircleAndRandomSpots",Empty:"empty"};l.add(n,"initialConditions",P).onFinishChange(n.reset).name("Initial conditions");const u=l.add(a,"iteration").listen();u.domElement.style.pointerEvents="none",l.add(n,"speed",1,200).name("Simulation speed"),l.add(r,"penSize",0,a.worldSize).name("Pen size"),l.add(r,"penDensity",0,1).name("Pen density"),l.add(r,"zoomLevel",0,1).name("Zoom level").listen(),l.add(r,"panX",0,1).name("pan x").listen(),l.add(r,"panY",0,1).name("pan y").listen()},y=c=>{if(c.code==="Space"){n.pause=!n.pause,c.preventDefault();return}if(c.code==="KeyR"&&!c.getModifierState("Control")){D(),c.preventDefault();return}},C=c=>{if(!c.getModifierState("Control"))return;const p=Me(c);r.panX=p.x,r.panY=p.y,c.deltaY>0?r.zoomLevel*=1+r.zoomLevel/2:r.zoomLevel*=1-r.zoomLevel/2,r.zoomLevel>1&&(r.zoomLevel=1),r.zoomLevel<0&&(r.zoomLevel=0),c.preventDefault()},d=c=>{const p=Me(c);r.x=p.x,r.y=p.y},E=c=>{if(![0,2].includes(c.button)||!["mouseup","mousedown"].includes(c.type))return;let p=c.type==="mousedown";c.button===0&&(r.pressedLeft=p),c.button===2&&(r.pressedRight=p)},D=()=>{isNaN(a.worldSize)||(a.worldSize>11&&(a.worldSize=11),a.worldSize<1&&(a.worldSize=1),l&&(document.getElementById(l.domElement.id)?.remove(),l.destroy()),m?.destroy(),g(),m=tt({controls:n,info:a,mouseState:r,simulationParameters:i}))},T=c=>{i.f=c.f,i.k=c.k};pe(()=>{D()}),se(()=>{l.destroy(),m.destroy()});var _=l0();me("keydown",$e,y);var k=O(_);i0(k,{onfkupdated:T});var B=h(k,4),b=h(O(B),2);Le(b);var $=h(b,2),I=O($);K($),K(B);var s=h(B,2);K(_),ee(()=>{ae(I,`(${2**a.worldSize} x ${2**a.worldSize} : ${2**(a.worldSize+1)})`),L(s,"width",e.width),L(s,"height",e.height)}),Y("change",b,D),Te(b,()=>a.worldSize,c=>a.worldSize=c),Y("mousemove",s,d),Y("mousedown",s,c=>{c.preventDefault(),E(c)}),Y("mouseup",s,E),me("wheel",s,C),Y("keydown",s,c=>{c.preventDefault(),y(c)}),Y("contextmenu",s,c=>c.preventDefault()),V(t,_),re()}ue(["change","mousemove","mousedown","mouseup","keydown","contextmenu"]);const c0=`precision mediump float;
attribute vec2 position;
varying vec2 uv;

void main() {
    uv = 0.5 * (position + 1.0);
    gl_Position = vec4(position, 0, 1);
}
`,u0=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    gl_FragColor = vec4(A, B, 0.0, 1.0);
}

`,f0=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float PI = 3.14159265359;
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    float val = sin(iteration*PI/180.0);
    if (val < 0.0) {
        val = -1.0 * val;
    }
    gl_FragColor = vec4(A, B, val, 1.0);
}
`,m0=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    float val = (A + B) / 2.0;

    gl_FragColor = vec4(val, val, val, 1.0);
}

`,d0=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    float val = (1.0 + A - B) / 2.0;

    gl_FragColor = vec4(1.0 - val, 1.0 - val, 1.0 - val, 1.0);
}
`,p0=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    float val = (1.0 + A - B) / 2.0;

    gl_FragColor = vec4(val, val, val, 1.0);
}
`,v0=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

// All components are in the range [0...1], including hue. (https://stackoverflow.com/a/17897228)
vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

// All components are in the range [0...1], including hue. (https://stackoverflow.com/a/17897228)
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    // vec3 color1 = vec3(1.0, 0.0, 0.0);
    // vec3 color2 = vec3(0.0, 1.0, 0.0);
    // vec3 result = color1 * A + color2 * B;

    vec3 color1RGB = vec3(0.639, 0.941, 0.717);
    vec3 color2RGB = vec3(0.929, 0.082, 0.705);

    vec3 color1HSV = rgb2hsv(color1RGB);
    vec3 color2HSV = rgb2hsv(color2RGB);

    float color1Offset = (cos(iteration * 0.001) + 1.0) * 0.5;
    float color1newH = 0.5 * (color1HSV.x + color1Offset);
    vec3 color1newHSV = vec3(color1newH, color1HSV.g, color1HSV.b);

    float color2Offset = (cos(iteration * 0.002)) * 0.5;
    float color2newH = 0.5 * (color2HSV.x + color2Offset + 0.33);
    vec3 color2newHSV = vec3(color2newH, color2HSV.g, color2HSV.b);


    vec3 resultHSV = color1newHSV * A + color2newHSV * B;
    vec3 result = hsv2rgb(resultHSV);

    gl_FragColor = vec4(result, 1.0);
}
`,x0=`// Colors scheme inspired by Robert Munafo described here:
// https://www.mrob.com/pub/comp/xmorphia/index.html
// 
// A is blue
// B is red

precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    float red = A; // The more A the redder
    float blue = 1.0 - A; // The less A the bleuer

    float green = max(A, B) - min(A, B);

    vec3 result = vec3(red, green, blue);

    gl_FragColor = vec4(result, 1.0);
}
`,h0=`// Colors scheme inspired by Robert Munafo described here:
// https://www.mrob.com/pub/comp/xmorphia/index.html
// 
// A is blue
// B is red

precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec3 color1 = vec3(0.0, 0.0, 1.0);
    vec3 color2 = vec3(1.0, 0.0, 0.0);
    vec3 result = vec3(A, 0.0, 1.0-A);

    gl_FragColor = vec4(result, 1.0);
}
`,g0=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    if (A > 0.9) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    } else if (A > 0.4) {
        gl_FragColor = vec4(1.0 - A, 0.0, 0.0, 1.0);
    } else { 
        gl_FragColor = vec4(0.0, A, 0.0, 1.0);
    }
}
`,y0=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec4 black = vec4(0.0, 0.0, 0.0, 1.0);

    vec4 red = vec4(1.0, 0.0, 0.0, 1.0);
    vec4 blue = vec4(0.0, 0.0, 1.0, 1.0);
    vec4 color = mix(blue, red, A);

    vec4 softRed = vec4(0.8588, 0.2824, 0.3765, 1.0);
    vec4 softBlue = vec4(0.2824, 0.3882, 0.8588, 1.0);
    // vec4 softColor = mix(blue, red, (A-0.4)/0.6);
    // vec4 softColor = mix(blue, red, (A-0.4)/0.4);
    vec4 softColor = mix(softBlue, softRed, 1.0-A);


    if (A < 0.4) {
        gl_FragColor = vec4(black);
    } else {
        gl_FragColor = vec4(color);
    }

}
`,b0=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

// https://github.com/Polymole/glsl-colormap/blob/master/shaders/MATLAB_cool.frag
float colormap_red(float x) {
    return (1.0 + 1.0 / 63.0) * x - 1.0 / 63.0;
}

float colormap_green(float x) {
    return -(1.0 + 1.0 / 63.0) * x + (1.0 + 1.0 / 63.0);
}

vec4 colormap(float x) {
    float r = clamp(colormap_red(x), 0.0, 1.0);
    float g = clamp(colormap_green(x), 0.0, 1.0);
    float b = 1.0;
    return vec4(r, g, b, 1.0);
}

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec4 black = vec4(0.0, 0.0, 0.0, 1.0);

    vec4 softColor = colormap((A-0.4)*(1.0/0.6));


    if (A < 0.4) {
        gl_FragColor = vec4(black);
    } else {
        gl_FragColor = vec4(softColor);
    }

}
`,w0=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

// https://github.com/Polymole/glsl-colormap/blob/master/shaders/IDL_CB-RdBu.frag
float colormap_red(float x) {
	if (x < 0.09771832105856419) {
		return 7.60263247863246E+02 * x + 1.02931623931624E+02;
	} else if (x < 0.3017162107441106) {
		return (-2.54380938558548E+02 * x + 4.29911571188803E+02) * x + 1.37642085716717E+02;
	} else if (x < 0.4014205790737471) {
		return 8.67103448276151E+01 * x + 2.18034482758611E+02;
	} else if (x < 0.5019932233215039) {
		return -6.15461538461498E+01 * x + 2.77547692307680E+02;
	} else if (x < 0.5969483882550937) {
		return -3.77588522588624E+02 * x + 4.36198819698878E+02;
	} else if (x < 0.8046060096654594) {
		return (-6.51345897546620E+02 * x + 2.09780968434337E+02) * x + 3.17674951640855E+02;
	} else {
		return -3.08431855203590E+02 * x + 3.12956742081421E+02;
	}
}

float colormap_green(float x) {
	if (x < 0.09881640500975222) {
		return 2.41408547008547E+02 * x + 3.50427350427364E-01;
	} else if (x < 0.5000816285610199) {
		return ((((1.98531871433258E+04 * x - 2.64108262469187E+04) * x + 1.10991785969817E+04) * x - 1.92958444776211E+03) * x + 8.39569642882186E+02) * x - 4.82944517518776E+01;
	} else if (x < 0.8922355473041534) {
		return (((6.16712686949223E+03 * x - 1.59084026055125E+04) * x + 1.45172137257997E+04) * x - 5.80944127411621E+03) * x + 1.12477959061948E+03;
	} else {
		return -5.28313797313699E+02 * x + 5.78459299959206E+02;
	}
}

float colormap_blue(float x) {
	if (x < 0.1033699568661857) {
		return 1.30256410256410E+02 * x + 3.08518518518519E+01;
	} else if (x < 0.2037526071071625) {
		return 3.38458128078815E+02 * x + 9.33004926108412E+00;
	} else if (x < 0.2973267734050751) {
		return (-1.06345054944861E+02 * x + 5.93327252747168E+02) * x - 3.81852747252658E+01;
	} else if (x < 0.4029109179973602) {
		return 6.68959706959723E+02 * x - 7.00740740740798E+01;
	} else if (x < 0.5006715489526758) {
		return 4.87348695652202E+02 * x + 3.09898550724286E+00;
	} else if (x < 0.6004396902588283) {
		return -6.85799999999829E+01 * x + 2.81436666666663E+02;
	} else if (x < 0.702576607465744) {
		return -1.81331701891043E+02 * x + 3.49137263626287E+02;
	} else if (x < 0.9010407030582428) {
		return (2.06124143164576E+02 * x - 5.78166906665595E+02) * x + 5.26198653917172E+02;
	} else {
		return -7.36990769230737E+02 * x + 8.36652307692262E+02;
	}
}

vec4 colormap(float x) {
	float r = clamp(colormap_red(x) / 255.0, 0.0, 1.0);
	float g = clamp(colormap_green(x) / 255.0, 0.0, 1.0);
	float b = clamp(colormap_blue(x) / 255.0, 0.0, 1.0);
	return vec4(r, g, b, 1.0);
}

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec4 black = vec4(0.0, 0.0, 0.0, 1.0);

    vec4 softColor = colormap((A-0.4)*(1.0/0.6));


    if (A < 0.4) {
        gl_FragColor = vec4(black);
    } else {
        gl_FragColor = vec4(softColor);
    }

}
`,_0=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

// https://github.com/Polymole/glsl-colormap/blob/master/shaders/IDL_CB-RdYiBu.frag
float colormap_red(float x) {
	if (x < 0.09790863520700754) {
		return 5.14512820512820E+02 * x + 1.64641025641026E+02;
	} else if (x < 0.2001887081633112) {
		return 2.83195402298854E+02 * x + 1.87288998357964E+02;
	} else if (x < 0.3190117539655621) {
		return 9.27301587301214E+01 * x + 2.25417989417999E+02;
	} else if (x < 0.500517389125164) {
		return 255.0;
	} else if (x < 0.6068377196788788) {
		return -3.04674876847379E+02 * x + 4.07495073891681E+02;
	} else if (x < 0.9017468988895416) {
		return (1.55336390191951E+02 * x - 7.56394659038288E+02) * x + 6.24412733169483E+02;
	} else {
		return -1.88350769230735E+02 * x + 2.38492307692292E+02;
	}
}

float colormap_green(float x) {
	if (x < 0.09638568758964539) {
		return 4.81427692307692E+02 * x + 4.61538461538488E-01;
	} else if (x < 0.4987066686153412) {
		return ((((3.25545903568267E+04 * x - 4.24067109461319E+04) * x + 1.83751375886345E+04) * x - 3.19145329617892E+03) * x + 8.08315127034676E+02) * x - 1.44611527812961E+01;
	} else if (x < 0.6047312345537269) {
		return -1.18449917898218E+02 * x + 3.14234811165860E+02;
	} else if (x < 0.7067635953426361) {
		return -2.70822112753102E+02 * x + 4.06379036672115E+02;
	} else {
		return (-4.62308723214883E+02 * x + 2.42936159122279E+02) * x + 2.74203431802418E+02;
	}
}

float colormap_blue(float x) {
	if (x < 0.09982818011951204) {
		return 1.64123076923076E+01 * x + 3.72646153846154E+01;
	} else if (x < 0.2958717460833126) {
		return 2.87014675052409E+02 * x + 1.02508735150248E+01;
	} else if (x < 0.4900527540014758) {
		return 4.65475113122167E+02 * x - 4.25505279034673E+01;
	} else if (x < 0.6017014681258838) {
		return 5.61032967032998E+02 * x - 8.93789173789407E+01;
	} else if (x < 0.7015737100463595) {
		return -1.51655677655728E+02 * x + 3.39446886446912E+02;
	} else if (x < 0.8237156500567735) {
		return -2.43405347593559E+02 * x + 4.03816042780725E+02;
	} else {
		return -3.00296889157305E+02 * x + 4.50678495922638E+02;
	}
}

vec4 colormap(float x) {
	float r = clamp(colormap_red(x) / 255.0, 0.0, 1.0);
	float g = clamp(colormap_green(x) / 255.0, 0.0, 1.0);
	float b = clamp(colormap_blue(x) / 255.0, 0.0, 1.0);
	return vec4(r, g, b, 1.0);
}

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec4 black = vec4(0.0, 0.0, 0.0, 1.0);

    vec4 softColor = colormap((A-0.4)*(1.0/0.6));


    if (A < 0.4) {
        gl_FragColor = vec4(black);
    } else {
        gl_FragColor = vec4(softColor);
    }

}
`,S0=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

// https://github.com/Polymole/glsl-colormap/blob/master/shaders/IDL_CB-RdYiBu.frag
float colormap_red(float x) {
	if (x < 0.09790863520700754) {
		return 5.14512820512820E+02 * x + 1.64641025641026E+02;
	} else if (x < 0.2001887081633112) {
		return 2.83195402298854E+02 * x + 1.87288998357964E+02;
	} else if (x < 0.3190117539655621) {
		return 9.27301587301214E+01 * x + 2.25417989417999E+02;
	} else if (x < 0.500517389125164) {
		return 255.0;
	} else if (x < 0.6068377196788788) {
		return -3.04674876847379E+02 * x + 4.07495073891681E+02;
	} else if (x < 0.9017468988895416) {
		return (1.55336390191951E+02 * x - 7.56394659038288E+02) * x + 6.24412733169483E+02;
	} else {
		return -1.88350769230735E+02 * x + 2.38492307692292E+02;
	}
}

float colormap_green(float x) {
	if (x < 0.09638568758964539) {
		return 4.81427692307692E+02 * x + 4.61538461538488E-01;
	} else if (x < 0.4987066686153412) {
		return ((((3.25545903568267E+04 * x - 4.24067109461319E+04) * x + 1.83751375886345E+04) * x - 3.19145329617892E+03) * x + 8.08315127034676E+02) * x - 1.44611527812961E+01;
	} else if (x < 0.6047312345537269) {
		return -1.18449917898218E+02 * x + 3.14234811165860E+02;
	} else if (x < 0.7067635953426361) {
		return -2.70822112753102E+02 * x + 4.06379036672115E+02;
	} else {
		return (-4.62308723214883E+02 * x + 2.42936159122279E+02) * x + 2.74203431802418E+02;
	}
}

float colormap_blue(float x) {
	if (x < 0.09982818011951204) {
		return 1.64123076923076E+01 * x + 3.72646153846154E+01;
	} else if (x < 0.2958717460833126) {
		return 2.87014675052409E+02 * x + 1.02508735150248E+01;
	} else if (x < 0.4900527540014758) {
		return 4.65475113122167E+02 * x - 4.25505279034673E+01;
	} else if (x < 0.6017014681258838) {
		return 5.61032967032998E+02 * x - 8.93789173789407E+01;
	} else if (x < 0.7015737100463595) {
		return -1.51655677655728E+02 * x + 3.39446886446912E+02;
	} else if (x < 0.8237156500567735) {
		return -2.43405347593559E+02 * x + 4.03816042780725E+02;
	} else {
		return -3.00296889157305E+02 * x + 4.50678495922638E+02;
	}
}

vec4 colormap(float x) {
	float r = clamp(colormap_red(x) / 255.0, 0.0, 1.0);
	float g = clamp(colormap_green(x) / 255.0, 0.0, 1.0);
	float b = clamp(colormap_blue(x) / 255.0, 0.0, 1.0);
	return vec4(r, g, b, 1.0);
}

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec4 black = vec4(0.0, 0.0, 0.0, 1.0);

    vec4 softColor = colormap((B-0.1)*(1.0/0.9));


    if (B < 0.1) {
        gl_FragColor = vec4(black);
    } else {
        gl_FragColor = vec4(softColor);
    }

}
`,ne={},E0=t=>{const o=n=>t.prop(n),e={vert:c0,attributes:{position:[[1,-1],[-1,-1],[1,1],[1,1],[-1,-1],[-1,1]]},count:6,framebuffer:o("outputBuffer"),uniforms:{iteration:o("iteration"),prevState:o("inputBuffer")}};ne.raw=t({frag:u0,...e}),ne.A_gradiant1=t({frag:g0,...e}),ne.A_gradiant2=t({frag:y0,...e}),ne.A_MATLAB_cool=t({frag:b0,...e}),ne.A_IDL_CB_RdBu=t({frag:w0,...e}),ne.A_IDL_CB_RdYiBu=t({frag:_0,...e}),ne.B_IDL_CB_RdYiBu=t({frag:S0,...e}),ne.grayscale=t({frag:m0,...e}),ne.blackwhite=t({frag:d0,...e}),ne.whiteblack=t({frag:p0,...e}),ne.timebasedblue=t({frag:f0,...e}),ne.lerp=t({frag:v0,...e}),ne.mrob=t({frag:x0,...e}),ne.redblue=t({frag:h0,...e})},k0=t=>{const{colorMode:o,inputBuffer:e,iteration:n,outputBuffer:r,zoomState:a}=t;(ne[o]||ne.raw)({inputBuffer:e,iteration:n,outputBuffer:r,pan:[a.panX,a.panY],zoomLevel:a.zoomLevel})},A0=`precision mediump float;

uniform float radius;
uniform sampler2D prevState;
uniform bool pauseSimulation;
uniform float Da;
uniform float Db;

varying vec2 v_fk;

uniform bool penIsActive;
uniform bool eraserIsActive;
uniform float penDensity;

varying vec2 uv;
varying vec2 mouseUv;
varying float scaledPenRadius;

// https://thebookofshaders.com/10/
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}

vec2 laplacianDiff() {
    vec2 r = vec2(0.0, 0.0);

    // top left
    r += texture2D(prevState, uv+vec2(-1,-1)/float(radius)).rg * 0.05;
    // top
    r += texture2D(prevState, uv+vec2(0,-1)/float(radius)).rg * 0.2;
    // top right
    r += texture2D(prevState, uv+vec2(1,-1)/float(radius)).rg * 0.05;

    // left
    r += texture2D(prevState, uv+vec2(-1,0)/float(radius)).rg * 0.2;
    // middle
    r += texture2D(prevState, uv+vec2(0,0)/float(radius)).rg * -1.0;
    // right
    r += texture2D(prevState, uv+vec2(1,0)/float(radius)).rg * 0.2;

    // bottom left
    r += texture2D(prevState, uv+vec2(-1,1)/float(radius)).rg * 0.05;
    // bottom
    r += texture2D(prevState, uv+vec2(0,1)/float(radius)).rg * 0.2;
    // bottom right
    r += texture2D(prevState, uv+vec2(1,1)/float(radius)).rg * 0.05;

    return r;
}

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec2 L = laplacianDiff();
    float La = L.r;
    float Lb = L.g;

    float f = v_fk.x;
    float k = v_fk.y;

    float newA = A + ((Da * La) - (A * B * B) + (f * (1.0 - A)));
    float newB = B + ((Db * Lb) + (A * B * B) - ((k + f) * B));


    float rnd = random(uv);
    if (penIsActive && rnd < penDensity && distance(uv, mouseUv) < scaledPenRadius) {
        gl_FragColor = vec4(0.0, 1.0, 0, 1);
    } else if (pauseSimulation) {
        gl_FragColor = vec4(A, B, 0, 1);
    } else {
        gl_FragColor = vec4(newA, newB, 0, 1);
    }
}
`,D0=`precision mediump float;

uniform vec2 mousePosition; // in range [0, 1] on the zoomed screen
uniform float penRadius;

attribute vec2 position;
attribute vec2 fk;

varying vec2 uv;
varying vec2 mouseUv;
varying float scaledPenRadius;
varying vec2 v_fk;

void main() {
    uv = 0.5 * (position + 1.0);
    v_fk = fk;
    mouseUv = mousePosition;
    scaledPenRadius = penRadius;
    gl_Position = vec4(position, 0, 1);
}
`;let nt;const B0=(t,o)=>{const e=n=>t.prop(n);nt=t({frag:A0,vert:D0,attributes:{position:[[1,-1],[-1,-1],[1,1],[1,1],[-1,-1],[-1,1]],fk:(n,r)=>{const{maxF:a,minF:i,maxK:l,minK:m}=r.simulationParameters;return[[i,l],[i,m],[a,l],[a,l],[i,m],[a,m]]}},count:6,framebuffer:e("outputBuffer"),uniforms:{prevState:e("inputBuffer"),Da:1,Db:.5,radius:o,pauseSimulation:e("pauseSimulation"),mousePosition:e("mousePosition"),penRadius:e("penRadius"),penDensity:e("penDensity"),penIsActive:e("penIsActive")}})},C0=t=>{const{inputBuffer:o,outputBuffer:e,simulationParameters:n,pauseSimulation:r,mouseState:a,worldSize:i}=t;nt({inputBuffer:o,outputBuffer:e,pauseSimulation:r,zoomLevel:a.zoomLevel,pan:[a.panX,a.panY],mousePosition:[a.x,a.y],penRadius:1/2**(i-a.penSize),penDensity:a.penDensity,penIsActive:a.pressedLeft,eraserIsActive:a.pressedRight,simulationParameters:n})},z0=(t,o)=>t==="randomSpots"?L0(o,.001):t==="middleCircleAndRandomSpots"?$0(o,.005,.05):t==="empty"||t==="full"?Ke(o):T0(o,.02),$0=(t,o,e)=>{const n=t*e;return Array(t*t).fill(0).map((r,a)=>{const i=Math.floor(a/t),l=a%t;return Math.hypot(t/2-l,t/2-i)<n?[0,1,0,1]:Math.random()<o?[0,1,0,1]:[1,0,0,1]}).flat()},Ke=t=>Array(t*t).fill(0).map(()=>[0,0,0,1]).flat(),L0=(t,o)=>Array(t*t).fill(0).map(()=>Math.random()<o?[0,1,0,1]:[1,0,0,1]).flat(),T0=(t,o)=>Array(t*t).fill(0).map((e,n)=>{const r=Math.floor(n/t),a=n%t;return Math.hypot(t/2-a,t/2-r)<o*t?[0,1,0,1]:[1,0,0,1]}).flat(),R0=t=>{const{controls:o,info:e,mouseState:n,simulationParameters:r}=t,a=document.getElementById("canvas");if(!a)throw new Error("Canvas container not ready");const i=ye({extensions:["OES_texture_float"],canvas:a});e.iteration=0;const l=2**e.worldSize,m=z0(o.initialConditions,l),g=()=>i.framebuffer({color:i.texture({radius:l,data:m,wrap:"repeat",type:"float"}),depthStencil:!1}),y=Array(2).fill(0).map(g);return B0(i,l),E0(i),i.frame(()=>{o.pause||e.iteration++;let C=y[(e.iteration+1)%2];for(let d=0;d<o.speed;d++){e.iteration++;const E=y[e.iteration%2];C=y[(e.iteration+1)%2],C0({inputBuffer:E,outputBuffer:C,worldSize:e.worldSize,pauseSimulation:o.pause,mouseState:n,simulationParameters:r})}k0({colorMode:o.colors,inputBuffer:C,iteration:e.iteration,outputBuffer:null,zoomState:n})}),i},He=t=>{if(!t.currentTarget)throw new Error("Event has no currentTarget");const o=t.currentTarget,e=o.getBoundingClientRect(),n=t.clientX-e.left,r=t.clientY-e.top,{width:a,height:i}=o,l=n/a,m=(i-r)/i;return{x:l,y:m}};var P0=U('<main><div id="datgui-container" class="svelte-1y55lra"></div> <div><label for="worldSize">World Size:</label> <input id="worldSize" type="number" step="1"/></div> <canvas id="canvas" class="svelte-1y55lra"></canvas></main>');function ot(t,o){oe(o,!0);const e={width:Math.min(window.innerWidth,window.innerHeight)*.9,height:Math.min(window.innerWidth,window.innerHeight)*.9},n={colors:"B_IDL_CB_RdYiBu",initialConditions:"full",reset:()=>D(),pause:!1,grid:!1,speed:10},r={pressedLeft:!1,pressedRight:!1,x:0,y:0,penSize:12,penDensity:.3,zoomLevel:1,panX:.5,panY:.5},a=de({iteration:0,worldSize:10}),i={minK:.02,maxK:.07,minF:0,maxF:.12};let l,m;const g=async()=>{const b=await he(()=>import("../chunks/QkjeJdyK.js"),[],import.meta.url);l=new b.GUI({autoPlace:!1,closeOnTop:!0}),l.domElement.id="datgui";const $=document.getElementById("datgui-container");if(!$)throw new Error("Gui container not ready");$.appendChild(l.domElement),l.add(n,"pause").name("Pause"),l.add(n,"grid").name("Debug grid"),l.add(n,"reset").name("Reset simulation"),l.add(n,"colors",["grayscale","blackwhite","whiteblack","raw","timebasedblue","lerp","mrob","redblue","A_gradiant1","A_gradiant2","A_MATLAB_cool","A_IDL_CB_RdBu","A_IDL_CB_RdYiBu","B_IDL_CB_RdYiBu"]).name("Color scheme");const I={"Random spots":"randomSpots","Middle spot":"middleSpot","Middle + random":"middleCircleAndRandomSpots",Empty:"empty",Full:"full"};l.add(n,"initialConditions",I).onFinishChange(n.reset).name("Initial conditions");const s=l.add(a,"iteration").listen();s.domElement.style.pointerEvents="none",l.add(n,"speed",1,500).name("Simulation speed"),l.add(r,"penSize",0,a.worldSize).name("Pen size"),l.add(r,"penDensity",0,1).name("Pen density"),l.add(i,"minK",0,i.maxK),l.add(i,"maxK",i.minK,1),l.add(i,"minF",0,i.maxF),l.add(i,"maxF",i.minF,1)},y=b=>{if(b.code==="Space"){n.pause=!n.pause,b.preventDefault();return}if(b.code==="KeyR"&&!b.getModifierState("Control")){D(),b.preventDefault();return}},C=b=>{if(!b.getModifierState("Control"))return;const $=He(b);r.panX=$.x,r.panY=$.y,b.deltaY>0?r.zoomLevel*=1+r.zoomLevel/2:r.zoomLevel*=1-r.zoomLevel/2,r.zoomLevel>1&&(r.zoomLevel=1),r.zoomLevel<0&&(r.zoomLevel=0),b.preventDefault()},d=b=>{const $=He(b);r.x=$.x,r.y=$.y},E=b=>{if(![0,2].includes(b.button)||!["mouseup","mousedown"].includes(b.type))return;let $=b.type==="mousedown";b.button===0&&(r.pressedLeft=$),b.button===2&&(r.pressedRight=$)},D=()=>{isNaN(a.worldSize)||(a.worldSize>12&&(a.worldSize=12),a.worldSize<1&&(a.worldSize=1),l&&(document.getElementById(l.domElement.id)?.remove(),l.destroy()),m?.destroy(),g(),m=R0({controls:n,info:a,mouseState:r,simulationParameters:i}))};pe(()=>{D(),r.pressedLeft=!0,setTimeout(()=>r.pressedLeft=!1,10)}),se(()=>{l.destroy(),m.destroy()});var T=P0();me("keydown",$e,y);var _=h(O(T),2),k=h(O(_),2);Le(k),K(_);var B=h(_,2);K(T),ee(()=>{L(B,"width",e.width),L(B,"height",e.height)}),Y("change",k,D),Te(k,()=>a.worldSize,b=>a.worldSize=b),Y("mousemove",B,d),Y("mousedown",B,b=>{b.preventDefault(),E(b)}),Y("mouseup",B,E),me("wheel",B,C),Y("keydown",B,b=>{b.preventDefault(),y(b)}),Y("contextmenu",B,b=>b.preventDefault()),V(t,T),re()}ue(["change","mousemove","mousedown","mouseup","keydown","contextmenu"]);const I0=t=>{const o=[];for(let i=0;i<t.height;i++){o.push([]);for(let l=0;l<t.width;l++)o[o.length-1].push({A:1,B:0})}const e=5,n=5,r=Math.floor(t.width/2),a=Math.floor(t.height/2);for(let i=a-n;i<a+n;i++)for(let l=r-e;l<r+e;l++)o[i][l].B=1;return o},F0=(t,o)=>{const e={width:t.width/o[0].length,height:t.height/o.length};for(let n=0;n<o.length;n++)for(let r=0;r<o[0].length;r++){const{A:a,B:i}=o[n][r];t.fill(a*255,i*255,0),t.rect(r*e.width,n*e.height,e.width,e.height)}},M0=1,K0=.5,Ye=.055,H0=.062,Y0=t=>{const o=[];for(let e=0;e<t.length;e++){o.push([]);for(let n=0;n<t[0].length;n++){const{A:r,B:a}=t[e][n],i=Ve(t,{x:n,y:e},"A"),l=Ve(t,{x:n,y:e},"B"),m=r+(M0*i-r*a*a+Ye*(1-r)),g=a+(K0*l+r*a*a-(H0+Ye)*a);o[e].push({A:m,B:g})}}return o},Ve=(t,o,e)=>{const n=V0(t,o);let r=0;for(const a of n){const{coord:i,weight:l}=a;r+=t[i.y][i.x][e]*l}return r},V0=(t,o)=>{const{x:e,y:n}=o,r=t[0].length,a=t.length,i={coord:{x:e>0?e-1:r-1,y:n>0?n-1:a-1},weight:.05},l={coord:{x:e,y:n>0?n-1:a-1},weight:.2},m={coord:{x:e<r-1?e+1:0,y:n>0?n-1:a-1},weight:.05},g={coord:{x:e>0?e-1:r-1,y:n},weight:.2},y={coord:{x:e,y:n},weight:-1},C={coord:{x:e<r-1?e+1:0,y:n},weight:.2},d={coord:{x:e>0?e-1:r-1,y:n<a-1?n+1:0},weight:.05},E={coord:{x:e,y:n<a-1?n+1:0},weight:.2},D={coord:{x:e<r-1?e+1:0,y:n<a-1?n+1:0},weight:.05};return[i,l,m,g,y,C,d,E,D]};function G0(t,o){oe(o,!1);const e={width:200,height:200};let n;const r=a=>{let i;a.setup=()=>{n=a,a.createCanvas(500,500),a.noStroke(),i=I0(e)},a.draw=()=>{a.background(0);for(let l=0;l<20;l++)i=Y0(i);F0(n,i)}};xe(),ge(t,{sketch:r}),re()}let X,Se;const O0=t=>{X=[],Se=[];for(let a=0;a<t.height;a++){X.push([]),Se.push([]);for(let i=0;i<t.width;i++)X[X.length-1].push({A:1,B:0}),Se[X.length-1].push({A:1,B:0})}const o=5,e=5,n=Math.floor(t.width/2),r=Math.floor(t.height/2);for(let a=r-e;a<r+e;a++)for(let i=n-o;i<n+o;i++)X[a][i].B=1;return X},U0=t=>{const o={width:t.width/X[0].length,height:t.height/X.length};for(let e=0;e<X.length;e++)for(let n=0;n<X[0].length;n++){const{A:r,B:a}=X[e][n];t.fill(r*255,a*255,0),t.rect(n*o.width,e*o.height,o.width,o.height)}},W0=1,q0=.5,Ge=.055,X0=.062,N0=()=>{for(let o=0;o<X.length;o++)for(let e=0;e<X[0].length;e++){const{A:n,B:r}=X[o][e],a=Oe(X,{x:e,y:o},"A"),i=Oe(X,{x:e,y:o},"B"),l=n+(W0*a-n*r*r+Ge*(1-n)),m=r+(q0*i+n*r*r-(X0+Ge)*r);Se[o][e]={A:l,B:m}}const t=X;return X=Se,Se=t,X},Oe=(t,o,e)=>{const n=j0(t,o);let r=0;for(const a of n){const{coord:i,weight:l}=a;r+=t[i.y][i.x][e]*l}return r},j0=(t,o)=>{const{x:e,y:n}=o,r=t[0].length,a=t.length,i={coord:{x:e>0?e-1:r-1,y:n>0?n-1:a-1},weight:.05},l={coord:{x:e,y:n>0?n-1:a-1},weight:.2},m={coord:{x:e<r-1?e+1:0,y:n>0?n-1:a-1},weight:.05},g={coord:{x:e>0?e-1:r-1,y:n},weight:.2},y={coord:{x:e,y:n},weight:-1},C={coord:{x:e<r-1?e+1:0,y:n},weight:.2},d={coord:{x:e>0?e-1:r-1,y:n<a-1?n+1:0},weight:.05},E={coord:{x:e,y:n<a-1?n+1:0},weight:.2},D={coord:{x:e<r-1?e+1:0,y:n<a-1?n+1:0},weight:.05};return[i,l,m,g,y,C,d,E,D]};function Z0(t,o){oe(o,!1);const e={width:200,height:200};let n;const r=a=>{a.setup=()=>{n=a,a.createCanvas(500,500),a.noStroke(),O0(e)},a.draw=()=>{for(let i=0;i<5;i++)N0();U0(n)}};xe(),ge(t,{sketch:r}),re()}let N,Ee;const J0=t=>{N=[],Ee=[];for(let a=0;a<t.height;a++){N.push([]),Ee.push([]);for(let i=0;i<t.width;i++)N[N.length-1].push({A:1,B:0}),Ee[N.length-1].push({A:1,B:0})}const o=5,e=5,n=Math.floor(t.width/2),r=Math.floor(t.height/2);for(let a=r-e;a<r+e;a++)for(let i=n-o;i<n+o;i++)N[a][i].B=1;return N},Q0=t=>{const o={width:t.width/N[0].length,height:t.height/N.length};for(let e=0;e<N.length;e++)for(let n=0;n<N[0].length;n++){const{A:r,B:a}=N[e][n];t.fill(r*255,a*255,0),t.rect(n*o.width,e*o.height,o.width,o.height)}},en=1,tn=.5,Ue=.055,nn=.062,on=()=>{for(let o=0;o<N.length;o++)for(let e=0;e<N[0].length;e++){const{A:n,B:r}=N[o][e],a=We(N,{x:e,y:o},"A"),i=We(N,{x:e,y:o},"B"),l=n+(en*a-n*r*r+Ue*(1-n)),m=r+(tn*i+n*r*r-(nn+Ue)*r);Ee[o][e]={A:l,B:m}}const t=N;return N=Ee,Ee=t,N},We=(t,o,e)=>{const n=rn(t,o);let r=0;for(const a of n){const{coord:i,weight:l}=a;r+=t[i.y][i.x][e]*l}return r},rn=(t,o)=>{const{x:e,y:n}=o,r=t[0].length,a=t.length,i={coord:{x:e>0?e-1:r-1,y:n>0?n-1:a-1},weight:.05},l={coord:{x:e,y:n>0?n-1:a-1},weight:.2},m={coord:{x:e<r-1?e+1:0,y:n>0?n-1:a-1},weight:.05},g={coord:{x:e>0?e-1:r-1,y:n},weight:.2},y={coord:{x:e,y:n},weight:-1},C={coord:{x:e<r-1?e+1:0,y:n},weight:.2},d={coord:{x:e>0?e-1:r-1,y:n<a-1?n+1:0},weight:.05},E={coord:{x:e,y:n<a-1?n+1:0},weight:.2},D={coord:{x:e<r-1?e+1:0,y:n<a-1?n+1:0},weight:.05};return[i,l,m,g,y,C,d,E,D]};function an(t,o){oe(o,!1);const e={width:200,height:200};let n;const r=a=>{a.setup=()=>{n=a,a.createCanvas(500,500),a.noStroke(),J0(e)},a.draw=()=>{for(let i=0;i<5;i++)on();Q0(n)}};xe(),ge(t,{sketch:r}),re()}var ln=U('<canvas id="canvas" class="svelte-22fe7e"></canvas>');function sn(t,o){oe(o,!1);const e={width:window.innerWidth-50,height:window.innerHeight-10},n=2**10,r=n*.05,a=Array(n*n).fill(0).map((l,m)=>{const g=Math.floor(m/n),y=m%n;return Math.hypot(n/2-y,n/2-g)<r?[0,1,0,1]:Math.random()<.01?[0,1,0,1]:[1,0,0,1]}).flat();pe(()=>{const l=document.getElementById("canvas");if(!l)throw new Error("Canvas container not ready");const m=ye({extensions:["OES_texture_float"],canvas:l}),g=Array(2).fill(0).map(()=>m.framebuffer({color:m.texture({radius:n,data:a,wrap:"repeat",type:"float"}),depthStencil:!1})),y=m({frag:`
precision mediump float;
uniform sampler2D prevState;
varying vec2 uv;

vec2 laplacianDiff() {
    vec2 r = vec2(0.0, 0.0);

    // top left
    r += texture2D(prevState, uv+vec2(-1,-1)/float(${n})).rg * 0.05;
    // top
    r += texture2D(prevState, uv+vec2(0,-1)/float(${n})).rg * 0.2;
    // top right
    r += texture2D(prevState, uv+vec2(1,-1)/float(${n})).rg * 0.05;

    // left
    r += texture2D(prevState, uv+vec2(-1,0)/float(${n})).rg * 0.2;
    // middle
    r += texture2D(prevState, uv+vec2(0,0)/float(${n})).rg * -1.0;
    // right
    r += texture2D(prevState, uv+vec2(1,0)/float(${n})).rg * 0.2;

    // bottom left
    r += texture2D(prevState, uv+vec2(-1,1)/float(${n})).rg * 0.05;
    // bottom
    r += texture2D(prevState, uv+vec2(0,1)/float(${n})).rg * 0.2;
    // bottom right
    r += texture2D(prevState, uv+vec2(1,1)/float(${n})).rg * 0.05;

    return r;
}

void main() {
    float Da = 1.0;
    float Db = 0.5;
    float f = 0.055;
    float k = 0.062;

    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec2 L = laplacianDiff();
    float La = L.r;
    float Lb = L.g;

    float newA = A + ((Da * La) - (A * B * B) + (f * (1.0 - A)));
    float newB = B + ((Db * Lb) + (A * B * B) - ((k + f) * B));

    gl_FragColor = vec4(newA, newB, 0, 1);
}`,framebuffer:d=>g[(d.tick+1)%2]}),C=m({frag:`
precision mediump float;
uniform sampler2D prevState;
varying vec2 uv;
void main() {
    vec2 state = texture2D(prevState, uv).rg;
    gl_FragColor = vec4(state, 0, 1);
}`,vert:`
precision mediump float;
attribute vec2 position;
varying vec2 uv;
void main() {
    uv = 0.5 * (position + 1.0);
    gl_Position = vec4(position, 0, 1);
}`,attributes:{position:[-4,-4,4,-4,0,4]},uniforms:{prevState:({tick:d})=>g[d%2]},depth:{enable:!1},count:3});m.frame(()=>{C(()=>{m.draw(),y()})})}),xe();var i=ln();ee(()=>{L(i,"width",e.width),L(i,"height",e.height)}),V(t,i),re()}const cn=(t,o,e)=>{const n=t*e;return Array(t*t).fill(0).map((r,a)=>{const i=Math.floor(a/t),l=a%t;return Math.hypot(t/2-l,t/2-i)<n?[0,1,0,1]:Math.random()<o?[0,1,0,1]:[1,0,0,1]}).flat()},un=(t,o)=>Array(t*t).fill(0).map(()=>Math.random()<o?[0,1,0,1]:[1,0,0,1]).flat(),fn=(t,o)=>Array(t*t).fill(0).map((e,n)=>{const r=Math.floor(n/t),a=n%t;return Math.hypot(t/2-a,t/2-r)<o*t?[0,1,0,1]:[1,0,0,1]}).flat(),ke=[{name:"KarlSims",type:"Unknown",f:.055,k:.062},{name:"Alpha 1",type:"alpha",f:.01,k:.047},{name:"Alpha 2",type:"alpha",f:.014,k:.053},{name:"Beta 1",type:"beta",f:.014,k:.039},{name:"Beta 2",type:"beta",f:.026,k:.051},{name:"Epsilon 1",type:"epsilon",f:.018,k:.055},{name:"Epsilon 2",type:"epsilon",f:.022,k:.059},{name:"Epsilon 1",type:"epsilon",f:.034,k:.063},{name:"Gamma 1",type:"gamma",f:.022,k:.051},{name:"Gamma 2",type:"gamma",f:.026,k:.055},{name:"Iota 1",type:"iota",f:.046,k:.0594},{name:"Lambda 1",type:"lambda",f:.026,k:.061},{name:"Lambda 2",type:"lambda",f:.034,k:.065},{name:"Mu 1",type:"mu",f:.046,k:.065},{name:"Mu 2",type:"mu",f:.058,k:.065},{name:"Pi 1",type:"pi",f:.062,k:.061},{name:"Rho 1",type:"rho",f:.09,k:.059},{name:"Rho 2",type:"rho",f:.102,k:.055},{name:"Sigma 1",type:"sigma",f:.09,k:.057},{name:"Sigma 2",type:"sigma",f:.11,k:.0523},{name:"Theta 1",type:"theta",f:.03,k:.057},{name:"Theta 2",type:"theta",f:.038,k:.061},{name:"Xi 1",type:"xi",f:.01,k:.041},{name:"Xi 2",type:"xi",f:.014,k:.047},{name:"Zeta 1",type:"zeta",f:.022,k:.061},{name:"Zeta 2",type:"zeta",f:.026,k:.059}];var mn=U('<canvas id="canvas" class="svelte-k89hd5"></canvas>');function dn(t,o){oe(o,!1);const e={width:window.innerWidth-50,height:window.innerHeight-10},n={presetParams:4,initialConditions:"randomSpots",reset:()=>y(),pause:!1},r={iteration:0},a={f:ke[n.presetParams].f,k:ke[n.presetParams].k};let i,l;const m=async()=>{const d=await he(()=>import("../chunks/QkjeJdyK.js"),[],import.meta.url);i=new d.GUI,i.domElement.setAttribute("style","background-color: black"),i.add(a,"f").name("Feed rate").listen(),i.add(a,"k").name("Kill rate").listen(),i.add(n,"pause").name("Pause"),i.add(n,"reset").name("Reset simulation");const E=ke.reduce((_,k,B)=>(_[k.name]=B,_),{});i.add(n,"presetParams",E).onFinishChange(()=>{a.f=ke[n.presetParams].f,a.k=ke[n.presetParams].k});const D={"Random spots":"randomSpots","Middle spot":"middleSpot","Middle + random":"middleCircleAndRandomSpots"};i.add(n,"initialConditions",D).onFinishChange(n.reset);const T=i.add(r,"iteration").listen();T.domElement.style.pointerEvents="none"},g=()=>{document.addEventListener("keydown",d=>{if(d.code==="Space")return n.pause=!n.pause,d.preventDefault();if(d.code==="KeyR")return y(),d.preventDefault()})},y=()=>{const d=document.getElementById("canvas");if(!d)throw new Error("Canvas container not ready");l&&l.destroy(),l=ye({extensions:["OES_texture_float"],canvas:d});const E=b=>l.prop(b);r.iteration=0;const D=2**11;let T;n.initialConditions==="randomSpots"?T=un(D,.001):n.initialConditions==="middleCircleAndRandomSpots"?T=cn(D,.005,.05):T=fn(D,.02);const _=Array(2).fill(0).map(()=>l.framebuffer({color:l.texture({radius:D,data:T,wrap:"repeat",type:"float"}),depthStencil:!1})),k=l({frag:`
precision mediump float;

uniform sampler2D prevState;
uniform float Da;
uniform float Db;
uniform float f;
uniform float k;

varying vec2 uv;

vec2 laplacianDiff() {
    vec2 r = vec2(0.0, 0.0);

    // top left
    r += texture2D(prevState, uv+vec2(-1,-1)/float(${D})).rg * 0.05;
    // top
    r += texture2D(prevState, uv+vec2(0,-1)/float(${D})).rg * 0.2;
    // top right
    r += texture2D(prevState, uv+vec2(1,-1)/float(${D})).rg * 0.05;

    // left
    r += texture2D(prevState, uv+vec2(-1,0)/float(${D})).rg * 0.2;
    // middle
    r += texture2D(prevState, uv+vec2(0,0)/float(${D})).rg * -1.0;
    // right
    r += texture2D(prevState, uv+vec2(1,0)/float(${D})).rg * 0.2;

    // bottom left
    r += texture2D(prevState, uv+vec2(-1,1)/float(${D})).rg * 0.05;
    // bottom
    r += texture2D(prevState, uv+vec2(0,1)/float(${D})).rg * 0.2;
    // bottom right
    r += texture2D(prevState, uv+vec2(1,1)/float(${D})).rg * 0.05;

    return r;
}

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec2 L = laplacianDiff();
    float La = L.r;
    float Lb = L.g;

    float newA = A + ((Da * La) - (A * B * B) + (f * (1.0 - A)));
    float newB = B + ((Db * Lb) + (A * B * B) - ((k + f) * B));

    gl_FragColor = vec4(newA, newB, 0, 1);
}`,framebuffer:b=>_[(b.tick+1)%2],uniforms:{Da:E("Da"),Db:E("Db"),f:E("f"),k:E("k")}}),B=l({frag:`
precision mediump float;
uniform sampler2D prevState;
varying vec2 uv;
void main() {
    vec2 state = texture2D(prevState, uv).rg;
    gl_FragColor = vec4(state, 0, 1);
}`,vert:`
precision mediump float;
attribute vec2 position;
varying vec2 uv;
void main() {
    uv = 0.5 * (position + 1.0);
    gl_Position = vec4(position, 0, 1);
}`,attributes:{position:[-4,-4,4,-4,0,4]},uniforms:{prevState:({tick:b})=>_[b%2]},depth:{enable:!1},count:3});l.frame(()=>{B(()=>{l.draw(),!n.pause&&(r.iteration++,k({Da:1,Db:.5,...a}))})})};pe(()=>{m(),g(),y()}),se(()=>{i.destroy(),l.destroy()}),xe();var C=mn();ee(()=>{L(C,"width",e.width),L(C,"height",e.height)}),V(t,C),re()}const pn=(t,o,e)=>{const n=t*e;return Array(t*t).fill(0).map((r,a)=>{const i=Math.floor(a/t),l=a%t;return Math.hypot(t/2-l,t/2-i)<n?[0,1,0,1]:Math.random()<o?[0,1,0,1]:[1,0,0,1]}).flat()},vn=(t,o)=>Array(t*t).fill(0).map(()=>Math.random()<o?[0,1,0,1]:[1,0,0,1]).flat(),xn=(t,o)=>Array(t*t).fill(0).map((e,n)=>{const r=Math.floor(n/t),a=n%t;return Math.hypot(t/2-a,t/2-r)<o*t?[0,1,0,1]:[1,0,0,1]}).flat(),Ae=[{name:"KarlSims",type:"Unknown",f:.055,k:.062},{name:"Alpha 1",type:"alpha",f:.01,k:.047},{name:"Alpha 2",type:"alpha",f:.014,k:.053},{name:"Beta 1",type:"beta",f:.014,k:.039},{name:"Beta 2",type:"beta",f:.026,k:.051},{name:"Epsilon 1",type:"epsilon",f:.018,k:.055},{name:"Epsilon 2",type:"epsilon",f:.022,k:.059},{name:"Epsilon 1",type:"epsilon",f:.034,k:.063},{name:"Gamma 1",type:"gamma",f:.022,k:.051},{name:"Gamma 2",type:"gamma",f:.026,k:.055},{name:"Iota 1",type:"iota",f:.046,k:.0594},{name:"Lambda 1",type:"lambda",f:.026,k:.061},{name:"Lambda 2",type:"lambda",f:.034,k:.065},{name:"Mu 1",type:"mu",f:.046,k:.065},{name:"Mu 2",type:"mu",f:.058,k:.065},{name:"Pi 1",type:"pi",f:.062,k:.061},{name:"Rho 1",type:"rho",f:.09,k:.059},{name:"Rho 2",type:"rho",f:.102,k:.055},{name:"Sigma 1",type:"sigma",f:.09,k:.057},{name:"Sigma 2",type:"sigma",f:.11,k:.0523},{name:"Theta 1",type:"theta",f:.03,k:.057},{name:"Theta 2",type:"theta",f:.038,k:.061},{name:"Xi 1",type:"xi",f:.01,k:.041},{name:"Xi 2",type:"xi",f:.014,k:.047},{name:"Zeta 1",type:"zeta",f:.022,k:.061},{name:"Zeta 2",type:"zeta",f:.026,k:.059}],hn=`precision mediump float;
attribute vec2 position;
varying vec2 uv;

void main() {
    uv = 0.5 * (position + 1.0);
    gl_Position = vec4(position, 0, 1);
}
`,gn=`precision mediump float;
uniform sampler2D prevState;
varying vec2 uv;

void main() {
    vec2 state = texture2D(prevState, uv).rg;
    gl_FragColor = vec4(state, 0, 1);
}
`,yn=`precision mediump float;

uniform float radius;
uniform sampler2D prevState;
uniform bool pauseSimulation;
uniform float Da;
uniform float Db;
uniform float f;
uniform float k;

uniform vec2 mousePosition;
uniform bool penIsActive;
uniform bool eraserIsActive;
uniform float penRadius;

varying vec2 uv;

vec2 laplacianDiff() {
    vec2 r = vec2(0.0, 0.0);

    // top left
    r += texture2D(prevState, uv+vec2(-1,-1)/float(radius)).rg * 0.05;
    // top
    r += texture2D(prevState, uv+vec2(0,-1)/float(radius)).rg * 0.2;
    // top right
    r += texture2D(prevState, uv+vec2(1,-1)/float(radius)).rg * 0.05;

    // left
    r += texture2D(prevState, uv+vec2(-1,0)/float(radius)).rg * 0.2;
    // middle
    r += texture2D(prevState, uv+vec2(0,0)/float(radius)).rg * -1.0;
    // right
    r += texture2D(prevState, uv+vec2(1,0)/float(radius)).rg * 0.2;

    // bottom left
    r += texture2D(prevState, uv+vec2(-1,1)/float(radius)).rg * 0.05;
    // bottom
    r += texture2D(prevState, uv+vec2(0,1)/float(radius)).rg * 0.2;
    // bottom right
    r += texture2D(prevState, uv+vec2(1,1)/float(radius)).rg * 0.05;

    return r;
}

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec2 L = laplacianDiff();
    float La = L.r;
    float Lb = L.g;

    float newA = A + ((Da * La) - (A * B * B) + (f * (1.0 - A)));
    float newB = B + ((Db * Lb) + (A * B * B) - ((k + f) * B));

    if (penIsActive && distance(uv, mousePosition) < penRadius) {
        gl_FragColor = vec4(0.0, 1.0, 0, 1);
    } else if (eraserIsActive && distance(uv, mousePosition) < penRadius) {
        gl_FragColor = vec4(1.0, 0.0, 0, 1);
    } else if (pauseSimulation) {
        gl_FragColor = vec4(A, B, 0, 1);
    } else {
        gl_FragColor = vec4(newA, newB, 0, 1);
    }
}
`;var bn=U('<canvas id="canvas" class="svelte-jas7es"></canvas>');function wn(t,o){oe(o,!1);const e={width:window.innerWidth-50,height:window.innerHeight-10},n=11,r={presetParams:4,initialConditions:"randomSpots",reset:()=>d(),pause:!1},a={pressedLeft:!1,pressedRight:!1,x:0,y:0,penSize:3},i={iteration:0},l={f:Ae[r.presetParams].f,k:Ae[r.presetParams].k};let m,g;const y=async()=>{const _=await he(()=>import("../chunks/QkjeJdyK.js"),[],import.meta.url);m=new _.GUI,m.domElement.setAttribute("style","background-color: black"),m.add(l,"f").name("Feed rate").listen(),m.add(l,"k").name("Kill rate").listen(),m.add(r,"pause").name("Pause"),m.add(r,"reset").name("Reset simulation");const k=Ae.reduce(($,I,s)=>($[I.name]=s,$),{});m.add(r,"presetParams",k).onFinishChange(()=>{l.f=Ae[r.presetParams].f,l.k=Ae[r.presetParams].k});const B={"Random spots":"randomSpots","Middle spot":"middleSpot","Middle + random":"middleCircleAndRandomSpots"};m.add(r,"initialConditions",B).onFinishChange(r.reset);const b=m.add(i,"iteration").listen();b.domElement.style.pointerEvents="none",m.add(a,"penSize",1,n,1).name("Pen size")},C=()=>{document.addEventListener("keydown",_=>{if(_.code==="Space")return r.pause=!r.pause,_.preventDefault();if(_.code==="KeyR")return d(),_.preventDefault()})},d=()=>{const _=document.getElementById("canvas");if(!_)throw new Error("Canvas container not ready");g&&g.destroy(),g=ye({extensions:["OES_texture_float"],canvas:_});const k=c=>g.prop(c);i.iteration=0;const B=2**n;let b;r.initialConditions==="randomSpots"?b=vn(B,.001):r.initialConditions==="middleCircleAndRandomSpots"?b=pn(B,.005,.05):b=xn(B,.02);const $=Array(2).fill(0).map(()=>g.framebuffer({color:g.texture({radius:B,data:b,wrap:"repeat",type:"float"}),depthStencil:!1})),I=g({frag:yn,framebuffer:c=>$[(c.tick+1)%2],uniforms:{Da:k("Da"),Db:k("Db"),f:k("f"),k:k("k"),radius:B,pauseSimulation:k("pauseSimulation"),mousePosition:k("mousePosition"),penRadius:k("penRadius"),penIsActive:k("penIsActive"),eraserIsActive:k("eraserIsActive")}}),s=g({frag:gn,vert:hn,attributes:{position:[-4,-4,4,-4,0,4]},uniforms:{prevState:({tick:c})=>$[c%2]},depth:{enable:!1},count:3});g.frame(()=>{s(()=>{g.draw(),r.pause||i.iteration++,I({Da:1,Db:.5,pauseSimulation:r.pause,mousePosition:[a.x,a.y],penRadius:1/2**(n-a.penSize),penIsActive:a.pressedLeft,eraserIsActive:a.pressedRight,...l})})})},E=_=>{if(!_.currentTarget)throw new Error("No target for the onmousemove event");const k=_.currentTarget;if(!k.width||!k.height)throw new Error("No target dimensions for the onmousemove event target");const{x:B,y:b}=_,{width:$,height:I}=k,s=B/$,c=(I-b)/I;a.x=s,a.y=c},D=_=>{if(![0,2].includes(_.button)||!["mouseup","mousedown"].includes(_.type))return;let k=_.type==="mousedown";_.button===0&&(a.pressedLeft=k),_.button===2&&(a.pressedRight=k)};pe(()=>{y(),C(),d()}),se(()=>{m.destroy(),g.destroy()}),xe();var T=bn();ee(()=>{L(T,"width",e.width),L(T,"height",e.height)}),Y("mousemove",T,E),Y("mousedown",T,_=>{_.preventDefault(),D(_)}),Y("mouseup",T,D),Y("contextmenu",T,_=>_.preventDefault()),V(t,T),re()}ue(["mousemove","mousedown","mouseup","contextmenu"]);const De=[{name:"KarlSims",type:"Unknown",f:.055,k:.062},{name:"STX 1",type:"N.A",f:.0353,k:.0614},{name:"STX 2",type:"N.A",f:.0201,k:.0602},{name:"STX 2",type:"N.A",f:.0181,k:.0435},{name:"α 1",type:"alpha",f:.01,k:.047},{name:"α 2",type:"alpha",f:.014,k:.053},{name:"β 1",type:"beta",f:.014,k:.039},{name:"β 2",type:"beta",f:.026,k:.051},{name:"δ 1",type:"delta",f:.03,k:.055},{name:"δ 2",type:"delta",f:.042,k:.059},{name:"ε 1",type:"epsilon",f:.018,k:.055},{name:"ε 2",type:"epsilon",f:.022,k:.059},{name:"η 1",type:"eta",f:.034,k:.063},{name:"γ 1",type:"gamma",f:.022,k:.051},{name:"γ 2",type:"gamma",f:.026,k:.055},{name:"ι 1",type:"iota",f:.046,k:.0594},{name:"κ 1",type:"kappa",f:.082,k:.06},{name:"κ 2",type:"kappa",f:.058,k:.063},{name:"λ 1",type:"lambda",f:.026,k:.061},{name:"λ 2",type:"lambda",f:.034,k:.065},{name:"μ 1",type:"mu",f:.046,k:.065},{name:"μ 2",type:"mu",f:.058,k:.065},{name:"ν 2",type:"nu",f:.046,k:.067},{name:"π 1",type:"pi",f:.062,k:.061},{name:"ρ 1",type:"rho",f:.09,k:.059},{name:"ρ 2",type:"rho",f:.102,k:.055},{name:"σ 1",type:"sigma",f:.09,k:.057},{name:"θ 2",type:"sigma",f:.11,k:.0523},{name:"θ 1",type:"theta",f:.03,k:.057},{name:"θ 2",type:"theta",f:.038,k:.061},{name:"ξ 1",type:"xi",f:.01,k:.041},{name:"ξ 2",type:"xi",f:.014,k:.047},{name:"ζ 1",type:"zeta",f:.022,k:.061},{name:"ζ 2",type:"zeta",f:.026,k:.059}];var _n=U("<option> </option>"),Sn=U('<div>Select f and k parameters on the map of use a preset</div> <select class="full-width svelte-1olvyu6"></select> <!>',1),En=U('<div id="container"><button class="full-width svelte-1olvyu6" id="toggleButton"> </button> <!></div>');function kn(t,o){oe(o,!0);let e=le(de(De[0])),n=le(!0);const r=[0,.12],a=[.03,.07],i=s=>{const{f:c,k:p}=s,P=d.map(p,a[0],a[1],0,d.width),u=d.map(c,r[0],r[1],d.height,0);return{x:P,y:u}},l=s=>{const{x:c,y:p}=s,P=d.map(p,d.height,0,r[0],r[1]),u=d.map(c,0,d.width,a[0],a[1]);return{f:P,k:u}},m=s=>{const c=s.mouseX,p=s.mouseY;if(c<0||p<0||c>s.width||p>s.height)return;const{f:P,k:u}=l({x:s.mouseX,y:s.mouseY});Q(e,{f:P,k:u,name:"custom",type:"manual"},!0),o.onfkupdated?.(w(e))},g=s=>{s.noStroke();const c=s.textSize();for(const p of De){const{x:P,y:u}=i({f:p.f,k:p.k}),v=p.f===w(e).f&&p.k===w(e).k;s.circle(P,u,3),s.textSize(v?c*2:c),s.fill(v?[240,240,150]:[255,255,255]),s.text(p.name,P-s.textWidth(p.name)/2,u-10)}},y=s=>{s.noFill(),s.stroke("red");const{x:c,y:p}=i(w(e));s.text("F",10,p>10?p-5:p+15),s.line(0,p,s.width,p),s.text("K",c<s.width-10?c+5:c-15,s.height-10),s.line(c,0,c,s.height),s.circle(c,p,10)},C=s=>{const{f:c,k:p}=w(e),P=`F: ${c.toFixed(4)}`,u=`K: ${p.toFixed(4)}`,v=s.textSize(),A=s.height*.05;s.textStyle(s.BOLD),s.textSize(A),s.fill("white"),s.stroke(0),s.strokeWeight(1),s.text(P,s.width*.05,s.textSize()),s.text(u,s.width*.05,s.textSize()+s.textSize()+6),s.textStyle(s.NORMAL),s.textSize(v)};let d,E=le(!1);const D=s=>{d=s;let c;s.preload=()=>{c=s.loadImage(F+"/parameters_map.png")},s.setup=()=>{s.createCanvas(400,400),s.frameRate(55)},s.draw=()=>{s.background(255),s.tint(150,190),s.image(c,0,0,s.width,s.height),g(s),y(s),C(s),Q(E,!1),s.mouseIsPressed&&(m(s),Q(E,!0))}},T=()=>{Q(n,!w(n)),w(n)||d.remove()};se(()=>d?.remove());var _=En();let k;var B=O(_),b=O(B,!0);K(B);var $=h(B,2);{var I=s=>{var c=Sn(),p=h(ce(c),2);Ce(p,21,()=>De,ze,(u,v)=>{var A=_n(),R=O(A);K(A);var M={};ee(()=>{ae(R,`${w(v).type??""} - ${w(v).name??""} (f/k ${w(v).f??""} / ${w(v).k??""})`),M!==(M=w(v))&&(A.value=(A.__value=w(v))??"")}),V(u,A)}),K(p);var P=h(p,2);ge(P,{sketch:D}),Y("change",p,()=>o.onfkupdated?.(w(e))),Fe(p,()=>w(e),u=>Q(e,u)),V(s,c)};Pe($,s=>{w(n)&&s(I)})}K(_),ee(()=>{k=Re(_,1,"svelte-1olvyu6",null,k,{"no-cursor":w(E)}),ae(b,w(n)?"Close":"F/K selection")}),Y("click",B,T),V(t,_),re()}ue(["click","change"]);const An=`precision mediump float;
attribute vec2 position;
uniform float zoomLevel;    // 1 full size, 0 max zoom
uniform vec2 pan;   // in range [0, 1], [0, 0]  is bottom left, [1, 1] top right
varying vec2 uv;

void main() {
    uv = 0.5 * (position + 1.0) * zoomLevel + pan * (1.0 - zoomLevel);
    gl_Position = vec4(position, 0, 1);
}
`,Dn=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    gl_FragColor = vec4(A, B, 0.0, 1.0);
}

`,Bn=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float PI = 3.14159265359;
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    float val = sin(iteration*PI/180.0);
    if (val < 0.0) {
        val = -1.0 * val;
    }
    gl_FragColor = vec4(A, B, val, 1.0);
}
`,Cn=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    float val = (A + B) / 2.0;

    gl_FragColor = vec4(val, val, val, 1.0);
}

`,zn=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    float val = (1.0 + A - B) / 2.0;

    gl_FragColor = vec4(1.0 - val, 1.0 - val, 1.0 - val, 1.0);
}
`,$n=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    float val = (1.0 + A - B) / 2.0;

    gl_FragColor = vec4(val, val, val, 1.0);
}
`,Ln=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

// All components are in the range [0...1], including hue. (https://stackoverflow.com/a/17897228)
vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

// All components are in the range [0...1], including hue. (https://stackoverflow.com/a/17897228)
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    // vec3 color1 = vec3(1.0, 0.0, 0.0);
    // vec3 color2 = vec3(0.0, 1.0, 0.0);
    // vec3 result = color1 * A + color2 * B;

    vec3 color1RGB = vec3(0.639, 0.941, 0.717);
    vec3 color2RGB = vec3(0.929, 0.082, 0.705);

    vec3 color1HSV = rgb2hsv(color1RGB);
    vec3 color2HSV = rgb2hsv(color2RGB);

    float color1Offset = (cos(iteration * 0.001) + 1.0) * 0.5;
    float color1newH = 0.5 * (color1HSV.x + color1Offset);
    vec3 color1newHSV = vec3(color1newH, color1HSV.g, color1HSV.b);

    float color2Offset = (cos(iteration * 0.002)) * 0.5;
    float color2newH = 0.5 * (color2HSV.x + color2Offset + 0.33);
    vec3 color2newHSV = vec3(color2newH, color2HSV.g, color2HSV.b);


    vec3 resultHSV = color1newHSV * A + color2newHSV * B;
    vec3 result = hsv2rgb(resultHSV);

    gl_FragColor = vec4(result, 1.0);
}
`,Tn=`// Colors scheme inspired by Robert Munafo described here:
// https://www.mrob.com/pub/comp/xmorphia/index.html
// 
// A is blue
// B is red

precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    float red = A; // The more A the redder
    float blue = 1.0 - A; // The less A the bleuer

    float green = max(A, B) - min(A, B);

    vec3 result = vec3(red, green, blue);

    gl_FragColor = vec4(result, 1.0);
}
`,Rn=`// Colors scheme inspired by Robert Munafo described here:
// https://www.mrob.com/pub/comp/xmorphia/index.html
// 
// A is blue
// B is red

precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec3 color1 = vec3(0.0, 0.0, 1.0);
    vec3 color2 = vec3(1.0, 0.0, 0.0);
    vec3 result = vec3(A, 0.0, 1.0-A);

    gl_FragColor = vec4(result, 1.0);
}
`,Pn=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    if (A > 0.9) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    } else if (A > 0.4) {
        gl_FragColor = vec4(1.0 - A, 0.0, 0.0, 1.0);
    } else { 
        gl_FragColor = vec4(0.0, A, 0.0, 1.0);
    }
}
`,In=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec4 black = vec4(0.0, 0.0, 0.0, 1.0);

    vec4 red = vec4(1.0, 0.0, 0.0, 1.0);
    vec4 blue = vec4(0.0, 0.0, 1.0, 1.0);
    vec4 color = mix(blue, red, A);

    vec4 softRed = vec4(0.8588, 0.2824, 0.3765, 1.0);
    vec4 softBlue = vec4(0.2824, 0.3882, 0.8588, 1.0);
    // vec4 softColor = mix(blue, red, (A-0.4)/0.6);
    // vec4 softColor = mix(blue, red, (A-0.4)/0.4);
    vec4 softColor = mix(softBlue, softRed, 1.0-A);


    if (A < 0.4) {
        gl_FragColor = vec4(black);
    } else {
        gl_FragColor = vec4(color);
    }

}
`,Fn=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

// https://github.com/Polymole/glsl-colormap/blob/master/shaders/MATLAB_cool.frag
float colormap_red(float x) {
    return (1.0 + 1.0 / 63.0) * x - 1.0 / 63.0;
}

float colormap_green(float x) {
    return -(1.0 + 1.0 / 63.0) * x + (1.0 + 1.0 / 63.0);
}

vec4 colormap(float x) {
    float r = clamp(colormap_red(x), 0.0, 1.0);
    float g = clamp(colormap_green(x), 0.0, 1.0);
    float b = 1.0;
    return vec4(r, g, b, 1.0);
}

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec4 black = vec4(0.0, 0.0, 0.0, 1.0);

    vec4 softColor = colormap((A-0.4)*(1.0/0.6));


    if (A < 0.4) {
        gl_FragColor = vec4(black);
    } else {
        gl_FragColor = vec4(softColor);
    }

}
`,Mn=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

// https://github.com/Polymole/glsl-colormap/blob/master/shaders/IDL_CB-RdBu.frag
float colormap_red(float x) {
	if (x < 0.09771832105856419) {
		return 7.60263247863246E+02 * x + 1.02931623931624E+02;
	} else if (x < 0.3017162107441106) {
		return (-2.54380938558548E+02 * x + 4.29911571188803E+02) * x + 1.37642085716717E+02;
	} else if (x < 0.4014205790737471) {
		return 8.67103448276151E+01 * x + 2.18034482758611E+02;
	} else if (x < 0.5019932233215039) {
		return -6.15461538461498E+01 * x + 2.77547692307680E+02;
	} else if (x < 0.5969483882550937) {
		return -3.77588522588624E+02 * x + 4.36198819698878E+02;
	} else if (x < 0.8046060096654594) {
		return (-6.51345897546620E+02 * x + 2.09780968434337E+02) * x + 3.17674951640855E+02;
	} else {
		return -3.08431855203590E+02 * x + 3.12956742081421E+02;
	}
}

float colormap_green(float x) {
	if (x < 0.09881640500975222) {
		return 2.41408547008547E+02 * x + 3.50427350427364E-01;
	} else if (x < 0.5000816285610199) {
		return ((((1.98531871433258E+04 * x - 2.64108262469187E+04) * x + 1.10991785969817E+04) * x - 1.92958444776211E+03) * x + 8.39569642882186E+02) * x - 4.82944517518776E+01;
	} else if (x < 0.8922355473041534) {
		return (((6.16712686949223E+03 * x - 1.59084026055125E+04) * x + 1.45172137257997E+04) * x - 5.80944127411621E+03) * x + 1.12477959061948E+03;
	} else {
		return -5.28313797313699E+02 * x + 5.78459299959206E+02;
	}
}

float colormap_blue(float x) {
	if (x < 0.1033699568661857) {
		return 1.30256410256410E+02 * x + 3.08518518518519E+01;
	} else if (x < 0.2037526071071625) {
		return 3.38458128078815E+02 * x + 9.33004926108412E+00;
	} else if (x < 0.2973267734050751) {
		return (-1.06345054944861E+02 * x + 5.93327252747168E+02) * x - 3.81852747252658E+01;
	} else if (x < 0.4029109179973602) {
		return 6.68959706959723E+02 * x - 7.00740740740798E+01;
	} else if (x < 0.5006715489526758) {
		return 4.87348695652202E+02 * x + 3.09898550724286E+00;
	} else if (x < 0.6004396902588283) {
		return -6.85799999999829E+01 * x + 2.81436666666663E+02;
	} else if (x < 0.702576607465744) {
		return -1.81331701891043E+02 * x + 3.49137263626287E+02;
	} else if (x < 0.9010407030582428) {
		return (2.06124143164576E+02 * x - 5.78166906665595E+02) * x + 5.26198653917172E+02;
	} else {
		return -7.36990769230737E+02 * x + 8.36652307692262E+02;
	}
}

vec4 colormap(float x) {
	float r = clamp(colormap_red(x) / 255.0, 0.0, 1.0);
	float g = clamp(colormap_green(x) / 255.0, 0.0, 1.0);
	float b = clamp(colormap_blue(x) / 255.0, 0.0, 1.0);
	return vec4(r, g, b, 1.0);
}

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec4 black = vec4(0.0, 0.0, 0.0, 1.0);

    vec4 softColor = colormap((A-0.4)*(1.0/0.6));


    if (A < 0.4) {
        gl_FragColor = vec4(black);
    } else {
        gl_FragColor = vec4(softColor);
    }

}
`,Kn=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

// https://github.com/Polymole/glsl-colormap/blob/master/shaders/IDL_CB-RdYiBu.frag
float colormap_red(float x) {
	if (x < 0.09790863520700754) {
		return 5.14512820512820E+02 * x + 1.64641025641026E+02;
	} else if (x < 0.2001887081633112) {
		return 2.83195402298854E+02 * x + 1.87288998357964E+02;
	} else if (x < 0.3190117539655621) {
		return 9.27301587301214E+01 * x + 2.25417989417999E+02;
	} else if (x < 0.500517389125164) {
		return 255.0;
	} else if (x < 0.6068377196788788) {
		return -3.04674876847379E+02 * x + 4.07495073891681E+02;
	} else if (x < 0.9017468988895416) {
		return (1.55336390191951E+02 * x - 7.56394659038288E+02) * x + 6.24412733169483E+02;
	} else {
		return -1.88350769230735E+02 * x + 2.38492307692292E+02;
	}
}

float colormap_green(float x) {
	if (x < 0.09638568758964539) {
		return 4.81427692307692E+02 * x + 4.61538461538488E-01;
	} else if (x < 0.4987066686153412) {
		return ((((3.25545903568267E+04 * x - 4.24067109461319E+04) * x + 1.83751375886345E+04) * x - 3.19145329617892E+03) * x + 8.08315127034676E+02) * x - 1.44611527812961E+01;
	} else if (x < 0.6047312345537269) {
		return -1.18449917898218E+02 * x + 3.14234811165860E+02;
	} else if (x < 0.7067635953426361) {
		return -2.70822112753102E+02 * x + 4.06379036672115E+02;
	} else {
		return (-4.62308723214883E+02 * x + 2.42936159122279E+02) * x + 2.74203431802418E+02;
	}
}

float colormap_blue(float x) {
	if (x < 0.09982818011951204) {
		return 1.64123076923076E+01 * x + 3.72646153846154E+01;
	} else if (x < 0.2958717460833126) {
		return 2.87014675052409E+02 * x + 1.02508735150248E+01;
	} else if (x < 0.4900527540014758) {
		return 4.65475113122167E+02 * x - 4.25505279034673E+01;
	} else if (x < 0.6017014681258838) {
		return 5.61032967032998E+02 * x - 8.93789173789407E+01;
	} else if (x < 0.7015737100463595) {
		return -1.51655677655728E+02 * x + 3.39446886446912E+02;
	} else if (x < 0.8237156500567735) {
		return -2.43405347593559E+02 * x + 4.03816042780725E+02;
	} else {
		return -3.00296889157305E+02 * x + 4.50678495922638E+02;
	}
}

vec4 colormap(float x) {
	float r = clamp(colormap_red(x) / 255.0, 0.0, 1.0);
	float g = clamp(colormap_green(x) / 255.0, 0.0, 1.0);
	float b = clamp(colormap_blue(x) / 255.0, 0.0, 1.0);
	return vec4(r, g, b, 1.0);
}

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec4 black = vec4(0.0, 0.0, 0.0, 1.0);

    vec4 softColor = colormap((A-0.4)*(1.0/0.6));


    if (A < 0.4) {
        gl_FragColor = vec4(black);
    } else {
        gl_FragColor = vec4(softColor);
    }

}
`,Hn=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

// https://github.com/Polymole/glsl-colormap/blob/master/shaders/IDL_CB-RdYiBu.frag
float colormap_red(float x) {
	if (x < 0.09790863520700754) {
		return 5.14512820512820E+02 * x + 1.64641025641026E+02;
	} else if (x < 0.2001887081633112) {
		return 2.83195402298854E+02 * x + 1.87288998357964E+02;
	} else if (x < 0.3190117539655621) {
		return 9.27301587301214E+01 * x + 2.25417989417999E+02;
	} else if (x < 0.500517389125164) {
		return 255.0;
	} else if (x < 0.6068377196788788) {
		return -3.04674876847379E+02 * x + 4.07495073891681E+02;
	} else if (x < 0.9017468988895416) {
		return (1.55336390191951E+02 * x - 7.56394659038288E+02) * x + 6.24412733169483E+02;
	} else {
		return -1.88350769230735E+02 * x + 2.38492307692292E+02;
	}
}

float colormap_green(float x) {
	if (x < 0.09638568758964539) {
		return 4.81427692307692E+02 * x + 4.61538461538488E-01;
	} else if (x < 0.4987066686153412) {
		return ((((3.25545903568267E+04 * x - 4.24067109461319E+04) * x + 1.83751375886345E+04) * x - 3.19145329617892E+03) * x + 8.08315127034676E+02) * x - 1.44611527812961E+01;
	} else if (x < 0.6047312345537269) {
		return -1.18449917898218E+02 * x + 3.14234811165860E+02;
	} else if (x < 0.7067635953426361) {
		return -2.70822112753102E+02 * x + 4.06379036672115E+02;
	} else {
		return (-4.62308723214883E+02 * x + 2.42936159122279E+02) * x + 2.74203431802418E+02;
	}
}

float colormap_blue(float x) {
	if (x < 0.09982818011951204) {
		return 1.64123076923076E+01 * x + 3.72646153846154E+01;
	} else if (x < 0.2958717460833126) {
		return 2.87014675052409E+02 * x + 1.02508735150248E+01;
	} else if (x < 0.4900527540014758) {
		return 4.65475113122167E+02 * x - 4.25505279034673E+01;
	} else if (x < 0.6017014681258838) {
		return 5.61032967032998E+02 * x - 8.93789173789407E+01;
	} else if (x < 0.7015737100463595) {
		return -1.51655677655728E+02 * x + 3.39446886446912E+02;
	} else if (x < 0.8237156500567735) {
		return -2.43405347593559E+02 * x + 4.03816042780725E+02;
	} else {
		return -3.00296889157305E+02 * x + 4.50678495922638E+02;
	}
}

vec4 colormap(float x) {
	float r = clamp(colormap_red(x) / 255.0, 0.0, 1.0);
	float g = clamp(colormap_green(x) / 255.0, 0.0, 1.0);
	float b = clamp(colormap_blue(x) / 255.0, 0.0, 1.0);
	return vec4(r, g, b, 1.0);
}

void main() {
    float A = texture2D(prevState, uv).r;

    vec4 black = vec4(0.0, 0.0, 0.0, 1.0);

    vec4 softColor = colormap(1.0 - (A-0.4)*(1.0/0.6));


    if (A > 0.6) {
        gl_FragColor = vec4(black);
    } else {
        gl_FragColor = vec4(softColor);
    }

}
`,Yn=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

// https://github.com/Polymole/glsl-colormap/blob/master/shaders/transform_seismic.frag
float colormap_f(float x) {
    return ((-2010.0 * x + 2502.5950459) * x - 481.763180924) / 255.0;
}

float colormap_red(float x) {
    if (x < 0.0) {
        return 3.0 / 255.0;
    } else if (x < 0.238) {
        return ((-1810.0 * x + 414.49) * x + 3.87702) / 255.0;
    } else if (x < 51611.0 / 108060.0) {
        return (344441250.0 / 323659.0 * x - 23422005.0 / 92474.0) / 255.0;
    } else if (x < 25851.0 / 34402.0) {
        return 1.0;
    } else if (x <= 1.0) {
        return (-688.04 * x + 772.02) / 255.0;
    } else {
        return 83.0 / 255.0;
    }
}

float colormap_green(float x) {
    if (x < 0.0) {
        return 0.0;
    } else if (x < 0.238) {
        return 0.0;
    } else if (x < 51611.0 / 108060.0) {
        return colormap_f(x);
    } else if (x < 0.739376978894039) {
        float xx = x - 51611.0 / 108060.0;
        return ((-914.74 * xx - 734.72) * xx + 255.) / 255.0;
    } else {
        return 0.0;
    }
}

float colormap_blue(float x) {
    if (x < 0.0) {
        return 19.0 / 255.0;
    } else if (x < 0.238) {
        float xx = x - 0.238;
        return (((1624.6 * xx + 1191.4) * xx + 1180.2) * xx + 255.0) / 255.0;
    } else if (x < 51611.0 / 108060.0) {
        return 1.0;
    } else if (x < 174.5 / 256.0) {
        return (-951.67322673866 * x + 709.532730938451) / 255.0;
    } else if (x < 0.745745353439206) {
        return (-705.250074130877 * x + 559.620050530617) / 255.0;
    } else if (x <= 1.0) {
        return ((-399.29 * x + 655.71) * x - 233.25) / 255.0;
    } else {
        return 23.0 / 255.0;
    }
}

vec4 colormap(float x) {
    return vec4(colormap_red(x), colormap_green(x), colormap_blue(x), 1.0);
}

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec4 black = vec4(0.0, 0.0, 0.0, 1.0);

    vec4 softColor = colormap((A-0.4)*(1.0/0.6));


    if (A < 0.4) {
        gl_FragColor = vec4(black);
    } else {
        gl_FragColor = vec4(softColor);
    }

}
`,Vn=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

// https://github.com/Polymole/glsl-colormap/blob/master/shaders/IDL_CB-RdYiBu.frag
float colormap_red(float x) {
	if (x < 0.09790863520700754) {
		return 5.14512820512820E+02 * x + 1.64641025641026E+02;
	} else if (x < 0.2001887081633112) {
		return 2.83195402298854E+02 * x + 1.87288998357964E+02;
	} else if (x < 0.3190117539655621) {
		return 9.27301587301214E+01 * x + 2.25417989417999E+02;
	} else if (x < 0.500517389125164) {
		return 255.0;
	} else if (x < 0.6068377196788788) {
		return -3.04674876847379E+02 * x + 4.07495073891681E+02;
	} else if (x < 0.9017468988895416) {
		return (1.55336390191951E+02 * x - 7.56394659038288E+02) * x + 6.24412733169483E+02;
	} else {
		return -1.88350769230735E+02 * x + 2.38492307692292E+02;
	}
}

float colormap_green(float x) {
	if (x < 0.09638568758964539) {
		return 4.81427692307692E+02 * x + 4.61538461538488E-01;
	} else if (x < 0.4987066686153412) {
		return ((((3.25545903568267E+04 * x - 4.24067109461319E+04) * x + 1.83751375886345E+04) * x - 3.19145329617892E+03) * x + 8.08315127034676E+02) * x - 1.44611527812961E+01;
	} else if (x < 0.6047312345537269) {
		return -1.18449917898218E+02 * x + 3.14234811165860E+02;
	} else if (x < 0.7067635953426361) {
		return -2.70822112753102E+02 * x + 4.06379036672115E+02;
	} else {
		return (-4.62308723214883E+02 * x + 2.42936159122279E+02) * x + 2.74203431802418E+02;
	}
}

float colormap_blue(float x) {
	if (x < 0.09982818011951204) {
		return 1.64123076923076E+01 * x + 3.72646153846154E+01;
	} else if (x < 0.2958717460833126) {
		return 2.87014675052409E+02 * x + 1.02508735150248E+01;
	} else if (x < 0.4900527540014758) {
		return 4.65475113122167E+02 * x - 4.25505279034673E+01;
	} else if (x < 0.6017014681258838) {
		return 5.61032967032998E+02 * x - 8.93789173789407E+01;
	} else if (x < 0.7015737100463595) {
		return -1.51655677655728E+02 * x + 3.39446886446912E+02;
	} else if (x < 0.8237156500567735) {
		return -2.43405347593559E+02 * x + 4.03816042780725E+02;
	} else {
		return -3.00296889157305E+02 * x + 4.50678495922638E+02;
	}
}

vec4 colormap(float x) {
	float r = clamp(colormap_red(x) / 255.0, 0.0, 1.0);
	float g = clamp(colormap_green(x) / 255.0, 0.0, 1.0);
	float b = clamp(colormap_blue(x) / 255.0, 0.0, 1.0);
	return vec4(r, g, b, 1.0);
}

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec4 black = vec4(0.0, 0.0, 0.0, 1.0);

    vec4 softColor = colormap((B-0.1)*(1.0/0.9));


    if (B < 0.1) {
        gl_FragColor = vec4(black);
    } else {
        gl_FragColor = vec4(softColor);
    }

}
`,Z={},Gn=t=>{const o=n=>t.prop(n),e={vert:An,attributes:{position:[[1,-1],[-1,-1],[1,1],[1,1],[-1,-1],[-1,1]]},count:6,framebuffer:o("outputBuffer"),uniforms:{iteration:o("iteration"),zoomLevel:o("zoomLevel"),pan:o("pan"),prevState:o("inputBuffer")}};Z.raw=t({frag:Dn,...e}),Z.A_transform_seismic=t({frag:Yn,...e}),Z.A_gradiant1=t({frag:Pn,...e}),Z.A_gradiant2=t({frag:In,...e}),Z.A_MATLAB_cool=t({frag:Fn,...e}),Z.A_IDL_CB_RdBu=t({frag:Mn,...e}),Z.A_IDL_CB_RdYiBu=t({frag:Kn,...e}),Z.A_IDL_CB_BuYiRd=t({frag:Hn,...e}),Z.B_IDL_CB_RdYiBu=t({frag:Vn,...e}),Z.grayscale=t({frag:Cn,...e}),Z.blackwhite=t({frag:zn,...e}),Z.whiteblack=t({frag:$n,...e}),Z.timebasedblue=t({frag:Bn,...e}),Z.lerp=t({frag:Ln,...e}),Z.mrob=t({frag:Tn,...e}),Z.redblue=t({frag:Rn,...e})},On=t=>{const{colorMode:o,inputBuffer:e,iteration:n,outputBuffer:r,zoomState:a}=t;(Z[o]||Z.raw)({inputBuffer:e,iteration:n,outputBuffer:r,pan:[a.panX,a.panY],zoomLevel:a.zoomLevel})},Un=`precision mediump float;

uniform float radius;
uniform sampler2D prevState;
uniform bool pauseSimulation;
uniform float Da;
uniform float Db;
uniform float f;
uniform float k;

uniform bool penIsActive;
uniform bool eraserIsActive;
uniform float penDensity;

varying vec2 uv;
varying vec2 mouseUv;
varying float scaledPenRadius;

// https://thebookofshaders.com/10/
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}

vec2 laplacianDiff() {
    vec2 r = vec2(0.0, 0.0);

    // top left
    r += texture2D(prevState, uv+vec2(-1,-1)/float(radius)).rg * 0.05;
    // top
    r += texture2D(prevState, uv+vec2(0,-1)/float(radius)).rg * 0.2;
    // top right
    r += texture2D(prevState, uv+vec2(1,-1)/float(radius)).rg * 0.05;

    // left
    r += texture2D(prevState, uv+vec2(-1,0)/float(radius)).rg * 0.2;
    // middle
    r += texture2D(prevState, uv+vec2(0,0)/float(radius)).rg * -1.0;
    // right
    r += texture2D(prevState, uv+vec2(1,0)/float(radius)).rg * 0.2;

    // bottom left
    r += texture2D(prevState, uv+vec2(-1,1)/float(radius)).rg * 0.05;
    // bottom
    r += texture2D(prevState, uv+vec2(0,1)/float(radius)).rg * 0.2;
    // bottom right
    r += texture2D(prevState, uv+vec2(1,1)/float(radius)).rg * 0.05;

    return r;
}

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec2 L = laplacianDiff();
    float La = L.r;
    float Lb = L.g;

    float newA = A + ((Da * La) - (A * B * B) + (f * (1.0 - A)));
    float newB = B + ((Db * Lb) + (A * B * B) - ((k + f) * B));


    float rnd = random(uv);
    if (penIsActive && rnd < penDensity && distance(uv, mouseUv) < scaledPenRadius) {
        gl_FragColor = vec4(0.0, 1.0, 0, 1);
    } else if (eraserIsActive && rnd < penDensity && distance(uv, mouseUv) < scaledPenRadius) {
        gl_FragColor = vec4(1.0, 0.0, 0, 1);
    } else if (pauseSimulation) {
        gl_FragColor = vec4(A, B, 0, 1);
    } else {
        gl_FragColor = vec4(newA, newB, 0, 1);
    }
}
`,Wn=`precision mediump float;

uniform vec2 mousePosition; // in range [0, 1] on the zoomed screen
uniform float zoomLevel;    // 1 full size, 0 max zoom
uniform vec2 pan;   // in range [0, 1], [0, 0]  is bottom left, [1, 1] top right
uniform float penRadius;

attribute vec2 position;

varying vec2 uv;
varying vec2 mouseUv;
varying float scaledPenRadius;

void main() {
    uv = 0.5 * (position + 1.0);
    mouseUv = (mousePosition * zoomLevel) + pan * (1.0 - zoomLevel);
    scaledPenRadius = penRadius * zoomLevel;
    gl_Position = vec4(position, 0, 1);
}
`;let rt;const qn=(t,o)=>{const e=n=>t.prop(n);rt=t({frag:Un,vert:Wn,attributes:{position:[-4,-4,4,-4,0,4]},count:3,framebuffer:e("outputBuffer"),uniforms:{prevState:e("inputBuffer"),Da:1,Db:.5,f:e("f"),k:e("k"),radius:o,pauseSimulation:e("pauseSimulation"),mousePosition:e("mousePosition"),penRadius:e("penRadius"),penDensity:e("penDensity"),penIsActive:e("penIsActive"),eraserIsActive:e("eraserIsActive"),zoomLevel:e("zoomLevel"),pan:e("pan")}})},Xn=t=>{const{inputBuffer:o,outputBuffer:e,pauseSimulation:n,mouseState:r,simulationParameters:a,worldSize:i}=t;rt({inputBuffer:o,outputBuffer:e,pauseSimulation:n,zoomLevel:r.zoomLevel,pan:[r.panX,r.panY],mousePosition:[r.x,r.y],penRadius:1/2**(i-r.penSize),penDensity:r.penDensity,penIsActive:r.pressedLeft,eraserIsActive:r.pressedRight,...a})},Nn=(t,o)=>t==="randomSpots"?Jn(o,.001):t==="middleCircleAndRandomSpots"?jn(o,.005,.05):t==="empty"?Zn(o):Qn(o,.02),jn=(t,o,e)=>{const n=t*e;return Array(t*t).fill(0).map((r,a)=>{const i=Math.floor(a/t),l=a%t;return Math.hypot(t/2-l,t/2-i)<n?[0,1,0,1]:Math.random()<o?[0,1,0,1]:[1,0,0,1]}).flat()},Zn=t=>Array(t*t).fill(0).map(()=>[0,0,0,1]).flat(),Jn=(t,o)=>Array(t*t).fill(0).map(()=>Math.random()<o?[0,1,0,1]:[1,0,0,1]).flat(),Qn=(t,o)=>Array(t*t).fill(0).map((e,n)=>{const r=Math.floor(n/t),a=n%t;return Math.hypot(t/2-a,t/2-r)<o*t?[0,1,0,1]:[1,0,0,1]}).flat(),eo=`precision highp float;

attribute vec2 position;

uniform float zoomLevel;    // 1 full size, 0 max zoom
uniform vec2 pan;   // in range [0, 1], [0, 0]  is bottom left, [1, 1] top right

varying vec2 uv;

void main() {
    uv = 0.5 * (position + 1.0) * zoomLevel + pan * (1.0 - zoomLevel);
    gl_Position = vec4(position, 0, 1);
}
`,to=`precision highp float;

uniform sampler2D prevState;

varying vec2 uv;

void main() {
    vec4 color = texture2D(prevState, uv);

    float division = 10.0;
    float column = mod(uv.x, 1.0 / division);
    float c = column * division;

    float row = mod(uv.y, 1.0 / division);
    float r = row * division;

    // I haven't found a way to compare the value to an exact value
    // Might be a precision issue, or just that I'm missing something
    if (c < 0.05 || r < 0.05) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    } else {
       gl_FragColor = color;
    }
}
`;let at;const no=t=>{const o=e=>t.prop(e);at=t({vert:eo,frag:to,attributes:{position:[[1,-1],[-1,-1],[1,1],[1,1],[-1,-1],[-1,1]]},count:6,framebuffer:o("outputBuffer"),uniforms:{prevState:o("inputBuffer"),zoomLevel:o("zoomLevel"),pan:o("pan")}})},oo=t=>{const{inputBuffer:o,outputBuffer:e,zoomState:n}=t;at({inputBuffer:o,outputBuffer:e,zoomLevel:n.zoomLevel,pan:[n.panX,n.panY]})},ro=`precision mediump float;

uniform vec2 mousePosition; // in range [0, 1] on the zoomed screen
uniform float zoomLevel;    // 1 full size, 0 max zoom
uniform vec2 pan;   // in range [0, 1], [0, 0]  is bottom left, [1, 1] top right

attribute vec2 position;

varying vec2 uv;

void main() {
    uv = 0.5 * (position + 1.0);
    gl_Position = vec4(position, 0, 1);
}
`,ao=`precision mediump float;

uniform sampler2D prevState;
uniform vec2 mousePosition;
uniform float penRadius;

varying vec2 uv;

void main() {
    vec4 color = texture2D(prevState, uv);

    float d = distance(uv, mousePosition);
    if (
        (d >= penRadius && d <= penRadius + 0.001) ||
        (uv.x >= mousePosition.x - 0.001 && uv.x <= mousePosition.x + 0.001 && uv.y >= mousePosition.y - 0.01 && uv.y <= mousePosition.y + 0.01) ||
        (uv.x >= mousePosition.x - 0.01 && uv.x <= mousePosition.x + 0.01 && uv.y >= mousePosition.y - 0.001 && uv.y <= mousePosition.y + 0.001))
    {
        gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
    } else {
        gl_FragColor = color;
    }
}
`;let it;const io=t=>{const o=e=>t.prop(e);it=t({frag:ao,vert:ro,attributes:{position:[[1,-1],[-1,-1],[1,1],[1,1],[-1,-1],[-1,1]]},count:6,framebuffer:o("outputBuffer"),uniforms:{mousePosition:o("mousePosition"),penRadius:o("penRadius"),zoomLevel:o("zoomLevel"),pan:o("pan"),prevState:o("inputBuffer")}})},lo=t=>{const{inputBuffer:o,mouseState:e,outputBuffer:n,worldSize:r}=t;it({inputBuffer:o,outputBuffer:n,mousePosition:[e.x,e.y],penRadius:1/2**(r-e.penSize),zoomLevel:e.zoomLevel,pan:[e.panX,e.panY]})},so=t=>{const{controls:o,info:e,mouseState:n,simulationParameters:r}=t,a=document.getElementById("canvas");if(!a)throw new Error("Canvas container not ready");const i=ye({extensions:["OES_texture_float"],canvas:a});e.iteration=0;const l=2**e.worldSize,m=Nn(o.initialConditions,l),g=()=>i.framebuffer({color:i.texture({radius:l,data:m,wrap:"repeat",type:"float"}),depthStencil:!1}),y=Array(2).fill(0).map(g),C=Array(2).fill(0).map(g);return qn(i,l),Gn(i),no(i),io(i),i.frame(()=>{o.pause||e.iteration++;let d=y[(e.iteration+1)%2];for(let E=0;E<o.speed;E++){e.iteration++;const D=y[e.iteration%2];d=y[(e.iteration+1)%2],Xn({inputBuffer:D,outputBuffer:d,worldSize:e.worldSize,pauseSimulation:o.pause,mouseState:n,simulationParameters:r})}co({inputTexture:d,graphicsTextures:C,controls:o,info:e,mouseState:n})}),i},co=t=>{const{inputTexture:o,graphicsTextures:e,controls:n,info:r,mouseState:a}=t;let i=0;i++;const l=o,m=e[i%2];if(On({colorMode:n.colors,inputBuffer:l,iteration:r.iteration,outputBuffer:m,zoomState:a}),n.grid){i++;const C=e[(i+1)%2],d=e[i%2];oo({inputBuffer:C,outputBuffer:d,zoomState:a})}i++;const g=e[(i+1)%2];lo({mouseState:a,worldSize:r.worldSize,inputBuffer:g,outputBuffer:null})},qe=t=>{if(!t.currentTarget)throw new Error("Event has no currentTarget");const o=t.currentTarget,e=o.getBoundingClientRect(),n=t.clientX-e.left,r=t.clientY-e.top,{width:a,height:i}=o,l=n/a,m=(i-r)/i;return{x:l,y:m}};var uo=U('<main><!> <div id="datgui-container" class="svelte-64sjur"></div> <div><label for="worldSize">World Size:</label> <input id="worldSize" type="number" step="1"/> <span> </span></div> <canvas id="canvas" class="svelte-64sjur"></canvas></main>');function fo(t,o){oe(o,!0);const e={width:Math.min(window.innerWidth,window.innerHeight)*.9,height:Math.min(window.innerWidth,window.innerHeight)*.9},n={colors:"A_transform_seismic",initialConditions:"middleCircleAndRandomSpots",reset:()=>D(),pause:!1,grid:!1,speed:50},r={pressedLeft:!1,pressedRight:!1,x:0,y:0,penSize:3,penDensity:.3,zoomLevel:1,panX:.5,panY:.5},a=de({iteration:0,worldSize:8}),i={f:De[0].f,k:De[0].k};let l,m;const g=async()=>{const c=await he(()=>import("../chunks/QkjeJdyK.js"),[],import.meta.url);l=new c.GUI({autoPlace:!1,closeOnTop:!0}),l.domElement.id="datgui";const p=document.getElementById("datgui-container");if(!p)throw new Error("Gui container not ready");p.appendChild(l.domElement),l.add(n,"pause").name("Pause"),l.add(n,"grid").name("Debug grid"),l.add(n,"reset").name("Reset simulation"),l.add(n,"colors",["grayscale","blackwhite","whiteblack","raw","timebasedblue","lerp","mrob","redblue","A_gradiant1","A_gradiant2","A_MATLAB_cool","A_IDL_CB_RdBu","A_IDL_CB_RdYiBu","A_IDL_CB_BuYiRd","A_transform_seismic","B_IDL_CB_RdYiBu"]).name("Color scheme");const P={"Random spots":"randomSpots","Middle spot":"middleSpot","Middle + random":"middleCircleAndRandomSpots",Empty:"empty"};l.add(n,"initialConditions",P).onFinishChange(n.reset).name("Initial conditions");const u=l.add(a,"iteration").listen();u.domElement.style.pointerEvents="none",l.add(n,"speed",1,200).name("Simulation speed"),l.add(r,"penSize",0,a.worldSize).name("Pen size"),l.add(r,"penDensity",0,1).name("Pen density"),l.add(r,"zoomLevel",0,1).name("Zoom level").listen(),l.add(r,"panX",0,1).name("pan x").listen(),l.add(r,"panY",0,1).name("pan y").listen()},y=c=>{if(c.code==="Space"){n.pause=!n.pause,c.preventDefault();return}if(c.code==="KeyR"&&!c.getModifierState("Control")){D(),c.preventDefault();return}},C=c=>{if(!c.getModifierState("Control"))return;const p=qe(c);r.panX=p.x,r.panY=p.y,c.deltaY>0?r.zoomLevel*=1+r.zoomLevel/2:r.zoomLevel*=1-r.zoomLevel/2,r.zoomLevel>1&&(r.zoomLevel=1),r.zoomLevel<0&&(r.zoomLevel=0),c.preventDefault()},d=c=>{const p=qe(c);r.x=p.x,r.y=p.y},E=c=>{if(![0,2].includes(c.button)||!["mouseup","mousedown"].includes(c.type))return;let p=c.type==="mousedown";c.button===0&&(r.pressedLeft=p),c.button===2&&(r.pressedRight=p)},D=()=>{isNaN(a.worldSize)||(a.worldSize>11&&(a.worldSize=11),a.worldSize<1&&(a.worldSize=1),l&&(document.getElementById(l.domElement.id)?.remove(),l.destroy()),m?.destroy(),g(),m=so({controls:n,info:a,mouseState:r,simulationParameters:i}))},T=c=>{i.f=c.f,i.k=c.k};pe(()=>{D()}),se(()=>{l.destroy(),m.destroy()});var _=uo();me("keydown",$e,y);var k=O(_);kn(k,{onfkupdated:T});var B=h(k,4),b=h(O(B),2);Le(b);var $=h(b,2),I=O($);K($),K(B);var s=h(B,2);K(_),ee(()=>{ae(I,`(${2**a.worldSize} x ${2**a.worldSize} : ${2**(a.worldSize+1)})`),L(s,"width",e.width),L(s,"height",e.height)}),Y("change",b,D),Te(b,()=>a.worldSize,c=>a.worldSize=c),Y("mousemove",s,d),Y("mousedown",s,c=>{c.preventDefault(),E(c)}),Y("mouseup",s,E),me("wheel",s,C),Y("keydown",s,c=>{c.preventDefault(),y(c)}),Y("contextmenu",s,c=>c.preventDefault()),V(t,_),re()}ue(["change","mousemove","mousedown","mouseup","keydown","contextmenu"]);const Be=[{name:"KarlSims",type:"Unknown",f:.055,k:.062},{name:"STX 1",type:"N.A",f:.0353,k:.0614},{name:"STX 2",type:"N.A",f:.0201,k:.0602},{name:"STX 2",type:"N.A",f:.0181,k:.0435},{name:"α 1",type:"alpha",f:.01,k:.047},{name:"α 2",type:"alpha",f:.014,k:.053},{name:"β 1",type:"beta",f:.014,k:.039},{name:"β 2",type:"beta",f:.026,k:.051},{name:"δ 1",type:"delta",f:.03,k:.055},{name:"δ 2",type:"delta",f:.042,k:.059},{name:"ε 1",type:"epsilon",f:.018,k:.055},{name:"ε 2",type:"epsilon",f:.022,k:.059},{name:"η 1",type:"eta",f:.034,k:.063},{name:"γ 1",type:"gamma",f:.022,k:.051},{name:"γ 2",type:"gamma",f:.026,k:.055},{name:"ι 1",type:"iota",f:.046,k:.0594},{name:"κ 1",type:"kappa",f:.082,k:.06},{name:"κ 2",type:"kappa",f:.058,k:.063},{name:"λ 1",type:"lambda",f:.026,k:.061},{name:"λ 2",type:"lambda",f:.034,k:.065},{name:"μ 1",type:"mu",f:.046,k:.065},{name:"μ 2",type:"mu",f:.058,k:.065},{name:"ν 2",type:"nu",f:.046,k:.067},{name:"π 1",type:"pi",f:.062,k:.061},{name:"ρ 1",type:"rho",f:.09,k:.059},{name:"ρ 2",type:"rho",f:.102,k:.055},{name:"σ 1",type:"sigma",f:.09,k:.057},{name:"θ 2",type:"sigma",f:.11,k:.0523},{name:"θ 1",type:"theta",f:.03,k:.057},{name:"θ 2",type:"theta",f:.038,k:.061},{name:"ξ 1",type:"xi",f:.01,k:.041},{name:"ξ 2",type:"xi",f:.014,k:.047},{name:"ζ 1",type:"zeta",f:.022,k:.061},{name:"ζ 2",type:"zeta",f:.026,k:.059}];var mo=U("<option> </option>"),po=U('<div>Select f and k parameters on the map of use a preset</div> <select class="full-width svelte-nnhb0c"></select> <!>',1),vo=U('<div id="container"><button class="full-width svelte-nnhb0c" id="toggleButton"> </button> <!></div>');function xo(t,o){oe(o,!0);let e=le(de(Be[0])),n=le(!0);const r=[0,.12],a=[.03,.07],i=[{f:.1045,k:.0553},{f:.0829,k:.0582},{f:.0664,k:.0595},{f:.0511,k:.0594},{f:.0307,k:.0549},{f:.017,k:.0467},{f:.005,k:.0335},{f:.0076,k:.0472},{f:.0166,k:.0594},{f:.0277,k:.0657},{f:.046,k:.0675},{f:.0757,k:.0643},{f:.0949,k:.0594}],l=u=>{const{f:v,k:A}=u,R=k.map(A,a[0],a[1],0,k.width),M=k.map(v,r[0],r[1],k.height,0);return{x:R,y:M}},m=u=>{u.noStroke();const v=u.textSize();for(const A of Be){const{x:R,y:M}=l({f:A.f,k:A.k}),G=A.f===w(e).f&&A.k===w(e).k;u.circle(R,M,3),u.textSize(G?v*2:v),u.fill(G?[240,240,150]:[255,255,255]),u.text(A.name,R-u.textWidth(A.name)/2,M-10)}},g=u=>{u.noFill(),u.stroke("red"),u.strokeWeight(1);const{x:v,y:A}=l(w(e));u.text("F",10,A>10?A-5:A+15),u.line(0,A,u.width,A),u.text("K",v<u.width-10?v+5:v-15,u.height-10),u.line(v,0,v,u.height),u.circle(v,A,10)},y=u=>{const{f:v,k:A}=w(e),R=`F: ${v.toFixed(4)}`,M=`K: ${A.toFixed(4)}`,G=u.textSize(),f=u.height*.05;u.textStyle(u.BOLD),u.textSize(f),u.fill("white"),u.stroke(0),u.strokeWeight(1),u.text(R,u.width*.05,u.textSize()),u.text(M,u.width*.05,u.textSize()+u.textSize()+6),u.textStyle(u.NORMAL),u.textSize(G)},C=u=>{for(let v=0;v<i.length;v++){const{x:A,y:R}=l(i[v]),{x:M,y:G}=l(i[(v+1)%i.length]);u.fill("white"),u.stroke("white"),u.strokeWeight(1),u.circle(A,R,3),u.circle(M,G,3),u.line(A,R,M,G)}};function d(u,v){let A=!1,R=1/0,M=null;for(let G=0;G<v.length;G++){const f=v[G],x=v[(G+1)%v.length];if(u[0]===f[0]&&u[1]===f[1])return u;f[1]>u[1]!=x[1]>u[1]&&u[0]<(x[0]-f[0])*(u[1]-f[1])/(x[1]-f[1])+f[0]&&(A=!A);const z=E(u,f,x);z<R&&(R=z,M=D(u,f,x))}if(A)return u;if(!M)throw new Error("Now closest point found");return M}function E(u,v,A){const R=[A[0]-v[0],A[1]-v[1]],M=[u[0]-v[0],u[1]-v[1]],G=R[0]*M[0]+R[1]*M[1],f=R[0]*R[0]+R[1]*R[1],x=G/f;let S;return x<0?S=v:x>1?S=A:S=[v[0]+x*R[0],v[1]+x*R[1]],Math.sqrt((u[0]-S[0])**2+(u[1]-S[1])**2)}function D(u,v,A){const R=[A[0]-v[0],A[1]-v[1]],M=[u[0]-v[0],u[1]-v[1]],G=R[0]*M[0]+R[1]*M[1],f=R[0]*R[0]+R[1]*R[1],x=G/f;let S;return x<0?S=v:x>1?S=A:S=[v[0]+x*R[0],v[1]+x*R[1]],S}const T=()=>{const u=[w(e).f,w(e).k],v=i.map(R=>[R.f,R.k]),A=d(u,v);w(e).f=A[0],w(e).k=A[1]},_=()=>{let{f:u,k:v}=w(e);const A=k.noise(k.frameCount*.01),R=k.noise(5321+k.frameCount*.01),G=Math.random()<.97?.001:.01;u=u+(R*2-1)*(r[1]-r[0])*G,v=v+(A*2-1)*(a[1]-a[0])*G,Q(e,{f:u,k:v,name:"custom",type:"manual"},!0),T(),o.onfkupdated?.(w(e))};let k,B=!1;const b=u=>{k=u;let v;u.preload=()=>{v=u.loadImage(F+"/parameters_map.png")},u.setup=()=>{u.createCanvas(400,400),u.frameRate(55)},u.draw=()=>{u.background(255),u.tint(150,190),u.image(v,0,0,u.width,u.height),m(u),C(u),g(u),y(u),_()}},$=()=>{Q(n,!w(n)),w(n)||k.remove()};se(()=>k?.remove());var I=vo();Re(I,1,"svelte-nnhb0c",null,{},{"no-cursor":B});var s=O(I),c=O(s,!0);K(s);var p=h(s,2);{var P=u=>{var v=po(),A=h(ce(v),2);Ce(A,21,()=>Be,ze,(M,G)=>{var f=mo(),x=O(f);K(f);var S={};ee(()=>{ae(x,`${w(G).type??""} - ${w(G).name??""} (f/k ${w(G).f??""} / ${w(G).k??""})`),S!==(S=w(G))&&(f.value=(f.__value=w(G))??"")}),V(M,f)}),K(A);var R=h(A,2);ge(R,{sketch:b}),Y("change",A,()=>o.onfkupdated?.(w(e))),Fe(A,()=>w(e),M=>Q(e,M)),V(u,v)};Pe(p,u=>{w(n)&&u(P)})}K(I),ee(()=>ae(c,w(n)?"Close":"F/K selection")),Y("click",s,$),V(t,I),re()}ue(["click","change"]);const ho=`precision mediump float;
attribute vec2 position;
uniform float zoomLevel;    // 1 full size, 0 max zoom
uniform vec2 pan;   // in range [0, 1], [0, 0]  is bottom left, [1, 1] top right
varying vec2 uv;

void main() {
    uv = 0.5 * (position + 1.0) * zoomLevel + pan * (1.0 - zoomLevel);
    gl_Position = vec4(position, 0, 1);
}
`,go=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    gl_FragColor = vec4(A, B, 0.0, 1.0);
}

`,yo=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float PI = 3.14159265359;
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    float val = sin(iteration*PI/180.0);
    if (val < 0.0) {
        val = -1.0 * val;
    }
    gl_FragColor = vec4(A, B, val, 1.0);
}
`,bo=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    float val = (A + B) / 2.0;

    gl_FragColor = vec4(val, val, val, 1.0);
}

`,wo=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    float val = (1.0 + A - B) / 2.0;

    gl_FragColor = vec4(1.0 - val, 1.0 - val, 1.0 - val, 1.0);
}
`,_o=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    float val = (1.0 + A - B) / 2.0;

    gl_FragColor = vec4(val, val, val, 1.0);
}
`,So=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

// All components are in the range [0...1], including hue. (https://stackoverflow.com/a/17897228)
vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

// All components are in the range [0...1], including hue. (https://stackoverflow.com/a/17897228)
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    // vec3 color1 = vec3(1.0, 0.0, 0.0);
    // vec3 color2 = vec3(0.0, 1.0, 0.0);
    // vec3 result = color1 * A + color2 * B;

    vec3 color1RGB = vec3(0.639, 0.941, 0.717);
    vec3 color2RGB = vec3(0.929, 0.082, 0.705);

    vec3 color1HSV = rgb2hsv(color1RGB);
    vec3 color2HSV = rgb2hsv(color2RGB);

    float color1Offset = (cos(iteration * 0.001) + 1.0) * 0.5;
    float color1newH = 0.5 * (color1HSV.x + color1Offset);
    vec3 color1newHSV = vec3(color1newH, color1HSV.g, color1HSV.b);

    float color2Offset = (cos(iteration * 0.002)) * 0.5;
    float color2newH = 0.5 * (color2HSV.x + color2Offset + 0.33);
    vec3 color2newHSV = vec3(color2newH, color2HSV.g, color2HSV.b);


    vec3 resultHSV = color1newHSV * A + color2newHSV * B;
    vec3 result = hsv2rgb(resultHSV);

    gl_FragColor = vec4(result, 1.0);
}
`,Eo=`// Colors scheme inspired by Robert Munafo described here:
// https://www.mrob.com/pub/comp/xmorphia/index.html
// 
// A is blue
// B is red

precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    float red = A; // The more A the redder
    float blue = 1.0 - A; // The less A the bleuer

    float green = max(A, B) - min(A, B);

    vec3 result = vec3(red, green, blue);

    gl_FragColor = vec4(result, 1.0);
}
`,ko=`// Colors scheme inspired by Robert Munafo described here:
// https://www.mrob.com/pub/comp/xmorphia/index.html
// 
// A is blue
// B is red

precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec3 color1 = vec3(0.0, 0.0, 1.0);
    vec3 color2 = vec3(1.0, 0.0, 0.0);
    vec3 result = vec3(A, 0.0, 1.0-A);

    gl_FragColor = vec4(result, 1.0);
}
`,Ao=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    if (A > 0.9) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    } else if (A > 0.4) {
        gl_FragColor = vec4(1.0 - A, 0.0, 0.0, 1.0);
    } else { 
        gl_FragColor = vec4(0.0, A, 0.0, 1.0);
    }
}
`,Do=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec4 black = vec4(0.0, 0.0, 0.0, 1.0);

    vec4 red = vec4(1.0, 0.0, 0.0, 1.0);
    vec4 blue = vec4(0.0, 0.0, 1.0, 1.0);
    vec4 color = mix(blue, red, A);

    vec4 softRed = vec4(0.8588, 0.2824, 0.3765, 1.0);
    vec4 softBlue = vec4(0.2824, 0.3882, 0.8588, 1.0);
    // vec4 softColor = mix(blue, red, (A-0.4)/0.6);
    // vec4 softColor = mix(blue, red, (A-0.4)/0.4);
    vec4 softColor = mix(softBlue, softRed, 1.0-A);


    if (A < 0.4) {
        gl_FragColor = vec4(black);
    } else {
        gl_FragColor = vec4(color);
    }

}
`,Bo=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

// https://github.com/Polymole/glsl-colormap/blob/master/shaders/MATLAB_cool.frag
float colormap_red(float x) {
    return (1.0 + 1.0 / 63.0) * x - 1.0 / 63.0;
}

float colormap_green(float x) {
    return -(1.0 + 1.0 / 63.0) * x + (1.0 + 1.0 / 63.0);
}

vec4 colormap(float x) {
    float r = clamp(colormap_red(x), 0.0, 1.0);
    float g = clamp(colormap_green(x), 0.0, 1.0);
    float b = 1.0;
    return vec4(r, g, b, 1.0);
}

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec4 black = vec4(0.0, 0.0, 0.0, 1.0);

    vec4 softColor = colormap((A-0.4)*(1.0/0.6));


    if (A < 0.4) {
        gl_FragColor = vec4(black);
    } else {
        gl_FragColor = vec4(softColor);
    }

}
`,Co=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

// https://github.com/Polymole/glsl-colormap/blob/master/shaders/IDL_CB-RdBu.frag
float colormap_red(float x) {
	if (x < 0.09771832105856419) {
		return 7.60263247863246E+02 * x + 1.02931623931624E+02;
	} else if (x < 0.3017162107441106) {
		return (-2.54380938558548E+02 * x + 4.29911571188803E+02) * x + 1.37642085716717E+02;
	} else if (x < 0.4014205790737471) {
		return 8.67103448276151E+01 * x + 2.18034482758611E+02;
	} else if (x < 0.5019932233215039) {
		return -6.15461538461498E+01 * x + 2.77547692307680E+02;
	} else if (x < 0.5969483882550937) {
		return -3.77588522588624E+02 * x + 4.36198819698878E+02;
	} else if (x < 0.8046060096654594) {
		return (-6.51345897546620E+02 * x + 2.09780968434337E+02) * x + 3.17674951640855E+02;
	} else {
		return -3.08431855203590E+02 * x + 3.12956742081421E+02;
	}
}

float colormap_green(float x) {
	if (x < 0.09881640500975222) {
		return 2.41408547008547E+02 * x + 3.50427350427364E-01;
	} else if (x < 0.5000816285610199) {
		return ((((1.98531871433258E+04 * x - 2.64108262469187E+04) * x + 1.10991785969817E+04) * x - 1.92958444776211E+03) * x + 8.39569642882186E+02) * x - 4.82944517518776E+01;
	} else if (x < 0.8922355473041534) {
		return (((6.16712686949223E+03 * x - 1.59084026055125E+04) * x + 1.45172137257997E+04) * x - 5.80944127411621E+03) * x + 1.12477959061948E+03;
	} else {
		return -5.28313797313699E+02 * x + 5.78459299959206E+02;
	}
}

float colormap_blue(float x) {
	if (x < 0.1033699568661857) {
		return 1.30256410256410E+02 * x + 3.08518518518519E+01;
	} else if (x < 0.2037526071071625) {
		return 3.38458128078815E+02 * x + 9.33004926108412E+00;
	} else if (x < 0.2973267734050751) {
		return (-1.06345054944861E+02 * x + 5.93327252747168E+02) * x - 3.81852747252658E+01;
	} else if (x < 0.4029109179973602) {
		return 6.68959706959723E+02 * x - 7.00740740740798E+01;
	} else if (x < 0.5006715489526758) {
		return 4.87348695652202E+02 * x + 3.09898550724286E+00;
	} else if (x < 0.6004396902588283) {
		return -6.85799999999829E+01 * x + 2.81436666666663E+02;
	} else if (x < 0.702576607465744) {
		return -1.81331701891043E+02 * x + 3.49137263626287E+02;
	} else if (x < 0.9010407030582428) {
		return (2.06124143164576E+02 * x - 5.78166906665595E+02) * x + 5.26198653917172E+02;
	} else {
		return -7.36990769230737E+02 * x + 8.36652307692262E+02;
	}
}

vec4 colormap(float x) {
	float r = clamp(colormap_red(x) / 255.0, 0.0, 1.0);
	float g = clamp(colormap_green(x) / 255.0, 0.0, 1.0);
	float b = clamp(colormap_blue(x) / 255.0, 0.0, 1.0);
	return vec4(r, g, b, 1.0);
}

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec4 black = vec4(0.0, 0.0, 0.0, 1.0);

    vec4 softColor = colormap((A-0.4)*(1.0/0.6));


    if (A < 0.4) {
        gl_FragColor = vec4(black);
    } else {
        gl_FragColor = vec4(softColor);
    }

}
`,zo=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

// https://github.com/Polymole/glsl-colormap/blob/master/shaders/IDL_CB-RdYiBu.frag
float colormap_red(float x) {
	if (x < 0.09790863520700754) {
		return 5.14512820512820E+02 * x + 1.64641025641026E+02;
	} else if (x < 0.2001887081633112) {
		return 2.83195402298854E+02 * x + 1.87288998357964E+02;
	} else if (x < 0.3190117539655621) {
		return 9.27301587301214E+01 * x + 2.25417989417999E+02;
	} else if (x < 0.500517389125164) {
		return 255.0;
	} else if (x < 0.6068377196788788) {
		return -3.04674876847379E+02 * x + 4.07495073891681E+02;
	} else if (x < 0.9017468988895416) {
		return (1.55336390191951E+02 * x - 7.56394659038288E+02) * x + 6.24412733169483E+02;
	} else {
		return -1.88350769230735E+02 * x + 2.38492307692292E+02;
	}
}

float colormap_green(float x) {
	if (x < 0.09638568758964539) {
		return 4.81427692307692E+02 * x + 4.61538461538488E-01;
	} else if (x < 0.4987066686153412) {
		return ((((3.25545903568267E+04 * x - 4.24067109461319E+04) * x + 1.83751375886345E+04) * x - 3.19145329617892E+03) * x + 8.08315127034676E+02) * x - 1.44611527812961E+01;
	} else if (x < 0.6047312345537269) {
		return -1.18449917898218E+02 * x + 3.14234811165860E+02;
	} else if (x < 0.7067635953426361) {
		return -2.70822112753102E+02 * x + 4.06379036672115E+02;
	} else {
		return (-4.62308723214883E+02 * x + 2.42936159122279E+02) * x + 2.74203431802418E+02;
	}
}

float colormap_blue(float x) {
	if (x < 0.09982818011951204) {
		return 1.64123076923076E+01 * x + 3.72646153846154E+01;
	} else if (x < 0.2958717460833126) {
		return 2.87014675052409E+02 * x + 1.02508735150248E+01;
	} else if (x < 0.4900527540014758) {
		return 4.65475113122167E+02 * x - 4.25505279034673E+01;
	} else if (x < 0.6017014681258838) {
		return 5.61032967032998E+02 * x - 8.93789173789407E+01;
	} else if (x < 0.7015737100463595) {
		return -1.51655677655728E+02 * x + 3.39446886446912E+02;
	} else if (x < 0.8237156500567735) {
		return -2.43405347593559E+02 * x + 4.03816042780725E+02;
	} else {
		return -3.00296889157305E+02 * x + 4.50678495922638E+02;
	}
}

vec4 colormap(float x) {
	float r = clamp(colormap_red(x) / 255.0, 0.0, 1.0);
	float g = clamp(colormap_green(x) / 255.0, 0.0, 1.0);
	float b = clamp(colormap_blue(x) / 255.0, 0.0, 1.0);
	return vec4(r, g, b, 1.0);
}

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec4 black = vec4(0.0, 0.0, 0.0, 1.0);

    vec4 softColor = colormap((A-0.4)*(1.0/0.6));


    if (A < 0.4) {
        gl_FragColor = vec4(black);
    } else {
        gl_FragColor = vec4(softColor);
    }

}
`,$o=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

// https://github.com/Polymole/glsl-colormap/blob/master/shaders/IDL_CB-RdYiBu.frag
float colormap_red(float x) {
	if (x < 0.09790863520700754) {
		return 5.14512820512820E+02 * x + 1.64641025641026E+02;
	} else if (x < 0.2001887081633112) {
		return 2.83195402298854E+02 * x + 1.87288998357964E+02;
	} else if (x < 0.3190117539655621) {
		return 9.27301587301214E+01 * x + 2.25417989417999E+02;
	} else if (x < 0.500517389125164) {
		return 255.0;
	} else if (x < 0.6068377196788788) {
		return -3.04674876847379E+02 * x + 4.07495073891681E+02;
	} else if (x < 0.9017468988895416) {
		return (1.55336390191951E+02 * x - 7.56394659038288E+02) * x + 6.24412733169483E+02;
	} else {
		return -1.88350769230735E+02 * x + 2.38492307692292E+02;
	}
}

float colormap_green(float x) {
	if (x < 0.09638568758964539) {
		return 4.81427692307692E+02 * x + 4.61538461538488E-01;
	} else if (x < 0.4987066686153412) {
		return ((((3.25545903568267E+04 * x - 4.24067109461319E+04) * x + 1.83751375886345E+04) * x - 3.19145329617892E+03) * x + 8.08315127034676E+02) * x - 1.44611527812961E+01;
	} else if (x < 0.6047312345537269) {
		return -1.18449917898218E+02 * x + 3.14234811165860E+02;
	} else if (x < 0.7067635953426361) {
		return -2.70822112753102E+02 * x + 4.06379036672115E+02;
	} else {
		return (-4.62308723214883E+02 * x + 2.42936159122279E+02) * x + 2.74203431802418E+02;
	}
}

float colormap_blue(float x) {
	if (x < 0.09982818011951204) {
		return 1.64123076923076E+01 * x + 3.72646153846154E+01;
	} else if (x < 0.2958717460833126) {
		return 2.87014675052409E+02 * x + 1.02508735150248E+01;
	} else if (x < 0.4900527540014758) {
		return 4.65475113122167E+02 * x - 4.25505279034673E+01;
	} else if (x < 0.6017014681258838) {
		return 5.61032967032998E+02 * x - 8.93789173789407E+01;
	} else if (x < 0.7015737100463595) {
		return -1.51655677655728E+02 * x + 3.39446886446912E+02;
	} else if (x < 0.8237156500567735) {
		return -2.43405347593559E+02 * x + 4.03816042780725E+02;
	} else {
		return -3.00296889157305E+02 * x + 4.50678495922638E+02;
	}
}

vec4 colormap(float x) {
	float r = clamp(colormap_red(x) / 255.0, 0.0, 1.0);
	float g = clamp(colormap_green(x) / 255.0, 0.0, 1.0);
	float b = clamp(colormap_blue(x) / 255.0, 0.0, 1.0);
	return vec4(r, g, b, 1.0);
}

void main() {
    float A = texture2D(prevState, uv).r;

    vec4 black = vec4(0.0, 0.0, 0.0, 1.0);

    vec4 softColor = colormap(1.0 - (A-0.4)*(1.0/0.6));


    if (A > 0.6) {
        gl_FragColor = vec4(black);
    } else {
        gl_FragColor = vec4(softColor);
    }

}
`,Lo=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

// https://github.com/Polymole/glsl-colormap/blob/master/shaders/transform_seismic.frag
float colormap_f(float x) {
    return ((-2010.0 * x + 2502.5950459) * x - 481.763180924) / 255.0;
}

float colormap_red(float x) {
    if (x < 0.0) {
        return 3.0 / 255.0;
    } else if (x < 0.238) {
        return ((-1810.0 * x + 414.49) * x + 3.87702) / 255.0;
    } else if (x < 51611.0 / 108060.0) {
        return (344441250.0 / 323659.0 * x - 23422005.0 / 92474.0) / 255.0;
    } else if (x < 25851.0 / 34402.0) {
        return 1.0;
    } else if (x <= 1.0) {
        return (-688.04 * x + 772.02) / 255.0;
    } else {
        return 83.0 / 255.0;
    }
}

float colormap_green(float x) {
    if (x < 0.0) {
        return 0.0;
    } else if (x < 0.238) {
        return 0.0;
    } else if (x < 51611.0 / 108060.0) {
        return colormap_f(x);
    } else if (x < 0.739376978894039) {
        float xx = x - 51611.0 / 108060.0;
        return ((-914.74 * xx - 734.72) * xx + 255.) / 255.0;
    } else {
        return 0.0;
    }
}

float colormap_blue(float x) {
    if (x < 0.0) {
        return 19.0 / 255.0;
    } else if (x < 0.238) {
        float xx = x - 0.238;
        return (((1624.6 * xx + 1191.4) * xx + 1180.2) * xx + 255.0) / 255.0;
    } else if (x < 51611.0 / 108060.0) {
        return 1.0;
    } else if (x < 174.5 / 256.0) {
        return (-951.67322673866 * x + 709.532730938451) / 255.0;
    } else if (x < 0.745745353439206) {
        return (-705.250074130877 * x + 559.620050530617) / 255.0;
    } else if (x <= 1.0) {
        return ((-399.29 * x + 655.71) * x - 233.25) / 255.0;
    } else {
        return 23.0 / 255.0;
    }
}

vec4 colormap(float x) {
    return vec4(colormap_red(x), colormap_green(x), colormap_blue(x), 1.0);
}

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec4 black = vec4(0.0, 0.0, 0.0, 1.0);

    vec4 softColor = colormap((A-0.4)*(1.0/0.6));


    if (A < 0.4) {
        gl_FragColor = vec4(black);
    } else {
        gl_FragColor = vec4(softColor);
    }

}
`,To=`precision mediump float;

uniform sampler2D prevState;
uniform float iteration;
varying vec2 uv;

// https://github.com/Polymole/glsl-colormap/blob/master/shaders/IDL_CB-RdYiBu.frag
float colormap_red(float x) {
	if (x < 0.09790863520700754) {
		return 5.14512820512820E+02 * x + 1.64641025641026E+02;
	} else if (x < 0.2001887081633112) {
		return 2.83195402298854E+02 * x + 1.87288998357964E+02;
	} else if (x < 0.3190117539655621) {
		return 9.27301587301214E+01 * x + 2.25417989417999E+02;
	} else if (x < 0.500517389125164) {
		return 255.0;
	} else if (x < 0.6068377196788788) {
		return -3.04674876847379E+02 * x + 4.07495073891681E+02;
	} else if (x < 0.9017468988895416) {
		return (1.55336390191951E+02 * x - 7.56394659038288E+02) * x + 6.24412733169483E+02;
	} else {
		return -1.88350769230735E+02 * x + 2.38492307692292E+02;
	}
}

float colormap_green(float x) {
	if (x < 0.09638568758964539) {
		return 4.81427692307692E+02 * x + 4.61538461538488E-01;
	} else if (x < 0.4987066686153412) {
		return ((((3.25545903568267E+04 * x - 4.24067109461319E+04) * x + 1.83751375886345E+04) * x - 3.19145329617892E+03) * x + 8.08315127034676E+02) * x - 1.44611527812961E+01;
	} else if (x < 0.6047312345537269) {
		return -1.18449917898218E+02 * x + 3.14234811165860E+02;
	} else if (x < 0.7067635953426361) {
		return -2.70822112753102E+02 * x + 4.06379036672115E+02;
	} else {
		return (-4.62308723214883E+02 * x + 2.42936159122279E+02) * x + 2.74203431802418E+02;
	}
}

float colormap_blue(float x) {
	if (x < 0.09982818011951204) {
		return 1.64123076923076E+01 * x + 3.72646153846154E+01;
	} else if (x < 0.2958717460833126) {
		return 2.87014675052409E+02 * x + 1.02508735150248E+01;
	} else if (x < 0.4900527540014758) {
		return 4.65475113122167E+02 * x - 4.25505279034673E+01;
	} else if (x < 0.6017014681258838) {
		return 5.61032967032998E+02 * x - 8.93789173789407E+01;
	} else if (x < 0.7015737100463595) {
		return -1.51655677655728E+02 * x + 3.39446886446912E+02;
	} else if (x < 0.8237156500567735) {
		return -2.43405347593559E+02 * x + 4.03816042780725E+02;
	} else {
		return -3.00296889157305E+02 * x + 4.50678495922638E+02;
	}
}

vec4 colormap(float x) {
	float r = clamp(colormap_red(x) / 255.0, 0.0, 1.0);
	float g = clamp(colormap_green(x) / 255.0, 0.0, 1.0);
	float b = clamp(colormap_blue(x) / 255.0, 0.0, 1.0);
	return vec4(r, g, b, 1.0);
}

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec4 black = vec4(0.0, 0.0, 0.0, 1.0);

    vec4 softColor = colormap((B-0.1)*(1.0/0.9));


    if (B < 0.1) {
        gl_FragColor = vec4(black);
    } else {
        gl_FragColor = vec4(softColor);
    }

}
`,J={},Ro=t=>{const o=n=>t.prop(n),e={vert:ho,attributes:{position:[[1,-1],[-1,-1],[1,1],[1,1],[-1,-1],[-1,1]]},count:6,framebuffer:o("outputBuffer"),uniforms:{iteration:o("iteration"),zoomLevel:o("zoomLevel"),pan:o("pan"),prevState:o("inputBuffer")}};J.raw=t({frag:go,...e}),J.A_transform_seismic=t({frag:Lo,...e}),J.A_gradiant1=t({frag:Ao,...e}),J.A_gradiant2=t({frag:Do,...e}),J.A_MATLAB_cool=t({frag:Bo,...e}),J.A_IDL_CB_RdBu=t({frag:Co,...e}),J.A_IDL_CB_RdYiBu=t({frag:zo,...e}),J.A_IDL_CB_BuYiRd=t({frag:$o,...e}),J.B_IDL_CB_RdYiBu=t({frag:To,...e}),J.grayscale=t({frag:bo,...e}),J.blackwhite=t({frag:wo,...e}),J.whiteblack=t({frag:_o,...e}),J.timebasedblue=t({frag:yo,...e}),J.lerp=t({frag:So,...e}),J.mrob=t({frag:Eo,...e}),J.redblue=t({frag:ko,...e})},Po=t=>{const{colorMode:o,inputBuffer:e,iteration:n,outputBuffer:r,zoomState:a}=t;(J[o]||J.raw)({inputBuffer:e,iteration:n,outputBuffer:r,pan:[a.panX,a.panY],zoomLevel:a.zoomLevel})},Io=`precision mediump float;

uniform float radius;
uniform sampler2D prevState;
uniform bool pauseSimulation;
uniform float Da;
uniform float Db;
uniform float f;
uniform float k;

uniform bool penIsActive;
uniform bool eraserIsActive;
uniform float penDensity;

varying vec2 uv;
varying vec2 mouseUv;
varying float scaledPenRadius;

// https://thebookofshaders.com/10/
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}

vec2 laplacianDiff() {
    vec2 r = vec2(0.0, 0.0);

    // top left
    r += texture2D(prevState, uv+vec2(-1,-1)/float(radius)).rg * 0.05;
    // top
    r += texture2D(prevState, uv+vec2(0,-1)/float(radius)).rg * 0.2;
    // top right
    r += texture2D(prevState, uv+vec2(1,-1)/float(radius)).rg * 0.05;

    // left
    r += texture2D(prevState, uv+vec2(-1,0)/float(radius)).rg * 0.2;
    // middle
    r += texture2D(prevState, uv+vec2(0,0)/float(radius)).rg * -1.0;
    // right
    r += texture2D(prevState, uv+vec2(1,0)/float(radius)).rg * 0.2;

    // bottom left
    r += texture2D(prevState, uv+vec2(-1,1)/float(radius)).rg * 0.05;
    // bottom
    r += texture2D(prevState, uv+vec2(0,1)/float(radius)).rg * 0.2;
    // bottom right
    r += texture2D(prevState, uv+vec2(1,1)/float(radius)).rg * 0.05;

    return r;
}

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec2 L = laplacianDiff();
    float La = L.r;
    float Lb = L.g;

    float newA = A + ((Da * La) - (A * B * B) + (f * (1.0 - A)));
    float newB = B + ((Db * Lb) + (A * B * B) - ((k + f) * B));


    float rnd = random(uv);
    if (penIsActive && rnd < penDensity && distance(uv, mouseUv) < scaledPenRadius) {
        gl_FragColor = vec4(0.0, 1.0, 0, 1);
    } else if (eraserIsActive && rnd < penDensity && distance(uv, mouseUv) < scaledPenRadius) {
        gl_FragColor = vec4(1.0, 0.0, 0, 1);
    } else if (pauseSimulation) {
        gl_FragColor = vec4(A, B, 0, 1);
    } else {
        gl_FragColor = vec4(newA, newB, 0, 1);
    }
}
`,Fo=`precision mediump float;

uniform vec2 mousePosition; // in range [0, 1] on the zoomed screen
uniform float zoomLevel;    // 1 full size, 0 max zoom
uniform vec2 pan;   // in range [0, 1], [0, 0]  is bottom left, [1, 1] top right
uniform float penRadius;

attribute vec2 position;

varying vec2 uv;
varying vec2 mouseUv;
varying float scaledPenRadius;

void main() {
    uv = 0.5 * (position + 1.0);
    mouseUv = (mousePosition * zoomLevel) + pan * (1.0 - zoomLevel);
    scaledPenRadius = penRadius * zoomLevel;
    gl_Position = vec4(position, 0, 1);
}
`;let lt;const Mo=(t,o)=>{const e=n=>t.prop(n);lt=t({frag:Io,vert:Fo,attributes:{position:[-4,-4,4,-4,0,4]},count:3,framebuffer:e("outputBuffer"),uniforms:{prevState:e("inputBuffer"),Da:1,Db:.5,f:e("f"),k:e("k"),radius:o,pauseSimulation:e("pauseSimulation"),mousePosition:e("mousePosition"),penRadius:e("penRadius"),penDensity:e("penDensity"),penIsActive:e("penIsActive"),eraserIsActive:e("eraserIsActive"),zoomLevel:e("zoomLevel"),pan:e("pan")}})},Ko=t=>{const{inputBuffer:o,outputBuffer:e,pauseSimulation:n,mouseState:r,simulationParameters:a,worldSize:i}=t;lt({inputBuffer:o,outputBuffer:e,pauseSimulation:n,zoomLevel:r.zoomLevel,pan:[r.panX,r.panY],mousePosition:[r.x,r.y],penRadius:1/2**(i-r.penSize),penDensity:r.penDensity,penIsActive:r.pressedLeft,eraserIsActive:r.pressedRight,...a})},Ho=(t,o)=>t==="randomSpots"?Go(o,.001):t==="middleCircleAndRandomSpots"?Yo(o,.005,.05):t==="empty"?Vo(o):Oo(o,.02),Yo=(t,o,e)=>{const n=t*e;return Array(t*t).fill(0).map((r,a)=>{const i=Math.floor(a/t),l=a%t;return Math.hypot(t/2-l,t/2-i)<n?[0,1,0,1]:Math.random()<o?[0,1,0,1]:[1,0,0,1]}).flat()},Vo=t=>Array(t*t).fill(0).map(()=>[0,0,0,1]).flat(),Go=(t,o)=>Array(t*t).fill(0).map(()=>Math.random()<o?[0,1,0,1]:[1,0,0,1]).flat(),Oo=(t,o)=>Array(t*t).fill(0).map((e,n)=>{const r=Math.floor(n/t),a=n%t;return Math.hypot(t/2-a,t/2-r)<o*t?[0,1,0,1]:[1,0,0,1]}).flat(),Uo=`precision highp float;

attribute vec2 position;

uniform float zoomLevel;    // 1 full size, 0 max zoom
uniform vec2 pan;   // in range [0, 1], [0, 0]  is bottom left, [1, 1] top right

varying vec2 uv;

void main() {
    uv = 0.5 * (position + 1.0) * zoomLevel + pan * (1.0 - zoomLevel);
    gl_Position = vec4(position, 0, 1);
}
`,Wo=`precision highp float;

uniform sampler2D prevState;

varying vec2 uv;

void main() {
    vec4 color = texture2D(prevState, uv);

    float division = 10.0;
    float column = mod(uv.x, 1.0 / division);
    float c = column * division;

    float row = mod(uv.y, 1.0 / division);
    float r = row * division;

    // I haven't found a way to compare the value to an exact value
    // Might be a precision issue, or just that I'm missing something
    if (c < 0.05 || r < 0.05) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    } else {
       gl_FragColor = color;
    }
}
`;let st;const qo=t=>{const o=e=>t.prop(e);st=t({vert:Uo,frag:Wo,attributes:{position:[[1,-1],[-1,-1],[1,1],[1,1],[-1,-1],[-1,1]]},count:6,framebuffer:o("outputBuffer"),uniforms:{prevState:o("inputBuffer"),zoomLevel:o("zoomLevel"),pan:o("pan")}})},Xo=t=>{const{inputBuffer:o,outputBuffer:e,zoomState:n}=t;st({inputBuffer:o,outputBuffer:e,zoomLevel:n.zoomLevel,pan:[n.panX,n.panY]})},No=`precision mediump float;

uniform vec2 mousePosition; // in range [0, 1] on the zoomed screen
uniform float zoomLevel;    // 1 full size, 0 max zoom
uniform vec2 pan;   // in range [0, 1], [0, 0]  is bottom left, [1, 1] top right

attribute vec2 position;

varying vec2 uv;

void main() {
    uv = 0.5 * (position + 1.0);
    gl_Position = vec4(position, 0, 1);
}
`,jo=`precision mediump float;

uniform sampler2D prevState;
uniform vec2 mousePosition;
uniform float penRadius;

varying vec2 uv;

void main() {
    vec4 color = texture2D(prevState, uv);

    float d = distance(uv, mousePosition);
    if (
        (d >= penRadius && d <= penRadius + 0.001) ||
        (uv.x >= mousePosition.x - 0.001 && uv.x <= mousePosition.x + 0.001 && uv.y >= mousePosition.y - 0.01 && uv.y <= mousePosition.y + 0.01) ||
        (uv.x >= mousePosition.x - 0.01 && uv.x <= mousePosition.x + 0.01 && uv.y >= mousePosition.y - 0.001 && uv.y <= mousePosition.y + 0.001))
    {
        gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
    } else {
        gl_FragColor = color;
    }
}
`;let ct;const Zo=t=>{const o=e=>t.prop(e);ct=t({frag:jo,vert:No,attributes:{position:[[1,-1],[-1,-1],[1,1],[1,1],[-1,-1],[-1,1]]},count:6,framebuffer:o("outputBuffer"),uniforms:{mousePosition:o("mousePosition"),penRadius:o("penRadius"),zoomLevel:o("zoomLevel"),pan:o("pan"),prevState:o("inputBuffer")}})},Jo=t=>{const{inputBuffer:o,mouseState:e,outputBuffer:n,worldSize:r}=t;ct({inputBuffer:o,outputBuffer:n,mousePosition:[e.x,e.y],penRadius:1/2**(r-e.penSize),zoomLevel:e.zoomLevel,pan:[e.panX,e.panY]})},Qo=t=>{const{controls:o,info:e,mouseState:n,simulationParameters:r}=t,a=document.getElementById("canvas");if(!a)throw new Error("Canvas container not ready");const i=ye({extensions:["OES_texture_float"],canvas:a});e.iteration=0;const l=2**e.worldSize,m=Ho(o.initialConditions,l),g=()=>i.framebuffer({color:i.texture({radius:l,data:m,wrap:"repeat",type:"float"}),depthStencil:!1}),y=Array(2).fill(0).map(g),C=Array(2).fill(0).map(g);return Mo(i,l),Ro(i),qo(i),Zo(i),i.frame(()=>{o.pause||e.iteration++;let d=y[(e.iteration+1)%2];for(let E=0;E<o.speed;E++){e.iteration++;const D=y[e.iteration%2];d=y[(e.iteration+1)%2],Ko({inputBuffer:D,outputBuffer:d,worldSize:e.worldSize,pauseSimulation:o.pause,mouseState:n,simulationParameters:r})}er({inputTexture:d,graphicsTextures:C,controls:o,info:e,mouseState:n})}),i},er=t=>{const{inputTexture:o,graphicsTextures:e,controls:n,info:r,mouseState:a}=t;let i=0;i++;const l=o;let m=e[i%2];if(!n.grid&&!n.pen&&(m=null),Po({colorMode:n.colors,inputBuffer:l,iteration:r.iteration,outputBuffer:m,zoomState:a}),n.grid){i++;const g=e[(i+1)%2];let y=e[i%2];n.pen||(y=null),Xo({inputBuffer:g,outputBuffer:y,zoomState:a})}if(n.pen){i++;const g=e[(i+1)%2];Jo({mouseState:a,worldSize:r.worldSize,inputBuffer:g,outputBuffer:null})}};var tr=U('<main><!> <div id="datgui-container" class="svelte-xb68ub"></div> <div><label for="worldSize">World Size:</label> <input id="worldSize" type="number" step="1"/> <span> </span></div> <canvas id="canvas" class="svelte-xb68ub"></canvas></main>');function nr(t,o){oe(o,!0);const e={width:Math.min(window.innerWidth,window.innerHeight)*.9,height:Math.min(window.innerWidth,window.innerHeight)*.9},n={colors:"A_transform_seismic",initialConditions:"middleCircleAndRandomSpots",reset:()=>E(),pause:!1,grid:!1,pen:!1,speed:50},r={pressedLeft:!1,pressedRight:!1,x:0,y:0,penSize:3,penDensity:.3,zoomLevel:1,panX:.5,panY:.5},a=de({iteration:0,worldSize:8}),i={f:Be[0].f,k:Be[0].k};let l,m;const g=async()=>{const c=await he(()=>import("../chunks/QkjeJdyK.js"),[],import.meta.url);l=new c.GUI({autoPlace:!1,closeOnTop:!0}),l.domElement.id="datgui";const p=document.getElementById("datgui-container");if(!p)throw new Error("Gui container not ready");p.appendChild(l.domElement),l.add(n,"pause").name("Pause"),l.add(n,"grid").name("Debug grid"),l.add(n,"pen").name("Show pen"),l.add(n,"reset").name("Reset simulation"),l.add(n,"colors",["grayscale","blackwhite","whiteblack","raw","timebasedblue","lerp","mrob","redblue","A_gradiant1","A_gradiant2","A_MATLAB_cool","A_IDL_CB_RdBu","A_IDL_CB_RdYiBu","A_IDL_CB_BuYiRd","A_transform_seismic","B_IDL_CB_RdYiBu"]).name("Color scheme");const P={"Random spots":"randomSpots","Middle spot":"middleSpot","Middle + random":"middleCircleAndRandomSpots",Empty:"empty"};l.add(n,"initialConditions",P).onFinishChange(n.reset).name("Initial conditions");const u=l.add(a,"iteration").listen();u.domElement.style.pointerEvents="none",l.add(n,"speed",1,200).name("Simulation speed").listen(),l.add(r,"penSize",0,a.worldSize).name("Pen size").listen(),l.add(r,"penDensity",0,1).name("Pen density"),l.add(r,"zoomLevel",0,1).name("Zoom level").listen(),l.add(r,"panX",0,1).name("pan x").listen(),l.add(r,"panY",0,1).name("pan y").listen()},y=c=>{if(c.code==="Space"){n.pause=!n.pause,c.preventDefault();return}if(c.code==="KeyR"&&!c.getModifierState("Control")){E(),c.preventDefault();return}};let C;const d=()=>{r.x=Math.random(),r.y=Math.random(),r.penSize=Math.random()*3,r.pressedLeft=!0,setTimeout(()=>r.pressedLeft=!1,500),C=setTimeout(d,Math.random()*5e3)},E=()=>{isNaN(a.worldSize)||(a.worldSize>11&&(a.worldSize=11),a.worldSize<1&&(a.worldSize=1),l&&(document.getElementById(l.domElement.id)?.remove(),l.destroy()),m?.destroy(),g(),m=Qo({controls:n,info:a,mouseState:r,simulationParameters:i}),C&&clearTimeout(C),d())},D=c=>{i.f=c.f,i.k=c.k,i.f>.03?n.speed=50:n.speed=2};pe(()=>{E()}),se(()=>{l.destroy(),m.destroy()});var T=tr();me("keydown",$e,y);var _=O(T);xo(_,{onfkupdated:D});var k=h(_,4),B=h(O(k),2);Le(B);var b=h(B,2),$=O(b);K(b),K(k);var I=h(k,2),s=Xe(()=>Ze(c=>c));K(T),ee(()=>{ae($,`(${2**a.worldSize} x ${2**a.worldSize} : ${2**(a.worldSize+1)})`),L(I,"width",e.width),L(I,"height",e.height)}),Y("change",B,E),Te(B,()=>a.worldSize,c=>a.worldSize=c),Y("contextmenu",I,function(...c){w(s)?.apply(this,c)}),V(t,T),re()}ue(["change","contextmenu"]);var or=U("<!> <!>",1),rr=U(`<p>Here is a list of the various iterations I have made before I got the final version of this
    project.</p> <div class="warning"><p>Some of the previous versions have a bug and the code is not cleaned up properly when the
        page unload. Which make that when navigating between different versions it is possible to
        end up in a state where several simulation are running in parallel.</p> <p>To avoid this kind of issues make sure the refresh the page each time you select a new
        version</p></div> <div><!></div>`,1);function ar(t){const o=[{title:"Auto visualizer",component:nr},{title:"V7",component:fo},{title:"Parameters map",component:ot},{title:"V6",component:wn},{title:"V5",component:dn},{title:"V4",component:sn},{title:"V3",component:an},{title:"V2",component:Z0},{title:"V1",component:G0}];var e=rr(),n=h(ce(e),4),r=O(n);Ne(r,{children:(a,i)=>{var l=or(),m=ce(l);je(m,{children:(y,C)=>{var d=ut(),E=ce(d);Ce(E,1,()=>o,ze,(D,T)=>{we(D,{children:(_,k)=>{ve();var B=be();ee(()=>ae(B,w(T).title)),V(_,B)},$$slots:{default:!0}})}),V(y,d)},$$slots:{default:!0}});var g=h(m,2);Ce(g,1,()=>o,ze,(y,C)=>{_e(y,{children:(d,E)=>{w(C).component(d,{})},$$slots:{default:!0}})}),V(a,l)},$$slots:{default:!0}}),K(n),V(t,e)}var ir=U("<!> <!> <!> <!> <!>",1),lr=U("<!> <!> <!> <!> <!> <!>",1),sr=U("<div><!></div>");function cr(t){var o=sr(),e=O(o);Ne(e,{children:(n,r)=>{var a=lr(),i=ce(a);je(i,{children:(d,E)=>{var D=ir(),T=ce(D);we(T,{children:($,I)=>{ve();var s=be("About");V($,s)},$$slots:{default:!0}});var _=h(T,2);we(_,{children:($,I)=>{ve();var s=be("Manual");V($,s)},$$slots:{default:!0}});var k=h(_,2);we(k,{children:($,I)=>{ve();var s=be("Auto");V($,s)},$$slots:{default:!0}});var B=h(k,2);we(B,{children:($,I)=>{ve();var s=be("Parameters map");V($,s)},$$slots:{default:!0}});var b=h(B,2);we(b,{children:($,I)=>{ve();var s=be("Previous versions");V($,s)},$$slots:{default:!0}}),V(d,D)},$$slots:{default:!0}});var l=h(i,2);_e(l,{children:(d,E)=>{dt(d)},$$slots:{default:!0}});var m=h(l,2);_e(m,{children:(d,E)=>{s0(d,{})},$$slots:{default:!0}});var g=h(m,2);_e(g,{children:(d,E)=>{n0(d,{})},$$slots:{default:!0}});var y=h(g,2);_e(y,{children:(d,E)=>{ot(d,{})},$$slots:{default:!0}});var C=h(y,2);_e(C,{children:(d,E)=>{ar(d)},$$slots:{default:!0}}),V(n,a)},$$slots:{default:!0}}),K(o),V(t,o)}function ur(t){cr(t)}function Br(t,o){oe(o,!1),ft.set({name:"Reaction-Diffusion"}),xe(),ur(t),re()}export{Br as component};
