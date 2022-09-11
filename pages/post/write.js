import React, { useRef, useState } from 'react';
import Layout from '../../components/layout';
import Link from 'next/link';

export default function Write() {
  const idRef = useRef(undefined);
  const titleRef = useRef(undefined);
  const contentRef = useRef(undefined);

  const [showLink, setShowLink] = useState(false);

  const onHandleSubmit = (e) => {
    e.preventDefault();

    const id = idRef.current.value;
    const title = titleRef.current.value;
    const content = contentRef.current.value;

    if (id && title && content) {
      fetch('/api/post/write', {
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          title,
          content,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error('Fetch Error');
        })
        .then((data) => {
          setShowLink(true);
          alert(data.message);
        })
        .catch((error) => alert(`request Error : ${error}`));
    }
  };
  return (
    <Layout>
      <h1>Write a Post</h1>
      <form onSubmit={onHandleSubmit}>
        <input
          type='text'
          name='id'
          placeholder='아이디'
          required
          ref={idRef}
        />
        <br />
        <input
          type='text'
          name='title'
          placeholder='제목'
          required
          ref={titleRef}
        />
        <br />
        <textarea
          type='text'
          name='content'
          placeholder='컨텐츠'
          required
          ref={contentRef}
        />
        <br />
        <input type='submit' value='create' />
      </form>
      {showLink && (
        <Link href={`/posts/${idRef.current.value}`}>
          <a>Create Post link</a>
        </Link>
      )}
    </Layout>
  );
}
