const db = new Dexie("QuintaDB");
db.version(2).stores({ // Aumentamos a versão para 2
    zonas: '++id, nome',
    plantas: '++id, zonaId, tipo, nome, data, ciclo, notas',
    wiki: '++id, titulo, texto' // Nova tabela para a tua Wiki personalizada
});
