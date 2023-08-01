import getAllMeetups from '../lib/getAllMeetups'
import { MongoClient } from 'mongodb'

import MeetupList from '../components/meetups/MeetupList'
import Head from 'next/head'

export default function HomePage({
	meetups,
}: {
	meetups: {
		id: string
		title: string
		image: string
		address: string
		description: string
	}[]
}) {
	// console.log({meetups})
	return (
		<>
			<Head>
				<title>ReactMeetups</title>
				<meta
					name='description'
					content='some content'
				/>
			</Head>
			<MeetupList meetups={meetups} />
		</>
	)
}

export async function getStaticProps() {
	// let meetups = await getAllMeetups()
	// const fixedMeetups = meetups.map(meetup => ({
	// 	...meetup,
	// 	id: meetup._id
	// }))

	// return {
	// 	props: {
	// 		meetups: JSON.parse(JSON.stringify(fixedMeetups)),
	// 	},
	// 	revalidate: 3600,
	// }

	const url = process.env.CONNECTION_STRING
	const client = new MongoClient(url)
	await client.connect()

	const dbName = 'nextjscoursefinale'
	const db = client.db(dbName)

	const collection = db.collection('meetups')

	const meetups = await collection.aggregate([{ $match: {} }]).toArray()
	client.close()

	const fixedMeetups = meetups.map((meetup) => ({
		...meetup,
		id: meetup._id.toString(),
		_id: '',
	}))

	console.log({ fixedMeetups })
	return {
		props: {
			meetups: fixedMeetups,
		},
		revalidate: 5
	}
}
