import React from 'react'
import useGetApod from '../hooks/useGetApod'
import Loading from '../components/Loading'
import { Link } from 'react-router-dom'

type Props = {}

const NasaApod = (props: Props) => {
  const { data, loading } = useGetApod()
  // console.log('data', data)

  return (
    <main className='flex flex-col justify-center px-4'>
      <p className='font-nasalization text-center text-orange-200 text-xl'>
        PIC OF THE DAY!
      </p>
      {loading ? (
        <div className='mt-5 mx-auto'><Loading /></div>
      ) : (
        data && (
          <section className='mt-5 md:w-2/3 lg:w-1/2 p-5 flex flex-col items-center mx-auto justify-center bg-gradient-to-br
           from-slate-950 to-slate-700 border-solid border-2
           border-slate-500 rounded-xl shadow-md hover:shadow-lg hover:shadow-gray-500'>
            <article className='flex flex-col items-center gap-4'>
              <div className='flex justify-around items-baseline'>
                <h1 className='text-xl'>{data.title + ` 🚀`}</h1>
                <p className='text-lg ml-1'>{data.date}</p>
              </div>
              <Link to={data.hdurl} target="_blank">
                <img
                  src={data.url}
                  alt={data.title}
                  className='h-[150px] md:h-[280] lg:h-[400px] rounded-md bg-slate-500 p-0.5 cursor-pointer'
                />
              </Link>
              <p className='px-2 text-center'>{data.explanation}</p>
            </article>
          </section>
        )
      )}

    </main>
  )
}

export default NasaApod
