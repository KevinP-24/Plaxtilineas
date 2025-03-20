const express = require('express');
const path = require('path');

const app = express();
const PORT = 4000;

// Servir archivos estáticos desde "public"
app.use(express.static(path.join(__dirname, '../public')));

// Ruta para servir index.html (verifica el nombre en minúsculas)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor Plaxtilineas corriendo en http://localhost:${PORT}`);
});
