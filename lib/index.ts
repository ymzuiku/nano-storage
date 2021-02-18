interface INanoStorage<T> {
  initData: T;
  reinit: () => void;
  set: (obj: Partial<T>) => void;
}

interface NanoDbOptions {
  storage?: "localStorage" | "sessionStorage";
  version?: string;
}

export const NanoStorage = <T>(
  key: string,
  init: T,
  { storage = "localStorage", version }: NanoDbOptions = {}
): T & INanoStorage<T> => {
  key = key + (version || NanoStorage.version);
  if (typeof init !== "object") {
    throw "NanoDb: init need a object";
  }

  if ((init as any).set || (init as any).reinit || (init as any).initData) {
    throw "NanoDb: init object can not use props: ['set', 'initData', 'reinit']";
  }

  const cache = JSON.parse(JSON.stringify(init));
  const db = {
    initData: JSON.parse(JSON.stringify(init)),
    reinit: () => {
      const str = JSON.stringify(db.initData);
      const cache = JSON.parse(str);
      window[storage].setItem(key, str);
      Object.assign(db, cache);
    },
    set: (obj: T) => {
      Object.assign(cache, obj);
      Object.assign(db, obj);
      window[storage].setItem(key, JSON.stringify(cache));
    },
  };

  const old = window[storage].getItem(key);
  if (old) {
    try {
      const obj = JSON.parse(old);
      db.set(obj);
    } catch (err) {
      console.error(err);
      db.set(init);
    }
  } else {
    db.set(init);
  }

  return db as any;
};

NanoStorage.version = "";
