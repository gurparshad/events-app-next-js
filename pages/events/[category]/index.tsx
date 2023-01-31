import React from "react";
import data from "../../../data/data.json";
import Image from "next/image";
import Link from "next/link";

interface EventCategoryProps {
  data: any;
  pageName: string;
}

// this page is for particular category
const EventCategoryPage: React.FC<EventCategoryProps> = ({data, pageName}) => {
  return (
    <div>
      <h1>Events in {pageName}</h1>
      {data.map((ev: any) => (
        <Link key={ev.id} href={`/events/${pageName}/${ev.id}`}>
          <p>{ev.title}</p>
          <Image src={ev.image} alt={ev.id} width={300} height={300} />
          <p>{ev.description}</p>
        </Link>
      ))}
    </div>
  );
};

export default EventCategoryPage;

// this will create the pages we want.
export async function getStaticPaths() {
  const {events_categories} = data;
  const allPaths = events_categories.map((ev) => {
    return {
      params: {
        category: ev.id.toString(),
      },
    };
  });
  console.log(allPaths);
  return {
    paths: allPaths,
    fallback: false,
  };
}

// this will add data to those pages we created by above method
export async function getStaticProps(context: any) {
  console.log(context);
  const id = context?.params.category;
  console.log("id-->>", id);
  const {allEvents} = data;
  const eventsByCity = allEvents.filter((ev) => ev.city === id);

  return {props: {data: eventsByCity, pageName: id}};
}
