import test from 'node:test';
import assert from 'node:assert/strict';
import { projectSchema } from '../sanity/schema.js';
import { articleSchema } from '../sanity/article.js';
import { localizedSchema } from '../sanity/localized.js';
import { improveStudioSchema } from '../sanity/studio-ux.mjs';

test('Studio organization preserves stored field names, types, validation and initial values',()=>{
  for(const original of [projectSchema,articleSchema]){
    const before=localizedSchema(original), after=improveStudioSchema(before);
    assert.deepEqual(after.fields.map(f=>f.name).sort(),before.fields.map(f=>f.name).sort());
    for(const f of before.fields){const next=after.fields.find(n=>n.name===f.name);assert.equal(next.type,f.type);assert.equal(next.validation,f.validation);assert.equal(next.initialValue,f.initialValue);}
    for(const f of after.fields){
      for(const g of [f.group].flat().filter(Boolean)) assert.ok(after.groups.some(x=>x.name===g));
      if(f.fieldset)assert.ok(after.fieldsets.some(x=>x.name===f.fieldset));
    }
  }
});
test('Each case-study section keeps copy, layout and uploads together in page order',()=>{
  const s=improveStudioSchema(localizedSchema(projectSchema));
  for(const keys of [['summary','aboutMediaLayout','aboutImgMedia','aboutSecondImgMedia'],['researchLead','solutionMediaLayout','researchImgMedia','researchSecondImgMedia','solutionFullImgMedia'],['workingModel','workingMediaLayout','workingImgMedia','workingSecondImgMedia'],['resultBody','resultMediaLayout','resultImgMedia','resultSecondImgMedia','resultFullImgMedia']]){
    const fields=keys.map(k=>s.fields.find(f=>f.name===k));
    assert.ok(fields.every(f=>f.group==='story'&&f.fieldset===fields[0].fieldset));
    assert.ok(s.fields.indexOf(fields[1])<s.fields.indexOf(fields[2]));
  }
  const english=s.fields.find(f=>f.name==='en');
  for(const f of english.fields) if(f.fieldset)assert.ok(english.fieldsets.some(x=>x.name===f.fieldset));
  assert.equal(english.fields.find(f=>f.name==='solutionFullImgMedia').hidden({document:{solutionMediaLayout:'stacked'}}),true);
});
