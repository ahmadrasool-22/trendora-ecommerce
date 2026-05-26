import heroimg from "../images/hero.webp";
import hero2img from "../images/hero2.webp";
import hero3img from "../images/hero3.webp";
import hero4img from "../images/hero4.webp";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";


function Home() {
    const [ques1,setques1]=useState(false);
    const [ques2,setques2]=useState(false);
    const [ques3,setques3]=useState(false);
    const [ques4,setques4]=useState(false);


  return (
   <main className="flex flex-col gap-y-8">
    <div className="w-full px-4 pt-4">

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 min-h-[750px]">

    {/* LEFT MAIN HERO */}
    <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 p-8 md:p-12 flex flex-col justify-between">

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-300/10 blur-3xl rounded-full"></div>

      {/* TOP CONTENT */}
      <div className="relative z-10">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-md px-5 py-2 rounded-full text-sm text-blue-100 font-medium">
          🌙 Trusted by thousands worldwide
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] mt-8">
          Upgrade
          <span className="block text-blue-300">
            Your Sleep
          </span>
        </h1>

        {/* Paragraph */}
        <p className="text-blue-100 text-lg md:text-xl mt-7 max-w-xl leading-relaxed">
          Premium mattresses crafted for deep comfort,
          better posture support, and luxurious sleep
          experiences every single night.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10">

          <Link
            to="/products"
            className="bg-white text-blue-950 px-8 py-4 rounded-full font-bold hover:scale-105 hover:bg-blue-100 transition duration-300 shadow-2xl text-center"
          >
            Shop Collection
          </Link>

          <button className="border border-white/20 bg-white/5 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition duration-300">
            Explore Comfort →
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="relative z-10 grid grid-cols-3 gap-4 mt-10">

        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4">
          <h3 className="text-3xl font-black text-white">
            10K+
          </h3>

          <p className="text-blue-100 text-sm mt-1">
            Happy Customers
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4">
          <h3 className="text-3xl font-black text-white">
            98%
          </h3>

          <p className="text-blue-100 text-sm mt-1">
            Better Sleep
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4">
          <h3 className="text-3xl font-black text-white">
            1 Year
          </h3>

          <p className="text-blue-100 text-sm mt-1">
            Warranty
          </p>
        </div>
      </div>
    </div>

    {/* RIGHT IMAGE GRID */}
    <div className="grid grid-rows-2 gap-5">

      {/* TOP IMAGE */}
      <div className="relative overflow-hidden rounded-[2rem] group">

        <img
          src={hero2img}
          alt="hero2"
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>

        {/* Floating Card */}
        <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 text-white">
          <p className="text-sm text-blue-100">
            Premium Collection
          </p>

          <h3 className="text-2xl font-bold mt-1">
            Luxury Comfort
          </h3>
        </div>
      </div>

      {/* BOTTOM GRID */}
      <div className="grid grid-cols-2 gap-5">

        {/* IMAGE 1 */}
        <div className="relative overflow-hidden rounded-[2rem] group">

          <img
            src={hero3img}
            alt="hero3"
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
          />

          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* IMAGE 2 */}
        <div className="relative overflow-hidden rounded-[2rem] group">

          <img
            src={hero4img}
            alt="hero4"
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
          />

          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      </div>
    </div>
  </div>
