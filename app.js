const Icons = {
    home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    notes: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    sprout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 20h10"/><path d="M10 20c5.5-2.5 8-6.4 8-12"/><path d="M14 20c-5.5-2.5-8-6.4-8-12"/><path d="M12 4v16"/></svg>`,
    calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
    trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`,
    edit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>`,
    back: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>`
};

const Store = {
    data: {
        theme: 'dark', route: 'home', activeCatId: null, searchTerms: '',
        categories: [{ id: 1, title: 'Receitas Ana', emoji: '🍰', topics: [] }],
        gardenZones: [{ id: 1, name: 'Horta João', emoji: '🌿', plants: [] }],
        events: []
    },
    init() {
        const saved = localStorage.getItem('joaninha_v_final_full');
        if (saved) this.data = JSON.parse(saved);
        this.applyTheme();
        this.render();
    },
    save() {
        localStorage.setItem('joaninha_v_final_full', JSON.stringify(this.data));
        this.render();
    },
    applyTheme() { document.body.className = this.data.theme; },
    render() {
        const vp = document.getElementById('app-viewport');
        const r = this.data.route;
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
        const navEl = document.getElementById(`nav-${r}`);
        if(navEl) navEl.classList.add('active');
        vp.innerHTML = `<div class="p-5">${this.views[r]()}</div>`;
    },
    views: {
        home: () => {
            const totalPlantas = Store.data.gardenZones.reduce((acc, z) => acc + z.plants.length, 0);
            return `
                <h1 style="color:var(--primary); font-weight:900; margin:0; font-style:italic;">JOANINHA</h1>
                <p style="opacity:0.6; font-weight:bold; letter-spacing:1px; margin-top:0;">🐞 RAIZ & SABOR</p>
                <div class="grid">
                    <div class="card border-p"><small style="opacity:0.5;">📒 NOTAS</small><br><b style="font-size:1.5rem;">${Store.data.categories.length}</b> Categorias</div>
                    <div class="card border-g"><small style="opacity:0.5;">🌱 CULTURA</small><br><b style="font-size:1.5rem;">${totalPlantas}</b> Plantas</div>
                    <div class="card border-y"><small style="opacity:0.5;">📅 AGENDA</small><br><b style="font-size:1.5rem;">${Store.data.events.length}</b> Eventos</div>
                </div>`;
        },
        forum: () => {
            if (Store.data.activeCatId) {
                const cat = Store.data.categories.find(c => c.id === Store.data.activeCatId);
                return `
                    <button onclick="Actions.nav('forum', true)" class="btn btn-p btn-small" style="margin-bottom:1rem; display:flex; align-items:center; gap:5px;">${Icons.back} VOLTAR</button>
                    <input type="text" placeholder="🔍 Pesquisar notas..." oninput="Actions.search(this.value)" value="${Store.data.searchTerms}">
                    <h2 style="margin-top:1.5rem;">${cat.emoji} ${cat.title}</h2>
                    <div class="grid" id="topics-container">
                        ${cat.topics.map(t => `
                            <div class="card topic-card" data-title="${t.title}">
                                <div class="flex justify-between items-center">
                                    <b style="color:var(--primary);">${t.title}</b>
                                    <div class="flex">
                                        <button onclick="Actions.modal('topic', ${cat.id}, ${t.id})" style="background:none; border:none; color:var(--muted); margin-right:10px;">${Icons.edit}</button>
                                        <button onclick="Actions.delTopic(${cat.id}, ${t.id})" style="background:none; border:none; color:var(--red); opacity:0.4;">${Icons.trash}</button>
                                    </div>
                                </div>
                                <p style="font-size:14px; opacity:0.8; white-space:pre-wrap; margin-top:10px;">${t.content}</p>
                                <small style="font-size:9px; opacity:0.3;">📅 ${t.date}</small>
                            </div>
                        `).join('')}
                    </div>
                    <button onclick="Actions.modal('topic', ${cat.id})" class="btn btn-p" style="margin-top:1.5rem;">+ ADICIONAR NOTA</button>`;
            }
            return `<h2>📒 Categorias</h2><div class="grid">${Store.data.categories.map(c => `
                <div onclick="Actions.openCat(${c.id})" class="card flex justify-between items-center">
                    <div><b>${c.emoji} ${c.title}</b><br><small style="opacity:0.5;">${c.topics.length} itens</small></div>
                    <button onclick="event.stopPropagation(); Actions.delCat(${c.id})" style="background:none; border:none; color:var(--red); opacity:0.3;">${Icons.trash}</button>
                </div>`).join('')}
                <button onclick="Actions.modal('cat')" class="card" style="border:2px dashed rgba(255,255,255,0.1); text-align:center;">+ NOVA CATEGORIA</button>
            </div>`;
        },
        garden: () => `
            <h2>🌱 Horta</h2>
            <div class="grid">
                ${Store.data.gardenZones.map(z => `
                    <div class="card" style="padding:0; overflow:hidden;">
                        <div style="background:rgba(0,0,0,0.2); padding:1rem;" class="flex justify-between items-center">
                            <b>${z.emoji} ${z.name}</b>
                            <div class="flex">
                                <button onclick="Actions.modal('plant', ${z.id})" class="btn btn-g btn-small" style="margin-right:10px;">ADD</button>
                                <button onclick="Actions.delZone(${z.id})" style="background:none; border:none; color:var(--red); opacity:0.4;">${Icons.trash}</button>
                            </div>
                        </div>
                        <div class="p-5">
                            ${z.plants.map(p => `
                                <div style="background:rgba(255,255,255,0.03); padding:12px; border-radius:12px; margin-bottom:10px; border-left:3px solid var(--green);">
                                    <div class="flex justify-between">
                                        <b>${p.name}</b>
                                        <div class="flex">
                                            <button onclick="Actions.modal('plant', ${z.id}, ${p.id})" style="background:none; border:none; color:var(--muted); margin-right:8px;">${Icons.edit}</button>
                                            <button onclick="Actions.delPlant(${z.id}, ${p.id})" style="background:none; border:none; color:var(--red); opacity:0.3;">X</button>
                                        </div>
                                    </div>
                                    <small style="opacity:0.5; font-size:10px;">📅 ${p.date} | ⏳ ${p.harvest} dias</small>
                                    ${p.notes ? `<p style="font-size:12px; margin-top:5px; opacity:0.8;">${p.notes}</p>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>`).join('')}
                <button onclick="Actions.modal('zone')" class="card" style="border:2px dashed rgba(255,255,255,0.1); text-align:center;">+ NOVA ZONA</button>
            </div>`,
        calendar: () => `
            <h2>📅 Agenda</h2>
            <button onclick="Actions.modal('event')" class="btn btn-p" style="margin-bottom:1.5rem;">+ NOVO EVENTO</button>
            <div class="grid">
                ${Store.data.events.sort((a,b)=>new Date(a.date)-new Date(b.date)).map(e => `
                    <div class="card border-y">
                        <div class="flex justify-between items-center">
                            <div><b>${e.title}</b><br><small>📅 ${e.date}</small></div>
                            <button onclick="Actions.delEvent(${e.id})" style="background:none; border:none; color:var(--red); opacity:0.4;">${Icons.trash}</button>
                        </div>
                    </div>`).join('')}
            </div>`,
        config: () => `
            <h2>⚙️ Definições</h2>
            <div class="grid">
                <div onclick="Actions.toggleTheme()" class="card flex justify-between items-center"><b>🌓 Tema</b><b>${Store.data.theme.toUpperCase()}</b></div>
                <div class="card">
                    <b>💾 Backup</b>
                    <button class="btn btn-p" onclick="Actions.export()" style="margin:10px 0;">📤 EXPORTAR</button>
                    <label class="btn btn-g" style="display:block; text-align:center; cursor:pointer;">📥 IMPORTAR <input type="file" style="display:none" onchange="Actions.import(event)"></label>
                </div>
                <button onclick="Actions.reset()" style="color:var(--red); background:none; border:none; margin-top:2rem; opacity:0.3; font-weight:bold;">⚠️ APAGAR TUDO</button>
            </div>`
    }
};

const Actions = {
    nav(r, reset = false) { Store.data.route = r; if(reset) { Store.data.activeCatId = null; Store.data.searchTerms = ''; } Store.save(); },
    openCat(id) { Store.data.activeCatId = id; Store.save(); },
    search(v) { 
        Store.data.searchTerms = v;
        const cards = document.querySelectorAll('.topic-card');
        cards.forEach(card => card.style.display = card.getAttribute('data-title').toLowerCase().includes(v.toLowerCase()) ? 'block' : 'none');
    },
    toggleTheme() { Store.data.theme = Store.data.theme === 'dark' ? 'light' : 'dark'; Store.applyTheme(); Store.save(); },
    
    modal(type, pid, tid = null) {
        const body = document.getElementById('modal-body');
        let content = '';
        if(type === 'topic') {
            const t = tid ? Store.data.categories.find(c=>c.id===pid).topics.find(x=>x.id===tid) : {title:'', content:''};
            content = `<h3>📝 Nota</h3><input id="f-t" placeholder="Título" value="${t.title}"><textarea id="f-c" style="height:150px;" placeholder="Conteúdo...">${t.content}</textarea><button class="btn btn-p" onclick="Actions.saveTopic(${pid}, ${tid})">GUARDAR</button>`;
        } else if(type === 'plant') {
            const p = tid ? Store.data.gardenZones.find(z=>z.id===pid).plants.find(x=>x.id===tid) : {name:'', date:'', harvest:'', notes:''};
            content = `<h3>🌱 Planta</h3><input id="f-n" placeholder="Nome" value="${p.name}"><input id="f-d" type="date" value="${p.date}"><input id="f-h" type="number" placeholder="Dias" value="${p.harvest}"><textarea id="f-nt" placeholder="Notas...">${p.notes}</textarea><button class="btn btn-g" onclick="Actions.savePlant(${pid}, ${tid})">GUARDAR</button>`;
        } else if(type === 'event') {
            content = `<h3>📅 Evento</h3><input id="f-t" placeholder="Título"><input id="f-d" type="date"><button class="btn btn-p" onclick="Actions.saveEvent()">MARCAR</button>`;
        } else if(type === 'cat' || type === 'zone') {
            content = `<h3>✨ Novo</h3><input id="f-e" placeholder="Emoji"><input id="f-t" placeholder="Nome"><button class="btn btn-p" onclick="Actions.saveGeneric('${type}')">CRIAR</button>`;
        }
        body.innerHTML = content;
        document.getElementById('modal-overlay').style.display = 'flex';
    },

    saveTopic(cid, tid) {
        const cat = Store.data.categories.find(c => c.id === cid);
        const t = document.getElementById('f-t').value;
        const c = document.getElementById('f-c').value;
        if(tid) { const top = cat.topics.find(x=>x.id===tid); top.title=t; top.content=c; }
        else { cat.topics.unshift({id:Date.now(), title:t, content:c, date:new Date().toLocaleDateString()}); }
        this.close(); Store.save();
    },
    savePlant(zid, pid) {
        const z = Store.data.gardenZones.find(x=>x.id===zid);
        const n = document.getElementById('f-n').value;
        const d = document.getElementById('f-d').value;
        const h = document.getElementById('f-h').value;
        const nt = document.getElementById('f-nt').value;
        if(pid) { const p = z.plants.find(x=>x.id===pid); p.name=n; p.date=d; p.harvest=h; p.notes=nt; }
        else { z.plants.unshift({id:Date.now(), name:n, date:d, harvest:h, notes:nt}); }
        this.close(); Store.save();
    },
    saveGeneric(type) {
        const e = document.getElementById('f-e').value || '📁';
        const t = document.getElementById('f-t').value;
        if(!t) return;
        if(type === 'cat') Store.data.categories.push({id:Date.now(), title:t, emoji:e, topics:[]});
        else Store.data.gardenZones.push({id:Date.now(), name:t, emoji:e, plants:[]});
        this.close(); Store.save();
    },
    saveEvent() {
        const t = document.getElementById('f-t').value;
        const d = document.getElementById('f-d').value;
        if(t && d) { Store.data.events.push({id:Date.now(), title:t, date:d}); this.close(); Store.save(); }
    },

    delTopic(cid, tid) { if(confirm('Apagar nota?')) { Store.data.categories.find(c=>c.id===cid).topics = Store.data.categories.find(c=>c.id===cid).topics.filter(t=>t.id!==tid); Store.save(); } },
    delPlant(zid, pid) { if(confirm('Remover planta?')) { Store.data.gardenZones.find(z=>z.id===zid).plants = Store.data.gardenZones.find(z=>z.id===zid).plants.filter(p=>p.id!==pid); Store.save(); } },
    delZone(id) { if(confirm('Apagar zona e tudo o que lá está?')) { Store.data.gardenZones = Store.data.gardenZones.filter(z=>z.id!==id); Store.save(); } },
    delCat(id) { if(confirm('Apagar categoria e todas as notas?')) { Store.data.categories = Store.data.categories.filter(c=>c.id!==id); Store.save(); } },
    delEvent(id) { if(confirm('Remover evento?')) { Store.data.events = Store.data.events.filter(e=>e.id!==id); Store.save(); } },
    
    close() { document.getElementById('modal-overlay').style.display = 'none'; },
    export() {
        const dataStr = JSON.stringify(Store.data);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const link = document.createElement('a');
        link.setAttribute('href', dataUri);
        link.setAttribute('download', 'backup_joaninha.json');
        link.click();
    },
    import(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => { Store.data = JSON.parse(e.target.result); Store.save(); location.reload(); };
        reader.readAsText(file);
    },
    reset() { if(confirm('Apagar tudo?')) { localStorage.clear(); location.reload(); } }
};

window.onload = () => Store.init();
window.onclick = (e) => { if(e.target.id === 'modal-overlay') Actions.close(); };
