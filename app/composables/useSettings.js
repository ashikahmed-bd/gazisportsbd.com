export const useSettings = () => {
  return useState("settings", () => ({
    general: {},
    contact: {},
    popup: {},
  }));
};
