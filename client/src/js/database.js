import { openDB } from "idb";

const initdb = async () =>
  openDB("typeflow", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("typeflow")) {
        console.log("typeflow database already exists");
        return;
      }
      db.createObjectStore("typeflow", { keyPath: "id", autoIncrement: true });
      console.log("typeflow database created");
    },
  });

//  Method that accepts some content and adds it to the database

export const putDb = async (content) => {
  const textDb = await openDB("typeflow", 1);
  const tx = textDb.transaction("typeflow", "readwrite");
  const store = tx.createObjectStore("text");

  const request = store.add(content);
  const result = await request;

  console.log("Successfully added content to the database\n", result);
};
// method that gets all the content from the database
export const getDb = async () => {
  const textDb = await openDB("typeflow", 1);
  const tx = textDb.transaction("typeflow", "readonly");
  const store = tx.createObjectStore("text");

  const request = store.getAll();

  const result = await request;
  console.log("result.value", result);
  return result;
};

initdb();
