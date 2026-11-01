import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#070e17] text-white flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="bg-[#0f1d30] border border-cyan-500/30 p-6 rounded-2xl max-w-md shadow-2xl">
            <div className="text-4xl mb-3">✈️</div>
            <h1 className="text-xl font-black uppercase text-cyan-400 mb-2">STE AVIADOR</h1>
            <p className="text-xs text-slate-300 mb-4">
              Ocurrió un inconveniente al cargar la interfaz. Presiona el botón para reiniciar el sistema de entrenamiento.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="py-3 px-6 bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold uppercase text-xs tracking-wider rounded-xl cursor-pointer transition-all border border-cyan-400"
            >
              🔄 REINICIAR APLICACIÓN
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}



