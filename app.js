function irPara(pg) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('page-'+pg).classList.add('active');
    event.currentTarget.classList.add('active');
    if(pg === 'horta') carregarPlantas();
    if(pg === 'calendario') carregarCalendario();
    if(pg === 'wiki') carregarWiki();
}

// Funções de Modal e Zonas
function abrirModal() { document.getElementById('modal').style.display = 'flex'; atualizarSelectZonas(); }
function fecharModal() { document.getElementById('modal').style.display = 'none'; }

async function addZona() {
    const nome = document.getElementById('z-nome').value;
    if(nome) await db.zonas.add({nome});
    document.getElementById('z-nome').value = '';
    carregarZonas();
}

async function atualizarSelectZonas() {
    const zonas = await db.zonas.toArray();
    document.getElementById('p-zona-id').innerHTML = zonas.map(z => `<option value="${z.id}">${z.nome}</option>`).join('');
}

// Lógica de Plantas e Calendário
async function salvarPlanta() {
    const tipo = document.getElementById('p-tipo').value;
    await db.plantas.add({
        tipo,
        nome: document.getElementById('p-nome').value,
        zonaId: parseInt(document.getElementById('p-zona-id').value),
        data: document.getElementById('p-data').value,
        ciclo: WIKI[tipo]?.ciclo || 60,
        notas: document.getElementById('p-notas').value
    });
    fecharModal();
    irPara('horta');
}

async function carregarCalendario() {
    const plantas = await db.plantas.toArray();
    const render = document.getElementById('calendario-render');
    render.innerHTML = plantas.map(p => {
        let colheita = new Date(p.data);
        colheita.setDate(colheita.getDate() + p.ciclo);
        return `<div class="card"><strong>${p.nome}</strong><br>Previsto para: ${colheita.toLocaleDateString('pt-PT')}</div>`;
    }).join('');
}

// BACKUP
async function exportarBackup() {
    const data = {
        zonas: await db.zonas.toArray(),
        plantas: await db.plantas.toArray()
    };
    const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'backup_quinta.json';
    a.click();
}

async function importarBackup(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (event) => {
        const d = JSON.parse(event.target.result);
        await db.zonas.bulkAdd(d.zonas);
        await db.plantas.bulkAdd(d.plantas);
        location.reload();
    };
    reader.readAsText(file);
}

function filtrarTudo() {
    const query = document.getElementById('globalSearch').value.toLowerCase();
    document.querySelectorAll('.card').forEach(c => {
        c.style.display = c.innerText.toLowerCase().includes(query) ? 'block' : 'none';
    });
}

function carregarWiki() {
    document.getElementById('wiki-render').innerHTML = Object.keys(WIKI).map(k => `
        <div class="card"><h3>${k}</h3><p>${WIKI[k].dicas}</p></div>
    `).join('');
      }
