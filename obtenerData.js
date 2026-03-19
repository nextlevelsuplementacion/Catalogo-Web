async function mostrarTodosUsuariosConsola() {
  const res = await fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vScRd0mXFwM5qI7nS95Bhy5XZHmaadtbL8q555Jd0FadJUbPvnTICGfiRbpvebMStLqd9uWu7u8cqOc/pub?gid=0&single=true&output=csv"); // reemplaza X por tu URL o CSV
  const texto = await res.text();

  const filas = texto.split("\n").slice(1); // saltar encabezado
  console.log(filas);

  for (let fila of filas) {
    if (!fila.trim()) continue; // evitar filas vacías
    const [usuario, puntos] = fila.split(",");
    console.log(`${usuario}: ${puntos}`);
  }
}

mostrarTodosUsuariosConsola();