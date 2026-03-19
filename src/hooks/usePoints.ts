import { useState, useCallback } from 'react';
import { MOCK_POINTS } from '../constants';

export const usePoints = () => {
  const [dniInput, setDniInput] = useState('');
  const [userPoints, setUserPoints] = useState<number | null>(null);
  const [lastCheckedDni, setLastCheckedDni] = useState<string | null>(null);
  const [dniError, setDniError] = useState<string | null>(null);

  const checkPoints = useCallback(() => {
    if (!dniInput.trim()) return;
    const points = MOCK_POINTS[dniInput];
    if (points !== undefined) {
      setUserPoints(points);
      setDniError(null);
    } else {
      setUserPoints(null);
      setDniError('El DNI ingresado no se encuentra en nuestra base de datos.');
    }
    setLastCheckedDni(dniInput);
  }, [dniInput]);

  return {
    dniInput,
    setDniInput,
    userPoints,
    lastCheckedDni,
    dniError,
    checkPoints
  };
};
