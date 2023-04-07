import React from 'react'
import useGetApod from '../hooks/useGetApod'
import Loading from '../components/Loading'

type Props = {}

const NasaApod = (props: Props) => {
  const { data, loading, error } = useGetApod()

  return (
    <main className='flex justify-center'>
      <section className='w-1/2 bg-gradient-to-tr p-5 rounded-lg flex flex-col items-center justify-center'>
        {loading ? (
          <Loading />
        ) : (
          data && (
            <article className='flex flex-col items-center gap-4'>
              <div className='flex justify-around items-baseline'>
                <h1 className='text-3xl'>{data.title + ' 🚀'}</h1>
                <p className='text-xl'>{data.date}</p>
              </div>
              <img
                src={data.url}
                alt={data.title}
                className='h-[350px] rounded-md bg-gray-300 p-3'
              />
              <p>{data.explanation}</p>
            </article>
          )
        )}
      </section>
    </main>
  )
}

export default NasaApod
