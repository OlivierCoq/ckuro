import{a1 as m,O as k,t,v as s,T as _,U as f,x as a,X as u,R as n,y as x,V as v,q as y}from"./nI3R1_-z.js";import{q as w}from"./DdzLn5g6.js";const g={id:"site_nav",class:"w-full mb-5 flex flex-row items-start justify-start align-start rounded-sm shadow-xl"},R={key:0,class:"w-full p-4 flex flex-col"},T={class:"w-1/3 p-4"},b=["href"],q={key:1,class:"w-full p-4 flex flex-col"},C={class:"w-1/3 p-4"},N=["href"],U={__name:"Nav",props:{links:{type:Array,required:!1}},setup(d){const h=y(),i=d,o=m(),r=k({nav_links:[]});return fetch(`${h.public.NUXT_STRAPI_URL}/api/site-nav?${w.stringify({populate:["links","links.imagery"]},{arrayFormat:"comma"})}`,{method:"GET",headers:{"Content-Type":"application/json"}}).then(async c=>{const p=await c.json();r.nav_links=p.data.links}),(c,p)=>(t(),s("div",g,[i.links?(t(),s("div",R,[(t(!0),s(_,null,f(i.links,(e,l)=>(t(),s("div",{key:l,class:"flex flex-row"},[a("div",T,[a("a",{href:e.link,class:u(["text-white text-xl font-thin matrix hover-text-primary_accent cursor-pointer uppercase",{"text-primary_accent":n(o).path===e.link}])},x(e.label),11,b)])]))),128))])):n(r).nav_links?(t(),s("div",q,[(t(!0),s(_,null,f(n(r).nav_links,(e,l)=>(t(),s("div",{key:l,class:"flex flex-row"},[a("div",C,[a("a",{href:e.link,class:u(["text-white text-xl font-thin matrix hover-text-primary_accent cursor-pointer uppercase",{"text-primary_accent":n(o).path===e.link}])},x(e.label),11,N)])]))),128))])):v("",!0)]))}};export{U as _};
