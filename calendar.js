// Persian calendar controls; canonical storage remains ISO Gregorian for reliable date arithmetic.
(function(){
const $=id=>document.getElementById(id);
const months=['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
const fmt=new Intl.DateTimeFormat('en-US-u-ca-persian',{year:'numeric',month:'numeric',day:'numeric',timeZone:'UTC'});
function parts(dt){const p={};for(const x of fmt.formatToParts(dt))if(['year','month','day'].includes(x.type))p[x.type]=Number(x.value);return p}
function iso(y,m,d){return [y,String(m).padStart(2,'0'),String(d).padStart(2,'0')].join('-')}
function gregorian(jy,jm,jd){let lo=Date.UTC(jy+620,0,1),hi=Date.UTC(jy+623,11,31);while(lo<=hi){let mid=Math.floor((lo+hi)/172800000)*86400000;let p=parts(new Date(mid));let cmp=(p.year-jy)|| (p.month-jm)||(p.day-jd);if(cmp===0){let dt=new Date(mid);return iso(dt.getUTCFullYear(),dt.getUTCMonth()+1,dt.getUTCDate())}if(cmp<0)lo=mid+86400000;else hi=mid-86400000}return ''}
function setOptions(el,values,selected){el.replaceChildren();for(const [v,label] of values){let o=new Option(label,String(v));el.add(o)}if(selected!==undefined)el.value=String(selected)}
function fillDays(selected){const y=+$('jYear').value,m=+$('jMonth').value;let count=m<=6?31:m<=11?30:(gregorian(y,12,30)?30:29);setOptions($('jDay'),Array.from({length:count},(_,i)=>[i+1,String(i+1)]),Math.min(selected||1,count))}
function fromGregorian(){const val=$('birth').value;if(!val)return;const [y,m,d]=val.split('-').map(Number);const p=parts(new Date(Date.UTC(y,m-1,d)));$('jYear').value=String(p.year);$('jMonth').value=String(p.month);fillDays(p.day)}
function onChange(){fillDays(+$('jDay').value);const val=gregorian(+$('jYear').value,+$('jMonth').value,+$('jDay').value);if(val){$('birth').value=val;$('birth').dispatchEvent(new Event('change'))}}
function sync(lang){$('birth').classList.toggle('hidden',lang==='fa');$('persianBirth').classList.toggle('hidden',lang!=='fa');$('jalali').textContent='';if(lang==='fa')fromGregorian()}
const today=parts(new Date());setOptions($('jYear'),Array.from({length:110},(_,i)=>[today.year-i,String(today.year-i)]),today.year);setOptions($('jMonth'),months.map((m,i)=>[i+1,m]),today.month);fillDays(today.day);
$('jYear').addEventListener('change',onChange);$('jMonth').addEventListener('change',onChange);$('jDay').addEventListener('change',()=>{const val=gregorian(+$('jYear').value,+$('jMonth').value,+$('jDay').value);if(val){$('birth').value=val;$('birth').dispatchEvent(new Event('change'))}});
window.BabyCalendar={sync,fromGregorian};
})();
