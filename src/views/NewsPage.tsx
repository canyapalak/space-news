import { useEffect, useState } from 'react'
import Modal from '../components/Modal'

export default function NewsPage() {
  const [allNews, setAllNews] = useState<allNewsItem | undefined>()

  const [open, setOpen] = useState(false) //modal logic
  const [urlNewsModal, setUrlNewsModal] = useState<string>('')

  interface allNewsItem {
    count: number
    next: string | null
    previous: string | null
    results: NewsItem[]
  }

  interface NewsItem {
    id: number
    title: string
    url: string
    image_url: string
    news_site: string
    summary: string
    published_at: string
    updated_at: string
    featured: boolean
    launches: []
    events: []
  }

  useEffect(() => {
    const getAllNews = async () => {
      try {
        const response = await fetch(
          'https://api.spaceflightnewsapi.net/v4/articles',
        )
        const result = await response.json()
        setAllNews(result)
      } catch (error) {
        console.error(error)
      }
    }
    getAllNews()
  }, [])

  console.log('allNews :>> ', allNews)

  const handleClick = (news: NewsItem) => {
    setOpen(true)
    setUrlNewsModal(news.url)
  }

  return (
    <main
      className={`${
        open ? 'blur-sm' : 'blur-0'
      } flex justify-center items-center px-5 pb-10`}
    >
      {open ? <Modal open={open} setOpen={setOpen} url={urlNewsModal} /> : null}
      <section className=''>
        <p className='font-nasalization text-center text-cyan-400 text-xl'>
          NEWS
        </p>
        {!allNews ? (
          <p className='text-center'>Loading...</p>
        ) : (
          <>
            <p className='text-lg text-center'>{allNews?.count} news found.</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3   gap-5'>
              {allNews?.results?.map((news) => (
                <article
                  key={news.id}
                  className='flex flex-col md:flex-row gap-5 bg-gradient-to-br from-stone-950 to-stone-700 border-solid border-2 border-stone-600 rounded-xl p-3 shadow-md hover:shadow-lg hover:shadow-gray-500'
                >
                  <div className='min-w-[300px] w-[300px] max-w-[300px] h-36 bg-gradient-to-br from-neutral-600 to-zinc-900 p-1 rounded-lg'>
                    <img
                      src={news.image_url}
                      alt='News'
                      className='w-full h-full object-cover rounded-lg shadow-md'
                    ></img>
                  </div>
                  <div className='flex flex-col text-center justify-between'>
                    <p className='text-lg text-center'>{news.title}</p>
                    <button
                      onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                        handleClick(news)
                      }
                      className='bg-gradient-to-b from-sky-900 to-slate-950 bg-opacity-60 rounded hover:cursor-pointer'
                    >
                      Read more...
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  )
}
