// Keeps the prompt presentation compatible with Veo 3.1 Lite's supported portrait format.
function applyVeoPortraitLayout(){
  const result=document.querySelector('#result'); if(!result||!result.querySelector('.plan')||result.querySelector('#copyFirstImage'))return;
  const title=result.querySelector('.plan h2')?.textContent||'세 여우 이야기';
  const premise=result.querySelector('.plan p')?.textContent||'';
  const identity='Use the supplied reference image as the sole character design bible. Keep the three white chibi multi-tailed fox sisters exactly unchanged: youngest left is playful and curious, eldest center is elegant, second-born right is gentle. Preserve every multiple fluffy tail, white fur, blue tail tips, sky-blue eyes, blue-and-gold ornaments, bows and bells. No text, no watermark.';
  const first=`Veo 3.1 Lite First Frame / Image Prompt. Vertical 9:16 portrait composition for TikTok and YouTube Shorts, full-frame no letterboxing. ${identity} Opening image for “${title}”: ${premise} Show all three sisters together in a luminous establishing scene, full bodies and all tails clearly visible, elegant depth, soft cinematic lighting, premium anime illustration, clear center-safe composition.`;
  const block=document.createElement('article'); block.className='plan'; block.innerHTML=`<div class="toolbar"><h2>첫 이미지 프롬프트</h2><button class="soft" id="copyFirstImage">첫 이미지 프롬프트 복사</button></div><p>Google Flow에서 <b>Frames to Video → First frame</b>에 사용할 시작 이미지 프롬프트입니다. 출력 비율은 Veo 지원 세로 9:16입니다.</p><pre style="display:block">${first}</pre>`;
  result.querySelector('.plan').after(block);
  document.querySelector('#copyFirstImage').onclick=()=>navigator.clipboard.writeText(first);
  result.querySelectorAll('pre').forEach(p=>p.textContent=p.textContent.replaceAll('16:9','9:16 portrait').replaceAll('cinematic animation, 9:16 portrait','vertical 9:16 portrait cinematic animation'));
}
new MutationObserver(applyVeoPortraitLayout).observe(document.querySelector('#result'),{childList:true,subtree:true});
document.addEventListener('click',event=>{const button=event.target.closest('#copyAll,.copy-one');if(!button)return;event.preventDefault();event.stopPropagation();const text=button.id==='copyAll'?[...document.querySelectorAll('#result pre')].slice(1).map(x=>x.textContent).join('\n\n'):button.closest('.clip').querySelector('pre').textContent;navigator.clipboard.writeText(text)},true);
applyVeoPortraitLayout();
