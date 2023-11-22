import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
try {
  if(content === null) {
    console.log("No Data to save");
  } else {
  console.log('content', content)
  console.log('Putting to database..');
  const jateDb = await openDB('jate', 1,);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({Value: content});
  const result = await request;
  console.log('Data has been saved to database', result);
  }
  
} catch (error) {
  console.log(error)
}
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    console.log('Getting data from database...');
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.getAll();
    const result = await request;

    if(result.length === 0){
      console.log("No Data");
    } else{
    console.log('Retrieved Data', result);
    return result
    }

    return result;
  } catch (error) {
    console.log(error)
  }
}

initdb();
