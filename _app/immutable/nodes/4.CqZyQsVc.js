import{a as P,f as V,t as yo}from"../chunks/CKt2KrEZ.js";import{i as $e}from"../chunks/BvIPdEuG.js";import{ap as ce,a8 as fo,a9 as z,p as _,ao as je,as as g,at as $,au as y,aq as se,ar as ue,ax as ae,bc as zt,aH as io}from"../chunks/ByYLwYyS.js";import{s as he}from"../chunks/5QlzSR3Q.js";import{e as Fo,i as zo}from"../chunks/C-W4MXOd.js";import{T as It,a as Pt,b as Io,c as Po}from"../chunks/CzQUrEBh.js";import{a as xe,o as eo}from"../chunks/deIkc6EO.js";import{r as Le,s as D}from"../chunks/CLQaqjsn.js";import{d as ct,a as L}from"../chunks/DkZPrPjl.js";import{b as Se}from"../chunks/Bs59rXc-.js";import{_ as oo}from"../chunks/CmsKOCeN.js";import{p as Mt}from"../chunks/DRv0PNRz.js";const Ut=["VERTEX_SHADER","FRAGMENT_SHADER"];function Bt(){const e=document.getElementById("canvas");if(!e)throw"canvas undefined";const o=e.getContext("webgl");if(!o)throw"gl undefined";return Gt(o),o}function Gt(e){if(!e.getExtension("OES_texture_float"))throw alert("Need OES_texture_float"),"Need OES_texture_float";if(!e.getExtension("WEBGL_color_buffer_float"))throw alert("Need WEBGL_color_buffer_float"),"Need WEBGL_color_buffer_float";if(e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS)<1)throw alert("Can not use textures in vertex shaders"),"Can not use textures in vertex shaders"}function st(e,o,n,i){const c=e.createTexture();if(!c)throw"Can not create texture";return e.bindTexture(e.TEXTURE_2D,c),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,n,i,0,e.RGBA,e.FLOAT,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),c}function Mo(e,o){const n=e.createFramebuffer();if(!n)throw"Can not create frame buffer";return e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,o,0),n}function ut(e,o,n,i,c){const r=[];for(let t=0;t<o.length;++t){const s=Ut[t]==="VERTEX_SHADER"?e.VERTEX_SHADER:e.FRAGMENT_SHADER,d=Nt(e,o[t],s);if(!d)throw"Can not create shader";r.push(d)}const a=Xt(e,r);if(!a)throw"Can not create program";return a}function Nt(e,o,n,i){const c=console.log,r=e.createShader(n);if(!r)throw"Could not load shader";if(e.shaderSource(r,o),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS)){const t=e.getShaderInfoLog(r);return c(new Error("*** Error compiling shader '"+r+"':"+t+`
`+o.split(`
`).map((s,d)=>`${d+1}: ${s}`).join(`
`))),e.deleteShader(r),null}return r}function Xt(e,o,n,i,c){const r=console.log,a=e.createProgram();if(!a)throw"Could not create program";if(o.forEach(function(s){e.attachShader(a,s)}),e.linkProgram(a),!e.getProgramParameter(a,e.LINK_STATUS)){const s=e.getProgramInfoLog(a);return r("Error in program linking:"+s),e.deleteProgram(a),null}return a}function Wt(e,o){o=o||1;const n=e.clientWidth*o|0,i=e.clientHeight*o|0;return e.width!==n||e.height!==i?(e.width=n,e.height=i,!0):!1}const kt=`attribute vec2 a_position;
uniform vec2 u_worldSize;
varying vec2 v_texcoord;

void main() {
    // Convert the position from pixels to normalized space (-1 to +1)
    vec2 zeroToOne = a_position / u_worldSize;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clipSpace = zeroToTwo - 1.0;

    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

    // Pass the texture coordinate to the fragment shader
    v_texcoord = zeroToOne;
}

`,Ot=`precision mediump float;
uniform sampler2D u_texture;
varying vec2 v_texcoord;

void main() {
    float alive = texture2D(u_texture, v_texcoord).x;
    gl_FragColor = vec4(alive, alive, alive, 1.0);
}
`;let ve,Te,Ge;const Ht=(e,o)=>{const{screenDimensions:n}=o,{height:i,width:c}=n;if(Te=ut(e,[kt,Ot]),ve={positionLocation:e.getAttribLocation(Te,"a_position"),textureLocation:e.getUniformLocation(Te,"u_texture"),worldSizeLocation:e.getUniformLocation(Te,"u_worldSize")},Ge=e.createBuffer(),!Ge)throw new Error("cant create buffer");e.bindBuffer(e.ARRAY_BUFFER,Ge),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,0,i,c,0,c,0,0,i,c,i]),e.STATIC_DRAW)},Yt=e=>{const{gl:o,cellsTex:n,worldDimensions:i}=e;o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindTexture(o.TEXTURE_2D,n),o.useProgram(Te),o.bindBuffer(o.ARRAY_BUFFER,Ge),o.enableVertexAttribArray(ve.positionLocation),o.vertexAttribPointer(ve.positionLocation,2,o.FLOAT,!1,0,0),o.uniform1i(ve.textureLocation,0),o.uniform2f(ve.worldSizeLocation,i.width,i.height),o.drawArrays(o.TRIANGLES,0,6)};function Vt(e,o,n){function i(){const r=e.getElementById(o);r&&(e.fullscreenElement&&e.exitFullscreen&&e.exitFullscreen(),r.width=n.width,r.height=n.height)}function c(){const r=e.getElementById(o);r&&(e.fullscreenElement||r.requestFullscreen())}return e.addEventListener("fullscreenchange",()=>{e.fullscreenElement===null&&i()}),{enableFullscreen:c,disableFullscreen:i}}function Uo(e,o){const{worldDimensions:n}=o,i=n.width*n.height,c=new Array(i).fill(0).map(a=>Math.random()<.5?1:0);return{cellsTex:st(e,new Float32Array(c.map(a=>[a,0,0,0]).flat()),n.width,n.height)}}const Kt=` attribute vec2 aPosition;

 void main() {
   gl_Position = vec4(aPosition, 0.0, 1.0);
 }
`,qt=`precision highp float;

uniform sampler2D uInputTexture;
uniform vec2 uTextureSize;

vec2 wrapCoord(vec2 coord) {
    if (coord.x >= 1.0) {
        coord.x = 0.0;
    }
    if (coord.x < 0.0) {
        coord.x = 1.0;
    }

    if (coord.y > 1.0) {
        coord.y = 0.0;
    }
    if (coord.y < 0.0) {
        coord.y = 1.0;
    }
    return coord;
}

void main() {
    vec2 texcoord = gl_FragCoord.xy / uTextureSize;
    float alive = texture2D(uInputTexture, texcoord).x;

    vec2 topLeftCoord  = wrapCoord(texcoord + (vec2(-1.0, -1.0) / uTextureSize));
    vec2 topCoord      = wrapCoord(texcoord + (vec2(0.0, -1.0) / uTextureSize));
    vec2 topRightCoord = wrapCoord(texcoord + (vec2(1.0, -1.0) / uTextureSize));

    vec2 leftCoord  = wrapCoord(texcoord + (vec2(-1.0, 0.0) / uTextureSize));
    vec2 rightCoord = wrapCoord(texcoord + (vec2(1.0, 0.0) / uTextureSize));

    vec2 bottomLeftCoord  = wrapCoord(texcoord + (vec2(-1.0, 1.0) / uTextureSize));
    vec2 bottomCoord      = wrapCoord(texcoord + (vec2(0.0, 1.0) / uTextureSize));
    vec2 bottomRightCoord = wrapCoord(texcoord + (vec2(1.0, 1.0) / uTextureSize));

    float topLeftAlive  = texture2D(uInputTexture, topLeftCoord ).x;
    float topAlive      = texture2D(uInputTexture, topCoord     ).x;
    float topRightAlive = texture2D(uInputTexture, topRightCoord).x;

    float leftAlive  = texture2D(uInputTexture, leftCoord ).x;;
    float rightAlive = texture2D(uInputTexture, rightCoord).x;

    float bottomLeftAlive  = texture2D(uInputTexture, bottomLeftCoord ).x;
    float bottomAlive      = texture2D(uInputTexture, bottomCoord     ).x;
    float bottomRightAlive = texture2D(uInputTexture, bottomRightCoord).x;

    float aliveNeighbors = topLeftAlive + topAlive + topRightAlive + leftAlive + rightAlive + bottomLeftAlive + bottomAlive + bottomRightAlive;

    float nextAlive = 0.0;
    if (alive == 1.0 && (aliveNeighbors == 2.0 || aliveNeighbors == 3.0)) {
        nextAlive = 1.0;
    } else if (alive == 0.0 && aliveNeighbors == 3.0) {
        nextAlive = 1.0;
    }


    gl_FragColor = vec4(nextAlive, 0.0, 0.0, 0.0);
}
`;let _e,ge,mo,ze,ro,Bo,Go,we,Ne;const No=(e,o)=>{const{cellsTex:n,texDimensions:i}=o;return ge=ut(e,[Kt,qt]),_e={uInputTextureLocation:e.getUniformLocation(ge,"uInputTexture"),uTextureSizeLocation:e.getUniformLocation(ge,"uTextureSize"),positionLocation:e.getAttribLocation(ge,"aPosition")},mo=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,mo),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW),ze=n,ro=st(e,null,i.width,i.height),Bo=Mo(e,ze),Go=Mo(e,ro),we={fb:Bo,tex:ze},Ne={fb:Go,tex:ro},ze},jt=e=>{const{gl:o,worldDimensions:n,screenDimensions:i}=e;o.bindFramebuffer(o.FRAMEBUFFER,Ne.fb),o.viewport(0,0,i.width,i.height),o.bindBuffer(o.ARRAY_BUFFER,mo),o.enableVertexAttribArray(_e.positionLocation),o.vertexAttribPointer(_e.positionLocation,2,o.FLOAT,!1,0,0),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,we.tex),o.useProgram(ge),o.uniform1i(_e.uInputTextureLocation,0),o.uniform2f(_e.uTextureSizeLocation,n.width,n.height),o.drawArrays(o.TRIANGLES,0,6);{const c=we;we=Ne,Ne=c}return we.tex};var Zt=V('<canvas id="canvas" style="background-color: black"></canvas> <div><button> </button></div> <div><span> </span> <button>Reload program</button> <button>Fullscreen (f)</button></div> <div><button>Reset world (r)</button> <span><label for="worldWidth">World: width</label> <input id="worldWidth" type="number"/> <label for="worldHeight">height</label> <input id="worldHeight" type="number"/></span></div>',1);function Jt(e,o){ce(o,!0);const n={width:1600,height:900},i=fo({width:1600,height:900});let c=ae(!0),r,a,t;function s(){cancelAnimationFrame(t),a=Bt(),Wt(a.canvas);const S=Uo(a,{worldDimensions:i});r=No(a,{cellsTex:S.cellsTex,texDimensions:i}),Ht(a,{screenDimensions:n});function de(){return _(c)||(r=jt({gl:a,worldDimensions:i,screenDimensions:n})),Yt({gl:a,cellsTex:r,worldDimensions:i}),t=requestAnimationFrame(de)}t=requestAnimationFrame(de)}let d=ae(void 0);xe(()=>{s(),z(d,Vt(document,"canvas",n).enableFullscreen,!0),document.addEventListener("keydown",S=>{if(S.code==="Space"&&(z(c,!_(c)),S.preventDefault()),S.code==="KeyF"){_(d)?.();return}if(S.code==="KeyR"){b();return}})});const b=()=>{i.width=Math.min(i.width,n.width),i.height=Math.min(i.height,n.height);const S=Uo(a,{worldDimensions:i});r=No(a,{cellsTex:S.cellsTex,texDimensions:i})};var v=Zt(),h=je(v),A=g(h,2),x=$(A),T=$(x);y(x),y(A);var l=g(A,2),u=$(l),f=$(u);y(u);var m=g(u,2),p=g(m,2);y(l);var w=g(l,2),F=$(w),B=g(F,2),R=g($(B),2);Le(R),D(R,"min",0);var I=g(R,4);Le(I),D(I,"min",0),y(B),y(w),se(()=>{D(h,"width",n.width),D(h,"height",n.height),he(T,`${_(c)?"Play":"Pause"} (Space)`),he(f,`World ${i.width??""} x ${i.height??""} (${i.width*i.height} cells)`)}),L("click",x,()=>z(c,!_(c))),L("click",m,()=>s()),L("click",p,function(...S){_(d)?.apply(this,S)}),L("click",F,b),L("change",R,b),Se(R,()=>i.width,S=>i.width=S),L("change",I,b),Se(I,()=>i.height,S=>i.height=S),P(e,v),ue()}ct(["click","change"]);const Qt=["VERTEX_SHADER","FRAGMENT_SHADER"];function en(){const e=document.getElementById("canvas");if(!e)throw"canvas undefined";const o=e.getContext("webgl");if(!o)throw"gl undefined";return on(o),o}function on(e){if(!e.getExtension("OES_texture_float"))throw alert("Need OES_texture_float"),"Need OES_texture_float";if(!e.getExtension("WEBGL_color_buffer_float"))throw alert("Need WEBGL_color_buffer_float"),"Need WEBGL_color_buffer_float";if(e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS)<1)throw alert("Can not use textures in vertex shaders"),"Can not use textures in vertex shaders"}function dt(e,o,n,i){const c=e.createTexture();if(!c)throw"Can not create texture";return e.bindTexture(e.TEXTURE_2D,c),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,n,i,0,e.RGBA,e.FLOAT,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),c}function Xo(e,o){const n=e.createFramebuffer();if(!n)throw"Can not create frame buffer";return e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,o,0),n}function lt(e,o,n,i,c){const r=[];for(let t=0;t<o.length;++t){const s=Qt[t]==="VERTEX_SHADER"?e.VERTEX_SHADER:e.FRAGMENT_SHADER,d=tn(e,o[t],s);if(!d)throw"Can not create shader";r.push(d)}const a=nn(e,r);if(!a)throw"Can not create program";return a}function tn(e,o,n,i){const c=console.log,r=e.createShader(n);if(!r)throw"Could not load shader";if(e.shaderSource(r,o),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS)){const t=e.getShaderInfoLog(r);return c(new Error("*** Error compiling shader '"+r+"':"+t+`
`+o.split(`
`).map((s,d)=>`${d+1}: ${s}`).join(`
`))),e.deleteShader(r),null}return r}function nn(e,o,n,i,c){const r=console.log,a=e.createProgram();if(!a)throw"Could not create program";if(o.forEach(function(s){e.attachShader(a,s)}),e.linkProgram(a),!e.getProgramParameter(a,e.LINK_STATUS)){const s=e.getProgramInfoLog(a);return r("Error in program linking:"+s),e.deleteProgram(a),null}return a}function rn(e,o){o=o||1;const n=e.clientWidth*o|0,i=e.clientHeight*o|0;return e.width!==n||e.height!==i?(e.width=n,e.height=i,!0):!1}const an=`precision mediump float;
attribute vec2 a_position;
uniform vec2 u_worldSize;

uniform float u_zoom;
uniform vec2 u_pan;

varying vec2 v_texcoord;

void main() {
    // Handle zoom and pan
    vec2 position = (a_position * u_zoom) + u_pan;
    // Convert the position from pixels to normalized space (-1 to +1)
    vec2 zeroToOne = position / u_worldSize;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clipSpace = zeroToTwo - 1.0;



    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

    // Pass the texture coordinate to the fragment shader
    v_texcoord = zeroToOne;
}
`,cn=`precision mediump float;
uniform sampler2D u_texture;
uniform float u_zoom;
uniform vec2 u_pan;

varying vec2 v_texcoord;

void main() {
    vec2 texCoord = (v_texcoord / u_zoom) + u_pan;

    float alive = texture2D(u_texture, texCoord).x;
    gl_FragColor = vec4(alive, alive, alive, 1.0);
}
`,sn=`precision mediump float;
uniform sampler2D u_texture;
uniform vec2 u_worldSize;
uniform float u_zoom;
uniform vec2 u_pan;

varying vec2 v_texcoord;

void main() {
    vec2 texCoord = (v_texcoord / u_zoom) + u_pan;

    vec4 cell = texture2D(u_texture, texCoord);
    float alive = cell.x;
    float id = cell.y;
    float blue = id / (u_worldSize.x * u_worldSize.y);
    gl_FragColor = vec4(0.0, blue, 1.0, 1.0) * alive;
}

`;let ie,re,Xe;const un=(e,o)=>{const{screenDimensions:n}=o,{height:i,width:c}=n;let r=cn;if(r=sn,re=lt(e,[an,r]),ie={positionLocation:e.getAttribLocation(re,"a_position"),textureLocation:e.getUniformLocation(re,"u_texture"),worldSizeLocation:e.getUniformLocation(re,"u_worldSize"),zoomLocation:e.getUniformLocation(re,"u_zoom"),panLocation:e.getUniformLocation(re,"u_pan")},Xe=e.createBuffer(),!Xe)throw new Error("cant create buffer");e.bindBuffer(e.ARRAY_BUFFER,Xe),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,0,i,c,0,c,0,0,i,c,i]),e.STATIC_DRAW)},dn=e=>{const{gl:o,cellsTex:n,worldDimensions:i,zoomLevel:c,pan:r}=e;o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindTexture(o.TEXTURE_2D,n),o.useProgram(re),o.bindBuffer(o.ARRAY_BUFFER,Xe),o.enableVertexAttribArray(ie.positionLocation),o.vertexAttribPointer(ie.positionLocation,2,o.FLOAT,!1,0,0),o.uniform1i(ie.textureLocation,0),o.uniform2f(ie.worldSizeLocation,i.width,i.height),o.uniform1f(ie.zoomLocation,Math.max(c,1)),o.uniform2f(ie.panLocation,r.x,r.y),o.drawArrays(o.TRIANGLES,0,6)};function ln(e,o,n){function i(){const r=e.getElementById(o);r&&(e.fullscreenElement&&e.exitFullscreen&&e.exitFullscreen(),r.width=n.width,r.height=n.height)}function c(){const r=e.getElementById(o);r&&(e.fullscreenElement||r.requestFullscreen())}return e.addEventListener("fullscreenchange",()=>{e.fullscreenElement===null&&i()}),{enableFullscreen:c,disableFullscreen:i}}function Wo(e,o){const{worldDimensions:n,initialDensity:i,mode:c}=o;let r=i;r>1&&(r=1);const a=n.width*n.height;let t=new Array(a).fill(0);return c==="random"&&(t=t.map(d=>Math.random()<r?1:0)),{cellsTex:dt(e,new Float32Array(t.map((d,b)=>[d,b,0,0]).flat()),n.width,n.height)}}const fn=` attribute vec2 aPosition;

 void main() {
   gl_Position = vec4(aPosition, 0.0, 1.0);
 }
`,mn=`precision highp float;

uniform sampler2D uInputTexture;
uniform vec2 uTextureSize;
uniform vec2 uMouseCoordinates;
uniform int uMouseMode; // 0 do nothing; 1 draw; 2 erase
uniform int uInfiniteSource; // 0 do nothing; 1 generate cells

// Gold Noise 2015 dcerisano@standard3d.com
// - based on the Golden Ratio
// - uniform normalized distribution
// - fastest static noise generator function (also runs at low precision)
// - use with indicated fractional seeding method.
float PHI = 1.61803398874989484820459;  //  Golden Ratio

float gold_noise(in vec2 xy, in float seed){
       return fract(tan(distance(xy*PHI, xy)*seed)*xy.x);
}

vec2 wrapCoord(vec2 coord) {
    if (coord.x >= 1.0) {
        coord.x = 0.0;
    }
    if (coord.x < 0.0) {
        coord.x = 1.0;
    }

    if (coord.y > 1.0) {
        coord.y = 0.0;
    }
    if (coord.y < 0.0) {
        coord.y = 1.0;
    }
    return coord;
}

void main() {
    vec2 texcoord = gl_FragCoord.xy / uTextureSize;
    vec4 cell = texture2D(uInputTexture, texcoord);
    float alive = cell.x;
    float id = cell.y;

    vec2 topLeftCoord  = wrapCoord(texcoord + (vec2(-1.0, -1.0) / uTextureSize));
    vec2 topCoord      = wrapCoord(texcoord + (vec2(0.0, -1.0) / uTextureSize));
    vec2 topRightCoord = wrapCoord(texcoord + (vec2(1.0, -1.0) / uTextureSize));

    vec2 leftCoord  = wrapCoord(texcoord + (vec2(-1.0, 0.0) / uTextureSize));
    vec2 rightCoord = wrapCoord(texcoord + (vec2(1.0, 0.0) / uTextureSize));

    vec2 bottomLeftCoord  = wrapCoord(texcoord + (vec2(-1.0, 1.0) / uTextureSize));
    vec2 bottomCoord      = wrapCoord(texcoord + (vec2(0.0, 1.0) / uTextureSize));
    vec2 bottomRightCoord = wrapCoord(texcoord + (vec2(1.0, 1.0) / uTextureSize));

    float topLeftAlive  = texture2D(uInputTexture, topLeftCoord ).x;
    float topAlive      = texture2D(uInputTexture, topCoord     ).x;
    float topRightAlive = texture2D(uInputTexture, topRightCoord).x;

    float leftAlive  = texture2D(uInputTexture, leftCoord ).x;;
    float rightAlive = texture2D(uInputTexture, rightCoord).x;

    float bottomLeftAlive  = texture2D(uInputTexture, bottomLeftCoord ).x;
    float bottomAlive      = texture2D(uInputTexture, bottomCoord     ).x;
    float bottomRightAlive = texture2D(uInputTexture, bottomRightCoord).x;

    float aliveNeighbors = topLeftAlive + topAlive + topRightAlive + leftAlive + rightAlive + bottomLeftAlive + bottomAlive + bottomRightAlive;

    float nextAlive = 0.0;
    if (alive == 1.0 && (aliveNeighbors == 2.0 || aliveNeighbors == 3.0)) {
        nextAlive = 1.0;
    } else if (alive == 0.0 && aliveNeighbors == 3.0) {
        nextAlive = 1.0;
    }

    if (uMouseMode != 0 && distance(texcoord, uMouseCoordinates) < 0.02) {
        // if (gold_noise(texcoord, 121234.0) < 0.05) {
        //     nextAlive = 1.0;
        // }
        if (uMouseMode == 1 && gold_noise(texcoord, 121234.0) < 0.05) {
            nextAlive = 1.0;
        } else if (uMouseMode == 2) {
            nextAlive = 0.0;
        }
    }

    if (uInfiniteSource == 1 && distance(texcoord, vec2(0.5, 0.5)) < 0.02) {
        if (gold_noise(texcoord, 155790.0) < 0.05) {
            nextAlive = 1.0;
        }
    }

    gl_FragColor = vec4(nextAlive, id, 0.0, 0.0);
}
`;let j,Z,bo,Ie,ao,ko,Oo,Ee,We;const Ho=(e,o)=>{const{cellsTex:n,texDimensions:i}=o;return Z=lt(e,[fn,mn]),j={uInputTextureLocation:e.getUniformLocation(Z,"uInputTexture"),uTextureSizeLocation:e.getUniformLocation(Z,"uTextureSize"),uMouseCoordinatesLocation:e.getUniformLocation(Z,"uMouseCoordinates"),uMouseModeLocation:e.getUniformLocation(Z,"uMouseMode"),uInfiniteSourceLocation:e.getUniformLocation(Z,"uInfiniteSource"),positionLocation:e.getAttribLocation(Z,"aPosition")},bo=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,bo),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW),Ie=n,ao=dt(e,null,i.width,i.height),ko=Xo(e,Ie),Oo=Xo(e,ao),Ee={fb:ko,tex:Ie},We={fb:Oo,tex:ao},Ie},bn=e=>{const{gl:o,worldDimensions:n,screenDimensions:i,mouseCoordinates:c,mouseMode:r,infiniteSource:a}=e;o.bindFramebuffer(o.FRAMEBUFFER,We.fb),o.viewport(0,0,i.width,i.height),o.bindBuffer(o.ARRAY_BUFFER,bo),o.enableVertexAttribArray(j.positionLocation),o.vertexAttribPointer(j.positionLocation,2,o.FLOAT,!1,0,0),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,Ee.tex),o.useProgram(Z),o.uniform1i(j.uInputTextureLocation,0),o.uniform2f(j.uTextureSizeLocation,n.width,n.height),o.uniform2f(j.uMouseCoordinatesLocation,c.x,c.y),o.uniform1i(j.uMouseModeLocation,r),o.uniform1i(j.uInfiniteSourceLocation,a?1:0),o.drawArrays(o.TRIANGLES,0,6);{const t=Ee;Ee=We,We=t}return Ee.tex};var hn=V('<canvas id="canvas" style="background-color: black"></canvas> <div><button> </button> <button> </button> <button>Zoom in (I)</button> <button>Zoom out (O)</button> <button>Reset zoom (Z)</button></div> <div><span> </span> <button>Reload program</button> <button>Fullscreen (f)</button></div> <div><button>Reset world (R)</button> <button>Empty world (E)</button> <span><label for="initialDensity">Initial density [0-1]</label> <input id="initialDensity" type="number"/></span> <span><label for="worldWidth">World: width</label> <input id="worldWidth" type="number"/> <label for="worldHeight">height</label> <input id="worldHeight" type="number"/></span></div>',1);function xn(e,o){ce(o,!0);const n={width:1200,height:900},i=fo({width:1200,height:900}),c={x:-100,y:-100},r=fo({x:0,y:0});let a=0,t=ae(!0),s=ae(1),d=ae(.05),b=ae(!0),v,h,A;function x(){cancelAnimationFrame(A),h=en(),rn(h.canvas);const C=Wo(h,{mode:"random",worldDimensions:i,initialDensity:_(d)});v=Ho(h,{cellsTex:C.cellsTex,texDimensions:i}),un(h,{screenDimensions:n});function E(){_(b)||(v=bn({gl:h,worldDimensions:i,screenDimensions:n,mouseCoordinates:c,mouseMode:a,infiniteSource:_(t)}));const U=.005;return c.x<.2&&r.x>=U&&(r.x-=U),c.x>.8&&r.x<1-1/_(s)&&(r.x+=U),c.y<.2&&r.y>=U&&(r.y-=U),c.y>.8&&r.y<1-1/_(s)&&(r.y+=U),dn({gl:h,cellsTex:v,worldDimensions:i,zoomLevel:_(s),pan:r}),A=requestAnimationFrame(E)}A=requestAnimationFrame(E)}let T=ae(void 0);xe(()=>{x(),z(T,ln(document,"canvas",n).enableFullscreen,!0),document.addEventListener("keydown",E=>{if(E.code==="Space"&&(z(b,!_(b)),E.preventDefault()),E.code==="KeyF"){_(T)?.();return}if(E.code==="KeyR"){l("random");return}if(E.code==="KeyE"){l("zero");return}if(E.code==="KeyI"){zt(s);return}if(E.code==="KeyS"){z(t,!_(t));return}if(E.code==="KeyO"){z(s,Math.max(_(s)-1,1),!0),_(s)===1&&(r.x=0,r.y=0);return}if(E.code==="KeyZ"){z(s,1),r.x=0,r.y=0;return}});const C=document.getElementById("canvas");if(!C)throw new Error("Canvas unavailable");C.addEventListener("mousemove",E=>{const U=C.getBoundingClientRect(),yt=C.width/U.width,Ft=C.height/U.height,$o={x:(E.clientX-U.left)*yt,y:(E.clientY-U.top)*Ft};c.x=$o.x/n.width,c.y=$o.y/n.height}),C.addEventListener("mousedown",E=>{E.preventDefault(),E.button===0?a=1:E.button===2&&(a=2)}),C.addEventListener("mouseup",E=>{E.preventDefault(),a=0}),C.addEventListener("contextmenu",E=>(E.preventDefault(),!1))});const l=C=>{i.width=Math.min(i.width,n.width),i.height=Math.min(i.height,n.height);const E=Wo(h,{mode:C,worldDimensions:i,initialDensity:_(d)});v=Ho(h,{cellsTex:E.cellsTex,texDimensions:i})};var u=hn(),f=je(u),m=g(f,2),p=$(m),w=$(p);y(p);var F=g(p,2),B=$(F);y(F);var R=g(F,2),I=g(R,2),S=g(I,2);y(m);var de=g(m,2),to=$(de),St=$(to);y(to);var Ro=g(to,2),$t=g(Ro,2);y(de);var Co=g(de,2),Do=$(Co),Lo=g(Do,2),no=g(Lo,2),ye=g($(no),2);Le(ye),D(ye,"min",0),D(ye,"max",1),y(no);var So=g(no,2),pe=g($(So),2);Le(pe),D(pe,"min",0);var Fe=g(pe,4);Le(Fe),D(Fe,"min",0),y(So),y(Co),se(()=>{D(f,"width",n.width),D(f,"height",n.height),he(w,`${_(b)?"Play":"Pause"} (Space)`),he(B,`${_(t)?"Disable":"Enable"} constant cells generation (E)`),he(St,`World ${i.width??""} x ${i.height??""} (${i.width*i.height} cells)`)}),L("click",p,()=>z(b,!_(b))),L("click",F,()=>z(t,!_(t))),L("click",R,()=>z(s,_(s)+1)),L("click",I,()=>{z(s,Math.max(_(s)-1,1),!0),_(s)===1&&(r.x=0,r.y=0)}),L("click",S,()=>z(s,1)),L("click",Ro,()=>x()),L("click",$t,function(...C){_(T)?.apply(this,C)}),L("click",Do,()=>l("random")),L("click",Lo,()=>l("zero")),Se(ye,()=>_(d),C=>z(d,C)),L("change",pe,()=>l("random")),Se(pe,()=>i.width,C=>i.width=C),L("change",Fe,()=>l("random")),Se(Fe,()=>i.height,C=>i.height=C),P(e,u),ue()}ct(["click","change"]);const pn=["VERTEX_SHADER","FRAGMENT_SHADER"];function vn(){const e=document.getElementById("canvas");if(!e)throw"canvas undefined";const o=e.getContext("webgl");if(!o)throw"gl undefined";return Tn(o),o}function Tn(e){if(!e.getExtension("OES_texture_float"))throw alert("Need OES_texture_float"),"Need OES_texture_float";if(!e.getExtension("WEBGL_color_buffer_float"))throw alert("Need WEBGL_color_buffer_float"),"Need WEBGL_color_buffer_float";if(e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS)<1)throw alert("Can not use textures in vertex shaders"),"Can not use textures in vertex shaders"}function ft(e,o,n,i){const c=e.createTexture();if(!c)throw"Can not create texture";return e.bindTexture(e.TEXTURE_2D,c),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,n,i,0,e.RGBA,e.FLOAT,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),c}function Yo(e,o){const n=e.createFramebuffer();if(!n)throw"Can not create frame buffer";return e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,o,0),n}function mt(e,o,n,i,c){const r=[];for(let t=0;t<o.length;++t){const s=pn[t]==="VERTEX_SHADER"?e.VERTEX_SHADER:e.FRAGMENT_SHADER,d=_n(e,o[t],s);if(!d)throw"Can not create shader";r.push(d)}const a=gn(e,r);if(!a)throw"Can not create program";return a}function _n(e,o,n,i){const c=console.log,r=e.createShader(n);if(!r)throw"Could not load shader";if(e.shaderSource(r,o),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS)){const t=e.getShaderInfoLog(r);return c(new Error("*** Error compiling shader '"+r+"':"+t+`
`+o.split(`
`).map((s,d)=>`${d+1}: ${s}`).join(`
`))),e.deleteShader(r),null}return r}function gn(e,o,n,i,c){const r=console.log,a=e.createProgram();if(!a)throw"Could not create program";if(o.forEach(function(s){e.attachShader(a,s)}),e.linkProgram(a),!e.getProgramParameter(a,e.LINK_STATUS)){const s=e.getProgramInfoLog(a);return r("Error in program linking:"+s),e.deleteProgram(a),null}return a}function wn(e,o){o=o||1;const n=e.clientWidth*o|0,i=e.clientHeight*o|0;return e.width!==n||e.height!==i?(e.width=n,e.height=i,!0):!1}const En=`precision mediump float;
attribute vec2 a_position;
uniform vec2 u_worldSize;

uniform float u_zoom;
uniform vec2 u_pan;

varying vec2 v_texcoord;

void main() {
    // Handle zoom and pan
    vec2 position = (a_position * u_zoom) + u_pan;
    // Convert the position from pixels to normalized space (-1 to +1)
    vec2 zeroToOne = position / u_worldSize;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clipSpace = zeroToTwo - 1.0;



    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

    // Pass the texture coordinate to the fragment shader
    v_texcoord = zeroToOne;
}
`,An=`precision mediump float;
uniform sampler2D u_texture;
uniform float u_zoom;
uniform vec2 u_pan;

varying vec2 v_texcoord;

void main() {
    vec2 texCoord = (v_texcoord / u_zoom) + u_pan;

    float alive = texture2D(u_texture, texCoord).x;
    gl_FragColor = vec4(alive, alive, alive, 1.0);
}
`,Rn=`precision mediump float;
uniform sampler2D u_texture;
uniform vec2 u_worldSize;
uniform float u_zoom;
uniform vec2 u_pan;

varying vec2 v_texcoord;

void main() {
    vec2 texCoord = (v_texcoord / u_zoom) + u_pan;

    vec4 cell = texture2D(u_texture, texCoord);
    float alive = cell.x;
    float id = cell.y;
    float blue = id / (u_worldSize.x * u_worldSize.y);
    gl_FragColor = vec4(0.3, blue, 0.8, 1.0) * alive;
}

`,Cn=`precision mediump float;
uniform sampler2D u_texture;
uniform vec2 u_worldSize;
uniform float u_zoom;
uniform vec2 u_pan;
uniform float u_iteration;

varying vec2 v_texcoord;

void main() {
    vec2 texCoord = (v_texcoord / u_zoom) + u_pan;

    vec4 cell = texture2D(u_texture, texCoord);
    float alive = cell.x;
    float updatedAt = cell.z;
    float blue = updatedAt / float(u_iteration);
    gl_FragColor = vec4(blue, 0.0, 1.0, 1.0) * alive;
}

`;let J,Q,ke;const Vo=(e,o)=>{const{screenDimensions:n,mode:i}=o,{height:c,width:r}=n;let a=An;if(i==="gradiant"?a=Rn:i==="age_gradiant"&&(a=Cn),Q=mt(e,[En,a]),J={positionLocation:e.getAttribLocation(Q,"a_position"),textureLocation:e.getUniformLocation(Q,"u_texture"),worldSizeLocation:e.getUniformLocation(Q,"u_worldSize"),zoomLocation:e.getUniformLocation(Q,"u_zoom"),panLocation:e.getUniformLocation(Q,"u_pan"),iterationLocation:e.getUniformLocation(Q,"u_iteration")},ke=e.createBuffer(),!ke)throw new Error("cant create buffer");e.bindBuffer(e.ARRAY_BUFFER,ke),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,0,c,r,0,r,0,0,c,r,c]),e.STATIC_DRAW)},Dn=e=>{const{gl:o,cellsTex:n,worldDimensions:i,zoomLevel:c,pan:r,iteration:a}=e;o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindTexture(o.TEXTURE_2D,n),o.useProgram(Q),o.bindBuffer(o.ARRAY_BUFFER,ke),o.enableVertexAttribArray(J.positionLocation),o.vertexAttribPointer(J.positionLocation,2,o.FLOAT,!1,0,0),o.uniform1i(J.textureLocation,0),o.uniform2f(J.worldSizeLocation,i.width,i.height),o.uniform1f(J.zoomLocation,Math.max(c,1)),o.uniform2f(J.panLocation,r.x,r.y),o.uniform1f(J.iterationLocation,a),o.drawArrays(o.TRIANGLES,0,6)};function Ko(e,o){const{worldDimensions:n,initialDensity:i,mode:c}=o;let r=i;r>1&&(r=1);const a=n.width*n.height;let t=new Array(a).fill(0);return c==="random"&&(t=t.map(d=>Math.random()<r?1:0)),{cellsTex:ft(e,new Float32Array(t.map((d,b)=>[d,b,0,0]).flat()),n.width,n.height)}}const Ln=` attribute vec2 aPosition;

 void main() {
   gl_Position = vec4(aPosition, 0.0, 1.0);
 }
`,Sn=`precision highp float;

uniform sampler2D uInputTexture;
uniform vec2 uTextureSize;
uniform vec2 uMouseCoordinates;
uniform int uMouseMode; // 0 do nothing; 1 draw; 2 erase
uniform int uInfiniteSource; // 0 do nothing; 1 generate cells
uniform float uIteration;

// Gold Noise 2015 dcerisano@standard3d.com
// - based on the Golden Ratio
// - uniform normalized distribution
// - fastest static noise generator function (also runs at low precision)
// - use with indicated fractional seeding method.
float PHI = 1.61803398874989484820459;  //  Golden Ratio

float gold_noise(in vec2 xy, in float seed){
       return fract(tan(distance(xy*PHI, xy)*seed)*xy.x);
}

vec2 wrapCoord(vec2 coord) {
    if (coord.x >= 1.0) {
        coord.x = 0.0;
    }
    if (coord.x < 0.0) {
        coord.x = 1.0;
    }

    if (coord.y > 1.0) {
        coord.y = 0.0;
    }
    if (coord.y < 0.0) {
        coord.y = 1.0;
    }
    return coord;
}

void main() {
    vec2 texcoord = gl_FragCoord.xy / uTextureSize;
    vec4 cell = texture2D(uInputTexture, texcoord);
    float alive = cell.x;
    float id = cell.y;
    float updatedAt = cell.z;

    vec2 topLeftCoord  = wrapCoord(texcoord + (vec2(-1.0, -1.0) / uTextureSize));
    vec2 topCoord      = wrapCoord(texcoord + (vec2(0.0, -1.0) / uTextureSize));
    vec2 topRightCoord = wrapCoord(texcoord + (vec2(1.0, -1.0) / uTextureSize));

    vec2 leftCoord  = wrapCoord(texcoord + (vec2(-1.0, 0.0) / uTextureSize));
    vec2 rightCoord = wrapCoord(texcoord + (vec2(1.0, 0.0) / uTextureSize));

    vec2 bottomLeftCoord  = wrapCoord(texcoord + (vec2(-1.0, 1.0) / uTextureSize));
    vec2 bottomCoord      = wrapCoord(texcoord + (vec2(0.0, 1.0) / uTextureSize));
    vec2 bottomRightCoord = wrapCoord(texcoord + (vec2(1.0, 1.0) / uTextureSize));

    float topLeftAlive  = texture2D(uInputTexture, topLeftCoord ).x;
    float topAlive      = texture2D(uInputTexture, topCoord     ).x;
    float topRightAlive = texture2D(uInputTexture, topRightCoord).x;

    float leftAlive  = texture2D(uInputTexture, leftCoord ).x;;
    float rightAlive = texture2D(uInputTexture, rightCoord).x;

    float bottomLeftAlive  = texture2D(uInputTexture, bottomLeftCoord ).x;
    float bottomAlive      = texture2D(uInputTexture, bottomCoord     ).x;
    float bottomRightAlive = texture2D(uInputTexture, bottomRightCoord).x;

    float aliveNeighbors = topLeftAlive + topAlive + topRightAlive + leftAlive + rightAlive + bottomLeftAlive + bottomAlive + bottomRightAlive;

    float nextAlive = 0.0;
    if (alive == 1.0 && (aliveNeighbors == 2.0 || aliveNeighbors == 3.0)) {
        nextAlive = 1.0;
    } else if (alive == 0.0 && aliveNeighbors == 3.0) {
        nextAlive = 1.0;
    }

    if (uMouseMode != 0 && distance(texcoord, uMouseCoordinates) < 0.02) {
        if (uMouseMode == 1 && gold_noise(texcoord, 121234.0 + uIteration) < 0.1) {
            nextAlive = 1.0;
        } else if (uMouseMode == 2) {
            nextAlive = 0.0;
        }
    }

    if (uInfiniteSource == 1 && distance(texcoord, vec2(0.5, 0.5)) < 0.02) {
        if (gold_noise(texcoord, 155790.0 + uIteration) < 0.05) {
            nextAlive = 1.0;
        }
    }


    if (alive != nextAlive) {
        updatedAt = uIteration;
    }

    gl_FragColor = vec4(nextAlive, id, updatedAt, 0.0);
}
`;let K,q,ho,Pe,co,qo,jo,Ae,Oe;const Zo=(e,o)=>{const{cellsTex:n,texDimensions:i}=o;return q=mt(e,[Ln,Sn]),K={uInputTextureLocation:e.getUniformLocation(q,"uInputTexture"),uTextureSizeLocation:e.getUniformLocation(q,"uTextureSize"),uMouseCoordinatesLocation:e.getUniformLocation(q,"uMouseCoordinates"),uMouseModeLocation:e.getUniformLocation(q,"uMouseMode"),uInfiniteSourceLocation:e.getUniformLocation(q,"uInfiniteSource"),uIterationLocation:e.getUniformLocation(q,"uIteration"),positionLocation:e.getAttribLocation(q,"aPosition")},ho=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,ho),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW),Pe=n,co=ft(e,null,i.width,i.height),qo=Yo(e,Pe),jo=Yo(e,co),Ae={fb:qo,tex:Pe},Oe={fb:jo,tex:co},Pe},$n=e=>{const{gl:o,worldDimensions:n,screenDimensions:i,mouseCoordinates:c,mouseMode:r,infiniteSource:a,iteration:t}=e;o.bindFramebuffer(o.FRAMEBUFFER,Oe.fb),o.viewport(0,0,i.width,i.height),o.bindBuffer(o.ARRAY_BUFFER,ho),o.enableVertexAttribArray(K.positionLocation),o.vertexAttribPointer(K.positionLocation,2,o.FLOAT,!1,0,0),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,Ae.tex),o.useProgram(q),o.uniform1i(K.uInputTextureLocation,0),o.uniform2f(K.uTextureSizeLocation,n.width,n.height),o.uniform2f(K.uMouseCoordinatesLocation,c.x,c.y),o.uniform1i(K.uMouseModeLocation,r),o.uniform1i(K.uInfiniteSourceLocation,a?1:0),o.uniform1f(K.uIterationLocation,t),o.drawArrays(o.TRIANGLES,0,6);{const s=Ae;Ae=Oe,Oe=s}return Ae.tex};var yn=V('<canvas id="canvas" style="background-color: black" class="svelte-mjbn4c"></canvas>');function Fn(e,o){ce(o,!1);const n={x:0,y:0};let i=0,c,r;const a={width:window.innerWidth-50,height:window.innerHeight-10},t={x:0,y:0},s={Pause:!1,"Infinite source":!0,Iteration:0,TimeInSeconds:0,fps:0,"Draw mode":"age_gradiant","Reset grid":()=>T("random"),"Empty grid":()=>T("zero"),"Initial density":.05,"World width":a.width,"World height":a.height,Cells:(a.width*a.height).toString(),"Zoom level":1,"Pan reset":()=>{t.x=0,t.y=0},"Reload progam":()=>x()};let d;const b=async()=>{const u=await oo(()=>import("../chunks/QkjeJdyK.js"),[],import.meta.url);d=new u.GUI,d.add(s,"Pause").listen(),d.add(s,"Infinite source").listen(),d.add(s,"TimeInSeconds").listen(),d.add(s,"Iteration").listen(),d.add(s,"fps").listen(),d.add(s,"Draw mode",{White:"white","Age Gradiant":"age_gradiant","Position Gradiant":"gradiant"}).onFinishChange(()=>Vo(v,{screenDimensions:a,mode:s["Draw mode"]})),d.add(s,"Reset grid"),d.add(s,"Empty grid"),d.add(s,"Initial density",0,1,.01).onFinishChange(()=>T("random")),d.add(s,"World width",1,a.width,1).onFinishChange(()=>{s.Cells=(s["World height"]*s["World width"]).toString(),T("random")}),d.add(s,"World height",1,a.height,1).onFinishChange(()=>{s.Cells=(s["World height"]*s["World width"]).toString(),T("random")}),d.add(s,"Cells").listen(),d.add(s,"Zoom level",1,10),d.add(s,"Pan reset"),d.add(s,"Reload progam")};let v,h,A;function x(){c=Date.now()/1e3,cancelAnimationFrame(A),v=vn(),wn(v.canvas);const u=Ko(v,{mode:"random",worldDimensions:{width:s["World width"],height:s["World height"]},initialDensity:s["Initial density"]});h=Zo(v,{cellsTex:u.cellsTex,texDimensions:{width:s["World width"],height:s["World height"]}}),Vo(v,{screenDimensions:a,mode:s["Draw mode"]});function f(){if(!s.Pause){const p=Date.now()/1e3,w=p-r;s.fps=1/w,r=p,s.TimeInSeconds=p-c,s.Iteration++,h=$n({gl:v,worldDimensions:{width:s["World width"],height:s["World height"]},screenDimensions:a,mouseCoordinates:n,mouseMode:i,infiniteSource:s["Infinite source"],iteration:s.Iteration})}const m=.005;return n.x<.1&&t.x>=m&&(t.x-=m),n.x>.9&&t.x<1-1/s["Zoom level"]&&(t.x+=m),n.y<.1&&t.y>=m&&(t.y-=m),n.y>.9&&t.y<1-1/s["Zoom level"]&&(t.y+=m),Dn({gl:v,cellsTex:h,worldDimensions:{width:s["World width"],height:s["World height"]},zoomLevel:s["Zoom level"],pan:t,iteration:s.Iteration}),A=requestAnimationFrame(f)}A=requestAnimationFrame(f)}xe(()=>{x(),b(),document.addEventListener("keydown",f=>{if(f.code==="Space"&&(s.Pause=!s.Pause,f.preventDefault()),f.code==="KeyR"){T("random");return}if(f.code==="KeyE"){T("zero");return}if(f.code==="KeyS"){s["Infinite source"]=!s["Infinite source"];return}});const u=document.getElementById("canvas");if(!u)throw new Error("Canvas unavailable");u.addEventListener("mousemove",f=>{const m=u.getBoundingClientRect(),p=u.width/m.width,w=u.height/m.height,F={x:(f.clientX-m.left)*p,y:(f.clientY-m.top)*w};n.x=F.x/a.width,n.y=F.y/a.height}),u.addEventListener("mousedown",f=>{f.preventDefault(),f.button===0?i=1:f.button===2&&(i=2)}),u.addEventListener("mouseup",f=>{f.preventDefault(),i=0}),u.addEventListener("contextmenu",f=>(f.preventDefault(),!1))}),eo(()=>{d.destroy()});const T=u=>{s.Iteration=0,s.TimeInSeconds=0;const f=Ko(v,{mode:u,worldDimensions:{width:s["World width"],height:s["World height"]},initialDensity:s["Initial density"]});h=Zo(v,{cellsTex:f.cellsTex,texDimensions:{width:s["World width"],height:s["World height"]}})};$e();var l=yn();se(()=>{D(l,"width",a.width),D(l,"height",a.height)}),P(e,l),ue()}const zn=["VERTEX_SHADER","FRAGMENT_SHADER"];function In(){const e=document.getElementById("canvas");if(!e)throw"canvas undefined";const o=e.getContext("webgl");if(!o)throw"gl undefined";return Pn(o),o}function Pn(e){if(!e.getExtension("OES_texture_float"))throw alert("Need OES_texture_float"),"Need OES_texture_float";if(!e.getExtension("WEBGL_color_buffer_float"))throw alert("Need WEBGL_color_buffer_float"),"Need WEBGL_color_buffer_float";if(e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS)<1)throw alert("Can not use textures in vertex shaders"),"Can not use textures in vertex shaders"}function bt(e,o,n,i){const c=e.createTexture();if(!c)throw"Can not create texture";return e.bindTexture(e.TEXTURE_2D,c),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,n,i,0,e.RGBA,e.FLOAT,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),c}function Jo(e,o){const n=e.createFramebuffer();if(!n)throw"Can not create frame buffer";return e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,o,0),n}function ht(e,o,n,i,c){const r=[];for(let t=0;t<o.length;++t){const s=zn[t]==="VERTEX_SHADER"?e.VERTEX_SHADER:e.FRAGMENT_SHADER,d=Mn(e,o[t],s);if(!d)throw"Can not create shader";r.push(d)}const a=Un(e,r);if(!a)throw"Can not create program";return a}function Mn(e,o,n,i){const c=console.log,r=e.createShader(n);if(!r)throw"Could not load shader";if(e.shaderSource(r,o),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS)){const t=e.getShaderInfoLog(r);return c(new Error("*** Error compiling shader '"+r+"':"+t+`
`+o.split(`
`).map((s,d)=>`${d+1}: ${s}`).join(`
`))),e.deleteShader(r),null}return r}function Un(e,o,n,i,c){const r=console.log,a=e.createProgram();if(!a)throw"Could not create program";if(o.forEach(function(s){e.attachShader(a,s)}),e.linkProgram(a),!e.getProgramParameter(a,e.LINK_STATUS)){const s=e.getProgramInfoLog(a);return r("Error in program linking:"+s),e.deleteProgram(a),null}return a}function Bn(e,o){o=o||1;const n=e.clientWidth*o|0,i=e.clientHeight*o|0;return e.width!==n||e.height!==i?(e.width=n,e.height=i,!0):!1}function xt(e,o){const{worldDimensions:n,initialDensity:i,mode:c}=o;let r=i;r>1&&(r=1);const a=n.width*n.height;let t=new Array(a).fill(0);return c==="random"&&(t=t.map(d=>Math.random()<r?1:0)),{cellsTex:bt(e,new Float32Array(t.map((d,b)=>[d,b,0,0]).flat()),n.width,n.height)}}const Gn=` attribute vec2 aPosition;

 void main() {
   gl_Position = vec4(aPosition, 0.0, 1.0);
 }
`,Nn=`precision highp float;

uniform sampler2D uInputTexture;
uniform vec2 uTextureSize;
uniform vec2 uMouseCoordinates;
uniform int uMouseMode; // 0 do nothing; 1 draw; 2 erase
uniform int uInfiniteSource; // 0 do nothing; 1 generate cells
uniform int uPause; // 1 Don't compute game of life rules but compute other decisions like source and mouse;
                    // 0 Also compute game of life rules
uniform float uIteration;

// Gold Noise 2015 dcerisano@standard3d.com
// - based on the Golden Ratio
// - uniform normalized distribution
// - fastest static noise generator function (also runs at low precision)
// - use with indicated fractional seeding method.
float PHI = 1.61803398874989484820459;  //  Golden Ratio

float gold_noise(in vec2 xy, in float seed){
       return fract(tan(distance(xy*PHI, xy)*seed)*xy.x);
}

vec2 wrapCoord(vec2 coord) {
    if (coord.x >= 1.0) {
        coord.x = 0.0;
    }
    if (coord.x < 0.0) {
        coord.x = 1.0;
    }

    if (coord.y > 1.0) {
        coord.y = 0.0;
    }
    if (coord.y < 0.0) {
        coord.y = 1.0;
    }
    return coord;
}

float getNextState(vec2 texcoord, vec4 cell) {
    float alive = cell.x;

    if (uPause == 1) {
        return alive;
    }

    vec2 topLeftCoord  = wrapCoord(texcoord + (vec2(-1.0, -1.0) / uTextureSize));
    vec2 topCoord      = wrapCoord(texcoord + (vec2(0.0, -1.0) / uTextureSize));
    vec2 topRightCoord = wrapCoord(texcoord + (vec2(1.0, -1.0) / uTextureSize));

    vec2 leftCoord  = wrapCoord(texcoord + (vec2(-1.0, 0.0) / uTextureSize));
    vec2 rightCoord = wrapCoord(texcoord + (vec2(1.0, 0.0) / uTextureSize));

    vec2 bottomLeftCoord  = wrapCoord(texcoord + (vec2(-1.0, 1.0) / uTextureSize));
    vec2 bottomCoord      = wrapCoord(texcoord + (vec2(0.0, 1.0) / uTextureSize));
    vec2 bottomRightCoord = wrapCoord(texcoord + (vec2(1.0, 1.0) / uTextureSize));

    float topLeftAlive  = texture2D(uInputTexture, topLeftCoord ).x;
    float topAlive      = texture2D(uInputTexture, topCoord     ).x;
    float topRightAlive = texture2D(uInputTexture, topRightCoord).x;

    float leftAlive  = texture2D(uInputTexture, leftCoord ).x;;
    float rightAlive = texture2D(uInputTexture, rightCoord).x;

    float bottomLeftAlive  = texture2D(uInputTexture, bottomLeftCoord ).x;
    float bottomAlive      = texture2D(uInputTexture, bottomCoord     ).x;
    float bottomRightAlive = texture2D(uInputTexture, bottomRightCoord).x;

    float aliveNeighbors = topLeftAlive + topAlive + topRightAlive + leftAlive + rightAlive + bottomLeftAlive + bottomAlive + bottomRightAlive;

    if (alive == 1.0 && (aliveNeighbors == 2.0 || aliveNeighbors == 3.0)) {
        return 1.0;
    } else if (alive == 0.0 && aliveNeighbors == 3.0) {
        return 1.0;
    }
    return 0.0;
}

float getSourceDecision(vec2 texcoord, float currentDecision) {
    if (uPause == 1 || uInfiniteSource == 0 || distance(texcoord, vec2(0.5, 0.5)) > 0.02) {
        return currentDecision;
    }
    if (gold_noise(texcoord, 155790.0 + uIteration) < 0.05) {
        return 1.0;
    }
    return currentDecision;
}

float getMouseDecision(vec2 texcoord, float currentDecision) {
    if (uMouseMode == 0) {
        return currentDecision;
    }
    if (distance(texcoord, uMouseCoordinates) < 0.02) {
        if (uMouseMode == 1 && gold_noise(texcoord, 121234.0 + uIteration) < 0.1) {
            return 1.0;
        } else if (uMouseMode == 2) {
            return 0.0;
        }
    }
    return currentDecision;
}

void main() {
    vec2 texcoord = gl_FragCoord.xy / uTextureSize;
    vec4 cell = texture2D(uInputTexture, texcoord);
    float alive = cell.x;
    float id = cell.y;
    float updatedAt = cell.z;

    // Each decision function needs the previous decision in case
    // the decision is to do nothing
    float golDecision = getNextState(texcoord, cell);
    float sourceDecision = getSourceDecision(texcoord, golDecision);
    float finalDecision = getMouseDecision(texcoord, sourceDecision);

    if (alive != finalDecision) {
        updatedAt = uIteration;
    }

    gl_FragColor = vec4(finalDecision, id, updatedAt, 0.0);
}
`;let G,N,xo,Me,so,Qo,et,Re,He;const pt=(e,o)=>{const{cellsTex:n,texDimensions:i}=o;return N=ht(e,[Gn,Nn]),G={uInputTextureLocation:e.getUniformLocation(N,"uInputTexture"),uTextureSizeLocation:e.getUniformLocation(N,"uTextureSize"),uMouseCoordinatesLocation:e.getUniformLocation(N,"uMouseCoordinates"),uMouseModeLocation:e.getUniformLocation(N,"uMouseMode"),uInfiniteSourceLocation:e.getUniformLocation(N,"uInfiniteSource"),uIterationLocation:e.getUniformLocation(N,"uIteration"),uPauseLocation:e.getUniformLocation(N,"uPause"),positionLocation:e.getAttribLocation(N,"aPosition")},xo=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,xo),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW),Me=n,so=bt(e,null,i.width,i.height),Qo=Jo(e,Me),et=Jo(e,so),Re={fb:Qo,tex:Me},He={fb:et,tex:so},Me},Xn=e=>{const{gl:o,worldDimensions:n,screenDimensions:i,mouseCoordinates:c,mouseMode:r,infiniteSource:a,iteration:t,pause:s}=e;o.bindFramebuffer(o.FRAMEBUFFER,He.fb),o.viewport(0,0,i.width,i.height),o.bindBuffer(o.ARRAY_BUFFER,xo),o.enableVertexAttribArray(G.positionLocation),o.vertexAttribPointer(G.positionLocation,2,o.FLOAT,!1,0,0),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,Re.tex),o.useProgram(N),o.uniform1i(G.uInputTextureLocation,0),o.uniform2f(G.uTextureSizeLocation,n.width,n.height),o.uniform2f(G.uMouseCoordinatesLocation,c.x,c.y),o.uniform1i(G.uMouseModeLocation,r),o.uniform1i(G.uInfiniteSourceLocation,a?1:0),o.uniform1f(G.uIterationLocation,t),o.uniform1i(G.uPauseLocation,s?1:0),o.drawArrays(o.TRIANGLES,0,6);{const d=Re;Re=He,He=d}return Re.tex},Wn=`precision mediump float;
attribute vec2 a_position;
uniform vec2 u_worldSize;

uniform float u_zoom;
uniform vec2 u_pan;

varying vec2 v_texcoord;

void main() {
    // Handle zoom and pan
    vec2 position = (a_position * u_zoom) + u_pan;
    // Convert the position from pixels to normalized space (-1 to +1)
    vec2 zeroToOne = position / u_worldSize;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clipSpace = zeroToTwo - 1.0;



    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

    // Pass the texture coordinate to the fragment shader
    v_texcoord = zeroToOne;
}
`,kn=`precision mediump float;
uniform sampler2D u_texture;
uniform float u_zoom;
uniform vec2 u_pan;

varying vec2 v_texcoord;

void main() {
    vec2 texCoord = (v_texcoord / u_zoom) + u_pan;

    float alive = texture2D(u_texture, texCoord).x;
    gl_FragColor = vec4(alive, alive, alive, 1.0);
}
`,On=`precision mediump float;
uniform sampler2D u_texture;
uniform vec2 u_worldSize;
uniform float u_zoom;
uniform vec2 u_pan;

varying vec2 v_texcoord;

void main() {
    vec2 texCoord = (v_texcoord / u_zoom) + u_pan;

    vec4 cell = texture2D(u_texture, texCoord);
    float alive = cell.x;
    float id = cell.y;
    float blue = id / (u_worldSize.x * u_worldSize.y);
    gl_FragColor = vec4(0.3, blue, 0.8, 1.0) * alive;
}

`,Hn=`precision mediump float;
uniform sampler2D u_texture;
uniform vec2 u_worldSize;
uniform float u_zoom;
uniform vec2 u_pan;
uniform float u_iteration;

varying vec2 v_texcoord;

void main() {
    vec2 texCoord = (v_texcoord / u_zoom) + u_pan;

    vec4 cell = texture2D(u_texture, texCoord);
    float alive = cell.x;
    float updatedAt = cell.z;
    float blue = updatedAt / float(u_iteration);
    gl_FragColor = vec4(blue, 0.0, 1.0, 1.0) * alive;
}

`;let ee,oe,Ye;const vt=(e,o)=>{const{screenDimensions:n,mode:i}=o,{height:c,width:r}=n;let a=kn;if(i==="gradiant"?a=On:i==="age_gradiant"&&(a=Hn),oe=ht(e,[Wn,a]),ee={positionLocation:e.getAttribLocation(oe,"a_position"),textureLocation:e.getUniformLocation(oe,"u_texture"),worldSizeLocation:e.getUniformLocation(oe,"u_worldSize"),zoomLocation:e.getUniformLocation(oe,"u_zoom"),panLocation:e.getUniformLocation(oe,"u_pan"),iterationLocation:e.getUniformLocation(oe,"u_iteration")},Ye=e.createBuffer(),!Ye)throw new Error("cant create buffer");e.bindBuffer(e.ARRAY_BUFFER,Ye),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,0,c,r,0,r,0,0,c,r,c]),e.STATIC_DRAW)},Yn=e=>{const{gl:o,cellsTex:n,worldDimensions:i,zoomLevel:c,pan:r,iteration:a}=e;o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindTexture(o.TEXTURE_2D,n),o.useProgram(oe),o.bindBuffer(o.ARRAY_BUFFER,Ye),o.enableVertexAttribArray(ee.positionLocation),o.vertexAttribPointer(ee.positionLocation,2,o.FLOAT,!1,0,0),o.uniform1i(ee.textureLocation,0),o.uniform2f(ee.worldSizeLocation,i.width,i.height),o.uniform1f(ee.zoomLocation,Math.max(c,1)),o.uniform2f(ee.panLocation,r.x,r.y),o.uniform1f(ee.iterationLocation,a),o.drawArrays(o.TRIANGLES,0,6)};let H,Ze;function Vn(e){const{drawMode:o,initialDensity:n,screenDimensions:i,worldDimensions:c}=e;H=In(),Bn(H.canvas);const r=xt(H,{mode:"random",worldDimensions:c,initialDensity:n});Ze=pt(H,{cellsTex:r.cellsTex,texDimensions:c}),vt(H,{screenDimensions:i,mode:o})}function Kn(e){const{infiniteSource:o,iteration:n,mouseCoordinates:i,mouseMode:c,pause:r,pan:a,screenDimensions:t,worldDimensions:s,zoomLevel:d}=e;Ze=Xn({gl:H,worldDimensions:s,screenDimensions:t,mouseCoordinates:i,mouseMode:c,infiniteSource:o,iteration:n,pause:r}),Yn({gl:H,cellsTex:Ze,worldDimensions:s,zoomLevel:d,pan:a,iteration:n})}const qn=e=>{const{worldDimensions:o,mode:n,initialDensity:i}=e,c=xt(H,{mode:n,worldDimensions:o,initialDensity:i});Ze=pt(H,{cellsTex:c.cellsTex,texDimensions:o})},jn=e=>{vt(H,{screenDimensions:e.screenDimensions,mode:e.drawMode})};var Zn=V('<canvas id="canvas" style="background-color: black" class="svelte-ywtwk7"></canvas>');function Jn(e,o){ce(o,!1);const n={x:0,y:0};let i=0,c,r=0;const a={width:window.innerWidth-50,height:window.innerHeight-10},t={program:{pause:!1,infiniteSource:!0,drawMode:"age_gradiant",reloadProgram:()=>h()},simulation:{iteration:0,timeInSeconds:0,fps:0},grid:{resetGrid:()=>x("random"),emptyGrid:()=>x("zero"),initialDensity:.5,worldWidth:a.width,worldHeight:a.height,nbCells:(a.width*a.height).toString()},zoom:{x:0,y:0,xController:null,yController:null,level:1,previousLevel:1}};let s;const d=async()=>{const l=await oo(()=>import("../chunks/QkjeJdyK.js"),[],import.meta.url);s=new l.GUI;const u=s.addFolder("Program");u.open(),u.add(t.program,"pause").name("Pause").listen(),u.add(t.program,"infiniteSource").name("Infinite Source").listen(),u.add(t.program,"drawMode",{White:"white","Age Gradiant":"age_gradiant","Position Gradiant":"gradiant"}).name("Drawing mode").onFinishChange(()=>jn({screenDimensions:a,drawMode:t.program.drawMode})),u.add(t.program,"reloadProgram").name("Reload program");const f=s.addFolder("Simulation");f.open(),f.add(t.simulation,"timeInSeconds").name("Time (s)").listen(),f.add(t.simulation,"iteration").name("Iteration").listen(),f.add(t.simulation,"fps").listen();const m=s.addFolder("Grid");m.open(),m.add(t.grid,"resetGrid").name("Reset grid"),m.add(t.grid,"emptyGrid").name("Empty grid"),m.add(t.grid,"initialDensity",0,1,.01).name("Initial density").onFinishChange(()=>x("random")),m.add(t.grid,"worldWidth",1,a.width,1).name("World width").onFinishChange(()=>{t.grid.nbCells=(t.grid.worldHeight*t.grid.worldWidth).toString(),x("random")}),m.add(t.grid,"worldHeight",1,a.height,1).name("World height").onFinishChange(()=>{t.grid.nbCells=(t.grid.worldHeight*t.grid.worldWidth).toString(),x("random")}),m.add(t.grid,"nbCells").name("Cells count").listen();const p=s.addFolder("Zoom");p.open(),p.add(t.zoom,"level",1,10).name("Level").onChange(function(w){const F=w-t.zoom.previousLevel;if(!t.zoom.xController||!t.zoom.yController||F===0)return;const B=1-1/t.zoom.previousLevel,R=1-1/w;t.zoom.xController.max(R),t.zoom.xController.min(0),t.zoom.yController.max(R),t.zoom.yController.min(0);const I={x:t.zoom.x/B,y:t.zoom.y/B};t.zoom.x=R*I.x||R/2,t.zoom.y=R*I.y||R/2,t.zoom.previousLevel=w}),t.zoom.xController=p.add(t.zoom,"x",0,0,.01).name("X offset").listen(),t.zoom.yController=p.add(t.zoom,"y",0,0,.01).name("Y offset").listen()},b=()=>{document.addEventListener("keydown",u=>{if(u.code==="Space"&&(t.program.pause=!t.program.pause,u.preventDefault()),u.code==="KeyR"){x("random");return}if(u.code==="KeyE"){x("zero");return}if(u.code==="KeyS"){t.program.infiniteSource=!t.program.infiniteSource;return}});const l=document.getElementById("canvas");if(!l)throw new Error("Canvas unavailable");l.addEventListener("mousemove",u=>{const f=l.getBoundingClientRect(),m=l.width/f.width,p=l.height/f.height,w={x:(u.clientX-f.left)*m,y:(u.clientY-f.top)*p};n.x=w.x/a.width,n.y=w.y/a.height}),setInterval(()=>{n.x<.1&&t.zoom.x>=.005&&(t.zoom.x-=.005),n.x>.9&&t.zoom.x<1-1/t.zoom.level&&(t.zoom.x+=.005),n.y<.1&&t.zoom.y>=.005&&(t.zoom.y-=.005),n.y>.9&&t.zoom.y<1-1/t.zoom.level&&(t.zoom.y+=.005)},50),l.addEventListener("mousedown",u=>{u.preventDefault(),u.button===0?i=1:u.button===2&&(i=2)}),l.addEventListener("mouseup",u=>{u.preventDefault(),i=0}),l.addEventListener("contextmenu",u=>(u.preventDefault(),!1))};let v;const h=()=>{Vn({initialDensity:t.grid.initialDensity,worldDimensions:{width:t.grid.worldWidth,height:t.grid.worldHeight},screenDimensions:a,drawMode:t.program.drawMode}),cancelAnimationFrame(v),c=Date.now()/1e3,A()},A=()=>{const l=Date.now()/1e3,u=l-r;r=l,t.simulation.fps=1/u,t.program.pause||(t.simulation.timeInSeconds=l-c,t.simulation.iteration++),Kn({infiniteSource:t.program.infiniteSource,iteration:t.simulation.iteration,mouseCoordinates:n,mouseMode:i,pause:t.program.pause,pan:{x:t.zoom.x,y:t.zoom.y},screenDimensions:a,worldDimensions:{width:t.grid.worldWidth,height:t.grid.worldHeight},zoomLevel:t.zoom.level}),v=requestAnimationFrame(A)},x=l=>{t.simulation.iteration=0,t.simulation.timeInSeconds=0,qn({initialDensity:t.grid.initialDensity,worldDimensions:{width:t.grid.worldWidth,height:t.grid.worldHeight},mode:l})};xe(()=>{d(),b(),h()}),eo(()=>{s.destroy()}),$e();var T=Zn();se(()=>{D(T,"width",a.width),D(T,"height",a.height)}),P(e,T),ue()}const Qn=e=>e.split("").reduce((o,n)=>o.length===0?(o.push(n),o):(n.match(/\d/)&&o[o.length-1]?.match(/\d/)?o[o.length-1]=o[o.length-1]+n:o.push(n),o),[]),ei=e=>{const o=[];if(!e.length)throw new Error("No line items to tokenize");let n={};for(let i=0;i<e.length;i++){const c=e[i],r=c.match(/^\d+$/);if(!r&&!["o","b","$","!"].includes(c))throw new Error(`Invalid configuration item ${c}`);if(r){if(n.count)throw new Error(`Invalid configuration. Two consecutive numbers ${n.count}, ${c}`);n.count=Number(c)}else{if(n.tag)throw new Error(`Invalid configuration. Something went wrong with tokenization at item ${c}, index ${i}`);if(n.count||(n.count=1),c==="!")return o;n.tag=c,o.push(n),n={}}}throw new Error("Invalid configuration. No ending character")},oi=e=>{const{properties:o,tokens:n}=e,i=[[]];for(;n.length;){const c=n.shift();if(!c)break;const{count:r,tag:a}=c;if(a==="!")throw new Error("Invalid token. ! should not have been sent here");if(a==="$"){for(let t=0;t<r;t++)if(i.push([]),i.length>o.y)throw new Error("Invalid token. Vertical dimensions mismatch")}else for(let t=0;t<r;t++)i[i.length-1].push(a==="b"?0:1)}for(;i.length<o.y;)i.push(new Array(o.x).fill(0));for(let c=0;c<i.length;c++)for(;i[c].length<o.x;)i[c].push(0);return i},ti=e=>{const o=e.replaceAll(" ","").split(",").reduce((n,i)=>{const[c,r]=i.split("=");return r.match(/^\d+$/)?n[c]=Number(r):n[c]=r,n},{x:0,y:0});if(!o.x||!o.y)throw new Error("Invalid pattern file: no dimensions");return o},ni=e=>{const o=e.replaceAll(`\r
`,`
`).split(`
`).filter(s=>s!=="").filter(s=>!s.match(/^#/)),n=o.shift(),i=o.join("");if(!n||!o)throw new Error("Invalid pattern file");const c=ti(n),r=Qn(i),a=ei(r),t=oi({properties:c,tokens:a});return{width:c.x,height:c.y,pattern:t}},ii=`#N Big glider\r
#O Dean Hickerson\r
#C The first known diagonal spaceship other than the glider. Has period 4 and speed c/4.\r
#C www.conwaylife.com/wiki/index.php?title=Big_glider\r
x = 18, y = 18, rule = B3/S23\r
3b3o12b$3bo2b3o9b$4bobo11b$2o7bo8b$obo4bo2bo7b$o8b2o7b$b2o15b$bo2bo5bo\r
b2o4b$bo9b2obo3b$3bobo6b2o2bob$4b2obo4b2o3bo$8bo7bob$7b4o3bobob$7bob2o\r
3b4o$8bo3b2obo2b$13b2o3b$9bob3o4b$10bo2bo!`,ri=`#N Candelabra\r
#O Charles Trawick\r
#C A period 3 oscillator.\r
#C www.conwaylife.com/wiki/index.php?title=Candelabra\r
x = 16, y = 6, rule = B3/S23\r
4b2o4b2o4b$bo2bo6bo2bob$obobo6bobobo$bo2bob4obo2bob$4bobo2bobo4b$5bo4b\r
o!`,ai=`#N 131c31climber.rle\r
#C https://conwaylife.com/wiki/(13,1)c/31_Pseudo-B_climber\r
#C https://www.conwaylife.com/patterns/131c31climber.rle\r
x = 37, y = 108, rule = B3/S23\r
o$b2o$2o19$8bo$6bobo$7b2o19$13bobo$14b2o$14bo17$24bo$23b3o$23bob2o$24b\r
o2bo$25b2o$25bo2$22b2o$21bo2$20bobo2bo$20bob3obo$19b3ob2obo$20bobo$20b\r
3o$21bo8$29bo$27bobo$28b2o19$34bobo$35b2o$35bo!`,ci=`#N E-heptomino\r
#O Unknown\r
#C https://conwaylife.com/wiki/E-heptomino\r
#C https://conwaylife.com/patterns/eheptomino.rle\r
x = 4, y = 3, rule = B3/S23\r
b3o$2o$b2o!`,si=`#N gardenofeden5x45.rle\r
#O Steven Eker, 2016\r
#C https://conwaylife.com/wiki/Garden_of_Eden_5%C3%9745\r
#C https://www.conwaylife.com/patterns/gardenofeden5x45.rle\r
x = 45, y = 5, rule = B3/S23\r
2obobo2bob3obo2b3ob7o2b6o2bobobobo$b2obob2obobobobobob3obobobobobobob\r
3obobobo$2b2ob2o2b4o2b6o2b6o2b5ob5obo$b2obob2obobobobobob3obobobobobob\r
ob3obobobo$2obobo2bob3obo2b3ob7o2b6o2bobobobo!`,ui=`#N Glider\r
#O Richard K. Guy\r
#C The smallest, most common, and first discovered spaceship. Diagonal, has period 4 and speed c/4.\r
#C www.conwaylife.com/wiki/index.php?title=Glider\r
x = 3, y = 3, rule = B3/S23\r
bob$2bo$3o!`,di=`#N Gliders by the dozen\r
#C A methuselah with lifespan 184 that emits exactly 12 gliders over the course of its evolution.\r
#C www.conwaylife.com/wiki/index.php?title=Gliders_by_the_dozen\r
x = 5, y = 3, rule = 23/3\r
2o2bo$o3bo$o2b2o!`,li=`#N Glider loop\r
#C A pattern in which two gliders are bounced back and forth along an \r
#C ever-lengthening track.\r
#C www.conwaylife.com/wiki/index.php?title=Glider_loop\r
x = 73, y = 150, rule = b3/s23\r
45bo27b$37b3o5bo27b$36bo2b2o3bobo26b$35bo5bo3bo27b$41bo3bo27b$36b2o2bo\r
32b$25b2o11b2o33b$25b2o46b6$61bo11b$17b2o40b2ob2o9b$17b2o42bo11b3$59b\r
2o12b$58bo2bo11b$51bo5bo3b2o10b$51bo5bo4bo10b$9b2o40bo6bo3bo10b$9b2o\r
37bob3obo3bo2bo11b$48b5obo5bo12b$48bobo22b$52b2o17bob$52b2o9b3o5bob$\r
52bo9bo2b2o3bobo$51b2o8bo5bo3bob$46b2o3bo15bo3bob$17b3o31bo10b2o2bo6b$\r
20bo29b2obo10b2o7b$15b2o4bo30bo20b$18bo3bo50b$14bo4bo2bo50b$14bo3bo3bo\r
50b$14b3obob2o51b$18bo54b$14b4o7b3o45b$14b2o8bo3bo44b$24bo4bo28bo14b$\r
26bo3bo25b2o9b2o4b$23b3obo2bo24b2o8b3obo3b$22bo7bo23bo10bo3bo3b$22bobo\r
3bo26b5o5bob2o4b$21b2obo3bo27bo10bo5b$21b2ob3o46b5$63b2o8b$63b2o8b4$\r
43b3o27b$46bo26b$41b2o4bo25b$44bo3bo6b2o16b$40bo4bo2bo6b2o16b$40bo3bo\r
3bo24b$40b3obob2o25b$44bo28b$40b4o29b$40b2o31b2$47b2o24b$47b2o24b2$33b\r
o39b$33bobo37b$33b2o38b3$38b2o33b$37bobo33b$39bo33b2$24b2o47b$24b2o47b\r
2$31b2o40b$29b4o40b$28bo44b$25b2obob3o40b$24bo3bo3bo40b$16b2o6bo2bo4bo\r
40b$16b2o6bo3bo44b$25bo4b2o41b$26bo46b$27b3o43b4$8b2o63b$8b2o63b5$46b\r
3ob2o21b$5bo10bo27bo3bob2o21b$4b2obo5b5o26bo3bobo22b$3bo3bo10bo23bo7bo\r
22b$3bob3o8b2o24bo2bob3o23b$4b2o9b2o25bo3bo26b$14bo28bo4bo24b$44bo3bo\r
8b2o14b$45b3o7b4o14b$54bo18b$51b2obob3o14b$50bo3bo3bo14b$50bo2bo4bo14b\r
$50bo3bo18b$20bo30bo4b2o15b$7b2o10bob2o29bo20b$6bo2b2o10bo31b3o17b$bo\r
3bo15bo3b2o46b$bo3bo5bo8b2o51b$obo3b2o2bo9bo52b$bo5b3o9b2o52b$bo17b2o\r
52b$22bobo48b$12bo5bob5o48b$11bo2bo3bob3obo37b2o9b$10bo3bo6bo40b2o9b$\r
10bo4bo5bo51b$10b2o3bo5bo51b$11bo2bo58b$12b2o59b3$11bo42b2o17b$9b2ob2o\r
40b2o17b$11bo61b6$46b2o25b$33b2o11b2o25b$32bo2b2o36b$27bo3bo41b$27bo3b\r
o5bo35b$26bobo3b2o2bo36b$27bo5b3o37b$27bo!`,fi=`#N Laputa\r
#O Rich Schroeppel\r
#C A period 2 oscillator found in September 1992.\r
#C www.conwaylife.com/wiki/index.php?title=Laputa\r
x = 12, y = 7, rule = B3/S23\r
3b2ob2o4b$\r
3b2obo3b2o$\r
8bo2bo$\r
b6ob3ob$\r
o2bobo6b$\r
2o3bob2o3b$\r
4b2ob2o!\r
`,ot={bigglider:ii,candelabra:ri,climber131c31:ai,eheptomino:ci,gardenofeden5x45:si,glider:ui,glidersbythedozen:di,gliderLoop:li,laputa:fi},Tt=e=>{if(!ot[e])throw new Error(`Invalid configuration name ${e}`);return ni(ot[e])},mi=["VERTEX_SHADER","FRAGMENT_SHADER"];function bi(){const e=document.getElementById("canvas");if(!e)throw"canvas undefined";const o=e.getContext("webgl");if(!o)throw"gl undefined";return hi(o),o}function hi(e){if(!e.getExtension("OES_texture_float"))throw alert("Need OES_texture_float"),"Need OES_texture_float";if(!e.getExtension("WEBGL_color_buffer_float"))throw alert("Need WEBGL_color_buffer_float"),"Need WEBGL_color_buffer_float";if(e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS)<1)throw alert("Can not use textures in vertex shaders"),"Can not use textures in vertex shaders"}function _t(e,o,n,i){const c=e.createTexture();if(!c)throw"Can not create texture";return e.bindTexture(e.TEXTURE_2D,c),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,n,i,0,e.RGBA,e.FLOAT,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),c}function tt(e,o){const n=e.createFramebuffer();if(!n)throw"Can not create frame buffer";return e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,o,0),n}function gt(e,o,n,i,c){const r=[];for(let t=0;t<o.length;++t){const s=mi[t]==="VERTEX_SHADER"?e.VERTEX_SHADER:e.FRAGMENT_SHADER,d=xi(e,o[t],s);if(!d)throw"Can not create shader";r.push(d)}const a=pi(e,r);if(!a)throw"Can not create program";return a}function xi(e,o,n,i){const c=console.log,r=e.createShader(n);if(!r)throw"Could not load shader";if(e.shaderSource(r,o),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS)){const t=e.getShaderInfoLog(r);return c(new Error("*** Error compiling shader '"+r+"':"+t+`
`+o.split(`
`).map((s,d)=>`${d+1}: ${s}`).join(`
`))),e.deleteShader(r),null}return r}function pi(e,o,n,i,c){const r=console.log,a=e.createProgram();if(!a)throw"Could not create program";if(o.forEach(function(s){e.attachShader(a,s)}),e.linkProgram(a),!e.getProgramParameter(a,e.LINK_STATUS)){const s=e.getProgramInfoLog(a);return r("Error in program linking:"+s),e.deleteProgram(a),null}return a}function vi(e,o){o=o||1;const n=e.clientWidth*o|0,i=e.clientHeight*o|0;return e.width!==n||e.height!==i?(e.width=n,e.height=i,!0):!1}function wt(e,o){const{worldDimensions:n,initialDensity:i,configuration:c}=o;let r=i;r>1&&(r=1);const a=n.width*n.height;let t=new Array(a).fill(0);return c==="random"?t=t.map(d=>Math.random()<r?1:0):c!=="empty"&&(t=Ti({cells:t,insertPosition:{x:Math.floor(n.width/2),y:Math.floor(n.height/2)},worldDimensions:n,configurationName:c})),{cellsTex:_t(e,new Float32Array(t.map((d,b)=>[d,b,0,0]).flat()),n.width,n.height)}}const Ti=e=>{const{cells:o,insertPosition:n,worldDimensions:i,configurationName:c}=e,r=Tt(c);if(i.width<r.width||i.height<r.height)throw new Error("World is too small for this configuration");if(n.x+r.width>i.width||n.y+r.height>i.height)throw new Error("Configuration can be imported at this point");for(let a=0;a<r.height;a++)for(let t=0;t<r.width;t++){const s=(n.y+a)*i.width+(n.x+t);o[s]=r.pattern[a][t]}return o},_i=` attribute vec2 aPosition;

 void main() {
   gl_Position = vec4(aPosition, 0.0, 1.0);
 }
`,gi=`precision highp float;

uniform sampler2D uInputTexture;
uniform vec2 uTextureSize;
uniform vec2 uMouseCoordinates;
uniform int uMouseMode; // 0 do nothing; 1 draw; 2 erase
uniform int uInfiniteSource; // 0 do nothing; 1 generate cells
uniform int uPause; // 1 Don't compute game of life rules but compute other decisions like source and mouse;
                    // 0 Also compute game of life rules
uniform float uIteration;

// Gold Noise 2015 dcerisano@standard3d.com
// - based on the Golden Ratio
// - uniform normalized distribution
// - fastest static noise generator function (also runs at low precision)
// - use with indicated fractional seeding method.
float PHI = 1.61803398874989484820459;  //  Golden Ratio

float gold_noise(in vec2 xy, in float seed){
       return fract(tan(distance(xy*PHI, xy)*seed)*xy.x);
}

vec2 wrapCoord(vec2 coord) {
    if (coord.x >= 1.0) {
        coord.x = 0.0;
    }
    if (coord.x < 0.0) {
        coord.x = 1.0;
    }

    if (coord.y > 1.0) {
        coord.y = 0.0;
    }
    if (coord.y < 0.0) {
        coord.y = 1.0;
    }
    return coord;
}

float getNextState(vec2 texcoord, vec4 cell) {
    float alive = cell.x;

    if (uPause == 1) {
        return alive;
    }

    vec2 topLeftCoord  = wrapCoord(texcoord + (vec2(-1.0, -1.0) / uTextureSize));
    vec2 topCoord      = wrapCoord(texcoord + (vec2(0.0, -1.0) / uTextureSize));
    vec2 topRightCoord = wrapCoord(texcoord + (vec2(1.0, -1.0) / uTextureSize));

    vec2 leftCoord  = wrapCoord(texcoord + (vec2(-1.0, 0.0) / uTextureSize));
    vec2 rightCoord = wrapCoord(texcoord + (vec2(1.0, 0.0) / uTextureSize));

    vec2 bottomLeftCoord  = wrapCoord(texcoord + (vec2(-1.0, 1.0) / uTextureSize));
    vec2 bottomCoord      = wrapCoord(texcoord + (vec2(0.0, 1.0) / uTextureSize));
    vec2 bottomRightCoord = wrapCoord(texcoord + (vec2(1.0, 1.0) / uTextureSize));

    float topLeftAlive  = texture2D(uInputTexture, topLeftCoord ).x;
    float topAlive      = texture2D(uInputTexture, topCoord     ).x;
    float topRightAlive = texture2D(uInputTexture, topRightCoord).x;

    float leftAlive  = texture2D(uInputTexture, leftCoord ).x;;
    float rightAlive = texture2D(uInputTexture, rightCoord).x;

    float bottomLeftAlive  = texture2D(uInputTexture, bottomLeftCoord ).x;
    float bottomAlive      = texture2D(uInputTexture, bottomCoord     ).x;
    float bottomRightAlive = texture2D(uInputTexture, bottomRightCoord).x;

    float aliveNeighbors = topLeftAlive + topAlive + topRightAlive + leftAlive + rightAlive + bottomLeftAlive + bottomAlive + bottomRightAlive;

    if (alive == 1.0 && (aliveNeighbors == 2.0 || aliveNeighbors == 3.0)) {
        return 1.0;
    } else if (alive == 0.0 && aliveNeighbors == 3.0) {
        return 1.0;
    }
    return 0.0;
}

float getSourceDecision(vec2 texcoord, float currentDecision) {
    if (uPause == 1 || uInfiniteSource == 0 || distance(texcoord, vec2(0.5, 0.5)) > 0.02) {
        return currentDecision;
    }
    if (gold_noise(texcoord, 155790.0 + uIteration) < 0.05) {
        return 1.0;
    }
    return currentDecision;
}

float getMouseDecision(vec2 texcoord, float currentDecision) {
    if (uMouseMode == 0) {
        return currentDecision;
    }
    if (distance(texcoord, uMouseCoordinates) < 0.02) {
        if (uMouseMode == 1 && gold_noise(texcoord, 121234.0 + uIteration) < 0.1) {
            return 1.0;
        } else if (uMouseMode == 2) {
            return 0.0;
        }
    }
    return currentDecision;
}

void main() {
    vec2 texcoord = gl_FragCoord.xy / uTextureSize;
    vec4 cell = texture2D(uInputTexture, texcoord);
    float alive = cell.x;
    float id = cell.y;
    float updatedAt = cell.z;

    // Each decision function needs the previous decision in case
    // the decision is to do nothing
    float golDecision = getNextState(texcoord, cell);
    float sourceDecision = getSourceDecision(texcoord, golDecision);
    float finalDecision = getMouseDecision(texcoord, sourceDecision);

    if (alive != finalDecision) {
        updatedAt = uIteration;
    }

    gl_FragColor = vec4(finalDecision, id, updatedAt, 0.0);
}
`;let X,W,po,Ue,uo,nt,it,Ce,Ve;const Et=(e,o)=>{const{cellsTex:n,texDimensions:i}=o;return W=gt(e,[_i,gi]),X={uInputTextureLocation:e.getUniformLocation(W,"uInputTexture"),uTextureSizeLocation:e.getUniformLocation(W,"uTextureSize"),uMouseCoordinatesLocation:e.getUniformLocation(W,"uMouseCoordinates"),uMouseModeLocation:e.getUniformLocation(W,"uMouseMode"),uInfiniteSourceLocation:e.getUniformLocation(W,"uInfiniteSource"),uIterationLocation:e.getUniformLocation(W,"uIteration"),uPauseLocation:e.getUniformLocation(W,"uPause"),positionLocation:e.getAttribLocation(W,"aPosition")},po=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,po),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW),Ue=n,uo=_t(e,null,i.width,i.height),nt=tt(e,Ue),it=tt(e,uo),Ce={fb:nt,tex:Ue},Ve={fb:it,tex:uo},Ue},wi=e=>{const{gl:o,worldDimensions:n,screenDimensions:i,mouseCoordinates:c,mouseMode:r,infiniteSource:a,iteration:t,pause:s}=e;o.bindFramebuffer(o.FRAMEBUFFER,Ve.fb),o.viewport(0,0,i.width,i.height),o.bindBuffer(o.ARRAY_BUFFER,po),o.enableVertexAttribArray(X.positionLocation),o.vertexAttribPointer(X.positionLocation,2,o.FLOAT,!1,0,0),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,Ce.tex),o.useProgram(W),o.uniform1i(X.uInputTextureLocation,0),o.uniform2f(X.uTextureSizeLocation,n.width,n.height),o.uniform2f(X.uMouseCoordinatesLocation,c.x,c.y),o.uniform1i(X.uMouseModeLocation,r),o.uniform1i(X.uInfiniteSourceLocation,a?1:0),o.uniform1f(X.uIterationLocation,t),o.uniform1i(X.uPauseLocation,s?1:0),o.drawArrays(o.TRIANGLES,0,6);{const d=Ce;Ce=Ve,Ve=d}return Ce.tex},Ei=`precision mediump float;
attribute vec2 a_position;
uniform vec2 u_worldSize;

uniform float u_zoom;
uniform vec2 u_pan;

varying vec2 v_texcoord;

void main() {
    // Handle zoom and pan
    vec2 position = (a_position * u_zoom) + u_pan;
    // Convert the position from pixels to normalized space (-1 to +1)
    vec2 zeroToOne = position / u_worldSize;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clipSpace = zeroToTwo - 1.0;



    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

    // Pass the texture coordinate to the fragment shader
    v_texcoord = zeroToOne;
}
`,Ai=`precision mediump float;
uniform sampler2D u_texture;
uniform float u_zoom;
uniform vec2 u_pan;

varying vec2 v_texcoord;

void main() {
    vec2 texCoord = (v_texcoord / u_zoom) + u_pan;

    float alive = texture2D(u_texture, texCoord).x;
    gl_FragColor = vec4(alive, alive, alive, 1.0);
}
`,Ri=`precision mediump float;
uniform sampler2D u_texture;
uniform vec2 u_worldSize;
uniform float u_zoom;
uniform vec2 u_pan;

varying vec2 v_texcoord;

void main() {
    vec2 texCoord = (v_texcoord / u_zoom) + u_pan;

    vec4 cell = texture2D(u_texture, texCoord);
    float alive = cell.x;
    float id = cell.y;
    float blue = id / (u_worldSize.x * u_worldSize.y);
    gl_FragColor = vec4(0.3, blue, 0.8, 1.0) * alive;
}

`,Ci=`precision mediump float;
uniform sampler2D u_texture;
uniform vec2 u_worldSize;
uniform float u_zoom;
uniform vec2 u_pan;
uniform float u_iteration;

varying vec2 v_texcoord;

void main() {
    vec2 texCoord = (v_texcoord / u_zoom) + u_pan;

    vec4 cell = texture2D(u_texture, texCoord);
    float alive = cell.x;
    float updatedAt = cell.z;
    float blue = updatedAt / float(u_iteration);
    gl_FragColor = vec4(blue, 0.0, 1.0, 1.0) * alive;
}

`;let te,ne,Ke;const At=(e,o)=>{const{screenDimensions:n,mode:i}=o,{height:c,width:r}=n;let a=Ai;if(i==="gradiant"?a=Ri:i==="age_gradiant"&&(a=Ci),ne=gt(e,[Ei,a]),te={positionLocation:e.getAttribLocation(ne,"a_position"),textureLocation:e.getUniformLocation(ne,"u_texture"),worldSizeLocation:e.getUniformLocation(ne,"u_worldSize"),zoomLocation:e.getUniformLocation(ne,"u_zoom"),panLocation:e.getUniformLocation(ne,"u_pan"),iterationLocation:e.getUniformLocation(ne,"u_iteration")},Ke=e.createBuffer(),!Ke)throw new Error("cant create buffer");e.bindBuffer(e.ARRAY_BUFFER,Ke),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,0,c,r,0,r,0,0,c,r,c]),e.STATIC_DRAW)},Di=e=>{const{gl:o,cellsTex:n,worldDimensions:i,zoomLevel:c,pan:r,iteration:a}=e;o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindTexture(o.TEXTURE_2D,n),o.useProgram(ne),o.bindBuffer(o.ARRAY_BUFFER,Ke),o.enableVertexAttribArray(te.positionLocation),o.vertexAttribPointer(te.positionLocation,2,o.FLOAT,!1,0,0),o.uniform1i(te.textureLocation,0),o.uniform2f(te.worldSizeLocation,i.width,i.height),o.uniform1f(te.zoomLocation,Math.max(c,1)),o.uniform2f(te.panLocation,r.x,r.y),o.uniform1f(te.iterationLocation,a),o.drawArrays(o.TRIANGLES,0,6)};let Y,Je;function Li(e){const{drawMode:o,initialDensity:n,screenDimensions:i,worldDimensions:c}=e;Y=bi(),vi(Y.canvas);const r=wt(Y,{configuration:"random",worldDimensions:c,initialDensity:n});Je=Et(Y,{cellsTex:r.cellsTex,texDimensions:c}),At(Y,{screenDimensions:i,mode:o})}function Si(e){const{infiniteSource:o,iteration:n,mouseCoordinates:i,mouseMode:c,pause:r,pan:a,screenDimensions:t,worldDimensions:s,zoomLevel:d}=e;Je=wi({gl:Y,worldDimensions:s,screenDimensions:t,mouseCoordinates:i,mouseMode:c,infiniteSource:o,iteration:n,pause:r}),Di({gl:Y,cellsTex:Je,worldDimensions:s,zoomLevel:d,pan:a,iteration:n})}const $i=e=>{const{worldDimensions:o,configuration:n,initialDensity:i}=e,c=wt(Y,{configuration:n,worldDimensions:o,initialDensity:i});Je=Et(Y,{cellsTex:c.cellsTex,texDimensions:o})},yi=e=>{At(Y,{screenDimensions:e.screenDimensions,mode:e.drawMode})};var Fi=V('<canvas id="canvas" style="background-color: black" class="svelte-qk6jpy"></canvas>');function zi(e,o){ce(o,!1);const n={x:0,y:0};let i=0,c,r=0;const a={width:window.innerWidth-50,height:window.innerHeight-10},t={program:{pause:!0,infiniteSource:!1,drawMode:"age_gradiant",reloadProgram:()=>h()},simulation:{iteration:0,timeInSeconds:0,fps:0},grid:{configName:"random",initialDensity:.5,worldWidth:a.width,worldHeight:a.height,nbCells:(a.width*a.height).toString()},zoom:{x:0,y:0,xController:null,yController:null,level:1,previousLevel:1}};let s;const d=async()=>{const l=await oo(()=>import("../chunks/QkjeJdyK.js"),[],import.meta.url);s=new l.GUI,s.domElement.setAttribute("style","background-color: black");const u=s.addFolder("Program");u.open(),u.add(t.program,"pause").name("Pause").listen(),u.add(t.program,"infiniteSource").name("Infinite Source").listen(),u.add(t.program,"drawMode",{White:"white","Age Gradiant":"age_gradiant","Position Gradiant":"gradiant"}).name("Drawing mode").onFinishChange(()=>yi({screenDimensions:a,drawMode:t.program.drawMode})),u.add(t.program,"reloadProgram").name("Reload program");const f=s.addFolder("Simulation");f.open(),f.add(t.simulation,"timeInSeconds").name("Time (s)").listen(),f.add(t.simulation,"iteration").name("Iteration").listen(),f.add(t.simulation,"fps").listen();const m=s.addFolder("Grid");m.open(),m.add(t.grid,"configName",{Random:"random",Empty:"empty","131c31 Climber":"climber131c31","Big Glider":"bigglider",Candelabra:"candelabra","E-heptomino":"eheptomino","Garden of Eden 5x45":"gardenofeden5x45",Glider:"glider","Glider by the dozen":"glidersbythedozen","Glider loop":"gliderLoop",Laputa:"laputa"}).name("Configuration").onFinishChange(()=>x(t.grid.configName)),m.add(t.grid,"initialDensity",0,1,.01).name("Initial density").onFinishChange(()=>x("random")),m.add(t.grid,"worldWidth",1,a.width,1).name("World width").onFinishChange(()=>{t.grid.nbCells=(t.grid.worldHeight*t.grid.worldWidth).toString(),x("random")}),m.add(t.grid,"worldHeight",1,a.height,1).name("World height").onFinishChange(()=>{t.grid.nbCells=(t.grid.worldHeight*t.grid.worldWidth).toString(),x("random")}),m.add(t.grid,"nbCells").name("Cells count").listen();const p=s.addFolder("Zoom");p.open(),p.add(t.zoom,"level",1,10).name("Level").onChange(function(w){const F=w-t.zoom.previousLevel;if(!t.zoom.xController||!t.zoom.yController||F===0)return;const B=1-1/t.zoom.previousLevel,R=1-1/w;t.zoom.xController.max(R),t.zoom.xController.min(0),t.zoom.yController.max(R),t.zoom.yController.min(0);const I={x:t.zoom.x/B,y:t.zoom.y/B};t.zoom.x=R*I.x||R/2,t.zoom.y=R*I.y||R/2,t.zoom.previousLevel=w}),t.zoom.xController=p.add(t.zoom,"x",0,0,.01).name("X offset").listen(),t.zoom.yController=p.add(t.zoom,"y",0,0,.01).name("Y offset").listen()},b=()=>{document.addEventListener("keydown",u=>{if(u.code==="Space"&&(t.program.pause=!t.program.pause,u.preventDefault()),u.code==="KeyR"){x("random");return}if(u.code==="KeyE"){x("empty");return}if(u.code==="KeyS"){t.program.infiniteSource=!t.program.infiniteSource;return}});const l=document.getElementById("canvas");if(!l)throw new Error("Canvas unavailable");l.addEventListener("mousemove",u=>{const f=l.getBoundingClientRect(),m=l.width/f.width,p=l.height/f.height,w={x:(u.clientX-f.left)*m,y:(u.clientY-f.top)*p};n.x=w.x/a.width,n.y=w.y/a.height}),setInterval(()=>{n.x<.1&&t.zoom.x>=.005&&(t.zoom.x-=.005),n.x>.9&&t.zoom.x<1-1/t.zoom.level&&(t.zoom.x+=.005),n.y<.1&&t.zoom.y>=.005&&(t.zoom.y-=.005),n.y>.9&&t.zoom.y<1-1/t.zoom.level&&(t.zoom.y+=.005)},50),l.addEventListener("mousedown",u=>{u.preventDefault(),u.button===0?i=1:u.button===2&&(i=2)}),l.addEventListener("mouseup",u=>{u.preventDefault(),i=0}),l.addEventListener("contextmenu",u=>(u.preventDefault(),!1))};let v;const h=()=>{Li({initialDensity:t.grid.initialDensity,worldDimensions:{width:t.grid.worldWidth,height:t.grid.worldHeight},screenDimensions:a,drawMode:t.program.drawMode}),cancelAnimationFrame(v),c=Date.now()/1e3,A()},A=()=>{const l=Date.now()/1e3,u=l-r;r=l,t.simulation.fps=1/u,t.program.pause||(t.simulation.timeInSeconds=l-c,t.simulation.iteration++),Si({infiniteSource:t.program.infiniteSource,iteration:t.simulation.iteration,mouseCoordinates:n,mouseMode:i,pause:t.program.pause,pan:{x:t.zoom.x,y:t.zoom.y},screenDimensions:a,worldDimensions:{width:t.grid.worldWidth,height:t.grid.worldHeight},zoomLevel:t.zoom.level}),v=requestAnimationFrame(A)},x=l=>{t.simulation.iteration=0,t.simulation.timeInSeconds=0,$i({initialDensity:t.grid.initialDensity,worldDimensions:{width:t.grid.worldWidth,height:t.grid.worldHeight},configuration:l})};xe(()=>{d(),b(),h()}),eo(()=>{s.destroy()}),$e();var T=Fi();se(()=>{D(T,"width",a.width),D(T,"height",a.height)}),P(e,T),ue()}const Ii=["VERTEX_SHADER","FRAGMENT_SHADER"];function Pi(){const e=document.getElementById("canvas");if(!e)throw"canvas undefined";const o=e.getContext("webgl");if(!o)throw"gl undefined";return Mi(o),o}function Mi(e){if(!e.getExtension("OES_texture_float"))throw alert("Need OES_texture_float"),"Need OES_texture_float";if(!e.getExtension("WEBGL_color_buffer_float"))throw alert("Need WEBGL_color_buffer_float"),"Need WEBGL_color_buffer_float";if(e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS)<1)throw alert("Can not use textures in vertex shaders"),"Can not use textures in vertex shaders"}function Eo(e,o,n,i){const c=e.createTexture();if(!c)throw"Can not create texture";return e.bindTexture(e.TEXTURE_2D,c),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,n,i,0,e.RGBA,e.FLOAT,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),c}function vo(e,o){const n=e.createFramebuffer();if(!n)throw"Can not create frame buffer";return e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,o,0),n}function Ao(e,o,n,i,c){const r=[];for(let t=0;t<o.length;++t){const s=Ii[t]==="VERTEX_SHADER"?e.VERTEX_SHADER:e.FRAGMENT_SHADER,d=Ui(e,o[t],s);if(!d)throw"Can not create shader";r.push(d)}const a=Bi(e,r);if(!a)throw"Can not create program";return a}function Ui(e,o,n,i){const c=console.log,r=e.createShader(n);if(!r)throw"Could not load shader";if(e.shaderSource(r,o),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS)){const t=e.getShaderInfoLog(r);return c(new Error("*** Error compiling shader '"+r+"':"+t+`
`+o.split(`
`).map((s,d)=>`${d+1}: ${s}`).join(`
`))),e.deleteShader(r),null}return r}function Bi(e,o,n,i,c){const r=console.log,a=e.createProgram();if(!a)throw"Could not create program";if(o.forEach(function(s){e.attachShader(a,s)}),e.linkProgram(a),!e.getProgramParameter(a,e.LINK_STATUS)){const s=e.getProgramInfoLog(a);return r("Error in program linking:"+s),e.deleteProgram(a),null}return a}function Gi(e,o){o=o||1;const n=e.clientWidth*o|0,i=e.clientHeight*o|0;return e.width!==n||e.height!==i?(e.width=n,e.height=i,!0):!1}function Rt(e,o){const{worldDimensions:n,initialDensity:i,configuration:c}=o;let r=i;r>1&&(r=1);const a=n.width*n.height;let t=new Array(a).fill(0);return c==="random"?t=t.map(d=>Math.random()<r?1:0):c!=="empty"&&(t=Ni({cells:t,insertPosition:{x:Math.floor(n.width/2),y:Math.floor(n.height/2)},worldDimensions:n,configurationName:c})),{cellsTex:Eo(e,new Float32Array(t.map((d,b)=>[d,b,0,0]).flat()),n.width,n.height)}}const Ni=e=>{const{cells:o,insertPosition:n,worldDimensions:i,configurationName:c}=e,r=Tt(c);if(i.width<r.width||i.height<r.height)throw new Error("World is too small for this configuration");if(n.x+r.width>i.width||n.y+r.height>i.height)throw new Error("Configuration can be imported at this point");for(let a=0;a<r.height;a++)for(let t=0;t<r.width;t++){const s=(n.y+a)*i.width+(n.x+t);o[s]=r.pattern[a][t]}return o},Xi=` attribute vec2 aPosition;

 void main() {
   gl_Position = vec4(aPosition, 0.0, 1.0);
 }
`,Wi=`precision highp float;

uniform sampler2D uInputTexture;
uniform vec2 uTextureSize;
uniform vec2 uMouseCoordinates;
uniform int uMouseMode; // 0 do nothing; 1 draw; 2 erase
uniform int uInfiniteSource; // 0 do nothing; 1 generate cells
uniform int uPause; // 1 Don't compute game of life rules but compute other decisions like source and mouse;
                    // 0 Also compute game of life rules
uniform float uIteration;

// Gold Noise 2015 dcerisano@standard3d.com
// - based on the Golden Ratio
// - uniform normalized distribution
// - fastest static noise generator function (also runs at low precision)
// - use with indicated fractional seeding method.
float PHI = 1.61803398874989484820459;  //  Golden Ratio

float gold_noise(in vec2 xy, in float seed){
       return fract(tan(distance(xy*PHI, xy)*seed)*xy.x);
}

vec2 wrapCoord(vec2 coord) {
    if (coord.x >= 1.0) {
        coord.x = 0.0;
    }
    if (coord.x < 0.0) {
        coord.x = 1.0;
    }

    if (coord.y > 1.0) {
        coord.y = 0.0;
    }
    if (coord.y < 0.0) {
        coord.y = 1.0;
    }
    return coord;
}

float getNextState(vec2 texcoord, vec4 cell) {
    float alive = cell.x;

    if (uPause == 1) {
        return alive;
    }

    vec2 topLeftCoord  = wrapCoord(texcoord + (vec2(-1.0, -1.0) / uTextureSize));
    vec2 topCoord      = wrapCoord(texcoord + (vec2(0.0, -1.0) / uTextureSize));
    vec2 topRightCoord = wrapCoord(texcoord + (vec2(1.0, -1.0) / uTextureSize));

    vec2 leftCoord  = wrapCoord(texcoord + (vec2(-1.0, 0.0) / uTextureSize));
    vec2 rightCoord = wrapCoord(texcoord + (vec2(1.0, 0.0) / uTextureSize));

    vec2 bottomLeftCoord  = wrapCoord(texcoord + (vec2(-1.0, 1.0) / uTextureSize));
    vec2 bottomCoord      = wrapCoord(texcoord + (vec2(0.0, 1.0) / uTextureSize));
    vec2 bottomRightCoord = wrapCoord(texcoord + (vec2(1.0, 1.0) / uTextureSize));

    float topLeftAlive  = texture2D(uInputTexture, topLeftCoord ).x;
    float topAlive      = texture2D(uInputTexture, topCoord     ).x;
    float topRightAlive = texture2D(uInputTexture, topRightCoord).x;

    float leftAlive  = texture2D(uInputTexture, leftCoord ).x;;
    float rightAlive = texture2D(uInputTexture, rightCoord).x;

    float bottomLeftAlive  = texture2D(uInputTexture, bottomLeftCoord ).x;
    float bottomAlive      = texture2D(uInputTexture, bottomCoord     ).x;
    float bottomRightAlive = texture2D(uInputTexture, bottomRightCoord).x;

    float aliveNeighbors = topLeftAlive + topAlive + topRightAlive + leftAlive + rightAlive + bottomLeftAlive + bottomAlive + bottomRightAlive;

    if (alive == 1.0 && (aliveNeighbors == 2.0 || aliveNeighbors == 3.0)) {
        return 1.0;
    } else if (alive == 0.0 && aliveNeighbors == 3.0) {
        return 1.0;
    }
    return 0.0;
}

float getSourceDecision(vec2 texcoord, float currentDecision) {
    if (uPause == 1 || uInfiniteSource == 0 || distance(texcoord, vec2(0.5, 0.5)) > 0.02) {
        return currentDecision;
    }
    if (gold_noise(texcoord, 155790.0 + uIteration) < 0.05) {
        return 1.0;
    }
    return currentDecision;
}

float getMouseDecision(vec2 texcoord, float currentDecision) {
    if (uMouseMode == 0) {
        return currentDecision;
    }
    if (distance(texcoord, uMouseCoordinates) < 0.02) {
        if (uMouseMode == 1 && gold_noise(texcoord, 121234.0 + uIteration) < 0.1) {
            return 1.0;
        } else if (uMouseMode == 2) {
            return 0.0;
        }
    }
    return currentDecision;
}

void main() {
    vec2 texcoord = gl_FragCoord.xy / uTextureSize;
    vec4 cell = texture2D(uInputTexture, texcoord);
    float alive = cell.x;
    float id = cell.y;
    float updatedAt = cell.z;

    // Each decision function needs the previous decision in case
    // the decision is to do nothing
    float golDecision = getNextState(texcoord, cell);
    float sourceDecision = getSourceDecision(texcoord, golDecision);
    float finalDecision = getMouseDecision(texcoord, sourceDecision);

    if (alive != finalDecision) {
        updatedAt = uIteration;
    }

    gl_FragColor = vec4(finalDecision, id, updatedAt, 0.0);
}
`;let k,O,To,Be,lo,rt,at,De,qe;const Ct=(e,o)=>{const{cellsTex:n,texDimensions:i}=o;return O=Ao(e,[Xi,Wi]),k={uInputTextureLocation:e.getUniformLocation(O,"uInputTexture"),uTextureSizeLocation:e.getUniformLocation(O,"uTextureSize"),uMouseCoordinatesLocation:e.getUniformLocation(O,"uMouseCoordinates"),uMouseModeLocation:e.getUniformLocation(O,"uMouseMode"),uInfiniteSourceLocation:e.getUniformLocation(O,"uInfiniteSource"),uIterationLocation:e.getUniformLocation(O,"uIteration"),uPauseLocation:e.getUniformLocation(O,"uPause"),positionLocation:e.getAttribLocation(O,"aPosition")},To=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,To),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW),Be=n,lo=Eo(e,null,i.width,i.height),rt=vo(e,Be),at=vo(e,lo),De={fb:rt,tex:Be},qe={fb:at,tex:lo},Be},ki=e=>{const{gl:o,worldDimensions:n,screenDimensions:i,mouseCoordinates:c,mouseMode:r,infiniteSource:a,iteration:t,pause:s}=e;o.bindFramebuffer(o.FRAMEBUFFER,qe.fb),o.viewport(0,0,i.width,i.height),o.bindBuffer(o.ARRAY_BUFFER,To),o.enableVertexAttribArray(k.positionLocation),o.vertexAttribPointer(k.positionLocation,2,o.FLOAT,!1,0,0),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,De.tex),o.useProgram(O),o.uniform1i(k.uInputTextureLocation,0),o.uniform2f(k.uTextureSizeLocation,n.width,n.height),o.uniform2f(k.uMouseCoordinatesLocation,c.x,c.y),o.uniform1i(k.uMouseModeLocation,r),o.uniform1i(k.uInfiniteSourceLocation,a?1:0),o.uniform1f(k.uIterationLocation,t),o.uniform1i(k.uPauseLocation,s?1:0),o.drawArrays(o.TRIANGLES,0,6);{const d=De;De=qe,qe=d}return De.tex},Oi=`precision mediump float;
attribute vec2 a_position;
uniform vec2 u_worldSize;

varying vec2 v_texcoord;

void main() {
    // Handle zoom and pan
    vec2 position = a_position;
    // Convert the position from pixels to normalized space (-1 to +1)
    vec2 zeroToOne = position / u_worldSize;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clipSpace = zeroToTwo - 1.0;



    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

    // Pass the texture coordinate to the fragment shader
    v_texcoord = zeroToOne;
}
`,Hi=`precision mediump float;
uniform sampler2D u_texture;

varying vec2 v_texcoord;

void main() {
    vec2 texCoord = v_texcoord;

    float alive = texture2D(u_texture, texCoord).x;
    gl_FragColor = vec4(alive, alive, alive, 1.0);
}
`,Yi=`precision mediump float;
uniform sampler2D u_texture;
uniform vec2 u_worldSize;

varying vec2 v_texcoord;

void main() {
    vec2 texCoord = v_texcoord;

    vec4 cell = texture2D(u_texture, texCoord);
    float alive = cell.x;
    float id = cell.y;
    float blue = id / (u_worldSize.x * u_worldSize.y);
    gl_FragColor = vec4(0.3, blue, 0.8, 1.0) * alive;
}

`,Vi=`precision mediump float;
uniform sampler2D u_texture;
uniform vec2 u_worldSize;
uniform float u_iteration;

varying vec2 v_texcoord;

void main() {
    vec2 texCoord = v_texcoord;

    vec4 cell = texture2D(u_texture, texCoord);
    float alive = cell.x;
    float updatedAt = cell.z;
    float blue = updatedAt / float(u_iteration);
    gl_FragColor = vec4(blue, 0.0, 1.0, 1.0) * alive;
}

`;let le,fe,_o,go,Dt;const Lt=(e,o)=>{const{screenDimensions:n,mode:i}=o,{height:c,width:r}=n;let a=Hi;i==="gradiant"?a=Yi:i==="age_gradiant"&&(a=Vi),fe=Ao(e,[Oi,a]),le={positionLocation:e.getAttribLocation(fe,"a_position"),textureLocation:e.getUniformLocation(fe,"u_texture"),worldSizeLocation:e.getUniformLocation(fe,"u_worldSize"),iterationLocation:e.getUniformLocation(fe,"u_iteration")},_o=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,_o),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,0,c,r,0,r,0,0,c,r,c]),e.STATIC_DRAW),go=Eo(e,null,n.width,n.height),Dt=vo(e,go)},Ki=e=>{const{gl:o,cellsTex:n,worldDimensions:i,screenDimensions:c,iteration:r}=e;return o.bindFramebuffer(o.FRAMEBUFFER,Dt),o.viewport(0,0,c.width,c.height),o.bindTexture(o.TEXTURE_2D,n),o.useProgram(fe),o.bindBuffer(o.ARRAY_BUFFER,_o),o.enableVertexAttribArray(le.positionLocation),o.vertexAttribPointer(le.positionLocation,2,o.FLOAT,!1,0,0),o.uniform1i(le.textureLocation,0),o.uniform2f(le.worldSizeLocation,i.width,i.height),o.uniform1f(le.iterationLocation,r),o.drawArrays(o.TRIANGLES,0,6),go},qi=`attribute vec2 a_position;

varying vec2 uv;

void main() {
    // Convert the position from pixels to normalized space (-1 to +1)
    vec2 zeroToTwo = a_position * 2.0;
    vec2 clipSpace = zeroToTwo - 1.0;

    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

    // Pass the texture coordinate to the fragment shader
    uv = a_position;
}
`,ji=`precision mediump float;

uniform sampler2D u_texture;
uniform float u_zoom;
uniform vec2 u_zoomPoint;

varying vec2 uv;

void main() {
    vec2 new_uv = (uv + u_zoomPoint * u_zoom) * (1.0 / u_zoom);
    gl_FragColor = texture2D(u_texture, new_uv);
}
`;let me,be,wo;const Zi=(e,o)=>{const{screenDimensions:n}=o,{height:i,width:c}=n;be=Ao(e,[qi,ji]),me={positionLocation:e.getAttribLocation(be,"a_position"),textureLocation:e.getUniformLocation(be,"u_texture"),zoomLocation:e.getUniformLocation(be,"u_zoom"),zoomPointLocation:e.getUniformLocation(be,"u_zoomPoint")},wo=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,wo),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,0,i,c,0,c,0,0,i,c,i]),e.STATIC_DRAW)},Ji=e=>{const{gl:o,screenTex:n,zoom:i,zoomPoint:c}=e;o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindTexture(o.TEXTURE_2D,n),o.useProgram(be),o.bindBuffer(o.ARRAY_BUFFER,wo),o.enableVertexAttribArray(me.positionLocation),o.vertexAttribPointer(me.positionLocation,2,o.FLOAT,!1,0,0),o.uniform1i(me.textureLocation,0),o.uniform1f(me.zoomLocation,i),o.uniform2f(me.zoomPointLocation,c.x,c.y),o.drawArrays(o.TRIANGLES,0,6)};let M,Qe;function Qi(e){const{drawMode:o,initialDensity:n,screenDimensions:i,worldDimensions:c}=e;M=Pi(),Gi(M.canvas);const r=Rt(M,{configuration:"random",worldDimensions:c,initialDensity:n});Qe=Ct(M,{cellsTex:r.cellsTex,texDimensions:c}),Lt(M,{screenDimensions:i,mode:o}),Zi(M,{screenDimensions:i})}function er(e){const{infiniteSource:o,iteration:n,mouseCoordinates:i,mouseMode:c,pause:r,screenDimensions:a,worldDimensions:t,zoom:s,zoomPoint:d}=e;Qe=ki({gl:M,worldDimensions:t,screenDimensions:a,mouseCoordinates:i,mouseMode:c,infiniteSource:o,iteration:n,pause:r});const b=Ki({gl:M,cellsTex:Qe,worldDimensions:t,screenDimensions:a,iteration:n});Ji({gl:M,screenTex:b,zoom:s,zoomPoint:d})}const or=e=>{const{worldDimensions:o,configuration:n,initialDensity:i}=e,c=Rt(M,{configuration:n,worldDimensions:o,initialDensity:i});Qe=Ct(M,{cellsTex:c.cellsTex,texDimensions:o})},tr=e=>{Lt(M,{screenDimensions:e.screenDimensions,mode:e.drawMode})};var nr=V('<canvas id="canvas" style="background-color: black" class="svelte-12r9mwh"></canvas>');function ir(e,o){ce(o,!1);const n={x:0,y:0};let i=0,c,r=0;const a={width:window.innerWidth-50,height:window.innerHeight-10},t={program:{pause:!1,infiniteSource:!1,drawMode:"age_gradiant",reloadProgram:()=>h()},simulation:{iteration:0,timeInSeconds:0,fps:0},grid:{configName:"random",initialDensity:.5,worldWidth:a.width,worldHeight:a.height,nbCells:(a.width*a.height).toString()},zoom:{x:0,y:0,xController:null,yController:null,level:1,previousLevel:1}};let s;const d=async()=>{const l=await oo(()=>import("../chunks/QkjeJdyK.js"),[],import.meta.url);s=new l.GUI,s.domElement.setAttribute("style","background-color: black");const u=s.addFolder("Program");u.open(),u.add(t.program,"pause").name("Pause").listen(),u.add(t.program,"infiniteSource").name("Infinite Source").listen(),u.add(t.program,"drawMode",{White:"white","Age Gradiant":"age_gradiant","Position Gradiant":"gradiant"}).name("Drawing mode").onFinishChange(()=>tr({screenDimensions:a,drawMode:t.program.drawMode})),u.add(t.program,"reloadProgram").name("Reload program");const f=s.addFolder("Simulation");f.open(),f.add(t.simulation,"timeInSeconds").name("Time (s)").listen(),f.add(t.simulation,"iteration").name("Iteration").listen(),f.add(t.simulation,"fps").listen();const m=s.addFolder("Grid");m.open(),m.add(t.grid,"configName",{Random:"random",Empty:"empty","131c31 Climber":"climber131c31","Big Glider":"bigglider",Candelabra:"candelabra","E-heptomino":"eheptomino","Garden of Eden 5x45":"gardenofeden5x45",Glider:"glider","Glider by the dozen":"glidersbythedozen","Glider loop":"gliderLoop",Laputa:"laputa"}).name("Configuration").onFinishChange(()=>x(t.grid.configName)),m.add(t.grid,"initialDensity",0,1,.01).name("Initial density").onFinishChange(()=>x("random")),m.add(t.grid,"worldWidth",1,a.width,1).name("World width").onFinishChange(()=>{t.grid.nbCells=(t.grid.worldHeight*t.grid.worldWidth).toString(),x("random")}),m.add(t.grid,"worldHeight",1,a.height,1).name("World height").onFinishChange(()=>{t.grid.nbCells=(t.grid.worldHeight*t.grid.worldWidth).toString(),x("random")}),m.add(t.grid,"nbCells").name("Cells count").listen();const p=s.addFolder("Zoom");p.open(),p.add(t.zoom,"level",1,50,.1).name("Level"),p.add(t.zoom,"x",0,1,.01).name("X offset").listen(),p.add(t.zoom,"y",0,1,.01).name("Y offset").listen()},b=()=>{document.addEventListener("keydown",u=>{if(u.code==="Space"&&(t.program.pause=!t.program.pause,u.preventDefault()),u.code==="KeyR"){x("random");return}if(u.code==="KeyE"){x("empty");return}if(u.code==="KeyS"){t.program.infiniteSource=!t.program.infiniteSource;return}});const l=document.getElementById("canvas");if(!l)throw new Error("Canvas unavailable");l.addEventListener("mousemove",u=>{const f=l.getBoundingClientRect(),m=l.width/f.width,p=l.height/f.height,w={x:(u.clientX-f.left)*m,y:(u.clientY-f.top)*p};n.x=w.x/a.width,n.y=1-w.y/a.height}),l.addEventListener("mousedown",u=>{u.preventDefault(),u.button===0?i=1:u.button===2&&(i=2)}),l.addEventListener("mouseup",u=>{u.preventDefault(),i=0}),l.addEventListener("contextmenu",u=>(u.preventDefault(),!1))};let v;const h=()=>{Qi({initialDensity:t.grid.initialDensity,worldDimensions:{width:t.grid.worldWidth,height:t.grid.worldHeight},screenDimensions:a,drawMode:t.program.drawMode}),cancelAnimationFrame(v),c=Date.now()/1e3,A()},A=()=>{const l=Date.now()/1e3,u=l-r;r=l,t.simulation.fps=1/u,t.program.pause||(t.simulation.timeInSeconds=l-c,t.simulation.iteration++),er({infiniteSource:t.program.infiniteSource,iteration:t.simulation.iteration,mouseCoordinates:n,mouseMode:i,pause:t.program.pause,screenDimensions:a,worldDimensions:{width:t.grid.worldWidth,height:t.grid.worldHeight},zoom:t.zoom.level,zoomPoint:{x:t.zoom.x,y:t.zoom.y}}),v=requestAnimationFrame(A)},x=l=>{t.simulation.iteration=0,t.simulation.timeInSeconds=0,or({initialDensity:t.grid.initialDensity,worldDimensions:{width:t.grid.worldWidth,height:t.grid.worldHeight},configuration:l})};xe(()=>{d(),b(),h()}),eo(()=>{s.destroy()}),$e();var T=nr();se(()=>{D(T,"width",a.width),D(T,"height",a.height)}),P(e,T),ue()}var rr=V("<!> <!>",1),ar=V(`<p>Experiments running Conway's Game of Life in WebGL shaders.</p> <p>List of patterns available <a target="none" href="https://conwaylife.com/wiki/Category:Patterns">in the wiki</a></p>`,1),cr=V("<!> <!> <!>",1),sr=V("<div><!></div>");function ur(e){const o=[{title:"V6",component:ir},{title:"V5",component:zi},{title:"V4",component:Jn},{title:"V3",component:Fn},{title:"V2",component:xn},{title:"V1",component:Jt}];var n=sr(),i=$(n);It(i,{children:(c,r)=>{var a=cr(),t=je(a);Pt(t,{children:(b,v)=>{var h=rr(),A=je(h);Io(A,{children:(T,l)=>{io();var u=yo("About");P(T,u)},$$slots:{default:!0}});var x=g(A,2);Fo(x,1,()=>o,zo,(T,l)=>{Io(T,{children:(u,f)=>{io();var m=yo();se(()=>he(m,_(l).title)),P(u,m)},$$slots:{default:!0}})}),P(b,h)},$$slots:{default:!0}});var s=g(t,2);Po(s,{children:(b,v)=>{var h=ar();io(2),P(b,h)},$$slots:{default:!0}});var d=g(s,2);Fo(d,1,()=>o,zo,(b,v)=>{Po(b,{children:(h,A)=>{_(v).component(h,{})},$$slots:{default:!0}})}),P(c,a)},$$slots:{default:!0}}),y(n),P(e,n)}function wr(e,o){ce(o,!1),Mt.set({name:"Game of Life"}),$e(),ur(e),ue()}export{wr as component};
