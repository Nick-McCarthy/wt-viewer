'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { IpDetails, ChapterList } from '@/types';
import IpDetailsCard from '@/components/IpDetailsCard';
import ChapterListCard from '@/components/ChapterListCard';

export default function IpInformationPage({ params }: { params: { content_type: string, ip_title: string } }) {
  params.content_type = 'manga';
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin');
    }
  }, [status, router]);

  const [ipInformation, setIpInformation] = useState<IpDetails | null>(null);
  const [chapterList, setChapterList] = useState<ChapterList[]>([]);

  async function getIpInformation() {
    try {
      const res = await fetch(`/api/${params.content_type}/${params.ip_title}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const response = await res.json();
      setIpInformation(response.content[0]);
      setChapterList(response.chapterList);
    } catch (error) {
      console.error('Failed to fetch IP information:', error);
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      console.log(params.content_type, params.ip_title);
      getIpInformation();
    }
  }, [status, params.content_type, params.ip_title]);

  return (
    <div>
      <section className='flex justify-center p-10 h-full w-full'>
      {ipInformation && <IpDetailsCard content={ipInformation} />}
      </section>
      {chapterList.length > 0 && <ChapterListCard chapterList={chapterList} params={params} />}
    </div>
  );
}