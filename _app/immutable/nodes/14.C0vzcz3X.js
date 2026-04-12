import{a as G,f as Q,t as qe}from"../chunks/CDMpcfVg.js";import{i as Lt}from"../chunks/QGQlz7R1.js";import{p as nt,aH as ut,a as ot,as as m,aq as lt,at as x,au as v,ar as Et,u as T,ab as q,av as J,aa as Ut}from"../chunks/Dal5CWrr.js";import{s as j}from"../chunks/DkARLKri.js";import{e as ye,i as Ee}from"../chunks/Dbq_6Uc7.js";import{T as hn,a as Tn,b as je,c as Ke}from"../chunks/DY4w8wsu.js";import{o as ct}from"../chunks/BZ9qQCq7.js";import{d as Mt,a as Z}from"../chunks/BfzNOn7b.js";import{s as A,r as U}from"../chunks/BQoXIJNy.js";import{b as L}from"../chunks/CRRNQhAj.js";import{b as gn}from"../chunks/CgWlytsD.js";import{R as bn}from"../chunks/CRqdw40p.js";import{p as An}from"../chunks/DiWhCHgV.js";const _n=["VERTEX_SHADER","FRAGMENT_SHADER"];function zt(){const e=document.getElementById("canvas");if(!e)throw"canvas undefined";const t=e.getContext("webgl");if(!t)throw"gl undefined";return Te(t),t}function Te(e){if(!e.getExtension("OES_texture_float"))throw alert("Need OES_texture_float"),"Need OES_texture_float";if(!e.getExtension("WEBGL_color_buffer_float"))throw alert("Need WEBGL_color_buffer_float"),"Need WEBGL_color_buffer_float";if(e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS)<1)throw alert("Can not use textures in vertex shaders"),"Can not use textures in vertex shaders"}function O(e,t,o,n){const s=e.createTexture();if(!s)throw"Can not create texture";return e.bindTexture(e.TEXTURE_2D,s),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,o,n,0,e.RGBA,e.FLOAT,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),s}function et(e,t){const o=e.createFramebuffer();if(!o)throw"Can not create frame buffer";return e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),o}function V(e,t,o,n,s){const l=[];for(let c=0;c<t.length;++c){const a=_n[c]==="VERTEX_SHADER"?e.VERTEX_SHADER:e.FRAGMENT_SHADER,i=wn(e,t[c],a);if(!i)throw"Can not create shader";l.push(i)}const r=Fn(e,l);if(!r)throw"Can not create program";return r}function wn(e,t,o,n){const s=console.log,l=e.createShader(o);if(!l)throw"Could not load shader";if(e.shaderSource(l,t),e.compileShader(l),!e.getShaderParameter(l,e.COMPILE_STATUS)){const c=e.getShaderInfoLog(l);return s(new Error("*** Error compiling shader '"+l+"':"+c+`
`+t.split(`
`).map((a,i)=>`${i+1}: ${a}`).join(`
`))),e.deleteShader(l),null}return l}function Fn(e,t,o,n,s){const l=console.log,r=e.createProgram();if(!r)throw"Could not create program";if(t.forEach(function(a){e.attachShader(r,a)}),e.linkProgram(r),!e.getProgramParameter(r,e.LINK_STATUS)){const a=e.getProgramInfoLog(r);return l("Error in program linking:"+a),e.deleteProgram(r),null}return r}function C(e,t){t=t||1;const o=e.clientWidth*t|0,n=e.clientHeight*t|0;return e.width!==o||e.height!==n?(e.width=o,e.height=n,!0):!1}var Rn=Q(`<p>This is not super impressive but this page takes 9 integers and uses a compute shader to
    multiply them by two. It's a first step!</p> <p>It is reusing the code from <a target="none" href="https://webglfundamentals.org/webgl/lessons/webgl-gpgpu.html">this site</a>.</p> <ul id="result"></ul> <canvas id="canvas"></canvas>`,1);function Dn(e,t){nt(t,!1);function o(){const l=`
    attribute vec4 position;
    void main() {
      gl_Position = position;
    }
    `,r=`
    precision highp float;

    uniform sampler2D srcTex;
    uniform vec2 srcDimensions;

    void main() {
      vec2 texcoord = gl_FragCoord.xy / srcDimensions;
      vec4 value = texture2D(srcTex, texcoord);
      gl_FragColor = value * 2.0;
    }
    `,i=document.createElement("canvas");i.width=3,i.height=3;const f=i.getContext("webgl");if(!f)throw"Coulndt get context";const u=V(f,[l,r]);if(!u)throw"Could not get program";const h=f.getAttribLocation(u,"position"),p=f.getUniformLocation(u,"srcTex"),g=f.getUniformLocation(u,"srcDimensions"),w=f.createBuffer();f.bindBuffer(f.ARRAY_BUFFER,w),f.bufferData(f.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),f.STATIC_DRAW),f.enableVertexAttribArray(h),f.vertexAttribPointer(h,2,f.FLOAT,!1,0,0);const F=3,R=3,_=f.createTexture();f.bindTexture(f.TEXTURE_2D,_),f.pixelStorei(f.UNPACK_ALIGNMENT,1),f.texImage2D(f.TEXTURE_2D,0,f.LUMINANCE,F,R,0,f.LUMINANCE,f.UNSIGNED_BYTE,new Uint8Array([1,2,3,4,5,6,70,80,90])),f.texParameteri(f.TEXTURE_2D,f.TEXTURE_MIN_FILTER,f.NEAREST),f.texParameteri(f.TEXTURE_2D,f.TEXTURE_MAG_FILTER,f.NEAREST),f.texParameteri(f.TEXTURE_2D,f.TEXTURE_WRAP_S,f.CLAMP_TO_EDGE),f.texParameteri(f.TEXTURE_2D,f.TEXTURE_WRAP_T,f.CLAMP_TO_EDGE),f.useProgram(u),f.uniform1i(p,0),f.uniform2f(g,F,R),f.drawArrays(f.TRIANGLES,0,6);const D=new Uint8Array(3*3*4);f.readPixels(0,0,3,3,f.RGBA,f.UNSIGNED_BYTE,D);for(let B=0;B<3*3;++B)n(D[B*4])}function n(l){const r=document.createElement("li");r.textContent=l.toString();const c=document.getElementById("result");if(!c)throw"result element undefined";c.appendChild(r)}ct(o),Lt();var s=Rn();ut(6),G(e,s),ot()}const yn=Float32Array;function dn(e,t,o,n,s,l){const r=new yn(16);return r[0]=2/(t-e),r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[5]=2/(n-o),r[6]=0,r[7]=0,r[8]=0,r[9]=0,r[10]=2/(s-l),r[11]=0,r[12]=(e+t)/(e-t),r[13]=(o+n)/(o-n),r[14]=(s+l)/(s-l),r[15]=1,r}var En=Q('<p>This is the simple particles simulation from <a target="none" href="https://webglfundamentals.org/webgl/lessons/webgl-gpgpu.html">webglfundamentals</a> directly copied in a svelte component.</p> <canvas id="canvas" style="background-color: black" width="800" height="600"></canvas>',1);function Un(e,t){nt(t,!1);function o(){const s=`
  attribute vec4 position;
  void main() {
    gl_Position = position;
  }
  `,l=`
  precision highp float;

  uniform sampler2D positionTex;
  uniform sampler2D velocityTex;
  uniform vec2 texDimensions;
  uniform vec2 canvasDimensions;
  uniform float deltaTime;

  vec2 euclideanModulo(vec2 n, vec2 m) {
  	return mod(mod(n, m) + m, m);
  }

  void main() {
    // there will be one velocity per position
    // so the velocity texture and position texture
    // are the same size.

    // further, we're generating new positions
    // so we know our destination is the same size
    // as our source so we only need one set of 
    // shared texture dimensions

    // compute texcoord from gl_FragCoord;
    vec2 texcoord = gl_FragCoord.xy / texDimensions;
    
    vec2 position = texture2D(positionTex, texcoord).xy;
    vec2 velocity = texture2D(velocityTex, texcoord).xy;
    vec2 newPosition = euclideanModulo(position + velocity * deltaTime, canvasDimensions);

    gl_FragColor = vec4(newPosition, 0, 1);
  }
  `,r=`
  attribute float id;
  uniform sampler2D positionTex;
  uniform vec2 texDimensions;
  uniform mat4 matrix;

  vec4 getValueFrom2DTextureAs1DArray(sampler2D tex, vec2 dimensions, float index) {
    float y = floor(index / dimensions.x);
    float x = mod(index, dimensions.x);
    vec2 texcoord = (vec2(x, y) + 0.5) / dimensions;
    return texture2D(tex, texcoord);
  }

  void main() {
    // pull the position from the texture
    vec4 position = getValueFrom2DTextureAs1DArray(positionTex, texDimensions, id);

    // do the common matrix math
    gl_Position = matrix * vec4(position.xy, 0, 1);
    gl_PointSize = 10.0;
  }
  `,c=`
  precision highp float;
  void main() {
    gl_FragColor = vec4(0.4, 0.2, 0.9, 0.5);
  }
  `,a=document.getElementById("canvas");if(!a)throw"canvas undefined";const i=a.getContext("webgl");if(!i)throw"gl undefined";if(!i.getExtension("OES_texture_float"))throw alert("Need OES_texture_float"),"Need OES_texture_float";if(!i.getExtension("WEBGL_color_buffer_float"))throw alert("Need WEBGL_color_buffer_float"),"Need WEBGL_color_buffer_float";if(i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS)<1)throw alert("Can not use textures in vertex shaders"),"Can not use textures in vertex shaders";const h=V(i,[s,l]),p=V(i,[r,c]);if(!h||!p)throw"Can not create programs";const g={position:i.getAttribLocation(h,"position"),positionTex:i.getUniformLocation(h,"positionTex"),velocityTex:i.getUniformLocation(h,"velocityTex"),texDimensions:i.getUniformLocation(h,"texDimensions"),canvasDimensions:i.getUniformLocation(h,"canvasDimensions"),deltaTime:i.getUniformLocation(h,"deltaTime")},w={id:i.getAttribLocation(p,"id"),positionTex:i.getUniformLocation(p,"positionTex"),texDimensions:i.getUniformLocation(p,"texDimensions"),matrix:i.getUniformLocation(p,"matrix")},F=i.createBuffer();i.bindBuffer(i.ARRAY_BUFFER,F),i.bufferData(i.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),i.STATIC_DRAW);const R=300,_=20,D=R*_,B=new Array(D).fill(0).map((d,H)=>H),E=i.createBuffer();i.bindBuffer(i.ARRAY_BUFFER,E),i.bufferData(i.ARRAY_BUFFER,new Float32Array(B),i.STATIC_DRAW),C(i.canvas);const P=(d,H)=>(H===void 0&&(H=d,d=0),Math.random()*(H-d)+d),$=new Float32Array(B.map(d=>[P(a.width),P(a.height),0,0]).flat()),Y=new Float32Array(B.map(d=>[P(-300,300),P(-300,300),0,0]).flat());function X(d,H,y,ft){const rt=d.createTexture();return d.bindTexture(d.TEXTURE_2D,rt),d.texImage2D(d.TEXTURE_2D,0,d.RGBA,y,ft,0,d.RGBA,d.FLOAT,H),d.texParameteri(d.TEXTURE_2D,d.TEXTURE_MIN_FILTER,d.NEAREST),d.texParameteri(d.TEXTURE_2D,d.TEXTURE_MAG_FILTER,d.NEAREST),d.texParameteri(d.TEXTURE_2D,d.TEXTURE_WRAP_S,d.CLAMP_TO_EDGE),d.texParameteri(d.TEXTURE_2D,d.TEXTURE_WRAP_T,d.CLAMP_TO_EDGE),rt}const M=X(i,Y,R,_),b=X(i,$,R,_),z=X(i,null,R,_);if(!b||!z)throw"Can not create position textures";function W(d,H){const y=d.createFramebuffer();return d.bindFramebuffer(d.FRAMEBUFFER,y),d.framebufferTexture2D(d.FRAMEBUFFER,d.COLOR_ATTACHMENT0,d.TEXTURE_2D,H,0),y}const K=W(i,b),k=W(i,z);let I={fb:K,tex:b},N={fb:k,tex:z},tt=0;function it(d){if(!i)return;d*=.001;const H=d-tt;tt=d,C(i.canvas),i.bindFramebuffer(i.FRAMEBUFFER,N.fb),i.viewport(0,0,R,_),i.bindBuffer(i.ARRAY_BUFFER,F),i.enableVertexAttribArray(g.position),i.vertexAttribPointer(g.position,2,i.FLOAT,!1,0,0),i.activeTexture(i.TEXTURE0),i.bindTexture(i.TEXTURE_2D,I.tex),i.activeTexture(i.TEXTURE0+1),i.bindTexture(i.TEXTURE_2D,M),i.useProgram(h),i.uniform1i(g.positionTex,0),i.uniform1i(g.velocityTex,1),i.uniform2f(g.texDimensions,R,_),i.uniform2f(g.canvasDimensions,i.canvas.width,i.canvas.height),i.uniform1f(g.deltaTime,H),i.drawArrays(i.TRIANGLES,0,6),i.bindFramebuffer(i.FRAMEBUFFER,null),i.viewport(0,0,i.canvas.width,i.canvas.height),i.bindBuffer(i.ARRAY_BUFFER,E),i.enableVertexAttribArray(w.id),i.vertexAttribPointer(w.id,1,i.FLOAT,!1,0,0),i.activeTexture(i.TEXTURE0),i.bindTexture(i.TEXTURE_2D,N.tex),i.useProgram(p),i.uniform2f(w.texDimensions,R,R),i.uniform1i(w.positionTex,0),i.uniformMatrix4fv(w.matrix,!1,dn(0,i.canvas.width,0,i.canvas.height,-1,1)),i.drawArrays(i.POINTS,0,D);{const y=I;I=N,N=y}requestAnimationFrame(it)}requestAnimationFrame(it)}ct(()=>o()),Lt();var n=En();ut(2),G(e,n),ot()}const oe=(e,t)=>(t===void 0&&(t=e,e=0),Math.random()*(t-e)+e);function Ln(e,t,o,n){const s=e*t,l=new Array(s).fill(0).map((a,i)=>i),r=new Float32Array(l.map(a=>[oe(o),oe(n),0,0]).flat()),c=new Float32Array(l.map(a=>[oe(-300,300),oe(-300,300),0,0]).flat());return{numParticles:s,ids:new Float32Array(l),positions:r,velocities:c}}const Pn=`attribute vec4 position;
void main() {
    gl_Position = position;
}
`,Bn=`precision highp float;

uniform sampler2D positionTex;
uniform sampler2D velocityTex;
uniform vec2 texDimensions;
uniform vec2 canvasDimensions;
uniform float deltaTime;

vec2 euclideanModulo(vec2 n, vec2 m) {
    return mod(mod(n, m) + m, m);
}

void main() {
    // there will be one velocity per position
    // so the velocity texture and position texture
    // are the same size.

    // further, we're generating new positions
    // so we know our destination is the same size
    // as our source so we only need one set of 
    // shared texture dimensions

    // compute texcoord from gl_FragCoord;
    vec2 texcoord = gl_FragCoord.xy / texDimensions;

    vec2 position = texture2D(positionTex, texcoord).xy;
    //vec2 velocity = texture2D(velocityTex, texcoord).xy;
    vec2 velocity = vec2(0.0, -100);
    vec2 newPosition = euclideanModulo(position + velocity * deltaTime, canvasDimensions);

    gl_FragColor = vec4(newPosition, 0, 1);
}

`,Sn=`  attribute float id;
  uniform sampler2D positionTex;
  uniform vec2 texDimensions;
  uniform mat4 matrix;

  vec4 getValueFrom2DTextureAs1DArray(sampler2D tex, vec2 dimensions, float index) {
    float y = floor(index / dimensions.x);
    float x = mod(index, dimensions.x);
    vec2 texcoord = (vec2(x, y) + 0.5) / dimensions;
    return texture2D(tex, texcoord);
  }

  void main() {
    // pull the position from the texture
    vec4 position = getValueFrom2DTextureAs1DArray(positionTex, texDimensions, id);

    // do the common matrix math
    gl_Position = matrix * vec4(position.xy, 0, 1);
    gl_PointSize = 10.0;
  }

`,Cn=`precision highp float;
void main() {
    gl_FragColor = vec4(0.2, 0.4, 0.9, 0.5);
}

`;var $n=Q('<p>This is the simple particles simulation from <a target="none" href="https://webglfundamentals.org/webgl/lessons/webgl-gpgpu.html">webglfundamentals</a> with the shader code extracted into separate files.</p> <canvas id="canvas" style="background-color: black" width="800" height="600"></canvas>',1);function In(e,t){nt(t,!1);function o(){const r=document.getElementById("canvas");if(!r)throw"canvas undefined";const c=r.getContext("webgl");if(!c)throw"gl undefined";Te(c);const a=V(c,[Pn,Bn]),i=V(c,[Sn,Cn]),f={position:c.getAttribLocation(a,"position"),positionTex:c.getUniformLocation(a,"positionTex"),velocityTex:c.getUniformLocation(a,"velocityTex"),texDimensions:c.getUniformLocation(a,"texDimensions"),canvasDimensions:c.getUniformLocation(a,"canvasDimensions"),deltaTime:c.getUniformLocation(a,"deltaTime")},u={id:c.getAttribLocation(i,"id"),positionTex:c.getUniformLocation(i,"positionTex"),texDimensions:c.getUniformLocation(i,"texDimensions"),matrix:c.getUniformLocation(i,"matrix")},h=c.createBuffer();c.bindBuffer(c.ARRAY_BUFFER,h),c.bufferData(c.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),c.STATIC_DRAW);const p=300,g=20,{numParticles:w,ids:F,positions:R,velocities:_}=Ln(p,g,r.width,r.height),D=c.createBuffer();c.bindBuffer(c.ARRAY_BUFFER,D),c.bufferData(c.ARRAY_BUFFER,new Float32Array(F),c.STATIC_DRAW),C(c.canvas);const B=O(c,_,p,g),E=O(c,R,p,g),P=O(c,null,p,g),$=et(c,E),Y=et(c,P);let X={fb:$,tex:E},M={fb:Y,tex:P},b=0;function z(W){if(!c||!h||!D)throw"Undefined params to render";W*=.001;const K=W-b;b=W,C(c.canvas),s(c,M,p,g,h,f,X,B,a,K),n(c,p,D,u,M,i,w);{const k=X;X=M,M=k}requestAnimationFrame(z)}requestAnimationFrame(z)}const n=(r,c,a,i,f,u,h)=>{r.bindFramebuffer(r.FRAMEBUFFER,null),r.viewport(0,0,r.canvas.width,r.canvas.height),r.bindBuffer(r.ARRAY_BUFFER,a),r.enableVertexAttribArray(i.id),r.vertexAttribPointer(i.id,1,r.FLOAT,!1,0,0),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,f.tex),r.useProgram(u),r.uniform2f(i.texDimensions,c,c),r.uniform1i(i.positionTex,0),r.uniformMatrix4fv(i.matrix,!1,dn(0,r.canvas.width,0,r.canvas.height,-1,1)),r.drawArrays(r.POINTS,0,h)},s=(r,c,a,i,f,u,h,p,g,w)=>{r.bindFramebuffer(r.FRAMEBUFFER,c.fb),r.viewport(0,0,a,i),r.bindBuffer(r.ARRAY_BUFFER,f),r.enableVertexAttribArray(u.position),r.vertexAttribPointer(u.position,2,r.FLOAT,!1,0,0),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,h.tex),r.activeTexture(r.TEXTURE0+1),r.bindTexture(r.TEXTURE_2D,p),r.useProgram(g),r.uniform1i(u.positionTex,0),r.uniform1i(u.velocityTex,1),r.uniform2f(u.texDimensions,a,i),r.uniform2f(u.canvasDimensions,r.canvas.width,r.canvas.height),r.uniform1f(u.deltaTime,w),r.drawArrays(r.TRIANGLES,0,6)};ct(()=>o()),Lt();var l=$n();ut(2),G(e,l),ot()}const Mn=`attribute vec2 a_position;

uniform vec2 u_resolution;

// all shaders have a main function
void main() {
    // convert the position from pixels to 0.0 to 1.0
    vec2 zeroToOne = a_position / u_resolution;
 
    // convert from 0->1 to 0->2
    vec2 zeroToTwo = zeroToOne * 2.0;
 
    // convert from 0->2 to -1->+1 (clip space)
    vec2 clipSpace = zeroToTwo - 1.0;
 
    // Translate to have 0, 0 on top left
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    gl_PointSize = 10.0;
}
`,zn=`precision mediump float;

void main() {
    gl_FragColor = vec4(0.1, 0.5, 1.0, 1.0);
}
`;var Xn=Q(`<p>Create an array of render-size positions. Bind this array to a buffer in the shader program. In
    each <code>requestAnimationFrame</code> update the positions randomly with javascript and use the
    shader program to render each position as a point.</p> <canvas id="canvas" style="background-color: black" width="800" height="600"></canvas> <button>Add position</button>`,1);function Wn(e,t){nt(t,!1);const o=[50,50,50,150,150,150,150,50,200,200];function n(){const c=document.getElementById("canvas");if(!c)throw"canvas undefined";const a=c.getContext("webgl");if(!a)throw"gl undefined";Te(a);const i=V(a,[Mn,zn]);C(a.canvas);const f=a.getAttribLocation(i,"a_position"),u=a.getUniformLocation(i,"u_resolution"),h=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,h),a.bufferData(a.ARRAY_BUFFER,new Float32Array(o),a.STATIC_DRAW);function p(){if(!a)throw"Undefined params to render";for(let E=0;E<=o.length-2;E+=2)o[E]=(o[E]+Math.random()*2-1)%a.canvas.width,o[E+1]=(o[E+1]+Math.random()*0+1)%a.canvas.height;a.bufferData(a.ARRAY_BUFFER,new Float32Array(o),a.STATIC_DRAW),C(a.canvas),a.viewport(0,0,a.canvas.width,a.canvas.height),a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT),a.useProgram(i),a.uniform2f(u,a.canvas.width,a.canvas.height),a.enableVertexAttribArray(f),a.bindBuffer(a.ARRAY_BUFFER,h);const g=2,w=a.FLOAT,F=!1,R=0,_=0;a.vertexAttribPointer(f,g,w,F,R,_);var D=a.POINTS,B=o.length/2;a.drawArrays(D,_,B),requestAnimationFrame(p)}requestAnimationFrame(p)}const s=()=>{o.push(Math.random()*800),o.push(Math.random()*600)};ct(()=>n()),Lt();var l=Xn(),r=m(lt(l),4);Z("click",r,()=>s()),G(e,l),ot()}Mt(["click"]);const On=`attribute float id;
uniform sampler2D positionTex;
uniform vec2 texDimensions;

uniform vec2 u_resolution;

vec2 getValueFrom2DTextureAs1DArray(sampler2D tex, vec2 dimensions, float index) {
    float y = floor(index / dimensions.x);
    float x = mod(index, dimensions.x);
    vec2 texcoord = (vec2(x, y) + 0.5) / dimensions;
    return texture2D(tex, texcoord).xy;
}

// all shaders have a main function
void main() {
    // pull the position from the texture
    vec2 position = getValueFrom2DTextureAs1DArray(positionTex, texDimensions, id);

    // convert the position from pixels to 0.0 to 1.0
    vec2 zeroToOne = position / u_resolution;
 
    // convert from 0->1 to 0->2
    vec2 zeroToTwo = zeroToOne * 2.0;
 
    // convert from 0->2 to -1->+1 (clip space)
    vec2 clipSpace = zeroToTwo - 1.0;
 
    // Translate to have 0, 0 on top left
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    gl_PointSize = 10.0;
}
`,Yn=`precision mediump float;

void main() {
    gl_FragColor = vec4(0.1, 0.5, 1.0, 1.0);
}
`;let Ht,Vt;const kn=e=>{Vt=V(e,[On,Yn]),Ht={idAttributeLocation:e.getAttribLocation(Vt,"id"),texDimensionsUniformLocation:e.getUniformLocation(Vt,"texDimensions"),resolutionUniformLocation:e.getUniformLocation(Vt,"u_resolution")}},Nn=e=>{const{gl:t,positionTex:o,textureDimension:n,ids:s}=e;C(t.canvas),t.viewport(0,0,t.canvas.width,t.canvas.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT);const l=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,l),t.bufferData(t.ARRAY_BUFFER,new Float32Array(s),t.STATIC_DRAW),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,o),t.useProgram(Vt),t.uniform2f(Ht.resolutionUniformLocation,t.canvas.width,t.canvas.height),t.uniform2f(Ht.texDimensionsUniformLocation,n.width,n.height),t.enableVertexAttribArray(Ht.idAttributeLocation),t.bindBuffer(t.ARRAY_BUFFER,l);const r=1,c=t.FLOAT,a=!1,i=0,f=0;t.vertexAttribPointer(Ht.idAttributeLocation,r,c,a,i,f);const u=t.POINTS,h=s.length;t.drawArrays(u,f,h)};var Hn=Q(`<p>Create an array of render-size positions. Store this array in a texture. In each <code>requestAnimationFrame</code> update the positions randomly with javascript and create a new texture holding the positions then
    use a shader to render the texture.</p> <canvas id="canvas" style="background-color: black"></canvas>`,1);function Vn(e,t){nt(t,!1);const o=800,n=600;function s(){const c=document.getElementById("canvas");if(!c)throw"canvas undefined";const a=c.getContext("webgl");if(!a)throw"gl undefined";Te(a),C(a.canvas),kn(a);const i=[0,1,2,3,4,5,6,7,8,9],f=i.map(h=>[Math.random()*o,Math.random()*n,0,0]).flat();function u(){if(!a)throw"Undefined params to render";for(let p=0;p<=f.length-2;p+=2)f[p]=(f[p]+Math.random()*2-1)%a.canvas.width,f[p+1]=(f[p+1]+Math.random()*0+1)%a.canvas.height;const h=O(a,new Float32Array(f),3,3);Nn({gl:a,positionTex:h,textureDimension:{width:3,height:3},ids:i}),requestAnimationFrame(u)}requestAnimationFrame(u)}ct(()=>s()),Lt();var l=Hn(),r=m(lt(l),2);A(r,"width",o),A(r,"height",n),G(e,l),ot()}const Gn=`attribute float id;
uniform sampler2D positionTex;
uniform vec2 texDimensions;

uniform vec2 u_resolution;

vec2 getValueFrom2DTextureAs1DArray(sampler2D tex, vec2 dimensions, float index) {
    float y = floor(index / dimensions.x);
    float x = mod(index, dimensions.x);
    vec2 texcoord = (vec2(x, y) + 0.5) / dimensions;
    return texture2D(tex, texcoord).xy;
}

// all shaders have a main function
void main() {
    // pull the position from the texture
    vec2 position = getValueFrom2DTextureAs1DArray(positionTex, texDimensions, id);

    // convert the position from pixels to 0.0 to 1.0
    vec2 zeroToOne = position / u_resolution;
 
    // convert from 0->1 to 0->2
    vec2 zeroToTwo = zeroToOne * 2.0;
 
    // convert from 0->2 to -1->+1 (clip space)
    vec2 clipSpace = zeroToTwo - 1.0;
 
    // Translate to have 0, 0 on top left
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    gl_PointSize = 3.0;
}
`,qn=`precision mediump float;

void main() {
    gl_FragColor = vec4(0.1, 0.5, 1.0, 1.0);
}
`;let Gt,qt,Ue;const jn=(e,t)=>{qt=V(e,[Gn,qn]),Gt={idAttributeLocation:e.getAttribLocation(qt,"id"),texDimensionsUniformLocation:e.getUniformLocation(qt,"texDimensions"),resolutionUniformLocation:e.getUniformLocation(qt,"u_resolution")},Ue=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,Ue),e.bufferData(e.ARRAY_BUFFER,new Float32Array(t),e.STATIC_DRAW)},Kn=e=>{const{gl:t,positionTex:o,textureDimension:n,ids:s}=e;C(t.canvas),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,t.canvas.width,t.canvas.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.bindBuffer(t.ARRAY_BUFFER,Ue),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,o),t.useProgram(qt),t.uniform2f(Gt.resolutionUniformLocation,t.canvas.width,t.canvas.height),t.uniform2f(Gt.texDimensionsUniformLocation,n.width,n.height),t.enableVertexAttribArray(Gt.idAttributeLocation);const l=1,r=t.FLOAT,c=!1,a=0,i=0;t.vertexAttribPointer(Gt.idAttributeLocation,l,r,c,a,i),t.drawArrays(t.POINTS,i,s.length)};function Zn(e,t){const o=new Array(e).fill(0).map((l,r)=>r),n=o.map(l=>[Math.random()*t.width,Math.random()*t.height,0,0]).flat(),s={width:o.length,height:1};return{ids:o,positions:n,texDimensions:s}}const Jn=`attribute vec4 position;
void main() {
    gl_Position = position;
}
`,Qn=`precision highp float;

uniform sampler2D positionTex;
uniform vec2 texDimensions;
uniform vec2 u_resolution;

vec2 euclideanModulo(vec2 n, vec2 m) {
    return mod(mod(n, m) + m, m);
}

void main() {
    vec2 texcoord = gl_FragCoord.xy / texDimensions;
    vec2 position = texture2D(positionTex, texcoord).xy;

    vec2 center = u_resolution / 2.0;
    vec2 direction = (center - position) / u_resolution;

    vec2 newPosition = euclideanModulo(position + direction, u_resolution);

    gl_FragColor = vec4(newPosition, 0, 1);
}

`;let Wt,Ot,Le,ge,be,Ze,Je,jt,me;const to=(e,t)=>{const{positions:o,texDimensions:n}=t;Ot=V(e,[Jn,Qn]),Wt={positionAttributeLocation:e.getAttribLocation(Ot,"position"),positionTexLocation:e.getUniformLocation(Ot,"positionTex"),texDimensionsUniformLocation:e.getUniformLocation(Ot,"texDimensions"),resolutionUniformLocation:e.getUniformLocation(Ot,"u_resolution")},Le=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,Le),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW),ge=O(e,new Float32Array(o),n.width,n.height),be=O(e,null,n.width,n.height),Ze=et(e,ge),Je=et(e,be),jt={fb:Ze,tex:ge},me={fb:Je,tex:be}},eo=e=>{const{gl:t,texDimensions:o}=e;t.bindFramebuffer(t.FRAMEBUFFER,me.fb),t.viewport(0,0,o.width,o.height),t.bindBuffer(t.ARRAY_BUFFER,Le),t.enableVertexAttribArray(Wt.positionAttributeLocation),t.vertexAttribPointer(Wt.positionAttributeLocation,2,t.FLOAT,!1,0,0),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,jt.tex),t.useProgram(Ot),t.uniform1i(Wt.positionTexLocation,0),t.uniform2f(Wt.texDimensionsUniformLocation,o.width,o.height),t.uniform2f(Wt.resolutionUniformLocation,t.canvas.width,t.canvas.height),t.drawArrays(t.TRIANGLES,0,6);{const n=jt;jt=me,me=n}return jt.tex};var no=Q(`<p>Create an array of render-size positions. Store this array in a texture.</p> <p>Create 2 textures which will be used to update the positions with a shader. In each <code>requestAnimationFrame</code> update the positions with the simple shader reading from the first texture and writing to the new
    one. Then use the drawing shader to render the new texture to the canvas.</p> <p>Finally switch the two textures to read and write in the updated textures</p> <canvas id="canvas" style="background-color: black"></canvas>`,1);function oo(e,t){nt(t,!1);const o=800,n=600;function s(){const c=zt();C(c.canvas);const{ids:a,positions:i,texDimensions:f}=Zn(100,{width:o,height:n});jn(c,a),to(c,{positions:i,texDimensions:f});function u(){C(c.canvas);const h=eo({gl:c,texDimensions:f});Kn({gl:c,positionTex:h,textureDimension:f,ids:a}),requestAnimationFrame(u)}requestAnimationFrame(u)}ct(()=>s()),Lt();var l=no(),r=m(lt(l),6);A(r,"width",o),A(r,"height",n),G(e,l),ot()}const io=`attribute float id;
attribute float color;
uniform sampler2D positionTex;
uniform vec2 texDimensions;

uniform vec2 u_resolution;

varying float v_color;
varying float v_id;

vec2 getValueFrom2DTextureAs1DArray(sampler2D tex, vec2 dimensions, float index) {
    float y = floor(index / dimensions.x);
    float x = mod(index, dimensions.x);
    vec2 texcoord = (vec2(x, y) + 0.5) / dimensions;
    return texture2D(tex, texcoord).xy;
}

// all shaders have a main function
void main() {
    // pull the position from the texture
    vec2 position = getValueFrom2DTextureAs1DArray(positionTex, texDimensions, id);

    // convert the position from pixels to 0.0 to 1.0
    vec2 zeroToOne = position / u_resolution;
 
    // convert from 0->1 to 0->2
    vec2 zeroToTwo = zeroToOne * 2.0;
 
    // convert from 0->2 to -1->+1 (clip space)
    vec2 clipSpace = zeroToTwo - 1.0;
 
    // Translate to have 0, 0 on top left
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    gl_PointSize = 2.0;
    v_color = color;
    v_id = id / (texDimensions.x * texDimensions.y);
}
`,ro=`precision mediump float;
varying float v_color;
varying float v_id;

void main() {
    if (v_id < 0.1) {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        return;
    }
    if (v_id > 0.45 && v_id < 0.55) {
        gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
        return;
    }
    if (v_id > 0.9) {
        gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
        return;
    }
    gl_FragColor = vec4(v_id, 1.0, v_id, 1.0);

    // if (v_color == 0.0) {
    //     gl_FragColor = vec4(1.0, 0.0, 0.0, 0.3);
    // } else if (v_color == 1.0){
    //     gl_FragColor = vec4(0.0, 1.0, 0.0, 0.3);
    // } else if (v_color == 2.0){
    //     gl_FragColor = vec4(0.0, 0.0, 1.0, 0.3);
    // } else if (v_color == 3.0){
    //     gl_FragColor = vec4(1.0, 1.0, 0.0, 0.3);
    // }
}
`;let Pt,Yt,Pe,Be;const ao=(e,t)=>{const{ids:o,colors:n}=t;Yt=V(e,[io,ro]),Pt={idAttributeLocation:e.getAttribLocation(Yt,"id"),colorAttributeLocation:e.getAttribLocation(Yt,"color"),texDimensionsUniformLocation:e.getUniformLocation(Yt,"texDimensions"),resolutionUniformLocation:e.getUniformLocation(Yt,"u_resolution")},Pe=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,Pe),e.bufferData(e.ARRAY_BUFFER,new Float32Array(o),e.STATIC_DRAW),Be=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,Be),e.bufferData(e.ARRAY_BUFFER,new Float32Array(n),e.STATIC_DRAW)},so=e=>{const{gl:t,positionTex:o,textureDimension:n,ids:s}=e,l=1,r=t.FLOAT,c=!1,a=0,i=0;C(t.canvas),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,t.canvas.width,t.canvas.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.bindBuffer(t.ARRAY_BUFFER,Pe),t.vertexAttribPointer(Pt.idAttributeLocation,l,r,c,a,i),t.enableVertexAttribArray(Pt.idAttributeLocation),t.bindBuffer(t.ARRAY_BUFFER,Be),t.vertexAttribPointer(Pt.colorAttributeLocation,l,r,c,a,i),t.enableVertexAttribArray(Pt.colorAttributeLocation),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,o),t.useProgram(Yt),t.uniform2f(Pt.resolutionUniformLocation,t.canvas.width,t.canvas.height),t.uniform2f(Pt.texDimensionsUniformLocation,n.width,n.height),t.drawArrays(t.POINTS,i,s.length)};function co(e,t){const o=e.width*e.height,n=new Array(o).fill(0).map((r,c)=>c),s=new Array(o).fill(0).map(r=>Math.floor(Math.random()*4)),l=n.map(r=>{{const{x:a,y:i}=lo(t,20);return[a,i,0,0]}}).flat();return{ids:n,positions:l,texDimensions:e,colors:s}}const lo=(e,t)=>{const o=t*Math.random(),n=Math.random()*2*Math.PI,s=o*Math.cos(n)+e.width/2,l=o*Math.sin(n)+e.height/2;return{x:s,y:l}},fo=`attribute vec4 position;
void main() {
    gl_Position = position;
}
`,mo=`precision highp float;

#define MIN_DISTANCE 9.0

uniform sampler2D positionTex;
uniform vec2 texDimensions;
uniform vec2 u_resolution;
uniform float deltaTime;

// We need to define the texture dimensions in constants
// because loops work only with constant values
const float texWidth = 100.0;
const float texHeight = 100.0;

vec2 euclideanModulo(vec2 n, vec2 m) {
    return mod(mod(n, m) + m, m);
}

void main() {
    vec2 texcoord = gl_FragCoord.xy / texDimensions;
    vec2 position = texture2D(positionTex, texcoord).xy;

    vec2 direction = vec2(0.0, 0.0);

    // Iterate on the texture coordinates to compare with each other cell

    for (float y=0.0; y<1.0; y += 1.0 / texHeight) {
        for (float x=0.0; x<1.0; x += 1.0 / texWidth) {
            vec2 otherTextCoord = vec2(x, y);
            vec2 otherPosition = texture2D(positionTex, otherTextCoord).xy;

            vec2 diff = position - otherPosition;
            float mag = length(diff);
            if (mag < MIN_DISTANCE) {
                if (mag == 0.0) {
                    mag = 1.0e-10;
                }
                direction = direction + (diff * 10.0/mag);
            }
        }
    }
    direction = (direction * 0.0001) * deltaTime;

    vec2 newPosition = euclideanModulo(position + direction, u_resolution);

    gl_FragColor = vec4(newPosition, 0, 1);
}

`;let Bt,St,Se,ie,Ae,Qe,tn,Kt,de,re;const uo=(e,t)=>{const{positions:o,texDimensions:n}=t;return St=V(e,[fo,mo]),Bt={positionAttributeLocation:e.getAttribLocation(St,"position"),positionTexLocation:e.getUniformLocation(St,"positionTex"),deltaTimeUniformLocation:e.getUniformLocation(St,"deltaTime"),texDimensionsUniformLocation:e.getUniformLocation(St,"texDimensions"),resolutionUniformLocation:e.getUniformLocation(St,"u_resolution")},Se=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,Se),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW),ie=O(e,new Float32Array(o),n.width,n.height),Ae=O(e,null,n.width,n.height),Qe=et(e,ie),tn=et(e,Ae),Kt={fb:Qe,tex:ie},de={fb:tn,tex:Ae},ie},po=e=>{const{gl:t,texDimensions:o}=e,n=Date.now();re||(re=n-1);const s=n-re;re=n,t.bindFramebuffer(t.FRAMEBUFFER,de.fb),t.viewport(0,0,o.width,o.height),t.bindBuffer(t.ARRAY_BUFFER,Se),t.enableVertexAttribArray(Bt.positionAttributeLocation),t.vertexAttribPointer(Bt.positionAttributeLocation,2,t.FLOAT,!1,0,0),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,Kt.tex),t.useProgram(St),t.uniform1i(Bt.positionTexLocation,0),t.uniform1f(Bt.deltaTimeUniformLocation,s),t.uniform2f(Bt.texDimensionsUniformLocation,o.width,o.height),t.uniform2f(Bt.resolutionUniformLocation,t.canvas.width,t.canvas.height),t.drawArrays(t.TRIANGLES,0,6);{const l=Kt;Kt=de,de=l}return Kt.tex};var vo=Q(`<p>Same principle with a shader to update positions and a shader to draw particles.</p> <p>This time the update shader iterate through the texture to compute the distance of the particle
    to each other particle and if they are too close it pushes them appart.</p> <canvas id="canvas" style="background-color: black"></canvas> <div><button> </button> <button> </button> <span> </span> <label for="steps">Smooth steps</label> <input type="number"/></div>`,1);function xo(e,t){nt(t,!0);const o={width:800,height:600},n={width:100,height:100};let s=J(1),l=J(!1),r=J(!0);function c(){const _=zt();C(_.canvas);const{ids:D,positions:B,colors:E}=co(n,{width:o.width,height:o.height});ao(_,{ids:D,colors:E});let P=uo(_,{positions:B,texDimensions:n});function $(){if(C(_.canvas),!T(r))for(let Y=0;Y<T(s);Y++)P=po({gl:_,texDimensions:n});return so({gl:_,positionTex:P,textureDimension:n,ids:D}),T(r)?requestAnimationFrame($):T(l)?setTimeout(()=>requestAnimationFrame($),1e3):requestAnimationFrame($)}requestAnimationFrame($)}ct(()=>c());var a=vo(),i=m(lt(a),4),f=m(i,2),u=x(f),h=x(u,!0);v(u);var p=m(u,2),g=x(p,!0);v(p);var w=m(p,2),F=x(w);v(w);var R=m(w,4);U(R),A(R,"min",0),v(f),Et(()=>{A(i,"width",o.width),A(i,"height",o.height),j(h,T(r)?"Play":"Pause"),j(g,T(l)?"Normal Speed":"Slow Mo"),j(F,`particles: ${n.width*n.height}`)}),Z("click",u,()=>q(r,!T(r))),Z("click",p,()=>q(l,!T(l))),L(R,()=>T(s),_=>q(s,_)),G(e,a),ot()}Mt(["click"]);const ho=`attribute float id;
attribute float color;
uniform sampler2D positionTex;
uniform vec2 texDimensions;

uniform vec2 u_resolution;

varying float v_color;
varying float v_id;

vec2 getValueFrom2DTextureAs1DArray(sampler2D tex, vec2 dimensions, float index) {
    float y = floor(index / dimensions.x);
    float x = mod(index, dimensions.x);
    vec2 texcoord = (vec2(x, y) + 0.5) / dimensions;
    return texture2D(tex, texcoord).xy;
}

// all shaders have a main function
void main() {
    // pull the position from the texture
    vec2 position = getValueFrom2DTextureAs1DArray(positionTex, texDimensions, id);

    // convert the position from pixels to 0.0 to 1.0
    vec2 zeroToOne = position / u_resolution;
 
    // convert from 0->1 to 0->2
    vec2 zeroToTwo = zeroToOne * 2.0;
 
    // convert from 0->2 to -1->+1 (clip space)
    vec2 clipSpace = zeroToTwo - 1.0;
 
    // Translate to have 0, 0 on top left
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    gl_PointSize = 5.0;
    v_color = color;
    v_id = id / (texDimensions.x * texDimensions.y);
}
`,To=`precision mediump float;
varying float v_color;
varying float v_id;

void main() {
    if (v_id < 0.1) {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        return;
    }
    if (v_id > 0.45 && v_id < 0.55) {
        gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
        return;
    }
    if (v_id > 0.9) {
        gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
        return;
    }
    gl_FragColor = vec4(v_id, 1.0, v_id, 1.0);

    // if (v_color == 0.0) {
    //     gl_FragColor = vec4(1.0, 0.0, 0.0, 0.3);
    // } else if (v_color == 1.0){
    //     gl_FragColor = vec4(0.0, 1.0, 0.0, 0.3);
    // } else if (v_color == 2.0){
    //     gl_FragColor = vec4(0.0, 0.0, 1.0, 0.3);
    // } else if (v_color == 3.0){
    //     gl_FragColor = vec4(1.0, 1.0, 0.0, 0.3);
    // }
}
`;let Ct,kt,Ce,$e;const go=(e,t)=>{const{ids:o,colors:n}=t;kt=V(e,[ho,To]),Ct={idAttributeLocation:e.getAttribLocation(kt,"id"),colorAttributeLocation:e.getAttribLocation(kt,"color"),texDimensionsUniformLocation:e.getUniformLocation(kt,"texDimensions"),resolutionUniformLocation:e.getUniformLocation(kt,"u_resolution")},Ce=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,Ce),e.bufferData(e.ARRAY_BUFFER,new Float32Array(o),e.STATIC_DRAW),$e=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,$e),e.bufferData(e.ARRAY_BUFFER,new Float32Array(n),e.STATIC_DRAW)},bo=e=>{const{gl:t,positionTex:o,textureDimension:n,ids:s}=e,l=1,r=t.FLOAT,c=!1,a=0,i=0;C(t.canvas),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,t.canvas.width,t.canvas.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.bindBuffer(t.ARRAY_BUFFER,Ce),t.vertexAttribPointer(Ct.idAttributeLocation,l,r,c,a,i),t.enableVertexAttribArray(Ct.idAttributeLocation),t.bindBuffer(t.ARRAY_BUFFER,$e),t.vertexAttribPointer(Ct.colorAttributeLocation,l,r,c,a,i),t.enableVertexAttribArray(Ct.colorAttributeLocation),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,o),t.useProgram(kt),t.uniform2f(Ct.resolutionUniformLocation,t.canvas.width,t.canvas.height),t.uniform2f(Ct.texDimensionsUniformLocation,n.width,n.height),t.drawArrays(t.POINTS,i,s.length)};function Ao(e){const{texDimensions:t,screenDimensions:o}=e,n=t.width*t.height,s=new Array(n).fill(0).map((c,a)=>a),l=new Array(n).fill(0).map(c=>Math.floor(Math.random()*4)),r=s.map(c=>{{const{x:a,y:i}=_o(o,c,s.length,{x:1,y:1});return[a,i,0,0]}}).flat();return{ids:s,positions:r,texDimensions:t,colors:l}}const _o=(e,t,o,n)=>{const s=wo(t,0,o,0,1)*2*Math.PI,l=n.x,c=Math.cos(l*s)*200+e.width/2,a=n.y,f=Math.sin(a*s)*200+e.height/2;return{x:c,y:f}},wo=function(e,t,o,n,s,l){const r=(e-t)/(o-t)*(s-n)+n;return Fo(r,n,s)},Fo=function(e,t,o){return Math.max(Math.min(e,o),t)},Ro=`attribute vec4 position;
void main() {
    gl_Position = position;
}
`,Do=`precision highp float;

uniform sampler2D positionTex;
uniform vec2 texDimensions;
uniform vec2 u_resolution;
uniform float interactionRange;
uniform float deltaTime;
uniform float drag;

// We need to define the texture dimensions in constants
// because loops work only with constant values
const float texWidth = 100.0;
const float texHeight = 100.0;

vec2 euclideanModulo(vec2 n, vec2 m) {
    return mod(mod(n, m) + m, m);
}

void main() {
    vec2 texcoord = gl_FragCoord.xy / texDimensions;
    vec2 position = texture2D(positionTex, texcoord).xy;

    vec2 direction = vec2(0.0, 0.0);

    // Iterate on the texture coordinates to compare with each other cell

    for (float y=0.0; y<1.0; y += 1.0 / texHeight) {
        for (float x=0.0; x<1.0; x += 1.0 / texWidth) {
            vec2 otherTextCoord = vec2(x, y);
            vec2 otherPosition = texture2D(positionTex, otherTextCoord).xy;

            vec2 diff = position - otherPosition;
            float mag = length(diff);
            if (mag < interactionRange) {
                float diffCoef = 1.0 / mag;
                if (mag < 1.0) {
                    diffCoef = 1.0;
                }
                direction = direction + (diff * diffCoef);
            }
        }
    }
    direction = (direction * deltaTime) / drag;

    vec2 newPosition = euclideanModulo(position + direction, u_resolution);

    gl_FragColor = vec4(newPosition, 0, 1);
}

`;let vt,xt,Ie,ae,_e,en,nn,Zt,ue;const yo=(e,t)=>{const{positions:o,texDimensions:n}=t;return xt=V(e,[Ro,Do]),vt={positionAttributeLocation:e.getAttribLocation(xt,"position"),positionTexLocation:e.getUniformLocation(xt,"positionTex"),interactionRangeUniformLocation:e.getUniformLocation(xt,"interactionRange"),dragUniformLocation:e.getUniformLocation(xt,"drag"),deltaTimeUniformLocation:e.getUniformLocation(xt,"deltaTime"),texDimensionsUniformLocation:e.getUniformLocation(xt,"texDimensions"),resolutionUniformLocation:e.getUniformLocation(xt,"u_resolution")},Ie=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,Ie),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW),ae=O(e,new Float32Array(o),n.width,n.height),_e=O(e,null,n.width,n.height),en=et(e,ae),nn=et(e,_e),Zt={fb:en,tex:ae},ue={fb:nn,tex:_e},ae},Eo=e=>{const{gl:t,texDimensions:o,interactionRange:n,drag:s,deltaTime:l}=e;t.bindFramebuffer(t.FRAMEBUFFER,ue.fb),t.viewport(0,0,o.width,o.height),t.bindBuffer(t.ARRAY_BUFFER,Ie),t.enableVertexAttribArray(vt.positionAttributeLocation),t.vertexAttribPointer(vt.positionAttributeLocation,2,t.FLOAT,!1,0,0),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,Zt.tex),t.useProgram(xt),t.uniform1i(vt.positionTexLocation,0),t.uniform1f(vt.dragUniformLocation,s),t.uniform1f(vt.interactionRangeUniformLocation,n),t.uniform1f(vt.deltaTimeUniformLocation,l),t.uniform2f(vt.texDimensionsUniformLocation,o.width,o.height),t.uniform2f(vt.resolutionUniformLocation,t.canvas.width,t.canvas.height),t.drawArrays(t.TRIANGLES,0,6);{const r=Zt;Zt=ue,ue=r}return Zt.tex};var Uo=Q(`<p>Same principle with a shader to update positions and a shader to draw particles.</p> <p>This time the update shader iterate through the texture to compute the distance of the particle
    to each other particle and if they are too close it pushes them appart.</p> <canvas id="canvas" style="background-color: black"></canvas> <div><button> </button> <button> </button> <span> </span> <label for="steps">Smooth steps</label> <input type="number"/></div> <div><ul><li><label for="interactionRange">Interaction Range</label> <input id="interactionRange" type="number"/></li> <li><label for="drag">Drag</label> <input id="drag" type="number"/></li> <li><label for="deltaTime">Time step</label> <input id="deltaTime" type="number"/></li> <ul></ul></ul></div>`,1);function Lo(e,t){nt(t,!0);const o={width:800,height:600},n={width:10,height:10};let s=J(1),l=J(!1),r=J(!0);const c=Ut({interactionRange:70,drag:1e3,timeStep:10});function a(){const b=zt();C(b.canvas);const{ids:z,positions:W,colors:K}=Ao({texDimensions:n,screenDimensions:{width:o.width,height:o.height}});go(b,{ids:z,colors:K});let k=yo(b,{positions:W,texDimensions:n});function I(){if(C(b.canvas),!T(r))for(let N=0;N<T(s);N++)k=Eo({gl:b,texDimensions:n,interactionRange:c.interactionRange,drag:c.drag,deltaTime:c.timeStep});return bo({gl:b,positionTex:k,textureDimension:n,ids:z}),T(r)?requestAnimationFrame(I):T(l)?setTimeout(()=>requestAnimationFrame(I),1e3):requestAnimationFrame(I)}requestAnimationFrame(I)}ct(()=>a());var i=Uo(),f=m(lt(i),4),u=m(f,2),h=x(u),p=x(h,!0);v(h);var g=m(h,2),w=x(g,!0);v(g);var F=m(g,2),R=x(F);v(F);var _=m(F,4);U(_),A(_,"min",0),v(u);var D=m(u,2),B=x(D),E=x(B),P=m(x(E),2);U(P),A(P,"min",0),v(E);var $=m(E,2),Y=m(x($),2);U(Y),A(Y,"min",0),v($);var X=m($,2),M=m(x(X),2);U(M),A(M,"min",0),v(X),ut(2),v(B),v(D),Et(()=>{A(f,"width",o.width),A(f,"height",o.height),j(p,T(r)?"Play":"Pause"),j(w,T(l)?"Normal Speed":"Slow Mo"),j(R,`particles: ${n.width*n.height}`)}),Z("click",h,()=>q(r,!T(r))),Z("click",g,()=>q(l,!T(l))),L(_,()=>T(s),b=>q(s,b)),L(P,()=>c.interactionRange,b=>c.interactionRange=b),L(Y,()=>c.drag,b=>c.drag=b),L(M,()=>c.timeStep,b=>c.timeStep=b),G(e,i),ot()}Mt(["click"]);const Po=`attribute float id;
attribute float color;
uniform sampler2D positionTex;
uniform vec2 texDimensions;

uniform vec2 u_resolution;

varying float v_color;
varying float v_id;

vec2 getValueFrom2DTextureAs1DArray(sampler2D tex, vec2 dimensions, float index) {
    float y = floor(index / dimensions.x);
    float x = mod(index, dimensions.x);
    vec2 texcoord = (vec2(x, y) + 0.5) / dimensions;
    return texture2D(tex, texcoord).xy;
}

// all shaders have a main function
void main() {
    // pull the position from the texture
    vec2 position = getValueFrom2DTextureAs1DArray(positionTex, texDimensions, id);

    // convert the position from pixels to 0.0 to 1.0
    vec2 zeroToOne = position / u_resolution;
 
    // convert from 0->1 to 0->2
    vec2 zeroToTwo = zeroToOne * 2.0;
 
    // convert from 0->2 to -1->+1 (clip space)
    vec2 clipSpace = zeroToTwo - 1.0;
 
    // Translate to have 0, 0 on top left
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    gl_PointSize = 5.0;
    v_color = color;
    v_id = id / (texDimensions.x * texDimensions.y);
}
`,Bo=`precision mediump float;
varying float v_color;
varying float v_id;

void main() {
    // if (v_id < 0.1) {
    //     gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    //     return;
    // }
    // if (v_id > 0.45 && v_id < 0.55) {
    //     gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
    //     return;
    // }
    // if (v_id > 0.9) {
    //     gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
    //     return;
    // }
    gl_FragColor = vec4(0.2, 0.2, v_id, 1.0);
    gl_FragColor = vec4(0.2, 0.2, 1.0, 1.0);

    // if (v_color == 0.0) {
    //     gl_FragColor = vec4(1.0, 0.0, 0.0, 0.3);
    // } else if (v_color == 1.0){
    //     gl_FragColor = vec4(0.0, 1.0, 0.0, 0.3);
    // } else if (v_color == 2.0){
    //     gl_FragColor = vec4(0.0, 0.0, 1.0, 0.3);
    // } else if (v_color == 3.0){
    //     gl_FragColor = vec4(1.0, 1.0, 0.0, 0.3);
    // }
}
`;let $t,Nt,Me,ze;const So=(e,t)=>{const{ids:o,colors:n}=t;Nt=V(e,[Po,Bo]),$t={idAttributeLocation:e.getAttribLocation(Nt,"id"),colorAttributeLocation:e.getAttribLocation(Nt,"color"),texDimensionsUniformLocation:e.getUniformLocation(Nt,"texDimensions"),resolutionUniformLocation:e.getUniformLocation(Nt,"u_resolution")},Me=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,Me),e.bufferData(e.ARRAY_BUFFER,new Float32Array(o),e.STATIC_DRAW),ze=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,ze),e.bufferData(e.ARRAY_BUFFER,new Float32Array(n),e.STATIC_DRAW)},Co=e=>{const{gl:t,positionTex:o,textureDimension:n,ids:s}=e,l=1,r=t.FLOAT,c=!1,a=0,i=0;C(t.canvas),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,t.canvas.width,t.canvas.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.bindBuffer(t.ARRAY_BUFFER,Me),t.vertexAttribPointer($t.idAttributeLocation,l,r,c,a,i),t.enableVertexAttribArray($t.idAttributeLocation),t.bindBuffer(t.ARRAY_BUFFER,ze),t.vertexAttribPointer($t.colorAttributeLocation,l,r,c,a,i),t.enableVertexAttribArray($t.colorAttributeLocation),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,o),t.useProgram(Nt),t.uniform2f($t.resolutionUniformLocation,t.canvas.width,t.canvas.height),t.uniform2f($t.texDimensionsUniformLocation,n.width,n.height),t.drawArrays(t.POINTS,i,s.length)};function $o(e){const{texDimensions:t,screenDimensions:o}=e,n=t.width*t.height,s=new Array(n).fill(0).map((c,a)=>a),l=new Array(n).fill(0).map(c=>Math.floor(Math.random()*4)),r=s.map(c=>{{const{x:i,y:f}=Io(o,200);return[i,f,0,0]}}).flat();return{ids:s,positions:r,texDimensions:t,colors:l}}const Io=(e,t)=>{const o=t*Math.random(),n=Math.random()*2*Math.PI,s=o*Math.cos(n)+e.width/2,l=o*Math.sin(n)+e.height/2;return{x:s,y:l}},Mo=`attribute vec4 position;
void main() {
    gl_Position = position;
}
`,zo=`precision highp float;

uniform sampler2D positionTex;
uniform vec2 texDimensions;
uniform vec2 u_resolution;
uniform float interactionRange;
uniform float deltaTime;
uniform float drag;

// We need to define the texture dimensions in constants
// because loops work only with constant values
const float texWidth = {{TEX_WIDTH}};
const float texHeight = {{TEX_HEIGHT}};

const vec2 gravity = vec2(0.0, 0.5);

vec2 euclideanModulo(vec2 n, vec2 m) {
    return mod(mod(n, m) + m, m);
}

float euclideanModulo(float n, float m) {
    return mod(mod(n, m) + m, m);
}

void main() {
    vec2 texcoord = gl_FragCoord.xy / texDimensions;
    vec2 position = texture2D(positionTex, texcoord).xy;

    vec2 direction = vec2(0.0, 0.0);

    // Iterate on the texture coordinates to compare with each other cell

    for (float y=0.0; y<1.0; y += 1.0 / texHeight) {
        for (float x=0.0; x<1.0; x += 1.0 / texWidth) {
            vec2 otherTextCoord = vec2(x, y);
            vec2 otherPosition = texture2D(positionTex, otherTextCoord).xy;

            vec2 diff = position - otherPosition;
            float mag = length(diff);
            if (mag < interactionRange) {
                float diffCoef = 1.0 / mag;
                if (mag < 1.0) {
                    diffCoef = 1.0;
                }
                direction = direction + (diff * diffCoef);
            }
        }
    }
    direction = (direction * deltaTime) / drag;
    direction = direction + gravity;

    vec2 newPosition = position + direction;
    newPosition.x = euclideanModulo(position.x + direction.x, u_resolution.x);

    if (newPosition.y >= u_resolution.y - 5.0) {
        newPosition.y = u_resolution.y - 7.0;
    }

    // if (newPosition.x >= u_resolution.x - 5.0) {
    //     newPosition.x = u_resolution.x - 7.0;
    // }

    // if (newPosition.x <  5.0) {
    //     newPosition.x = 7.0;
    // }

    gl_FragColor = vec4(newPosition, 0, 1);
}

`;let ht,Tt,Xe,se,we,on,rn,Jt,pe;const Xo=(e,t)=>{const{positions:o,texDimensions:n}=t,s=zo.replace("{{TEX_WIDTH}}",n.width.toFixed(1)).replace("{{TEX_HEIGHT}}",n.height.toFixed(1));return Tt=V(e,[Mo,s]),ht={positionAttributeLocation:e.getAttribLocation(Tt,"position"),positionTexLocation:e.getUniformLocation(Tt,"positionTex"),interactionRangeUniformLocation:e.getUniformLocation(Tt,"interactionRange"),dragUniformLocation:e.getUniformLocation(Tt,"drag"),deltaTimeUniformLocation:e.getUniformLocation(Tt,"deltaTime"),texDimensionsUniformLocation:e.getUniformLocation(Tt,"texDimensions"),resolutionUniformLocation:e.getUniformLocation(Tt,"u_resolution")},Xe=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,Xe),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW),se=O(e,new Float32Array(o),n.width,n.height),we=O(e,null,n.width,n.height),on=et(e,se),rn=et(e,we),Jt={fb:on,tex:se},pe={fb:rn,tex:we},se},Wo=e=>{const{gl:t,texDimensions:o,interactionRange:n,drag:s,deltaTime:l}=e;t.bindFramebuffer(t.FRAMEBUFFER,pe.fb),t.viewport(0,0,o.width,o.height),t.bindBuffer(t.ARRAY_BUFFER,Xe),t.enableVertexAttribArray(ht.positionAttributeLocation),t.vertexAttribPointer(ht.positionAttributeLocation,2,t.FLOAT,!1,0,0),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,Jt.tex),t.useProgram(Tt),t.uniform1i(ht.positionTexLocation,0),t.uniform1f(ht.dragUniformLocation,s),t.uniform1f(ht.interactionRangeUniformLocation,n),t.uniform1f(ht.deltaTimeUniformLocation,l),t.uniform2f(ht.texDimensionsUniformLocation,o.width,o.height),t.uniform2f(ht.resolutionUniformLocation,t.canvas.width,t.canvas.height),t.drawArrays(t.TRIANGLES,0,6);{const r=Jt;Jt=pe,pe=r}return Jt.tex};var Oo=Q(`<p>This could be a kind of water simulation.</p> <p>Here we added a gravity force to the shader which pulls cells apart and we can experiment with
    different values of the parameters.</p> <p>For now creating vertical walls create a bug so we warp the horizontal coordinates.</p> <canvas id="canvas" style="background-color: black"></canvas> <div><button> </button> <button> </button> <span> </span> <label for="steps">Smooth steps</label> <input type="number"/></div> <div><ul><li><label for="interactionRange">Interaction Range</label> <input id="interactionRange" type="number"/></li> <li><label for="drag">Drag</label> <input id="drag" type="number"/></li> <li><label for="deltaTime">Time step</label> <input id="deltaTime" type="number"/></li> <ul></ul></ul></div>`,1);function Yo(e,t){nt(t,!0);const o={width:800,height:600},n={width:500,height:20};let s=J(1),l=J(!1),r=J(!0);const c=Ut({interactionRange:6,drag:5,timeStep:10});function a(){const b=zt();C(b.canvas);const{ids:z,positions:W,colors:K}=$o({texDimensions:n,screenDimensions:{width:o.width,height:o.height}});So(b,{ids:z,colors:K});let k=Xo(b,{positions:W,texDimensions:n});function I(){if(C(b.canvas),!T(r))for(let N=0;N<T(s);N++)k=Wo({gl:b,texDimensions:n,interactionRange:c.interactionRange,drag:c.drag,deltaTime:c.timeStep});return Co({gl:b,positionTex:k,textureDimension:n,ids:z}),T(r)?requestAnimationFrame(I):T(l)?setTimeout(()=>requestAnimationFrame(I),1e3):requestAnimationFrame(I)}requestAnimationFrame(I)}ct(()=>a());var i=Oo(),f=m(lt(i),6),u=m(f,2),h=x(u),p=x(h,!0);v(h);var g=m(h,2),w=x(g,!0);v(g);var F=m(g,2),R=x(F);v(F);var _=m(F,4);U(_),A(_,"min",0),v(u);var D=m(u,2),B=x(D),E=x(B),P=m(x(E),2);U(P),A(P,"min",0),v(E);var $=m(E,2),Y=m(x($),2);U(Y),A(Y,"min",0),v($);var X=m($,2),M=m(x(X),2);U(M),A(M,"min",0),v(X),ut(2),v(B),v(D),Et(()=>{A(f,"width",o.width),A(f,"height",o.height),j(p,T(r)?"Play":"Pause"),j(w,T(l)?"Normal Speed":"Slow Mo"),j(R,`particles: ${n.width*n.height}`)}),Z("click",h,()=>q(r,!T(r))),Z("click",g,()=>q(l,!T(l))),L(_,()=>T(s),b=>q(s,b)),L(P,()=>c.interactionRange,b=>c.interactionRange=b),L(Y,()=>c.drag,b=>c.drag=b),L(M,()=>c.timeStep,b=>c.timeStep=b),G(e,i),ot()}Mt(["click"]);const ko=`attribute float id;
attribute float color;
uniform sampler2D positionTex;
uniform vec2 texDimensions;

uniform vec2 worldDimensions;
uniform float size;


varying float v_color;
varying float v_id;

vec2 getValueFrom2DTextureAs1DArray(sampler2D tex, vec2 dimensions, float index) {
    float y = floor(index / dimensions.x);
    float x = mod(index, dimensions.x);
    vec2 texcoord = (vec2(x, y) + 0.5) / dimensions;
    return texture2D(tex, texcoord).xy;
}

// all shaders have a main function
void main() {
    // pull the position from the texture
    vec2 position = getValueFrom2DTextureAs1DArray(positionTex, texDimensions, id);

    // convert the position from pixels to 0.0 to 1.0
    vec2 zeroToOne = position / worldDimensions;
 
    // convert from 0->1 to 0->2
    vec2 zeroToTwo = zeroToOne * 2.0;
 
    // convert from 0->2 to -1->+1 (clip space)
    vec2 clipSpace = zeroToTwo - 1.0;
 
    // Translate to have 0, 0 on top left
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    gl_PointSize = size;
    v_color = color;
    v_id = id / (texDimensions.x * texDimensions.y);
}
`,No=`precision mediump float;
varying float v_color;
varying float v_id;

const float u_radius = 0.5; // The radius of the particles

void main() {
    float dist = length(gl_PointCoord - vec2(0.5, 0.5)); // Calculate the distance to the center
    if (dist > u_radius) { // If outside the circle, discard the fragment
        discard;
    }
    gl_FragColor = vec4(0.2, 0.2, 1.0, 0.4);
}
`;let wt,It,We,Oe;const Ho=(e,t)=>{const{ids:o,colors:n}=t;It=V(e,[ko,No]),wt={idAttributeLocation:e.getAttribLocation(It,"id"),colorAttributeLocation:e.getAttribLocation(It,"color"),sizeUniformLocation:e.getUniformLocation(It,"size"),texDimensionsUniformLocation:e.getUniformLocation(It,"texDimensions"),worldDimensionsUniformLocation:e.getUniformLocation(It,"worldDimensions")},We=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,We),e.bufferData(e.ARRAY_BUFFER,new Float32Array(o),e.STATIC_DRAW),Oe=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,Oe),e.bufferData(e.ARRAY_BUFFER,new Float32Array(n),e.STATIC_DRAW)},Vo=e=>{const{gl:t,positionTex:o,texDimensions:n,worldDimensions:s,particlesSize:l,ids:r}=e,c=1,a=t.FLOAT,i=!1,f=0,u=0;C(t.canvas),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,t.canvas.width,t.canvas.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.bindBuffer(t.ARRAY_BUFFER,We),t.vertexAttribPointer(wt.idAttributeLocation,c,a,i,f,u),t.enableVertexAttribArray(wt.idAttributeLocation),t.bindBuffer(t.ARRAY_BUFFER,Oe),t.vertexAttribPointer(wt.colorAttributeLocation,c,a,i,f,u),t.enableVertexAttribArray(wt.colorAttributeLocation),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,o),t.useProgram(It),t.uniform1f(wt.sizeUniformLocation,l),t.uniform2f(wt.worldDimensionsUniformLocation,s.width,s.height),t.uniform2f(wt.texDimensionsUniformLocation,n.width,n.height),t.drawArrays(t.POINTS,u,r.length)};function Go(e){const{texDimensions:t,worldDimensions:o}=e,n=t.width*t.height,s=new Array(n).fill(0).map((c,a)=>a),l=new Array(n).fill(0).map(()=>Math.floor(Math.random()*4)),r=s.map(c=>{{const{x:i,y:f}=qo(o,200);return[i,f,0,0]}}).flat();return{ids:s,positions:r,texDimensions:t,colors:l}}const qo=(e,t)=>{const o=t*Math.random(),n=Math.random()*2*Math.PI,s=o*Math.cos(n)+e.width/2,l=o*Math.sin(n)+e.height/2;return{x:s,y:l}},jo=`attribute vec4 position;
void main() {
    gl_Position = position;
}
`,Ko=`precision highp float;

uniform sampler2D positionTex;
uniform vec2 texDimensions;
uniform vec2 worldDimensions;
uniform float interactionRange;
uniform float deltaTime;
uniform float drag;

// We need to define the texture dimensions in constants
// because loops work only with constant values
const float texWidth = {{TEX_WIDTH}};
const float texHeight = {{TEX_HEIGHT}};

const vec2 gravity = vec2(0.0, 0.5);

vec2 euclideanModulo(vec2 n, vec2 m) {
    return mod(mod(n, m) + m, m);
}

float euclideanModulo(float n, float m) {
    return mod(mod(n, m) + m, m);
}

void main() {
    vec2 texcoord = gl_FragCoord.xy / texDimensions;
    vec2 position = texture2D(positionTex, texcoord).xy;

    vec2 direction = vec2(0.0, 0.0);

    // Iterate on the texture coordinates to compare with each other cell

    for (float y=0.0; y<1.0; y += 1.0 / texHeight) {
        for (float x=0.0; x<1.0; x += 1.0 / texWidth) {
            vec2 otherTextCoord = vec2(x, y);
            vec2 otherPosition = texture2D(positionTex, otherTextCoord).xy;

            vec2 diff = position - otherPosition;
            float mag = length(diff);
            if (mag < interactionRange) {
                float diffCoef = 1.0 / mag;
                if (mag < 1.0) {
                    diffCoef = 1.0;
                }
                direction = direction + (diff * diffCoef);
            }
        }
    }
    direction = (direction * deltaTime) / drag;
    direction = direction + gravity;

    vec2 newPosition = position + direction;
    newPosition.x = euclideanModulo(position.x + direction.x, worldDimensions.x);

    if (newPosition.y >= worldDimensions.y - 5.0) {
        newPosition.y = worldDimensions.y - 7.0;
    }

    // if (newPosition.x >= worldDimensions.x - 5.0) {
    //     newPosition.x = worldDimensions.x - 7.0;
    // }

    // if (newPosition.x <  5.0) {
    //     newPosition.x = 7.0;
    // }

    gl_FragColor = vec4(newPosition, 0, 1);
}

`;let gt,bt,Ye,ce,Fe,an,sn,Qt,ve;const Zo=(e,t)=>{const{positions:o,texDimensions:n}=t,s=Ko.replace("{{TEX_WIDTH}}",n.width.toFixed(1)).replace("{{TEX_HEIGHT}}",n.height.toFixed(1));return bt=V(e,[jo,s]),gt={positionAttributeLocation:e.getAttribLocation(bt,"position"),positionTexLocation:e.getUniformLocation(bt,"positionTex"),interactionRangeUniformLocation:e.getUniformLocation(bt,"interactionRange"),dragUniformLocation:e.getUniformLocation(bt,"drag"),deltaTimeUniformLocation:e.getUniformLocation(bt,"deltaTime"),texDimensionsUniformLocation:e.getUniformLocation(bt,"texDimensions"),worldDimensionsUniformLocation:e.getUniformLocation(bt,"worldDimensions")},Ye=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,Ye),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW),ce=O(e,new Float32Array(o),n.width,n.height),Fe=O(e,null,n.width,n.height),an=et(e,ce),sn=et(e,Fe),Qt={fb:an,tex:ce},ve={fb:sn,tex:Fe},ce},Jo=e=>{const{gl:t,texDimensions:o,worldDimensions:n,interactionRange:s,drag:l,deltaTime:r}=e;t.bindFramebuffer(t.FRAMEBUFFER,ve.fb),t.viewport(0,0,o.width,o.height),t.bindBuffer(t.ARRAY_BUFFER,Ye),t.enableVertexAttribArray(gt.positionAttributeLocation),t.vertexAttribPointer(gt.positionAttributeLocation,2,t.FLOAT,!1,0,0),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,Qt.tex),t.useProgram(bt),t.uniform1i(gt.positionTexLocation,0),t.uniform1f(gt.dragUniformLocation,l),t.uniform1f(gt.interactionRangeUniformLocation,s),t.uniform1f(gt.deltaTimeUniformLocation,r),t.uniform2f(gt.texDimensionsUniformLocation,o.width,o.height),t.uniform2f(gt.worldDimensionsUniformLocation,n.width,n.height),t.drawArrays(t.TRIANGLES,0,6);{const c=Qt;Qt=ve,ve=c}return Qt.tex};var Qo=Q(`<p>Add parameters to the simulation. The dimensions of the world in which the particles evolve can
    be changed as well as their size. With larger particles size the effect looks more like a fluid.</p> <canvas id="canvas" style="background-color: black"></canvas> <div><button> </button> <button> </button> <span> </span> <label for="steps">Smooth steps</label> <input type="number"/> <button>Reset</button></div> <div><ul><li><label for="interactionRange">Interaction Range</label> <input id="interactionRange" type="number"/></li> <li><label for="drag">Drag</label> <input id="drag" type="number"/></li> <li><label for="deltaTime">Time step</label> <input id="deltaTime" type="number"/></li> <li><label for="particlesSize">Particles size</label> <input id="particlesSize" type="number"/></li> <li><label for="worldWidth">World: width</label> <input id="worldWidth" type="number"/> <label for="worldHeight">height</label> <input id="worldHeight" type="number"/></li> <ul></ul></ul></div>`,1);function ti(e,t){nt(t,!0);const o={width:800,height:600},n=Ut({width:1200,height:500}),s={width:200,height:20};let l=J(10),r=J(!1),c=J(!0);const a=Ut({interactionRange:6,drag:5,timeStep:10,particlesSize:20});let i,f;function u(){cancelAnimationFrame(f),i=zt(),C(i.canvas);const{ids:d,positions:H,colors:y}=Go({texDimensions:s,worldDimensions:n});Ho(i,{ids:d,colors:y});let ft=Zo(i,{positions:H,texDimensions:s});function rt(){if(C(i.canvas),!T(c))for(let pt=0;pt<T(l);pt++)ft=Jo({gl:i,texDimensions:s,worldDimensions:n,interactionRange:a.interactionRange,drag:a.drag,deltaTime:a.timeStep});return Vo({gl:i,positionTex:ft,texDimensions:s,worldDimensions:n,particlesSize:a.particlesSize,ids:d}),T(r)?setTimeout(()=>f=requestAnimationFrame(rt),1e3):f=requestAnimationFrame(rt)}f=requestAnimationFrame(rt)}ct(()=>u());var h=Qo(),p=m(lt(h),2),g=m(p,2),w=x(g),F=x(w,!0);v(w);var R=m(w,2),_=x(R,!0);v(R);var D=m(R,2),B=x(D);v(D);var E=m(D,4);U(E),A(E,"min",0);var P=m(E,2);v(g);var $=m(g,2),Y=x($),X=x(Y),M=m(x(X),2);U(M),A(M,"min",0),v(X);var b=m(X,2),z=m(x(b),2);U(z),A(z,"min",0),v(b);var W=m(b,2),K=m(x(W),2);U(K),A(K,"min",0),v(W);var k=m(W,2),I=m(x(k),2);U(I),A(I,"min",0),v(k);var N=m(k,2),tt=m(x(N),2);U(tt),A(tt,"min",0);var it=m(tt,4);U(it),A(it,"min",0),v(N),ut(2),v(Y),v($),Et(()=>{A(p,"width",o.width),A(p,"height",o.height),j(F,T(c)?"Play":"Pause"),j(_,T(r)?"Normal Speed":"Slow Mo"),j(B,`particles: ${s.width*s.height}`)}),Z("click",w,()=>q(c,!T(c))),Z("click",R,()=>q(r,!T(r))),L(E,()=>T(l),d=>q(l,d)),Z("click",P,()=>u()),L(M,()=>a.interactionRange,d=>a.interactionRange=d),L(z,()=>a.drag,d=>a.drag=d),L(K,()=>a.timeStep,d=>a.timeStep=d),L(I,()=>a.particlesSize,d=>a.particlesSize=d),L(tt,()=>n.width,d=>n.width=d),L(it,()=>n.height,d=>n.height=d),G(e,h),ot()}Mt(["click"]);const ei=`attribute float id;

uniform float size;
uniform vec2 texDimensions;
uniform vec2 worldDimensions;

uniform sampler2D positionTex;
uniform sampler2D colorTex;

varying float v_color;
varying float v_id;

vec2 getValueFrom2DTextureAs1DArray(sampler2D tex, vec2 dimensions, float index) {
    float y = floor(index / dimensions.x);
    float x = mod(index, dimensions.x);
    vec2 texcoord = (vec2(x, y) + 0.5) / dimensions;
    return texture2D(tex, texcoord).xy;
}

// all shaders have a main function
void main() {
    // pull the color from the texture
    float colorFromTex = getValueFrom2DTextureAs1DArray(colorTex, texDimensions, id).x;

    // pull the position from the texture
    vec2 position = getValueFrom2DTextureAs1DArray(positionTex, texDimensions, id);

    // convert the position from pixels to 0.0 to 1.0
    vec2 zeroToOne = position / worldDimensions;
 
    // convert from 0->1 to 0->2
    vec2 zeroToTwo = zeroToOne * 2.0;
 
    // convert from 0->2 to -1->+1 (clip space)
    vec2 clipSpace = zeroToTwo - 1.0;
 
    // Translate to have 0, 0 on top left
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    gl_PointSize = size;
    v_color = colorFromTex;
    v_id = id / (texDimensions.x * texDimensions.y);
}
`,ni=`precision mediump float;
varying float v_color;
varying float v_id;

const float u_radius = 0.5; // The radius of the particles

void main() {
    float dist = length(gl_PointCoord - vec2(0.5, 0.5)); // Calculate the distance to the center
    if (dist > u_radius) { // If outside the circle, discard the fragment
        discard;
    }

    // if (v_color == 0.0) {
    //     gl_FragColor = vec4(1.0, 0.3, 0.6, 1.0);
    // } else {
    //     gl_FragColor = vec4(0.6, 0.3, 1.0, 1.0);
    // }

    if (v_color == 0.0) {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    } else if (v_color == 1.0) {
        gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
    } else if (v_color == 2.0) {
        gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
    } else {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }

}
`;let Ft,Rt,ke,un;const oi=(e,t)=>{const{ids:o,colors:n,texDimensions:s}=t;Rt=V(e,[ei,ni]),Ft={idAttributeLocation:e.getAttribLocation(Rt,"id"),sizeUniformLocation:e.getUniformLocation(Rt,"size"),texDimensionsUniformLocation:e.getUniformLocation(Rt,"texDimensions"),worldDimensionsUniformLocation:e.getUniformLocation(Rt,"worldDimensions"),positionTexUniformLocation:e.getUniformLocation(Rt,"positionTex"),colorTexUniformLocation:e.getUniformLocation(Rt,"colorTex")},ke=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,ke),e.bufferData(e.ARRAY_BUFFER,new Float32Array(o),e.STATIC_DRAW);const l=n.map(r=>[r,0,0,0]).flat();un=O(e,new Float32Array(l),s.width,s.height)},ii=e=>{const{gl:t,positionTex:o,texDimensions:n,worldDimensions:s,particlesSize:l,ids:r}=e,c=1,a=t.FLOAT,i=!1,f=0,u=0;C(t.canvas),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,t.canvas.width,t.canvas.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.bindBuffer(t.ARRAY_BUFFER,ke),t.vertexAttribPointer(Ft.idAttributeLocation,c,a,i,f,u),t.enableVertexAttribArray(Ft.idAttributeLocation),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,o),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,un),t.useProgram(Rt),t.uniform1f(Ft.sizeUniformLocation,l),t.uniform2f(Ft.worldDimensionsUniformLocation,s.width,s.height),t.uniform2f(Ft.texDimensionsUniformLocation,n.width,n.height),t.uniform1i(Ft.positionTexUniformLocation,0),t.uniform1i(Ft.colorTexUniformLocation,1),t.drawArrays(t.POINTS,u,r.length)};function ri(e,t,o){function n(){const l=e.getElementById(t);l&&(e.fullscreenElement&&e.exitFullscreen&&e.exitFullscreen(),l.width=o.width,l.height=o.height)}function s(){const l=e.getElementById(t);l&&(e.fullscreenElement||l.requestFullscreen())}return e.addEventListener("fullscreenchange",()=>{e.fullscreenElement===null&&n()}),{enableFullscreen:s,disableFullscreen:n}}function ai(e){const{texDimensions:t,worldDimensions:o}=e,n=t.width*t.height,s=new Array(n).fill(0).map((c,a)=>a),l=new Array(n).fill(0).map(c=>Math.floor(Math.random()*3)),r=s.map(c=>{{const{x:i,y:f}=si(o,200);return[i,f,0,0]}}).flat();return{ids:s,positions:r,texDimensions:t,colors:l}}const si=(e,t)=>{const o=t*Math.random(),n=Math.random()*2*Math.PI,s=o*Math.cos(n)+e.width/2,l=o*Math.sin(n)+e.height/2;return{x:s,y:l}},ci=`attribute vec4 position;
void main() {
    gl_Position = position;
}
`,li=`precision highp float;

uniform float interactionRange;
uniform float drag;
uniform float deltaTime;
uniform vec2 texDimensions;
uniform vec2 worldDimensions;

uniform sampler2D positionTex;
uniform sampler2D colorTex;

// We need to define the texture dimensions in constants
// because loops work only with constant values
const float texWidth = {{TEX_WIDTH}};
const float texHeight = {{TEX_HEIGHT}};

const vec2 gravity = vec2(0.0, 0.5);

vec2 euclideanModulo(vec2 n, vec2 m) {
    return mod(mod(n, m) + m, m);
}

float euclideanModulo(float n, float m) {
    return mod(mod(n, m) + m, m);
}

void main() {
    vec2 texcoord = gl_FragCoord.xy / texDimensions;
    vec2 position = texture2D(positionTex, texcoord).xy;
    float color = texture2D(colorTex, texcoord).x;

    vec2 direction = vec2(0.0, 0.0);

    // Iterate on the texture coordinates to compare with each other cell

    for (float y=0.0; y<1.0; y += 1.0 / texHeight) {
        for (float x=0.0; x<1.0; x += 1.0 / texWidth) {
            vec2 otherTextCoord = vec2(x, y);
            vec2 otherPosition = texture2D(positionTex, otherTextCoord).xy;

            vec2 diff = position - otherPosition;
            float mag = length(diff);
            if (mag < interactionRange) {
                float diffCoef = 1.0 / mag;
                if (mag < 1.0) {
                    diffCoef = 1.0;
                }
                direction = direction + (diff * diffCoef);
            }
        }
    }
    direction = (direction * deltaTime * color) / drag;
    direction = direction + gravity;

    vec2 newPosition = position + direction;
    newPosition.x = euclideanModulo(position.x + direction.x, worldDimensions.x);

    if (newPosition.y >= worldDimensions.y - 5.0) {
        newPosition.y = worldDimensions.y - 7.0;
    }

    // if (newPosition.x >= worldDimensions.x - 5.0) {
    //     newPosition.x = worldDimensions.x - 7.0;
    // }

    // if (newPosition.x <  5.0) {
    //     newPosition.x = 7.0;
    // }

    gl_FragColor = vec4(newPosition, 0, 1);
}

`;let mt,dt,Ne,le,Re,cn,ln,te,xe,pn;const fi=(e,t)=>{const{positions:o,colors:n,texDimensions:s}=t,l=li.replace("{{TEX_WIDTH}}",s.width.toFixed(1)).replace("{{TEX_HEIGHT}}",s.height.toFixed(1));dt=V(e,[ci,l]),mt={positionAttributeLocation:e.getAttribLocation(dt,"position"),interactionRangeUniformLocation:e.getUniformLocation(dt,"interactionRange"),dragUniformLocation:e.getUniformLocation(dt,"drag"),deltaTimeUniformLocation:e.getUniformLocation(dt,"deltaTime"),texDimensionsUniformLocation:e.getUniformLocation(dt,"texDimensions"),worldDimensionsUniformLocation:e.getUniformLocation(dt,"worldDimensions"),positionTexUniformLocation:e.getUniformLocation(dt,"positionTex"),colorTexUniformLocation:e.getUniformLocation(dt,"colorTex")},Ne=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,Ne),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW),le=O(e,new Float32Array(o),s.width,s.height),Re=O(e,null,s.width,s.height);const r=n.map(c=>[c,0,0,0]).flat();return pn=O(e,new Float32Array(r),s.width,s.height),cn=et(e,le),ln=et(e,Re),te={fb:cn,tex:le},xe={fb:ln,tex:Re},le},mi=e=>{const{gl:t,texDimensions:o,worldDimensions:n,interactionRange:s,drag:l,deltaTime:r}=e;t.bindFramebuffer(t.FRAMEBUFFER,xe.fb),t.viewport(0,0,o.width,o.height),t.bindBuffer(t.ARRAY_BUFFER,Ne),t.enableVertexAttribArray(mt.positionAttributeLocation),t.vertexAttribPointer(mt.positionAttributeLocation,2,t.FLOAT,!1,0,0),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,te.tex),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,pn),t.useProgram(dt),t.uniform1i(mt.positionTexUniformLocation,0),t.uniform1i(mt.colorTexUniformLocation,1),t.uniform1f(mt.dragUniformLocation,l),t.uniform1f(mt.interactionRangeUniformLocation,s),t.uniform1f(mt.deltaTimeUniformLocation,r),t.uniform2f(mt.texDimensionsUniformLocation,o.width,o.height),t.uniform2f(mt.worldDimensionsUniformLocation,n.width,n.height),t.drawArrays(t.TRIANGLES,0,6);{const c=te;te=xe,xe=c}return te.tex};var di=Q('<canvas id="canvas" style="background-color: black"></canvas> <div><button> </button> <button> </button> <span> </span> <label for="steps">Smooth steps</label> <input type="number"/> <button>Reset</button> <button>Fullscreen</button></div> <div><ul><li><label for="interactionRange">Interaction Range</label> <input id="interactionRange" type="number"/></li> <li><label for="drag">Drag</label> <input id="drag" type="number"/></li> <li><label for="deltaTime">Time step</label> <input id="deltaTime" type="number"/></li> <li><label for="particlesSize">Particles size</label> <input id="particlesSize" type="number"/></li> <li><label for="worldWidth">World: width</label> <input id="worldWidth" type="number"/> <label for="worldHeight">height</label> <input id="worldHeight" type="number"/></li> <ul></ul></ul></div>',1);function ui(e,t){nt(t,!0);const o={width:800,height:600},n=Ut({width:800,height:600}),s={width:500,height:10};let l=J(10),r=J(!1),c=J(!0);const a=Ut({interactionRange:6,drag:5,timeStep:10,particlesSize:4});let i,f;function u(){cancelAnimationFrame(f),i=zt(),C(i.canvas);const{ids:y,positions:ft,colors:rt}=ai({texDimensions:s,worldDimensions:n});oi(i,{ids:y,colors:rt,texDimensions:s});let pt=fi(i,{positions:ft,colors:rt,texDimensions:s});function S(){if(!T(c))for(let At=0;At<T(l);At++)pt=mi({gl:i,texDimensions:s,worldDimensions:n,interactionRange:a.interactionRange,drag:a.drag,deltaTime:a.timeStep});return ii({gl:i,positionTex:pt,texDimensions:s,worldDimensions:n,particlesSize:a.particlesSize,ids:y}),T(r)?setTimeout(()=>f=requestAnimationFrame(S),1e3):f=requestAnimationFrame(S)}f=requestAnimationFrame(S)}const{enableFullscreen:h}=ri(document,"canvas",o);document.addEventListener("keydown",y=>{y.code==="Space"&&(q(c,!T(c)),y.preventDefault())}),ct(()=>u());var p=di(),g=lt(p),w=m(g,2),F=x(w),R=x(F,!0);v(F);var _=m(F,2),D=x(_,!0);v(_);var B=m(_,2),E=x(B);v(B);var P=m(B,4);U(P),A(P,"min",0);var $=m(P,2),Y=m($,2);v(w);var X=m(w,2),M=x(X),b=x(M),z=m(x(b),2);U(z),A(z,"min",0),v(b);var W=m(b,2),K=m(x(W),2);U(K),A(K,"min",0),v(W);var k=m(W,2),I=m(x(k),2);U(I),A(I,"min",0),v(k);var N=m(k,2),tt=m(x(N),2);U(tt),A(tt,"min",0),v(N);var it=m(N,2),d=m(x(it),2);U(d),A(d,"min",0);var H=m(d,4);U(H),A(H,"min",0),v(it),ut(2),v(M),v(X),Et(()=>{A(g,"width",o.width),A(g,"height",o.height),j(R,T(c)?"Play":"Pause"),j(D,T(r)?"Normal Speed":"Slow Mo"),j(E,`particles: ${s.width*s.height}`)}),Z("click",F,()=>q(c,!T(c))),Z("click",_,()=>q(r,!T(r))),L(P,()=>T(l),y=>q(l,y)),Z("click",$,()=>u()),Z("click",Y,h),L(z,()=>a.interactionRange,y=>a.interactionRange=y),L(K,()=>a.drag,y=>a.drag=y),L(I,()=>a.timeStep,y=>a.timeStep=y),L(tt,()=>a.particlesSize,y=>a.particlesSize=y),L(d,()=>n.width,y=>n.width=y),L(H,()=>n.height,y=>n.height=y),G(e,p),ot()}Mt(["click"]);const pi=`attribute float id;

uniform float size;
uniform vec2 texDimensions;
uniform vec2 worldDimensions;

uniform sampler2D positionTex;
uniform sampler2D colorTex;

varying float v_color;
varying float v_id;

vec2 getValueFrom2DTextureAs1DArray(sampler2D tex, vec2 dimensions, float index) {
    float y = floor(index / dimensions.x);
    float x = mod(index, dimensions.x);
    vec2 texcoord = (vec2(x, y) + 0.5) / dimensions;
    return texture2D(tex, texcoord).xy;
}

// all shaders have a main function
void main() {
    // pull the color from the texture
    float colorFromTex = getValueFrom2DTextureAs1DArray(colorTex, texDimensions, id).x;

    // pull the position from the texture
    vec2 position = getValueFrom2DTextureAs1DArray(positionTex, texDimensions, id);

    // convert the position from pixels to 0.0 to 1.0
    vec2 zeroToOne = position / worldDimensions;
 
    // convert from 0->1 to 0->2
    vec2 zeroToTwo = zeroToOne * 2.0;
 
    // convert from 0->2 to -1->+1 (clip space)
    vec2 clipSpace = zeroToTwo - 1.0;
 
    // Translate to have 0, 0 on top left
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    gl_PointSize = size;
    v_color = colorFromTex;
    v_id = id / (texDimensions.x * texDimensions.y);
}
`,vi=`precision mediump float;
varying float v_color;
varying float v_id;

const float u_radius = 0.5; // The radius of the particles

void main() {
    float dist = length(gl_PointCoord - vec2(0.5, 0.5)); // Calculate the distance to the center
    if (dist > u_radius) { // If outside the circle, discard the fragment
        discard;
    }

    if (v_color == 0.0) {
        gl_FragColor = vec4(0.21, 0.64, 0.84, 1.0);
    } else if (v_color == 1.0) {
        gl_FragColor = vec4(0.84, 0.21, 0.64, 1.0);
    } else if (v_color == 2.0) {
        gl_FragColor = vec4(0.64, 0.84, 0.21, 1.0);
    } else {
        // Should not happen
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }

}
`;let Dt,yt,He,vn;const xi=(e,t)=>{const{ids:o,colors:n,texDimensions:s}=t;yt=V(e,[pi,vi]),Dt={idAttributeLocation:e.getAttribLocation(yt,"id"),sizeUniformLocation:e.getUniformLocation(yt,"size"),texDimensionsUniformLocation:e.getUniformLocation(yt,"texDimensions"),worldDimensionsUniformLocation:e.getUniformLocation(yt,"worldDimensions"),positionTexUniformLocation:e.getUniformLocation(yt,"positionTex"),colorTexUniformLocation:e.getUniformLocation(yt,"colorTex")},He=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,He),e.bufferData(e.ARRAY_BUFFER,new Float32Array(o),e.STATIC_DRAW);const l=n.map(r=>[r,0,0,0]).flat();vn=O(e,new Float32Array(l),s.width,s.height)},hi=e=>{const{gl:t,positionTex:o,texDimensions:n,worldDimensions:s,particlesSize:l,ids:r}=e,c=1,a=t.FLOAT,i=!1,f=0,u=0;C(t.canvas),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,t.canvas.width,t.canvas.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.bindBuffer(t.ARRAY_BUFFER,He),t.vertexAttribPointer(Dt.idAttributeLocation,c,a,i,f,u),t.enableVertexAttribArray(Dt.idAttributeLocation),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,o),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,vn),t.useProgram(yt),t.uniform1f(Dt.sizeUniformLocation,l),t.uniform2f(Dt.worldDimensionsUniformLocation,s.width,s.height),t.uniform2f(Dt.texDimensionsUniformLocation,n.width,n.height),t.uniform1i(Dt.positionTexUniformLocation,0),t.uniform1i(Dt.colorTexUniformLocation,1),t.drawArrays(t.POINTS,u,r.length)};function Ti(e,t,o){function n(){const l=e.getElementById(t);l&&(e.fullscreenElement&&e.exitFullscreen&&e.exitFullscreen(),l.width=o.width,l.height=o.height)}function s(){const l=e.getElementById(t);l&&(e.fullscreenElement||l.requestFullscreen())}return e.addEventListener("fullscreenchange",()=>{e.fullscreenElement===null&&n()}),{enableFullscreen:s,disableFullscreen:n}}function gi(e){const{texDimensions:t,worldDimensions:o,nbColors:n}=e,s=t.width*t.height,l=new Array(s).fill(0).map((a,i)=>i),r=new Array(s).fill(0).map(a=>Math.floor(Math.random()*n)),c=l.map(a=>{{const{x:i,y:f}=bi(o,a,s);return[i,f,0,0]}}).flat();return{ids:l,positions:c,texDimensions:t,colors:r}}const bi=(e,t,o)=>{const n=Math.sqrt(o),s=Math.ceil(o/n),l=e.width/s,r=e.height/n,c=t%s*l+l/2,a=Math.floor(t/s)*r+r/2;return{x:c,y:a}},Ai=`attribute vec4 position;
void main() {
    gl_Position = position;
}
`,_i=`precision highp float;

uniform float wallsMode;    // 0.0: wraped 1.0: box 2.0: bottom wall
uniform float gravityFactor;
uniform float interactionRange;
uniform float drag;
uniform float deltaTime;
uniform vec2 texDimensions;
uniform vec2 worldDimensions;

uniform sampler2D positionTex;
uniform sampler2D colorTex;

// We need to define the texture dimensions in constants
// because loops work only with constant values
const float texWidth = {{TEX_WIDTH}};
const float texHeight = {{TEX_HEIGHT}};

const vec2 gravity = vec2(0.0, 0.5);

vec2 euclideanModulo(vec2 n, vec2 m) {
    return mod(mod(n, m) + m, m);
}

float euclideanModulo(float n, float m) {
    return mod(mod(n, m) + m, m);
}

vec2 newPosition_box(vec2 position, vec2 direction) {
    vec2 newPosition = position + direction;
    if (newPosition.y >= worldDimensions.y - 5.0) {
        newPosition.y = worldDimensions.y - 7.0;
    } else if (newPosition.y <  5.0) {
        newPosition.y = 7.0;
    }

    if (newPosition.x >= worldDimensions.x - 5.0) {
        newPosition.x = worldDimensions.x - 7.0;
    } else if (newPosition.x <  5.0) {
        newPosition.x = 7.0;
    }
    return newPosition;
}

vec2 newPosition_bottomWall(vec2 position, vec2 direction) {
    vec2 newPosition = position + direction;
    newPosition.x = euclideanModulo(position.x + direction.x, worldDimensions.x);
    if (newPosition.y >= worldDimensions.y - 5.0) {
        newPosition.y = worldDimensions.y - 7.0;
    }
    return newPosition;
}

vec2 newPosition_wrapWorld(vec2 position, vec2 direction) {
    return euclideanModulo(position + direction, worldDimensions);
}

vec2 getNewPosition(float wallsMode, vec2 position, vec2 direction) {
    if (wallsMode == 0.0) {
        // Wrapped world
        return newPosition_wrapWorld(position, direction);
    }

    if (wallsMode == 1.0) {
        // Box
        return newPosition_box(position, direction);
    }

    // Bottom wall - horizontal wrap
    return newPosition_bottomWall(position, direction);
}

void main() {
    vec2 texcoord = gl_FragCoord.xy / texDimensions;
    vec2 position = texture2D(positionTex, texcoord).xy;
    float color = texture2D(colorTex, texcoord).x;

    vec2 direction = vec2(0.0, 0.0);

    // Iterate on the texture coordinates to compare with each other cell

    for (float y=0.0; y<1.0; y += 1.0 / texHeight) {
        for (float x=0.0; x<1.0; x += 1.0 / texWidth) {
            vec2 otherTextCoord = vec2(x, y);
            vec2 otherPosition = texture2D(positionTex, otherTextCoord).xy;
            float otherColor = texture2D(colorTex, otherTextCoord).x;

            vec2 diff = position - otherPosition;
            float mag = length(diff);
            if (mag < interactionRange) {
                float diffCoef = 1.0 / mag;
                if (mag < 1.0) {
                    diffCoef = 1.0;
                }

                float colorCoef = 1.0;
                // if (color == otherColor) {
                //     colorCoef = 2.0;
                // }

                direction = direction + (diff * diffCoef * colorCoef);
            }
        }
    }
    direction = (direction * deltaTime) / drag;
    direction = direction + gravity * gravityFactor;

    vec2 newPosition = getNewPosition(wallsMode, position, direction);

    gl_FragColor = vec4(newPosition, 0, 1);
}
`;let at,st,Ve,fe,De,fn,mn,ee,he,xn;const wi=(e,t)=>{const{positions:o,colors:n,texDimensions:s}=t,l=_i.replace("{{TEX_WIDTH}}",s.width.toFixed(1)).replace("{{TEX_HEIGHT}}",s.height.toFixed(1));st=V(e,[Ai,l]),at={positionAttributeLocation:e.getAttribLocation(st,"position"),wallsModeUniformLocation:e.getUniformLocation(st,"wallsMode"),gravityFactorUniformLocation:e.getUniformLocation(st,"gravityFactor"),interactionRangeUniformLocation:e.getUniformLocation(st,"interactionRange"),dragUniformLocation:e.getUniformLocation(st,"drag"),deltaTimeUniformLocation:e.getUniformLocation(st,"deltaTime"),texDimensionsUniformLocation:e.getUniformLocation(st,"texDimensions"),worldDimensionsUniformLocation:e.getUniformLocation(st,"worldDimensions"),positionTexUniformLocation:e.getUniformLocation(st,"positionTex"),colorTexUniformLocation:e.getUniformLocation(st,"colorTex")},Ve=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,Ve),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW),fe=O(e,new Float32Array(o),s.width,s.height),De=O(e,null,s.width,s.height);const r=n.map(c=>[c,0,0,0]).flat();return xn=O(e,new Float32Array(r),s.width,s.height),fn=et(e,fe),mn=et(e,De),ee={fb:fn,tex:fe},he={fb:mn,tex:De},fe},Fi=e=>{const{gl:t,texDimensions:o,worldDimensions:n,wallsMode:s,gravityFactor:l,interactionRange:r,drag:c,deltaTime:a}=e;t.bindFramebuffer(t.FRAMEBUFFER,he.fb),t.viewport(0,0,o.width,o.height),t.bindBuffer(t.ARRAY_BUFFER,Ve),t.enableVertexAttribArray(at.positionAttributeLocation),t.vertexAttribPointer(at.positionAttributeLocation,2,t.FLOAT,!1,0,0),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,ee.tex),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,xn),t.useProgram(st),t.uniform1i(at.positionTexUniformLocation,0),t.uniform1i(at.colorTexUniformLocation,1);const f={wraped:0,box:1,bottom_wall:2}[s];t.uniform1f(at.wallsModeUniformLocation,f),t.uniform1f(at.gravityFactorUniformLocation,l),t.uniform1f(at.dragUniformLocation,c),t.uniform1f(at.interactionRangeUniformLocation,r),t.uniform1f(at.deltaTimeUniformLocation,a),t.uniform2f(at.texDimensionsUniformLocation,o.width,o.height),t.uniform2f(at.worldDimensionsUniformLocation,n.width,n.height),t.drawArrays(t.TRIANGLES,0,6);{const u=ee;ee=he,he=u}return ee.tex};var Ri=Q("<option> </option>"),Di=Q('<canvas id="canvas" style="background-color: black"></canvas> <div><button> </button> <button> </button> <span> </span> <label for="steps">Smooth steps</label> <input type="number"/> <button>Reset</button> <button>Fullscreen</button></div> <div><ul><li><label for="interactionRange">Interaction Range</label> <input id="interactionRange" type="number"/></li> <li><label for="drag">Drag</label> <input id="drag" type="number"/></li> <li><label for="deltaTime">Time step</label> <input id="deltaTime" type="number"/></li> <li><label for="gravityFactor">Gravity factor</label> <input id="gravityFactor" type="number"/></li> <li><label for="particlesSize">Particles size</label> <input id="particlesSize" type="number"/></li> <li><label for="worldWidth">World: width</label> <input id="worldWidth" type="number"/> <label for="worldHeight">height</label> <input id="worldHeight" type="number"/></li> <li><label for="wallsMode">Walls mode</label> <select></select></li> <ul></ul></ul></div>',1);function yi(e,t){nt(t,!0);const o={width:800,height:600},n=Ut({width:800,height:600}),s={width:500,height:10};let l=J(10),r=J(!1),c=J(!0);const a=Ut({interactionRange:10,drag:5,timeStep:10,particlesSize:3,gravityFactor:0,wallsMode:"wraped"});let i,f;function u(){cancelAnimationFrame(f),i=zt(),C(i.canvas);const{ids:S,positions:At,colors:_t}=gi({texDimensions:s,worldDimensions:n,nbColors:1});xi(i,{ids:S,colors:_t,texDimensions:s});let ne=wi(i,{positions:At,colors:_t,texDimensions:s});function Xt(){if(!T(c))for(let Ge=0;Ge<T(l);Ge++)ne=Fi({gl:i,texDimensions:s,worldDimensions:n,interactionRange:a.interactionRange,drag:a.drag,deltaTime:a.timeStep,gravityFactor:a.gravityFactor,wallsMode:a.wallsMode});return hi({gl:i,positionTex:ne,texDimensions:s,worldDimensions:n,particlesSize:a.particlesSize,ids:S}),T(r)?setTimeout(()=>f=requestAnimationFrame(Xt),1e3):f=requestAnimationFrame(Xt)}f=requestAnimationFrame(Xt)}const{enableFullscreen:h}=Ti(document,"canvas",o);document.addEventListener("keydown",S=>{S.code==="Space"&&(q(c,!T(c)),S.preventDefault())}),ct(()=>u());var p=Di(),g=lt(p),w=m(g,2),F=x(w),R=x(F,!0);v(F);var _=m(F,2),D=x(_,!0);v(_);var B=m(_,2),E=x(B);v(B);var P=m(B,4);U(P),A(P,"min",0);var $=m(P,2),Y=m($,2);v(w);var X=m(w,2),M=x(X),b=x(M),z=m(x(b),2);U(z),A(z,"min",0),v(b);var W=m(b,2),K=m(x(W),2);U(K),A(K,"min",0),v(W);var k=m(W,2),I=m(x(k),2);U(I),A(I,"min",0),v(k);var N=m(k,2),tt=m(x(N),2);U(tt),A(tt,"min",-5),A(tt,"max",5),v(N);var it=m(N,2),d=m(x(it),2);U(d),A(d,"min",0),v(it);var H=m(it,2),y=m(x(H),2);U(y),A(y,"min",0);var ft=m(y,4);U(ft),A(ft,"min",0),v(H);var rt=m(H,2),pt=m(x(rt),2);ye(pt,20,()=>["box","wraped","bottom_wall"],Ee,(S,At)=>{var _t=Ri(),ne=x(_t,!0);v(_t);var Xt={};Et(()=>{j(ne,At),Xt!==(Xt=At)&&(_t.value=(_t.__value=At)??"")}),G(S,_t)}),v(pt),v(rt),ut(2),v(M),v(X),Et(()=>{A(g,"width",o.width),A(g,"height",o.height),j(R,T(c)?"Play":"Pause"),j(D,T(r)?"Normal Speed":"Slow Mo"),j(E,`particles: ${s.width*s.height}`)}),Z("click",F,()=>q(c,!T(c))),Z("click",_,()=>q(r,!T(r))),L(P,()=>T(l),S=>q(l,S)),Z("click",$,()=>u()),Z("click",Y,h),L(z,()=>a.interactionRange,S=>a.interactionRange=S),L(K,()=>a.drag,S=>a.drag=S),L(I,()=>a.timeStep,S=>a.timeStep=S),L(tt,()=>a.gravityFactor,S=>a.gravityFactor=S),L(d,()=>a.particlesSize,S=>a.particlesSize=S),L(y,()=>n.width,S=>n.width=S),L(ft,()=>n.height,S=>n.height=S),gn(pt,()=>a.wallsMode,S=>a.wallsMode=S),G(e,p),ot()}Mt(["click"]);var Ei=Q("<h1>Coucou</h1>");function Ui(e,t){nt(t,!1);const o=bn({extensions:["OES_texture_float"]}),n=512,s=64,l=Array(2).fill(0).map(()=>o.framebuffer({radius:n,colorType:"float",depthStencil:!1})),r=o({vert:`
  precision mediump float;
  attribute vec2 position;
  void main () {
    gl_Position = vec4(position, 0, 1);
  }
  `,frag:`
  precision highp float;
  uniform sampler2D state;
  uniform float shapeX, shapeY, deltaT, gravity;
  void main () {
    vec2 shape = vec2(shapeX, shapeY);
    vec4 prevState = texture2D(state,
      gl_FragCoord.xy / shape);
    vec2 position = prevState.xy;
    vec2 velocity = prevState.zw;
    position += 0.5 * velocity * deltaT;
    if (position.x < -1.0 || position.x > 1.0) {
      velocity.x *= -1.0;
    }
    if (position.y < -1.0 || position.y > 1.0) {
      velocity.y *= -1.0;
    }
    position += 0.5 * velocity * deltaT;
    velocity.y = velocity.y + gravity * deltaT;
    gl_FragColor = vec4(position, velocity);
  }
  `,depth:{enable:!1},framebuffer:p=>l[(p.tick+1)%2],uniforms:{state:({tick:p})=>l[p%2],shapeX:o.context("viewportWidth"),shapeY:o.context("viewportHeight"),deltaT:.1,gravity:-.5},attributes:{position:[0,-4,4,4,-4,4]},primitive:"triangles",elements:null,offset:0,count:3}),c=o({vert:`
  precision highp float;
  attribute vec2 sprite;
  uniform sampler2D state;
  varying vec2 rg;
  void main () {
    vec2 position = texture2D(state, sprite).xy;
    gl_PointSize = 16.0;
    rg = sprite;
    gl_Position = vec4(position, 0, 1);
  }
  `,frag:`
  precision highp float;
  varying vec2 rg;
  void main () {
    gl_FragColor = vec4(rg, 1.0 - max(rg.x, rg.y), 1);
  }
  `,attributes:{sprite:Array(n*n).fill(0).map(function(p,g){const w=g%n,F=g/n|0;return[w/n,F/n]}).reverse()},uniforms:{state:({tick:p})=>l[p%2]},primitive:"points",offset:(p,g)=>n*n-g.count,elements:null,count:o.prop("count")});let a=0;const i={data:new Float32Array(4*s),width:s,height:1},f=document.createElement("div");Object.assign(f.style,{color:"white",position:"absolute",left:"20px",top:"20px","z-index":20}),document.body.appendChild(f);function u(p,g,w){return Math.min(Math.max(2*w*p/g-1,-.999),.999)}o.frame(({tick:p,drawingBufferWidth:g,drawingBufferHeight:w,pixelRatio:F})=>{const R=u(100,g,F),_=-u(100,w,F);if(Math.random()<.01){for(let D=0;D<s;++D)i.data[4*D]=R,i.data[4*D+1]=_,i.data[4*D+2]=.25*(Math.random()-.5),i.data[4*D+3]=Math.random();l[p%2].color[0].subimage(i,a%n,(a/n|0)%n),a+=s,f.innerText=Math.min(a,n*n).toString()}r(),o.clear({color:[0,0,0,1],depth:1}),c({count:Math.min(a,n*n)})}),Lt();var h=Ei();G(e,h),ot()}var Li=Q("<!> <!>",1),Pi=Q("<p>This page is an experiment to run simulation on the GPU.</p>"),Bi=Q("<!> <!> <!>",1),Si=Q("<div><!></div>");function Ci(e){const t=[{title:"test 1",component:Dn},{title:"test 2",component:Un},{title:"test 3",component:In},{title:"test 4",component:Wn},{title:"test 5",component:Vn},{title:"test 6",component:oo},{title:"test 7",component:xo},{title:"test 8",component:Lo},{title:"test 9",component:Yo},{title:"test 10",component:ti},{title:"test 11",component:ui},{title:"test 12",component:yi},{title:"regl",component:Ui}];var o=Si(),n=x(o);hn(n,{children:(s,l)=>{var r=Bi(),c=lt(r);Tn(c,{children:(f,u)=>{var h=Li(),p=lt(h);je(p,{children:(w,F)=>{ut();var R=qe("About");G(w,R)},$$slots:{default:!0}});var g=m(p,2);ye(g,1,()=>t,Ee,(w,F)=>{je(w,{children:(R,_)=>{ut();var D=qe();Et(()=>j(D,T(F).title)),G(R,D)},$$slots:{default:!0}})}),G(f,h)},$$slots:{default:!0}});var a=m(c,2);Ke(a,{children:(f,u)=>{var h=Pi();G(f,h)},$$slots:{default:!0}});var i=m(a,2);ye(i,1,()=>t,Ee,(f,u)=>{Ke(f,{children:(h,p)=>{T(u).component(h,{})},$$slots:{default:!0}})}),G(s,r)},$$slots:{default:!0}}),v(o),G(e,o)}function qi(e,t){nt(t,!1),An.set({name:"Shader Tests"}),Lt(),Ci(e),ot()}export{qi as component};
