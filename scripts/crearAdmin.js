require('dotenv').config();
const bcrypt = require('bcrypt');
const db = require('../server/db');

const crearAdmin = async () => {
  const correo = 'admin@plaxtilineas.com';
  const passwordPlano = 'admin123'; // 🔐 cámbialo luego por algo más seguro
  const hash = await bcrypt.hash(passwordPlano, 10);

  try {
    await db.query('INSERT INTO usuarios (correo, password, rol) VALUES (?, ?, ?)', [
      correo,
      hash,
      'admin'
    ]);
    console.log('✅ Usuario administrador creado con éxito');
    process.exit();
  } catch (err) {
    console.error('❌ Error al crear admin:', err);
    process.exit(1);
  }
};

crearAdmin();
