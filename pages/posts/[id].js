import Head from 'next/head';
import Layout from '../../components/Layout';
import Date from '../../components/Date';
import { getPostData, getAllPostIds } from '../../lib/post';
import utilStyles from '../../styles/utils.module.css';

// SSG에서 페이지 정보를 저장하는 함수
export async function getStaticPaths() {
  // path는 배열 형태로
  // [ { params: { id: 'pre-rendering' } }, { params: { id: 'ssg-ssr' } } ]
  const paths = getAllPostIds();
  console.log('paths', paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  console.log('params', params);
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>첫번째 페이지</Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <br />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
