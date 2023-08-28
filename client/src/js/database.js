import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("text database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("text database created");
    },
  });

//  Method that accepts some content and adds it to the database

export const putDb = async (content) => {
  const textDb = await openDB("jate", 1);
  const tx = textDb.transaction("jate", "readwrite");
  const store = tx.createObjectStore("jate");

  const request = store.put(content);
  const result = await request;

  console.log("Successfully added content to the database\n", result);
};
// method that gets all the content from the database
export const getDb = async () => {
  const textDb = await openDB("jate", 1);
  const tx = textDb.transaction("jate", "readonly");
  const store = tx.createObjectStore("jate");

  const request = store.getAll();

  const result = await request;
  console.log("result.value", result);
  return result;
};

initdb();
