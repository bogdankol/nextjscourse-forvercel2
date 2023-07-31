import { MongoClient } from 'mongodb'

export default async function getAllMeetups() {

  const url = process.env.CONNECTION_STRING;
  const client = new MongoClient(url)
  await client.connect()

  const dbName = 'nextjscoursefinale'
  const db = client.db(dbName)

  const collection = db.collection('meetups')

  const resp = await collection.aggregate([{$match: {}}]).toArray()
  client.close()

  return await resp
}