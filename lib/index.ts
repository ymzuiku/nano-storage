export interface INanoStorage<T> {
  defaultValues: T;
  set: (obj: Partial<T>) => void;
  assign: (obj: Partial<T>) => void;
  clear: () => void;
  val: T;
}

export const NanoStorage = <T>(
  key: string,
  init: T,
  storage: "localStorage" | "sessionStorage" = "localStorage",
): INanoStorage<T> => {
  if (typeof init !== "object") {
    throw "NanoDb: init need a object";
  }

  const db = {
    val: JSON.parse(JSON.stringify(init)),
    defaultValues: JSON.parse(JSON.stringify(init)),
    set: (obj: T) => {
      db.val = obj;
      window[storage].setItem(key, JSON.stringify(db.val));
    },
    assign: (obj: T) => {
      Object.assign(db.val, obj);
      window[storage].setItem(key, JSON.stringify(db.val));
    },
    clear: () => {
      db.set({ ...db.defaultValues });
    },
  };

  const old = window[storage].getItem(key);
  if (old) {
    try {
      const obj = JSON.parse(old);
      db.assign(obj);
    } catch (err) {
      console.error(err);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return db as any;
};
