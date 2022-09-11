import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
// import { getSortedPostsData } from '../lib/post';
import utilStyles from '../styles/utils.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Date from '../components/Date';

// SSG
// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData();
//   return {
//     props: {
//       allPostsData,
//     },
//   };
// }

// SSG 에서 fetch 사용
// export async function getStaticProps() {
//   const response = await fetch('http://localhost:3000/api/posts');
//   const json = await response.json();
//   return {
//     props: {
//       allPostsData: json.allPostsData,
//     },
//   };
// }

// SSR
// export async function getServerSideProps() {
//   const allPostsData = getSortedPostsData();
//   return {
//     props: {
//       allPostsData,
//     },
//   };
// }

export default function Home(/** { allPostsData } */) {
  // CSR
  const [allPostsData, setAllPostsData] = useState([]);
  console.log(allPostsData);
  useEffect(() => {
    // API Routes 사용
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => setAllPostsData(data.allPostsData));
  }, []);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>I want to be a greatest developer 😡 </p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href='https://nextjs.org/learn'>our Next.js tutorial</a>.)
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData?.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
