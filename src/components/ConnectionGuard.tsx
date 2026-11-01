import React from 'react';

export function ConnectionGuard({ children }: { children: React.ReactNode }) {
  // La app STE AVIADOR es 100% offline por diseño.
  // No se muestra ningún banner de estado de conexión:
  // estar sin internet es el estado NORMAL y esperado de esta app.
  return (
    <div className="relative min-h-screen">
      {children}
    </div>
  );
}

