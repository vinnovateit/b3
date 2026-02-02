"use client";

const Navbar = () => {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%]">
      <div className="flex items-center justify-between px-6 py-3 
                      bg-white/10 backdrop-blur-lg 
                      border border-white/20 
                      rounded-2xl shadow-lg">
        
{/* Logo */}
<div className="flex items-center">
  <img
    src="/logo.svg"
    alt="Vinnovate Logo"
    className="h-8 w-auto"
  />
</div>
{/* Nav Links */}
<ul className="hidden md:flex items-center gap-8 text-white text-sm">

{/* Home */}
  <li className="relative cursor-pointer opacity-80 hover:opacity-100 transition
                 after:content-[''] after:absolute after:left-0 after:-bottom-1
                 after:h-[2px] after:w-0 after:bg-white
                 after:transition-all after:duration-300
                 hover:after:w-full">
    Home
  </li>

{/* About */}
  <li className="relative cursor-pointer opacity-80 hover:opacity-100 transition
                 after:content-[''] after:absolute after:left-0 after:-bottom-1
                 after:h-[2px] after:w-0 after:bg-white
                 after:transition-all after:duration-300
                 hover:after:w-full">
    About
  </li>

{/* Rules Dropdown */}
  <li className="relative group cursor-pointer opacity-80 hover:opacity-100 transition">
    <div className="flex items-center gap-1">
      Rules
      <span className="text-xs">⌄</span>
    </div>

    <ul className="absolute top-full left-0 mt-3 w-44
                   bg-white/10 backdrop-blur-lg
                   border border-white/20
                   rounded-xl shadow-lg
                   opacity-0 invisible
                   group-hover:opacity-100 group-hover:visible
                   transition-all duration-200">

      <li className="px-4 py-2 text-white hover:bg-white/10 rounded-t-xl">
        General Rules
      </li>
      <li className="px-4 py-2 text-white hover:bg-white/10">
        Participation
      </li>
      <li className="px-4 py-2 text-white hover:bg-white/10 rounded-b-xl">
        Submission
      </li>

    </ul>
  </li>

  {/* FAQs */}
  <li className="relative cursor-pointer opacity-80 hover:opacity-100 transition
                 after:content-[''] after:absolute after:left-0 after:-bottom-1
                 after:h-[2px] after:w-0 after:bg-white
                 after:transition-all after:duration-300
                 hover:after:w-full">
    FAQs
  </li>

</ul>

        {/* Login Button */}
<button className="flex items-center gap-2 px-4 py-2 
                   bg-green-500 hover:bg-green-600 
                   text-white text-sm font-medium 
                   rounded-xl transition">
  Login
  <span className="text-lg">→</span>
</button>


      </div>
    </nav>
  );
};

export default Navbar;
