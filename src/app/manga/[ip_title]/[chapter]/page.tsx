'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import MangaChapterView from '@/components/MangaChapterView';
import ChapterNav from '@/components/ChapterNav';
import ChevronLeftIcon from '@/components/ui/icons/ChevronLeftIcon';
import ChevronRightIcon from '@/components/ui/icons/ChevronRightIcon';
import { Chapter, ChaptersList } from '@/types';
import { Button } from '@/components/ui/Button';


export default function ChapterPage({ params }: { params: { content_type: string, ip_title: string, chapter: string } }) {
    params.content_type = 'manga';
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
          router.push('/api/auth/signin');
        }
      }, [status, router]);

    const [chapterContent, setChapterContent] = useState<Chapter[] | null>(null);
    const [chapterList, setChapterList] = useState<ChaptersList[] | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    async function getChapter() {
        try {
            const apiString = `/api/${params.content_type}/${params.ip_title}/${params.chapter}`
            console.log('API string:', apiString);
            const res = await fetch( apiString, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const response = await res.json();
 
            setChapterContent(response.chapterContent);
            setChapterList(response.chapterList);
        } catch (error) {
            console.error('Failed to fetch IP information:', error);
        }
    }

    function handleNextChapterPress() {
        if (chapterList === null) {
            return;
        }
        const currentChapter = Number(params.chapter);
        const lastChapter = chapterList.length;
        if (currentChapter == lastChapter) {
            router.push(`/${params.content_type}/${params.ip_title}`);
        } else {
            router.push(`/${params.content_type}/${params.ip_title}/${currentChapter + 1}`);
        }
    }

    function handleHomePress() {
       router.push(`/${params.content_type}/${params.ip_title}`);
    }

    function handlePreviousChapterPress() {
        if (chapterList === null) {
            return;
        }
        const currentChapter = Number(params.chapter);
        if (currentChapter == 1) {
            router.push(`/${params.content_type}/${params.ip_title}`);
        } else {
            router.push(`/${params.content_type}/${params.ip_title}/${currentChapter - 1}`);
        }
    }

    function handleBackPress() {
        if (chapterContent === null) {
            return;
        }
        const firstPage = 1
        if (currentPage == firstPage) {
        } else {
        setCurrentPage(prevPage => prevPage - 1);
        }
    }

    function handleForwardPress() {
        if (chapterContent === null) {
            return;
        }
        const lastPage = chapterContent.length
        if (currentPage == lastPage) {
        } else {
        setCurrentPage(prevPage => prevPage + 1);
        }
    }


    useEffect(() => {
        if (status === 'authenticated') {
            getChapter();
            console.log('Chapter content:', chapterContent);
        }

    }, [status, params.content_type, params.ip_title, params.chapter]);

    return (
   
        <section className='flex flex-col w-full h-full justify-center items-center '>
            <ChapterNav HHP={handleHomePress} HNP={handleNextChapterPress} HPP={handlePreviousChapterPress} />
            <div className='flex flex-row w-full justify-center items-center'>
                <Button variant='chapterNav' size='lg' onClick={() => handleBackPress()} ><ChevronLeftIcon /></Button>
                    {chapterContent && <MangaChapterView chapterProps={chapterContent} currentPage={currentPage}/>}
                <Button variant='chapterNav' size='lg' onClick={() => handleForwardPress()} ><ChevronRightIcon /></Button>
            </div>    
            <ChapterNav HHP={handleHomePress} HNP={handleNextChapterPress} HPP={handlePreviousChapterPress} />
        </section>

    );
}