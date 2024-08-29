'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react"
import PaginationNav from '@/components/PaginationNav';
import RadioDropDown from '@/components/RadioDropDown';
import SelectLimitDropDown from '@/components/SelectLimitDropDown';
import GenreDropDown from '@/components/GenreDropDown';
import Card from '@/components/Card';
import { Genre, ContentGroup } from '@/types';

export default function ContentTypePage({ params }: { params: { content_type: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin');
    }
  }, [status, router]);
 
  const [contentGroup, setContentGroup] = useState<ContentGroup[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState('a-z');
  const[radioDisplay, setRadioDisplay] = useState(false);
  const [selectedLimitOption, setSelectedLimitOption] = useState(12);
  const [limitDisplay, setLimitDisplay] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [genreList, setGenreList] = useState<Genre[]>([]);

  async function getContentType() {
    try {
      let res
      const reqData = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
        if (selectedOption === 'a-z') {
          res = await fetch(`/api/${params.content_type}?page=${page}&limit=${selectedLimitOption}`, reqData);
        } else {  
          res = await fetch(`/api/${params.content_type}?page=${page}&sort=${selectedOption}&limit=${selectedLimitOption}`, reqData);
        }
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const response = await res.json();
      setContentGroup(response.content);
      setTotalPages(response.totalCount);
      setGenreList(response.genreList);

    } catch (error) {
      console.error("Failed to fetch [content_type]: ", error);
    }
  }

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleLimitOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLimitOption(parseInt(event.target.value));
  };

  const handleLimitDisplay = () => {
    if(limitDisplay === false){ 
      setLimitDisplay(true) 
    }
    else{ 
      setLimitDisplay(false) 
    }
  }

  const handleRadioDisplay = () => {
    if(radioDisplay === false){ 
      setRadioDisplay(true) 
    }
    else{ 
      setRadioDisplay(false) 
    }
  }

  useEffect(() => {
    getContentType();
  }, [status, page, selectedOption, selectedLimitOption]);


  return (
    <div className='w-auto'>
      <GenreDropDown setSelectedFilter={setSelectedFilter} genreList={genreList}/>
      <section className='flex justify-center object-center py-10'>
        <SelectLimitDropDown handleLimitOptionChange={handleLimitOptionChange} handleLimitDisplay={handleLimitDisplay} selectedLimitOption={selectedLimitOption} limitDisplay={limitDisplay}/>  
        <RadioDropDown handleOptionChange={handleOptionChange} handleRadioDisplay={handleRadioDisplay} selectedOption={selectedOption} radioDisplay={radioDisplay}/>
      </section>
      <section className="w-auto py-12 flex justify-center ">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 px-4 md:px-6">
          {contentGroup.map((item, index) => (
            <Card key={index} ip={item} contentType={params.content_type}/>
          ))}
        </div>
      </section> 
      <PaginationNav totalPages={totalPages} currentPage={page} onPageChange={setPage} /> 
    </div>
  )
}