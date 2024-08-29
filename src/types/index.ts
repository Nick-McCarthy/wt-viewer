import { Dispatch, SetStateAction } from 'react';


interface CountResult {
  total_count: number;
}

interface CardProps {
  ip_title: string;
  thumbnail_address: string;
}

interface ContentGroup {
  ip_title: string;
  thumbnail_address: string;
  ip_description: string;
  number_of_chapters: number;
  genre: string;
  views: number;
  updated_at: string;
}

interface CardViewProps {
  content: ContentGroup[];
  contentType: string;
}

interface Genre {
  genre: string;
}

interface GenreDropDownProps {
  setSelectedFilter: Dispatch<SetStateAction<string>>;
  genreList: Genre[];
}


interface IpDetails {
  ip_title: string;
  thumbnail_address: string;
  ip_description: string;
  number_of_chapters: number;
  genre: string;
  views: number;
  updated_at: string;
}

interface IpDetailsProps { 
  content: IpDetails;
}

interface ChapterList {
  chapter_number: number;
}

interface ChapterListProps {
  chapterList: ChapterList[];
  params: { content_type: string, ip_title: string };
}

interface ChaptersList {
  chapter_number: number;
}

interface Chapter {
  ip_title: string;
  chapter_number: number;
  image_ordering: number;
  image_path: string;
} 

interface ChapterProps {
  chapterProps: Chapter[];
  currentPage?: number;
}



interface ChapterNavProps {
  HPP: () => void;
  HHP: () => void;
  HNP: () => void;
}


interface RadioDropDownProps {
  handleOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRadioDisplay: () => void;
  radioDisplay: boolean;
  selectedOption: string;

}

interface LimitDropDownProps {
  handleLimitOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleLimitDisplay: () => void;
  limitDisplay: boolean;
  selectedLimitOption: number;

}

export type {
  LimitDropDownProps,
  CountResult,
  ContentGroup,
  CardViewProps,
  CardProps,
  RadioDropDownProps,
  IpDetails,
  IpDetailsProps,
  ChapterList,
  ChapterListProps,
  Chapter,
  ChapterProps,
  ChapterNavProps,
  ChaptersList,
  Genre,
  GenreDropDownProps,
}

