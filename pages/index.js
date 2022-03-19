import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import {
  FaEnvelopeSquare,
  FaFacebookSquare,
  FaHome,
  FaInstagramSquare,
  FaTwitterSquare,
} from 'react-icons/fa';

import styles from '../styles/Home.module.css'
import { getSortedBooksData } from '../lib/books'

export async function getStaticProps() {
  const allBooksData = getSortedBooksData()

  return {
    props: {
      allBooksData
    }
  }
}

export default function Home({ allBooksData }) {
  const size = '1.5em';
  const headerAndFooter = 'h-20 px-20';

  // TODO: Extract common "shell"
  return (
    <div className="flex flex-col h-screen">
      <header className={`
        bg-purple-900 text-white flex
        ${headerAndFooter}
      `}>
        <div className="flex items-center flex-grow">
          <FaHome size={size} /> <Link href={'/about'}>About the Binge Watching collection</Link>
        </div>
        <div className="flex items-center">
          <a href="https://facebook.com/bingewatchingcollection" target="_blank" rel="noopener noreferrer">
            <FaFacebookSquare size={size} />
          </a>
          <a href="https://twitter.com/marion_en_vo" target="_blank" rel="noopener noreferrer">
            <FaTwitterSquare size={size} />
          </a>
          <a href="https://instagram.com/marion_en_vo" target="_blank" rel="noopener noreferrer">
            <FaInstagramSquare size={size} />
          </a>
          <a href="https://tinyletter.com/bingewatchingcollection" target="_blank" rel="noopener noreferrer">
            <FaEnvelopeSquare size={size} />
          </a>
        </div>
      </header>

      <section className="flex-1 overflow-y-auto">
        <h2>Books</h2>

        <ul className="flex flex-col">
          {allBooksData.map(({ id, title, chapters }, i) => (
            <li key={id}>
              <Link href={`/books/${id}`}>
                <a className="underline">{title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      { /* TODO: Finish footer */ }
      <footer className={`
        bg-purple-900 text-white md:flex
        ${headerAndFooter}
      `}>
        <section className="flex-grow">One</section>
        <section className="flex-grow">Two</section>
        <section className="flex-grow">Three</section>
      </footer>
    </div>
  )
}
