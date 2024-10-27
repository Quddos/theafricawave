'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const countries = [
  { name: 'All', flag: 'https://flagcdn.com/w40/un.png' },
  { name: 'Nigeria', flag: 'https://flagcdn.com/w40/ng.png' },
  { name: 'South Africa', flag: 'https://flagcdn.com/w40/za.png' },
  { name: 'Kenya', flag: 'https://flagcdn.com/w40/ke.png' },
  { name: 'Egypt', flag: 'https://flagcdn.com/w40/eg.png' },
  { name: 'Ghana', flag: 'https://flagcdn.com/w40/gh.png' },
];

const newsItems = [
  { id: 1, title: "Economic Growth in East Africa", country: "Kenya", image: "https://picsum.photos/id/1018/400" },
  { id: 2, title: "Tech Innovation", country: "Nigeria", image: "https://picsum.photos/id/1019/400" },
  { id: 3, title: "New Wildlife Conservation Efforts", country: "South Africa", image: "https://picsum.photos/id/1020/400" },
  { id: 4, title: "Ancient Tomb Discovered in Luxor", country: "Egypt", image: "https://picsum.photos/id/1021/400" },
  { id: 5, title: "Ghana's Renewable Energy Push", country: "Ghana", image: "https://picsum.photos/id/1022/400" },
  { id: 6, title: "Pan-African Trade Agreement Progress", country: "All", image: "https://picsum.photos/id/1023/400" },
  { id: 7, title: "Nairobi's Thriving Art Scene", country: "Kenya", image: "https://picsum.photos/id/1024/400" },
  { id: 8, title: "South African Wine Industry Boom", country: "South Africa", image: "https://picsum.photos/id/1025/400" },
];

interface NewsItem {
  id: number;
  title: string;
  country: string;
  image: string;
}

export default function LatestNews() {
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [hoveredNews, setHoveredNews] = useState<NewsItem | null>(null);

  const filteredNews = selectedCountry === 'All'
    ? newsItems
    : newsItems.filter(item => item.country === selectedCountry);

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-10">
        <h2 className="text-3xl font-bold text-center mb-8">Latest News</h2>
        <div className="flex justify-center space-x-4 mb-8 overflow-x-auto pb-4">
          {countries.map((country) => (
            <motion.button
              key={country.name}
              className={`flex items-center px-4 py-2 rounded-full ${selectedCountry === country.name ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setSelectedCountry(country.name)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image src={country.flag} alt={country.name} width={24} height={16} className="mr-2" />
              <span>{country.name}</span>
            </motion.button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 rounded-full">
          {filteredNews.map((item) => (
            <motion.div
              key={item.id}
              layoutId={`news-${item.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Link href={`/news/${item.id}`}>
                <div
                  className="relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                  onMouseEnter={() => setHoveredNews(item)}
                  onMouseLeave={() => setHoveredNews(null)}
                >
                  <Image src={item.image} alt={item.title} layout="fill" objectFit="cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end p-4">
                    <h3 className="text-white font-bold">{item.title}</h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      {hoveredNews && (
        <motion.div
          className="fixed inset-0 bg-cover bg-center z-[-1] transition-all duration-300"
          style={{ backgroundImage: `url(${hoveredNews.image})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
        />
      )}
    </section>
  );
}
