import Image from 'next/image'

import classes from './MeetupDetail.module.css'

export default function MeetupDetail ({ image, title, address, description }) {
  return <section className={classes.detail}>
    <Image src={image} alt={title} width={300} height={400} />
    <h1>{title}</h1>
    <address>{address}</address>
    <p>{description}</p>
  </section>
}