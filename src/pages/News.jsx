import React, { useState, useRef } from 'react';
import { ChevronDown, Search, ChevronRight, ChevronLeft, Plus, Filter, X, Eye, Edit2, Trash2 } from 'lucide-react';

export default function NewsPage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedGovernorates, setSelectedGovernorates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredNews, setFeaturedNews] = useState([
    {
      id: 1,
      title: 'Important Breaking News Today',
      content: 'This is the featured news content displayed here in detail',
      image: 'https://via.placeholder.com/800x400?text=Featured+News',
      governorate: 'Baghdad',
      views: 1250,
    }
  ]);
  const [regularNews, setRegularNews] = useState([
    {
      id: 1,
      title: 'First Regular News Story',
      content: 'This is the first regular news content',
      image: 'https://via.placeholder.com/400x300?text=News+1',
      governorate: 'Baghdad',
      views: 450,
      date: '2025-10-15'
    },
    {
      id: 2,
      title: 'Second Regular News Story',
      content: 'This is the second regular news content',
      image: 'https://via.placeholder.com/400x300?text=News+2',
      governorate: 'Basra',
      views: 320,
      date: '2025-10-15'
    }
  ]);
  const [events, setEvents] = useState([
    {
      id: 1,
      name: 'Important Event',
      startDate: '2025-11-01',
      endDate: '2025-11-05',
      location: 'Baghdad'
    }
  ]);
  const [expandedNews, setExpandedNews] = useState({});
  const [showNewsFeaturedForm, setShowNewsFeaturedForm] = useState(false);
  const [showNewsRegularForm, setShowNewsRegularForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingFeaturedId, setEditingFeaturedId] = useState(null);
  const [editingRegularId, setEditingRegularId] = useState(null);
  const [editingEventId, setEditingEventId] = useState(null);
  const [newFeaturedNews, setNewFeaturedNews] = useState({
    title: '',
    content: '',
    governorate: 'Baghdad',
    image: ''
  });
  const [newRegularNews, setNewRegularNews] = useState({
    title: '',
    content: '',
    governorate: 'Baghdad',
    image: ''
  });
  const [newEvent, setNewEvent] = useState({
    name: '',
    startDate: '',
    endDate: '',
    location: ''
  });
  const featuredScrollRef = useRef(null);
  const eventsRef = useRef(null);

  const governorates = [
    'Baghdad', 'Al Anbar', 'Basra', 'Babil', 'Dhi Qar', 'Diyala', 'Karbala',
    'Kirkuk', 'Maysan', 'Najaf', 'Nineveh', 'Saladin', 'Wasit', 'Sulaymaniyah',
    'Erbil', 'Dohuk', 'Halabja', 'Qadisiyah'
  ];

  const toggleGovernorate = (gov) => {
    setSelectedGovernorates(prev =>
      prev.includes(gov) ? prev.filter(g => g !== gov) : [...prev, gov]
    );
  };

  const scrollFeatured = (direction) => {
    const container = featuredScrollRef.current;
    if (container) {
      container.scrollBy({ left: direction === 'left' ? -400 : 400, behavior: 'smooth' });
    }
  };

  const scrollToEvents = () => {
    eventsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addFeaturedNews = () => {
    if (newFeaturedNews.title && newFeaturedNews.content) {
      setFeaturedNews([...featuredNews, {
        ...newFeaturedNews,
        id: Date.now(),
        views: 0
      }]);
      setNewFeaturedNews({ title: '', content: '', governorate: 'Baghdad', image: '' });
      setShowNewsFeaturedForm(false);
    }
  };

  const addRegularNews = () => {
    if (newRegularNews.title && newRegularNews.content) {
      setRegularNews([...regularNews, {
        ...newRegularNews,
        id: Date.now(),
        views: 0,
        date: new Date().toISOString().split('T')[0]
      }]);
      setNewRegularNews({ title: '', content: '', governorate: 'Baghdad', image: '' });
      setShowNewsRegularForm(false);
    }
  };

  const addEvent = () => {
    if (newEvent.name && newEvent.startDate && newEvent.endDate && newEvent.location) {
      setEvents([...events, { ...newEvent, id: Date.now() }]);
      setNewEvent({ name: '', startDate: '', endDate: '', location: '' });
      setShowEventForm(false);
    }
  };

  const deleteFeaturedNews = (id) => {
    setFeaturedNews(featuredNews.filter(news => news.id !== id));
  };

  const deleteRegularNews = (id) => {
    setRegularNews(regularNews.filter(news => news.id !== id));
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const startEditFeatured = (id) => {
    const news = featuredNews.find(n => n.id === id);
    setNewFeaturedNews(news);
    setEditingFeaturedId(id);
    setShowNewsFeaturedForm(true);
  };

  const startEditRegular = (id) => {
    const news = regularNews.find(n => n.id === id);
    setNewRegularNews(news);
    setEditingRegularId(id);
    setShowNewsRegularForm(true);
  };

  const startEditEvent = (id) => {
    const event = events.find(e => e.id === id);
    setNewEvent(event);
    setEditingEventId(id);
    setShowEventForm(true);
  };

  const saveEditFeatured = () => {
    setFeaturedNews(featuredNews.map(n => n.id === editingFeaturedId ? { ...newFeaturedNews, id: editingFeaturedId } : n));
    setEditingFeaturedId(null);
    setNewFeaturedNews({ title: '', content: '', governorate: 'Baghdad', image: '' });
    setShowNewsFeaturedForm(false);
  };

  const saveEditRegular = () => {
    setRegularNews(regularNews.map(n => n.id === editingRegularId ? { ...newRegularNews, id: editingRegularId, date: regularNews.find(rn => rn.id === editingRegularId).date } : n));
    setEditingRegularId(null);
    setNewRegularNews({ title: '', content: '', governorate: 'Baghdad', image: '' });
    setShowNewsRegularForm(false);
  };

  const saveEditEvent = () => {
    setEvents(events.map(e => e.id === editingEventId ? { ...newEvent, id: editingEventId } : e));
    setEditingEventId(null);
    setNewEvent({ name: '', startDate: '', endDate: '', location: '' });
    setShowEventForm(false);
  };

  const filteredFeaturedNews = featuredNews.filter(news =>
    (selectedGovernorates.length === 0 || selectedGovernorates.includes(news.governorate)) &&
    news.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRegularNews = regularNews.filter(news =>
    (selectedGovernorates.length === 0 || selectedGovernorates.includes(news.governorate)) &&
    news.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen" style={{ backgroundImage: 'url(/assets/images/backround.jpg)', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
      {/* Header Navigation */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-orange-500 rounded flex items-center justify-center text-white font-bold" style={{ fontFamily: 'Audiowide, sans-serif' }}>
                N
              </div>
              <span style={{ fontFamily: 'Audiowide, sans-serif' }} className="text-3xl font-bold text-black">
                NEWS
              </span>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center gap-8">
              {/* News Link */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-2 text-black hover:text-orange-500 transition"
                style={{ fontFamily: 'Economica, sans-serif' }}
              >
                <span className="text-sm">News</span>
                <ChevronDown size={16} />
              </button>

              {/* Events Link */}
              <button
                onClick={scrollToEvents}
                className="flex items-center gap-2 text-black hover:text-orange-500 transition"
                style={{ fontFamily: 'Economica, sans-serif' }}
              >
                <span className="text-sm">Events</span>
                <ChevronDown size={16} />
              </button>
            </div>

            {/* Filter Button */}
            <div className="flex-1 flex items-center gap-4 justify-end">
              <div className="relative">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="p-2 hover:bg-gray-100 rounded transition"
                  title="Filter by Governorate"
                >
                  <Filter size={20} className="text-black" />
                </button>

                {/* Filter Dropdown */}
                {filterOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-white border border-gray-300 rounded p-3 z-50 w-64 max-h-64 overflow-y-auto shadow-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-black" style={{ fontFamily: 'Economica, sans-serif' }}>Governorates</span>
                      <button onClick={() => setFilterOpen(false)}>
                        <X size={16} />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {governorates.map(gov => (
                        <label key={gov} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedGovernorates.includes(gov)}
                            onChange={() => toggleGovernorate(gov)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-black">{gov}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded text-sm w-48 text-black placeholder-gray-400"
                />
                <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Featured News Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-black" style={{ fontFamily: 'Economica, sans-serif' }}>Featured News</h2>
            <button
              onClick={() => {
                setShowNewsFeaturedForm(!showNewsFeaturedForm);
                setEditingFeaturedId(null);
                setNewFeaturedNews({ title: '', content: '', governorate: 'Baghdad', image: '' });
              }}
              className="flex items-center gap-2 px-4 py-2 rounded transition text-white"
              style={{ backgroundColor: '#fe6303', clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)', fontFamily: 'Economica, sans-serif' }}
            >
              <Plus size={18} />
              Add
            </button>
          </div>

          {showNewsFeaturedForm && (
            <div className="bg-gray-50 p-6 rounded mb-6 border border-gray-200">
              <input
                type="text"
                placeholder="Title"
                value={newFeaturedNews.title}
                onChange={(e) => setNewFeaturedNews({ ...newFeaturedNews, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded mb-4 text-black"
              />
              <textarea
                placeholder="Content"
                value={newFeaturedNews.content}
                onChange={(e) => setNewFeaturedNews({ ...newFeaturedNews, content: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded mb-4 text-black"
                rows="3"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newFeaturedNews.image}
                onChange={(e) => setNewFeaturedNews({ ...newFeaturedNews, image: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded mb-4 text-black"
              />
              <select
                value={newFeaturedNews.governorate}
                onChange={(e) => setNewFeaturedNews({ ...newFeaturedNews, governorate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded mb-4 text-black"
              >
                {governorates.map(gov => (
                  <option key={gov} value={gov}>{gov}</option>
                ))}
              </select>
              <div className="flex gap-2">
                <button
                  onClick={editingFeaturedId ? saveEditFeatured : addFeaturedNews}
                  className="px-6 py-2 rounded text-white transition"
                  style={{ backgroundColor: '#fe6303', clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)', fontFamily: 'Economica, sans-serif' }}
                >
                  {editingFeaturedId ? 'Update' : 'Save'}
                </button>
                <button
                  onClick={() => {
                    setShowNewsFeaturedForm(false);
                    setEditingFeaturedId(null);
                    setNewFeaturedNews({ title: '', content: '', governorate: 'Baghdad', image: '' });
                  }}
                  className="px-6 py-2 border border-gray-300 rounded text-black"
                  style={{ fontFamily: 'Economica, sans-serif' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Featured News Carousel */}
          <div className="relative">
            <div
              ref={featuredScrollRef}
              className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
              style={{ scrollBehavior: 'smooth' }}
            >
              {filteredFeaturedNews.map(news => (
                <div
                  key={news.id}
                  className="flex-shrink-0 bg-white border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition"
                  style={{ width: 'calc(50% - 12px)' }}
                >
                  <img src={news.image} alt={news.title} className="w-full h-32 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-black mb-2 line-clamp-2" style={{ fontFamily: 'Economica, sans-serif' }}>{news.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{news.content}</p>
                    {expandedNews[news.id] && (
                      <p className="text-gray-600 text-sm mb-3">{news.content}</p>
                    )}
                    <button
                      onClick={() => setExpandedNews({ ...expandedNews, [news.id]: !expandedNews[news.id] })}
                      className="text-orange-500 text-sm font-semibold mb-3 hover:text-orange-600"
                      style={{ fontFamily: 'Economica, sans-serif' }}
                    >
                      {expandedNews[news.id] ? 'Less' : 'More'}
                    </button>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{news.governorate}</span>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Eye size={14} />
                          <span>{news.views}</span>
                        </div>
                        <button onClick={() => startEditFeatured(news.id)} className="hover:text-orange-500 transition">
                          <Edit2 size={14} />
                        </button>
                        <button onClick={() => deleteFeaturedNews(news.id)} className="hover:text-red-500 transition">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Buttons */}
            <button
              onClick={() => scrollFeatured('right')}
              className="absolute -left-6 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition z-10"
            >
              <ChevronLeft size={24} className="text-black" />
            </button>
            <button
              onClick={() => scrollFeatured('left')}
              className="absolute -right-6 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition z-10"
            >
              <ChevronRight size={24} className="text-black" />
            </button>
          </div>
        </div>

        {/* Regular News Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-black" style={{ fontFamily: 'Economica, sans-serif' }}>News</h2>
            <button
              onClick={() => {
                setShowNewsRegularForm(!showNewsRegularForm);
                setEditingRegularId(null);
                setNewRegularNews({ title: '', content: '', governorate: 'Baghdad', image: '' });
              }}
              className="flex items-center gap-2 px-4 py-2 rounded transition text-white"
              style={{ backgroundColor: '#fe6303', clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)', fontFamily: 'Economica, sans-serif' }}
            >
              <Plus size={18} />
              Add
            </button>
          </div>

          {showNewsRegularForm && (
            <div className="bg-gray-50 p-6 rounded mb-6 border border-gray-200">
              <input
                type="text"
                placeholder="Title"
                value={newRegularNews.title}
                onChange={(e) => setNewRegularNews({ ...newRegularNews, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded mb-4 text-black"
              />
              <textarea
                placeholder="Content"
                value={newRegularNews.content}
                onChange={(e) => setNewRegularNews({ ...newRegularNews, content: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded mb-4 text-black"
                rows="3"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newRegularNews.image}
                onChange={(e) => setNewRegularNews({ ...newRegularNews, image: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded mb-4 text-black"
              />
              <select
                value={newRegularNews.governorate}
                onChange={(e) => setNewRegularNews({ ...newRegularNews, governorate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded mb-4 text-black"
              >
                {governorates.map(gov => (
                  <option key={gov} value={gov}>{gov}</option>
                ))}
              </select>
              <div className="flex gap-2">
                <button
                  onClick={editingRegularId ? saveEditRegular : addRegularNews}
                  className="px-6 py-2 rounded text-white transition"
                  style={{ backgroundColor: '#fe6303', clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)', fontFamily: 'Economica, sans-serif' }}
                >
                  {editingRegularId ? 'Update' : 'Save'}
                </button>
                <button
                  onClick={() => {
                    setShowNewsRegularForm(false);
                    setEditingRegularId(null);
                    setNewRegularNews({ title: '', content: '', governorate: 'Baghdad', image: '' });
                  }}
                  className="px-6 py-2 border border-gray-300 rounded text-black"
                  style={{ fontFamily: 'Economica, sans-serif' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* News Grid */}
          <div className="grid grid-cols-3 gap-6">
            {filteredRegularNews.map(news => (
              <div
                key={news.id}
                className="bg-white border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                <img src={news.image} alt={news.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-black mb-2 line-clamp-2" style={{ fontFamily: 'Economica, sans-serif' }}>{news.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{news.content}</p>
                  {expandedNews[news.id] && (
                    <p className="text-gray-600 text-sm mb-3">{news.content}</p>
                  )}
                  <button
                    onClick={() => setExpandedNews({ ...expandedNews, [news.id]: !expandedNews[news.id] })}
                    className="text-orange-500 text-sm font-semibold mb-3 hover:text-orange-600"
                    style={{ fontFamily: 'Economica, sans-serif' }}
                  >
                    {expandedNews[news.id] ? 'Less' : 'More'}
                  </button>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>{news.governorate}</span>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Eye size={14} />
                        <span>{news.views}</span>
                      </div>
                      <button onClick={() => startEditRegular(news.id)} className="hover:text-orange-500 transition">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => deleteRegularNews(news.id)} className="hover:text-red-500 transition">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">{news.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Events Section */}
        <div className="mt-32" ref={eventsRef}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-black" style={{ fontFamily: 'Economica, sans-serif' }}>Latest Events</h2>
            <button
              onClick={() => {
                setShowEventForm(!showEventForm);
                setEditingEventId(null);
                setNewEvent({ name: '', startDate: '', endDate: '', location: '' });
              }}
              className="flex items-center gap-2 px-4 py-2 rounded transition text-white"
              style={{ backgroundColor: '#fe6303', clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)', fontFamily: 'Economica, sans-serif' }}
            >
              <Plus size={18} />
              Add
            </button>
          </div>

          {showEventForm && (
            <div className="bg-gray-50 p-6 rounded mb-6 border border-gray-200">
              <input
                type="text"
                placeholder="Event Name"
                value={newEvent.name}
                onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded mb-4 text-black"
              />
              <input
                type="date"
                value={newEvent.startDate}
                onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded mb-4 text-black"
              />
              <input
                type="date"
                value={newEvent.endDate}
                onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded mb-4 text-black"
              />
              <input
                type="text"
                placeholder="Location"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded mb-4 text-black"
              />
              <div className="flex gap-2">
                <button
                  onClick={editingEventId ? saveEditEvent : addEvent}
                  className="px-6 py-2 rounded text-white transition"
                  style={{ backgroundColor: '#fe6303', clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)', fontFamily: 'Economica, sans-serif' }}
                >
                  {editingEventId ? 'Update' : 'Save'}
                </button>
                <button
                  onClick={() => {
                    setShowEventForm(false);
                    setEditingEventId(null);
                    setNewEvent({ name: '', startDate: '', endDate: '', location: '' });
                  }}
                  className="px-6 py-2 border border-gray-300 rounded text-black"
                  style={{ fontFamily: 'Economica, sans-serif' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Events Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-3 px-4 text-black font-bold" style={{ fontFamily: 'Economica, sans-serif' }}>Event Name</th>
                  <th className="text-left py-3 px-4 text-black font-bold" style={{ fontFamily: 'Economica, sans-serif' }}>Start Date</th>
                  <th className="text-left py-3 px-4 text-black font-bold" style={{ fontFamily: 'Economica, sans-serif' }}>End Date</th>
                  <th className="text-left py-3 px-4 text-black font-bold" style={{ fontFamily: 'Economica, sans-serif' }}>Location</th>
                </tr>
              </thead>
              <tbody>
                {events.map(event => (
                  <tr key={event.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 text-black">{event.name}</td>
                    <td className="py-3 px-4 text-black">{event.startDate}</td>
                    <td className="py-3 px-4 text-black">{event.endDate}</td>
                    <td className="py-3 px-4 text-black">
                      <div className="flex items-center justify-between">
                        <span>{event.location}</span>
                        <div className="flex items-center gap-2">
                          <button onClick={() => startEditEvent(event.id)} className="hover:text-orange-500 transition">
                            <Edit2 size={14} />
                          </button>
                          <button onClick={() => deleteEvent(event.id)} className="hover:text-red-500 transition">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Import Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Audiowide&family=Economica:wght@400;700&display=swap');
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}