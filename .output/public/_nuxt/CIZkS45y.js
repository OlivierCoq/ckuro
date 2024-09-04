import{_ as b}from"./D5BKu47g.js";import{v as o,x as t,P as k,Q as j,R as s,S,z as h,T as f,U as u,V as n,W as d,i as z,t as r,X as w,y}from"./nI3R1_-z.js";import{u as C}from"./DJVIPVLg.js";import $ from"./amj7a7fq.js";import F from"./DICLxDdM.js";import V from"./CAXFi_ho.js";import"./DdzLn5g6.js";import"./C2pcbY5Z.js";import"./Bw259mK9.js";const B={class:"w-full absolute z-20 h-[80vh] mx-auto p-10"},N=t("div",{class:"container mx-auto py-10 ps-20 text-center"},[t("a",{href:"/",class:"text-white neon-flicker matrix text-6xl font-thin fade-in ms-[-15rem]"},"cKuro")],-1),T={class:"main-ctr mx-auto h-full lg:px-20 flex flex-col lg:flex-row items-start justify-start"},K={class:"w-full lg:w-[655px] h-full flex flex-col lg:flex-row me-5"},q={class:"ctr-main h-full shadow-xl me-5"},A={class:"w-full h-full flex flex-col justify-start items-start align-start py-4"},D={class:"flex flex-row w-full mb-4 px-4"},M={class:"w-[90%] h-[40px] border-thin border-light p-2 me-2"},U={class:"w-full h-full flex flex-col justify-start items-start align-start"},E={class:"w-full h-[120px] flex flex-col justify-start items-start align-start"},L={key:0,class:"w-full flex flex-wrap justify-start items-start align-start px-4 mb-4"},P=t("p",{class:"text-white font-bold me-3"},"genres:",-1),Q=["onClick"],R={class:"text-white font-thin"},W={key:1,class:"w-full flex flex-wrap justify-start items-start align-start px-4 mb-4"},X=t("p",{class:"text-white font-bold me-2"},"artists:",-1),G=["onClick"],H={class:"text-white font-thin"},I=t("p",{class:"text-white font-thin me-2"},"clear",-1),J={class:"w-full h-[40px] flex flex-row justify-start items-center align-center mx-4 py-4"},O=t("div",{class:"w-[10%] text-gray-400 font-thin ps-4"},null,-1),Y=t("div",{class:"w-[40%] text-gray-400 font-thin"},"Title",-1),Z=t("div",{class:"w-[25%] text-gray-400 font-thin"},"Artist",-1),tt={class:"w-[25%] text-gray-400 font-thin"},et={key:0,class:"w-[95%] mx-auto h-[75%] overflow-y-scroll relative"},st={class:"w-full h-full order-first lg:order-last flex flex-col justify-between mb-4"},lt={class:"w-full flex flex-col h-[70%] overflow-y-scroll align-start rounded-sm shadow-xl relative"},rt=t("h2",{class:"text-white text-md font-thin matrix hover-text-primary_accent cursor-pointer"}," Artists ",-1),_t={__name:"index",setup(ot){const e=C();return e.init_music(),(it,i)=>{var x,m,_,p;const c=z("font-awesome-icon"),v=b;return r(),o(f,null,[t("div",B,[N,t("div",T,[t("div",K,[t("div",q,[t("div",A,[t("div",D,[t("div",M,[k(t("input",{type:"text",class:"w-full h-full bg-transparent text-white font-thin search",placeholder:"Search for music...","onUpdate:modelValue":i[0]||(i[0]=l=>s(e).search.query=l),onKeydown:[i[1]||(i[1]=(...l)=>s(e).doSearch&&s(e).doSearch(...l)),i[2]||(i[2]=S((...l)=>s(e).clearSearch&&s(e).clearSearch(...l),["backspace"]))]},null,544),[[j,s(e).search.query]])]),t("button",{class:"border-thin border-light w-[10%] font-thin flex flex-col justify-center align-center items-center hover:curser-pointer",onClick:i[3]||(i[3]=(...l)=>s(e).doSearch&&s(e).doSearch(...l))},[h(c,{icon:["fas","magnifying-glass"],color:"#8d8484"})])]),t("div",U,[t("div",E,[s(e).interface?(r(),o("div",L,[P,(r(!0),o(f,null,u(s(e).interface.data.genres,(l,a)=>(r(),o("div",{key:a,class:w(["filter-box h-[40px] px-2 py-1 bg-zinc-700 hover:bg-zinc-800 cursor-pointer rounded-md me-2 flex flex-col justify-center items-center",{"bg-primary_accent":l.active}]),onClick:g=>s(e).doFilter(l)},[t("p",R,y(l.label),1)],10,Q))),128))])):n("",!0),s(e).interface?(r(),o("div",W,[X,(r(!0),o(f,null,u(s(e).interface.data.artists,(l,a)=>(r(),o("div",{key:a,class:w(["filter-box h-[40px] px-2 py-1 bg-zinc-700 hover:bg-zinc-800 cursor-pointer rounded-md me-2 flex flex-col justify-center items-center",{"bg-primary_accent":l.active}]),onClick:g=>s(e).doFilter(l)},[t("p",H,y(l.label),1)],10,G))),128))])):n("",!0),s(e).search.filters.length>0?(r(),o("div",{key:2,class:"filter-box h-[30px] px-2 py-1 cursor-pointer rounded-md me-2 flex flex-row justify-center items-center ms-2 z-20",onClick:i[4]||(i[4]=(...l)=>s(e).clearFilters&&s(e).clearFilters(...l))},[I,h(c,{icon:["fas","times"],color:"#8d8484"})])):n("",!0)]),t("div",J,[O,Y,Z,t("div",tt,[h(c,{icon:["fas","star"],color:"#8d8484"})])]),s(e).search.results?(r(),o("div",et,[(r(!0),o(f,null,u(s(e).search.results,(l,a)=>(r(),d($,{key:a,track:l,index:a},null,8,["track","index"]))),128)),((m=(x=s(e).search)==null?void 0:x.results)==null?void 0:m.length)>12?(r(),d(c,{key:0,icon:["fas","arrow-down"],class:"mx-3 text-xl text-white sticky z-20 bottom-0 left-[95%] right-0"})):n("",!0)])):n("",!0)])])])]),t("div",st,[t("div",null,[h(v)]),t("div",lt,[rt,(r(!0),o(f,null,u(s(e).artists.data,(l,a)=>(r(),d(F,{key:a,artist:l},null,8,["artist"]))),128)),((p=(_=s(e).artists)==null?void 0:_.data)==null?void 0:p.length)>3?(r(),d(c,{key:0,icon:["fas","arrow-down"],class:"mx-3 cursor-pointer text-xl text-white sticky z-20 bottom-0 right-0"})):n("",!0)])])])]),s(e).player.track?(r(),d(V,{key:0})):n("",!0)],64)}}};export{_t as default};
