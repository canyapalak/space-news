import { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { Link } from 'react-router-dom'

export default function BlogsPage() {
    const [allBlogs, setAllBlogs] = useState<allBlogsItem | undefined>()
    const [loading, setLoading] = useState(false)
    interface allBlogsItem {
        count: number
        next: string | null
        previous: string | null
        results: BlogItem[]
    }

    interface BlogItem {
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
        const getAllBlogs = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    'https://api.spaceflightnewsapi.net/v4/blogs',
                );
                const result = await response.json();
                setTimeout(() => {
                    setAllBlogs(result);
                }, 600);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getAllBlogs();
    }, []);

    console.log('allBlogs :>> ', allBlogs)

    return (
        <main
            className="flex justify-center items-center px-5 pb-10"
        >
            <section className=''>
                <p className='font-nasalization text-center text-cyan-400 text-xl'>
                    BLOGS
                </p>
                {!allBlogs ? (
                    <div className='mt-5 mx-auto'><Loading /></div>
                ) : (
                    <>
                        <p className='text-lg text-center'>{allBlogs?.count} blog posts found.</p>
                        <div className='grid grid-cols-1 gap-3 px-3 md:px-10 lg:px-20 xl:px-60 mt-5'>
                            {allBlogs?.results?.map((blog) => (
                                <article
                                    key={blog.id}
                                    className='flex flex-col md:flex-row gap-5 bg-gradient-to-br from-stone-950 to-stone-700 border-solid 
                                    border-2 border-stone-600 rounded-xl p-3 shadow-md hover:shadow-lg hover:shadow-gray-500'
                                >
                                    <div className='mx-auto md:flex-grow items-center min-w-[250px] w-[250px] max-w-[250px] 
                                    h-24 md:min-w-[300px] md:w-[300px] md:max-w-[300px] md:h-36 to-zinc-900 rounded-lg'>
                                        <img
                                            src={blog.image_url}
                                            alt='News'
                                            className='w-full h-full object-cover rounded-lg shadow-md'
                                        ></img>
                                    </div>
                                    <div className='flex flex-col justify-between mx-auto md:flex-grow md:text-left ml-1'>
                                        <p className='text-lg text-orange-200'>
                                            {blog.title.length > 80 ? `${blog.title.substr(0, 70)}...` : blog.title}
                                        </p>
                                        <p className='mt-3 md:mt-1 '>{blog.summary.substr(0, 90)}...</p>
                                        <Link to={`/blogs/${blog.id}`} className='w-32'>
                                            <div
                                                className=' text-black text-center bg-cyan-500 hover:bg-cyan-400 rounded 
                                                hover:cursor-pointer w-32 mt-5 py-1'
                                            >
                                                Read more...
                                            </div>
                                        </Link>
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
