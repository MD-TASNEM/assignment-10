import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { challengesAPI, tipsAPI, eventsAPI, statsAPI } from '../api/api';
import Service from '../Components/Service';
import Marquee from 'react-fast-marquee';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import toast from 'react-hot-toast';
import {
  fallbackEvents,
  fallbackStats,
  fallbackTips,
  getMergedChallenges,
} from '../data/mockEcoContent';
import {
  getChallengeId,
  isLocalChallenge,
  normalizeChallenges,
} from '../utils/challengeIdentity';

// Images
import bannerOne from '../assets/Json-mages/bannerOne.png';
import bannerTwo from '../assets/Json-mages/banner2.png';
import bannerThree from '../assets/Json-mages/banner3.png';
import bannerFour from '../assets/Json-mages/banner4.png';
import bannerFive from '../assets/Json-mages/banner5.jpg';
import reviewBg from '../assets/Json-mages/review.png';
import user1 from '../assets/Json-mages/user1.jpg';
import user2 from '../assets/Json-mages/user2.jpg';
import user3 from '../assets/Json-mages/user3.webp';

// Skeleton Loader Component
const SkeletonCard = () => (
  <div className="bg-white rounded-3xl overflow-hidden shadow-md animate-pulse">
    <div className="h-52 bg-gray-200"></div>
    <div className="p-6">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
      <div className="flex gap-3">
        <div className="flex-1 h-10 bg-gray-200 rounded-xl"></div>
        <div className="flex-1 h-10 bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  </div>
);

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const savedTipIdsKey = 'ecotrack.savedTips';
  const [savedTipIds, setSavedTipIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(savedTipIdsKey) || '[]');
    } catch {
      return [];
    }
  });
  const [challenges, setChallenges] = useState(() => getMergedChallenges().slice(0, 6));
  const [tips, setTips] = useState(fallbackTips);
  const [events, setEvents] = useState(fallbackEvents);
  const [stats, setStats] = useState(fallbackStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-out-cubic', once: false, mirror: true });
    const requestState = { cancelled: false };
    fetchHomeData(requestState);

    return () => {
      requestState.cancelled = true;
    };
  }, []);

  const fetchHomeData = async (requestState) => {
    setLoading(true);
    try {
      const [challengesRes, tipsRes, eventsRes, statsRes] = await Promise.allSettled([
        challengesAPI.getAll({ limit: 6 }),
        tipsAPI.getRecent(),
        eventsAPI.getUpcoming(),
        statsAPI.getCommunity(),
      ]);

      if (requestState.cancelled) {
        return;
      }

      let hasFailure = false;
      let liveSuccessCount = 0;
      const customChallenges = getMergedChallenges().filter(isLocalChallenge);

      if (
        challengesRes.status === 'fulfilled' &&
        Array.isArray(challengesRes.value?.data) &&
        challengesRes.value.data.length > 0
      ) {
        setChallenges([
          ...customChallenges,
          ...normalizeChallenges(challengesRes.value.data),
        ].slice(0, 6));
        liveSuccessCount += 1;
      } else {
        setChallenges(getMergedChallenges().slice(0, 6));
        hasFailure = true;
      }

      if (
        tipsRes.status === 'fulfilled' &&
        Array.isArray(tipsRes.value?.data) &&
        tipsRes.value.data.length > 0
      ) {
        setTips(tipsRes.value.data.slice(0, 4));
        liveSuccessCount += 1;
      } else {
        setTips(fallbackTips);
        hasFailure = true;
      }

      if (
        eventsRes.status === 'fulfilled' &&
        Array.isArray(eventsRes.value?.data) &&
        eventsRes.value.data.length > 0
      ) {
        setEvents(eventsRes.value.data.slice(0, 4));
        liveSuccessCount += 1;
      } else {
        setEvents(fallbackEvents);
        hasFailure = true;
      }

      if (statsRes.status === 'fulfilled' && statsRes.value?.data) {
        setStats({ ...fallbackStats, ...statsRes.value.data });
        liveSuccessCount += 1;
      } else {
        setStats(fallbackStats);
        hasFailure = true;
      }

      if (hasFailure && liveSuccessCount === 0) {
        console.warn('Live home data is unavailable. Falling back to local sample content.');
      }
    } catch (error) {
      console.error('Error fetching home data:', error);
      toast.error('Failed to load data. Please refresh the page.', {
        id: 'home-data-error',
      });
    } finally {
      if (!requestState.cancelled) {
        setLoading(false);
      }
    }
  };

  const handleSaveTip = (tip) => {
    if (savedTipIds.includes(tip._id)) {
      toast('Tip already saved.', { id: `tip-saved-${tip._id}` });
      return;
    }

    const nextSavedTipIds = [...savedTipIds, tip._id];
    setSavedTipIds(nextSavedTipIds);
    localStorage.setItem(savedTipIdsKey, JSON.stringify(nextSavedTipIds));
    toast.success(`${tip.title} saved for later.`);
  };

  const handleJoinChallenge = () => navigate('/challenges');
  const handleExploreImpact = () => navigate('/my-activities');
  const handleRegisterNow = () => navigate('/register');
  const handleJoinCommunity = () => navigate('/community');
  const handleExploreChallenges = () => navigate('/challenges');

  const banners = [
    { img: bannerOne, title: 'Urban Gardening', desc: 'Grow your own food', color: 'bg-emerald-600' },
    { img: bannerTwo, title: 'Zero Waste Living', desc: 'Reduce plastic usage', color: 'bg-teal-600' },
    { img: bannerThree, title: 'Tree Plantation', desc: 'Restore forests', color: 'bg-green-600' },
    { img: bannerFour, title: 'Clean Energy', desc: 'Switch to renewables', color: 'bg-cyan-600' },
    { img: bannerFive, title: 'Water Conservation', desc: 'Save every drop', color: 'bg-blue-600' },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <>
      {/* Hero Marquee */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="py-3" data-aos="fade-down">
            <Marquee gradient={false} speed={50}>
              <span className="text-sm md:text-base font-medium text-white">
                🌍 Join {stats?.totalParticipants?.toLocaleString() || '12,000+'}+ changemakers making a difference! Track your Impact, transform our planet 🌱
              </span>
            </Marquee>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <span className="inline-block bg-emerald-400/20 text-emerald-300 px-4 py-1 rounded-full text-sm mb-6">
                🌍 {stats?.totalParticipants?.toLocaleString() || '12k+'}+ changemakers
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                Track your <span className="text-emerald-400">Impact</span>,
                <br />
                transform our planet
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-lg">
                Turn everyday actions into measurable climate wins. Join our community of eco-conscious heroes making real change.
              </p>
              <div className="flex gap-4 flex-wrap">
                <button
                  type="button"
                  onClick={handleExploreChallenges}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Start Journey
                </button>
                <button
                  type="button"
                  onClick={handleExploreImpact}
                  className="border-2 border-white hover:bg-white/10 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
                >
                  Explore Impact
                </button>
              </div>
            </div>
            <div data-aos="fade-left" className="relative">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-500">
                <img src={bannerOne} alt="Eco Challenge" className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-800">🌿 Weekend Rewilding</h3>
                  <p className="text-sm text-gray-600 mt-1">350+ joined this month</p>
                  <button
                    type="button"
                    onClick={handleJoinChallenge}
                    className="mt-4 w-full bg-emerald-600 text-white py-2 rounded-full font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    Join Challenge
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Community Impact</h2>
            <p className="text-gray-600 text-lg">Together we're making a difference</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow" data-aos="fade-up" data-aos-delay={0}>
              <div className="text-4xl mb-3">🌳</div>
              <h3 className="text-3xl font-bold text-emerald-600 mb-2">
                {stats?.treesPlanted?.toLocaleString() || '48K'}
              </h3>
              <p className="text-gray-600 font-medium">Trees Planted</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow" data-aos="fade-up" data-aos-delay={100}>
              <div className="text-4xl mb-3">🌍</div>
              <h3 className="text-3xl font-bold text-emerald-600 mb-2">
                {stats?.totalCO2Saved?.toLocaleString() || '152T'} kg
              </h3>
              <p className="text-gray-600 font-medium">CO₂ Saved</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow" data-aos="fade-up" data-aos-delay={200}>
              <div className="text-4xl mb-3">💧</div>
              <h3 className="text-3xl font-bold text-emerald-600 mb-2">
                {stats?.totalWaterSaved?.toLocaleString() || '2.8M'} L
              </h3>
              <p className="text-gray-600 font-medium">Water Saved</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow" data-aos="fade-up" data-aos-delay={300}>
              <div className="text-4xl mb-3">👥</div>
              <h3 className="text-3xl font-bold text-emerald-600 mb-2">
                {stats?.totalParticipants?.toLocaleString() || '14K'}
              </h3>
              <p className="text-gray-600 font-medium">Active Users</p>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Banner */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Sustainability Challenges</h2>
            <p className="text-gray-600 text-lg">Choose your path to make a difference</p>
          </div>
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation
            loop
            className="rounded-3xl shadow-xl overflow-hidden"
          >
            {banners.map((slide, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative h-[500px]">
                  <img src={slide.img} alt={slide.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center w-full px-4">
                    <span className={`${slide.color} text-white px-8 py-3 rounded-full text-2xl font-bold shadow-lg inline-block mb-3`}>
                      {slide.title}
                    </span>
                    <p className="text-white text-lg">{slide.desc}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Active Challenges */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Active Challenges</h2>
            <p className="text-gray-600 text-lg">Join these eco-challenges and start making an impact today</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <>
                <SkeletonCard /><SkeletonCard /><SkeletonCard />
              </>
            ) : (
              challenges.slice(0, 6).map((challenge, idx) => (
                <div
                  key={getChallengeId(challenge) || `${challenge.title}-${idx}`}
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  <Service data={challenge} />
                </div>
              ))
            )}
          </div>
          <div className="text-center mt-12">
            <button
              type="button"
              onClick={handleExploreChallenges}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Explore All Challenges
            </button>
          </div>
        </div>
      </section>

      {/* Recent Tips */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">💡 Eco Wisdom from the Tribe</h2>
            <p className="text-gray-600 text-lg">Practical tips shared by our community</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              [1,2,3,4].map(i => <SkeletonCard key={i} />)
            ) : (
              tips.slice(0, 4).map((tip, idx) => (
                <div key={tip._id} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300" data-aos="fade-up" data-aos-delay={idx * 100}>
                  <div className="text-3xl mb-3">💡</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">{tip.content}</p>
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>⭐ {tip.upvotes} upvotes • {tip.authorName}</span>
                    <button
                      type="button"
                      onClick={() => handleSaveTip(tip)}
                      className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      {savedTipIds.includes(tip._id) ? 'Saved' : 'Save Tip'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">📅 Upcoming Green Events</h2>
            <p className="text-gray-600 text-lg">Join local events and meet fellow eco-enthusiasts</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {loading ? (
              [1,2,3].map(i => <SkeletonCard key={i} />)
            ) : (
              events.slice(0, 4).map((event, idx) => (
                <div key={event._id} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300" data-aos="fade-up" data-aos-delay={idx * 100}>
                  <div className="relative overflow-hidden">
                    <img src={event.imageUrl || bannerFour} alt={event.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-4 right-4 bg-emerald-600 text-white text-xs px-3 py-1 rounded-full">Register Now</div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl text-gray-900 mb-2">{event.title}</h3>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <p className="flex items-center gap-2">📅 {formatDate(event.date)}</p>
                      <p className="flex items-center gap-2">📍 {event.location}</p>
                      <p className="flex items-center gap-2 text-emerald-600 font-medium">👥 {event.currentParticipants}/{event.maxParticipants} spots</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleRegisterNow}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl font-semibold transition-colors"
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Why Go Green */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">✨ Why Go Green?</h2>
            <p className="text-gray-600 text-lg">Benefits beyond just saving the planet</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '📊', title: 'Track Impact', desc: 'See your real environmental contribution' },
              { icon: '❤️', title: 'Community', desc: 'Connect with like-minded people' },
              { icon: '🌱', title: 'Wellbeing', desc: 'Improve mental and physical health' },
              { icon: '💰', title: 'Save Money', desc: 'Reduce bills through sustainable choices' },
            ].map((benefit, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300" data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-emerald-900 to-teal-900 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12" data-aos="fade-up">⚡ How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { step: '1', title: 'Pick a Challenge', desc: 'Choose from various eco-challenges that match your interests', icon: '🎯' },
              { step: '2', title: 'Log Your Actions', desc: 'Track your progress and log your sustainable activities', icon: '📝' },
              { step: '3', title: 'Level Up', desc: 'Earn badges, climb leaderboards, and see your impact', icon: '🏆' },
            ].map((step, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300" data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className="text-5xl mb-4">{step.icon}</div>
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">{step.step}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-200">{step.desc}</p>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleExploreChallenges}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get Started Now
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-aos="fade-up">What Our Community Says</h2>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-3xl overflow-hidden shadow-2xl min-h-[400px]" style={{ backgroundImage: `url(${reviewBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} data-aos="fade-right">
              <div className="bg-black/60 h-full flex items-center justify-center p-10">
                <div className="text-center">
                  <h3 className="text-3xl md:text-4xl font-bold mb-6">Join the Movement</h3>
                  <p className="text-xl opacity-90">Together we're making Earth greener, one action at a time.</p>
                </div>
              </div>
            </div>
            <div className="space-y-6" data-aos="fade-left">
              {[
                { name: 'Sarah Johnson', role: 'Zero Waste Advocate', img: user1, text: 'This platform transformed how I think about sustainability. I\'ve reduced my carbon footprint by 40% in just 3 months!' },
                { name: 'Michael Chen', role: 'Urban Gardener', img: user2, text: 'The challenges are engaging and the community is so supportive. I\'ve connected with amazing people who share my passion.' },
                { name: 'Emma Watson', role: 'Eco-Warrior', img: user3, text: 'Tracking my impact has been incredibly motivating. Seeing real numbers makes me want to do even more!' },
              ].map((review, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <img src={review.img} alt={review.name} className="w-14 h-14 rounded-full object-cover border-2 border-emerald-400" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <div><h4 className="font-bold text-lg">{review.name}</h4><p className="text-sm text-emerald-300">{review.role}</p></div>
                        <div className="text-emerald-400">⭐⭐⭐⭐⭐</div>
                      </div>
                      <p className="mt-3 text-gray-200 italic">"{review.text}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-aos="fade-up">Ready to Make an Impact?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">Join thousands of changemakers already making a difference. Start your sustainability journey today!</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              type="button"
              onClick={handleExploreChallenges}
              className="bg-white text-emerald-700 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg"
            >
              Explore Challenges
            </button>
            <button
              type="button"
              onClick={handleJoinCommunity}
              className="border-2 border-white hover:bg-white/10 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
            >
              Join Community
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
