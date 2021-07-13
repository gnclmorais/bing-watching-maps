import Head from 'next/head'
import Link from 'next/link'

import { getAllBookIds, getBookData } from '../../lib/books'

export default function Book({ bookData }) {
  return (
    <>
      <Head>
        <title>{bookData.title}</title>
      </Head>

      Book: <strong>{bookData.title}</strong>
      <br />
      {bookData.chapters.map(({ id, title }) => (
        <Link key={id} href={`/maps/${id}`}>
          <a className="underline">{title}</a>
        </Link>
      ))}
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
