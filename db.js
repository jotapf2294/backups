const db = new Dexie("QuintaDB");
db.version(1).stores({
    zonas: '++id, nome',
    plantas: '++id, zonaId, tipo, nome, data, ciclo, notas',
    config: 'key, value'
});
