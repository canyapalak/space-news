import { useEffect, useState } from "react"

export default function NewsPage() {

    const [allNews, setAllNews] = useState<allNewsItem | undefined>();

    interface allNewsItem {
        count: number,
        next: string | null,
        previous: string | null,
        results: NewsItem[]
    }

    interface NewsItem {
        id: number,
        title: string,
        url: string,
        image_url: string,
        news_site: string,
        summary: string,
        published_at: string
        updated_at: string
        featured: boolean,
        launches: [],
        events: []
    }

    useEffect(() => {
        const getAllNews = async () => {
            try {
                const response = await fetch(
                    "https://api.spaceflightnewsapi.net/v4/articles"
                );
                const result = await response.json();
                setAllNews(result);
            } catch (error) {
                console.error(error);
            }
        };
        getAllNews();
    }, []);

    console.log('allNews :>> ', allNews);

    return (
        <div>
            <div className="px-80 mt-20">
                <p className="font-nasalization text-center text-cyan-400 text-xl">NEWS</p>
                {!allNews ? (
                    <p className="text-center">Loading...</p>
                ) : (
                    <div className="flex flex-col gap-3">
                        <p className="text-lg">{allNews?.count} news found.</p>
                        {allNews?.results?.map((news) =>
                            <div className="flex flex-row gap-5 bg-gradient-to-br from-stone-950 to-stone-700 
                                border-solid border-2 border-stone-600 rounded-xl p-3 shadow-md">
                                <div className="w-46 h-36">
                                    <img src={news.image_url} alt="News Photo"
                                        className="w-full h-full object-cover rounded-lg shadow-md"></img>
                                </div>
                                <p className="text-lg">{news.title}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}