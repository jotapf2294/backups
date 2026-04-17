// Configuração do Banco de Dados Dexie
const db = new Dexie("QuintaProDB");

db.version(1).stores({
    zonas: '++id, nome',
    plantas: '++id, zonaId, nome, tipo, data, ciclo, notas, foto',
    notas: '++id, titulo, texto'
});

db.open().catch(err => {
    console.error("Erro ao abrir banco: " + err);
});
