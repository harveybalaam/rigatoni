declare global {
  interface Window {
    appWindow: {
      setHeightOffset: (windowHeightOffset: number) => void;
    };
  }
}
