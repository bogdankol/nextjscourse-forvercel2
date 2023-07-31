import getAllMeetups from '../../lib/getAllMeetups';

export default async function handler(req: any, res: any) {

  const resp = await getAllMeetups()

  return res.status(201).json({resp})
}