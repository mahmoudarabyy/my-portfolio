// Studio presentation only: field names and stored document shapes stay unchanged.
const sections = [
  ['card', 'الكارت والغلاف', 'basic', ['mainTitle','slug','cardTitle','cardDescription','icon','iconMedia','cardImage','cardImageMedia','coverImage','coverImageMedia','coverVideo']],
  ['details', 'معلومات المشروع', 'basic', ['client','field','year','timeline','role','categories']],
  ['about', '١. عن المشروع', 'story', ['summary','aboutMediaLayout','aboutImg','aboutImgMedia','aboutSecondImg','aboutSecondImgMedia']],
  ['challenge', '٢. التحدي', 'story', ['problemLead','problemExtra','problemImg','problemImgMedia']],
  ['solution', '٣. الحل', 'story', ['researchLead','researchExtra','solutionLead','solutionMediaLayout','researchImg','researchImgMedia','researchSecondImg','researchSecondImgMedia','solutionFullImg','solutionFullImgMedia']],
  ['requirements', '٤. ما الذي احتاجته التجربة؟', 'story', ['requirements','requirementsExtra','requirementsImg','requirementsImgMedia']],
  ['working', '٥. طريقة العمل', 'story', ['workingModel','workingMediaLayout','workingImg','workingImgMedia','workingSecondImg','workingSecondImgMedia']],
  ['roadmap', '٦. خارطة الطريق', 'story', ['solutionImg','solutionImgMedia']],
  ['result', '٧. نتيجة المشروع', 'story', ['resultTitle','resultBody','solutionExtra','resultMediaLayout','resultImg','resultImgMedia','resultSecondImg','resultSecondImgMedia','resultFullImg','resultFullImgMedia']],
  ['gallery', '٨. اكتشف جميع الشاشات', 'story', ['gallery']],
  ['awards', 'الجوائز — اختياري', 'story', ['awards']],
  ['links', 'الأزرار تحت اسم المشروع — كلها اختيارية', 'links', ['websiteUrl','behanceUrl','appStoreUrl','googlePlayUrl']],
  ['publish', 'الترتيب والظهور', 'publishing', ['sortOrder','featured','featuredOrder','cardLayout']],
];
const position = new Map(sections.flatMap(([id,title,group,keys],i)=>keys.map((key,j)=>[key,{id,group,rank:i*100+j}])));
function arrange(fields, english=false) {
  return fields.map(field=>{
    const slot=position.get(field.name);
    return slot ? {...field, fieldset:slot.id, ...(english?{}:{group:slot.group})} : field;
  }).sort((a,b)=>(position.get(a.name)?.rank??9999)-(position.get(b.name)?.rank??9999));
}
function fieldsets(fields, english=false) {
  return sections.filter(([id])=>fields.some(f=>f.fieldset===id)).map(([name,title,group])=>({
    name,title,...(english?{}:{group}),options:{collapsible:true,collapsed:!['card','details','links','publish'].includes(name)},
  }));
}
export function improveStudioSchema(schema) {
  if(schema.name==='project') {
    const fields=arrange(schema.fields.map(field=>{
      if(field.name==='en') {
        const translated=arrange(field.fields.map(f=>{
          // Keep layout-dependent English uploads consistent with the shared selection.
          const layout=f.name==='solutionFullImgMedia'?'solutionMediaLayout':f.name==='resultFullImgMedia'?'resultMediaLayout':null;
          return layout?{...f,hidden:({document})=>document?.[layout]==='stacked'}:f;
        }),true);
        return {...field,title:'المحتوى الإنجليزي',description:'ترجم الأقسام المطلوبة، ثم فعّل جاهز للنشر بالإنجليزية. الصور المشتركة تُستخدم تلقائيًا إلا إذا رفعت بديلًا هنا.',options:{collapsible:false},fields:translated,fieldsets:fieldsets(translated,true)};
      }
      return field;
    }));
    return {...schema,groups:[
      {name:'basic',title:'١. بيانات المشروع',default:true},
      {name:'story',title:'٢. أقسام المشروع'},
      {name:'links',title:'٣. روابط وأزرار'},
      {name:'publishing',title:'٤. الظهور والترتيب'},
      {name:'en',title:'٥. English'},
      {name:'shared',title:'حقول قديمة',hidden:true},
      {name:'ar',title:'العربية',hidden:true},
    ],fields,fieldsets:fieldsets(fields)};
  }
  if(schema.name==='article') {
    const mapping={title:'intro',slug:'intro',date:'intro',category:'intro',excerpt:'intro',cover:'intro',sections:'content',body:'legacy',buttonUrl:'action',buttonLabel:'action'};
    return {...schema,groups:schema.groups.map(g=>g.name==='ar'?{...g,title:'المقال والأقسام'}:g.name==='shared'?{...g,title:'الغلاف والروابط'}:g),fieldsets:[
      {name:'intro',title:'عنوان المقال وبياناته'},
      {name:'content',title:'محتوى المقال'},
      {name:'legacy',title:'محتوى قديم — اختياري',options:{collapsible:true,collapsed:true}},
      {name:'action',title:'زر نهاية المقال — اختياري',options:{collapsible:true,collapsed:true}},
    ],fields:schema.fields.map(f=>mapping[f.name]?{...f,fieldset:mapping[f.name]}:f)};
  }
  return schema;
}
