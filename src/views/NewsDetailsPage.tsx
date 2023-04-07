import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Modal from '../components/Modal'
import { Link } from "react-router-dom";
import { TbArrowBackUp } from "react-icons/tb"

export default function NewsDetailsPage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const [newsDetails, setNewsDetails] = useState<NewsDetailsItem | undefined>()
    const [open, setOpen] = useState(false) //modal logic
    const [urlNewsModal, setUrlNewsModal] = useState<string>('')

    interface NewsDetailsItem {
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
        const getNewsDetails = async () => {
            setLoading(true)
            try {
                const response = await fetch(
                    `https://api.spaceflightnewsapi.net/v4/articles/${id}`,
                )
                const result = await response.json()
                setTimeout(() => {
                    setNewsDetails(result)
                }, 600)
            } catch (error) {
                console.error(error)
            }
        }
        getNewsDetails()
    }, [])

    console.log('newsDetails :>> ', newsDetails);

    const handleClick = (newsDetails: NewsDetailsItem) => {
        setOpen(true)
        setUrlNewsModal(newsDetails.url)
    }

    return (
        <main
            className={`${open ? 'blur-sm' : 'blur-0'} flex flex-col justify-center items-center px-5 pb-10`}
        >
            {open ? <Modal open={open} setOpen={setOpen} url={urlNewsModal} /> : null}
            <section className="">
                <p className='font-nasalization text-center text-cyan-400 text-xl'>
                    NEWS
                </p>
                {!newsDetails ? (
                    <div className='mt-5 mx-auto items-center'><Loading /></div>
                ) : (
                    <div>
                        <Link to="/news"><TbArrowBackUp className="cursor-pointer w-6 h-6 inline-block" /></Link>
                        <div className='p-5 w-[20rem] md:w-[32rem] lg:w-[53rem] mt-5 flex flex-col bg-gradient-to-br from-stone-950 to-stone-700 
                    border-solid border-2 border-stone-600 rounded-xlshadow-md items-center rounded-lg gap-3'>
                            <div className="w-[18rem] md:w-[30rem] lg:w-[50rem]">
                                <img src={newsDetails.image_url} alt="News Image"
                                    className="rounded-lg object-cover w-full"
                                />
                            </div>
                            <div className='w-full flex flex-col mx-auto md:flex-grow md:text-left ml-0 gap-2'>
                                <div className="flex flex-row">
                                    <p>{new Date(newsDetails.published_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit'
                                    })}</p>
                                    <p className="ml-auto mr-2">Source: </p>
                                    <button className="bg-cyan-500 hover:bg-cyan-400 rounded-md px-1 text-black"
                                        onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                                            handleClick(newsDetails)
                                        }>
                                        {newsDetails.news_site}</button>
                                </div>
                                <div>
                                    <p className='text-lg text-orange-200'>{newsDetails.title}</p>
                                    <p className='mt-3 md:mt-1 '>{newsDetails.summary}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </main>
    )

}