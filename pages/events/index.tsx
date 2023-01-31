import React from "react";
import data from "../../data/data.json";
import Image from "next/image";
import Link from "next/link";

interface EventsProps {
  data: any;
}

const Events: React.FC<EventsProps> = ({data}) => {
  return (
    <div>
      <h1>these are events bro</h1>
      <div>
        {data.map((item: any) => (
          <Link key={item.id} href={`/events/${item.id}`}>
            <Image width={200} height={200} src={item.image} alt={item.title} />
            <h2>{item.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Events;

// this is a server method
export const getStaticProps = async () => {
  const {events_categories} = data;
  return {
    props: {
      data: events_categories,
    },
  };
};
