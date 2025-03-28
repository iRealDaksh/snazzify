import React from 'react'
import { assets } from '../assets/assets'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  const developers = [
    {
      name: "Daksh Arora",
      regNo: "23BRS1168",
      role: "Full Stack Developer",
      branch: "CSE with AI and Robotics",
      year: "2023",
      github: "#",
      linkedin: "#",
      email: "daksh.arora2023@vitstudent.ac.in"
    },
    {
      name: "Meghana Sunil",
      regNo: "23BDS1165",
      role: "Frontend Developer",
      branch: "CSE with Data Science",
      year: "2023",
      github: "#",
      linkedin: "#",
      email: "meghana.sunil2023@vitstudent.ac.in"
    },
    {
      name: "Shravya V",
      regNo: "23BDS1162",
      role: "UI/UX Developer",
      branch: "CSE with Data Science",
      year: "2023",
      github: "#",
      linkedin: "#",
      email: "shravya.v2023@vitstudent.ac.in"
    }
  ];

  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-400">
              We are a team of passionate developers from VIT University, 
              creating innovative e-commerce solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/collection" className="hover:text-white">Shop</a></li>
              <li><a href="/about" className="hover:text-white">About</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-400">
              VIT University<br />
              Vellore, Tamil Nadu<br />
              India
            </p>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaGithub size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaLinkedin size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaEnvelope size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Developers Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h3 className="text-xl font-bold mb-6 text-center">Our Development Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {developers.map((dev, index) => (
              <div key={index} className="text-center">
                <h4 className="font-semibold text-lg">{dev.name}</h4>
                <p className="text-gray-400 text-sm mb-1">{dev.regNo}</p>
                <p className="text-gray-400 text-sm mb-1">{dev.branch}</p>
                <p className="text-gray-400 text-sm mb-2">Batch of {dev.year}</p>
                <p className="text-blue-400 mb-3">{dev.role}</p>
                <div className="flex justify-center space-x-4">
                  <a href={dev.github} className="text-gray-400 hover:text-white">
                    <FaGithub size={20} />
                  </a>
                  <a href={dev.linkedin} className="text-gray-400 hover:text-white">
                    <FaLinkedin size={20} />
                  </a>
                  <a href={`mailto:${dev.email}`} className="text-gray-400 hover:text-white">
                    <FaEnvelope size={20} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 pt-8 border-t border-gray-800 text-gray-400">
          <p>&copy; {new Date().getFullYear()} E-Commerce Project. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Developed by VIT Students | School of Computer Science and Engineering
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
