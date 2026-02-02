'use client';

import React, { useState } from 'react';

export default function App() {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [currentReview] = useState(2); // SECURITY: backend will send current review stage

  // Dummy team members data
  const teamMembers = [
    { id: 1, name: 'John Doe', regNo: '21BCE1234', isLeader: true },
    { id: 2, name: 'Jane Smith', regNo: '21BCE5678', isLeader: false },
    { id: 3, name: 'Mike Johnson', regNo: '21BCE9012', isLeader: false },
    { id: 4, name: 'Sarah Wilson', regNo: '21BCE3456', isLeader: false }
  ];

  return (
    <div
      className="min-h-screen font-sans"
      style={{
        background:
          'radial-gradient(880px 320px at 30% 30%, rgba(34,197,94,0.20), transparent 62%), radial-gradient(760px 320px at 26% 78%, rgba(34,197,94,0.12), transparent 60%), linear-gradient(180deg, #050705, #0b120c)'
      }}
    >
      {/* Profile Popup */}
      {showProfilePopup && (
        <div className="fixed inset-0 z-50" onClick={() => setShowProfilePopup(false)}>
          <div
            className="absolute left-1/2 top-4 -translate-x-1/2 w-[220px] rounded-xl px-4 py-3"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
              boxShadow: '0 4px 20px rgba(34,197,94,0.15)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-white text-base font-medium leading-tight">John</div>
            <div className="text-gray-300 text-xs mt-1">John.2024@vitstudent.ac.in</div>
            <button className="mt-3 w-full rounded-full bg-gray-600/70 hover:bg-gray-600/80 text-white text-sm py-2">
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Top Header */}
      <header className="mx-auto max-w-[1400px] px-6 pt-8 pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-normal">
              <span className="text-green-400">Hey,</span> <span className="text-white">John</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {/* SECURITY: backend will send team name and id */}
              Team Alpha : TEAM123
            </p>
          </div>
          <div className="flex items-center gap-5">
            <button className="h-9 px-9 rounded-full bg-gray-600/70 hover:bg-gray-600/80 text-white text-sm">
              Logout
            </button>
            <button
              onClick={() => setShowProfilePopup(!showProfilePopup)}
              className="w-12 h-12 rounded-full border border-green-400/60 bg-black/40 flex items-center justify-center text-green-400 text-lg font-normal hover:bg-black/60 hover:shadow-[0_0_12px_rgba(34,197,94,0.35)] transition-all"
            >
              J
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-6 pb-10">
        <div className="grid grid-cols-[1fr_380px] gap-6">
          {/* Main Content */}
          <main className="pt-6 space-y-6">
          {/* Review Timeline Card */}
          <div 
            className="rounded-2xl p-6"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
              boxShadow: '0 10px 30px rgba(0,0,0,0.35), 0 4px 22px rgba(34,197,94,0.14)'
            }}
          >
            <div className="flex items-center justify-center gap-2 text-white text-xl font-medium mb-5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 16L10 10L14 14L20 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 8V14" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>Review Timeline</span>
            </div>

            <div className="relative px-8 pb-2">
              <div
                className="absolute z-0 h-0.5 bg-gray-300/70"
                style={{ left: 'calc(16.666% + 48px)', width: 'calc(33.333% - 96px)', top: '46px' }}
              />
              <div
                className="absolute z-0 h-0.5 bg-gray-300/70"
                style={{ left: 'calc(50% + 48px)', width: 'calc(33.333% - 96px)', top: '46px' }}
              />

              <div className="grid grid-cols-3 items-start">
                <div className="flex flex-col items-center">
                  <div
                    className="relative z-10 w-[92px] h-[92px] rounded-full flex items-center justify-center text-white text-sm"
                    style={{ background: 'linear-gradient(180deg, #3a443f, #2f3833)' }}
                  >
                    Ideation
                  </div>
                  <div className="text-gray-300 text-xs mt-3">Review 1</div>
                </div>

                <div className="flex flex-col items-center">
                  <div
                    className="relative z-10 w-[92px] h-[92px] rounded-full flex items-center justify-center text-white text-sm text-center leading-tight"
                    style={{
                      background: currentReview >= 2 ? 'linear-gradient(180deg, #1f8a4c, #16693a)' : 'linear-gradient(180deg, #3a443f, #2f3833)',
                      boxShadow: currentReview >= 2 ? '0 0 26px rgba(34,197,94,0.22)' : 'none'
                    }}
                  >
                    Tech &
                    <br />
                    Design
                  </div>
                  <div className="text-gray-300 text-xs mt-3">Review 2</div>
                </div>

                <div className="flex flex-col items-center">
                  <div
                    className="relative z-10 w-[92px] h-[92px] rounded-full flex items-center justify-center text-white text-sm text-center leading-tight"
                    style={{ background: 'linear-gradient(180deg, #3a443f, #2f3833)' }}
                  >
                    Final
                    <br />
                    Review
                  </div>
                  <div className="text-gray-300 text-xs mt-3">Review 3</div>
                </div>
              </div>
            </div>
          </div>

          {/* Review Submission Form */}
          <div 
            className="rounded-2xl p-6"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
              boxShadow: '0 10px 30px rgba(0,0,0,0.35), 0 4px 22px rgba(34,197,94,0.14)'
            }}
          >
            <div className="flex items-center justify-center gap-2 text-white text-xl font-medium mb-5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 4H4V20H20V10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 4L20 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 4L12 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Review Submission</span>
            </div>

            <div className="grid grid-cols-3 gap-10">
              <div className="space-y-5">
                <div>
                  <div className="text-gray-300 text-sm">Track</div>
                  <input
                    type="text"
                    className="mt-2 w-full h-9 rounded-md bg-white/10 px-3 text-gray-200 text-sm outline-none"
                    // SECURITY: backend must validate track input
                  />
                </div>
                <div>
                  <div className="text-gray-300 text-sm">Project Title</div>
                  <input
                    type="text"
                    className="mt-2 w-full h-9 rounded-md bg-white/10 px-3 text-gray-200 text-sm outline-none"
                    // SECURITY: backend must validate project title
                  />
                </div>
                <div>
                  <div className="text-gray-300 text-sm">Description</div>
                  <textarea
                    className="mt-2 w-full h-28 rounded-md bg-white/10 px-3 py-2 text-gray-200 text-sm resize-none outline-none"
                    // SECURITY: backend must validate description
                  />
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="text-gray-300 text-sm">Github Link</div>
                  <input
                    type="text"
                    className="mt-2 w-full h-9 rounded-md bg-white/10 px-3 text-gray-200 text-sm outline-none"
                    // SECURITY: backend must validate GitHub link
                  />
                </div>
                <div>
                  <div className="text-gray-300 text-sm">Figma Link</div>
                  <input
                    type="text"
                    className="mt-2 w-full h-9 rounded-md bg-white/10 px-3 text-gray-200 text-sm outline-none"
                    // SECURITY: backend must validate Figma link
                  />
                </div>
                <div className="pt-8 flex flex-col items-center gap-4">
                  <button className="w-40 h-9 rounded-full bg-gray-500/70 text-white text-sm">
                    Edit
                  </button>
                  <button className="w-40 h-9 rounded-full bg-green-800/60 text-white text-sm">
                    Submit
                  </button>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="text-gray-300 text-sm">Miscellaneous Links</div>
                  <input
                    type="text"
                    className="mt-2 w-full h-9 rounded-md bg-white/10 px-3 text-gray-200 text-sm outline-none"
                    // SECURITY: backend must validate miscellaneous links
                  />
                </div>
                <div>
                  <div className="text-gray-300 text-sm">PPT Link</div>
                  <input
                    type="text"
                    className="mt-2 w-full h-9 rounded-md bg-white/10 px-3 text-gray-200 text-sm outline-none"
                    // SECURITY: backend must validate PPT link
                  />
                </div>
                <div>
                  <div className="text-gray-300 text-sm">Progress in R1</div>
                  <textarea
                    className="mt-2 w-full h-28 rounded-md bg-white/10 px-3 py-2 text-gray-200 text-sm resize-none outline-none"
                    // SECURITY: backend must validate progress in R1
                  />
                </div>
              </div>
            </div>
          </div>

          </main>

          {/* Sidebar */}
          <aside className="pt-6 space-y-6">
          {/* Team Details Card */}
          <div 
            className="rounded-2xl p-6"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
              boxShadow: '0 10px 30px rgba(0,0,0,0.35), 0 4px 22px rgba(34,197,94,0.14)'
            }}
          >
            <div className="flex items-center gap-2 text-white text-xl font-medium mb-4">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 8v6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M23 11h-6" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>Team Details</span>
            </div>

            <div className="rounded-2xl bg-black/35 px-4 py-2">
              {teamMembers.map((member, idx) => (
                <div
                  key={member.id}
                  className={`flex items-center justify-between py-2.5 ${idx !== teamMembers.length - 1 ? 'border-b border-white/10' : ''}`}
                >
                  <div>
                    <div className="text-white text-sm leading-tight">Name</div>
                    <div className="text-gray-400 text-[11px] mt-1 leading-none">Registration No.</div>
                  </div>
                  {member.isLeader ? (
                    <button className="h-7 px-4 rounded-full bg-green-800/60 text-white text-[11px]">
                      Team Leader
                    </button>
                  ) : (
                    <button className="h-7 px-4 rounded-full bg-green-800/45 text-white text-[11px]">
                      Remove member
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Invite Members Card */}
          <div 
            className="rounded-2xl p-6"
            style={{
              background:
                'radial-gradient(520px 260px at 110% 120%, rgba(34,197,94,0.30), transparent 60%), linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
              boxShadow: '0 10px 30px rgba(0,0,0,0.35), 0 4px 22px rgba(34,197,94,0.14)'
            }}
          >
            <div className="flex items-center gap-2 text-white text-xl font-medium mb-4">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 13A5 5 0 0 1 10 6H7A5 5 0 0 0 7 16H10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 11a5 5 0 0 1 0 7h3a5 5 0 0 0 0-10h-3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 12h8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Invite Members</span>
            </div>

            <div className="grid grid-cols-[1fr_auto] gap-6 items-start">
              <div className="space-y-5">
                <div>
                  <div className="text-gray-300 text-sm">Team ID</div>
                  <input
                    type="text"
                    value="TEAM123"
                    readOnly
                    className="mt-2 w-full h-9 rounded-md bg-white/10 px-3 text-gray-200 text-sm outline-none"
                    // SECURITY: backend will generate team ID
                  />
                </div>
                <div>
                  <div className="text-gray-300 text-sm">Sharable Link</div>
                  <input
                    type="text"
                    value="https://team.example.com/invite/TEAM123"
                    readOnly
                    className="mt-2 w-full h-9 rounded-md bg-white/10 px-3 text-gray-200 text-sm outline-none"
                    // SECURITY: backend will generate invite link & QR
                  />
                </div>
              </div>

              <div>
                <div className="text-gray-300 text-sm text-right">QR code</div>
                <div className="mt-2 w-28 h-28 bg-white rounded-sm p-1">
                  <div className="w-full h-full bg-white">
                    <svg viewBox="0 0 33 33" className="w-full h-full" shapeRendering="crispEdges">
                      <rect width="33" height="33" fill="#fff" />
                      <rect x="1" y="1" width="7" height="7" fill="#111" />
                      <rect x="2" y="2" width="5" height="5" fill="#fff" />
                      <rect x="3" y="3" width="3" height="3" fill="#111" />
                      <rect x="25" y="1" width="7" height="7" fill="#111" />
                      <rect x="26" y="2" width="5" height="5" fill="#fff" />
                      <rect x="27" y="3" width="3" height="3" fill="#111" />
                      <rect x="1" y="25" width="7" height="7" fill="#111" />
                      <rect x="2" y="26" width="5" height="5" fill="#fff" />
                      <rect x="3" y="27" width="3" height="3" fill="#111" />
                      <rect x="11" y="10" width="1" height="1" fill="#111" />
                      <rect x="13" y="10" width="1" height="1" fill="#111" />
                      <rect x="15" y="10" width="1" height="1" fill="#111" />
                      <rect x="17" y="10" width="1" height="1" fill="#111" />
                      <rect x="19" y="10" width="1" height="1" fill="#111" />
                      <rect x="11" y="12" width="1" height="1" fill="#111" />
                      <rect x="12" y="13" width="1" height="1" fill="#111" />
                      <rect x="14" y="12" width="1" height="1" fill="#111" />
                      <rect x="16" y="13" width="1" height="1" fill="#111" />
                      <rect x="18" y="12" width="1" height="1" fill="#111" />
                      <rect x="20" y="13" width="1" height="1" fill="#111" />
                      <rect x="9" y="16" width="1" height="1" fill="#111" />
                      <rect x="11" y="16" width="1" height="1" fill="#111" />
                      <rect x="13" y="16" width="1" height="1" fill="#111" />
                      <rect x="15" y="16" width="1" height="1" fill="#111" />
                      <rect x="17" y="16" width="1" height="1" fill="#111" />
                      <rect x="19" y="16" width="1" height="1" fill="#111" />
                      <rect x="21" y="16" width="1" height="1" fill="#111" />
                      <rect x="10" y="20" width="1" height="1" fill="#111" />
                      <rect x="12" y="20" width="1" height="1" fill="#111" />
                      <rect x="14" y="20" width="1" height="1" fill="#111" />
                      <rect x="16" y="20" width="1" height="1" fill="#111" />
                      <rect x="18" y="20" width="1" height="1" fill="#111" />
                      <rect x="20" y="20" width="1" height="1" fill="#111" />
                      <rect x="22" y="20" width="1" height="1" fill="#111" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
