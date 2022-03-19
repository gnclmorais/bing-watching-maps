import Head from 'next/head'
import Link from 'next/link'

import { getAllBookIds, getBookData } from '../../lib/books'

export default function Book({ bookData }) {
  return (
    <>
      <Head>
        <title>{bookData.title}</title>
      </Head>

      <h1>
        Book: <strong>{bookData.title}</strong>
      </h1>

      { /* TODO: Grid? */ }
      <ul>
        {bookData.chapters.map(({ id, title }) => (
          <li>
            <Link key={id} href={`/maps/${id}`}>
              <a className="underline">{title}</a>
            </Link>
          </li>
        ))}
      </ul>
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
