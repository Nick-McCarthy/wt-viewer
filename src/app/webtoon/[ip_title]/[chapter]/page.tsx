'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import WebtoonChapterView from '@/components/WebtoonChapterView';
import ChapterNav from '@/components/ChapterNav';
import { Chapter, ChaptersList } from '@/types';
import { Button } from '@/components/ui/Button';


export default function ChapterPage({ params }: { params: { content_type: string, ip_title: string, chapter: string } }) {
    params.content_type = 'webtoon';
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
          router.push('/api/auth/signin');
        }
      }, [status, router]);

    const [chapterContent, setChapterContent] = useState<Chapter[] | null>(null);
    const [chapterList, setChapterList] = useState<ChaptersList[] | null>(null);

    async function getChapter() {
        try {
            const res = await fetch(`/api/${params.content_type}/${params.ip_title}/${params.chapter}`, {
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

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        if (status === 'authenticated') {
            getChapter();
        }
    }, [status, params.content_type, params.ip_title, params.chapter]);

    return (
   
        <section className='flex flex-col w-full h-full justify-center items-center '>
            <ChapterNav HHP={handleHomePress} HNP={handleNextChapterPress} HPP={handlePreviousChapterPress} />
                {chapterContent && <WebtoonChapterView chapterProps={chapterContent} />}
            <ChapterNav HHP={handleHomePress} HNP={handleNextChapterPress} HPP={handlePreviousChapterPress} />
            <Button variant='toTheTop' size='lg' onClick={() => scrollToTop()} >TOP</Button>
        </section>

    );
}