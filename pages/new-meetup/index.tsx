import { useRouter } from 'next/router'

import NewMeetupForm from '../../components/meetups/NewMeetupForm'
import Head from 'next/head'

export default () => {
	const router = useRouter()

	async function addMeetupHandler(data: any) {
		try {
			const resp = await fetch('/api/new-meetup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})

			const dataFromInsertingNewMeetup = await resp.json()
			console.log({ dataFromInsertingNewMeetup })

			router.push('/')
		} catch (error) {
			console.log({ error })
		}
	}

	return (
		<>
			<Head>
				<title>ReactMeetups</title>
				<meta
					name='description'
					content='add a new meetups here'
				/>
			</Head>
			<NewMeetupForm onAddMeetup={addMeetupHandler} />
		</>
	)
}
