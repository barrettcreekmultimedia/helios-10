// This script doesn't import PlayCanvas; it can report an error if the engine cannot be imported.
const $=id=>document.getElementById(id);
function showError(message){
 window.HELIOS_BOOT_ERROR=message;
 const report=$('boot-report');
 report.hidden=false;
 $('boot-diagnostic').textContent=message;
 $('engine-status').textContent='STARTUP ERROR · RETRY OR INSTALL LOCAL ENGINE';
 $('launch-btn').classList.remove('loading');
 $('launch-btn').setAttribute('aria-describedby','boot-report');
}
window.addEventListener('error',event=>{
 if(!window.HELIOS_READY && event.error)showError('Script error: '+(event.error.stack||event.error.message||event.message));
});
window.addEventListener('unhandledrejection',event=>{
 if(!window.HELIOS_READY)showError('Module error: '+(event.reason?.stack||String(event.reason)));
});
$('retry-btn').addEventListener('click',()=>location.reload());
(async()=>{
 try {
  await import('./menu.js');
  $('engine-status').textContent='PREPARING PLAYCANVAS ENGINE…';
  await import('./main.js');
  if(!window.HELIOS_READY)throw new Error('Engine initialized without entering the ready state');
  $('boot-report').hidden=true;
  $('launch-btn').classList.remove('loading');
 } catch(err) {
  console.error('Helios boot failed',err);
  showError(err?.stack||err?.message||String(err));
 }
})();
