import{S as Yt,i as Vt,s as Ht,k as h,q as F,a as g,l as p,m as x,r as R,h as d,c as A,n as v,b as D,H as l,B as ct,o as ee,p as ie,J as V,I as S,u as te,L as $,M as ke,U as ai,V as To,O as oo,W as si,w as ve,x as Le,y as xe,f as Wt,t as Jt,z as Te,e as wn,g as io,d as ro,v as _o}from"../../../chunks/index-5889ba45.js";import{T as li,a as ci,b as jo,c as Ko}from"../../../chunks/TabPanel-cbabbdaa.js";import{R as fi}from"../../../chunks/regl-787a2c81.js";const ui=["VERTEX_SHADER","FRAGMENT_SHADER"];function Ce(){const e=document.getElementById("canvas");if(!e)throw"canvas undefined";const t=e.getContext("webgl");if(!t)throw"gl undefined";return En(t),t}function En(e){if(!e.getExtension("OES_texture_float"))throw alert("Need OES_texture_float"),"Need OES_texture_float";if(!e.getExtension("WEBGL_color_buffer_float"))throw alert("Need WEBGL_color_buffer_float"),"Need WEBGL_color_buffer_float";if(e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS)<1)throw alert("Can not use textures in vertex shaders"),"Can not use textures in vertex shaders"}function Ft(e,t,o,n){const i=e.createTexture();if(!i)throw"Can not create texture";return e.bindTexture(e.TEXTURE_2D,i),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,o,n,0,e.RGBA,e.FLOAT,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),i}function Xt(e,t){const o=e.createFramebuffer();if(!o)throw"Can not create frame buffer";return e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),o}function yt(e,t,o,n,i){const s=[];for(let r=0;r<t.length;++r){const f=ui[r]==="VERTEX_SHADER"?e.VERTEX_SHADER:e.FRAGMENT_SHADER,c=di(e,t[r],f,i);if(!c)throw"Can not create shader";s.push(c)}const a=mi(e,s,o,n,i);if(!a)throw"Can not create program";return a}function di(e,t,o,n){const i=n||console.log,s=e.createShader(o);if(!s)throw"Could not load shader";if(e.shaderSource(s,t),e.compileShader(s),!e.getShaderParameter(s,e.COMPILE_STATUS)){const r=e.getShaderInfoLog(s);return i(new Error("*** Error compiling shader '"+s+"':"+r+`
`+t.split(`
`).map((f,c)=>`${c+1}: ${f}`).join(`
`))),e.deleteShader(s),null}return s}function mi(e,t,o,n,i){const s=i||console.log,a=e.createProgram();if(!a)throw"Could not create program";if(t.forEach(function(f){e.attachShader(a,f)}),o&&o.forEach(function(f,c){e.bindAttribLocation(a,n?n[c]:c,f)}),e.linkProgram(a),!e.getProgramParameter(a,e.LINK_STATUS)){const f=e.getProgramInfoLog(a);return s("Error in program linking:"+f),e.deleteProgram(a),null}return a}function Tt(e,t){t=t||1;const o=e.clientWidth*t|0,n=e.clientHeight*t|0;return e.width!==o||e.height!==n?(e.width=o,e.height=n,!0):!1}function hi(e){let t,o,n,i,s,a,r,f,c,u,m,T;return{c(){t=h("p"),o=F(`This is not super impressive but this page takes 9 integers and uses a compute shader to
    multiply them by two. It's a first step!`),n=g(),i=h("p"),s=F(`It is reusing the code from
    `),a=h("a"),r=F(`this site
    `),f=F("."),c=g(),u=h("ul"),m=g(),T=h("canvas"),this.h()},l(b){t=p(b,"P",{});var _=x(t);o=R(_,`This is not super impressive but this page takes 9 integers and uses a compute shader to
    multiply them by two. It's a first step!`),_.forEach(d),n=A(b),i=p(b,"P",{});var U=x(i);s=R(U,`It is reusing the code from
    `),a=p(U,"A",{target:!0,href:!0});var P=x(a);r=R(P,`this site
    `),P.forEach(d),f=R(U,"."),U.forEach(d),c=A(b),u=p(b,"UL",{id:!0}),x(u).forEach(d),m=A(b),T=p(b,"CANVAS",{id:!0}),x(T).forEach(d),this.h()},h(){v(a,"target","none"),v(a,"href","https://webglfundamentals.org/webgl/lessons/webgl-gpgpu.html"),v(u,"id","result"),v(T,"id","canvas")},m(b,_){D(b,t,_),l(t,o),D(b,n,_),D(b,i,_),l(i,s),l(i,a),l(a,r),l(i,f),D(b,c,_),D(b,u,_),D(b,m,_),D(b,T,_)},p:ct,i:ct,o:ct,d(b){b&&d(t),b&&d(n),b&&d(i),b&&d(c),b&&d(u),b&&d(m),b&&d(T)}}}function pi(e){const t=document.createElement("li");t.textContent=e.toString();const o=document.getElementById("result");if(!o)throw"result element undefined";o.appendChild(t)}function vi(e){function t(){const o=`
    attribute vec4 position;
    void main() {
      gl_Position = position;
    }
    `,n=`
    precision highp float;

    uniform sampler2D srcTex;
    uniform vec2 srcDimensions;

    void main() {
      vec2 texcoord = gl_FragCoord.xy / srcDimensions;
      vec4 value = texture2D(srcTex, texcoord);
      gl_FragColor = value * 2.0;
    }
    `,a=document.createElement("canvas");a.width=3,a.height=3;const r=a.getContext("webgl");if(!r)throw"Coulndt get context";const f=yt(r,[o,n]);if(!f)throw"Could not get program";const c=r.getAttribLocation(f,"position"),u=r.getUniformLocation(f,"srcTex"),m=r.getUniformLocation(f,"srcDimensions"),T=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,T),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),r.STATIC_DRAW),r.enableVertexAttribArray(c),r.vertexAttribPointer(c,2,r.FLOAT,!1,0,0);const b=3,_=3,U=r.createTexture();r.bindTexture(r.TEXTURE_2D,U),r.pixelStorei(r.UNPACK_ALIGNMENT,1),r.texImage2D(r.TEXTURE_2D,0,r.LUMINANCE,b,_,0,r.LUMINANCE,r.UNSIGNED_BYTE,new Uint8Array([1,2,3,4,5,6,70,80,90])),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),r.useProgram(f),r.uniform1i(u,0),r.uniform2f(m,b,_),r.drawArrays(r.TRIANGLES,0,6);const P=new Uint8Array(3*3*4);r.readPixels(0,0,3,3,r.RGBA,r.UNSIGNED_BYTE,P);for(let I=0;I<3*3;++I)pi(P[I*4])}return ee(t),[]}class xi extends Yt{constructor(t){super(),Vt(this,t,vi,hi,Ht,{})}}const Ti=Float32Array;function Jo(e,t,o,n,i,s){const a=new Ti(16);return a[0]=2/(t-e),a[1]=0,a[2]=0,a[3]=0,a[4]=0,a[5]=2/(n-o),a[6]=0,a[7]=0,a[8]=0,a[9]=0,a[10]=2/(i-s),a[11]=0,a[12]=(e+t)/(e-t),a[13]=(o+n)/(o-n),a[14]=(i+s)/(i-s),a[15]=1,a}function _i(e){let t,o,n,i,s,a,r;return{c(){t=h("p"),o=F(`This is the simple particles simulation from
    `),n=h("a"),i=F("webglfundamentals"),s=F(" directly copied in a svelte component."),a=g(),r=h("canvas"),this.h()},l(f){t=p(f,"P",{});var c=x(t);o=R(c,`This is the simple particles simulation from
    `),n=p(c,"A",{target:!0,href:!0});var u=x(n);i=R(u,"webglfundamentals"),u.forEach(d),s=R(c," directly copied in a svelte component."),c.forEach(d),a=A(f),r=p(f,"CANVAS",{id:!0,style:!0,width:!0,height:!0}),x(r).forEach(d),this.h()},h(){v(n,"target","none"),v(n,"href","https://webglfundamentals.org/webgl/lessons/webgl-gpgpu.html"),v(r,"id","canvas"),ie(r,"background-color","black"),v(r,"width","800"),v(r,"height","600")},m(f,c){D(f,t,c),l(t,o),l(t,n),l(n,i),l(t,s),D(f,a,c),D(f,r,c)},p:ct,i:ct,o:ct,d(f){f&&d(t),f&&d(a),f&&d(r)}}}function gi(e){function t(){const o=`
  attribute vec4 position;
  void main() {
    gl_Position = position;
  }
  `,n=`
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
  `,i=`
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
  `,s=`
  precision highp float;
  void main() {
    gl_FragColor = vec4(0.4, 0.2, 0.9, 0.5);
  }
  `,a=document.getElementById("canvas");if(!a)throw"canvas undefined";const r=a.getContext("webgl");if(!r)throw"gl undefined";if(!r.getExtension("OES_texture_float"))throw alert("Need OES_texture_float"),"Need OES_texture_float";if(!r.getExtension("WEBGL_color_buffer_float"))throw alert("Need WEBGL_color_buffer_float"),"Need WEBGL_color_buffer_float";if(r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS)<1)throw alert("Can not use textures in vertex shaders"),"Can not use textures in vertex shaders";const u=yt(r,[o,n]),m=yt(r,[i,s]);if(!u||!m)throw"Can not create programs";const T={position:r.getAttribLocation(u,"position"),positionTex:r.getUniformLocation(u,"positionTex"),velocityTex:r.getUniformLocation(u,"velocityTex"),texDimensions:r.getUniformLocation(u,"texDimensions"),canvasDimensions:r.getUniformLocation(u,"canvasDimensions"),deltaTime:r.getUniformLocation(u,"deltaTime")},b={id:r.getAttribLocation(m,"id"),positionTex:r.getUniformLocation(m,"positionTex"),texDimensions:r.getUniformLocation(m,"texDimensions"),matrix:r.getUniformLocation(m,"matrix")},_=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,_),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),r.STATIC_DRAW);const U=300,P=20,I=U*P,k=new Array(I).fill(0).map((E,ft)=>ft),G=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,G),r.bufferData(r.ARRAY_BUFFER,new Float32Array(k),r.STATIC_DRAW),Tt(r.canvas);const X=(E,ft)=>(ft===void 0&&(ft=E,E=0),Math.random()*(ft-E)+E),j=new Float32Array(k.map(E=>[X(a.width),X(a.height),0,0]).flat()),J=new Float32Array(k.map(E=>[X(-300,300),X(-300,300),0,0]).flat());function H(E,ft,tt,rt){const wt=E.createTexture();return E.bindTexture(E.TEXTURE_2D,wt),E.texImage2D(E.TEXTURE_2D,0,E.RGBA,tt,rt,0,E.RGBA,E.FLOAT,ft),E.texParameteri(E.TEXTURE_2D,E.TEXTURE_MIN_FILTER,E.NEAREST),E.texParameteri(E.TEXTURE_2D,E.TEXTURE_MAG_FILTER,E.NEAREST),E.texParameteri(E.TEXTURE_2D,E.TEXTURE_WRAP_S,E.CLAMP_TO_EDGE),E.texParameteri(E.TEXTURE_2D,E.TEXTURE_WRAP_T,E.CLAMP_TO_EDGE),wt}const it=H(r,J,U,P),Z=H(r,j,U,P),M=H(r,null,U,P);if(!Z||!M)throw"Can not create position textures";function nt(E,ft){const tt=E.createFramebuffer();return E.bindFramebuffer(E.FRAMEBUFFER,tt),E.framebufferTexture2D(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,ft,0),tt}const q=nt(r,Z),w=nt(r,M);let C={fb:q,tex:Z},Q={fb:w,tex:M},ot=0;function xt(E){if(!r)return;E*=.001;const ft=E-ot;ot=E,Tt(r.canvas),r.bindFramebuffer(r.FRAMEBUFFER,Q.fb),r.viewport(0,0,U,P),r.bindBuffer(r.ARRAY_BUFFER,_),r.enableVertexAttribArray(T.position),r.vertexAttribPointer(T.position,2,r.FLOAT,!1,0,0),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,C.tex),r.activeTexture(r.TEXTURE0+1),r.bindTexture(r.TEXTURE_2D,it),r.useProgram(u),r.uniform1i(T.positionTex,0),r.uniform1i(T.velocityTex,1),r.uniform2f(T.texDimensions,U,P),r.uniform2f(T.canvasDimensions,r.canvas.width,r.canvas.height),r.uniform1f(T.deltaTime,ft),r.drawArrays(r.TRIANGLES,0,6),r.bindFramebuffer(r.FRAMEBUFFER,null),r.viewport(0,0,r.canvas.width,r.canvas.height),r.bindBuffer(r.ARRAY_BUFFER,G),r.enableVertexAttribArray(b.id),r.vertexAttribPointer(b.id,1,r.FLOAT,!1,0,0),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,Q.tex),r.useProgram(m),r.uniform2f(b.texDimensions,U,U),r.uniform1i(b.positionTex,0),r.uniformMatrix4fv(b.matrix,!1,Jo(0,r.canvas.width,0,r.canvas.height,-1,1)),r.drawArrays(r.POINTS,0,I);{const tt=C;C=Q,Q=tt}requestAnimationFrame(xt)}requestAnimationFrame(xt)}return ee(()=>t()),[]}class Ai extends Yt{constructor(t){super(),Vt(this,t,gi,_i,Ht,{})}}const sn=(e,t)=>(t===void 0&&(t=e,e=0),Math.random()*(t-e)+e);function bi(e,t,o,n){const i=e*t,s=new Array(i).fill(0).map((f,c)=>c),a=new Float32Array(s.map(f=>[sn(o),sn(n),0,0]).flat()),r=new Float32Array(s.map(f=>[sn(-300,300),sn(-300,300),0,0]).flat());return{numParticles:i,ids:new Float32Array(s),positions:a,velocities:r}}const wi=`attribute vec4 position;
void main() {
    gl_Position = position;
}
`,Ei=`precision highp float;

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

`,Fi=`  attribute float id;
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

`,Ri=`precision highp float;
void main() {
    gl_FragColor = vec4(0.2, 0.4, 0.9, 0.5);
}

`;function yi(e){let t,o,n,i,s,a,r;return{c(){t=h("p"),o=F(`This is the simple particles simulation from
    `),n=h("a"),i=F("webglfundamentals"),s=F(" with the shader code extracted into separate files."),a=g(),r=h("canvas"),this.h()},l(f){t=p(f,"P",{});var c=x(t);o=R(c,`This is the simple particles simulation from
    `),n=p(c,"A",{target:!0,href:!0});var u=x(n);i=R(u,"webglfundamentals"),u.forEach(d),s=R(c," with the shader code extracted into separate files."),c.forEach(d),a=A(f),r=p(f,"CANVAS",{id:!0,style:!0,width:!0,height:!0}),x(r).forEach(d),this.h()},h(){v(n,"target","none"),v(n,"href","https://webglfundamentals.org/webgl/lessons/webgl-gpgpu.html"),v(r,"id","canvas"),ie(r,"background-color","black"),v(r,"width","800"),v(r,"height","600")},m(f,c){D(f,t,c),l(t,o),l(t,n),l(n,i),l(t,s),D(f,a,c),D(f,r,c)},p:ct,i:ct,o:ct,d(f){f&&d(t),f&&d(a),f&&d(r)}}}function Di(e){function t(){const i=document.getElementById("canvas");if(!i)throw"canvas undefined";const s=i.getContext("webgl");if(!s)throw"gl undefined";En(s);const a=yt(s,[wi,Ei]),r=yt(s,[Fi,Ri]),f={position:s.getAttribLocation(a,"position"),positionTex:s.getUniformLocation(a,"positionTex"),velocityTex:s.getUniformLocation(a,"velocityTex"),texDimensions:s.getUniformLocation(a,"texDimensions"),canvasDimensions:s.getUniformLocation(a,"canvasDimensions"),deltaTime:s.getUniformLocation(a,"deltaTime")},c={id:s.getAttribLocation(r,"id"),positionTex:s.getUniformLocation(r,"positionTex"),texDimensions:s.getUniformLocation(r,"texDimensions"),matrix:s.getUniformLocation(r,"matrix")},u=s.createBuffer();s.bindBuffer(s.ARRAY_BUFFER,u),s.bufferData(s.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),s.STATIC_DRAW);const m=300,T=20,{numParticles:b,ids:_,positions:U,velocities:P}=bi(m,T,i.width,i.height),I=s.createBuffer();s.bindBuffer(s.ARRAY_BUFFER,I),s.bufferData(s.ARRAY_BUFFER,new Float32Array(_),s.STATIC_DRAW),Tt(s.canvas);const k=Ft(s,P,m,T),G=Ft(s,U,m,T),X=Ft(s,null,m,T),j=Xt(s,G),J=Xt(s,X);let H={fb:j,tex:G},it={fb:J,tex:X},Z=0;function M(nt){if(!s||!u||!I)throw"Undefined params to render";nt*=.001;const q=nt-Z;Z=nt,Tt(s.canvas),n(s,it,m,T,u,f,H,k,a,q),o(s,m,I,c,it,r,b);{const w=H;H=it,it=w}requestAnimationFrame(M)}requestAnimationFrame(M)}const o=(i,s,a,r,f,c,u)=>{i.bindFramebuffer(i.FRAMEBUFFER,null),i.viewport(0,0,i.canvas.width,i.canvas.height),i.bindBuffer(i.ARRAY_BUFFER,a),i.enableVertexAttribArray(r.id),i.vertexAttribPointer(r.id,1,i.FLOAT,!1,0,0),i.activeTexture(i.TEXTURE0),i.bindTexture(i.TEXTURE_2D,f.tex),i.useProgram(c),i.uniform2f(r.texDimensions,s,s),i.uniform1i(r.positionTex,0),i.uniformMatrix4fv(r.matrix,!1,Jo(0,i.canvas.width,0,i.canvas.height,-1,1)),i.drawArrays(i.POINTS,0,u)},n=(i,s,a,r,f,c,u,m,T,b)=>{i.bindFramebuffer(i.FRAMEBUFFER,s.fb),i.viewport(0,0,a,r),i.bindBuffer(i.ARRAY_BUFFER,f),i.enableVertexAttribArray(c.position),i.vertexAttribPointer(c.position,2,i.FLOAT,!1,0,0),i.activeTexture(i.TEXTURE0),i.bindTexture(i.TEXTURE_2D,u.tex),i.activeTexture(i.TEXTURE0+1),i.bindTexture(i.TEXTURE_2D,m),i.useProgram(T),i.uniform1i(c.positionTex,0),i.uniform1i(c.velocityTex,1),i.uniform2f(c.texDimensions,a,r),i.uniform2f(c.canvasDimensions,i.canvas.width,i.canvas.height),i.uniform1f(c.deltaTime,b),i.drawArrays(i.TRIANGLES,0,6)};return ee(()=>t()),[]}class Li extends Yt{constructor(t){super(),Vt(this,t,Di,yi,Ht,{})}}const Ui=`attribute vec2 a_position;

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
`,Pi=`precision mediump float;

void main() {
    gl_FragColor = vec4(0.1, 0.5, 1.0, 1.0);
}
`;function Bi(e){let t,o,n,i,s,a,r,f,c,u,m,T;return{c(){t=h("p"),o=F(`Create an array of render-size positions. Bind this array to a buffer in the shader program. In
    each `),n=h("code"),i=F("requestAnimationFrame"),s=F(` update the positions randomly with javascript and use the
    shader program to render each position as a point.`),a=g(),r=h("canvas"),f=g(),c=h("button"),u=F("Add position"),this.h()},l(b){t=p(b,"P",{});var _=x(t);o=R(_,`Create an array of render-size positions. Bind this array to a buffer in the shader program. In
    each `),n=p(_,"CODE",{});var U=x(n);i=R(U,"requestAnimationFrame"),U.forEach(d),s=R(_,` update the positions randomly with javascript and use the
    shader program to render each position as a point.`),_.forEach(d),a=A(b),r=p(b,"CANVAS",{id:!0,style:!0,width:!0,height:!0}),x(r).forEach(d),f=A(b),c=p(b,"BUTTON",{});var P=x(c);u=R(P,"Add position"),P.forEach(d),this.h()},h(){v(r,"id","canvas"),ie(r,"background-color","black"),v(r,"width","800"),v(r,"height","600")},m(b,_){D(b,t,_),l(t,o),l(t,n),l(n,i),l(t,s),D(b,a,_),D(b,r,_),D(b,f,_),D(b,c,_),l(c,u),m||(T=V(c,"click",e[1]),m=!0)},p:ct,i:ct,o:ct,d(b){b&&d(t),b&&d(a),b&&d(r),b&&d(f),b&&d(c),m=!1,T()}}}function Ii(e){const t=[50,50,50,150,150,150,150,50,200,200];function o(){const s=document.getElementById("canvas");if(!s)throw"canvas undefined";const a=s.getContext("webgl");if(!a)throw"gl undefined";En(a);const r=yt(a,[Ui,Pi]);Tt(a.canvas);const f=a.getAttribLocation(r,"a_position"),c=a.getUniformLocation(r,"u_resolution"),u=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,u),a.bufferData(a.ARRAY_BUFFER,new Float32Array(t),a.STATIC_DRAW);function m(){if(!a)throw"Undefined params to render";for(let G=0;G<=t.length-2;G+=2)t[G]=(t[G]+Math.random()*2-1)%a.canvas.width,t[G+1]=(t[G+1]+Math.random()*0+1)%a.canvas.height;a.bufferData(a.ARRAY_BUFFER,new Float32Array(t),a.STATIC_DRAW),Tt(a.canvas),a.viewport(0,0,a.canvas.width,a.canvas.height),a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT),a.useProgram(r),a.uniform2f(c,a.canvas.width,a.canvas.height),a.enableVertexAttribArray(f),a.bindBuffer(a.ARRAY_BUFFER,u);const T=2,b=a.FLOAT,_=!1,U=0,P=0;a.vertexAttribPointer(f,T,b,_,U,P);var I=a.POINTS,k=t.length/2;a.drawArrays(I,P,k),requestAnimationFrame(m)}requestAnimationFrame(m)}const n=()=>{t.push(Math.random()*800),t.push(Math.random()*600)};return ee(()=>o()),[n,()=>n()]}class Si extends Yt{constructor(t){super(),Vt(this,t,Ii,Bi,Ht,{})}}const $i=`attribute float id;
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
`,Ci=`precision mediump float;

void main() {
    gl_FragColor = vec4(0.1, 0.5, 1.0, 1.0);
}
`;let We,Ye;const Mi=e=>{Ye=yt(e,[$i,Ci]),We={idAttributeLocation:e.getAttribLocation(Ye,"id"),texDimensionsUniformLocation:e.getUniformLocation(Ye,"texDimensions"),resolutionUniformLocation:e.getUniformLocation(Ye,"u_resolution")}},Ni=e=>{const{gl:t,positionTex:o,textureDimension:n,ids:i}=e;Tt(t.canvas),t.viewport(0,0,t.canvas.width,t.canvas.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT);const s=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,s),t.bufferData(t.ARRAY_BUFFER,new Float32Array(i),t.STATIC_DRAW),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,o),t.useProgram(Ye),t.uniform2f(We.resolutionUniformLocation,t.canvas.width,t.canvas.height),t.uniform2f(We.texDimensionsUniformLocation,n.width,n.height),t.enableVertexAttribArray(We.idAttributeLocation),t.bindBuffer(t.ARRAY_BUFFER,s);const a=1,r=t.FLOAT,f=!1,c=0,u=0;t.vertexAttribPointer(We.idAttributeLocation,a,r,f,c,u);const m=t.POINTS,T=i.length;t.drawArrays(m,u,T)};function zi(e){let t,o,n,i,s,a,r;return{c(){t=h("p"),o=F("Create an array of render-size positions. Store this array in a texture. In each "),n=h("code"),i=F("requestAnimationFrame"),s=F(` update the positions randomly with javascript and create a new texture holding the positions then
    use a shader to render the texture.`),a=g(),r=h("canvas"),this.h()},l(f){t=p(f,"P",{});var c=x(t);o=R(c,"Create an array of render-size positions. Store this array in a texture. In each "),n=p(c,"CODE",{});var u=x(n);i=R(u,"requestAnimationFrame"),u.forEach(d),s=R(c,` update the positions randomly with javascript and create a new texture holding the positions then
    use a shader to render the texture.`),c.forEach(d),a=A(f),r=p(f,"CANVAS",{id:!0,style:!0,width:!0,height:!0}),x(r).forEach(d),this.h()},h(){v(r,"id","canvas"),ie(r,"background-color","black"),v(r,"width",Zo),v(r,"height",Qo)},m(f,c){D(f,t,c),l(t,o),l(t,n),l(n,i),l(t,s),D(f,a,c),D(f,r,c)},p:ct,i:ct,o:ct,d(f){f&&d(t),f&&d(a),f&&d(r)}}}const Zo=800,Qo=600;function Oi(e){function t(){const o=document.getElementById("canvas");if(!o)throw"canvas undefined";const n=o.getContext("webgl");if(!n)throw"gl undefined";En(n),Tt(n.canvas),Mi(n);const i=[0,1,2,3,4,5,6,7,8,9],s=i.map(r=>[Math.random()*Zo,Math.random()*Qo,0,0]).flat();function a(){if(!n)throw"Undefined params to render";for(let f=0;f<=s.length-2;f+=2)s[f]=(s[f]+Math.random()*2-1)%n.canvas.width,s[f+1]=(s[f+1]+Math.random()*0+1)%n.canvas.height;const r=Ft(n,new Float32Array(s),3,3);Ni({gl:n,positionTex:r,textureDimension:{width:3,height:3},ids:i}),requestAnimationFrame(a)}requestAnimationFrame(a)}return ee(()=>t()),[]}let Xi=class extends Yt{constructor(t){super(),Vt(this,t,Oi,zi,Ht,{})}};const ki=`attribute float id;
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
`,Wi=`precision mediump float;

void main() {
    gl_FragColor = vec4(0.1, 0.5, 1.0, 1.0);
}
`;let Ve,He,Sn;const Yi=(e,t)=>{He=yt(e,[ki,Wi]),Ve={idAttributeLocation:e.getAttribLocation(He,"id"),texDimensionsUniformLocation:e.getUniformLocation(He,"texDimensions"),resolutionUniformLocation:e.getUniformLocation(He,"u_resolution")},Sn=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,Sn),e.bufferData(e.ARRAY_BUFFER,new Float32Array(t),e.STATIC_DRAW)},Vi=e=>{const{gl:t,positionTex:o,textureDimension:n,ids:i}=e;Tt(t.canvas),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,t.canvas.width,t.canvas.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.bindBuffer(t.ARRAY_BUFFER,Sn),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,o),t.useProgram(He),t.uniform2f(Ve.resolutionUniformLocation,t.canvas.width,t.canvas.height),t.uniform2f(Ve.texDimensionsUniformLocation,n.width,n.height),t.enableVertexAttribArray(Ve.idAttributeLocation);const s=1,a=t.FLOAT,r=!1,f=0,c=0;t.vertexAttribPointer(Ve.idAttributeLocation,s,a,r,f,c),t.drawArrays(t.POINTS,c,i.length)};function Hi(e,t){const o=new Array(e).fill(0).map((s,a)=>a),n=o.map(s=>[Math.random()*t.width,Math.random()*t.height,0,0]).flat(),i={width:o.length,height:1};return{ids:o,positions:n,texDimensions:i}}const qi=`attribute vec4 position;
void main() {
    gl_Position = position;
}
`,Gi=`precision highp float;

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

`;let Me,Ne,$n,Rn,yn,go,Ao,qe,vn;const ji=(e,t)=>{const{positions:o,texDimensions:n}=t;Ne=yt(e,[qi,Gi]),Me={positionAttributeLocation:e.getAttribLocation(Ne,"position"),positionTexLocation:e.getUniformLocation(Ne,"positionTex"),texDimensionsUniformLocation:e.getUniformLocation(Ne,"texDimensions"),resolutionUniformLocation:e.getUniformLocation(Ne,"u_resolution")},$n=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,$n),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW),Rn=Ft(e,new Float32Array(o),n.width,n.height),yn=Ft(e,null,n.width,n.height),go=Xt(e,Rn),Ao=Xt(e,yn),qe={fb:go,tex:Rn},vn={fb:Ao,tex:yn}},Ki=e=>{const{gl:t,texDimensions:o}=e;t.bindFramebuffer(t.FRAMEBUFFER,vn.fb),t.viewport(0,0,o.width,o.height),t.bindBuffer(t.ARRAY_BUFFER,$n),t.enableVertexAttribArray(Me.positionAttributeLocation),t.vertexAttribPointer(Me.positionAttributeLocation,2,t.FLOAT,!1,0,0),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,qe.tex),t.useProgram(Ne),t.uniform1i(Me.positionTexLocation,0),t.uniform2f(Me.texDimensionsUniformLocation,o.width,o.height),t.uniform2f(Me.resolutionUniformLocation,t.canvas.width,t.canvas.height),t.drawArrays(t.TRIANGLES,0,6);{const n=qe;qe=vn,vn=n}return qe.tex};function Ji(e){let t,o,n,i,s,a,r,f,c,u,m,T,b;return{c(){t=h("p"),o=F("Create an array of render-size positions. Store this array in a texture."),n=g(),i=h("p"),s=F("Create 2 textures which will be used to update the positions with a shader. In each "),a=h("code"),r=F("requestAnimationFrame"),f=F(` update the positions with the simple shader reading from the first texture and writing to the new
    one. Then use the drawing shader to render the new texture to the canvas.`),c=g(),u=h("p"),m=F("Finally switch the two textures to read and write in the updated textures"),T=g(),b=h("canvas"),this.h()},l(_){t=p(_,"P",{});var U=x(t);o=R(U,"Create an array of render-size positions. Store this array in a texture."),U.forEach(d),n=A(_),i=p(_,"P",{});var P=x(i);s=R(P,"Create 2 textures which will be used to update the positions with a shader. In each "),a=p(P,"CODE",{});var I=x(a);r=R(I,"requestAnimationFrame"),I.forEach(d),f=R(P,` update the positions with the simple shader reading from the first texture and writing to the new
    one. Then use the drawing shader to render the new texture to the canvas.`),P.forEach(d),c=A(_),u=p(_,"P",{});var k=x(u);m=R(k,"Finally switch the two textures to read and write in the updated textures"),k.forEach(d),T=A(_),b=p(_,"CANVAS",{id:!0,style:!0,width:!0,height:!0}),x(b).forEach(d),this.h()},h(){v(b,"id","canvas"),ie(b,"background-color","black"),v(b,"width",ti),v(b,"height",ei)},m(_,U){D(_,t,U),l(t,o),D(_,n,U),D(_,i,U),l(i,s),l(i,a),l(a,r),l(i,f),D(_,c,U),D(_,u,U),l(u,m),D(_,T,U),D(_,b,U)},p:ct,i:ct,o:ct,d(_){_&&d(t),_&&d(n),_&&d(i),_&&d(c),_&&d(u),_&&d(T),_&&d(b)}}}const ti=800,ei=600;function Zi(e){function t(){const o=Ce();Tt(o.canvas);const{ids:n,positions:i,texDimensions:s}=Hi(100,{width:ti,height:ei});Yi(o,n),ji(o,{positions:i,texDimensions:s});function a(){Tt(o.canvas);const r=Ki({gl:o,texDimensions:s});Vi({gl:o,positionTex:r,textureDimension:s,ids:n}),requestAnimationFrame(a)}requestAnimationFrame(a)}return ee(()=>t()),[]}let Qi=class extends Yt{constructor(t){super(),Vt(this,t,Zi,Ji,Ht,{})}};const tr=`attribute float id;
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
`,er=`precision mediump float;
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
`;let Ue,ze,Cn,Mn;const nr=(e,t)=>{const{ids:o,colors:n}=t;ze=yt(e,[tr,er]),Ue={idAttributeLocation:e.getAttribLocation(ze,"id"),colorAttributeLocation:e.getAttribLocation(ze,"color"),texDimensionsUniformLocation:e.getUniformLocation(ze,"texDimensions"),resolutionUniformLocation:e.getUniformLocation(ze,"u_resolution")},Cn=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,Cn),e.bufferData(e.ARRAY_BUFFER,new Float32Array(o),e.STATIC_DRAW),Mn=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,Mn),e.bufferData(e.ARRAY_BUFFER,new Float32Array(n),e.STATIC_DRAW)},or=e=>{const{gl:t,positionTex:o,textureDimension:n,ids:i}=e,s=1,a=t.FLOAT,r=!1,f=0,c=0;Tt(t.canvas),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,t.canvas.width,t.canvas.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.bindBuffer(t.ARRAY_BUFFER,Cn),t.vertexAttribPointer(Ue.idAttributeLocation,s,a,r,f,c),t.enableVertexAttribArray(Ue.idAttributeLocation),t.bindBuffer(t.ARRAY_BUFFER,Mn),t.vertexAttribPointer(Ue.colorAttributeLocation,s,a,r,f,c),t.enableVertexAttribArray(Ue.colorAttributeLocation),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,o),t.useProgram(ze),t.uniform2f(Ue.resolutionUniformLocation,t.canvas.width,t.canvas.height),t.uniform2f(Ue.texDimensionsUniformLocation,n.width,n.height),t.drawArrays(t.POINTS,c,i.length)};function ir(e,t){const o=e.width*e.height,n=new Array(o).fill(0).map((a,r)=>r),i=new Array(o).fill(0).map(a=>Math.floor(Math.random()*4)),s=n.map(a=>{{const{x:f,y:c}=rr(t,20);return[f,c,0,0]}}).flat();return{ids:n,positions:s,texDimensions:e,colors:i}}const rr=(e,t)=>{const o=t*Math.random(),n=Math.random()*2*Math.PI,i=o*Math.cos(n)+e.width/2,s=o*Math.sin(n)+e.height/2;return{x:i,y:s}},ar=`attribute vec4 position;
void main() {
    gl_Position = position;
}
`,sr=`precision highp float;

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

`;let Pe,Be,Nn,ln,Dn,bo,wo,Ge,xn,cn;const lr=(e,t)=>{const{positions:o,texDimensions:n}=t;return Be=yt(e,[ar,sr]),Pe={positionAttributeLocation:e.getAttribLocation(Be,"position"),positionTexLocation:e.getUniformLocation(Be,"positionTex"),deltaTimeUniformLocation:e.getUniformLocation(Be,"deltaTime"),texDimensionsUniformLocation:e.getUniformLocation(Be,"texDimensions"),resolutionUniformLocation:e.getUniformLocation(Be,"u_resolution")},Nn=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,Nn),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW),ln=Ft(e,new Float32Array(o),n.width,n.height),Dn=Ft(e,null,n.width,n.height),bo=Xt(e,ln),wo=Xt(e,Dn),Ge={fb:bo,tex:ln},xn={fb:wo,tex:Dn},ln},cr=e=>{const{gl:t,texDimensions:o}=e,n=Date.now();cn||(cn=n-1);const i=n-cn;cn=n,t.bindFramebuffer(t.FRAMEBUFFER,xn.fb),t.viewport(0,0,o.width,o.height),t.bindBuffer(t.ARRAY_BUFFER,Nn),t.enableVertexAttribArray(Pe.positionAttributeLocation),t.vertexAttribPointer(Pe.positionAttributeLocation,2,t.FLOAT,!1,0,0),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,Ge.tex),t.useProgram(Be),t.uniform1i(Pe.positionTexLocation,0),t.uniform1f(Pe.deltaTimeUniformLocation,i),t.uniform2f(Pe.texDimensionsUniformLocation,o.width,o.height),t.uniform2f(Pe.resolutionUniformLocation,t.canvas.width,t.canvas.height),t.drawArrays(t.TRIANGLES,0,6);{const s=Ge;Ge=xn,xn=s}return Ge.tex};function fr(e){let t,o,n,i,s,a,r,f,c,u,m=e[2]?"Play":"Pause",T,b,_,U=e[1]?"Normal Speed":"Slow Mo",P,I,k,G,X=e[4].width*e[4].height+"",j,J,H,it,Z,M,nt,q;return{c(){t=h("p"),o=F("Same principle with a shader to update positions and a shader to draw particles."),n=g(),i=h("p"),s=F(`This time the update shader iterate through the texture to compute the distance of the particle
    to each other particle and if they are too close it pushes them appart.`),a=g(),r=h("canvas"),f=g(),c=h("div"),u=h("button"),T=F(m),b=g(),_=h("button"),P=F(U),I=g(),k=h("span"),G=F("particles: "),j=F(X),J=g(),H=h("label"),it=F("Smooth steps"),Z=g(),M=h("input"),this.h()},l(w){t=p(w,"P",{});var C=x(t);o=R(C,"Same principle with a shader to update positions and a shader to draw particles."),C.forEach(d),n=A(w),i=p(w,"P",{});var Q=x(i);s=R(Q,`This time the update shader iterate through the texture to compute the distance of the particle
    to each other particle and if they are too close it pushes them appart.`),Q.forEach(d),a=A(w),r=p(w,"CANVAS",{id:!0,style:!0,width:!0,height:!0}),x(r).forEach(d),f=A(w),c=p(w,"DIV",{});var ot=x(c);u=p(ot,"BUTTON",{});var xt=x(u);T=R(xt,m),xt.forEach(d),b=A(ot),_=p(ot,"BUTTON",{});var E=x(_);P=R(E,U),E.forEach(d),I=A(ot),k=p(ot,"SPAN",{});var ft=x(k);G=R(ft,"particles: "),j=R(ft,X),ft.forEach(d),J=A(ot),H=p(ot,"LABEL",{for:!0});var tt=x(H);it=R(tt,"Smooth steps"),tt.forEach(d),Z=A(ot),M=p(ot,"INPUT",{type:!0,min:!0}),ot.forEach(d),this.h()},h(){v(r,"id","canvas"),ie(r,"background-color","black"),v(r,"width",e[3].width),v(r,"height",e[3].height),v(H,"for","steps"),v(M,"type","number"),v(M,"min",0)},m(w,C){D(w,t,C),l(t,o),D(w,n,C),D(w,i,C),l(i,s),D(w,a,C),D(w,r,C),D(w,f,C),D(w,c,C),l(c,u),l(u,T),l(c,b),l(c,_),l(_,P),l(c,I),l(c,k),l(k,G),l(k,j),l(c,J),l(c,H),l(H,it),l(c,Z),l(c,M),S(M,e[0]),nt||(q=[V(u,"click",e[5]),V(_,"click",e[6]),V(M,"input",e[7])],nt=!0)},p(w,[C]){C&4&&m!==(m=w[2]?"Play":"Pause")&&te(T,m),C&2&&U!==(U=w[1]?"Normal Speed":"Slow Mo")&&te(P,U),C&1&&$(M.value)!==w[0]&&S(M,w[0])},i:ct,o:ct,d(w){w&&d(t),w&&d(n),w&&d(i),w&&d(a),w&&d(r),w&&d(f),w&&d(c),nt=!1,ke(q)}}}function ur(e,t,o){const n={width:800,height:600},i={width:100,height:100};let s=1,a=!1,r=!0;function f(){const T=Ce();Tt(T.canvas);const{ids:b,positions:_,colors:U}=ir(i,{width:n.width,height:n.height});nr(T,{ids:b,colors:U,texDimensions:i});let P=lr(T,{positions:_,texDimensions:i});function I(){if(Tt(T.canvas),!r)for(let k=0;k<s;k++)P=cr({gl:T,texDimensions:i});return or({gl:T,positionTex:P,textureDimension:i,ids:b}),r?requestAnimationFrame(I):a?setTimeout(()=>requestAnimationFrame(I),1e3):requestAnimationFrame(I)}requestAnimationFrame(I)}ee(()=>f());const c=()=>o(2,r=!r),u=()=>o(1,a=!a);function m(){s=$(this.value),o(0,s)}return[s,a,r,n,i,c,u,m]}class dr extends Yt{constructor(t){super(),Vt(this,t,ur,fr,Ht,{})}}const mr=`attribute float id;
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
`,hr=`precision mediump float;
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
`;let Ie,Oe,zn,On;const pr=(e,t)=>{const{ids:o,colors:n}=t;Oe=yt(e,[mr,hr]),Ie={idAttributeLocation:e.getAttribLocation(Oe,"id"),colorAttributeLocation:e.getAttribLocation(Oe,"color"),texDimensionsUniformLocation:e.getUniformLocation(Oe,"texDimensions"),resolutionUniformLocation:e.getUniformLocation(Oe,"u_resolution")},zn=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,zn),e.bufferData(e.ARRAY_BUFFER,new Float32Array(o),e.STATIC_DRAW),On=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,On),e.bufferData(e.ARRAY_BUFFER,new Float32Array(n),e.STATIC_DRAW)},vr=e=>{const{gl:t,positionTex:o,textureDimension:n,ids:i}=e,s=1,a=t.FLOAT,r=!1,f=0,c=0;Tt(t.canvas),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,t.canvas.width,t.canvas.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.bindBuffer(t.ARRAY_BUFFER,zn),t.vertexAttribPointer(Ie.idAttributeLocation,s,a,r,f,c),t.enableVertexAttribArray(Ie.idAttributeLocation),t.bindBuffer(t.ARRAY_BUFFER,On),t.vertexAttribPointer(Ie.colorAttributeLocation,s,a,r,f,c),t.enableVertexAttribArray(Ie.colorAttributeLocation),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,o),t.useProgram(Oe),t.uniform2f(Ie.resolutionUniformLocation,t.canvas.width,t.canvas.height),t.uniform2f(Ie.texDimensionsUniformLocation,n.width,n.height),t.drawArrays(t.POINTS,c,i.length)};function xr(e){const{texDimensions:t,screenDimensions:o,mode:n}=e,i=t.width*t.height,s=new Array(i).fill(0).map((f,c)=>c),a=new Array(i).fill(0).map(f=>Math.floor(Math.random()*4)),r=s.map(f=>{if(n==="disk"){const{x:u,y:m}=_r(o,20);return[u,m,0,0]}if(n==="square"){const{x:u,y:m}=Tr(o,550);return[u,m,0,0]}if(n==="idDiagonal"){const{x:c,y:u}=gr(o,f,s.length);return[c,u,0,0]}if(n==="sinusoidal"){const{x:c,y:u}=Eo(o,f,s.length,{x:1,y:5});return[c,u,0,0]}if(n==="circle"){const{x:c,y:u}=Eo(o,f,s.length,{x:1,y:1});return[c,u,0,0]}}).flat();return{ids:s,positions:r,texDimensions:t,colors:a}}const Tr=(e,t)=>{const o=Math.random()*t-t/2+e.width/2,n=Math.random()*t-t/2+e.height/2;return{x:o,y:n}},_r=(e,t)=>{const o=t*Math.random(),n=Math.random()*2*Math.PI,i=o*Math.cos(n)+e.width/2,s=o*Math.sin(n)+e.height/2;return{x:i,y:s}},gr=(e,t,o)=>{const n=Xn(t,0,o,0,e.width,!1),i=Xn(t,0,o,0,e.height,!1);return{x:n,y:i}},Eo=(e,t,o,n)=>{const i=Xn(t,0,o,0,1,!0)*2*Math.PI,s=n.x,r=Math.cos(s*i)*200+e.width/2,f=n.y,u=Math.sin(f*i)*200+e.height/2;return{x:r,y:u}},Xn=function(e,t,o,n,i,s){const a=(e-t)/(o-t)*(i-n)+n;return s?n<i?Fo(a,n,i):Fo(a,i,n):a},Fo=function(e,t,o){return Math.max(Math.min(e,o),t)},Ar=`attribute vec4 position;
void main() {
    gl_Position = position;
}
`,br=`precision highp float;

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

`;let fe,ue,kn,fn,Ln,Ro,yo,je,Tn;const wr=(e,t)=>{const{positions:o,texDimensions:n}=t;return ue=yt(e,[Ar,br]),fe={positionAttributeLocation:e.getAttribLocation(ue,"position"),positionTexLocation:e.getUniformLocation(ue,"positionTex"),interactionRangeUniformLocation:e.getUniformLocation(ue,"interactionRange"),dragUniformLocation:e.getUniformLocation(ue,"drag"),deltaTimeUniformLocation:e.getUniformLocation(ue,"deltaTime"),texDimensionsUniformLocation:e.getUniformLocation(ue,"texDimensions"),resolutionUniformLocation:e.getUniformLocation(ue,"u_resolution")},kn=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,kn),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW),fn=Ft(e,new Float32Array(o),n.width,n.height),Ln=Ft(e,null,n.width,n.height),Ro=Xt(e,fn),yo=Xt(e,Ln),je={fb:Ro,tex:fn},Tn={fb:yo,tex:Ln},fn},Er=e=>{const{gl:t,texDimensions:o,interactionRange:n,drag:i,deltaTime:s}=e;t.bindFramebuffer(t.FRAMEBUFFER,Tn.fb),t.viewport(0,0,o.width,o.height),t.bindBuffer(t.ARRAY_BUFFER,kn),t.enableVertexAttribArray(fe.positionAttributeLocation),t.vertexAttribPointer(fe.positionAttributeLocation,2,t.FLOAT,!1,0,0),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,je.tex),t.useProgram(ue),t.uniform1i(fe.positionTexLocation,0),t.uniform1f(fe.dragUniformLocation,i),t.uniform1f(fe.interactionRangeUniformLocation,n),t.uniform1f(fe.deltaTimeUniformLocation,s),t.uniform2f(fe.texDimensionsUniformLocation,o.width,o.height),t.uniform2f(fe.resolutionUniformLocation,t.canvas.width,t.canvas.height),t.drawArrays(t.TRIANGLES,0,6);{const a=je;je=Tn,Tn=a}return je.tex};function Fr(e){let t,o,n,i,s,a,r,f,c,u,m=e[2]?"Play":"Pause",T,b,_,U=e[1]?"Normal Speed":"Slow Mo",P,I,k,G,X=e[5].width*e[5].height+"",j,J,H,it,Z,M,nt,q,w,C,Q,ot,xt,E,ft,tt,rt,wt,_t,W,Lt,ut,at,Ut,gt,Y,Pt,ht,dt,Bt;return{c(){t=h("p"),o=F("Same principle with a shader to update positions and a shader to draw particles."),n=g(),i=h("p"),s=F(`This time the update shader iterate through the texture to compute the distance of the particle
    to each other particle and if they are too close it pushes them appart.`),a=g(),r=h("canvas"),f=g(),c=h("div"),u=h("button"),T=F(m),b=g(),_=h("button"),P=F(U),I=g(),k=h("span"),G=F("particles: "),j=F(X),J=g(),H=h("label"),it=F("Smooth steps"),Z=g(),M=h("input"),nt=g(),q=h("div"),w=h("ul"),C=h("li"),Q=h("label"),ot=F("Interaction Range"),xt=g(),E=h("input"),ft=g(),tt=h("li"),rt=h("label"),wt=F("Drag"),_t=g(),W=h("input"),Lt=g(),ut=h("li"),at=h("label"),Ut=F("Time step"),gt=g(),Y=h("input"),Pt=g(),ht=h("ul"),this.h()},l(N){t=p(N,"P",{});var z=x(t);o=R(z,"Same principle with a shader to update positions and a shader to draw particles."),z.forEach(d),n=A(N),i=p(N,"P",{});var St=x(i);s=R(St,`This time the update shader iterate through the texture to compute the distance of the particle
    to each other particle and if they are too close it pushes them appart.`),St.forEach(d),a=A(N),r=p(N,"CANVAS",{id:!0,style:!0,width:!0,height:!0}),x(r).forEach(d),f=A(N),c=p(N,"DIV",{});var y=x(c);u=p(y,"BUTTON",{});var et=x(u);T=R(et,m),et.forEach(d),b=A(y),_=p(y,"BUTTON",{});var $t=x(_);P=R($t,U),$t.forEach(d),I=A(y),k=p(y,"SPAN",{});var It=x(k);G=R(It,"particles: "),j=R(It,X),It.forEach(d),J=A(y),H=p(y,"LABEL",{for:!0});var K=x(H);it=R(K,"Smooth steps"),K.forEach(d),Z=A(y),M=p(y,"INPUT",{type:!0,min:!0}),y.forEach(d),nt=A(N),q=p(N,"DIV",{});var Ct=x(q);w=p(Ct,"UL",{});var lt=x(w);C=p(lt,"LI",{});var At=x(C);Q=p(At,"LABEL",{for:!0});var Mt=x(Q);ot=R(Mt,"Interaction Range"),Mt.forEach(d),xt=A(At),E=p(At,"INPUT",{id:!0,type:!0,min:!0}),At.forEach(d),ft=A(lt),tt=p(lt,"LI",{});var mt=x(tt);rt=p(mt,"LABEL",{for:!0});var pt=x(rt);wt=R(pt,"Drag"),pt.forEach(d),_t=A(mt),W=p(mt,"INPUT",{id:!0,type:!0,min:!0}),mt.forEach(d),Lt=A(lt),ut=p(lt,"LI",{});var bt=x(ut);at=p(bt,"LABEL",{for:!0});var Dt=x(at);Ut=R(Dt,"Time step"),Dt.forEach(d),gt=A(bt),Y=p(bt,"INPUT",{id:!0,type:!0,min:!0}),bt.forEach(d),Pt=A(lt),ht=p(lt,"UL",{}),x(ht).forEach(d),lt.forEach(d),Ct.forEach(d),this.h()},h(){v(r,"id","canvas"),ie(r,"background-color","black"),v(r,"width",e[4].width),v(r,"height",e[4].height),v(H,"for","steps"),v(M,"type","number"),v(M,"min",0),v(Q,"for","interactionRange"),v(E,"id","interactionRange"),v(E,"type","number"),v(E,"min",0),v(rt,"for","drag"),v(W,"id","drag"),v(W,"type","number"),v(W,"min",0),v(at,"for","deltaTime"),v(Y,"id","deltaTime"),v(Y,"type","number"),v(Y,"min",0)},m(N,z){D(N,t,z),l(t,o),D(N,n,z),D(N,i,z),l(i,s),D(N,a,z),D(N,r,z),D(N,f,z),D(N,c,z),l(c,u),l(u,T),l(c,b),l(c,_),l(_,P),l(c,I),l(c,k),l(k,G),l(k,j),l(c,J),l(c,H),l(H,it),l(c,Z),l(c,M),S(M,e[0]),D(N,nt,z),D(N,q,z),l(q,w),l(w,C),l(C,Q),l(Q,ot),l(C,xt),l(C,E),S(E,e[3].interactionRange),l(w,ft),l(w,tt),l(tt,rt),l(rt,wt),l(tt,_t),l(tt,W),S(W,e[3].drag),l(w,Lt),l(w,ut),l(ut,at),l(at,Ut),l(ut,gt),l(ut,Y),S(Y,e[3].timeStep),l(w,Pt),l(w,ht),dt||(Bt=[V(u,"click",e[6]),V(_,"click",e[7]),V(M,"input",e[8]),V(E,"input",e[9]),V(W,"input",e[10]),V(Y,"input",e[11])],dt=!0)},p(N,[z]){z&4&&m!==(m=N[2]?"Play":"Pause")&&te(T,m),z&2&&U!==(U=N[1]?"Normal Speed":"Slow Mo")&&te(P,U),z&1&&$(M.value)!==N[0]&&S(M,N[0]),z&8&&$(E.value)!==N[3].interactionRange&&S(E,N[3].interactionRange),z&8&&$(W.value)!==N[3].drag&&S(W,N[3].drag),z&8&&$(Y.value)!==N[3].timeStep&&S(Y,N[3].timeStep)},i:ct,o:ct,d(N){N&&d(t),N&&d(n),N&&d(i),N&&d(a),N&&d(r),N&&d(f),N&&d(c),N&&d(nt),N&&d(q),dt=!1,ke(Bt)}}}function Rr(e,t,o){const n={width:800,height:600},i={width:10,height:10};let s=1,a=!1,r=!0;const f={interactionRange:70,drag:1e3,timeStep:10};function c(){const P=Ce();Tt(P.canvas);const{ids:I,positions:k,colors:G}=xr({texDimensions:i,screenDimensions:{width:n.width,height:n.height},mode:"circle"});pr(P,{ids:I,colors:G,texDimensions:i});let X=wr(P,{positions:k,texDimensions:i});function j(){if(Tt(P.canvas),!r)for(let J=0;J<s;J++)X=Er({gl:P,texDimensions:i,interactionRange:f.interactionRange,drag:f.drag,deltaTime:f.timeStep});return vr({gl:P,positionTex:X,textureDimension:i,ids:I}),r?requestAnimationFrame(j):a?setTimeout(()=>requestAnimationFrame(j),1e3):requestAnimationFrame(j)}requestAnimationFrame(j)}ee(()=>c());const u=()=>o(2,r=!r),m=()=>o(1,a=!a);function T(){s=$(this.value),o(0,s)}function b(){f.interactionRange=$(this.value),o(3,f)}function _(){f.drag=$(this.value),o(3,f)}function U(){f.timeStep=$(this.value),o(3,f)}return[s,a,r,f,n,i,u,m,T,b,_,U]}class yr extends Yt{constructor(t){super(),Vt(this,t,Rr,Fr,Ht,{})}}const Dr=`attribute float id;
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
`,Lr=`precision mediump float;
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
`;let Se,Xe,Wn,Yn;const Ur=(e,t)=>{const{ids:o,colors:n}=t;Xe=yt(e,[Dr,Lr]),Se={idAttributeLocation:e.getAttribLocation(Xe,"id"),colorAttributeLocation:e.getAttribLocation(Xe,"color"),texDimensionsUniformLocation:e.getUniformLocation(Xe,"texDimensions"),resolutionUniformLocation:e.getUniformLocation(Xe,"u_resolution")},Wn=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,Wn),e.bufferData(e.ARRAY_BUFFER,new Float32Array(o),e.STATIC_DRAW),Yn=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,Yn),e.bufferData(e.ARRAY_BUFFER,new Float32Array(n),e.STATIC_DRAW)},Pr=e=>{const{gl:t,positionTex:o,textureDimension:n,ids:i}=e,s=1,a=t.FLOAT,r=!1,f=0,c=0;Tt(t.canvas),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,t.canvas.width,t.canvas.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.bindBuffer(t.ARRAY_BUFFER,Wn),t.vertexAttribPointer(Se.idAttributeLocation,s,a,r,f,c),t.enableVertexAttribArray(Se.idAttributeLocation),t.bindBuffer(t.ARRAY_BUFFER,Yn),t.vertexAttribPointer(Se.colorAttributeLocation,s,a,r,f,c),t.enableVertexAttribArray(Se.colorAttributeLocation),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,o),t.useProgram(Xe),t.uniform2f(Se.resolutionUniformLocation,t.canvas.width,t.canvas.height),t.uniform2f(Se.texDimensionsUniformLocation,n.width,n.height),t.drawArrays(t.POINTS,c,i.length)};function Br(e){const{texDimensions:t,screenDimensions:o,mode:n}=e,i=t.width*t.height,s=new Array(i).fill(0).map((f,c)=>c),a=new Array(i).fill(0).map(f=>Math.floor(Math.random()*4)),r=s.map(f=>{if(n==="random"){const{x:c,y:u}=Ir(o);return[c,u,0,0]}if(n==="disk"){const{x:u,y:m}=$r(o,200);return[u,m,0,0]}if(n==="square"){const{x:u,y:m}=Sr(o,300);return[u,m,0,0]}if(n==="idDiagonal"){const{x:c,y:u}=Cr(o,f,s.length);return[c,u,0,0]}if(n==="sinusoidal"){const{x:c,y:u}=Do(o,f,s.length,{x:1,y:5});return[c,u,0,0]}if(n==="circle"){const{x:c,y:u}=Do(o,f,s.length,{x:1,y:1});return[c,u,0,0]}}).flat();return{ids:s,positions:r,texDimensions:t,colors:a}}const Ir=e=>{const t=20+Math.random()*(e.width-40),o=Math.random()*(e.height-150);return{x:t,y:o}},Sr=(e,t)=>{const o=Math.random()*t-t/2+e.width/2,n=Math.random()*t-t/2+e.height/2;return{x:o,y:n}},$r=(e,t)=>{const o=t*Math.random(),n=Math.random()*2*Math.PI,i=o*Math.cos(n)+e.width/2,s=o*Math.sin(n)+e.height/2;return{x:i,y:s}},Cr=(e,t,o)=>{const n=Vn(t,0,o,0,e.width,!1),i=Vn(t,0,o,0,e.height,!1);return{x:n,y:i}},Do=(e,t,o,n)=>{const i=Vn(t,0,o,0,1,!0)*2*Math.PI,s=n.x,r=Math.cos(s*i)*200+e.width/2,f=n.y,u=Math.sin(f*i)*200+e.height/2;return{x:r,y:u}},Vn=function(e,t,o,n,i,s){const a=(e-t)/(o-t)*(i-n)+n;return s?n<i?Lo(a,n,i):Lo(a,i,n):a},Lo=function(e,t,o){return Math.max(Math.min(e,o),t)},Mr=`attribute vec4 position;
void main() {
    gl_Position = position;
}
`,Nr=`precision highp float;

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

`;let de,me,Hn,un,Un,Uo,Po,Ke,_n;const zr=(e,t)=>{const{positions:o,texDimensions:n}=t,i=Nr.replace("{{TEX_WIDTH}}",n.width.toFixed(1)).replace("{{TEX_HEIGHT}}",n.height.toFixed(1));return me=yt(e,[Mr,i]),de={positionAttributeLocation:e.getAttribLocation(me,"position"),positionTexLocation:e.getUniformLocation(me,"positionTex"),interactionRangeUniformLocation:e.getUniformLocation(me,"interactionRange"),dragUniformLocation:e.getUniformLocation(me,"drag"),deltaTimeUniformLocation:e.getUniformLocation(me,"deltaTime"),texDimensionsUniformLocation:e.getUniformLocation(me,"texDimensions"),resolutionUniformLocation:e.getUniformLocation(me,"u_resolution")},Hn=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,Hn),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW),un=Ft(e,new Float32Array(o),n.width,n.height),Un=Ft(e,null,n.width,n.height),Uo=Xt(e,un),Po=Xt(e,Un),Ke={fb:Uo,tex:un},_n={fb:Po,tex:Un},un},Or=e=>{const{gl:t,texDimensions:o,interactionRange:n,drag:i,deltaTime:s}=e;t.bindFramebuffer(t.FRAMEBUFFER,_n.fb),t.viewport(0,0,o.width,o.height),t.bindBuffer(t.ARRAY_BUFFER,Hn),t.enableVertexAttribArray(de.positionAttributeLocation),t.vertexAttribPointer(de.positionAttributeLocation,2,t.FLOAT,!1,0,0),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,Ke.tex),t.useProgram(me),t.uniform1i(de.positionTexLocation,0),t.uniform1f(de.dragUniformLocation,i),t.uniform1f(de.interactionRangeUniformLocation,n),t.uniform1f(de.deltaTimeUniformLocation,s),t.uniform2f(de.texDimensionsUniformLocation,o.width,o.height),t.uniform2f(de.resolutionUniformLocation,t.canvas.width,t.canvas.height),t.drawArrays(t.TRIANGLES,0,6);{const a=Ke;Ke=_n,_n=a}return Ke.tex};function Xr(e){let t,o,n,i,s,a,r,f,c,u,m,T,b,_=e[2]?"Play":"Pause",U,P,I,k=e[1]?"Normal Speed":"Slow Mo",G,X,j,J,H=e[5].width*e[5].height+"",it,Z,M,nt,q,w,C,Q,ot,xt,E,ft,tt,rt,wt,_t,W,Lt,ut,at,Ut,gt,Y,Pt,ht,dt,Bt,N,z,St;return{c(){t=h("p"),o=F("This could be a kind of water simulation."),n=g(),i=h("p"),s=F(`Here we added a gravity force to the shader which pulls cells apart and we can experiment with
    different values of the parameters.`),a=g(),r=h("p"),f=F("For now creating vertical walls create a bug so we warp the horizontal coordinates."),c=g(),u=h("canvas"),m=g(),T=h("div"),b=h("button"),U=F(_),P=g(),I=h("button"),G=F(k),X=g(),j=h("span"),J=F("particles: "),it=F(H),Z=g(),M=h("label"),nt=F("Smooth steps"),q=g(),w=h("input"),C=g(),Q=h("div"),ot=h("ul"),xt=h("li"),E=h("label"),ft=F("Interaction Range"),tt=g(),rt=h("input"),wt=g(),_t=h("li"),W=h("label"),Lt=F("Drag"),ut=g(),at=h("input"),Ut=g(),gt=h("li"),Y=h("label"),Pt=F("Time step"),ht=g(),dt=h("input"),Bt=g(),N=h("ul"),this.h()},l(y){t=p(y,"P",{});var et=x(t);o=R(et,"This could be a kind of water simulation."),et.forEach(d),n=A(y),i=p(y,"P",{});var $t=x(i);s=R($t,`Here we added a gravity force to the shader which pulls cells apart and we can experiment with
    different values of the parameters.`),$t.forEach(d),a=A(y),r=p(y,"P",{});var It=x(r);f=R(It,"For now creating vertical walls create a bug so we warp the horizontal coordinates."),It.forEach(d),c=A(y),u=p(y,"CANVAS",{id:!0,style:!0,width:!0,height:!0}),x(u).forEach(d),m=A(y),T=p(y,"DIV",{});var K=x(T);b=p(K,"BUTTON",{});var Ct=x(b);U=R(Ct,_),Ct.forEach(d),P=A(K),I=p(K,"BUTTON",{});var lt=x(I);G=R(lt,k),lt.forEach(d),X=A(K),j=p(K,"SPAN",{});var At=x(j);J=R(At,"particles: "),it=R(At,H),At.forEach(d),Z=A(K),M=p(K,"LABEL",{for:!0});var Mt=x(M);nt=R(Mt,"Smooth steps"),Mt.forEach(d),q=A(K),w=p(K,"INPUT",{type:!0,min:!0}),K.forEach(d),C=A(y),Q=p(y,"DIV",{});var mt=x(Q);ot=p(mt,"UL",{});var pt=x(ot);xt=p(pt,"LI",{});var bt=x(xt);E=p(bt,"LABEL",{for:!0});var Dt=x(E);ft=R(Dt,"Interaction Range"),Dt.forEach(d),tt=A(bt),rt=p(bt,"INPUT",{id:!0,type:!0,min:!0}),bt.forEach(d),wt=A(pt),_t=p(pt,"LI",{});var qt=x(_t);W=p(qt,"LABEL",{for:!0});var L=x(W);Lt=R(L,"Drag"),L.forEach(d),ut=A(qt),at=p(qt,"INPUT",{id:!0,type:!0,min:!0}),qt.forEach(d),Ut=A(pt),gt=p(pt,"LI",{});var B=x(gt);Y=p(B,"LABEL",{for:!0});var Et=x(Y);Pt=R(Et,"Time step"),Et.forEach(d),ht=A(B),dt=p(B,"INPUT",{id:!0,type:!0,min:!0}),B.forEach(d),Bt=A(pt),N=p(pt,"UL",{}),x(N).forEach(d),pt.forEach(d),mt.forEach(d),this.h()},h(){v(u,"id","canvas"),ie(u,"background-color","black"),v(u,"width",e[4].width),v(u,"height",e[4].height),v(M,"for","steps"),v(w,"type","number"),v(w,"min",0),v(E,"for","interactionRange"),v(rt,"id","interactionRange"),v(rt,"type","number"),v(rt,"min",0),v(W,"for","drag"),v(at,"id","drag"),v(at,"type","number"),v(at,"min",0),v(Y,"for","deltaTime"),v(dt,"id","deltaTime"),v(dt,"type","number"),v(dt,"min",0)},m(y,et){D(y,t,et),l(t,o),D(y,n,et),D(y,i,et),l(i,s),D(y,a,et),D(y,r,et),l(r,f),D(y,c,et),D(y,u,et),D(y,m,et),D(y,T,et),l(T,b),l(b,U),l(T,P),l(T,I),l(I,G),l(T,X),l(T,j),l(j,J),l(j,it),l(T,Z),l(T,M),l(M,nt),l(T,q),l(T,w),S(w,e[0]),D(y,C,et),D(y,Q,et),l(Q,ot),l(ot,xt),l(xt,E),l(E,ft),l(xt,tt),l(xt,rt),S(rt,e[3].interactionRange),l(ot,wt),l(ot,_t),l(_t,W),l(W,Lt),l(_t,ut),l(_t,at),S(at,e[3].drag),l(ot,Ut),l(ot,gt),l(gt,Y),l(Y,Pt),l(gt,ht),l(gt,dt),S(dt,e[3].timeStep),l(ot,Bt),l(ot,N),z||(St=[V(b,"click",e[6]),V(I,"click",e[7]),V(w,"input",e[8]),V(rt,"input",e[9]),V(at,"input",e[10]),V(dt,"input",e[11])],z=!0)},p(y,[et]){et&4&&_!==(_=y[2]?"Play":"Pause")&&te(U,_),et&2&&k!==(k=y[1]?"Normal Speed":"Slow Mo")&&te(G,k),et&1&&$(w.value)!==y[0]&&S(w,y[0]),et&8&&$(rt.value)!==y[3].interactionRange&&S(rt,y[3].interactionRange),et&8&&$(at.value)!==y[3].drag&&S(at,y[3].drag),et&8&&$(dt.value)!==y[3].timeStep&&S(dt,y[3].timeStep)},i:ct,o:ct,d(y){y&&d(t),y&&d(n),y&&d(i),y&&d(a),y&&d(r),y&&d(c),y&&d(u),y&&d(m),y&&d(T),y&&d(C),y&&d(Q),z=!1,ke(St)}}}function kr(e,t,o){const n={width:800,height:600},i={width:500,height:20};let s=1,a=!1,r=!0;const f={interactionRange:6,drag:5,timeStep:10};function c(){const P=Ce();Tt(P.canvas);const{ids:I,positions:k,colors:G}=Br({texDimensions:i,screenDimensions:{width:n.width,height:n.height},mode:"disk"});Ur(P,{ids:I,colors:G,texDimensions:i});let X=zr(P,{positions:k,texDimensions:i});function j(){if(Tt(P.canvas),!r)for(let J=0;J<s;J++)X=Or({gl:P,texDimensions:i,interactionRange:f.interactionRange,drag:f.drag,deltaTime:f.timeStep});return Pr({gl:P,positionTex:X,textureDimension:i,ids:I}),r?requestAnimationFrame(j):a?setTimeout(()=>requestAnimationFrame(j),1e3):requestAnimationFrame(j)}requestAnimationFrame(j)}ee(()=>c());const u=()=>o(2,r=!r),m=()=>o(1,a=!a);function T(){s=$(this.value),o(0,s)}function b(){f.interactionRange=$(this.value),o(3,f)}function _(){f.drag=$(this.value),o(3,f)}function U(){f.timeStep=$(this.value),o(3,f)}return[s,a,r,f,n,i,u,m,T,b,_,U]}class Wr extends Yt{constructor(t){super(),Vt(this,t,kr,Xr,Ht,{})}}const Yr=`attribute float id;
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
`,Vr=`precision mediump float;
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
`;let Ee,$e,qn,Gn;const Hr=(e,t)=>{const{ids:o,colors:n}=t;$e=yt(e,[Yr,Vr]),Ee={idAttributeLocation:e.getAttribLocation($e,"id"),colorAttributeLocation:e.getAttribLocation($e,"color"),sizeUniformLocation:e.getUniformLocation($e,"size"),texDimensionsUniformLocation:e.getUniformLocation($e,"texDimensions"),worldDimensionsUniformLocation:e.getUniformLocation($e,"worldDimensions")},qn=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,qn),e.bufferData(e.ARRAY_BUFFER,new Float32Array(o),e.STATIC_DRAW),Gn=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,Gn),e.bufferData(e.ARRAY_BUFFER,new Float32Array(n),e.STATIC_DRAW)},qr=e=>{const{gl:t,positionTex:o,texDimensions:n,worldDimensions:i,particlesSize:s,ids:a}=e,r=1,f=t.FLOAT,c=!1,u=0,m=0;Tt(t.canvas),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,t.canvas.width,t.canvas.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.bindBuffer(t.ARRAY_BUFFER,qn),t.vertexAttribPointer(Ee.idAttributeLocation,r,f,c,u,m),t.enableVertexAttribArray(Ee.idAttributeLocation),t.bindBuffer(t.ARRAY_BUFFER,Gn),t.vertexAttribPointer(Ee.colorAttributeLocation,r,f,c,u,m),t.enableVertexAttribArray(Ee.colorAttributeLocation),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,o),t.useProgram($e),t.uniform1f(Ee.sizeUniformLocation,s),t.uniform2f(Ee.worldDimensionsUniformLocation,i.width,i.height),t.uniform2f(Ee.texDimensionsUniformLocation,n.width,n.height),t.drawArrays(t.POINTS,m,a.length)};function Gr(e){const{texDimensions:t,worldDimensions:o,mode:n}=e,i=t.width*t.height,s=new Array(i).fill(0).map((f,c)=>c),a=new Array(i).fill(0).map(()=>Math.floor(Math.random()*4)),r=s.map(f=>{if(n==="random"){const{x:c,y:u}=jr(o);return[c,u,0,0]}if(n==="disk"){const{x:u,y:m}=Jr(o,200);return[u,m,0,0]}if(n==="square"){const{x:u,y:m}=Kr(o,300);return[u,m,0,0]}if(n==="idDiagonal"){const{x:c,y:u}=Zr(o,f,s.length);return[c,u,0,0]}if(n==="sinusoidal"){const{x:c,y:u}=Bo(o,f,s.length,{x:1,y:5});return[c,u,0,0]}if(n==="circle"){const{x:c,y:u}=Bo(o,f,s.length,{x:1,y:1});return[c,u,0,0]}}).flat();return{ids:s,positions:r,texDimensions:t,colors:a}}const jr=e=>{const t=20+Math.random()*(e.width-40),o=Math.random()*(e.height-150);return{x:t,y:o}},Kr=(e,t)=>{const o=Math.random()*t-t/2+e.width/2,n=Math.random()*t-t/2+e.height/2;return{x:o,y:n}},Jr=(e,t)=>{const o=t*Math.random(),n=Math.random()*2*Math.PI,i=o*Math.cos(n)+e.width/2,s=o*Math.sin(n)+e.height/2;return{x:i,y:s}},Zr=(e,t,o)=>{const n=jn(t,0,o,0,e.width,!1),i=jn(t,0,o,0,e.height,!1);return{x:n,y:i}},Bo=(e,t,o,n)=>{const i=jn(t,0,o,0,1,!0)*2*Math.PI,s=n.x,r=Math.cos(s*i)*200+e.width/2,f=n.y,u=Math.sin(f*i)*200+e.height/2;return{x:r,y:u}},jn=function(e,t,o,n,i,s){const a=(e-t)/(o-t)*(i-n)+n;return s?n<i?Io(a,n,i):Io(a,i,n):a},Io=function(e,t,o){return Math.max(Math.min(e,o),t)},Qr=`attribute vec4 position;
void main() {
    gl_Position = position;
}
`,ta=`precision highp float;

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

`;let he,pe,Kn,dn,Pn,So,$o,Je,gn;const ea=(e,t)=>{const{positions:o,texDimensions:n}=t,i=ta.replace("{{TEX_WIDTH}}",n.width.toFixed(1)).replace("{{TEX_HEIGHT}}",n.height.toFixed(1));return pe=yt(e,[Qr,i]),he={positionAttributeLocation:e.getAttribLocation(pe,"position"),positionTexLocation:e.getUniformLocation(pe,"positionTex"),interactionRangeUniformLocation:e.getUniformLocation(pe,"interactionRange"),dragUniformLocation:e.getUniformLocation(pe,"drag"),deltaTimeUniformLocation:e.getUniformLocation(pe,"deltaTime"),texDimensionsUniformLocation:e.getUniformLocation(pe,"texDimensions"),worldDimensionsUniformLocation:e.getUniformLocation(pe,"worldDimensions")},Kn=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,Kn),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW),dn=Ft(e,new Float32Array(o),n.width,n.height),Pn=Ft(e,null,n.width,n.height),So=Xt(e,dn),$o=Xt(e,Pn),Je={fb:So,tex:dn},gn={fb:$o,tex:Pn},dn},na=e=>{const{gl:t,texDimensions:o,worldDimensions:n,interactionRange:i,drag:s,deltaTime:a}=e;t.bindFramebuffer(t.FRAMEBUFFER,gn.fb),t.viewport(0,0,o.width,o.height),t.bindBuffer(t.ARRAY_BUFFER,Kn),t.enableVertexAttribArray(he.positionAttributeLocation),t.vertexAttribPointer(he.positionAttributeLocation,2,t.FLOAT,!1,0,0),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,Je.tex),t.useProgram(pe),t.uniform1i(he.positionTexLocation,0),t.uniform1f(he.dragUniformLocation,s),t.uniform1f(he.interactionRangeUniformLocation,i),t.uniform1f(he.deltaTimeUniformLocation,a),t.uniform2f(he.texDimensionsUniformLocation,o.width,o.height),t.uniform2f(he.worldDimensionsUniformLocation,n.width,n.height),t.drawArrays(t.TRIANGLES,0,6);{const r=Je;Je=gn,gn=r}return Je.tex};function oa(e){let t,o,n,i,s,a,r,f=e[3]?"Play":"Pause",c,u,m,T=e[2]?"Normal Speed":"Slow Mo",b,_,U,P,I=e[6].width*e[6].height+"",k,G,X,j,J,H,it,Z,M,nt,q,w,C,Q,ot,xt,E,ft,tt,rt,wt,_t,W,Lt,ut,at,Ut,gt,Y,Pt,ht,dt,Bt,N,z,St,y,et,$t,It,K,Ct,lt,At,Mt,mt,pt,bt,Dt,qt;return{c(){t=h("p"),o=F(`Add parameters to the simulation. The dimensions of the world in which the particles evolve can
    be changed as well as their size. With larger particles size the effect looks more like a fluid.`),n=g(),i=h("canvas"),s=g(),a=h("div"),r=h("button"),c=F(f),u=g(),m=h("button"),b=F(T),_=g(),U=h("span"),P=F("particles: "),k=F(I),G=g(),X=h("label"),j=F("Smooth steps"),J=g(),H=h("input"),it=g(),Z=h("button"),M=F("Reset"),nt=g(),q=h("div"),w=h("ul"),C=h("li"),Q=h("label"),ot=F("Interaction Range"),xt=g(),E=h("input"),ft=g(),tt=h("li"),rt=h("label"),wt=F("Drag"),_t=g(),W=h("input"),Lt=g(),ut=h("li"),at=h("label"),Ut=F("Time step"),gt=g(),Y=h("input"),Pt=g(),ht=h("li"),dt=h("label"),Bt=F("Particles size"),N=g(),z=h("input"),St=g(),y=h("li"),et=h("label"),$t=F("World: width"),It=g(),K=h("input"),Ct=g(),lt=h("label"),At=F("height"),Mt=g(),mt=h("input"),pt=g(),bt=h("ul"),this.h()},l(L){t=p(L,"P",{});var B=x(t);o=R(B,`Add parameters to the simulation. The dimensions of the world in which the particles evolve can
    be changed as well as their size. With larger particles size the effect looks more like a fluid.`),B.forEach(d),n=A(L),i=p(L,"CANVAS",{id:!0,style:!0,width:!0,height:!0}),x(i).forEach(d),s=A(L),a=p(L,"DIV",{});var Et=x(a);r=p(Et,"BUTTON",{});var Gt=x(r);c=R(Gt,f),Gt.forEach(d),u=A(Et),m=p(Et,"BUTTON",{});var jt=x(m);b=R(jt,T),jt.forEach(d),_=A(Et),U=p(Et,"SPAN",{});var re=x(U);P=R(re,"particles: "),k=R(re,I),re.forEach(d),G=A(Et),X=p(Et,"LABEL",{for:!0});var le=x(X);j=R(le,"Smooth steps"),le.forEach(d),J=A(Et),H=p(Et,"INPUT",{type:!0,min:!0}),it=A(Et),Z=p(Et,"BUTTON",{});var kt=x(Z);M=R(kt,"Reset"),kt.forEach(d),Et.forEach(d),nt=A(L),q=p(L,"DIV",{});var ce=x(q);w=p(ce,"UL",{});var vt=x(w);C=p(vt,"LI",{});var Kt=x(C);Q=p(Kt,"LABEL",{for:!0});var _e=x(Q);ot=R(_e,"Interaction Range"),_e.forEach(d),xt=A(Kt),E=p(Kt,"INPUT",{id:!0,type:!0,min:!0}),Kt.forEach(d),ft=A(vt),tt=p(vt,"LI",{});var ne=x(tt);rt=p(ne,"LABEL",{for:!0});var oe=x(rt);wt=R(oe,"Drag"),oe.forEach(d),_t=A(ne),W=p(ne,"INPUT",{id:!0,type:!0,min:!0}),ne.forEach(d),Lt=A(vt),ut=p(vt,"LI",{});var O=x(ut);at=p(O,"LABEL",{for:!0});var st=x(at);Ut=R(st,"Time step"),st.forEach(d),gt=A(O),Y=p(O,"INPUT",{id:!0,type:!0,min:!0}),O.forEach(d),Pt=A(vt),ht=p(vt,"LI",{});var Nt=x(ht);dt=p(Nt,"LABEL",{for:!0});var ge=x(dt);Bt=R(ge,"Particles size"),ge.forEach(d),N=A(Nt),z=p(Nt,"INPUT",{id:!0,type:!0,min:!0}),Nt.forEach(d),St=A(vt),y=p(vt,"LI",{});var Rt=x(y);et=p(Rt,"LABEL",{for:!0});var Ae=x(et);$t=R(Ae,"World: width"),Ae.forEach(d),It=A(Rt),K=p(Rt,"INPUT",{id:!0,type:!0,min:!0}),Ct=A(Rt),lt=p(Rt,"LABEL",{for:!0});var be=x(lt);At=R(be,"height"),be.forEach(d),Mt=A(Rt),mt=p(Rt,"INPUT",{id:!0,type:!0,min:!0}),Rt.forEach(d),pt=A(vt),bt=p(vt,"UL",{}),x(bt).forEach(d),vt.forEach(d),ce.forEach(d),this.h()},h(){v(i,"id","canvas"),ie(i,"background-color","black"),v(i,"width",e[5].width),v(i,"height",e[5].height),v(X,"for","steps"),v(H,"type","number"),v(H,"min",0),v(Q,"for","interactionRange"),v(E,"id","interactionRange"),v(E,"type","number"),v(E,"min",0),v(rt,"for","drag"),v(W,"id","drag"),v(W,"type","number"),v(W,"min",0),v(at,"for","deltaTime"),v(Y,"id","deltaTime"),v(Y,"type","number"),v(Y,"min",0),v(dt,"for","particlesSize"),v(z,"id","particlesSize"),v(z,"type","number"),v(z,"min",0),v(et,"for","worldWidth"),v(K,"id","worldWidth"),v(K,"type","number"),v(K,"min",0),v(lt,"for","worldHeight"),v(mt,"id","worldHeight"),v(mt,"type","number"),v(mt,"min",0)},m(L,B){D(L,t,B),l(t,o),D(L,n,B),D(L,i,B),D(L,s,B),D(L,a,B),l(a,r),l(r,c),l(a,u),l(a,m),l(m,b),l(a,_),l(a,U),l(U,P),l(U,k),l(a,G),l(a,X),l(X,j),l(a,J),l(a,H),S(H,e[1]),l(a,it),l(a,Z),l(Z,M),D(L,nt,B),D(L,q,B),l(q,w),l(w,C),l(C,Q),l(Q,ot),l(C,xt),l(C,E),S(E,e[4].interactionRange),l(w,ft),l(w,tt),l(tt,rt),l(rt,wt),l(tt,_t),l(tt,W),S(W,e[4].drag),l(w,Lt),l(w,ut),l(ut,at),l(at,Ut),l(ut,gt),l(ut,Y),S(Y,e[4].timeStep),l(w,Pt),l(w,ht),l(ht,dt),l(dt,Bt),l(ht,N),l(ht,z),S(z,e[4].particlesSize),l(w,St),l(w,y),l(y,et),l(et,$t),l(y,It),l(y,K),S(K,e[0].width),l(y,Ct),l(y,lt),l(lt,At),l(y,Mt),l(y,mt),S(mt,e[0].height),l(w,pt),l(w,bt),Dt||(qt=[V(r,"click",e[8]),V(m,"click",e[9]),V(H,"input",e[10]),V(Z,"click",e[11]),V(E,"input",e[12]),V(W,"input",e[13]),V(Y,"input",e[14]),V(z,"input",e[15]),V(K,"input",e[16]),V(mt,"input",e[17])],Dt=!0)},p(L,[B]){B&8&&f!==(f=L[3]?"Play":"Pause")&&te(c,f),B&4&&T!==(T=L[2]?"Normal Speed":"Slow Mo")&&te(b,T),B&2&&$(H.value)!==L[1]&&S(H,L[1]),B&16&&$(E.value)!==L[4].interactionRange&&S(E,L[4].interactionRange),B&16&&$(W.value)!==L[4].drag&&S(W,L[4].drag),B&16&&$(Y.value)!==L[4].timeStep&&S(Y,L[4].timeStep),B&16&&$(z.value)!==L[4].particlesSize&&S(z,L[4].particlesSize),B&1&&$(K.value)!==L[0].width&&S(K,L[0].width),B&1&&$(mt.value)!==L[0].height&&S(mt,L[0].height)},i:ct,o:ct,d(L){L&&d(t),L&&d(n),L&&d(i),L&&d(s),L&&d(a),L&&d(nt),L&&d(q),Dt=!1,ke(qt)}}}function ia(e,t,o){const n={width:800,height:600},i={width:1200,height:500},s={width:200,height:20};let a=10,r=!1,f=!0;const c={interactionRange:6,drag:5,timeStep:10,particlesSize:20};let u,m;function T(){cancelAnimationFrame(m),u=Ce(),Tt(u.canvas);const{ids:H,positions:it,colors:Z}=Gr({texDimensions:s,worldDimensions:i,mode:"disk"});Hr(u,{ids:H,colors:Z,texDimensions:s});let M=ea(u,{positions:it,texDimensions:s});function nt(){if(Tt(u.canvas),!f)for(let q=0;q<a;q++)M=na({gl:u,texDimensions:s,worldDimensions:i,interactionRange:c.interactionRange,drag:c.drag,deltaTime:c.timeStep});return qr({gl:u,positionTex:M,texDimensions:s,worldDimensions:i,particlesSize:c.particlesSize,ids:H}),r?setTimeout(()=>m=requestAnimationFrame(nt),1e3):m=requestAnimationFrame(nt)}m=requestAnimationFrame(nt)}ee(()=>T());const b=()=>o(3,f=!f),_=()=>o(2,r=!r);function U(){a=$(this.value),o(1,a)}const P=()=>T();function I(){c.interactionRange=$(this.value),o(4,c)}function k(){c.drag=$(this.value),o(4,c)}function G(){c.timeStep=$(this.value),o(4,c)}function X(){c.particlesSize=$(this.value),o(4,c)}function j(){i.width=$(this.value),o(0,i)}function J(){i.height=$(this.value),o(0,i)}return[i,a,r,f,c,n,s,T,b,_,U,P,I,k,G,X,j,J]}class ra extends Yt{constructor(t){super(),Vt(this,t,ia,oa,Ht,{})}}const aa=`attribute float id;

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
`,sa=`precision mediump float;
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
`;let Fe,Re,Jn,ni;const la=(e,t)=>{const{ids:o,colors:n,texDimensions:i}=t;Re=yt(e,[aa,sa]),Fe={idAttributeLocation:e.getAttribLocation(Re,"id"),sizeUniformLocation:e.getUniformLocation(Re,"size"),texDimensionsUniformLocation:e.getUniformLocation(Re,"texDimensions"),worldDimensionsUniformLocation:e.getUniformLocation(Re,"worldDimensions"),positionTexUniformLocation:e.getUniformLocation(Re,"positionTex"),colorTexUniformLocation:e.getUniformLocation(Re,"colorTex")},Jn=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,Jn),e.bufferData(e.ARRAY_BUFFER,new Float32Array(o),e.STATIC_DRAW);const s=n.map(a=>[a,0,0,0]).flat();ni=Ft(e,new Float32Array(s),i.width,i.height)},ca=e=>{const{gl:t,positionTex:o,texDimensions:n,worldDimensions:i,particlesSize:s,ids:a}=e,r=1,f=t.FLOAT,c=!1,u=0,m=0;Tt(t.canvas),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,t.canvas.width,t.canvas.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.bindBuffer(t.ARRAY_BUFFER,Jn),t.vertexAttribPointer(Fe.idAttributeLocation,r,f,c,u,m),t.enableVertexAttribArray(Fe.idAttributeLocation),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,o),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,ni),t.useProgram(Re),t.uniform1f(Fe.sizeUniformLocation,s),t.uniform2f(Fe.worldDimensionsUniformLocation,i.width,i.height),t.uniform2f(Fe.texDimensionsUniformLocation,n.width,n.height),t.uniform1i(Fe.positionTexUniformLocation,0),t.uniform1i(Fe.colorTexUniformLocation,1),t.drawArrays(t.POINTS,m,a.length)};function fa(e,t,o){function n(){const s=e.getElementById(t);s&&(e.fullscreenElement&&e.exitFullscreen&&e.exitFullscreen(),s.width=o.width,s.height=o.height)}function i(){const s=e.getElementById(t);s&&(e.fullscreenElement||s.requestFullscreen())}return e.addEventListener("fullscreenchange",()=>{e.fullscreenElement===null&&n()}),{enableFullscreen:i,disableFullscreen:n}}function ua(e){const{texDimensions:t,worldDimensions:o,mode:n}=e,i=t.width*t.height,s=new Array(i).fill(0).map((f,c)=>c),a=new Array(i).fill(0).map(f=>Math.floor(Math.random()*3)),r=s.map(f=>{if(n==="random"){const{x:c,y:u}=da(o);return[c,u,0,0]}if(n==="disk"){const{x:u,y:m}=ha(o,200);return[u,m,0,0]}if(n==="square"){const{x:u,y:m}=ma(o,300);return[u,m,0,0]}if(n==="idDiagonal"){const{x:c,y:u}=pa(o,f,s.length);return[c,u,0,0]}if(n==="sinusoidal"){const{x:c,y:u}=Co(o,f,s.length,{x:1,y:5});return[c,u,0,0]}if(n==="circle"){const{x:c,y:u}=Co(o,f,s.length,{x:1,y:1});return[c,u,0,0]}}).flat();return{ids:s,positions:r,texDimensions:t,colors:a}}const da=e=>{const t=20+Math.random()*(e.width-40),o=Math.random()*(e.height-150);return{x:t,y:o}},ma=(e,t)=>{const o=Math.random()*t-t/2+e.width/2,n=Math.random()*t-t/2+e.height/2;return{x:o,y:n}},ha=(e,t)=>{const o=t*Math.random(),n=Math.random()*2*Math.PI,i=o*Math.cos(n)+e.width/2,s=o*Math.sin(n)+e.height/2;return{x:i,y:s}},pa=(e,t,o)=>{const n=Zn(t,0,o,0,e.width,!1),i=Zn(t,0,o,0,e.height,!1);return{x:n,y:i}},Co=(e,t,o,n)=>{const i=Zn(t,0,o,0,1,!0)*2*Math.PI,s=n.x,r=Math.cos(s*i)*200+e.width/2,f=n.y,u=Math.sin(f*i)*200+e.height/2;return{x:r,y:u}},Zn=function(e,t,o,n,i,s){const a=(e-t)/(o-t)*(i-n)+n;return s?n<i?Mo(a,n,i):Mo(a,i,n):a},Mo=function(e,t,o){return Math.max(Math.min(e,o),t)},va=`attribute vec4 position;
void main() {
    gl_Position = position;
}
`,xa=`precision highp float;

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

`;let ae,se,Qn,mn,Bn,No,zo,Ze,An,oi;const Ta=(e,t)=>{const{positions:o,colors:n,texDimensions:i}=t,s=xa.replace("{{TEX_WIDTH}}",i.width.toFixed(1)).replace("{{TEX_HEIGHT}}",i.height.toFixed(1));se=yt(e,[va,s]),ae={positionAttributeLocation:e.getAttribLocation(se,"position"),interactionRangeUniformLocation:e.getUniformLocation(se,"interactionRange"),dragUniformLocation:e.getUniformLocation(se,"drag"),deltaTimeUniformLocation:e.getUniformLocation(se,"deltaTime"),texDimensionsUniformLocation:e.getUniformLocation(se,"texDimensions"),worldDimensionsUniformLocation:e.getUniformLocation(se,"worldDimensions"),positionTexUniformLocation:e.getUniformLocation(se,"positionTex"),colorTexUniformLocation:e.getUniformLocation(se,"colorTex")},Qn=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,Qn),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW),mn=Ft(e,new Float32Array(o),i.width,i.height),Bn=Ft(e,null,i.width,i.height);const a=n.map(r=>[r,0,0,0]).flat();return oi=Ft(e,new Float32Array(a),i.width,i.height),No=Xt(e,mn),zo=Xt(e,Bn),Ze={fb:No,tex:mn},An={fb:zo,tex:Bn},mn},_a=e=>{const{gl:t,texDimensions:o,worldDimensions:n,interactionRange:i,drag:s,deltaTime:a}=e;t.bindFramebuffer(t.FRAMEBUFFER,An.fb),t.viewport(0,0,o.width,o.height),t.bindBuffer(t.ARRAY_BUFFER,Qn),t.enableVertexAttribArray(ae.positionAttributeLocation),t.vertexAttribPointer(ae.positionAttributeLocation,2,t.FLOAT,!1,0,0),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,Ze.tex),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,oi),t.useProgram(se),t.uniform1i(ae.positionTexUniformLocation,0),t.uniform1i(ae.colorTexUniformLocation,1),t.uniform1f(ae.dragUniformLocation,s),t.uniform1f(ae.interactionRangeUniformLocation,i),t.uniform1f(ae.deltaTimeUniformLocation,a),t.uniform2f(ae.texDimensionsUniformLocation,o.width,o.height),t.uniform2f(ae.worldDimensionsUniformLocation,n.width,n.height),t.drawArrays(t.TRIANGLES,0,6);{const r=Ze;Ze=An,An=r}return Ze.tex};function ga(e){let t,o,n,i,s=e[3]?"Play":"Pause",a,r,f,c=e[2]?"Normal Speed":"Slow Mo",u,m,T,b,_=e[6].width*e[6].height+"",U,P,I,k,G,X,j,J,H,it,Z,M,nt,q,w,C,Q,ot,xt,E,ft,tt,rt,wt,_t,W,Lt,ut,at,Ut,gt,Y,Pt,ht,dt,Bt,N,z,St,y,et,$t,It,K,Ct,lt,At,Mt,mt,pt,bt,Dt,qt;return{c(){t=h("canvas"),o=g(),n=h("div"),i=h("button"),a=F(s),r=g(),f=h("button"),u=F(c),m=g(),T=h("span"),b=F("particles: "),U=F(_),P=g(),I=h("label"),k=F("Smooth steps"),G=g(),X=h("input"),j=g(),J=h("button"),H=F("Reset"),it=g(),Z=h("button"),M=F("Fullscreen"),nt=g(),q=h("div"),w=h("ul"),C=h("li"),Q=h("label"),ot=F("Interaction Range"),xt=g(),E=h("input"),ft=g(),tt=h("li"),rt=h("label"),wt=F("Drag"),_t=g(),W=h("input"),Lt=g(),ut=h("li"),at=h("label"),Ut=F("Time step"),gt=g(),Y=h("input"),Pt=g(),ht=h("li"),dt=h("label"),Bt=F("Particles size"),N=g(),z=h("input"),St=g(),y=h("li"),et=h("label"),$t=F("World: width"),It=g(),K=h("input"),Ct=g(),lt=h("label"),At=F("height"),Mt=g(),mt=h("input"),pt=g(),bt=h("ul"),this.h()},l(L){t=p(L,"CANVAS",{id:!0,style:!0,width:!0,height:!0}),x(t).forEach(d),o=A(L),n=p(L,"DIV",{});var B=x(n);i=p(B,"BUTTON",{});var Et=x(i);a=R(Et,s),Et.forEach(d),r=A(B),f=p(B,"BUTTON",{});var Gt=x(f);u=R(Gt,c),Gt.forEach(d),m=A(B),T=p(B,"SPAN",{});var jt=x(T);b=R(jt,"particles: "),U=R(jt,_),jt.forEach(d),P=A(B),I=p(B,"LABEL",{for:!0});var re=x(I);k=R(re,"Smooth steps"),re.forEach(d),G=A(B),X=p(B,"INPUT",{type:!0,min:!0}),j=A(B),J=p(B,"BUTTON",{});var le=x(J);H=R(le,"Reset"),le.forEach(d),it=A(B),Z=p(B,"BUTTON",{});var kt=x(Z);M=R(kt,"Fullscreen"),kt.forEach(d),B.forEach(d),nt=A(L),q=p(L,"DIV",{});var ce=x(q);w=p(ce,"UL",{});var vt=x(w);C=p(vt,"LI",{});var Kt=x(C);Q=p(Kt,"LABEL",{for:!0});var _e=x(Q);ot=R(_e,"Interaction Range"),_e.forEach(d),xt=A(Kt),E=p(Kt,"INPUT",{id:!0,type:!0,min:!0}),Kt.forEach(d),ft=A(vt),tt=p(vt,"LI",{});var ne=x(tt);rt=p(ne,"LABEL",{for:!0});var oe=x(rt);wt=R(oe,"Drag"),oe.forEach(d),_t=A(ne),W=p(ne,"INPUT",{id:!0,type:!0,min:!0}),ne.forEach(d),Lt=A(vt),ut=p(vt,"LI",{});var O=x(ut);at=p(O,"LABEL",{for:!0});var st=x(at);Ut=R(st,"Time step"),st.forEach(d),gt=A(O),Y=p(O,"INPUT",{id:!0,type:!0,min:!0}),O.forEach(d),Pt=A(vt),ht=p(vt,"LI",{});var Nt=x(ht);dt=p(Nt,"LABEL",{for:!0});var ge=x(dt);Bt=R(ge,"Particles size"),ge.forEach(d),N=A(Nt),z=p(Nt,"INPUT",{id:!0,type:!0,min:!0}),Nt.forEach(d),St=A(vt),y=p(vt,"LI",{});var Rt=x(y);et=p(Rt,"LABEL",{for:!0});var Ae=x(et);$t=R(Ae,"World: width"),Ae.forEach(d),It=A(Rt),K=p(Rt,"INPUT",{id:!0,type:!0,min:!0}),Ct=A(Rt),lt=p(Rt,"LABEL",{for:!0});var be=x(lt);At=R(be,"height"),be.forEach(d),Mt=A(Rt),mt=p(Rt,"INPUT",{id:!0,type:!0,min:!0}),Rt.forEach(d),pt=A(vt),bt=p(vt,"UL",{}),x(bt).forEach(d),vt.forEach(d),ce.forEach(d),this.h()},h(){v(t,"id","canvas"),ie(t,"background-color","black"),v(t,"width",e[5].width),v(t,"height",e[5].height),v(I,"for","steps"),v(X,"type","number"),v(X,"min",0),v(Q,"for","interactionRange"),v(E,"id","interactionRange"),v(E,"type","number"),v(E,"min",0),v(rt,"for","drag"),v(W,"id","drag"),v(W,"type","number"),v(W,"min",0),v(at,"for","deltaTime"),v(Y,"id","deltaTime"),v(Y,"type","number"),v(Y,"min",0),v(dt,"for","particlesSize"),v(z,"id","particlesSize"),v(z,"type","number"),v(z,"min",0),v(et,"for","worldWidth"),v(K,"id","worldWidth"),v(K,"type","number"),v(K,"min",0),v(lt,"for","worldHeight"),v(mt,"id","worldHeight"),v(mt,"type","number"),v(mt,"min",0)},m(L,B){D(L,t,B),D(L,o,B),D(L,n,B),l(n,i),l(i,a),l(n,r),l(n,f),l(f,u),l(n,m),l(n,T),l(T,b),l(T,U),l(n,P),l(n,I),l(I,k),l(n,G),l(n,X),S(X,e[1]),l(n,j),l(n,J),l(J,H),l(n,it),l(n,Z),l(Z,M),D(L,nt,B),D(L,q,B),l(q,w),l(w,C),l(C,Q),l(Q,ot),l(C,xt),l(C,E),S(E,e[4].interactionRange),l(w,ft),l(w,tt),l(tt,rt),l(rt,wt),l(tt,_t),l(tt,W),S(W,e[4].drag),l(w,Lt),l(w,ut),l(ut,at),l(at,Ut),l(ut,gt),l(ut,Y),S(Y,e[4].timeStep),l(w,Pt),l(w,ht),l(ht,dt),l(dt,Bt),l(ht,N),l(ht,z),S(z,e[4].particlesSize),l(w,St),l(w,y),l(y,et),l(et,$t),l(y,It),l(y,K),S(K,e[0].width),l(y,Ct),l(y,lt),l(lt,At),l(y,Mt),l(y,mt),S(mt,e[0].height),l(w,pt),l(w,bt),Dt||(qt=[V(i,"click",e[9]),V(f,"click",e[10]),V(X,"input",e[11]),V(J,"click",e[12]),V(Z,"click",e[8]),V(E,"input",e[13]),V(W,"input",e[14]),V(Y,"input",e[15]),V(z,"input",e[16]),V(K,"input",e[17]),V(mt,"input",e[18])],Dt=!0)},p(L,[B]){B&8&&s!==(s=L[3]?"Play":"Pause")&&te(a,s),B&4&&c!==(c=L[2]?"Normal Speed":"Slow Mo")&&te(u,c),B&2&&$(X.value)!==L[1]&&S(X,L[1]),B&16&&$(E.value)!==L[4].interactionRange&&S(E,L[4].interactionRange),B&16&&$(W.value)!==L[4].drag&&S(W,L[4].drag),B&16&&$(Y.value)!==L[4].timeStep&&S(Y,L[4].timeStep),B&16&&$(z.value)!==L[4].particlesSize&&S(z,L[4].particlesSize),B&1&&$(K.value)!==L[0].width&&S(K,L[0].width),B&1&&$(mt.value)!==L[0].height&&S(mt,L[0].height)},i:ct,o:ct,d(L){L&&d(t),L&&d(o),L&&d(n),L&&d(nt),L&&d(q),Dt=!1,ke(qt)}}}function Aa(e,t,o){const n={width:800,height:600},i={width:800,height:600},s={width:500,height:10};let a=10,r=!1,f=!0;const c={interactionRange:6,drag:5,timeStep:10,particlesSize:4};let u,m;function T(){cancelAnimationFrame(m),u=Ce(),Tt(u.canvas);const{ids:it,positions:Z,colors:M}=ua({texDimensions:s,worldDimensions:i,mode:"disk"});la(u,{ids:it,colors:M,texDimensions:s});let nt=Ta(u,{positions:Z,colors:M,texDimensions:s});function q(){if(!f)for(let w=0;w<a;w++)nt=_a({gl:u,texDimensions:s,worldDimensions:i,interactionRange:c.interactionRange,drag:c.drag,deltaTime:c.timeStep});return ca({gl:u,positionTex:nt,texDimensions:s,worldDimensions:i,particlesSize:c.particlesSize,ids:it}),r?setTimeout(()=>m=requestAnimationFrame(q),1e3):m=requestAnimationFrame(q)}m=requestAnimationFrame(q)}const{enableFullscreen:b}=fa(document,"canvas",n);document.addEventListener("keydown",it=>{it.code==="Space"&&(o(3,f=!f),it.preventDefault())}),ee(()=>T());const _=()=>o(3,f=!f),U=()=>o(2,r=!r);function P(){a=$(this.value),o(1,a)}const I=()=>T();function k(){c.interactionRange=$(this.value),o(4,c)}function G(){c.drag=$(this.value),o(4,c)}function X(){c.timeStep=$(this.value),o(4,c)}function j(){c.particlesSize=$(this.value),o(4,c)}function J(){i.width=$(this.value),o(0,i)}function H(){i.height=$(this.value),o(0,i)}return[i,a,r,f,c,n,s,T,b,_,U,P,I,k,G,X,j,J,H]}class ba extends Yt{constructor(t){super(),Vt(this,t,Aa,ga,Ht,{})}}const wa=`attribute float id;

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
`,Ea=`precision mediump float;
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
`;let ye,De,to,ii;const Fa=(e,t)=>{const{ids:o,colors:n,texDimensions:i}=t;De=yt(e,[wa,Ea]),ye={idAttributeLocation:e.getAttribLocation(De,"id"),sizeUniformLocation:e.getUniformLocation(De,"size"),texDimensionsUniformLocation:e.getUniformLocation(De,"texDimensions"),worldDimensionsUniformLocation:e.getUniformLocation(De,"worldDimensions"),positionTexUniformLocation:e.getUniformLocation(De,"positionTex"),colorTexUniformLocation:e.getUniformLocation(De,"colorTex")},to=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,to),e.bufferData(e.ARRAY_BUFFER,new Float32Array(o),e.STATIC_DRAW);const s=n.map(a=>[a,0,0,0]).flat();ii=Ft(e,new Float32Array(s),i.width,i.height)},Ra=e=>{const{gl:t,positionTex:o,texDimensions:n,worldDimensions:i,particlesSize:s,ids:a}=e,r=1,f=t.FLOAT,c=!1,u=0,m=0;Tt(t.canvas),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,t.canvas.width,t.canvas.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.bindBuffer(t.ARRAY_BUFFER,to),t.vertexAttribPointer(ye.idAttributeLocation,r,f,c,u,m),t.enableVertexAttribArray(ye.idAttributeLocation),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,o),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,ii),t.useProgram(De),t.uniform1f(ye.sizeUniformLocation,s),t.uniform2f(ye.worldDimensionsUniformLocation,i.width,i.height),t.uniform2f(ye.texDimensionsUniformLocation,n.width,n.height),t.uniform1i(ye.positionTexUniformLocation,0),t.uniform1i(ye.colorTexUniformLocation,1),t.drawArrays(t.POINTS,m,a.length)};function ya(e,t,o){function n(){const s=e.getElementById(t);s&&(e.fullscreenElement&&e.exitFullscreen&&e.exitFullscreen(),s.width=o.width,s.height=o.height)}function i(){const s=e.getElementById(t);s&&(e.fullscreenElement||s.requestFullscreen())}return e.addEventListener("fullscreenchange",()=>{e.fullscreenElement===null&&n()}),{enableFullscreen:i,disableFullscreen:n}}function Da(e){const{texDimensions:t,worldDimensions:o,mode:n,nbColors:i}=e,s=t.width*t.height,a=new Array(s).fill(0).map((c,u)=>u),r=new Array(s).fill(0).map(c=>Math.floor(Math.random()*i)),f=a.map(c=>{if(n==="random"){const{x:u,y:m}=La(o);return[u,m,0,0]}if(n==="mesh"){const{x:u,y:m}=Sa(o,c,s);return[u,m,0,0]}if(n==="disk"){const u=Math.min(o.width,o.height)*.3,{x:m,y:T}=Pa(o,u);return[m,T,0,0]}if(n==="disk_offset"){const{x:T,y:b}=Ba(o,100,-150);return[T,b,0,0]}if(n==="square"){const{x:m,y:T}=Ua(o,300);return[m,T,0,0]}if(n==="idDiagonal"){const{x:u,y:m}=Ia(o,c,a.length);return[u,m,0,0]}if(n==="sinusoidal"){const{x:u,y:m}=Oo(o,c,a.length,{x:1,y:5});return[u,m,0,0]}if(n==="circle"){const{x:u,y:m}=Oo(o,c,a.length,{x:1,y:1});return[u,m,0,0]}}).flat();return{ids:a,positions:f,texDimensions:t,colors:r}}const La=e=>{const t=20+Math.random()*(e.width-40),o=Math.random()*(e.height-150);return{x:t,y:o}},Ua=(e,t)=>{const o=Math.random()*t-t/2+e.width/2,n=Math.random()*t-t/2+e.height/2;return{x:o,y:n}},Pa=(e,t)=>{const o=t*Math.random(),n=Math.random()*2*Math.PI,i=o*Math.cos(n)+e.width/2,s=o*Math.sin(n)+e.height/2;return{x:i,y:s}},Ba=(e,t,o)=>{const n=t*Math.random(),i=Math.random()*2*Math.PI,s=n*Math.cos(i)+e.width/2,a=n*Math.sin(i)+e.height/2;return{x:s+o,y:a}},Ia=(e,t,o)=>{const n=eo(t,0,o,0,e.width,!1),i=eo(t,0,o,0,e.height,!1);return{x:n,y:i}},Oo=(e,t,o,n)=>{const i=eo(t,0,o,0,1,!0)*2*Math.PI,s=n.x,r=Math.cos(s*i)*200+e.width/2,f=n.y,u=Math.sin(f*i)*200+e.height/2;return{x:r,y:u}},Sa=(e,t,o)=>{const n=Math.sqrt(o),i=Math.ceil(o/n),s=e.width/i,a=e.height/n,r=t%i*s+s/2,f=Math.floor(t/i)*a+a/2;return{x:r,y:f}},eo=function(e,t,o,n,i,s){const a=(e-t)/(o-t)*(i-n)+n;return s?n<i?Xo(a,n,i):Xo(a,i,n):a},Xo=function(e,t,o){return Math.max(Math.min(e,o),t)},$a=`attribute vec4 position;
void main() {
    gl_Position = position;
}
`,Ca=`precision highp float;

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
`;let Zt,Qt,no,hn,In,ko,Wo,Qe,bn,ri;const Ma=(e,t)=>{const{positions:o,colors:n,texDimensions:i}=t,s=Ca.replace("{{TEX_WIDTH}}",i.width.toFixed(1)).replace("{{TEX_HEIGHT}}",i.height.toFixed(1));Qt=yt(e,[$a,s]),Zt={positionAttributeLocation:e.getAttribLocation(Qt,"position"),wallsModeUniformLocation:e.getUniformLocation(Qt,"wallsMode"),gravityFactorUniformLocation:e.getUniformLocation(Qt,"gravityFactor"),interactionRangeUniformLocation:e.getUniformLocation(Qt,"interactionRange"),dragUniformLocation:e.getUniformLocation(Qt,"drag"),deltaTimeUniformLocation:e.getUniformLocation(Qt,"deltaTime"),texDimensionsUniformLocation:e.getUniformLocation(Qt,"texDimensions"),worldDimensionsUniformLocation:e.getUniformLocation(Qt,"worldDimensions"),positionTexUniformLocation:e.getUniformLocation(Qt,"positionTex"),colorTexUniformLocation:e.getUniformLocation(Qt,"colorTex")},no=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,no),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW),hn=Ft(e,new Float32Array(o),i.width,i.height),In=Ft(e,null,i.width,i.height);const a=n.map(r=>[r,0,0,0]).flat();return ri=Ft(e,new Float32Array(a),i.width,i.height),ko=Xt(e,hn),Wo=Xt(e,In),Qe={fb:ko,tex:hn},bn={fb:Wo,tex:In},hn},Na=e=>{const{gl:t,texDimensions:o,worldDimensions:n,wallsMode:i,gravityFactor:s,interactionRange:a,drag:r,deltaTime:f}=e;t.bindFramebuffer(t.FRAMEBUFFER,bn.fb),t.viewport(0,0,o.width,o.height),t.bindBuffer(t.ARRAY_BUFFER,no),t.enableVertexAttribArray(Zt.positionAttributeLocation),t.vertexAttribPointer(Zt.positionAttributeLocation,2,t.FLOAT,!1,0,0),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,Qe.tex),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,ri),t.useProgram(Qt),t.uniform1i(Zt.positionTexUniformLocation,0),t.uniform1i(Zt.colorTexUniformLocation,1);const u={wraped:0,box:1,bottom_wall:2}[i];t.uniform1f(Zt.wallsModeUniformLocation,u),t.uniform1f(Zt.gravityFactorUniformLocation,s),t.uniform1f(Zt.dragUniformLocation,r),t.uniform1f(Zt.interactionRangeUniformLocation,a),t.uniform1f(Zt.deltaTimeUniformLocation,f),t.uniform2f(Zt.texDimensionsUniformLocation,o.width,o.height),t.uniform2f(Zt.worldDimensionsUniformLocation,n.width,n.height),t.drawArrays(t.TRIANGLES,0,6);{const m=Qe;Qe=bn,bn=m}return Qe.tex};function za(e,t,o){const n=e.slice();return n[23]=t[o],n}function Oa(e){let t,o;return{c(){t=h("option"),o=F(e[23]),this.h()},l(n){t=p(n,"OPTION",{});var i=x(t);o=R(i,e[23]),i.forEach(d),this.h()},h(){t.__value=e[23],t.value=t.__value},m(n,i){D(n,t,i),l(t,o)},p:ct,d(n){n&&d(t)}}}function Xa(e){let t,o,n,i,s=e[3]?"Play":"Pause",a,r,f,c=e[2]?"Normal Speed":"Slow Mo",u,m,T,b,_=e[6].width*e[6].height+"",U,P,I,k,G,X,j,J,H,it,Z,M,nt,q,w,C,Q,ot,xt,E,ft,tt,rt,wt,_t,W,Lt,ut,at,Ut,gt,Y,Pt,ht,dt,Bt,N,z,St,y,et,$t,It,K,Ct,lt,At,Mt,mt,pt,bt,Dt,qt,L,B,Et,Gt,jt,re,le,kt,ce,vt,Kt,_e,ne=["box","wraped","bottom_wall"],oe=[];for(let O=0;O<3;O+=1)oe[O]=Oa(za(e,ne,O));return{c(){t=h("canvas"),o=g(),n=h("div"),i=h("button"),a=F(s),r=g(),f=h("button"),u=F(c),m=g(),T=h("span"),b=F("particles: "),U=F(_),P=g(),I=h("label"),k=F("Smooth steps"),G=g(),X=h("input"),j=g(),J=h("button"),H=F("Reset"),it=g(),Z=h("button"),M=F("Fullscreen"),nt=g(),q=h("div"),w=h("ul"),C=h("li"),Q=h("label"),ot=F("Interaction Range"),xt=g(),E=h("input"),ft=g(),tt=h("li"),rt=h("label"),wt=F("Drag"),_t=g(),W=h("input"),Lt=g(),ut=h("li"),at=h("label"),Ut=F("Time step"),gt=g(),Y=h("input"),Pt=g(),ht=h("li"),dt=h("label"),Bt=F("Gravity factor"),N=g(),z=h("input"),St=g(),y=h("li"),et=h("label"),$t=F("Particles size"),It=g(),K=h("input"),Ct=g(),lt=h("li"),At=h("label"),Mt=F("World: width"),mt=g(),pt=h("input"),bt=g(),Dt=h("label"),qt=F("height"),L=g(),B=h("input"),Et=g(),Gt=h("li"),jt=h("label"),re=F("Walls mode"),le=g(),kt=h("select");for(let O=0;O<3;O+=1)oe[O].c();ce=g(),vt=h("ul"),this.h()},l(O){t=p(O,"CANVAS",{id:!0,style:!0,width:!0,height:!0}),x(t).forEach(d),o=A(O),n=p(O,"DIV",{});var st=x(n);i=p(st,"BUTTON",{});var Nt=x(i);a=R(Nt,s),Nt.forEach(d),r=A(st),f=p(st,"BUTTON",{});var ge=x(f);u=R(ge,c),ge.forEach(d),m=A(st),T=p(st,"SPAN",{});var Rt=x(T);b=R(Rt,"particles: "),U=R(Rt,_),Rt.forEach(d),P=A(st),I=p(st,"LABEL",{for:!0});var Ae=x(I);k=R(Ae,"Smooth steps"),Ae.forEach(d),G=A(st),X=p(st,"INPUT",{type:!0,min:!0}),j=A(st),J=p(st,"BUTTON",{});var be=x(J);H=R(be,"Reset"),be.forEach(d),it=A(st),Z=p(st,"BUTTON",{});var ao=x(Z);M=R(ao,"Fullscreen"),ao.forEach(d),st.forEach(d),nt=A(O),q=p(O,"DIV",{});var so=x(q);w=p(so,"UL",{});var zt=x(w);C=p(zt,"LI",{});var tn=x(C);Q=p(tn,"LABEL",{for:!0});var lo=x(Q);ot=R(lo,"Interaction Range"),lo.forEach(d),xt=A(tn),E=p(tn,"INPUT",{id:!0,type:!0,min:!0}),tn.forEach(d),ft=A(zt),tt=p(zt,"LI",{});var en=x(tt);rt=p(en,"LABEL",{for:!0});var co=x(rt);wt=R(co,"Drag"),co.forEach(d),_t=A(en),W=p(en,"INPUT",{id:!0,type:!0,min:!0}),en.forEach(d),Lt=A(zt),ut=p(zt,"LI",{});var nn=x(ut);at=p(nn,"LABEL",{for:!0});var fo=x(at);Ut=R(fo,"Time step"),fo.forEach(d),gt=A(nn),Y=p(nn,"INPUT",{id:!0,type:!0,min:!0}),nn.forEach(d),Pt=A(zt),ht=p(zt,"LI",{});var on=x(ht);dt=p(on,"LABEL",{for:!0});var uo=x(dt);Bt=R(uo,"Gravity factor"),uo.forEach(d),N=A(on),z=p(on,"INPUT",{id:!0,type:!0,min:!0,max:!0}),on.forEach(d),St=A(zt),y=p(zt,"LI",{});var rn=x(y);et=p(rn,"LABEL",{for:!0});var mo=x(et);$t=R(mo,"Particles size"),mo.forEach(d),It=A(rn),K=p(rn,"INPUT",{id:!0,type:!0,min:!0}),rn.forEach(d),Ct=A(zt),lt=p(zt,"LI",{});var we=x(lt);At=p(we,"LABEL",{for:!0});var ho=x(At);Mt=R(ho,"World: width"),ho.forEach(d),mt=A(we),pt=p(we,"INPUT",{id:!0,type:!0,min:!0}),bt=A(we),Dt=p(we,"LABEL",{for:!0});var po=x(Dt);qt=R(po,"height"),po.forEach(d),L=A(we),B=p(we,"INPUT",{id:!0,type:!0,min:!0}),we.forEach(d),Et=A(zt),Gt=p(zt,"LI",{});var an=x(Gt);jt=p(an,"LABEL",{for:!0});var vo=x(jt);re=R(vo,"Walls mode"),vo.forEach(d),le=A(an),kt=p(an,"SELECT",{});var xo=x(kt);for(let Fn=0;Fn<3;Fn+=1)oe[Fn].l(xo);xo.forEach(d),an.forEach(d),ce=A(zt),vt=p(zt,"UL",{}),x(vt).forEach(d),zt.forEach(d),so.forEach(d),this.h()},h(){v(t,"id","canvas"),ie(t,"background-color","black"),v(t,"width",e[5].width),v(t,"height",e[5].height),v(I,"for","steps"),v(X,"type","number"),v(X,"min",0),v(Q,"for","interactionRange"),v(E,"id","interactionRange"),v(E,"type","number"),v(E,"min",0),v(rt,"for","drag"),v(W,"id","drag"),v(W,"type","number"),v(W,"min",0),v(at,"for","deltaTime"),v(Y,"id","deltaTime"),v(Y,"type","number"),v(Y,"min",0),v(dt,"for","gravityFactor"),v(z,"id","gravityFactor"),v(z,"type","number"),v(z,"min",-5),v(z,"max",5),v(et,"for","particlesSize"),v(K,"id","particlesSize"),v(K,"type","number"),v(K,"min",0),v(At,"for","worldWidth"),v(pt,"id","worldWidth"),v(pt,"type","number"),v(pt,"min",0),v(Dt,"for","worldHeight"),v(B,"id","worldHeight"),v(B,"type","number"),v(B,"min",0),v(jt,"for","wallsMode"),e[4].wallsMode===void 0&&ai(()=>e[20].call(kt))},m(O,st){D(O,t,st),D(O,o,st),D(O,n,st),l(n,i),l(i,a),l(n,r),l(n,f),l(f,u),l(n,m),l(n,T),l(T,b),l(T,U),l(n,P),l(n,I),l(I,k),l(n,G),l(n,X),S(X,e[1]),l(n,j),l(n,J),l(J,H),l(n,it),l(n,Z),l(Z,M),D(O,nt,st),D(O,q,st),l(q,w),l(w,C),l(C,Q),l(Q,ot),l(C,xt),l(C,E),S(E,e[4].interactionRange),l(w,ft),l(w,tt),l(tt,rt),l(rt,wt),l(tt,_t),l(tt,W),S(W,e[4].drag),l(w,Lt),l(w,ut),l(ut,at),l(at,Ut),l(ut,gt),l(ut,Y),S(Y,e[4].timeStep),l(w,Pt),l(w,ht),l(ht,dt),l(dt,Bt),l(ht,N),l(ht,z),S(z,e[4].gravityFactor),l(w,St),l(w,y),l(y,et),l(et,$t),l(y,It),l(y,K),S(K,e[4].particlesSize),l(w,Ct),l(w,lt),l(lt,At),l(At,Mt),l(lt,mt),l(lt,pt),S(pt,e[0].width),l(lt,bt),l(lt,Dt),l(Dt,qt),l(lt,L),l(lt,B),S(B,e[0].height),l(w,Et),l(w,Gt),l(Gt,jt),l(jt,re),l(Gt,le),l(Gt,kt);for(let Nt=0;Nt<3;Nt+=1)oe[Nt].m(kt,null);To(kt,e[4].wallsMode),l(w,ce),l(w,vt),Kt||(_e=[V(i,"click",e[9]),V(f,"click",e[10]),V(X,"input",e[11]),V(J,"click",e[12]),V(Z,"click",e[8]),V(E,"input",e[13]),V(W,"input",e[14]),V(Y,"input",e[15]),V(z,"input",e[16]),V(K,"input",e[17]),V(pt,"input",e[18]),V(B,"input",e[19]),V(kt,"change",e[20])],Kt=!0)},p(O,[st]){st&8&&s!==(s=O[3]?"Play":"Pause")&&te(a,s),st&4&&c!==(c=O[2]?"Normal Speed":"Slow Mo")&&te(u,c),st&2&&$(X.value)!==O[1]&&S(X,O[1]),st&16&&$(E.value)!==O[4].interactionRange&&S(E,O[4].interactionRange),st&16&&$(W.value)!==O[4].drag&&S(W,O[4].drag),st&16&&$(Y.value)!==O[4].timeStep&&S(Y,O[4].timeStep),st&16&&$(z.value)!==O[4].gravityFactor&&S(z,O[4].gravityFactor),st&16&&$(K.value)!==O[4].particlesSize&&S(K,O[4].particlesSize),st&1&&$(pt.value)!==O[0].width&&S(pt,O[0].width),st&1&&$(B.value)!==O[0].height&&S(B,O[0].height),st&16&&To(kt,O[4].wallsMode)},i:ct,o:ct,d(O){O&&d(t),O&&d(o),O&&d(n),O&&d(nt),O&&d(q),oo(oe,O),Kt=!1,ke(_e)}}}function ka(e,t,o){const n={width:800,height:600},i={width:800,height:600},s={width:500,height:10};let a=10,r=!1,f=!0;const c={interactionRange:10,drag:5,timeStep:10,particlesSize:3,gravityFactor:0,wallsMode:"wraped"};let u,m;function T(){cancelAnimationFrame(m),u=Ce(),Tt(u.canvas);const{ids:M,positions:nt,colors:q}=Da({texDimensions:s,worldDimensions:i,mode:"mesh",nbColors:1});Fa(u,{ids:M,colors:q,texDimensions:s});let w=Ma(u,{positions:nt,colors:q,texDimensions:s});function C(){if(!f)for(let Q=0;Q<a;Q++)w=Na({gl:u,texDimensions:s,worldDimensions:i,interactionRange:c.interactionRange,drag:c.drag,deltaTime:c.timeStep,gravityFactor:c.gravityFactor,wallsMode:c.wallsMode});return Ra({gl:u,positionTex:w,texDimensions:s,worldDimensions:i,particlesSize:c.particlesSize,ids:M}),r?setTimeout(()=>m=requestAnimationFrame(C),1e3):m=requestAnimationFrame(C)}m=requestAnimationFrame(C)}const{enableFullscreen:b}=ya(document,"canvas",n);document.addEventListener("keydown",M=>{M.code==="Space"&&(o(3,f=!f),M.preventDefault())}),ee(()=>T());const _=()=>o(3,f=!f),U=()=>o(2,r=!r);function P(){a=$(this.value),o(1,a)}const I=()=>T();function k(){c.interactionRange=$(this.value),o(4,c)}function G(){c.drag=$(this.value),o(4,c)}function X(){c.timeStep=$(this.value),o(4,c)}function j(){c.gravityFactor=$(this.value),o(4,c)}function J(){c.particlesSize=$(this.value),o(4,c)}function H(){i.width=$(this.value),o(0,i)}function it(){i.height=$(this.value),o(0,i)}function Z(){c.wallsMode=si(this),o(4,c)}return[i,a,r,f,c,n,s,T,b,_,U,P,I,k,G,X,j,J,H,it,Z]}class Wa extends Yt{constructor(t){super(),Vt(this,t,ka,Xa,Ht,{})}}function Ya(e){let t,o;return{c(){t=h("h1"),o=F("Coucou")},l(n){t=p(n,"H1",{});var i=x(t);o=R(i,"Coucou"),i.forEach(d)},m(n,i){D(n,t,i),l(t,o)},p:ct,i:ct,o:ct,d(n){n&&d(t)}}}const Ot=512,pn=64;function Yo(e,t,o){return Math.min(Math.max(2*o*e/t-1,-.999),.999)}function Va(e){const t=fi({extensions:["OES_texture_float"]}),o=Array(2).fill(0).map(()=>t.framebuffer({radius:Ot,colorType:"float",depthStencil:!1})),n=t({vert:`
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
  `,depth:{enable:!1},framebuffer:f=>o[(f.tick+1)%2],uniforms:{state:({tick:f})=>o[f%2],shapeX:t.context("viewportWidth"),shapeY:t.context("viewportHeight"),deltaT:.1,gravity:-.5},attributes:{position:[0,-4,4,4,-4,4]},primitive:"triangles",elements:null,offset:0,count:3}),i=t({vert:`
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
  `,attributes:{sprite:Array(Ot*Ot).fill(0).map(function(f,c){const u=c%Ot,m=c/Ot|0;return[u/Ot,m/Ot]}).reverse()},uniforms:{state:({tick:f})=>o[f%2]},primitive:"points",offset:(f,c)=>Ot*Ot-c.count,elements:null,count:t.prop("count")});let s=0;const a={data:new Float32Array(4*pn),width:pn,height:1},r=document.createElement("div");return Object.assign(r.style,{color:"white",position:"absolute",left:"20px",top:"20px","z-index":20}),document.body.appendChild(r),t.frame(({tick:f,drawingBufferWidth:c,drawingBufferHeight:u,pixelRatio:m})=>{const T=Yo(100,c,m),b=-Yo(100,u,m);if(Math.random()<.01){for(let _=0;_<pn;++_)a.data[4*_]=T,a.data[4*_+1]=b,a.data[4*_+2]=.25*(Math.random()-.5),a.data[4*_+3]=Math.random();o[f%2].color[0].subimage(a,s%Ot,(s/Ot|0)%Ot),s+=pn,r.innerText=Math.min(s,Ot*Ot).toString()}n(),t.clear({color:[0,0,0,1],depth:1}),i({count:Math.min(s,Ot*Ot)})}),[]}class Ha extends Yt{constructor(t){super(),Vt(this,t,Va,Ya,Ht,{})}}function Vo(e,t,o){const n=e.slice();return n[1]=t[o],n}function Ho(e,t,o){const n=e.slice();return n[1]=t[o],n}function qa(e){let t;return{c(){t=F("About")},l(o){t=R(o,"About")},m(o,n){D(o,t,n)},d(o){o&&d(t)}}}function Ga(e){let t=e[1].title+"",o;return{c(){o=F(t)},l(n){o=R(n,t)},m(n,i){D(n,o,i)},p:ct,d(n){n&&d(o)}}}function qo(e){let t,o;return t=new Ko({props:{$$slots:{default:[Ga]},$$scope:{ctx:e}}}),{c(){ve(t.$$.fragment)},l(n){Le(t.$$.fragment,n)},m(n,i){xe(t,n,i),o=!0},p(n,i){const s={};i&64&&(s.$$scope={dirty:i,ctx:n}),t.$set(s)},i(n){o||(Wt(t.$$.fragment,n),o=!0)},o(n){Jt(t.$$.fragment,n),o=!1},d(n){Te(t,n)}}}function ja(e){let t,o,n,i;t=new Ko({props:{$$slots:{default:[qa]},$$scope:{ctx:e}}});let s=e[0],a=[];for(let f=0;f<s.length;f+=1)a[f]=qo(Ho(e,s,f));const r=f=>Jt(a[f],1,1,()=>{a[f]=null});return{c(){ve(t.$$.fragment),o=g();for(let f=0;f<a.length;f+=1)a[f].c();n=wn()},l(f){Le(t.$$.fragment,f),o=A(f);for(let c=0;c<a.length;c+=1)a[c].l(f);n=wn()},m(f,c){xe(t,f,c),D(f,o,c);for(let u=0;u<a.length;u+=1)a[u].m(f,c);D(f,n,c),i=!0},p(f,c){const u={};if(c&64&&(u.$$scope={dirty:c,ctx:f}),t.$set(u),c&1){s=f[0];let m;for(m=0;m<s.length;m+=1){const T=Ho(f,s,m);a[m]?(a[m].p(T,c),Wt(a[m],1)):(a[m]=qo(T),a[m].c(),Wt(a[m],1),a[m].m(n.parentNode,n))}for(io(),m=s.length;m<a.length;m+=1)r(m);ro()}},i(f){if(!i){Wt(t.$$.fragment,f);for(let c=0;c<s.length;c+=1)Wt(a[c]);i=!0}},o(f){Jt(t.$$.fragment,f),a=a.filter(Boolean);for(let c=0;c<a.length;c+=1)Jt(a[c]);i=!1},d(f){Te(t,f),f&&d(o),oo(a,f),f&&d(n)}}}function Ka(e){let t,o;return{c(){t=h("p"),o=F("This page is an experiment to run simulation on the GPU.")},l(n){t=p(n,"P",{});var i=x(t);o=R(i,"This page is an experiment to run simulation on the GPU."),i.forEach(d)},m(n,i){D(n,t,i),l(t,o)},p:ct,d(n){n&&d(t)}}}function Ja(e){let t,o,n;var i=e[1].component;function s(a){return{}}return i&&(t=_o(i,s())),{c(){t&&ve(t.$$.fragment),o=g()},l(a){t&&Le(t.$$.fragment,a),o=A(a)},m(a,r){t&&xe(t,a,r),D(a,o,r),n=!0},p(a,r){if(i!==(i=a[1].component)){if(t){io();const f=t;Jt(f.$$.fragment,1,0,()=>{Te(f,1)}),ro()}i?(t=_o(i,s()),ve(t.$$.fragment),Wt(t.$$.fragment,1),xe(t,o.parentNode,o)):t=null}},i(a){n||(t&&Wt(t.$$.fragment,a),n=!0)},o(a){t&&Jt(t.$$.fragment,a),n=!1},d(a){t&&Te(t,a),a&&d(o)}}}function Go(e){let t,o;return t=new jo({props:{$$slots:{default:[Ja]},$$scope:{ctx:e}}}),{c(){ve(t.$$.fragment)},l(n){Le(t.$$.fragment,n)},m(n,i){xe(t,n,i),o=!0},p(n,i){const s={};i&64&&(s.$$scope={dirty:i,ctx:n}),t.$set(s)},i(n){o||(Wt(t.$$.fragment,n),o=!0)},o(n){Jt(t.$$.fragment,n),o=!1},d(n){Te(t,n)}}}function Za(e){let t,o,n,i,s,a;t=new ci({props:{$$slots:{default:[ja]},$$scope:{ctx:e}}}),n=new jo({props:{$$slots:{default:[Ka]},$$scope:{ctx:e}}});let r=e[0],f=[];for(let u=0;u<r.length;u+=1)f[u]=Go(Vo(e,r,u));const c=u=>Jt(f[u],1,1,()=>{f[u]=null});return{c(){ve(t.$$.fragment),o=g(),ve(n.$$.fragment),i=g();for(let u=0;u<f.length;u+=1)f[u].c();s=wn()},l(u){Le(t.$$.fragment,u),o=A(u),Le(n.$$.fragment,u),i=A(u);for(let m=0;m<f.length;m+=1)f[m].l(u);s=wn()},m(u,m){xe(t,u,m),D(u,o,m),xe(n,u,m),D(u,i,m);for(let T=0;T<f.length;T+=1)f[T].m(u,m);D(u,s,m),a=!0},p(u,m){const T={};m&64&&(T.$$scope={dirty:m,ctx:u}),t.$set(T);const b={};if(m&64&&(b.$$scope={dirty:m,ctx:u}),n.$set(b),m&1){r=u[0];let _;for(_=0;_<r.length;_+=1){const U=Vo(u,r,_);f[_]?(f[_].p(U,m),Wt(f[_],1)):(f[_]=Go(U),f[_].c(),Wt(f[_],1),f[_].m(s.parentNode,s))}for(io(),_=r.length;_<f.length;_+=1)c(_);ro()}},i(u){if(!a){Wt(t.$$.fragment,u),Wt(n.$$.fragment,u);for(let m=0;m<r.length;m+=1)Wt(f[m]);a=!0}},o(u){Jt(t.$$.fragment,u),Jt(n.$$.fragment,u),f=f.filter(Boolean);for(let m=0;m<f.length;m+=1)Jt(f[m]);a=!1},d(u){Te(t,u),u&&d(o),Te(n,u),u&&d(i),oo(f,u),u&&d(s)}}}function Qa(e){let t,o,n;return o=new li({props:{$$slots:{default:[Za]},$$scope:{ctx:e}}}),{c(){t=h("div"),ve(o.$$.fragment)},l(i){t=p(i,"DIV",{});var s=x(t);Le(o.$$.fragment,s),s.forEach(d)},m(i,s){D(i,t,s),xe(o,t,null),n=!0},p(i,[s]){const a={};s&64&&(a.$$scope={dirty:s,ctx:i}),o.$set(a)},i(i){n||(Wt(o.$$.fragment,i),n=!0)},o(i){Jt(o.$$.fragment,i),n=!1},d(i){i&&d(t),Te(o)}}}function ts(e){return[[{title:"test 1",component:xi},{title:"test 2",component:Ai},{title:"test 3",component:Li},{title:"test 4",component:Si},{title:"test 5",component:Xi},{title:"test 6",component:Qi},{title:"test 7",component:dr},{title:"test 8",component:yr},{title:"test 9",component:Wr},{title:"test 10",component:ra},{title:"test 11",component:ba},{title:"test 12",component:Wa},{title:"regl",component:Ha}]]}class es extends Yt{constructor(t){super(),Vt(this,t,ts,Qa,Ht,{})}}function ns(e){let t,o;return t=new es({}),{c(){ve(t.$$.fragment)},l(n){Le(t.$$.fragment,n)},m(n,i){xe(t,n,i),o=!0},p:ct,i(n){o||(Wt(t.$$.fragment,n),o=!0)},o(n){Jt(t.$$.fragment,n),o=!1},d(n){Te(t,n)}}}class ls extends Yt{constructor(t){super(),Vt(this,t,null,ns,Ht,{})}}export{ls as default};
