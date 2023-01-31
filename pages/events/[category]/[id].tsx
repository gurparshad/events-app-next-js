import React from "react";
import data from "../../../data/data.json";
import Image from "next/image";

interface EventProps {
  data: any;
}

const Event: React.FC<EventProps> = ({data}) => {
  return (
    <div>
      <h1>{data.title}</h1>
      <Image width={200} height={200} src={data.image} alt={data.title} />
      <p>{data.description}</p>
    </div>
  );
};

export default Event;

export const getStaticPaths = async () => {
  const {allEvents} = data;
  const allPaths = allEvents.map((ev) => {
    return {
      params: {
        category: ev.city,
        id: ev.id.toString(),
      },
    };
  });
  return {
    paths: allPaths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const {id} = context.params;
  const {allEvents} = data;
  const event = allEvents.find((ev) => ev.id === id);
  return {
    props: {
      data: event,
    },
  };
};
