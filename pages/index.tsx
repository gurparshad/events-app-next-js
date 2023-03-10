import Head from "next/head";
import styles from "../styles/Home.module.css";
import data from "../data/data.json";
import Image from "next/image";
import Link from "next/link";

interface HomeProps {
  data: any;
}

const Home: React.FC<HomeProps> = ({data}) => {
  return (
    <>
      <Head>
        <title>Events app home page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <nav>
          <img src="" alt="logo" />
          <Link href="/">Home</Link>
          <Link href="/events">events</Link>
          <Link href="/about-us">About us</Link>
        </nav>
      </header>
      <main className={styles.main}>
        {data.map((ev: any) => (
          <Link key={ev.id} href={`/events/${ev.id}`}>
            <h2>{ev.title}</h2>
            <p>{ev.description}</p>
            <Image width={200} height={200} src={ev.image} alt={ev.title} />
          </Link>
        ))}
      </main>
      <footer className={styles.footer}>
        <p>this is footer</p>
      </footer>
    </>
  );
};

export default Home;

// this going to be the data that we are going to use in the app. we can use this data in the server side or client side.
// this code will run only in the server side, the client/browser wont have access to it. so we have to pass the data as props to the components.
// it will run before teh component.
export const getServerSideProps = async () => {
  // you can also fetch data from an api.
  const {events_categories} = data;
  return {
    props: {
      data: events_categories,
    },
  };
};
