function Atom$$module$atom(a){let b=a||{};const c=[];return{val:()=>b,update:d=>{const f=b,e=d(b);f!==e&&(b=e,c.forEach(g=>g(e)))},addWatcher:d=>c.push(d)}}var module$atom={};module$atom.Atom=Atom$$module$atom;const config$$module$config={debugMode:!0};var module$config={};module$config.config=config$$module$config;const months$$module$tools="January February March April May June July August September October November December".split(" ");function conjoin$$module$tools(a,b){return[...a,b]}function isEmpty$$module$tools(a){return!a.length}function rem$$module$tools(a,b){return 1<a%(a/b)}function date$$module$tools(){return new Date}function getMonth$$module$tools(a){const b=date$$module$tools().getMonth()+1;return a?months$$module$tools[date$$module$tools().getMonth()]:rem$$module$tools(b,10)?b:"0"+b}
function backgroundColorGenerator$$module$tools(){return Math.floor(355*Math.random())}function softTonesGeneratorHSL$$module$tools(){return`hsl(${this.backgroundColorGenerator()}, 58%, 70%)`}function updateField$$module$tools(a,b,c){return{...a,[b]:c}}function dateGenerator$$module$tools(){return`${date$$module$tools().getDate()%10?date$$module$tools().getDate():"0"+date$$module$tools().getDate()}/${getMonth$$module$tools()}/${date$$module$tools().getFullYear()}`}
function idGenerator$$module$tools(){return Math.floor(10*Math.random()*date$$module$tools().getMilliseconds()*date$$module$tools().getFullYear()/date$$module$tools().getDate())}function deactivateListEntries$$module$tools(){document.querySelectorAll("li[button-active]").forEach(a=>a.removeAttribute("button-active"))}const cloneArray$$module$tools=a=>a.map(b=>Array.isArray(b)?cloneArray$$module$tools(b):b),copyOnEdit$$module$tools=(a,b)=>{a={...a};b(a);return a};var module$tools={};
module$tools.backgroundColorGenerator=backgroundColorGenerator$$module$tools;module$tools.cloneArray=cloneArray$$module$tools;module$tools.conjoin=conjoin$$module$tools;module$tools.copyOnEdit=copyOnEdit$$module$tools;module$tools.date=date$$module$tools;module$tools.dateGenerator=dateGenerator$$module$tools;module$tools.deactivateListEntries=deactivateListEntries$$module$tools;module$tools.idGenerator=idGenerator$$module$tools;module$tools.isEmpty=isEmpty$$module$tools;
module$tools.softTonesGeneratorHSL=softTonesGeneratorHSL$$module$tools;module$tools.updateField=updateField$$module$tools;function getFromLocalStorage$$module$localstorage(a){return null!==localStorage.getItem(a)&&void 0!==localStorage.getItem(a)?(console.log("from get local storage",localStorage.getItem(a)),JSON.parse(localStorage.getItem(a))):!1}function setToLocalStorage$$module$localstorage(a,b){localStorage.setItem(a,JSON.stringify(b))}function checkLocalStorageForItem$$module$localstorage(a){return null!==localStorage.getItem(a)}var module$localstorage={};module$localstorage.checkLocalStorageForItem=checkLocalStorageForItem$$module$localstorage;
module$localstorage.getFromLocalStorage=getFromLocalStorage$$module$localstorage;module$localstorage.setToLocalStorage=setToLocalStorage$$module$localstorage;function log$$module$logger(a,...b){a&&console.log(b)}var module$logger={};module$logger.log=log$$module$logger;const getNotesFromLocalStorage$$module$store=()=>getFromLocalStorage$$module$localstorage("notes"),setNotesToLocalStorage$$module$store=a=>setToLocalStorage$$module$localstorage("notes",a);function createNote$$module$store(a="",b=""){return{name:a,body:b,createdAt:dateGenerator$$module$tools(),id:lastID$$module$store()+1,color:softTonesGeneratorHSL$$module$tools(),active:!1}}function lastID$$module$store(){return Object.keys(store$$module$store.val().notes).length-1}const store$$module$store=Atom$$module$atom({});
function addWatcher$$module$store(a){store$$module$store.addWatcher(a)}function assignNote$$module$store(a){return{[a.id]:a}}function addNote$$module$store(a){a&&store$$module$store.update(b=>({...b,notes:Object.assign(b.notes,assignNote$$module$store(a)),activeNoteID:a.id}))}function setActive$$module$store(a){a&&store$$module$store.update(b=>({...b,activeNoteID:Number(a)}))}function removeKey$$module$store(a,b){return copyOnEdit$$module$tools(a,c=>delete c[b])}
function removeNote$$module$store(a){store$$module$store.update(b=>({...b,notes:removeKey$$module$store(b.notes,a)}));log$$module$logger(!0,"deleting a note with ID: ",a)}function updateNote$$module$store(a,b){store$$module$store.update(c=>copyOnEdit$$module$tools(c,d=>d[a]))}function initStore$$module$store(a){store$$module$store.update(()=>({...a}))}addWatcher$$module$store(setNotesToLocalStorage$$module$store);var module$store={};module$store.addNote=addNote$$module$store;
module$store.addWatcher=addWatcher$$module$store;module$store.createNote=createNote$$module$store;module$store.getNotesFromLocalStorage=getNotesFromLocalStorage$$module$store;module$store.initStore=initStore$$module$store;module$store.removeNote=removeNote$$module$store;module$store.setActive=setActive$$module$store;const noteName$$module$uitools=document.querySelector(".note-name-input"),noteBody$$module$uitools=document.querySelector("#note-input-area"),noteCreationDate$$module$uitools=document.querySelector("#note-creation-date");function applyBackgroundColor$$module$uitools(a,b){document.documentElement.style.setProperty(b,a)}
function renderNote$$module$uitools(a){a&&(noteName$$module$uitools.value=a.name,noteBody$$module$uitools.value=a.body,noteCreationDate$$module$uitools.textContent=a.createdAt,applyBackgroundColor$$module$uitools(a.color,"--list-background-color"))}function appendRadioButton$$module$uitools(a,b,c){const d=Number(b);c.innerHTML=a.reduce((f,e)=>f+=`<li class="radio-button-item" id="${e.id}" 
        style="background-color: ${e.color}" ${e.id===d?"button-active":""}></li>`,"")}function renderNotes$$module$uitools(a,b){for(const [,c]of Object.entries(a))appendRadioButton$$module$uitools(c,b),renderNote$$module$uitools(c)}function removeNote$$module$uitools(a){console.log(radioButtonsList)}function identity$$module$uitools(a){return a}
