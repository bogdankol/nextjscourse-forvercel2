import { MongoClient } from 'mongodb'

export default async function createNewMeetup(data: {title: string, image: string, address: string, description: string}) {

  const url = process.env.CONNECTION_STRING
  const client = new MongoClient(url)
  await client.connect()
  console.log('Connected to mongodb')

  // second approach of connecting 
  // const url = process.env.CONNECTION_STRING
  // const client = await MongoClient.connect(url)
  // console.log('Connected to mongodb')

  const dbName = 'nextjscoursefinale'
  const db = client.db(dbName)
  console.log('found db')

  const collection = db.collection('meetups')
  console.log('found collection')

    const { title, image, address, description } = data

    const resp = await collection.insertOne({title, image, address, description})
    client.close()
    return resp
}