import{O as _,v as e,x as o,y as r,R as l,T as h,U as p,q as m,t as n}from"./nI3R1_-z.js";import{q as u}from"./DdzLn5g6.js";const x={class:"absolute top-0 left-0 right-0 z-20 flex flex-col justify-center align-middle h-[100vh] w-[100vw]"},d={href:"/",class:"text-white matrix text-6xl font-thin fade-in text-center neon-flicker"},v={class:"w-full lg:w-2/3 mx-auto p-4 flex flex-row items-center justify-between pt-20"},k=["href"],T={__name:"index",setup(y){const c=m(),t=_({title:"cKuro",nav_links:[]});return fetch(`${c.public.NUXT_STRAPI_URL}/api/site-nav?${u.stringify({populate:["links"]},{arrayFormat:"comma"})}`,{method:"GET",headers:{"Content-Type":"application/json"}}).then(async s=>{const a=await s.json();t.nav_links=a.data.links}),(s,a)=>(n(),e("div",x,[o("a",d,r(l(t).title),1),o("div",v,[(n(!0),e(h,null,p(l(t).nav_links,(i,f)=>(n(),e("a",{key:f,href:i.link,class:"text-white text-lg font-thin fade-in mx-3 matrix hover-text-primary_accent hover:cursor-pointer"},r(i.label),9,k))),128))])]))}};export{T as default};