function renderAllNotes$$module$uitools(a,b){for(const [,c]of Object.entries(a))renderNote$$module$uitools(c);appendRadioButton$$module$uitools([...Object.entries(a).map(c=>c[1])],b)}var module$uitools={};module$uitools.appendRadioButton=appendRadioButton$$module$uitools;module$uitools.renderAllNotes=renderAllNotes$$module$uitools;module$uitools.renderNote=renderNote$$module$uitools;module$uitools.renderNotes=renderNotes$$module$uitools;const noteNameInput$$module$main=document.querySelector(".note-name-input"),noteBodyInput$$module$main=document.querySelector("#note-input-area"),radioButtonsList$$module$main=document.querySelector(".radio-buttons-list"),deleteNoteButton$$module$main=document.querySelector("#note-delete-button"),note$$module$main={name:String,body:String,createdAt:String,id:String,color:String,active:Boolean},nts$$module$main=getNotesFromLocalStorage$$module$store()||{activeNoteID:0,notes:{0:{color:softTonesGeneratorHSL$$module$tools(),
active:!0,name:"nu tak",body:"tuhlak",createdAt:dateGenerator$$module$tools(),id:0}}};let notes$$module$main={};addWatcher$$module$store(a=>{console.log("from watcher",a);notes$$module$main=a.notes;appendRadioButton$$module$uitools([...Object.entries(a.notes).map(b=>b[1])],a.activeNoteID,radioButtonsList$$module$main);renderNote$$module$uitools(notes$$module$main[a.activeNoteID])});initStore$$module$store(nts$$module$main);function updateName$$module$main(a,b){return updateField(a,"name",b)}
function updateBody$$module$main(a,b){return updateField(a,"body",b)}function updateColor$$module$main(a,b){return updateField(a,"color",b)}function toggleActive$$module$main(a){return updateField(a,"active",!a.active)}function toggleAllActive$$module$main(a){return a.map(b=>updateField(b,"active",!0))}function toggleAllUnActive$$module$main(a){return a.map(b=>updateField(b,"active",!1))}function setActiveNoteBody$$module$main(a){}
noteBodyInput$$module$main.addEventListener("keyup",a=>{a.preventDefault();document.querySelector("li[button-active]");setActiveNoteBody$$module$main()});noteNameInput$$module$main.addEventListener("keyup",a=>{a.preventDefault();const b=document.querySelector("li[button-active]");noteNameInput$$module$main&&b&&(notesContainer.filter(c=>c.id==b.id)[0].setName(noteNameInput$$module$main.value.toUpperCase()),Storage.setNotes(notesContainer))});let lastClickedButtonID$$module$main=-1;
radioButtonsList$$module$main.addEventListener("click",a=>{const b=a.target.id,c=radioButtonsList$$module$main.lastElementChild;lastClickedButtonID$$module$main!==b&&(console.log("rerender on button click"),lastClickedButtonID$$module$main=b,a.target.id===c.id&&(a=createNote$$module$store("",""),console.log(a.id),addNote$$module$store(a)),setActive$$module$store(b))});
deleteNoteButton$$module$main.addEventListener("click",a=>{if(a=document.querySelector("li[button-active]"))removeNote$$module$store(a.id),renderNote$$module$uitools(a.id-1)});var module$main={};
