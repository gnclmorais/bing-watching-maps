import Head from 'next/head'

import { getAllBookIds, getBookData } from '../../lib/books'

export default function Book({ bookData }) {
  return (
    <>
      <Head>
        <title>{bookData.title}</title>
      </Head>

      Book
      {bookData.title}
      <br />
      {bookData.chapters.map(({ title }) => title).join(', ')}
    </>
  )
}

// Return a list of possible value for id
export async function getStaticPaths() {
  const paths = getAllBookIds()

  return {
    paths,
    fallback: false
  }
}

// Fetch necessary data for the book using params.id
export async function getStaticProps({ params }) {
  const bookData = getBookData(params.id)

  return {
    props: {
      bookData
    }
  }
}