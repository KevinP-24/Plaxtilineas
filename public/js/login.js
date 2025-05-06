document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const regresarBtn = document.querySelector('.btn-secondary');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const correo = document.getElementById('correo').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        form.reset(); // Limpia campos después del login
        window.location.href = '/dashboard/dashboard.html';
      } else {
        alert(data.error || 'Credenciales inválidas');
      }
    } catch (error) {
      console.error('❌ Error al iniciar sesión:', error);
      alert('Error de red o servidor');
    }
  });

  // Limpia el formulario al hacer clic en "Regresar"
  if (regresarBtn) {
    regresarBtn.addEventListener('click', () => {
      form.reset();
    });
  }
});
