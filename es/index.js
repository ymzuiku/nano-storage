var n=(a,o,{storage:s="localStorage",version:i}={})=>{if(a=a+(i||n.version),typeof o!="object")throw"NanoDb: init need a object";let t={data:JSON.parse(JSON.stringify(o)),initData:JSON.parse(JSON.stringify(o)),reinit:()=>{let e=JSON.stringify(t.initData),c=JSON.parse(e);window[s].setItem(a,e),Object.assign(t,c)},set:e=>{Object.assign(t.data,e),Object.assign(t,e),window[s].setItem(a,JSON.stringify(t.data))}},r=window[s].getItem(a);if(r)try{let e=JSON.parse(r);t.set(e)}catch(e){console.error(e),t.set(o)}else t.set(o);return t};n.version="";export{n as NanoStorage};
