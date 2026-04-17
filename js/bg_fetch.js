const api = typeof browser !== "undefined" ? browser : chrome;

async function fetchAsDataUrl(url){
    const res = await fetch(url, { credentials: "omit", redirect: "follow" });
    if(!res.ok){
        throw new Error("HTTP " + res.status);
    }
    const blob = await res.blob();
    return await new Promise(function(resolve, reject){
        const reader = new FileReader();
        reader.onload = function(){ resolve(reader.result); };
        reader.onerror = function(){ reject(reader.error || new Error("FileReader error")); };
        reader.readAsDataURL(blob);
    });
}

api.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if(!message || message.type !== "iniadpp:fetchImage" || !message.url){
        return false;
    }
    fetchAsDataUrl(message.url)
        .then(function(dataUrl){ sendResponse({ ok: true, dataUrl: dataUrl }); })
        .catch(function(err){ sendResponse({ ok: false, error: String(err && err.message || err) }); });
    return true;
});
