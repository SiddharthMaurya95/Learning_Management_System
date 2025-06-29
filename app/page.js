"use client"
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Divide } from "lucide-react";
import DashboardHeader from "./dashboard/_components/DashboardHeader";
import React, { useState } from 'react';
import { BrainCircuit, Sparkles, ImagePlus, FileOutput, Check, Menu, X, Facebook, Twitter, Github, Linkedin } from 'lucide-react';
export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const{user}=useUser();
  console.log(user)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
   <div>
    <div className="bg-gray-50 text-gray-800 antialiased">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg fixed w-full z-20 top-0 start-0 border-b border-gray-200">
        <nav className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
            <BrainCircuit className="h-8 w-8 text-blue-600" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-900">CourseCraft</span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {user==null?<Link href={"/dashboard"}><button type="button" className="text-gray-800 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center">
              Login
            </button></Link>:<UserButton/>}
            <button 
              onClick={toggleMenu}
              type="button" 
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" 
              aria-controls="navbar-sticky" 
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
          <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              <li><a href="#home" className="block py-2 px-3 text-gray-900 rounded hover:bg-transparent hover:text-blue-700 md:p-0">Home</a></li>
              <li><a href="#features" className="block py-2 px-3 text-gray-900 rounded hover:bg-transparent hover:text-blue-700 md:p-0">Features</a></li>
              <li><a href="#pricing" className="block py-2 px-3 text-gray-900 rounded hover:bg-transparent hover:text-blue-700 md:p-0">Pricing</a></li>
              
            </ul>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32">
          <div className="absolute inset-0">
            <img src="https://source.unsplash.com/random/1920x1080/?abstract,technology,gradient" alt="Abstract background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-purple-900/70 to-blue-900/80"></div>
          </div>
          <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white">
              Generate Engaging Courses 
              <span className="text-gradient bg-gradient-to-r from-teal-300 via-blue-400 to-purple-400 bg-clip-text text-transparent"> Instantly with AI</span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-300">
              Let our intelligent platform design, structure, and create stunning course materials for you. Save time, spark creativity, and launch your next course in minutes.
            </p>
            <div className="mt-10 flex justify-center">
              <Link href={'/dashboard'} className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center space-x-2">
                <span>Generate Your First Course</span></Link>
                <Sparkles className="h-5 w-5" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 sm:py-24 bg-white">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Features</h2>
              <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Everything You Need to Create Amazing Courses</p>
            </div>
            <div className="mt-12 grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  <BrainCircuit className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-gray-900">AI Syllabus Design</h3>
                <p className="mt-2 text-base text-gray-600">Provide a topic and our AI will generate a comprehensive, well-structured syllabus with modules, lessons, and learning objectives.</p>
              </div>
              <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-teal-400 to-green-500 text-white">
                  <ImagePlus className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-gray-900">Automated Content</h3>
                <p className="mt-2 text-base text-gray-600">Our system populates your course with relevant and high-quality, understandable content to enhance your learning experience.</p>
              </div>
              <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 text-white">
                  <FileOutput className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-gray-900">Dynamic Content Integration</h3>
                <p className="mt-2 text-base text-gray-600">Creates embedded notes, quizzes, Flashcards, and question/answers to enhance understanding and retention efficiently.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 sm:py-24 bg-gray-50">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">How It Works</h2>
              <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Create a Course in 3 Simple Steps</p>
            </div>
            <div className="mt-12 relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200" aria-hidden="true"></div>
              <div className="relative grid gap-12 md:grid-cols-3">
                <div className="text-center">
                  <div className="flex items-center justify-center mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 border-4 border-white shadow-lg">
                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">1</span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-gray-900">Describe Your Topic</h3>
                  <p className="mt-2 text-base text-gray-600">Enter a simple prompt describing the course you want to create.</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 border-4 border-white shadow-lg">
                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">2</span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-gray-900">Customize & Refine</h3>
                  <p className="mt-2 text-base text-gray-600">Our AI generates the course. You can easily edit and customize it.</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 border-4 border-white shadow-lg">
                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">3</span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-gray-900">Export & Launch 🚀</h3>
                  <p className="mt-2 text-base text-gray-600">Download your course in your preferred format and share it.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 sm:py-24 bg-white">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Pricing</h2>
              <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Simple, Transparent Pricing</p>
            </div>
            <div className="mt-12 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-200">
                <h3 className="text-2xl font-semibold text-gray-900">Free</h3>
                <p className="mt-4 text-gray-600">Get started and explore the core features for free.</p>
                <p className="mt-8">
                  <span className="text-5xl font-extrabold text-gray-900">$0</span>
                  <span className="text-base font-medium text-gray-600">/mo</span>
                </p>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-center space-x-3">
                    <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="text-gray-600">15 Course Generations</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="text-gray-600">Basic Syllabus Design</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="text-gray-600">Email Support</span>
                  </li>
                </ul>
                <Link href={'/dashboard'} className="mt-8 block w-full text-center py-3 px-6 rounded-lg font-semibold text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors">
                  Get Started for Free
                </Link>
              </div>
              <div className="p-8 rounded-2xl border-2 border-transparent bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl transform lg:scale-105">
                <h3 className="text-2xl font-semibold text-white">Premium</h3>
                <p className="mt-4 text-purple-200">Unlock the full power of AI for unlimited course creation.</p>
                <p className="mt-8">
                  <span className="text-5xl font-extrabold text-white">$9</span>
                  <span className="text-base font-medium text-purple-200">/mo</span>
                </p>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-center space-x-3">
                    <Check className="flex-shrink-0 h-5 w-5 text-teal-300" />
                    <span className="text-white">Unlimited Course Generations</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="flex-shrink-0 h-5 w-5 text-teal-300" />
                    <span className="text-white">Advanced AI Syllabus & Content</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="flex-shrink-0 h-5 w-5 text-teal-300" />
                    <span className="text-white">Automated Image Sourcing</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="flex-shrink-0 h-5 w-5 text-teal-300" />
                    <span className="text-white">Export to PDF & HTML</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="flex-shrink-0 h-5 w-5 text-teal-300" />
                    <span className="text-white">Priority Support</span>
                  </li>
                </ul>
                <Link href={'/dashboard/upgrade'} className="mt-8 block w-full text-center py-3 px-6 rounded-lg font-semibold text-blue-600 bg-white hover:bg-gray-100 transition-colors">
                  Go Premium
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="relative py-16 sm:py-24 bg-gray-50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-100 via-blue-50 to-white"></div>
          <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Testimonials</h2>
              <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Loved by Creators Worldwide</p>
            </div>
            <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-md border border-gray-200">
                <blockquote className="text-gray-600">"This tool is a game-changer. I went from idea to a fully-realized course outline in under 10 minutes. Unbelievable!"</blockquote>
                <figcaption className="mt-4 flex items-center space-x-4">
                  <img className="h-12 w-12 rounded-full object-cover" src="https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg" alt="User avatar" />
                  <div>
                    <div className="font-bold text-gray-900">Alex Johnson</div>
                    <div className="text-sm text-gray-500">Instructional Designer</div>
                  </div>
                </figcaption>
              </div>
              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-md border border-gray-200">
                <blockquote className="text-gray-600">"As a busy entrepreneur, CourseCraft saved me dozens of hours. The quality of the AI-generated content is top-notch."</blockquote>
                <figcaption className="mt-4 flex items-center space-x-4">
                  <img className="h-12 w-12 rounded-full object-cover" src="https://source.unsplash.com/random/100x100/?woman,portrait" alt="User avatar" />
                  <div>
                    <div className="font-bold text-gray-900">Maria Garcia</div>
                    <div className="text-sm text-gray-500">Startup Founder</div>
                  </div>
                </figcaption>
              </div>
              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-md border border-gray-200">
                <blockquote className="text-gray-600">"The PDF and HTML export features are seamless. I can now focus on marketing my courses instead of formatting them."</blockquote>
                <figcaption className="mt-4 flex items-center space-x-4">
                  <img className="h-12 w-12 rounded-full object-cover" src="https://source.unsplash.com/random/100x100/?man,professional" alt="User avatar" />
                  <div>
                    <div className="font-bold text-gray-900">David Chen</div>
                    <div className="text-sm text-gray-500">Online Educator</div>
                  </div>
                </figcaption>
              </div>
            </div>
          </div>
        </section>

        
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="#" className="flex items-center space-x-3">
                <BrainCircuit className="h-8 w-8 text-blue-500" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap">CourseCraft</span>
              </a>
              <p className="mt-4 max-w-xs text-gray-400">The fastest way to design and launch beautiful online courses with the power of AI.</p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-100 uppercase">Resources</h2>
                <ul className="text-gray-400 font-medium">
                  <li className="mb-4"><a href="#features" className="hover:underline">Features</a></li>
                  <li><a href="#pricing" className="hover:underline">Pricing</a></li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-100 uppercase">Follow us</h2>
                <ul className="text-gray-400 font-medium">
                  <li className="mb-4"><a href="#" className="hover:underline">Github</a></li>
                  <li><a href="#" className="hover:underline">Discord</a></li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-100 uppercase">Legal</h2>
                <ul className="text-gray-400 font-medium">
                  <li className="mb-4"><a href="#" className="hover:underline">Privacy Policy</a></li>
                  <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-400 sm:text-center">© 2024 <a href="#" className="hover:underline">CourseCraft™</a>. All Rights Reserved.</span>
            <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-5 rtl:space-x-reverse">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook page</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter page</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub account</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn profile</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
   </div>
  );
}
