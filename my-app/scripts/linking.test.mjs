import test from 'node:test';
import assert from 'node:assert/strict';
import { editorialLinks } from '../src/keltner/linking.mjs';
const story = (id, category='style', extra={}) => ({_id:id,slug:id,category:{slug:category},publishedAt:'2026-10-01',...extra});
test('Explicit connections are reciprocal, including cross-category stories',()=>{
 const a=story('a','style',{relatedArticles:[{_ref:'b'}]});const b=story('b','places');
 assert.deepEqual(editorialLinks(a,[a,b]).related.map(x=>x._id),['b']);
 assert.deepEqual(editorialLinks(b,[a,b]).related.map(x=>x._id),['a']);
});
test('Related stories prefer shared topics, exclude unrelated filler, self and duplicates',()=>{
 const a=story('a','travel',{topics:['Grand Hotels']});const b=story('b','places',{topics:['grand hotels']});const c=story('c','travel');const d=story('d','music');
 assert.deepEqual(editorialLinks(a,[a,c,b,b,d]).related.map(x=>x._id),['b','c']);
});
test('Commercial and pillar choices are distinct and unpublished references never become links',()=>{
 const a=story('a','style',{commercialGuide:{_ref:'buy'},pillarArticle:{_ref:'pillar'},relatedArticles:[{_ref:'drafts.secret'}]});
 const b=story('buy');const p=story('pillar');const l=editorialLinks(a,[a,b,p]);
 assert.equal(l.commercial._id,'buy');assert.equal(l.pillar._id,'pillar');assert.deepEqual(l.related,[]);
 const missing=editorialLinks(a,[a]);assert.equal(missing.commercial,undefined);assert.equal(missing.pillar,undefined);
});
test('Legacy category names share a canonical pillar and recommendations cap at four',()=>{
 const a=story('a','cars');const list=Array.from({length:7},(_,i)=>story('s'+i,'motors'));
 const l=editorialLinks(a,list);assert.equal(l.section.slug,'motors');assert.equal(l.related.length,4);
});
