import{S as Ve,i as Ye,s as Ke,k as T,a as L,q as E,l as g,m as D,h as p,c as S,r as A,n as _,p as so,b as y,D as m,I as _e,J as B,K as un,u as Le,L as we,B as k,M as sn,o as co,N as Oo,w as Se,x as He,y as ye,f as q,t as Q,z as Fe,e as No,g as bt,d as pt,O as cn,v as St}from"../../../chunks/index-0f2870f9.js";import{T as zn,a as In,b as ln,c as dn}from"../../../chunks/TabPanel-bd6299bb.js";import{_ as ko}from"../../../chunks/preload-helper-41c905a7.js";const Pn=["VERTEX_SHADER","FRAGMENT_SHADER"];function Un(){const e=document.getElementById("canvas");if(!e)throw"canvas undefined";const o=e.getContext("webgl");if(!o)throw"gl undefined";return Mn(o),o}function Mn(e){if(!e.getExtension("OES_texture_float"))throw alert("Need OES_texture_float"),"Need OES_texture_float";if(!e.getExtension("WEBGL_color_buffer_float"))throw alert("Need WEBGL_color_buffer_float"),"Need WEBGL_color_buffer_float";if(e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS)<1)throw alert("Can not use textures in vertex shaders"),"Can not use textures in vertex shaders"}function fn(e,o,n,i){const a=e.createTexture();if(!a)throw"Can not create texture";return e.bindTexture(e.TEXTURE_2D,a),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,n,i,0,e.RGBA,e.FLOAT,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),a}function yt(e,o){const n=e.createFramebuffer();if(!n)throw"Can not create frame buffer";return e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,o,0),n}function mn(e,o,n,i,a){const r=[];for(let u=0;u<o.length;++u){const s=Pn[u]==="VERTEX_SHADER"?e.VERTEX_SHADER:e.FRAGMENT_SHADER,c=Bn(e,o[u],s,a);if(!c)throw"Can not create shader";r.push(c)}const t=Nn(e,r,n,i,a);if(!t)throw"Can not create program";return t}function Bn(e,o,n,i){const a=i||console.log,r=e.createShader(n);if(!r)throw"Could not load shader";if(e.shaderSource(r,o),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS)){const u=e.getShaderInfoLog(r);return a(new Error("*** Error compiling shader '"+r+"':"+u+`
`+o.split(`
`).map((s,c)=>`${c+1}: ${s}`).join(`
`))),e.deleteShader(r),null}return r}function Nn(e,o,n,i,a){const r=a||console.log,t=e.createProgram();if(!t)throw"Could not create program";if(o.forEach(function(s){e.attachShader(t,s)}),n&&n.forEach(function(s,c){e.bindAttribLocation(t,i?i[c]:c,s)}),e.linkProgram(t),!e.getProgramParameter(t,e.LINK_STATUS)){const s=e.getProgramInfoLog(t);return r("Error in program linking:"+s),e.deleteProgram(t),null}return t}function Gn(e,o){o=o||1;const n=e.clientWidth*o|0,i=e.clientHeight*o|0;return e.width!==n||e.height!==i?(e.width=n,e.height=i,!0):!1}const Wn=`attribute vec2 a_position;
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

`,Xn=`precision mediump float;
uniform sampler2D u_texture;
varying vec2 v_texcoord;

void main() {
    float alive = texture2D(u_texture, v_texcoord).x;
    gl_FragColor = vec4(alive, alive, alive, 1.0);
}
`;let lo,fo,Co;const On=(e,o)=>{const{screenDimensions:n}=o,{height:i,width:a}=n;if(fo=mn(e,[Wn,Xn]),lo={positionLocation:e.getAttribLocation(fo,"a_position"),textureLocation:e.getUniformLocation(fo,"u_texture"),worldSizeLocation:e.getUniformLocation(fo,"u_worldSize")},Co=e.createBuffer(),!Co)throw new Error("cant create buffer");e.bindBuffer(e.ARRAY_BUFFER,Co),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,0,i,a,0,a,0,0,i,a,i]),e.STATIC_DRAW)},kn=e=>{const{gl:o,cellsTex:n,worldDimensions:i}=e;o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindTexture(o.TEXTURE_2D,n),o.useProgram(fo),o.bindBuffer(o.ARRAY_BUFFER,Co),o.enableVertexAttribArray(lo.positionLocation),o.vertexAttribPointer(lo.positionLocation,2,o.FLOAT,!1,0,0),o.uniform1i(lo.textureLocation,0),o.uniform2f(lo.worldSizeLocation,i.width,i.height),o.drawArrays(o.TRIANGLES,0,6)};function Hn(e,o,n){function i(){const r=e.getElementById(o);r&&(e.fullscreenElement&&e.exitFullscreen&&e.exitFullscreen(),r.width=n.width,r.height=n.height)}function a(){const r=e.getElementById(o);r&&(e.fullscreenElement||r.requestFullscreen())}return e.addEventListener("fullscreenchange",()=>{e.fullscreenElement===null&&i()}),{enableFullscreen:a,disableFullscreen:i}}function Ft(e,o){const{worldDimensions:n}=o,i=n.width*n.height,a=new Array(i).fill(0).map(t=>Math.random()<.5?1:0);return{cellsTex:fn(e,new Float32Array(a.map(t=>[t,0,0,0]).flat()),n.width,n.height)}}const Vn=` attribute vec2 aPosition;

 void main() {
   gl_Position = vec4(aPosition, 0.0, 1.0);
 }
`,Yn=`precision highp float;

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
`;let mo,ho,rt,wo,Qo,zt,It,bo,Lo;const Pt=(e,o)=>{const{cellsTex:n,texDimensions:i}=o;return ho=mn(e,[Vn,Yn]),mo={uInputTextureLocation:e.getUniformLocation(ho,"uInputTexture"),uTextureSizeLocation:e.getUniformLocation(ho,"uTextureSize"),positionLocation:e.getAttribLocation(ho,"aPosition")},rt=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,rt),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW),wo=n,Qo=fn(e,null,i.width,i.height),zt=yt(e,wo),It=yt(e,Qo),bo={fb:zt,tex:wo},Lo={fb:It,tex:Qo},wo},Kn=e=>{const{gl:o,worldDimensions:n,screenDimensions:i}=e;o.bindFramebuffer(o.FRAMEBUFFER,Lo.fb),o.viewport(0,0,i.width,i.height),o.bindBuffer(o.ARRAY_BUFFER,rt),o.enableVertexAttribArray(mo.positionLocation),o.vertexAttribPointer(mo.positionLocation,2,o.FLOAT,!1,0,0),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,bo.tex),o.useProgram(ho),o.uniform1i(mo.uInputTextureLocation,0),o.uniform2f(mo.uTextureSizeLocation,n.width,n.height),o.drawArrays(o.TRIANGLES,0,6);{const a=bo;bo=Lo,Lo=a}return bo.tex};function qn(e){let o,n,i,a,r=e[1]?"Play":"Pause",t,u,s,c,l,h,R=e[0].width+"",v,f,d=e[0].height+"",b,x,$=e[0].width*e[0].height+"",C,O,K,z,M,H,ee,ne,ie,Z,j,ue,W,w,U,Ee,Ae,N,qe,se,ce,Ze,V,Y,Re;return{c(){o=T("canvas"),n=L(),i=T("div"),a=T("button"),t=E(r),u=E(" (Space)"),s=L(),c=T("div"),l=T("span"),h=E("World "),v=E(R),f=E(" x "),b=E(d),x=E(" ("),C=E($),O=E(" cells)"),K=L(),z=T("button"),M=E("Reload program"),H=L(),ee=T("button"),ne=E("Fullscreen (f)"),ie=L(),Z=T("div"),j=T("button"),ue=E("Reset world (r)"),W=L(),w=T("span"),U=T("label"),Ee=E("World: width"),Ae=L(),N=T("input"),qe=L(),se=T("label"),ce=E("height"),Ze=L(),V=T("input"),this.h()},l(F){o=g(F,"CANVAS",{id:!0,style:!0,width:!0,height:!0}),D(o).forEach(p),n=S(F),i=g(F,"DIV",{});var G=D(i);a=g(G,"BUTTON",{});var le=D(a);t=A(le,r),u=A(le," (Space)"),le.forEach(p),G.forEach(p),s=S(F),c=g(F,"DIV",{});var de=D(c);l=g(de,"SPAN",{});var oe=D(l);h=A(oe,"World "),v=A(oe,R),f=A(oe," x "),b=A(oe,d),x=A(oe," ("),C=A(oe,$),O=A(oe," cells)"),oe.forEach(p),K=S(de),z=g(de,"BUTTON",{});var fe=D(z);M=A(fe,"Reload program"),fe.forEach(p),H=S(de),ee=g(de,"BUTTON",{});var De=D(ee);ne=A(De,"Fullscreen (f)"),De.forEach(p),de.forEach(p),ie=S(F),Z=g(F,"DIV",{});var ze=D(Z);j=g(ze,"BUTTON",{});var Qe=D(j);ue=A(Qe,"Reset world (r)"),Qe.forEach(p),W=S(ze),w=g(ze,"SPAN",{});var X=D(w);U=g(X,"LABEL",{for:!0});var eo=D(U);Ee=A(eo,"World: width"),eo.forEach(p),Ae=S(X),N=g(X,"INPUT",{id:!0,type:!0,min:!0}),qe=S(X),se=g(X,"LABEL",{for:!0});var J=D(se);ce=A(J,"height"),J.forEach(p),Ze=S(X),V=g(X,"INPUT",{id:!0,type:!0,min:!0}),X.forEach(p),ze.forEach(p),this.h()},h(){_(o,"id","canvas"),so(o,"background-color","black"),_(o,"width",e[3].width),_(o,"height",e[3].height),_(U,"for","worldWidth"),_(N,"id","worldWidth"),_(N,"type","number"),_(N,"min",0),_(se,"for","worldHeight"),_(V,"id","worldHeight"),_(V,"type","number"),_(V,"min",0)},m(F,G){y(F,o,G),y(F,n,G),y(F,i,G),m(i,a),m(a,t),m(a,u),y(F,s,G),y(F,c,G),m(c,l),m(l,h),m(l,v),m(l,f),m(l,b),m(l,x),m(l,C),m(l,O),m(c,K),m(c,z),m(z,M),m(c,H),m(c,ee),m(ee,ne),y(F,ie,G),y(F,Z,G),m(Z,j),m(j,ue),m(Z,W),m(Z,w),m(w,U),m(U,Ee),m(w,Ae),m(w,N),_e(N,e[0].width),m(w,qe),m(w,se),m(se,ce),m(w,Ze),m(w,V),_e(V,e[0].height),Y||(Re=[B(a,"click",e[6]),B(z,"click",e[7]),B(ee,"click",function(){un(e[2])&&e[2].apply(this,arguments)}),B(j,"click",e[5]),B(N,"change",e[5]),B(N,"input",e[8]),B(V,"change",e[5]),B(V,"input",e[9])],Y=!0)},p(F,[G]){e=F,G&2&&r!==(r=e[1]?"Play":"Pause")&&Le(t,r),G&1&&R!==(R=e[0].width+"")&&Le(v,R),G&1&&d!==(d=e[0].height+"")&&Le(b,d),G&1&&$!==($=e[0].width*e[0].height+"")&&Le(C,$),G&1&&we(N.value)!==e[0].width&&_e(N,e[0].width),G&1&&we(V.value)!==e[0].height&&_e(V,e[0].height)},i:k,o:k,d(F){F&&p(o),F&&p(n),F&&p(i),F&&p(s),F&&p(c),F&&p(ie),F&&p(Z),Y=!1,sn(Re)}}}function Zn(e,o,n){const i={width:1600,height:900},a={width:1600,height:900};let r=!0,t,u,s;function c(){cancelAnimationFrame(s),u=Un(),Gn(u.canvas);const b=Ft(u,{worldDimensions:a});t=Pt(u,{cellsTex:b.cellsTex,texDimensions:a}),On(u,{screenDimensions:i});function x(){return r||(t=Kn({gl:u,worldDimensions:a,screenDimensions:i})),kn({gl:u,cellsTex:t,worldDimensions:a}),s=requestAnimationFrame(x)}s=requestAnimationFrame(x)}let l;co(()=>{c(),n(2,l=Hn(document,"canvas",i).enableFullscreen),document.addEventListener("keydown",b=>{if(b.code==="Space"&&(n(1,r=!r),b.preventDefault()),b.code==="KeyF"){l();return}if(b.code==="KeyR"){h();return}})});const h=()=>{n(0,a.width=Math.min(a.width,i.width),a),n(0,a.height=Math.min(a.height,i.height),a);const b=Ft(u,{worldDimensions:a});t=Pt(u,{cellsTex:b.cellsTex,texDimensions:a})},R=()=>n(1,r=!r),v=()=>c();function f(){a.width=we(this.value),n(0,a)}function d(){a.height=we(this.value),n(0,a)}return[a,r,l,i,c,h,R,v,f,d]}let jn=class extends Ve{constructor(o){super(),Ye(this,o,Zn,qn,Ke,{})}};const Jn=["VERTEX_SHADER","FRAGMENT_SHADER"];function Qn(){const e=document.getElementById("canvas");if(!e)throw"canvas undefined";const o=e.getContext("webgl");if(!o)throw"gl undefined";return ei(o),o}function ei(e){if(!e.getExtension("OES_texture_float"))throw alert("Need OES_texture_float"),"Need OES_texture_float";if(!e.getExtension("WEBGL_color_buffer_float"))throw alert("Need WEBGL_color_buffer_float"),"Need WEBGL_color_buffer_float";if(e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS)<1)throw alert("Can not use textures in vertex shaders"),"Can not use textures in vertex shaders"}function hn(e,o,n,i){const a=e.createTexture();if(!a)throw"Can not create texture";return e.bindTexture(e.TEXTURE_2D,a),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,n,i,0,e.RGBA,e.FLOAT,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),a}function Ut(e,o){const n=e.createFramebuffer();if(!n)throw"Can not create frame buffer";return e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,o,0),n}function bn(e,o,n,i,a){const r=[];for(let u=0;u<o.length;++u){const s=Jn[u]==="VERTEX_SHADER"?e.VERTEX_SHADER:e.FRAGMENT_SHADER,c=oi(e,o[u],s,a);if(!c)throw"Can not create shader";r.push(c)}const t=ti(e,r,n,i,a);if(!t)throw"Can not create program";return t}function oi(e,o,n,i){const a=i||console.log,r=e.createShader(n);if(!r)throw"Could not load shader";if(e.shaderSource(r,o),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS)){const u=e.getShaderInfoLog(r);return a(new Error("*** Error compiling shader '"+r+"':"+u+`
`+o.split(`
`).map((s,c)=>`${c+1}: ${s}`).join(`
`))),e.deleteShader(r),null}return r}function ti(e,o,n,i,a){const r=a||console.log,t=e.createProgram();if(!t)throw"Could not create program";if(o.forEach(function(s){e.attachShader(t,s)}),n&&n.forEach(function(s,c){e.bindAttribLocation(t,i?i[c]:c,s)}),e.linkProgram(t),!e.getProgramParameter(t,e.LINK_STATUS)){const s=e.getProgramInfoLog(t);return r("Error in program linking:"+s),e.deleteProgram(t),null}return t}function ni(e,o){o=o||1;const n=e.clientWidth*o|0,i=e.clientHeight*o|0;return e.width!==n||e.height!==i?(e.width=n,e.height=i,!0):!1}const ii=`precision mediump float;
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
`,ri=`precision mediump float;
uniform sampler2D u_texture;
uniform float u_zoom;
uniform vec2 u_pan;

varying vec2 v_texcoord;

void main() {
    vec2 texCoord = (v_texcoord / u_zoom) + u_pan;

    float alive = texture2D(u_texture, texCoord).x;
    gl_FragColor = vec4(alive, alive, alive, 1.0);
}
`,ai=`precision mediump float;
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

`;let je,Je,So;const ui=(e,o)=>{const{screenDimensions:n,mode:i}=o,{height:a,width:r}=n;let t=ri;if(i==="gradiant"&&(t=ai),Je=bn(e,[ii,t]),je={positionLocation:e.getAttribLocation(Je,"a_position"),textureLocation:e.getUniformLocation(Je,"u_texture"),worldSizeLocation:e.getUniformLocation(Je,"u_worldSize"),zoomLocation:e.getUniformLocation(Je,"u_zoom"),panLocation:e.getUniformLocation(Je,"u_pan")},So=e.createBuffer(),!So)throw new Error("cant create buffer");e.bindBuffer(e.ARRAY_BUFFER,So),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,0,a,r,0,r,0,0,a,r,a]),e.STATIC_DRAW)},si=e=>{const{gl:o,cellsTex:n,worldDimensions:i,zoomLevel:a,pan:r}=e;o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindTexture(o.TEXTURE_2D,n),o.useProgram(Je),o.bindBuffer(o.ARRAY_BUFFER,So),o.enableVertexAttribArray(je.positionLocation),o.vertexAttribPointer(je.positionLocation,2,o.FLOAT,!1,0,0),o.uniform1i(je.textureLocation,0),o.uniform2f(je.worldSizeLocation,i.width,i.height),o.uniform1f(je.zoomLocation,Math.max(a,1)),o.uniform2f(je.panLocation,r.x,r.y),o.drawArrays(o.TRIANGLES,0,6)};function ci(e,o,n){function i(){const r=e.getElementById(o);r&&(e.fullscreenElement&&e.exitFullscreen&&e.exitFullscreen(),r.width=n.width,r.height=n.height)}function a(){const r=e.getElementById(o);r&&(e.fullscreenElement||r.requestFullscreen())}return e.addEventListener("fullscreenchange",()=>{e.fullscreenElement===null&&i()}),{enableFullscreen:a,disableFullscreen:i}}function Mt(e,o){const{worldDimensions:n,initialDensity:i,mode:a}=o;let r=i;r>1&&(r=1);const t=n.width*n.height;let u=new Array(t).fill(0);return a==="random"&&(u=u.map(c=>Math.random()<r?1:0)),{cellsTex:hn(e,new Float32Array(u.map((c,l)=>[c,l,0,0]).flat()),n.width,n.height)}}const li=` attribute vec2 aPosition;

 void main() {
   gl_Position = vec4(aPosition, 0.0, 1.0);
 }
`,di=`precision highp float;

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
`;let Me,Be,at,Eo,et,Bt,Nt,po,yo;const Gt=(e,o)=>{const{cellsTex:n,texDimensions:i}=o;return Be=bn(e,[li,di]),Me={uInputTextureLocation:e.getUniformLocation(Be,"uInputTexture"),uTextureSizeLocation:e.getUniformLocation(Be,"uTextureSize"),uMouseCoordinatesLocation:e.getUniformLocation(Be,"uMouseCoordinates"),uMouseModeLocation:e.getUniformLocation(Be,"uMouseMode"),uInfiniteSourceLocation:e.getUniformLocation(Be,"uInfiniteSource"),positionLocation:e.getAttribLocation(Be,"aPosition")},at=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,at),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW),Eo=n,et=hn(e,null,i.width,i.height),Bt=Ut(e,Eo),Nt=Ut(e,et),po={fb:Bt,tex:Eo},yo={fb:Nt,tex:et},Eo},fi=e=>{const{gl:o,worldDimensions:n,screenDimensions:i,mouseCoordinates:a,mouseMode:r,infiniteSource:t}=e;o.bindFramebuffer(o.FRAMEBUFFER,yo.fb),o.viewport(0,0,i.width,i.height),o.bindBuffer(o.ARRAY_BUFFER,at),o.enableVertexAttribArray(Me.positionLocation),o.vertexAttribPointer(Me.positionLocation,2,o.FLOAT,!1,0,0),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,po.tex),o.useProgram(Be),o.uniform1i(Me.uInputTextureLocation,0),o.uniform2f(Me.uTextureSizeLocation,n.width,n.height),o.uniform2f(Me.uMouseCoordinatesLocation,a.x,a.y),o.uniform1i(Me.uMouseModeLocation,r),o.uniform1i(Me.uInfiniteSourceLocation,t?1:0),o.drawArrays(o.TRIANGLES,0,6);{const u=po;po=yo,yo=u}return po.tex};function mi(e){let o,n,i,a,r=e[5]?"Play":"Pause",t,u,s,c,l=e[2]?"Disable":"Enable",h,R,v,f,d,b,x,$,C,O,K,z,M,H,ee,ne=e[0].width+"",ie,Z,j=e[0].height+"",ue,W,w=e[0].width*e[0].height+"",U,Ee,Ae,N,qe,se,ce,Ze,V,Y,Re,F,G,le,de,oe,fe,De,ze,Qe,X,eo,J,oo,Ho,Vo,re,Yo,to,Ko,qo,ae,Zo,_t;return{c(){o=T("canvas"),n=L(),i=T("div"),a=T("button"),t=E(r),u=E(" (Space)"),s=L(),c=T("button"),h=E(l),R=E(" constant cells generation (E)"),v=L(),f=T("button"),d=E("Zoom in (I)"),b=L(),x=T("button"),$=E("Zoom out (O)"),C=L(),O=T("button"),K=E("Reset zoom (Z)"),z=L(),M=T("div"),H=T("span"),ee=E("World "),ie=E(ne),Z=E(" x "),ue=E(j),W=E(" ("),U=E(w),Ee=E(" cells)"),Ae=L(),N=T("button"),qe=E("Reload program"),se=L(),ce=T("button"),Ze=E("Fullscreen (f)"),V=L(),Y=T("div"),Re=T("button"),F=E("Reset world (R)"),G=L(),le=T("button"),de=E("Empty world (E)"),oe=L(),fe=T("span"),De=T("label"),ze=E("Initial density [0-1]"),Qe=L(),X=T("input"),eo=L(),J=T("span"),oo=T("label"),Ho=E("World: width"),Vo=L(),re=T("input"),Yo=L(),to=T("label"),Ko=E("height"),qo=L(),ae=T("input"),this.h()},l(P){o=g(P,"CANVAS",{id:!0,style:!0,width:!0,height:!0}),D(o).forEach(p),n=S(P),i=g(P,"DIV",{});var I=D(i);a=g(I,"BUTTON",{});var jo=D(a);t=A(jo,r),u=A(jo," (Space)"),jo.forEach(p),s=S(I),c=g(I,"BUTTON",{});var Jo=D(c);h=A(Jo,l),R=A(Jo," constant cells generation (E)"),Jo.forEach(p),v=S(I),f=g(I,"BUTTON",{});var Tt=D(f);d=A(Tt,"Zoom in (I)"),Tt.forEach(p),b=S(I),x=g(I,"BUTTON",{});var gt=D(x);$=A(gt,"Zoom out (O)"),gt.forEach(p),C=S(I),O=g(I,"BUTTON",{});var wt=D(O);K=A(wt,"Reset zoom (Z)"),wt.forEach(p),I.forEach(p),z=S(P),M=g(P,"DIV",{});var no=D(M);H=g(no,"SPAN",{});var Ie=D(H);ee=A(Ie,"World "),ie=A(Ie,ne),Z=A(Ie," x "),ue=A(Ie,j),W=A(Ie," ("),U=A(Ie,w),Ee=A(Ie," cells)"),Ie.forEach(p),Ae=S(no),N=g(no,"BUTTON",{});var Et=D(N);qe=A(Et,"Reload program"),Et.forEach(p),se=S(no),ce=g(no,"BUTTON",{});var At=D(ce);Ze=A(At,"Fullscreen (f)"),At.forEach(p),no.forEach(p),V=S(P),Y=g(P,"DIV",{});var Pe=D(Y);Re=g(Pe,"BUTTON",{});var Rt=D(Re);F=A(Rt,"Reset world (R)"),Rt.forEach(p),G=S(Pe),le=g(Pe,"BUTTON",{});var Dt=D(le);de=A(Dt,"Empty world (E)"),Dt.forEach(p),oe=S(Pe),fe=g(Pe,"SPAN",{});var go=D(fe);De=g(go,"LABEL",{for:!0});var $t=D(De);ze=A($t,"Initial density [0-1]"),$t.forEach(p),Qe=S(go),X=g(go,"INPUT",{id:!0,type:!0,min:!0,max:!0}),go.forEach(p),eo=S(Pe),J=g(Pe,"SPAN",{});var Ue=D(J);oo=g(Ue,"LABEL",{for:!0});var Ct=D(oo);Ho=A(Ct,"World: width"),Ct.forEach(p),Vo=S(Ue),re=g(Ue,"INPUT",{id:!0,type:!0,min:!0}),Yo=S(Ue),to=g(Ue,"LABEL",{for:!0});var Lt=D(to);Ko=A(Lt,"height"),Lt.forEach(p),qo=S(Ue),ae=g(Ue,"INPUT",{id:!0,type:!0,min:!0}),Ue.forEach(p),Pe.forEach(p),this.h()},h(){_(o,"id","canvas"),so(o,"background-color","black"),_(o,"width",e[7].width),_(o,"height",e[7].height),_(De,"for","initialDensity"),_(X,"id","initialDensity"),_(X,"type","number"),_(X,"min",0),_(X,"max",1),_(oo,"for","worldWidth"),_(re,"id","worldWidth"),_(re,"type","number"),_(re,"min",0),_(to,"for","worldHeight"),_(ae,"id","worldHeight"),_(ae,"type","number"),_(ae,"min",0)},m(P,I){y(P,o,I),y(P,n,I),y(P,i,I),m(i,a),m(a,t),m(a,u),m(i,s),m(i,c),m(c,h),m(c,R),m(i,v),m(i,f),m(f,d),m(i,b),m(i,x),m(x,$),m(i,C),m(i,O),m(O,K),y(P,z,I),y(P,M,I),m(M,H),m(H,ee),m(H,ie),m(H,Z),m(H,ue),m(H,W),m(H,U),m(H,Ee),m(M,Ae),m(M,N),m(N,qe),m(M,se),m(M,ce),m(ce,Ze),y(P,V,I),y(P,Y,I),m(Y,Re),m(Re,F),m(Y,G),m(Y,le),m(le,de),m(Y,oe),m(Y,fe),m(fe,De),m(De,ze),m(fe,Qe),m(fe,X),_e(X,e[4]),m(Y,eo),m(Y,J),m(J,oo),m(oo,Ho),m(J,Vo),m(J,re),_e(re,e[0].width),m(J,Yo),m(J,to),m(to,Ko),m(J,qo),m(J,ae),_e(ae,e[0].height),Zo||(_t=[B(a,"click",e[10]),B(c,"click",e[11]),B(f,"click",e[12]),B(x,"click",e[13]),B(O,"click",e[14]),B(N,"click",e[15]),B(ce,"click",function(){un(e[6])&&e[6].apply(this,arguments)}),B(Re,"click",e[16]),B(le,"click",e[17]),B(X,"input",e[18]),B(re,"change",e[19]),B(re,"input",e[20]),B(ae,"change",e[21]),B(ae,"input",e[22])],Zo=!0)},p(P,[I]){e=P,I&32&&r!==(r=e[5]?"Play":"Pause")&&Le(t,r),I&4&&l!==(l=e[2]?"Disable":"Enable")&&Le(h,l),I&1&&ne!==(ne=e[0].width+"")&&Le(ie,ne),I&1&&j!==(j=e[0].height+"")&&Le(ue,j),I&1&&w!==(w=e[0].width*e[0].height+"")&&Le(U,w),I&16&&we(X.value)!==e[4]&&_e(X,e[4]),I&1&&we(re.value)!==e[0].width&&_e(re,e[0].width),I&1&&we(ae.value)!==e[0].height&&_e(ae,e[0].height)},i:k,o:k,d(P){P&&p(o),P&&p(n),P&&p(i),P&&p(z),P&&p(M),P&&p(V),P&&p(Y),Zo=!1,sn(_t)}}}function hi(e,o,n){const i={width:1200,height:900},a={width:1200,height:900},r={x:-100,y:-100},t={x:0,y:0};let u=0,s=!0,c=1,l=.05,h=!0,R,v,f;function d(){cancelAnimationFrame(f),v=Qn(),ni(v.canvas);const W=Mt(v,{mode:"random",worldDimensions:a,initialDensity:l});R=Gt(v,{cellsTex:W.cellsTex,texDimensions:a}),ui(v,{screenDimensions:i,mode:"gradiant"});function w(){h||(R=fi({gl:v,worldDimensions:a,screenDimensions:i,mouseCoordinates:r,mouseMode:u,infiniteSource:s}));const U=.005;return r.x<.2&&t.x>=U&&n(1,t.x-=U,t),r.x>.8&&t.x<1-1/c&&n(1,t.x+=U,t),r.y<.2&&t.y>=U&&n(1,t.y-=U,t),r.y>.8&&t.y<1-1/c&&n(1,t.y+=U,t),si({gl:v,cellsTex:R,worldDimensions:a,zoomLevel:c,pan:t}),f=requestAnimationFrame(w)}f=requestAnimationFrame(w)}let b;co(()=>{d(),n(6,b=ci(document,"canvas",i).enableFullscreen),document.addEventListener("keydown",w=>{if(w.code==="Space"&&(n(5,h=!h),w.preventDefault()),w.code==="KeyF"){b();return}if(w.code==="KeyR"){x("random");return}if(w.code==="KeyE"){x("zero");return}if(w.code==="KeyI"){n(3,c++,c);return}if(w.code==="KeyS"){n(2,s=!s);return}if(w.code==="KeyO"){n(3,c=Math.max(c-1,1)),c===1&&(n(1,t.x=0,t),n(1,t.y=0,t));return}if(w.code==="KeyZ"){n(3,c=1),n(1,t.x=0,t),n(1,t.y=0,t);return}});const W=document.getElementById("canvas");if(!W)throw new Error("Canvas unavailable");W.addEventListener("mousemove",w=>{const U=W.getBoundingClientRect(),Ee=W.width/U.width,Ae=W.height/U.height,N={x:(w.clientX-U.left)*Ee,y:(w.clientY-U.top)*Ae};r.x=N.x/i.width,r.y=N.y/i.height}),W.addEventListener("mousedown",w=>{w.preventDefault(),w.button===0?u=1:w.button===2&&(u=2)}),W.addEventListener("mouseup",w=>{w.preventDefault(),u=0}),W.addEventListener("contextmenu",w=>(w.preventDefault(),!1))});const x=W=>{n(0,a.width=Math.min(a.width,i.width),a),n(0,a.height=Math.min(a.height,i.height),a);const w=Mt(v,{mode:W,worldDimensions:a,initialDensity:l});R=Gt(v,{cellsTex:w.cellsTex,texDimensions:a})},$=()=>n(5,h=!h),C=()=>n(2,s=!s),O=()=>n(3,c+=1),K=()=>{n(3,c=Math.max(c-1,1)),c===1&&(n(1,t.x=0,t),n(1,t.y=0,t))},z=()=>n(3,c=1),M=()=>d(),H=()=>x("random"),ee=()=>x("zero");function ne(){l=we(this.value),n(4,l)}const ie=()=>x("random");function Z(){a.width=we(this.value),n(0,a)}const j=()=>x("random");function ue(){a.height=we(this.value),n(0,a)}return[a,t,s,c,l,h,b,i,d,x,$,C,O,K,z,M,H,ee,ne,ie,Z,j,ue]}let bi=class extends Ve{constructor(o){super(),Ye(this,o,hi,mi,Ke,{})}};const pi=["VERTEX_SHADER","FRAGMENT_SHADER"];function xi(){const e=document.getElementById("canvas");if(!e)throw"canvas undefined";const o=e.getContext("webgl");if(!o)throw"gl undefined";return vi(o),o}function vi(e){if(!e.getExtension("OES_texture_float"))throw alert("Need OES_texture_float"),"Need OES_texture_float";if(!e.getExtension("WEBGL_color_buffer_float"))throw alert("Need WEBGL_color_buffer_float"),"Need WEBGL_color_buffer_float";if(e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS)<1)throw alert("Can not use textures in vertex shaders"),"Can not use textures in vertex shaders"}function pn(e,o,n,i){const a=e.createTexture();if(!a)throw"Can not create texture";return e.bindTexture(e.TEXTURE_2D,a),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,n,i,0,e.RGBA,e.FLOAT,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),a}function Wt(e,o){const n=e.createFramebuffer();if(!n)throw"Can not create frame buffer";return e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,o,0),n}function xn(e,o,n,i,a){const r=[];for(let u=0;u<o.length;++u){const s=pi[u]==="VERTEX_SHADER"?e.VERTEX_SHADER:e.FRAGMENT_SHADER,c=_i(e,o[u],s,a);if(!c)throw"Can not create shader";r.push(c)}const t=Ti(e,r,n,i,a);if(!t)throw"Can not create program";return t}function _i(e,o,n,i){const a=i||console.log,r=e.createShader(n);if(!r)throw"Could not load shader";if(e.shaderSource(r,o),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS)){const u=e.getShaderInfoLog(r);return a(new Error("*** Error compiling shader '"+r+"':"+u+`
`+o.split(`
`).map((s,c)=>`${c+1}: ${s}`).join(`
`))),e.deleteShader(r),null}return r}function Ti(e,o,n,i,a){const r=a||console.log,t=e.createProgram();if(!t)throw"Could not create program";if(o.forEach(function(s){e.attachShader(t,s)}),n&&n.forEach(function(s,c){e.bindAttribLocation(t,i?i[c]:c,s)}),e.linkProgram(t),!e.getProgramParameter(t,e.LINK_STATUS)){const s=e.getProgramInfoLog(t);return r("Error in program linking:"+s),e.deleteProgram(t),null}return t}function gi(e,o){o=o||1;const n=e.clientWidth*o|0,i=e.clientHeight*o|0;return e.width!==n||e.height!==i?(e.width=n,e.height=i,!0):!1}const wi=`precision mediump float;
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
`,Ei=`precision mediump float;
uniform sampler2D u_texture;
uniform float u_zoom;
uniform vec2 u_pan;

varying vec2 v_texcoord;

void main() {
    vec2 texCoord = (v_texcoord / u_zoom) + u_pan;

    float alive = texture2D(u_texture, texCoord).x;
    gl_FragColor = vec4(alive, alive, alive, 1.0);
}
`,Ai=`precision mediump float;
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

`,Ri=`precision mediump float;
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

`;let Ne,Ge,Fo;const Xt=(e,o)=>{const{screenDimensions:n,mode:i}=o,{height:a,width:r}=n;let t=Ei;if(i==="gradiant"?t=Ai:i==="age_gradiant"&&(t=Ri),Ge=xn(e,[wi,t]),Ne={positionLocation:e.getAttribLocation(Ge,"a_position"),textureLocation:e.getUniformLocation(Ge,"u_texture"),worldSizeLocation:e.getUniformLocation(Ge,"u_worldSize"),zoomLocation:e.getUniformLocation(Ge,"u_zoom"),panLocation:e.getUniformLocation(Ge,"u_pan"),iterationLocation:e.getUniformLocation(Ge,"u_iteration")},Fo=e.createBuffer(),!Fo)throw new Error("cant create buffer");e.bindBuffer(e.ARRAY_BUFFER,Fo),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,0,a,r,0,r,0,0,a,r,a]),e.STATIC_DRAW)},Di=e=>{const{gl:o,cellsTex:n,worldDimensions:i,zoomLevel:a,pan:r,iteration:t}=e;o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindTexture(o.TEXTURE_2D,n),o.useProgram(Ge),o.bindBuffer(o.ARRAY_BUFFER,Fo),o.enableVertexAttribArray(Ne.positionLocation),o.vertexAttribPointer(Ne.positionLocation,2,o.FLOAT,!1,0,0),o.uniform1i(Ne.textureLocation,0),o.uniform2f(Ne.worldSizeLocation,i.width,i.height),o.uniform1f(Ne.zoomLocation,Math.max(a,1)),o.uniform2f(Ne.panLocation,r.x,r.y),o.uniform1f(Ne.iterationLocation,t),o.drawArrays(o.TRIANGLES,0,6)};function Ot(e,o){const{worldDimensions:n,initialDensity:i,mode:a}=o;let r=i;r>1&&(r=1);const t=n.width*n.height;let u=new Array(t).fill(0);return a==="random"&&(u=u.map(c=>Math.random()<r?1:0)),{cellsTex:pn(e,new Float32Array(u.map((c,l)=>[c,l,0,0]).flat()),n.width,n.height)}}const $i=` attribute vec2 aPosition;

 void main() {
   gl_Position = vec4(aPosition, 0.0, 1.0);
 }
`,Ci=`precision highp float;

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
`;let $e,Ce,ut,Ao,ot,kt,Ht,xo,zo;const Vt=(e,o)=>{const{cellsTex:n,texDimensions:i}=o;return Ce=xn(e,[$i,Ci]),$e={uInputTextureLocation:e.getUniformLocation(Ce,"uInputTexture"),uTextureSizeLocation:e.getUniformLocation(Ce,"uTextureSize"),uMouseCoordinatesLocation:e.getUniformLocation(Ce,"uMouseCoordinates"),uMouseModeLocation:e.getUniformLocation(Ce,"uMouseMode"),uInfiniteSourceLocation:e.getUniformLocation(Ce,"uInfiniteSource"),uIterationLocation:e.getUniformLocation(Ce,"uIteration"),positionLocation:e.getAttribLocation(Ce,"aPosition")},ut=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,ut),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW),Ao=n,ot=pn(e,null,i.width,i.height),kt=Wt(e,Ao),Ht=Wt(e,ot),xo={fb:kt,tex:Ao},zo={fb:Ht,tex:ot},Ao},Li=e=>{const{gl:o,worldDimensions:n,screenDimensions:i,mouseCoordinates:a,mouseMode:r,infiniteSource:t,iteration:u}=e;o.bindFramebuffer(o.FRAMEBUFFER,zo.fb),o.viewport(0,0,i.width,i.height),o.bindBuffer(o.ARRAY_BUFFER,ut),o.enableVertexAttribArray($e.positionLocation),o.vertexAttribPointer($e.positionLocation,2,o.FLOAT,!1,0,0),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,xo.tex),o.useProgram(Ce),o.uniform1i($e.uInputTextureLocation,0),o.uniform2f($e.uTextureSizeLocation,n.width,n.height),o.uniform2f($e.uMouseCoordinatesLocation,a.x,a.y),o.uniform1i($e.uMouseModeLocation,r),o.uniform1i($e.uInfiniteSourceLocation,t?1:0),o.uniform1f($e.uIterationLocation,u),o.drawArrays(o.TRIANGLES,0,6);{const s=xo;xo=zo,zo=s}return xo.tex};function Si(e){let o;return{c(){o=T("canvas"),this.h()},l(n){o=g(n,"CANVAS",{id:!0,style:!0,width:!0,height:!0,class:!0}),D(o).forEach(p),this.h()},h(){_(o,"id","canvas"),so(o,"background-color","black"),_(o,"width",e[0].width),_(o,"height",e[0].height),_(o,"class","svelte-1b0ol19")},m(n,i){y(n,o,i)},p:k,i:k,o:k,d(n){n&&p(o)}}}function yi(e){const o={x:0,y:0};let n=0,i,a;const r={width:window.innerWidth-50,height:window.innerHeight-10},t={x:0,y:0},u={Pause:!1,"Infinite source":!0,Iteration:0,TimeInSeconds:0,fps:0,"Draw mode":"age_gradiant","Reset grid":()=>f("random"),"Empty grid":()=>f("zero"),"Initial density":.05,"World width":r.width,"World height":r.height,Cells:(r.width*r.height).toString(),"Zoom level":1,"Pan reset":()=>{t.x=0,t.y=0},"Reload progam":()=>v()};let s;const c=async()=>{const d=await ko(()=>import("../../../chunks/dat.gui.module-69d90d27.js"),[],import.meta.url);s=new d.GUI,s.add(u,"Pause").listen(),s.add(u,"Infinite source").listen(),s.add(u,"TimeInSeconds").listen(),s.add(u,"Iteration").listen(),s.add(u,"fps").listen(),s.add(u,"Draw mode",{White:"white","Age Gradiant":"age_gradiant","Position Gradiant":"gradiant"}).onFinishChange(()=>Xt(l,{screenDimensions:r,mode:u["Draw mode"]})),s.add(u,"Reset grid"),s.add(u,"Empty grid"),s.add(u,"Initial density",0,1,.01).onFinishChange(()=>f("random")),s.add(u,"World width",1,r.width,1).onFinishChange(()=>{u.Cells=(u["World height"]*u["World width"]).toString(),f("random")}),s.add(u,"World height",1,r.height,1).onFinishChange(()=>{u.Cells=(u["World height"]*u["World width"]).toString(),f("random")}),s.add(u,"Cells").listen(),s.add(u,"Zoom level",1,10),s.add(u,"Pan reset"),s.add(u,"Reload progam")};let l,h,R;function v(){i=Date.now()/1e3,cancelAnimationFrame(R),l=xi(),gi(l.canvas);const d=Ot(l,{mode:"random",worldDimensions:{width:u["World width"],height:u["World height"]},initialDensity:u["Initial density"]});h=Vt(l,{cellsTex:d.cellsTex,texDimensions:{width:u["World width"],height:u["World height"]}}),Xt(l,{screenDimensions:r,mode:u["Draw mode"]});function b(){if(!u.Pause){const $=Date.now()/1e3,C=$-a;u.fps=1/C,a=$,u.TimeInSeconds=$-i,u.Iteration++,h=Li({gl:l,worldDimensions:{width:u["World width"],height:u["World height"]},screenDimensions:r,mouseCoordinates:o,mouseMode:n,infiniteSource:u["Infinite source"],iteration:u.Iteration})}const x=.005;return o.x<.1&&t.x>=x&&(t.x-=x),o.x>.9&&t.x<1-1/u["Zoom level"]&&(t.x+=x),o.y<.1&&t.y>=x&&(t.y-=x),o.y>.9&&t.y<1-1/u["Zoom level"]&&(t.y+=x),Di({gl:l,cellsTex:h,worldDimensions:{width:u["World width"],height:u["World height"]},zoomLevel:u["Zoom level"],pan:t,iteration:u.Iteration}),R=requestAnimationFrame(b)}R=requestAnimationFrame(b)}co(()=>{v(),c(),document.addEventListener("keydown",b=>{if(b.code==="Space"&&(u.Pause=!u.Pause,b.preventDefault()),b.code==="KeyR"){f("random");return}if(b.code==="KeyE"){f("zero");return}if(b.code==="KeyS"){u["Infinite source"]=!u["Infinite source"];return}});const d=document.getElementById("canvas");if(!d)throw new Error("Canvas unavailable");d.addEventListener("mousemove",b=>{const x=d.getBoundingClientRect(),$=d.width/x.width,C=d.height/x.height,O={x:(b.clientX-x.left)*$,y:(b.clientY-x.top)*C};o.x=O.x/r.width,o.y=O.y/r.height}),d.addEventListener("mousedown",b=>{b.preventDefault(),b.button===0?n=1:b.button===2&&(n=2)}),d.addEventListener("mouseup",b=>{b.preventDefault(),n=0}),d.addEventListener("contextmenu",b=>(b.preventDefault(),!1))}),Oo(()=>{s.destroy()});const f=d=>{u.Iteration=0,u.TimeInSeconds=0;const b=Ot(l,{mode:d,worldDimensions:{width:u["World width"],height:u["World height"]},initialDensity:u["Initial density"]});h=Vt(l,{cellsTex:b.cellsTex,texDimensions:{width:u["World width"],height:u["World height"]}})};return[r]}let Fi=class extends Ve{constructor(o){super(),Ye(this,o,yi,Si,Ke,{})}};const zi=["VERTEX_SHADER","FRAGMENT_SHADER"];function Ii(){const e=document.getElementById("canvas");if(!e)throw"canvas undefined";const o=e.getContext("webgl");if(!o)throw"gl undefined";return Pi(o),o}function Pi(e){if(!e.getExtension("OES_texture_float"))throw alert("Need OES_texture_float"),"Need OES_texture_float";if(!e.getExtension("WEBGL_color_buffer_float"))throw alert("Need WEBGL_color_buffer_float"),"Need WEBGL_color_buffer_float";if(e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS)<1)throw alert("Can not use textures in vertex shaders"),"Can not use textures in vertex shaders"}function vn(e,o,n,i){const a=e.createTexture();if(!a)throw"Can not create texture";return e.bindTexture(e.TEXTURE_2D,a),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,n,i,0,e.RGBA,e.FLOAT,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),a}function Yt(e,o){const n=e.createFramebuffer();if(!n)throw"Can not create frame buffer";return e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,o,0),n}function _n(e,o,n,i,a){const r=[];for(let u=0;u<o.length;++u){const s=zi[u]==="VERTEX_SHADER"?e.VERTEX_SHADER:e.FRAGMENT_SHADER,c=Ui(e,o[u],s,a);if(!c)throw"Can not create shader";r.push(c)}const t=Mi(e,r,n,i,a);if(!t)throw"Can not create program";return t}function Ui(e,o,n,i){const a=i||console.log,r=e.createShader(n);if(!r)throw"Could not load shader";if(e.shaderSource(r,o),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS)){const u=e.getShaderInfoLog(r);return a(new Error("*** Error compiling shader '"+r+"':"+u+`
`+o.split(`
`).map((s,c)=>`${c+1}: ${s}`).join(`
`))),e.deleteShader(r),null}return r}function Mi(e,o,n,i,a){const r=a||console.log,t=e.createProgram();if(!t)throw"Could not create program";if(o.forEach(function(s){e.attachShader(t,s)}),n&&n.forEach(function(s,c){e.bindAttribLocation(t,i?i[c]:c,s)}),e.linkProgram(t),!e.getProgramParameter(t,e.LINK_STATUS)){const s=e.getProgramInfoLog(t);return r("Error in program linking:"+s),e.deleteProgram(t),null}return t}function Bi(e,o){o=o||1;const n=e.clientWidth*o|0,i=e.clientHeight*o|0;return e.width!==n||e.height!==i?(e.width=n,e.height=i,!0):!1}function Tn(e,o){const{worldDimensions:n,initialDensity:i,mode:a}=o;let r=i;r>1&&(r=1);const t=n.width*n.height;let u=new Array(t).fill(0);return a==="random"&&(u=u.map(c=>Math.random()<r?1:0)),{cellsTex:vn(e,new Float32Array(u.map((c,l)=>[c,l,0,0]).flat()),n.width,n.height)}}const Ni=` attribute vec2 aPosition;

 void main() {
   gl_Position = vec4(aPosition, 0.0, 1.0);
 }
`,Gi=`precision highp float;

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
`;let me,he,st,Ro,tt,Kt,qt,vo,Io;const gn=(e,o)=>{const{cellsTex:n,texDimensions:i}=o;return he=_n(e,[Ni,Gi]),me={uInputTextureLocation:e.getUniformLocation(he,"uInputTexture"),uTextureSizeLocation:e.getUniformLocation(he,"uTextureSize"),uMouseCoordinatesLocation:e.getUniformLocation(he,"uMouseCoordinates"),uMouseModeLocation:e.getUniformLocation(he,"uMouseMode"),uInfiniteSourceLocation:e.getUniformLocation(he,"uInfiniteSource"),uIterationLocation:e.getUniformLocation(he,"uIteration"),uPauseLocation:e.getUniformLocation(he,"uPause"),positionLocation:e.getAttribLocation(he,"aPosition")},st=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,st),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW),Ro=n,tt=vn(e,null,i.width,i.height),Kt=Yt(e,Ro),qt=Yt(e,tt),vo={fb:Kt,tex:Ro},Io={fb:qt,tex:tt},Ro},Wi=e=>{const{gl:o,worldDimensions:n,screenDimensions:i,mouseCoordinates:a,mouseMode:r,infiniteSource:t,iteration:u,pause:s}=e;o.bindFramebuffer(o.FRAMEBUFFER,Io.fb),o.viewport(0,0,i.width,i.height),o.bindBuffer(o.ARRAY_BUFFER,st),o.enableVertexAttribArray(me.positionLocation),o.vertexAttribPointer(me.positionLocation,2,o.FLOAT,!1,0,0),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,vo.tex),o.useProgram(he),o.uniform1i(me.uInputTextureLocation,0),o.uniform2f(me.uTextureSizeLocation,n.width,n.height),o.uniform2f(me.uMouseCoordinatesLocation,a.x,a.y),o.uniform1i(me.uMouseModeLocation,r),o.uniform1i(me.uInfiniteSourceLocation,t?1:0),o.uniform1f(me.uIterationLocation,u),o.uniform1i(me.uPauseLocation,s?1:0),o.drawArrays(o.TRIANGLES,0,6);{const c=vo;vo=Io,Io=c}return vo.tex},Xi=`precision mediump float;
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
`,Oi=`precision mediump float;
uniform sampler2D u_texture;
uniform float u_zoom;
uniform vec2 u_pan;

varying vec2 v_texcoord;

void main() {
    vec2 texCoord = (v_texcoord / u_zoom) + u_pan;

    float alive = texture2D(u_texture, texCoord).x;
    gl_FragColor = vec4(alive, alive, alive, 1.0);
}
`,ki=`precision mediump float;
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

`,Hi=`precision mediump float;
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

`;let We,Xe,Po;const wn=(e,o)=>{const{screenDimensions:n,mode:i}=o,{height:a,width:r}=n;let t=Oi;if(i==="gradiant"?t=ki:i==="age_gradiant"&&(t=Hi),Xe=_n(e,[Xi,t]),We={positionLocation:e.getAttribLocation(Xe,"a_position"),textureLocation:e.getUniformLocation(Xe,"u_texture"),worldSizeLocation:e.getUniformLocation(Xe,"u_worldSize"),zoomLocation:e.getUniformLocation(Xe,"u_zoom"),panLocation:e.getUniformLocation(Xe,"u_pan"),iterationLocation:e.getUniformLocation(Xe,"u_iteration")},Po=e.createBuffer(),!Po)throw new Error("cant create buffer");e.bindBuffer(e.ARRAY_BUFFER,Po),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,0,a,r,0,r,0,0,a,r,a]),e.STATIC_DRAW)},Vi=e=>{const{gl:o,cellsTex:n,worldDimensions:i,zoomLevel:a,pan:r,iteration:t}=e;o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindTexture(o.TEXTURE_2D,n),o.useProgram(Xe),o.bindBuffer(o.ARRAY_BUFFER,Po),o.enableVertexAttribArray(We.positionLocation),o.vertexAttribPointer(We.positionLocation,2,o.FLOAT,!1,0,0),o.uniform1i(We.textureLocation,0),o.uniform2f(We.worldSizeLocation,i.width,i.height),o.uniform1f(We.zoomLocation,Math.max(a,1)),o.uniform2f(We.panLocation,r.x,r.y),o.uniform1f(We.iterationLocation,t),o.drawArrays(o.TRIANGLES,0,6)};let Te,Go;function Yi(e){const{drawMode:o,initialDensity:n,screenDimensions:i,worldDimensions:a}=e;Te=Ii(),Bi(Te.canvas);const r=Tn(Te,{mode:"random",worldDimensions:a,initialDensity:n});Go=gn(Te,{cellsTex:r.cellsTex,texDimensions:a}),wn(Te,{screenDimensions:i,mode:o})}function Ki(e){const{infiniteSource:o,iteration:n,mouseCoordinates:i,mouseMode:a,pause:r,pan:t,screenDimensions:u,worldDimensions:s,zoomLevel:c}=e;Go=Wi({gl:Te,worldDimensions:s,screenDimensions:u,mouseCoordinates:i,mouseMode:a,infiniteSource:o,iteration:n,pause:r}),Vi({gl:Te,cellsTex:Go,worldDimensions:s,zoomLevel:c,pan:t,iteration:n})}const qi=e=>{const{worldDimensions:o,mode:n,initialDensity:i}=e,a=Tn(Te,{mode:n,worldDimensions:o,initialDensity:i});Go=gn(Te,{cellsTex:a.cellsTex,texDimensions:o})},Zi=e=>{wn(Te,{screenDimensions:e.screenDimensions,mode:e.drawMode})};function ji(e){let o;return{c(){o=T("canvas"),this.h()},l(n){o=g(n,"CANVAS",{id:!0,style:!0,width:!0,height:!0,class:!0}),D(o).forEach(p),this.h()},h(){_(o,"id","canvas"),so(o,"background-color","black"),_(o,"width",e[0].width),_(o,"height",e[0].height),_(o,"class","svelte-1b0ol19")},m(n,i){y(n,o,i)},p:k,i:k,o:k,d(n){n&&p(o)}}}function Ji(e){const o={x:0,y:0};let n=0,i,a=0;const r={width:window.innerWidth-50,height:window.innerHeight-10},t={program:{pause:!1,infiniteSource:!0,drawMode:"age_gradiant",reloadProgram:()=>h()},simulation:{iteration:0,timeInSeconds:0,fps:0},grid:{resetGrid:()=>v("random"),emptyGrid:()=>v("zero"),initialDensity:.5,worldWidth:r.width,worldHeight:r.height,nbCells:(r.width*r.height).toString()},zoom:{x:0,y:0,xController:null,yController:null,level:1,previousLevel:1}};let u;const s=async()=>{const f=await ko(()=>import("../../../chunks/dat.gui.module-69d90d27.js"),[],import.meta.url);u=new f.GUI;const d=u.addFolder("Program");d.open(),d.add(t.program,"pause").name("Pause").listen(),d.add(t.program,"infiniteSource").name("Infinite Source").listen(),d.add(t.program,"drawMode",{White:"white","Age Gradiant":"age_gradiant","Position Gradiant":"gradiant"}).name("Drawing mode").onFinishChange(()=>Zi({screenDimensions:r,drawMode:t.program.drawMode})),d.add(t.program,"reloadProgram").name("Reload program");const b=u.addFolder("Simulation");b.open(),b.add(t.simulation,"timeInSeconds").name("Time (s)").listen(),b.add(t.simulation,"iteration").name("Iteration").listen(),b.add(t.simulation,"fps").listen();const x=u.addFolder("Grid");x.open(),x.add(t.grid,"resetGrid").name("Reset grid"),x.add(t.grid,"emptyGrid").name("Empty grid"),x.add(t.grid,"initialDensity",0,1,.01).name("Initial density").onFinishChange(()=>v("random")),x.add(t.grid,"worldWidth",1,r.width,1).name("World width").onFinishChange(()=>{t.grid.nbCells=(t.grid.worldHeight*t.grid.worldWidth).toString(),v("random")}),x.add(t.grid,"worldHeight",1,r.height,1).name("World height").onFinishChange(()=>{t.grid.nbCells=(t.grid.worldHeight*t.grid.worldWidth).toString(),v("random")}),x.add(t.grid,"nbCells").name("Cells count").listen();const $=u.addFolder("Zoom");$.open(),$.add(t.zoom,"level",1,10).name("Level").onChange(function(C){const O=C-t.zoom.previousLevel;if(!t.zoom.xController||!t.zoom.yController||O===0)return;const K=1-1/t.zoom.previousLevel,z=1-1/C;t.zoom.xController.max(z),t.zoom.xController.min(0),t.zoom.yController.max(z),t.zoom.yController.min(0);const M={x:t.zoom.x/K,y:t.zoom.y/K};t.zoom.x=z*M.x||z/2,t.zoom.y=z*M.y||z/2,t.zoom.previousLevel=C}),t.zoom.xController=$.add(t.zoom,"x",0,0,.01).name("X offset").listen(),t.zoom.yController=$.add(t.zoom,"y",0,0,.01).name("Y offset").listen()},c=()=>{document.addEventListener("keydown",d=>{if(d.code==="Space"&&(t.program.pause=!t.program.pause,d.preventDefault()),d.code==="KeyR"){v("random");return}if(d.code==="KeyE"){v("zero");return}if(d.code==="KeyS"){t.program.infiniteSource=!t.program.infiniteSource;return}});const f=document.getElementById("canvas");if(!f)throw new Error("Canvas unavailable");f.addEventListener("mousemove",d=>{const b=f.getBoundingClientRect(),x=f.width/b.width,$=f.height/b.height,C={x:(d.clientX-b.left)*x,y:(d.clientY-b.top)*$};o.x=C.x/r.width,o.y=C.y/r.height}),setInterval(()=>{o.x<.1&&t.zoom.x>=.005&&(t.zoom.x-=.005),o.x>.9&&t.zoom.x<1-1/t.zoom.level&&(t.zoom.x+=.005),o.y<.1&&t.zoom.y>=.005&&(t.zoom.y-=.005),o.y>.9&&t.zoom.y<1-1/t.zoom.level&&(t.zoom.y+=.005)},50),f.addEventListener("mousedown",d=>{d.preventDefault(),d.button===0?n=1:d.button===2&&(n=2)}),f.addEventListener("mouseup",d=>{d.preventDefault(),n=0}),f.addEventListener("contextmenu",d=>(d.preventDefault(),!1))};let l;const h=()=>{Yi({initialDensity:t.grid.initialDensity,worldDimensions:{width:t.grid.worldWidth,height:t.grid.worldHeight},screenDimensions:r,drawMode:t.program.drawMode}),cancelAnimationFrame(l),i=Date.now()/1e3,R()},R=()=>{const f=Date.now()/1e3,d=f-a;a=f,t.simulation.fps=1/d,t.program.pause||(t.simulation.timeInSeconds=f-i,t.simulation.iteration++),Ki({infiniteSource:t.program.infiniteSource,iteration:t.simulation.iteration,mouseCoordinates:o,mouseMode:n,pause:t.program.pause,pan:{x:t.zoom.x,y:t.zoom.y},screenDimensions:r,worldDimensions:{width:t.grid.worldWidth,height:t.grid.worldHeight},zoomLevel:t.zoom.level}),l=requestAnimationFrame(R)},v=f=>{t.simulation.iteration=0,t.simulation.timeInSeconds=0,qi({initialDensity:t.grid.initialDensity,worldDimensions:{width:t.grid.worldWidth,height:t.grid.worldHeight},mode:f})};return co(()=>{s(),c(),h()}),Oo(()=>{u.destroy()}),[r]}let Qi=class extends Ve{constructor(o){super(),Ye(this,o,Ji,ji,Ke,{})}};const er=e=>e.split("").reduce((o,n)=>o.length===0?(o.push(n),o):(n.match(/\d/)&&o[o.length-1]?.match(/\d/)?o[o.length-1]=o[o.length-1]+n:o.push(n),o),[]),or=e=>{const o=[];if(!e.length)throw new Error("No line items to tokenize");let n={};for(let i=0;i<e.length;i++){const a=e[i],r=a.match(/^\d+$/);if(!r&&!["o","b","$","!"].includes(a))throw new Error(`Invalid configuration item ${a}`);if(r){if(n.count)throw new Error(`Invalid configuration. Two consecutive numbers ${n.count}, ${a}`);n.count=Number(a)}else{if(n.tag)throw new Error(`Invalid configuration. Something went wrong with tokenization at item ${a}, index ${i}`);if(n.count||(n.count=1),a==="!")return o;n.tag=a,o.push(n),n={}}}throw new Error("Invalid configuration. No ending character")},tr=e=>{const{properties:o,tokens:n}=e,i=[[]];for(;n.length;){const a=n.shift();if(!a)break;const{count:r,tag:t}=a;if(t==="!")throw new Error("Invalid token. ! should not have been sent here");if(t==="$"){for(let u=0;u<r;u++)if(i.push([]),i.length>o.y)throw new Error("Invalid token. Vertical dimensions mismatch")}else for(let u=0;u<r;u++)i[i.length-1].push(t==="b"?0:1)}for(;i.length<o.y;)i.push(new Array(o.x).fill(0));for(let a=0;a<i.length;a++)for(;i[a].length<o.x;)i[a].push(0);return i},nr=e=>{const o=e.replaceAll(" ","").split(",").reduce((n,i)=>{const[a,r]=i.split("=");return r.match(/^\d+$/)?n[a]=Number(r):n[a]=r,n},{x:0,y:0});if(!o.x||!o.y)throw new Error("Invalid pattern file: no dimensions");return o},ir=e=>{const o=e.replaceAll(`\r
`,`
`).split(`
`).filter(s=>s!=="").filter(s=>!s.match(/^#/)),n=o.shift(),i=o.join("");if(!n||!o)throw new Error("Invalid pattern file");const a=nr(n),r=er(i),t=or(r),u=tr({properties:a,tokens:t});return{width:a.x,height:a.y,pattern:u}},rr=`#N Big glider\r
#O Dean Hickerson\r
#C The first known diagonal spaceship other than the glider. Has period 4 and speed c/4.\r
#C www.conwaylife.com/wiki/index.php?title=Big_glider\r
x = 18, y = 18, rule = B3/S23\r
3b3o12b$3bo2b3o9b$4bobo11b$2o7bo8b$obo4bo2bo7b$o8b2o7b$b2o15b$bo2bo5bo\r
b2o4b$bo9b2obo3b$3bobo6b2o2bob$4b2obo4b2o3bo$8bo7bob$7b4o3bobob$7bob2o\r
3b4o$8bo3b2obo2b$13b2o3b$9bob3o4b$10bo2bo!`,ar=`#N Candelabra\r
#O Charles Trawick\r
#C A period 3 oscillator.\r
#C www.conwaylife.com/wiki/index.php?title=Candelabra\r
x = 16, y = 6, rule = B3/S23\r
4b2o4b2o4b$bo2bo6bo2bob$obobo6bobobo$bo2bob4obo2bob$4bobo2bobo4b$5bo4b\r
o!`,ur=`#N 131c31climber.rle\r
#C https://conwaylife.com/wiki/(13,1)c/31_Pseudo-B_climber\r
#C https://www.conwaylife.com/patterns/131c31climber.rle\r
x = 37, y = 108, rule = B3/S23\r
o$b2o$2o19$8bo$6bobo$7b2o19$13bobo$14b2o$14bo17$24bo$23b3o$23bob2o$24b\r
o2bo$25b2o$25bo2$22b2o$21bo2$20bobo2bo$20bob3obo$19b3ob2obo$20bobo$20b\r
3o$21bo8$29bo$27bobo$28b2o19$34bobo$35b2o$35bo!`,sr=`#N E-heptomino\r
#O Unknown\r
#C https://conwaylife.com/wiki/E-heptomino\r
#C https://conwaylife.com/patterns/eheptomino.rle\r
x = 4, y = 3, rule = B3/S23\r
b3o$2o$b2o!`,cr=`#N gardenofeden5x45.rle\r
#O Steven Eker, 2016\r
#C https://conwaylife.com/wiki/Garden_of_Eden_5%C3%9745\r
#C https://www.conwaylife.com/patterns/gardenofeden5x45.rle\r
x = 45, y = 5, rule = B3/S23\r
2obobo2bob3obo2b3ob7o2b6o2bobobobo$b2obob2obobobobobob3obobobobobobob\r
3obobobo$2b2ob2o2b4o2b6o2b6o2b5ob5obo$b2obob2obobobobobob3obobobobobob\r
ob3obobobo$2obobo2bob3obo2b3ob7o2b6o2bobobobo!`,lr=`#N Glider\r
#O Richard K. Guy\r
#C The smallest, most common, and first discovered spaceship. Diagonal, has period 4 and speed c/4.\r
#C www.conwaylife.com/wiki/index.php?title=Glider\r
x = 3, y = 3, rule = B3/S23\r
bob$2bo$3o!`,dr=`#N Gliders by the dozen\r
#C A methuselah with lifespan 184 that emits exactly 12 gliders over the course of its evolution.\r
#C www.conwaylife.com/wiki/index.php?title=Gliders_by_the_dozen\r
x = 5, y = 3, rule = 23/3\r
2o2bo$o3bo$o2b2o!`,fr=`#N Glider loop\r
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
o5bo35b$26bobo3b2o2bo36b$27bo5b3o37b$27bo!`,mr=`#N Laputa\r
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
`,Zt={bigglider:rr,candelabra:ar,climber131c31:ur,eheptomino:sr,gardenofeden5x45:cr,glider:lr,glidersbythedozen:dr,gliderLoop:fr,laputa:mr},En=e=>{if(!Zt[e])throw new Error(`Invalid configuration name ${e}`);return ir(Zt[e])},hr=["VERTEX_SHADER","FRAGMENT_SHADER"];function br(){const e=document.getElementById("canvas");if(!e)throw"canvas undefined";const o=e.getContext("webgl");if(!o)throw"gl undefined";return pr(o),o}function pr(e){if(!e.getExtension("OES_texture_float"))throw alert("Need OES_texture_float"),"Need OES_texture_float";if(!e.getExtension("WEBGL_color_buffer_float"))throw alert("Need WEBGL_color_buffer_float"),"Need WEBGL_color_buffer_float";if(e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS)<1)throw alert("Can not use textures in vertex shaders"),"Can not use textures in vertex shaders"}function An(e,o,n,i){const a=e.createTexture();if(!a)throw"Can not create texture";return e.bindTexture(e.TEXTURE_2D,a),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,n,i,0,e.RGBA,e.FLOAT,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),a}function jt(e,o){const n=e.createFramebuffer();if(!n)throw"Can not create frame buffer";return e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,o,0),n}function Rn(e,o,n,i,a){const r=[];for(let u=0;u<o.length;++u){const s=hr[u]==="VERTEX_SHADER"?e.VERTEX_SHADER:e.FRAGMENT_SHADER,c=xr(e,o[u],s,a);if(!c)throw"Can not create shader";r.push(c)}const t=vr(e,r,n,i,a);if(!t)throw"Can not create program";return t}function xr(e,o,n,i){const a=i||console.log,r=e.createShader(n);if(!r)throw"Could not load shader";if(e.shaderSource(r,o),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS)){const u=e.getShaderInfoLog(r);return a(new Error("*** Error compiling shader '"+r+"':"+u+`
`+o.split(`
`).map((s,c)=>`${c+1}: ${s}`).join(`
`))),e.deleteShader(r),null}return r}function vr(e,o,n,i,a){const r=a||console.log,t=e.createProgram();if(!t)throw"Could not create program";if(o.forEach(function(s){e.attachShader(t,s)}),n&&n.forEach(function(s,c){e.bindAttribLocation(t,i?i[c]:c,s)}),e.linkProgram(t),!e.getProgramParameter(t,e.LINK_STATUS)){const s=e.getProgramInfoLog(t);return r("Error in program linking:"+s),e.deleteProgram(t),null}return t}function _r(e,o){o=o||1;const n=e.clientWidth*o|0,i=e.clientHeight*o|0;return e.width!==n||e.height!==i?(e.width=n,e.height=i,!0):!1}function Dn(e,o){const{worldDimensions:n,initialDensity:i,configuration:a}=o;let r=i;r>1&&(r=1);const t=n.width*n.height;let u=new Array(t).fill(0);return a==="random"?u=u.map(c=>Math.random()<r?1:0):a!=="empty"&&(u=Tr({cells:u,insertPosition:{x:Math.floor(n.width/2),y:Math.floor(n.height/2)},worldDimensions:n,configurationName:a})),{cellsTex:An(e,new Float32Array(u.map((c,l)=>[c,l,0,0]).flat()),n.width,n.height)}}const Tr=e=>{const{cells:o,insertPosition:n,worldDimensions:i,configurationName:a}=e,r=En(a);if(i.width<r.width||i.height<r.height)throw new Error("World is too small for this configuration");if(n.x+r.width>i.width||n.y+r.height>i.height)throw new Error("Configuration can be imported at this point");for(let t=0;t<r.height;t++)for(let u=0;u<r.width;u++){const s=(n.y+t)*i.width+(n.x+u);o[s]=r.pattern[t][u]}return o},gr=` attribute vec2 aPosition;

 void main() {
   gl_Position = vec4(aPosition, 0.0, 1.0);
 }
`,wr=`precision highp float;

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
`;let be,pe,ct,Do,nt,Jt,Qt,_o,Uo;const $n=(e,o)=>{const{cellsTex:n,texDimensions:i}=o;return pe=Rn(e,[gr,wr]),be={uInputTextureLocation:e.getUniformLocation(pe,"uInputTexture"),uTextureSizeLocation:e.getUniformLocation(pe,"uTextureSize"),uMouseCoordinatesLocation:e.getUniformLocation(pe,"uMouseCoordinates"),uMouseModeLocation:e.getUniformLocation(pe,"uMouseMode"),uInfiniteSourceLocation:e.getUniformLocation(pe,"uInfiniteSource"),uIterationLocation:e.getUniformLocation(pe,"uIteration"),uPauseLocation:e.getUniformLocation(pe,"uPause"),positionLocation:e.getAttribLocation(pe,"aPosition")},ct=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,ct),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW),Do=n,nt=An(e,null,i.width,i.height),Jt=jt(e,Do),Qt=jt(e,nt),_o={fb:Jt,tex:Do},Uo={fb:Qt,tex:nt},Do},Er=e=>{const{gl:o,worldDimensions:n,screenDimensions:i,mouseCoordinates:a,mouseMode:r,infiniteSource:t,iteration:u,pause:s}=e;o.bindFramebuffer(o.FRAMEBUFFER,Uo.fb),o.viewport(0,0,i.width,i.height),o.bindBuffer(o.ARRAY_BUFFER,ct),o.enableVertexAttribArray(be.positionLocation),o.vertexAttribPointer(be.positionLocation,2,o.FLOAT,!1,0,0),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,_o.tex),o.useProgram(pe),o.uniform1i(be.uInputTextureLocation,0),o.uniform2f(be.uTextureSizeLocation,n.width,n.height),o.uniform2f(be.uMouseCoordinatesLocation,a.x,a.y),o.uniform1i(be.uMouseModeLocation,r),o.uniform1i(be.uInfiniteSourceLocation,t?1:0),o.uniform1f(be.uIterationLocation,u),o.uniform1i(be.uPauseLocation,s?1:0),o.drawArrays(o.TRIANGLES,0,6);{const c=_o;_o=Uo,Uo=c}return _o.tex},Ar=`precision mediump float;
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
`,Rr=`precision mediump float;
uniform sampler2D u_texture;
uniform float u_zoom;
uniform vec2 u_pan;

varying vec2 v_texcoord;

void main() {
    vec2 texCoord = (v_texcoord / u_zoom) + u_pan;

    float alive = texture2D(u_texture, texCoord).x;
    gl_FragColor = vec4(alive, alive, alive, 1.0);
}
`,Dr=`precision mediump float;
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

`,$r=`precision mediump float;
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

`;let Oe,ke,Mo;const Cn=(e,o)=>{const{screenDimensions:n,mode:i}=o,{height:a,width:r}=n;let t=Rr;if(i==="gradiant"?t=Dr:i==="age_gradiant"&&(t=$r),ke=Rn(e,[Ar,t]),Oe={positionLocation:e.getAttribLocation(ke,"a_position"),textureLocation:e.getUniformLocation(ke,"u_texture"),worldSizeLocation:e.getUniformLocation(ke,"u_worldSize"),zoomLocation:e.getUniformLocation(ke,"u_zoom"),panLocation:e.getUniformLocation(ke,"u_pan"),iterationLocation:e.getUniformLocation(ke,"u_iteration")},Mo=e.createBuffer(),!Mo)throw new Error("cant create buffer");e.bindBuffer(e.ARRAY_BUFFER,Mo),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,0,a,r,0,r,0,0,a,r,a]),e.STATIC_DRAW)},Cr=e=>{const{gl:o,cellsTex:n,worldDimensions:i,zoomLevel:a,pan:r,iteration:t}=e;o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindTexture(o.TEXTURE_2D,n),o.useProgram(ke),o.bindBuffer(o.ARRAY_BUFFER,Mo),o.enableVertexAttribArray(Oe.positionLocation),o.vertexAttribPointer(Oe.positionLocation,2,o.FLOAT,!1,0,0),o.uniform1i(Oe.textureLocation,0),o.uniform2f(Oe.worldSizeLocation,i.width,i.height),o.uniform1f(Oe.zoomLocation,Math.max(a,1)),o.uniform2f(Oe.panLocation,r.x,r.y),o.uniform1f(Oe.iterationLocation,t),o.drawArrays(o.TRIANGLES,0,6)};let ge,Wo;function Lr(e){const{drawMode:o,initialDensity:n,screenDimensions:i,worldDimensions:a}=e;ge=br(),_r(ge.canvas);const r=Dn(ge,{configuration:"random",worldDimensions:a,initialDensity:n});Wo=$n(ge,{cellsTex:r.cellsTex,texDimensions:a}),Cn(ge,{screenDimensions:i,mode:o})}function Sr(e){const{infiniteSource:o,iteration:n,mouseCoordinates:i,mouseMode:a,pause:r,pan:t,screenDimensions:u,worldDimensions:s,zoomLevel:c}=e;Wo=Er({gl:ge,worldDimensions:s,screenDimensions:u,mouseCoordinates:i,mouseMode:a,infiniteSource:o,iteration:n,pause:r}),Cr({gl:ge,cellsTex:Wo,worldDimensions:s,zoomLevel:c,pan:t,iteration:n})}const yr=e=>{const{worldDimensions:o,configuration:n,initialDensity:i}=e,a=Dn(ge,{configuration:n,worldDimensions:o,initialDensity:i});Wo=$n(ge,{cellsTex:a.cellsTex,texDimensions:o})},Fr=e=>{Cn(ge,{screenDimensions:e.screenDimensions,mode:e.drawMode})};function zr(e){let o;return{c(){o=T("canvas"),this.h()},l(n){o=g(n,"CANVAS",{id:!0,style:!0,width:!0,height:!0,class:!0}),D(o).forEach(p),this.h()},h(){_(o,"id","canvas"),so(o,"background-color","black"),_(o,"width",e[0].width),_(o,"height",e[0].height),_(o,"class","svelte-1b0ol19")},m(n,i){y(n,o,i)},p:k,i:k,o:k,d(n){n&&p(o)}}}function Ir(e){const o={x:0,y:0};let n=0,i,a=0;const r={width:window.innerWidth-50,height:window.innerHeight-10},t={program:{pause:!0,infiniteSource:!1,drawMode:"age_gradiant",reloadProgram:()=>h()},simulation:{iteration:0,timeInSeconds:0,fps:0},grid:{configName:"random",initialDensity:.5,worldWidth:r.width,worldHeight:r.height,nbCells:(r.width*r.height).toString()},zoom:{x:0,y:0,xController:null,yController:null,level:1,previousLevel:1}};let u;const s=async()=>{const f=await ko(()=>import("../../../chunks/dat.gui.module-69d90d27.js"),[],import.meta.url);u=new f.GUI,u.domElement.setAttribute("style","background-color: black");const d=u.addFolder("Program");d.open(),d.add(t.program,"pause").name("Pause").listen(),d.add(t.program,"infiniteSource").name("Infinite Source").listen(),d.add(t.program,"drawMode",{White:"white","Age Gradiant":"age_gradiant","Position Gradiant":"gradiant"}).name("Drawing mode").onFinishChange(()=>Fr({screenDimensions:r,drawMode:t.program.drawMode})),d.add(t.program,"reloadProgram").name("Reload program");const b=u.addFolder("Simulation");b.open(),b.add(t.simulation,"timeInSeconds").name("Time (s)").listen(),b.add(t.simulation,"iteration").name("Iteration").listen(),b.add(t.simulation,"fps").listen();const x=u.addFolder("Grid");x.open(),x.add(t.grid,"configName",{Random:"random",Empty:"empty","131c31 Climber":"climber131c31","Big Glider":"bigglider",Candelabra:"candelabra","E-heptomino":"eheptomino","Garden of Eden 5x45":"gardenofeden5x45",Glider:"glider","Glider by the dozen":"glidersbythedozen","Glider loop":"gliderLoop",Laputa:"laputa"}).name("Configuration").onFinishChange(()=>v(t.grid.configName)),x.add(t.grid,"initialDensity",0,1,.01).name("Initial density").onFinishChange(()=>v("random")),x.add(t.grid,"worldWidth",1,r.width,1).name("World width").onFinishChange(()=>{t.grid.nbCells=(t.grid.worldHeight*t.grid.worldWidth).toString(),v("random")}),x.add(t.grid,"worldHeight",1,r.height,1).name("World height").onFinishChange(()=>{t.grid.nbCells=(t.grid.worldHeight*t.grid.worldWidth).toString(),v("random")}),x.add(t.grid,"nbCells").name("Cells count").listen();const $=u.addFolder("Zoom");$.open(),$.add(t.zoom,"level",1,10).name("Level").onChange(function(C){const O=C-t.zoom.previousLevel;if(!t.zoom.xController||!t.zoom.yController||O===0)return;const K=1-1/t.zoom.previousLevel,z=1-1/C;t.zoom.xController.max(z),t.zoom.xController.min(0),t.zoom.yController.max(z),t.zoom.yController.min(0);const M={x:t.zoom.x/K,y:t.zoom.y/K};t.zoom.x=z*M.x||z/2,t.zoom.y=z*M.y||z/2,t.zoom.previousLevel=C}),t.zoom.xController=$.add(t.zoom,"x",0,0,.01).name("X offset").listen(),t.zoom.yController=$.add(t.zoom,"y",0,0,.01).name("Y offset").listen()},c=()=>{document.addEventListener("keydown",d=>{if(d.code==="Space"&&(t.program.pause=!t.program.pause,d.preventDefault()),d.code==="KeyR"){v("random");return}if(d.code==="KeyE"){v("empty");return}if(d.code==="KeyS"){t.program.infiniteSource=!t.program.infiniteSource;return}});const f=document.getElementById("canvas");if(!f)throw new Error("Canvas unavailable");f.addEventListener("mousemove",d=>{const b=f.getBoundingClientRect(),x=f.width/b.width,$=f.height/b.height,C={x:(d.clientX-b.left)*x,y:(d.clientY-b.top)*$};o.x=C.x/r.width,o.y=C.y/r.height}),setInterval(()=>{o.x<.1&&t.zoom.x>=.005&&(t.zoom.x-=.005),o.x>.9&&t.zoom.x<1-1/t.zoom.level&&(t.zoom.x+=.005),o.y<.1&&t.zoom.y>=.005&&(t.zoom.y-=.005),o.y>.9&&t.zoom.y<1-1/t.zoom.level&&(t.zoom.y+=.005)},50),f.addEventListener("mousedown",d=>{d.preventDefault(),d.button===0?n=1:d.button===2&&(n=2)}),f.addEventListener("mouseup",d=>{d.preventDefault(),n=0}),f.addEventListener("contextmenu",d=>(d.preventDefault(),!1))};let l;const h=()=>{Lr({initialDensity:t.grid.initialDensity,worldDimensions:{width:t.grid.worldWidth,height:t.grid.worldHeight},screenDimensions:r,drawMode:t.program.drawMode}),cancelAnimationFrame(l),i=Date.now()/1e3,R()},R=()=>{const f=Date.now()/1e3,d=f-a;a=f,t.simulation.fps=1/d,t.program.pause||(t.simulation.timeInSeconds=f-i,t.simulation.iteration++),Sr({infiniteSource:t.program.infiniteSource,iteration:t.simulation.iteration,mouseCoordinates:o,mouseMode:n,pause:t.program.pause,pan:{x:t.zoom.x,y:t.zoom.y},screenDimensions:r,worldDimensions:{width:t.grid.worldWidth,height:t.grid.worldHeight},zoomLevel:t.zoom.level}),l=requestAnimationFrame(R)},v=f=>{t.simulation.iteration=0,t.simulation.timeInSeconds=0,yr({initialDensity:t.grid.initialDensity,worldDimensions:{width:t.grid.worldWidth,height:t.grid.worldHeight},configuration:f})};return co(()=>{s(),c(),h()}),Oo(()=>{u.destroy()}),[r]}let Pr=class extends Ve{constructor(o){super(),Ye(this,o,Ir,zr,Ke,{})}};const Ur=["VERTEX_SHADER","FRAGMENT_SHADER"];function Mr(){const e=document.getElementById("canvas");if(!e)throw"canvas undefined";const o=e.getContext("webgl");if(!o)throw"gl undefined";return Br(o),o}function Br(e){if(!e.getExtension("OES_texture_float"))throw alert("Need OES_texture_float"),"Need OES_texture_float";if(!e.getExtension("WEBGL_color_buffer_float"))throw alert("Need WEBGL_color_buffer_float"),"Need WEBGL_color_buffer_float";if(e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS)<1)throw alert("Can not use textures in vertex shaders"),"Can not use textures in vertex shaders"}function xt(e,o,n,i){const a=e.createTexture();if(!a)throw"Can not create texture";return e.bindTexture(e.TEXTURE_2D,a),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,n,i,0,e.RGBA,e.FLOAT,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),a}function lt(e,o){const n=e.createFramebuffer();if(!n)throw"Can not create frame buffer";return e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,o,0),n}function vt(e,o,n,i,a){const r=[];for(let u=0;u<o.length;++u){const s=Ur[u]==="VERTEX_SHADER"?e.VERTEX_SHADER:e.FRAGMENT_SHADER,c=Nr(e,o[u],s,a);if(!c)throw"Can not create shader";r.push(c)}const t=Gr(e,r,n,i,a);if(!t)throw"Can not create program";return t}function Nr(e,o,n,i){const a=i||console.log,r=e.createShader(n);if(!r)throw"Could not load shader";if(e.shaderSource(r,o),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS)){const u=e.getShaderInfoLog(r);return a(new Error("*** Error compiling shader '"+r+"':"+u+`
`+o.split(`
`).map((s,c)=>`${c+1}: ${s}`).join(`
`))),e.deleteShader(r),null}return r}function Gr(e,o,n,i,a){const r=a||console.log,t=e.createProgram();if(!t)throw"Could not create program";if(o.forEach(function(s){e.attachShader(t,s)}),n&&n.forEach(function(s,c){e.bindAttribLocation(t,i?i[c]:c,s)}),e.linkProgram(t),!e.getProgramParameter(t,e.LINK_STATUS)){const s=e.getProgramInfoLog(t);return r("Error in program linking:"+s),e.deleteProgram(t),null}return t}function Wr(e,o){o=o||1;const n=e.clientWidth*o|0,i=e.clientHeight*o|0;return e.width!==n||e.height!==i?(e.width=n,e.height=i,!0):!1}function Ln(e,o){const{worldDimensions:n,initialDensity:i,configuration:a}=o;let r=i;r>1&&(r=1);const t=n.width*n.height;let u=new Array(t).fill(0);return a==="random"?u=u.map(c=>Math.random()<r?1:0):a!=="empty"&&(u=Xr({cells:u,insertPosition:{x:Math.floor(n.width/2),y:Math.floor(n.height/2)},worldDimensions:n,configurationName:a})),{cellsTex:xt(e,new Float32Array(u.map((c,l)=>[c,l,0,0]).flat()),n.width,n.height)}}const Xr=e=>{const{cells:o,insertPosition:n,worldDimensions:i,configurationName:a}=e,r=En(a);if(i.width<r.width||i.height<r.height)throw new Error("World is too small for this configuration");if(n.x+r.width>i.width||n.y+r.height>i.height)throw new Error("Configuration can be imported at this point");for(let t=0;t<r.height;t++)for(let u=0;u<r.width;u++){const s=(n.y+t)*i.width+(n.x+u);o[s]=r.pattern[t][u]}return o},Or=` attribute vec2 aPosition;

 void main() {
   gl_Position = vec4(aPosition, 0.0, 1.0);
 }
`,kr=`precision highp float;

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
`;let xe,ve,dt,$o,it,en,on,To,Bo;const Sn=(e,o)=>{const{cellsTex:n,texDimensions:i}=o;return ve=vt(e,[Or,kr]),xe={uInputTextureLocation:e.getUniformLocation(ve,"uInputTexture"),uTextureSizeLocation:e.getUniformLocation(ve,"uTextureSize"),uMouseCoordinatesLocation:e.getUniformLocation(ve,"uMouseCoordinates"),uMouseModeLocation:e.getUniformLocation(ve,"uMouseMode"),uInfiniteSourceLocation:e.getUniformLocation(ve,"uInfiniteSource"),uIterationLocation:e.getUniformLocation(ve,"uIteration"),uPauseLocation:e.getUniformLocation(ve,"uPause"),positionLocation:e.getAttribLocation(ve,"aPosition")},dt=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,dt),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW),$o=n,it=xt(e,null,i.width,i.height),en=lt(e,$o),on=lt(e,it),To={fb:en,tex:$o},Bo={fb:on,tex:it},$o},Hr=e=>{const{gl:o,worldDimensions:n,screenDimensions:i,mouseCoordinates:a,mouseMode:r,infiniteSource:t,iteration:u,pause:s}=e;o.bindFramebuffer(o.FRAMEBUFFER,Bo.fb),o.viewport(0,0,i.width,i.height),o.bindBuffer(o.ARRAY_BUFFER,dt),o.enableVertexAttribArray(xe.positionLocation),o.vertexAttribPointer(xe.positionLocation,2,o.FLOAT,!1,0,0),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,To.tex),o.useProgram(ve),o.uniform1i(xe.uInputTextureLocation,0),o.uniform2f(xe.uTextureSizeLocation,n.width,n.height),o.uniform2f(xe.uMouseCoordinatesLocation,a.x,a.y),o.uniform1i(xe.uMouseModeLocation,r),o.uniform1i(xe.uInfiniteSourceLocation,t?1:0),o.uniform1f(xe.uIterationLocation,u),o.uniform1i(xe.uPauseLocation,s?1:0),o.drawArrays(o.TRIANGLES,0,6);{const c=To;To=Bo,Bo=c}return To.tex},Vr=`precision mediump float;
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
`,Yr=`precision mediump float;
uniform sampler2D u_texture;

varying vec2 v_texcoord;

void main() {
    vec2 texCoord = v_texcoord;

    float alive = texture2D(u_texture, texCoord).x;
    gl_FragColor = vec4(alive, alive, alive, 1.0);
}
`,Kr=`precision mediump float;
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

`,qr=`precision mediump float;
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

`;let io,ro,ft,mt,yn;const Fn=(e,o)=>{const{screenDimensions:n,mode:i}=o,{height:a,width:r}=n;let t=Yr;i==="gradiant"?t=Kr:i==="age_gradiant"&&(t=qr),ro=vt(e,[Vr,t]),io={positionLocation:e.getAttribLocation(ro,"a_position"),textureLocation:e.getUniformLocation(ro,"u_texture"),worldSizeLocation:e.getUniformLocation(ro,"u_worldSize"),iterationLocation:e.getUniformLocation(ro,"u_iteration")},ft=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,ft),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,0,a,r,0,r,0,0,a,r,a]),e.STATIC_DRAW),mt=xt(e,null,n.width,n.height),yn=lt(e,mt)},Zr=e=>{const{gl:o,cellsTex:n,worldDimensions:i,screenDimensions:a,iteration:r}=e;return o.bindFramebuffer(o.FRAMEBUFFER,yn),o.viewport(0,0,a.width,a.height),o.bindTexture(o.TEXTURE_2D,n),o.useProgram(ro),o.bindBuffer(o.ARRAY_BUFFER,ft),o.enableVertexAttribArray(io.positionLocation),o.vertexAttribPointer(io.positionLocation,2,o.FLOAT,!1,0,0),o.uniform1i(io.textureLocation,0),o.uniform2f(io.worldSizeLocation,i.width,i.height),o.uniform1f(io.iterationLocation,r),o.drawArrays(o.TRIANGLES,0,6),mt},jr=`attribute vec2 a_position;

varying vec2 uv;

void main() {
    // Convert the position from pixels to normalized space (-1 to +1)
    vec2 zeroToTwo = a_position * 2.0;
    vec2 clipSpace = zeroToTwo - 1.0;

    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

    // Pass the texture coordinate to the fragment shader
    uv = a_position;
}
`,Jr=`precision mediump float;

uniform sampler2D u_texture;
uniform float u_zoom;
uniform vec2 u_zoomPoint;

varying vec2 uv;

void main() {
    vec2 new_uv = (uv + u_zoomPoint * u_zoom) * (1.0 / u_zoom);
    gl_FragColor = texture2D(u_texture, new_uv);
}
`;let ao,uo,ht;const Qr=(e,o)=>{const{screenDimensions:n}=o,{height:i,width:a}=n;uo=vt(e,[jr,Jr]),ao={positionLocation:e.getAttribLocation(uo,"a_position"),textureLocation:e.getUniformLocation(uo,"u_texture"),zoomLocation:e.getUniformLocation(uo,"u_zoom"),zoomPointLocation:e.getUniformLocation(uo,"u_zoomPoint")},ht=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,ht),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,0,i,a,0,a,0,0,i,a,i]),e.STATIC_DRAW)},ea=e=>{const{gl:o,screenTex:n,zoom:i,zoomPoint:a}=e;o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindTexture(o.TEXTURE_2D,n),o.useProgram(uo),o.bindBuffer(o.ARRAY_BUFFER,ht),o.enableVertexAttribArray(ao.positionLocation),o.vertexAttribPointer(ao.positionLocation,2,o.FLOAT,!1,0,0),o.uniform1i(ao.textureLocation,0),o.uniform1f(ao.zoomLocation,i),o.uniform2f(ao.zoomPointLocation,a.x,a.y),o.drawArrays(o.TRIANGLES,0,6)};let te,Xo;function oa(e){const{drawMode:o,initialDensity:n,screenDimensions:i,worldDimensions:a}=e;te=Mr(),Wr(te.canvas);const r=Ln(te,{configuration:"random",worldDimensions:a,initialDensity:n});Xo=Sn(te,{cellsTex:r.cellsTex,texDimensions:a}),Fn(te,{screenDimensions:i,mode:o}),Qr(te,{screenDimensions:i})}function ta(e){const{infiniteSource:o,iteration:n,mouseCoordinates:i,mouseMode:a,pause:r,screenDimensions:t,worldDimensions:u,zoom:s,zoomPoint:c}=e;Xo=Hr({gl:te,worldDimensions:u,screenDimensions:t,mouseCoordinates:i,mouseMode:a,infiniteSource:o,iteration:n,pause:r});const l=Zr({gl:te,cellsTex:Xo,worldDimensions:u,screenDimensions:t,iteration:n});ea({gl:te,screenTex:l,worldDimensions:u,zoom:s,zoomPoint:c})}const na=e=>{const{worldDimensions:o,configuration:n,initialDensity:i}=e,a=Ln(te,{configuration:n,worldDimensions:o,initialDensity:i});Xo=Sn(te,{cellsTex:a.cellsTex,texDimensions:o})},ia=e=>{Fn(te,{screenDimensions:e.screenDimensions,mode:e.drawMode})};function ra(e){let o;return{c(){o=T("canvas"),this.h()},l(n){o=g(n,"CANVAS",{id:!0,style:!0,width:!0,height:!0,class:!0}),D(o).forEach(p),this.h()},h(){_(o,"id","canvas"),so(o,"background-color","black"),_(o,"width",e[0].width),_(o,"height",e[0].height),_(o,"class","svelte-1b0ol19")},m(n,i){y(n,o,i)},p:k,i:k,o:k,d(n){n&&p(o)}}}function aa(e){const o={x:0,y:0};let n=0,i,a=0;const r={width:window.innerWidth-50,height:window.innerHeight-10},t={program:{pause:!1,infiniteSource:!1,drawMode:"age_gradiant",reloadProgram:()=>h()},simulation:{iteration:0,timeInSeconds:0,fps:0},grid:{configName:"random",initialDensity:.5,worldWidth:r.width,worldHeight:r.height,nbCells:(r.width*r.height).toString()},zoom:{x:0,y:0,xController:null,yController:null,level:1,previousLevel:1}};let u;const s=async()=>{const f=await ko(()=>import("../../../chunks/dat.gui.module-69d90d27.js"),[],import.meta.url);u=new f.GUI,u.domElement.setAttribute("style","background-color: black");const d=u.addFolder("Program");d.open(),d.add(t.program,"pause").name("Pause").listen(),d.add(t.program,"infiniteSource").name("Infinite Source").listen(),d.add(t.program,"drawMode",{White:"white","Age Gradiant":"age_gradiant","Position Gradiant":"gradiant"}).name("Drawing mode").onFinishChange(()=>ia({screenDimensions:r,drawMode:t.program.drawMode})),d.add(t.program,"reloadProgram").name("Reload program");const b=u.addFolder("Simulation");b.open(),b.add(t.simulation,"timeInSeconds").name("Time (s)").listen(),b.add(t.simulation,"iteration").name("Iteration").listen(),b.add(t.simulation,"fps").listen();const x=u.addFolder("Grid");x.open(),x.add(t.grid,"configName",{Random:"random",Empty:"empty","131c31 Climber":"climber131c31","Big Glider":"bigglider",Candelabra:"candelabra","E-heptomino":"eheptomino","Garden of Eden 5x45":"gardenofeden5x45",Glider:"glider","Glider by the dozen":"glidersbythedozen","Glider loop":"gliderLoop",Laputa:"laputa"}).name("Configuration").onFinishChange(()=>v(t.grid.configName)),x.add(t.grid,"initialDensity",0,1,.01).name("Initial density").onFinishChange(()=>v("random")),x.add(t.grid,"worldWidth",1,r.width,1).name("World width").onFinishChange(()=>{t.grid.nbCells=(t.grid.worldHeight*t.grid.worldWidth).toString(),v("random")}),x.add(t.grid,"worldHeight",1,r.height,1).name("World height").onFinishChange(()=>{t.grid.nbCells=(t.grid.worldHeight*t.grid.worldWidth).toString(),v("random")}),x.add(t.grid,"nbCells").name("Cells count").listen();const $=u.addFolder("Zoom");$.open(),$.add(t.zoom,"level",1,50,.1).name("Level"),$.add(t.zoom,"x",0,1,.01).name("X offset").listen(),$.add(t.zoom,"y",0,1,.01).name("Y offset").listen()},c=()=>{document.addEventListener("keydown",d=>{if(d.code==="Space"&&(t.program.pause=!t.program.pause,d.preventDefault()),d.code==="KeyR"){v("random");return}if(d.code==="KeyE"){v("empty");return}if(d.code==="KeyS"){t.program.infiniteSource=!t.program.infiniteSource;return}});const f=document.getElementById("canvas");if(!f)throw new Error("Canvas unavailable");f.addEventListener("mousemove",d=>{const b=f.getBoundingClientRect(),x=f.width/b.width,$=f.height/b.height,C={x:(d.clientX-b.left)*x,y:(d.clientY-b.top)*$};o.x=C.x/r.width,o.y=1-C.y/r.height}),f.addEventListener("mousedown",d=>{d.preventDefault(),d.button===0?n=1:d.button===2&&(n=2)}),f.addEventListener("mouseup",d=>{d.preventDefault(),n=0}),f.addEventListener("contextmenu",d=>(d.preventDefault(),!1))};let l;const h=()=>{oa({initialDensity:t.grid.initialDensity,worldDimensions:{width:t.grid.worldWidth,height:t.grid.worldHeight},screenDimensions:r,drawMode:t.program.drawMode}),cancelAnimationFrame(l),i=Date.now()/1e3,R()},R=()=>{const f=Date.now()/1e3,d=f-a;a=f,t.simulation.fps=1/d,t.program.pause||(t.simulation.timeInSeconds=f-i,t.simulation.iteration++),ta({infiniteSource:t.program.infiniteSource,iteration:t.simulation.iteration,mouseCoordinates:o,mouseMode:n,pause:t.program.pause,screenDimensions:r,worldDimensions:{width:t.grid.worldWidth,height:t.grid.worldHeight},zoom:t.zoom.level,zoomPoint:{x:t.zoom.x,y:t.zoom.y}}),l=requestAnimationFrame(R)},v=f=>{t.simulation.iteration=0,t.simulation.timeInSeconds=0,na({initialDensity:t.grid.initialDensity,worldDimensions:{width:t.grid.worldWidth,height:t.grid.worldHeight},configuration:f})};return co(()=>{s(),c(),h()}),Oo(()=>{u.destroy()}),[r]}class ua extends Ve{constructor(o){super(),Ye(this,o,aa,ra,Ke,{})}}function tn(e,o,n){const i=e.slice();return i[1]=o[n],i}function nn(e,o,n){const i=e.slice();return i[1]=o[n],i}function sa(e){let o;return{c(){o=E("About")},l(n){o=A(n,"About")},m(n,i){y(n,o,i)},d(n){n&&p(o)}}}function ca(e){let o=e[1].title+"",n;return{c(){n=E(o)},l(i){n=A(i,o)},m(i,a){y(i,n,a)},p:k,d(i){i&&p(n)}}}function rn(e){let o,n;return o=new dn({props:{$$slots:{default:[ca]},$$scope:{ctx:e}}}),{c(){Se(o.$$.fragment)},l(i){He(o.$$.fragment,i)},m(i,a){ye(o,i,a),n=!0},p(i,a){const r={};a&64&&(r.$$scope={dirty:a,ctx:i}),o.$set(r)},i(i){n||(q(o.$$.fragment,i),n=!0)},o(i){Q(o.$$.fragment,i),n=!1},d(i){Fe(o,i)}}}function la(e){let o,n,i,a;o=new dn({props:{$$slots:{default:[sa]},$$scope:{ctx:e}}});let r=e[0],t=[];for(let s=0;s<r.length;s+=1)t[s]=rn(nn(e,r,s));const u=s=>Q(t[s],1,1,()=>{t[s]=null});return{c(){Se(o.$$.fragment),n=L();for(let s=0;s<t.length;s+=1)t[s].c();i=No()},l(s){He(o.$$.fragment,s),n=S(s);for(let c=0;c<t.length;c+=1)t[c].l(s);i=No()},m(s,c){ye(o,s,c),y(s,n,c);for(let l=0;l<t.length;l+=1)t[l].m(s,c);y(s,i,c),a=!0},p(s,c){const l={};if(c&64&&(l.$$scope={dirty:c,ctx:s}),o.$set(l),c&1){r=s[0];let h;for(h=0;h<r.length;h+=1){const R=nn(s,r,h);t[h]?(t[h].p(R,c),q(t[h],1)):(t[h]=rn(R),t[h].c(),q(t[h],1),t[h].m(i.parentNode,i))}for(bt(),h=r.length;h<t.length;h+=1)u(h);pt()}},i(s){if(!a){q(o.$$.fragment,s);for(let c=0;c<r.length;c+=1)q(t[c]);a=!0}},o(s){Q(o.$$.fragment,s),t=t.filter(Boolean);for(let c=0;c<t.length;c+=1)Q(t[c]);a=!1},d(s){Fe(o,s),s&&p(n),cn(t,s),s&&p(i)}}}function da(e){let o,n,i,a,r,t,u;return{c(){o=T("p"),n=E("Experiments running Conway's Game of Life in WebGL shaders."),i=L(),a=T("p"),r=E("List of patterns available "),t=T("a"),u=E("in the wiki"),this.h()},l(s){o=g(s,"P",{});var c=D(o);n=A(c,"Experiments running Conway's Game of Life in WebGL shaders."),c.forEach(p),i=S(s),a=g(s,"P",{});var l=D(a);r=A(l,"List of patterns available "),t=g(l,"A",{target:!0,href:!0});var h=D(t);u=A(h,"in the wiki"),h.forEach(p),l.forEach(p),this.h()},h(){_(t,"target","none"),_(t,"href","https://conwaylife.com/wiki/Category:Patterns")},m(s,c){y(s,o,c),m(o,n),y(s,i,c),y(s,a,c),m(a,r),m(a,t),m(t,u)},p:k,d(s){s&&p(o),s&&p(i),s&&p(a)}}}function fa(e){let o,n,i;var a=e[1].component;function r(t){return{}}return a&&(o=St(a,r())),{c(){o&&Se(o.$$.fragment),n=L()},l(t){o&&He(o.$$.fragment,t),n=S(t)},m(t,u){o&&ye(o,t,u),y(t,n,u),i=!0},p(t,u){if(a!==(a=t[1].component)){if(o){bt();const s=o;Q(s.$$.fragment,1,0,()=>{Fe(s,1)}),pt()}a?(o=St(a,r()),Se(o.$$.fragment),q(o.$$.fragment,1),ye(o,n.parentNode,n)):o=null}},i(t){i||(o&&q(o.$$.fragment,t),i=!0)},o(t){o&&Q(o.$$.fragment,t),i=!1},d(t){o&&Fe(o,t),t&&p(n)}}}function an(e){let o,n;return o=new ln({props:{$$slots:{default:[fa]},$$scope:{ctx:e}}}),{c(){Se(o.$$.fragment)},l(i){He(o.$$.fragment,i)},m(i,a){ye(o,i,a),n=!0},p(i,a){const r={};a&64&&(r.$$scope={dirty:a,ctx:i}),o.$set(r)},i(i){n||(q(o.$$.fragment,i),n=!0)},o(i){Q(o.$$.fragment,i),n=!1},d(i){Fe(o,i)}}}function ma(e){let o,n,i,a,r,t;o=new In({props:{$$slots:{default:[la]},$$scope:{ctx:e}}}),i=new ln({props:{$$slots:{default:[da]},$$scope:{ctx:e}}});let u=e[0],s=[];for(let l=0;l<u.length;l+=1)s[l]=an(tn(e,u,l));const c=l=>Q(s[l],1,1,()=>{s[l]=null});return{c(){Se(o.$$.fragment),n=L(),Se(i.$$.fragment),a=L();for(let l=0;l<s.length;l+=1)s[l].c();r=No()},l(l){He(o.$$.fragment,l),n=S(l),He(i.$$.fragment,l),a=S(l);for(let h=0;h<s.length;h+=1)s[h].l(l);r=No()},m(l,h){ye(o,l,h),y(l,n,h),ye(i,l,h),y(l,a,h);for(let R=0;R<s.length;R+=1)s[R].m(l,h);y(l,r,h),t=!0},p(l,h){const R={};h&64&&(R.$$scope={dirty:h,ctx:l}),o.$set(R);const v={};if(h&64&&(v.$$scope={dirty:h,ctx:l}),i.$set(v),h&1){u=l[0];let f;for(f=0;f<u.length;f+=1){const d=tn(l,u,f);s[f]?(s[f].p(d,h),q(s[f],1)):(s[f]=an(d),s[f].c(),q(s[f],1),s[f].m(r.parentNode,r))}for(bt(),f=u.length;f<s.length;f+=1)c(f);pt()}},i(l){if(!t){q(o.$$.fragment,l),q(i.$$.fragment,l);for(let h=0;h<u.length;h+=1)q(s[h]);t=!0}},o(l){Q(o.$$.fragment,l),Q(i.$$.fragment,l),s=s.filter(Boolean);for(let h=0;h<s.length;h+=1)Q(s[h]);t=!1},d(l){Fe(o,l),l&&p(n),Fe(i,l),l&&p(a),cn(s,l),l&&p(r)}}}function ha(e){let o,n,i;return n=new zn({props:{$$slots:{default:[ma]},$$scope:{ctx:e}}}),{c(){o=T("div"),Se(n.$$.fragment)},l(a){o=g(a,"DIV",{});var r=D(o);He(n.$$.fragment,r),r.forEach(p)},m(a,r){y(a,o,r),ye(n,o,null),i=!0},p(a,[r]){const t={};r&64&&(t.$$scope={dirty:r,ctx:a}),n.$set(t)},i(a){i||(q(n.$$.fragment,a),i=!0)},o(a){Q(n.$$.fragment,a),i=!1},d(a){a&&p(o),Fe(n)}}}function ba(e){return[[{title:"V6",component:ua},{title:"V5",component:Pr},{title:"V4",component:Qi},{title:"V3",component:Fi},{title:"V2",component:bi},{title:"V1",component:jn}]]}class pa extends Ve{constructor(o){super(),Ye(this,o,ba,ha,Ke,{})}}function xa(e){let o,n;return o=new pa({}),{c(){Se(o.$$.fragment)},l(i){He(o.$$.fragment,i)},m(i,a){ye(o,i,a),n=!0},p:k,i(i){n||(q(o.$$.fragment,i),n=!0)},o(i){Q(o.$$.fragment,i),n=!1},d(i){Fe(o,i)}}}class Da extends Ve{constructor(o){super(),Ye(this,o,null,xa,Ke,{})}}export{Da as default};
