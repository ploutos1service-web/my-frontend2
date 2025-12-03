import React from 'react';

interface ErrorBoundaryState {
  error: Error | null;
}

class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: any) {
    // You can hook this up to an error reporting service later
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary] caught error', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-8">
          <div className="max-w-2xl text-center p-8 border border-white/10 rounded-xl bg-zinc-900/80">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="text-sm text-gray-300 mb-6">An unexpected error occurred while loading the app. Open the browser console to see details.</p>
            <pre className="text-xs text-left p-4 bg-black/60 rounded-md overflow-auto text-red-300">{this.state.error?.message}</pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
