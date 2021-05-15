export interface INanoStorage<T> {
  initData: T;
  reinit: () => void;
  set: (obj: Partial<T>) => void;
  data: T;
}

export interface NanoDbOptions {
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

  const db = {
    data: JSON.parse(JSON.stringify(init)),
    initData: JSON.parse(JSON.stringify(init)),
    reinit: () => {
      const str = JSON.stringify(db.initData);
      window[storage].setItem(key, str);
      Object.assign(db, JSON.parse(str));
    },
    set: (obj: T) => {
      Object.assign(db.data, obj);
      window[storage].setItem(key, JSON.stringify(db.data));
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
