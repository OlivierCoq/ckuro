import{s as h}from"./C2pcbY5Z.js";import{o as f,v as u,a0 as v,x as s,t as m}from"./nI3R1_-z.js";const _={class:"h-[100vh] w-full relative"},p=s("canvas",{id:"c",class:"w-full h-full absolute z-0"},null,-1),w=s("div",{class:"w-full h-full absolute z-10 bg-black opacity-[0.5]"},null,-1),y={__name:"home",setup(g){return f(()=>{var t=document.getElementById("c"),a=t.getContext("2d");t.height=window.innerHeight,t.width=window.innerWidth;var r="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";r=r.split("");for(var o=10,i=t.width/o,l=[],n=0;n<i;n++)l[n]=1;function c(){a.fillStyle="rgba(0, 0, 0, 0.04)",a.fillRect(0,0,t.width,t.height),a.fillStyle="#f4427d",a.font=o+"px arial";for(var e=0;e<l.length;e++){var d=r[Math.floor(Math.random()*r.length)];a.fillText(d,e*o,l[e]*o),l[e]*o>t.height&&Math.random()>.975&&(l[e]=0),l[e]++}}h(c,35)}),(t,a)=>(m(),u("div",_,[p,w,v(t.$slots,"default")]))}};export{y as default};