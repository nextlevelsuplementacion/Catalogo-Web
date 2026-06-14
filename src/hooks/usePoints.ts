import { useState, useCallback, useEffect } from 'react';

interface Usuario {
  dni: string;
  puntos: number;
  reclamados: number[];
}

export const usePoints = () => {
  const [dniInput, setDniInput] = useState('');
  const [userPoints, setUserPoints] = useState<number | null>(null);
  const [userClaimed, setUserClaimed] = useState<number[]>([]);
  const [lastCheckedDni, setLastCheckedDni] = useState<string | null>(null);
  const [dniError, setDniError] = useState<string | null>(null);

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vScRd0mXFwM5qI7nS95Bhy5XZHmaadtbL8q555Jd0FadJUbPvnTICGfiRbpvebMStLqd9uWu7u8cqOc/pub?gid=0&single=true&output=csv");
        const texto = await res.text();

        const filas = texto.split("\n").slice(1);

        const datos: Usuario[] = filas
          .filter(f => f.trim())
          .map(fila => {
            const [dni, puntos, reclamados] = fila.split(",");

            return {
              dni: dni.trim(),
              puntos: Number(puntos),
              reclamados: reclamados
                ? reclamados.split("|").map(n => Number(n))
                : []
            };
          });

        setUsuarios(datos);
      } catch (error) {
        console.error("Error CSV:", error);
      }
    };

    fetchUsuarios();
  }, []);

  const checkPoints = useCallback(() => {
    if (!dniInput.trim()) return;

    const usuario = usuarios.find(u => u.dni === dniInput.trim());

    if (usuario) {
      setUserPoints(usuario.puntos);
      setUserClaimed(usuario.reclamados);
      setDniError(null);
    } else {
      setUserPoints(null);
      setUserClaimed([]);
      setDniError('DNI no encontrado');
    }

    setLastCheckedDni(dniInput);
  }, [dniInput, usuarios]);

  return {
    dniInput,
    setDniInput,
    userPoints,
    userClaimed,
    lastCheckedDni,
    dniError,
    checkPoints
  };
};