import { openDB } from 'idb.js';

// demo1: Getting started
export function demo1() {
    openDB('db1', 1, {
        upgrade(db) {
            db.createObjectStore('store1');
            db.createObjectStore('store2');
        },
    });
    openDB('db2', 1, {
        upgrade(db) {
            db.createObjectStore('store3', { keyPath: 'id' });
            db.createObjectStore('store4', { autoIncrement: true });
        },
    });
}

export async function demo2() {
    const db1 = await openDB('db1', 1);
    db1.add('store1', 'hello world', 'message');
    db1.add('store1', true, 'delivered');
    db1.close();
}

export async function demo3() {
    const db1 = await openDB('db1', 1);
    db1
        .add('store1', 'hello again!!', 'new message')
        .then(result => {
            console.log('success!', result);
        })
        .catch(err => {
            console.error('error: ', err);
        });
    db1.close();
}

export const idb = {
    db1: openDB("db1", 1),
    db2: openDB("db2", 1)
};

export async function addToStore1(key, value) {
    (await idb.db1).add("store1", value, key);
}

export async function demo4() {
    const db2 = await openDB('db2', 1);
    db2.add('store3', { id: 'cat001', strength: 10, speed: 10 });
    db2.add('store3', { id: 'cat002', strength: 11, speed: 9 });
    db2.add('store4', { id: 'cat003', strength: 8, speed: 12 });
    db2.add('store4', { id: 'cat004', strength: 12, speed: 13 });
    db2.close();
}

export async function demo5() {
    const db2 = await openDB('db2', 1);
    // retrieve by key:
    db2.get('store3', 'cat001').then(console.log);
    // retrieve all:
    db2.getAll('store3').then(console.log);
    // count the total number of items in a store:
    db2.count('store3').then(console.log);
    // get all keys:
    db2.getAllKeys('store3').then(console.log);
    db2.close();
}

export async function demo6() {
    // set db1/store1/delivered to be false:
    const db1 = await openDB('db1', 1);
    db1.put('store1', false, 'delivered');
    db1.close();
    // replace cat001 with a supercat:
    const db2 = await openDB('db2', 1);
    db2.put('store3', { id: 'cat001', strength: 99, speed: 99 });
    db2.close();
}

export async function demo7() {
    const db2 = await openDB('db2', 1);
    // open a new transaction, declare which stores are involved:
    let transaction = db2.transaction(['store3', 'store4'], 'readwrite');
    // do multiple things inside the transaction, if one fails all fail:
    let superCat = await transaction.objectStore('store3').get('cat001');
    transaction.objectStore('store3').delete('cat001');
    transaction.objectStore('store4').add(superCat);
    db2.close();
}

export async function demo8() {
    // we'll only operate on one store this time:
    const db1 = await openDB('db1', 1);
    // ↓ this is equal to db1.transaction(['store2'], 'readwrite'):
    let transaction = db1.transaction('store2', 'readwrite');
    // ↓ this is equal to transaction.objectStore('store2').add(..)
    transaction.store.add('foo', 'foo');
    transaction.store.add('bar', 'bar');
    // monitor if the transaction was successful:
    transaction.done
        .then(() => {
            console.log('All steps succeeded, changes committed!');
        })
        .catch(() => {
            console.error('Something went wrong, transaction aborted');
        });
    db1.close();
}

demo1()
demo2()
demo3()
console.log(1)