</div>
{/* WHY TRENDORA SECTION */}
<div className="px-4 py-10">

  {/* Heading */}
  <div className="text-center mb-10">
    <p className="text-blue-700 font-semibold tracking-widest uppercase">
      Why Trendora
    </p>

    <h2 className="text-4xl md:text-5xl font-black text-blue-950 mt-3">
      Sleep Better. Live Better.
    </h2>

    <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
      Crafted with premium materials and designed for deep,
      uninterrupted sleep — Trendora brings luxury comfort
      to your bedroom.
    </p>
  </div>

  {/* Bento Grid */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-5 auto-rows-[220px]">

    {/* BIG CARD */}
    <div className="md:col-span-2 md:row-span-2 rounded-3xl bg-gradient-to-br from-blue-950 to-blue-800 p-8 text-white flex flex-col justify-between overflow-hidden relative group">

      {/* Glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl group-hover:scale-125 transition duration-500"></div>

      <div className="relative z-10">
        <p className="uppercase tracking-widest text-blue-200 text-sm">
          Premium Comfort
        </p>

        <h3 className="text-4xl font-black mt-4 leading-tight">
          Experience Luxury Sleep Every Night
        </h3>

        <p className="text-blue-100 mt-5 max-w-md">
          High-density foam, orthopedic support, and breathable
          layers engineered for unmatched comfort.
        </p>
      </div>

      <div className="relative z-10 flex items-center gap-4 mt-6">
        <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl">
          <p className="text-3xl font-bold">10K+</p>
          <p className="text-sm text-blue-100">
            Happy Customers
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl">
          <p className="text-3xl font-bold">98%</p>
          <p className="text-sm text-blue-100">
            Better Sleep Rating
          </p>
        </div>
      </div>
    </div>

    {/* CARD 1 */}
    <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6 hover:shadow-xl transition duration-300 group">
      <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl group-hover:scale-110 transition">
        ❄
      </div>

      <h3 className="text-xl font-bold text-blue-950 mt-5">
        Cooling Comfort
      </h3>

      <p className="text-gray-500 mt-3 text-sm leading-relaxed">
        Breathable fabrics designed to keep you cool and fresh
        throughout the night.
      </p>
    </div>

    {/* CARD 2 */}
    <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6 hover:shadow-xl transition duration-300 group">
      <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-3xl group-hover:scale-110 transition">
        🛡
      </div>

      <h3 className="text-xl font-bold text-blue-950 mt-5">
        1 Year Warranty
      </h3>

      <p className="text-gray-500 mt-3 text-sm leading-relaxed">
        Built to last with trusted quality assurance and
        long-term durability.
      </p>
    </div>

    {/* LONG CARD */}
    <div className="md:col-span-2 rounded-3xl bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-200 p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl transition">

      <div>
        <p className="text-blue-700 font-semibold uppercase tracking-wider text-sm">
          Orthopedic Support
        </p>

        <h3 className="text-3xl font-black text-blue-950 mt-2">
          Designed For Deep Recovery
        </h3>

        <p className="text-gray-500 mt-3 max-w-xl">
          Ergonomic support layers help align your spine and
          reduce pressure points for healthier sleep.
        </p>
      </div>

      <div className="text-7xl">
        🌙
      </div>
    </div>

    {/* CARD 3 */}
    <div className="rounded-3xl bg-blue-950 text-white p-6 hover:shadow-2xl transition duration-300">
      <div className="text-4xl">
        🚚
      </div>

      <h3 className="text-2xl font-bold mt-5">
        Fast Delivery
      </h3>

      <p className="text-blue-100 mt-3 text-sm">
        Nationwide delivery with secure packaging and
        hassle-free shipping.
      </p>
    </div>

    {/* CARD 4 */}
    <div className="rounded-3xl bg-gradient-to-br from-blue-100 to-white border border-blue-200 p-6 hover:shadow-xl transition duration-300">

      <div className="text-4xl">
        ♻
      </div>

      <h3 className="text-2xl font-bold text-blue-950 mt-5">
        Eco Materials
      </h3>

      <p className="text-gray-600 mt-3 text-sm">
        Sustainable materials carefully selected for comfort,
        safety, and the environment.
      </p>
    </div>
  </div>
</div>

 {/*  cta section */}

<div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 px-6 py-16 md:px-14 text-center text-white shadow-2xl">

  {/* Background Glow */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400/20 blur-3xl rounded-full"></div>

  <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-300/10 blur-3xl rounded-full"></div>

  {/* Content */}
  <div className="relative z-10 max-w-3xl mx-auto">

    {/* Small Badge */}
    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-5 py-2 rounded-full text-sm font-medium text-blue-100">
      🌙 Premium Sleep Experience
    </div>

    {/* Heading */}
    <h2 className="text-4xl md:text-6xl font-black leading-tight mt-6">
      Transform Your Nights Into
      <span className="block text-blue-300">
        Luxury Comfort
      </span>
    </h2>

    {/* Paragraph */}
    <p className="mt-6 text-blue-100 text-lg leading-relaxed max-w-2xl mx-auto">
      Discover expertly crafted mattresses and bedding
      designed to deliver deep sleep, better support,
      and unmatched comfort every single night.
    </p>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">

      <Link
        to="/products"
        className="bg-white text-blue-950 px-8 py-4 rounded-full font-bold hover:scale-105 hover:bg-blue-100 transition duration-300 shadow-xl"
      >
        Shop Collection
      </Link>

      <button className="border border-white/20 bg-white/5 backdrop-blur-md px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition duration-300">
        Explore Comfort →
      </button>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-14">

      <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl py-5">
        <h3 className="text-3xl font-black">
          10K+
        </h3>

        <p className="text-blue-100 text-sm mt-1">
          Happy Customers
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl py-5">
        <h3 className="text-3xl font-black">
          98%
        </h3>

        <p className="text-blue-100 text-sm mt-1">
          Better Sleep
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl py-5">
        <h3 className="text-3xl font-black">
          1 Year
        </h3>

        <p className="text-blue-100 text-sm mt-1">
          Warranty
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl py-5">
        <h3 className="text-3xl font-black">
          24/7
        </h3>

        <p className="text-blue-100 text-sm mt-1">
          Support
        </p>
      </div>
    </div>
  </div>
</div>


<div className="py-16 px-4">

  {/* Heading */}
  <div className="text-center max-w-3xl mx-auto">
    
    <p className="text-blue-700 uppercase tracking-[0.25em] font-semibold text-sm">
      Support & Questions
    </p>

    <h2 className="text-4xl md:text-5xl font-black text-blue-950 mt-4 leading-tight">
      Frequently Asked Questions
    </h2>

    <p className="text-gray-500 text-lg mt-5 leading-relaxed">
      Everything you need to know about Trendora products,
      delivery, warranty, and comfort experience.
    </p>
  </div>

  {/* FAQ Container */}
  <div className="max-w-4xl mx-auto mt-14 space-y-5">

    {/* FAQ ITEM */}
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden">

      <button
        onClick={() => setques1(!ques1)}
        className="w-full flex items-center justify-between px-7 py-6 text-left group"
      >
        <h3 className="text-lg md:text-xl font-bold text-blue-950 group-hover:text-blue-700 transition">
          What makes Trendora products different from others?
        </h3>

        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center transition duration-300
          ${
            ques1
              ? "bg-blue-900 text-white rotate-180"
              : "bg-slate-100 text-blue-900"
          }`}
        >
          {ques1 ? <ChevronUp /> : <ChevronDown />}
        </div>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          ques1
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-7 pb-7 text-gray-600 leading-relaxed text-[16px]">
            Trendora products are crafted using premium-quality
            materials, ergonomic support technology, and modern
            comfort-focused designs to provide deeper sleep,
            better posture support, and long-lasting durability.
          </div>
        </div>
      </div>
    </div>

    {/* FAQ ITEM */}
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden">

      <button
        onClick={() => setques2(!ques2)}
        className="w-full flex items-center justify-between px-7 py-6 text-left group"
      >
        <h3 className="text-lg md:text-xl font-bold text-blue-950 group-hover:text-blue-700 transition">
          How long does shipping and delivery usually take?
        </h3>

        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center transition duration-300
          ${
            ques2
              ? "bg-blue-900 text-white rotate-180"
              : "bg-slate-100 text-blue-900"
          }`}
        >
          {ques2 ? <ChevronUp /> : <ChevronDown />}
        </div>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          ques2
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-7 pb-7 text-gray-600 leading-relaxed text-[16px]">
            Trendora deliveries usually take 3–5 business days
            locally and 7–10 business days nationwide depending
            on your location and selected shipping method.
          </div>
        </div>
      </div>
    </div>

    {/* FAQ ITEM */}
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden">

      <button
        onClick={() => setques3(!ques3)}
        className="w-full flex items-center justify-between px-7 py-6 text-left group"
      >
        <h3 className="text-lg md:text-xl font-bold text-blue-950 group-hover:text-blue-700 transition">
          Can I return or exchange an item if I’m not satisfied?
        </h3>

        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center transition duration-300
          ${
            ques3
              ? "bg-blue-900 text-white rotate-180"
              : "bg-slate-100 text-blue-900"
          }`}
        >
          {ques3 ? <ChevronUp /> : <ChevronDown />}
        </div>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          ques3
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-7 pb-7 text-gray-600 leading-relaxed text-[16px]">
            Yes. Trendora allows returns or exchanges within
            14 days of delivery as long as the product remains
            in its original condition and packaging.
          </div>
        </div>
      </div>
    </div>

    {/* FAQ ITEM */}
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden">

      <button
        onClick={() => setques4(!ques4)}
        className="w-full flex items-center justify-between px-7 py-6 text-left group"
      >
        <h3 className="text-lg md:text-xl font-bold text-blue-950 group-hover:text-blue-700 transition">
          Do Trendora mattresses come with warranty coverage?
        </h3>

        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center transition duration-300
          ${
            ques4
              ? "bg-blue-900 text-white rotate-180"
              : "bg-slate-100 text-blue-900"
          }`}
        >
          {ques4 ? <ChevronUp /> : <ChevronDown />}
        </div>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          ques4
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-7 pb-7 text-gray-600 leading-relaxed text-[16px]">
            Absolutely. All Trendora mattresses and bedding
            products include a 1-year warranty covering
            manufacturing defects and quality-related issues.
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</main>





  );
}
export default Home;
