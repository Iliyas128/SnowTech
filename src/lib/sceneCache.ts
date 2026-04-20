const loadedScenes = new Set<string>();

export const sceneCache = {
  has(id: string): boolean {
    return loadedScenes.has(id);
  },
  add(id: string): void {
    loadedScenes.add(id);
  },
};
