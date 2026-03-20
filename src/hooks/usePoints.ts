import { useState, useCallback, useEffect } from 'react';

interface Usuario {
  dni: string; // corresponde al DNI o identificador en tu CSV
  puntos: number;
}

export const usePoints = () => {
  const [dniInput, setDniInput] = useState('');
  const [userPoints, setUserPoints] = useState<number | null>(null);
  const [lastCheckedDni, setLastCheckedDni] = useState<string | null>(null);
  const [dniError, setDniError] = useState<string | null>(null);

  // Lista de usuarios cargada desde Google Sheets
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  // 1️⃣ Cargar los usuarios desde el CSV al montar el hook
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await fetch(
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vScRd0mXFwM5qI7nS95Bhy5XZHmaadtbL8q555Jd0FadJUbPvnTICGfiRbpvebMStLqd9uWu7u8cqOc/pub?gid=0&single=true&output=csv"
        );
        const texto = await res.text();
        const filas = texto.split("\n").slice(1); // saltar encabezado

        const datos: Usuario[] = filas
          .filter(f => f.trim())
          .map(fila => {
            const [dni, puntos] = fila.split(",");
            return { dni: dni.trim(), puntos: Number(puntos) };
          });

        setUsuarios(datos);
      } catch (error) {
        console.error("Error al cargar usuarios desde CSV:", error);
      }
    };

    fetchUsuarios();
  }, []);

  // 2️⃣ Función de checkPoints igual que antes, pero busca en usuarios
  const checkPoints = useCallback(() => {
    if (!dniInput.trim()) return;

    const usuario = usuarios.find(u => u.dni === dniInput.trim());

    if (usuario) {
      setUserPoints(usuario.puntos);
      setDniError(null);
    } else {
      setUserPoints(null);
      setDniError('El DNI ingresado no se encuentra en nuestra base de datos.');
    }

    setLastCheckedDni(dniInput);
  }, [dniInput, usuarios]);

  return {
    dniInput,
    setDniInput,
    userPoints,
    lastCheckedDni,
    dniError,
    checkPoints
  };
};