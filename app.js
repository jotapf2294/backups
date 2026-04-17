// Navegação
function irPara(pg, el) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('page-' + pg).classList.add('active');
    el.classList.add('active');
    if(pg === 'horta') renderPlantas();
    if(pg === 'calendario') renderCalendario();
    if(pg === 'wiki') renderWiki();
    if(pg === 'config') renderZonas();
}

// Modais
function abrirModal(id) { 
    if(id === 'modal-planta') popularSelectZonas();
    document.getElementById(id).style.display = 'flex'; 
}
function fecharModal(id) { document.getElementById(id).style.display = 'none'; }

// Zonas
async function addZona() {
    const nome = document.getElementById('z-nome').value;
    if(!nome) return;
    await db.zonas.add({ nome });
    document.getElementById('z-nome').value = '';
    renderZonas();
}

async function renderZonas() {
    const zonas = await db.zonas.toArray();
    document.getElementById('lista-zonas').innerHTML = zonas.map(z => `
        <div class="flex" style="justify-content:space-between; margin-bottom:8px; background:#f9f9f9; padding:8px; border-radius:8px">
            <span>📍 ${z.nome}</span>
            <button onclick="apagarItem('zonas', ${z.id})" style="color:red; border:none; background:none">🗑️</button>
        </div>
    `).join('');
}

async function popularSelectZonas() {
    const zonas = await db.zonas.toArray();
    document.getElementById('p-zona-id').innerHTML = zonas.map(z => `<option value="${z.id}">${z.nome}</option>`).join('');
}

// Plantas
async function salvarPlanta() {
    const fotoFile = document.getElementById('p-foto').files[0];
    await db.plantas.add({
        nome: document.getElementById('p-nome').value,
        zonaId: parseInt(document.getElementById('p-zona-id').value),
        data: document.getElementById('p-data').value,
        ciclo: parseInt(document.getElementById('p-ciclo').value) || 60,
        notas: document.getElementById('p-notas').value,
        foto: fotoFile || null
    });
    fecharModal('modal-planta');
    renderPlantas();
}

async function renderPlantas() {
    const plantas = await db.plantas.toArray();
    const zonas = await db.zonas.toArray();
    const container = document.getElementById('lista-plantas');
    
    container.innerHTML = plantas.map(p => {
        const zona = zonas.find(z => z.id === p.zonaId);
        const img = p.foto ? URL.createObjectURL(p.foto) : '';
        return `
            <div class="card">
                <button onclick="apagarItem('plantas', ${p.id})" style="position:absolute; right:10px; top:10px; border:none; background:none; font-size:1.2rem">🗑️</button>
                ${img ? `<img src="${img}" class="planta-img">` : ''}
                <span class="badge">${zona ? zona.nome : 'Sem zona'}</span>
                <h3>${p.nome}</h3>
                <p><small>📅 Plantado: ${p.data}</small></p>
                <p style="font-size:0.9rem">${p.notas}</p>
            </div>
        `;
    }).reverse().join('');
}

// Wiki Dinâmica
async function salvarWiki() {
    await db.wiki.add({
        titulo: document.getElementById('w-titulo').value,
        texto: document.getElementById('w-texto').value
    });
    fecharModal('modal-wiki');
    renderWiki();
}

async function renderWiki() {
    const dicas = await db.wiki.toArray();
    document.getElementById('wiki-render').innerHTML = dicas.map(d => `
        <div class="card">
            <button onclick="apagarItem('wiki', ${d.id})" style="float:right; border:none; background:none">🗑️</button>
            <h3 style="color:var(--p)">💡 ${d.titulo}</h3>
            <p style="white-space:pre-wrap">${d.texto}</p>
        </div>
    `).reverse().join('');
}

// Calendário
async function renderCalendario() {
    const plantas = await db.plantas.toArray();
    const container = document.getElementById('calendario-render');
    container.innerHTML = plantas.map(p => {
        let colheita = new Date(p.data);
        colheita.setDate(colheita.getDate() + p.ciclo);
        return `
            <div class="card" style="border-left: 5px solid var(--p)">
                <strong>🧺 ${p.nome}</strong><br>
                <small>Colheita prevista: ${colheita.toLocaleDateString('pt-PT')}</small>
            </div>
        `;
    }).join('');
}

// Auxiliares
async function apagarItem(tabela, id) {
    if(confirm("Deseja apagar?")) {
        await db[tabela].delete(id);
        location.reload();
    }
}

function filtrarTudo() {
    const q = document.getElementById('globalSearch').value.toLowerCase();
    document.querySelectorAll('.card').forEach(c => {
        c.style.display = c.innerText.toLowerCase().includes(q) ? 'block' : 'none';
    });
}

// Backup
async function exportarBackup() {
    const data = {
        zonas: await db.zonas.toArray(),
        plantas: await db.plantas.toArray(),
        wiki: await db.wiki.toArray()
    };
    const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_quinta_${new Date().toLocaleDateString()}.json`;
    a.click();
}

async function importarBackup(e) {
    const reader = new FileReader();
    reader.onload = async (ev) => {
        const d = JSON.parse(ev.target.result);
        await db.zonas.bulkAdd(d.zonas || []);
        await db.plantas.bulkAdd(d.plantas || []);
        await db.wiki.bulkAdd(d.wiki || []);
        alert("Restaurado!"); location.reload();
    };
    reader.readAsText(e.target.files[0]);
}

// Início
renderPlantas();
                                      
