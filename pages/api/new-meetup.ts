import createNewMeetup from '../../lib/createNewMeetup';

export default async function handler(req: any, res: any) {

  if(req.method !== 'POST') {
    return 
  } else if (req.method === 'POST') {
    const { title, image, address, description } = req.body

    const resp = await createNewMeetup({title, image, address, description})
    return res.status(201).json({resp})
  }
}