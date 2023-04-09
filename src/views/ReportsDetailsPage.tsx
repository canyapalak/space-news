import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Modal from '../components/Modal'
import { Link } from "react-router-dom";
import { TbArrowBackUp } from "react-icons/tb"

export default function ReportsDetailsPage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const [reportDetails, setReportDetails] = useState<ReportDetailsItem | undefined>()
    const [open, setOpen] = useState(false) //modal logic
    const [urlNewsModal, setUrlNewsModal] = useState<string>('')
    const navigate = useNavigate();

    interface ReportDetailsItem {
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
        const getReportDetails = async () => {
            setLoading(true)
            try {
                const response = await fetch(
                    `https://api.spaceflightnewsapi.net/v4/reports/${id}`,
                )
                const result = await response.json()
                setTimeout(() => {
                    setReportDetails(result)
                }, 600)
            } catch (error) {
                console.error(error)
            }
        }
        getReportDetails()
    }, [])

    console.log('reportDetails :>> ', reportDetails);

    const handleClick = (reportDetails: ReportDetailsItem) => {
        setOpen(true)
        setUrlNewsModal(reportDetails.url)
    }

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <main
            className={`${open ? 'blur-sm' : 'blur-0'} flex flex-col justify-center items-center px-5 pb-10`}
        >
            {open ? <Modal open={open} setOpen={setOpen} url={urlNewsModal} /> : null}
            <section className="">
                <p className='font-nasalization text-center text-cyan-400 text-xl'>
                    REPORTS
                </p>
                {!reportDetails ? (
                    <div className='mt-5 mx-auto items-center'><Loading /></div>
                ) : (
                    <div>
                        <TbArrowBackUp onClick={handleGoBack} className="cursor-pointer w-6 h-6 inline-block hover:translate-y-0.5" />
                        <div className='p-5 w-[20rem] md:w-[32rem] lg:w-[53rem] mt-5 flex flex-col bg-gradient-to-br from-stone-950 to-stone-700 
                    border-solid border-2 border-stone-600 rounded-xlshadow-md items-center rounded-lg gap-3'>
                            <div className="w-[18rem] md:w-[30rem] lg:w-[50rem]">
                                <img src={reportDetails.image_url} alt="News Image"
                                    className="rounded-lg object-cover w-full"
                                />
                            </div>
                            <div className='w-full flex flex-col mx-auto md:flex-grow md:text-left ml-0 gap-2'>
                                <div className="flex flex-row">
                                    <p>{new Date(reportDetails.published_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit'
                                    })}</p>
                                    <p className="ml-auto mr-2">Source: </p>
                                    <button className="bg-cyan-500 hover:bg-cyan-400 rounded-md px-1 text-black"
                                        onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                                            handleClick(reportDetails)
                                        }>
                                        {reportDetails.news_site}</button>
                                </div>
                                <div>
                                    <p className='text-lg text-orange-200'>{reportDetails.title}</p>
                                    <p className='mt-3 md:mt-1 '>{reportDetails.summary}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </main>
    )

}