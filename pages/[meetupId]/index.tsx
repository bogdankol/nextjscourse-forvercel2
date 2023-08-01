import getAllMeetups from '../../lib/getAllMeetups'
import { MongoClient } from 'mongodb'

import MeetupDetail from '../../components/meetups/MeetupDetail'
import Head from 'next/head'

export default ({
	meetupData,
}: {
	meetupData: { image; title; address; description }
}) => {
	return (
		<>
			<Head>
				<title>ReactMeetups</title>
				<meta
					name='description'
					content='browse one of your meetups'
				/>
			</Head>
			{meetupData && (
				<MeetupDetail
					image={meetupData.image}
					title={meetupData.title}
					address={meetupData.address}
					description={meetupData.description}
				/>
			)}
		</>
	)
}

export async function getStaticPaths() {
	const meetups = await getAllMeetups()
	const fixedMeetups = meetups.map((meetup) => ({
		...meetup,
		id: meetup._id.toString(),
	}))
	const paths = fixedMeetups.map((meetup) => ({
		params: {
			meetupId: meetup.id,
		},
	}))

	return {
		paths,
		fallback: true,
		revalidate: 5
	}
}

export async function getStaticProps(context) {
	const id = context.params.meetupId
	let meetupData: any = {}

	// const meetups = await getAllMeetups()
	// const fixedMeetups = meetups.map((meetup) => ({
	// 	...meetup,
	// 	id: meetup._id.toString(),
	// }))

	// meetupData = fixedMeetups.filter((meetup) => meetup.id === id)

	// // if(!meetupData) {
	// //   return {
	// //     props: {}
	// //   }
	// // }

	// return {
	// 	props: {
	// 		meetupData: JSON.parse(JSON.stringify(meetupData[0])),
	// 	},
	// }

	const url = process.env.CONNECTION_STRING
	const client = new MongoClient(url)
	await client.connect()

	const dbName = 'nextjscoursefinale'
	const db = client.db(dbName)

	const collection = db.collection('meetups')

	const meetups = await collection.aggregate([{ $match: {} }]).toArray()
	const fixedMeetups = meetups.map((meetup) => ({
		...meetup,
		id: meetup._id.toString(),
		_id: '',
	}))
	meetupData = fixedMeetups.filter((meetup) => meetup.id === id)[0]
	client.close()

	return {
		props: {
			meetupData,
		},
		revalidate: 5
	}
}
