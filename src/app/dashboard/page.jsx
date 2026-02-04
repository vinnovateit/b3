'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Link, QrCode, TrendingUp, Users } from 'lucide-react';
import gsap from 'gsap';

const REVIEW_SCHEDULE = {
  review1: '2026-02-01T10:00:00',
  review2: '2026-02-10T10:00:00',
  review3: '2026-02-20T10:00:00'
};

const getCurrentReview = () => {
  const now = new Date();
  const review2 = new Date(REVIEW_SCHEDULE.review2);
  const review3 = new Date(REVIEW_SCHEDULE.review3);

  if (now < review2) return 1;
  if (now >= review2 && now < review3) return 2;
  return 3;
};

export default function App() {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const profilePopupRef = useRef(null);
  const avatarButtonRef = useRef(null);

  const [currentReview, setCurrentReview] = useState(getCurrentReview);

  const dashboardData = {
    user: {
      name: 'Participant',
      email: 'participant@vitstudent.ac.in'
    },
    team: {
      name: 'Team Name',
      id: 'TEAM_ID',
      members: [
        { name: 'Leader Name', regNo: 'REG_NO_1', role: 'leader' },
        { name: 'Member Name', regNo: 'REG_NO_2', role: 'member' },
        { name: 'Member Name', regNo: 'REG_NO_3', role: 'member' },
        { name: 'Member Name', regNo: 'REG_NO_4', role: 'member' }
      ]
    }
  };

  const [formData, setFormData] = useState({
    track: '',
    title: '',
    github: '',
    figma: '',
    miscLinks: '',
    ppt: '',
    description: '',
    progressR1: ''
  });

  const [copiedSharableLink, setCopiedSharableLink] = useState(false);

  useEffect(() => {
    const update = () => setCurrentReview(getCurrentReview());
    update();

    const intervalId = setInterval(update, 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, []);

  useEffect(() => {
    if (!showProfilePopup) return;
    if (!profilePopupRef.current) return;

    gsap.fromTo(
      profilePopupRef.current,
      { autoAlpha: 0, scale: 0.98, y: -6 },
      { autoAlpha: 1, scale: 1, y: 0, duration: 0.2, ease: 'power2.out' }
    );
  }, [showProfilePopup]);

  useEffect(() => {
    if (!showProfilePopup) return;

    const onMouseDown = (e) => {
      const dropdownEl = profilePopupRef.current;
      const avatarEl = avatarButtonRef.current;
      if (!dropdownEl || !avatarEl) return;

      if (dropdownEl.contains(e.target)) return;
      if (avatarEl.contains(e.target)) return;

      closeProfilePopup();
    };

    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [showProfilePopup]);

  const closeProfilePopup = () => {
    if (!profilePopupRef.current) {
      setShowProfilePopup(false);
      return;
    }

    gsap.to(profilePopupRef.current, {
      autoAlpha: 0,
      scale: 0.98,
      y: -6,
      duration: 0.2,
      ease: 'power2.out',
      onComplete: () => setShowProfilePopup(false)
    });
  };

  const toggleProfilePopup = () => {
    if (showProfilePopup) {
      closeProfilePopup();
      return;
    }
    setShowProfilePopup(true);
  };

  const handleButtonHover = (el, scale) => {
    gsap.to(el, { scale, duration: 0.2, ease: 'power2.out' });
  };

  const handleCopySharableLink = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedSharableLink(true);
      window.setTimeout(() => setCopiedSharableLink(false), 1200);
    } catch {
      setCopiedSharableLink(false);
    }
  };

  // Dummy team members data
  return (
    <div
      className="h-screen overflow-hidden font-sans"
      style={{
        background:
          'radial-gradient(880px 320px at 30% 30%, rgba(34,197,94,0.20), transparent 62%), radial-gradient(760px 320px at 26% 78%, rgba(34,197,94,0.12), transparent 60%), linear-gradient(180deg, #050705, #0b120c)'
      }}
    >
      {/* Top Header */}
      <header className="mx-auto max-w-[1400px] px-6 pt-8 pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-normal">
              <span className="text-green-400">Hey,</span> <span className="text-white">{dashboardData.user.name}</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {/* SECURITY: backend will send team name and id */}
              {dashboardData.team.name} : {dashboardData.team.id}
            </p>
          </div>
          <div className="flex items-center gap-5">
            <div className="relative">
              <button
                ref={avatarButtonRef}
                onClick={toggleProfilePopup}
                className="w-12 h-12 rounded-full border border-green-400/60 bg-black/40 flex items-center justify-center text-green-400 text-lg font-normal hover:bg-black/60 hover:shadow-[0_0_12px_rgba(34,197,94,0.35)] transition-all"
              >
                {(dashboardData.user.name || 'U').trim().charAt(0).toUpperCase()}
              </button>

              {showProfilePopup && (
                <div
                  ref={profilePopupRef}
                  className="absolute right-0 top-full w-[220px] rounded-xl px-4 py-3 z-50"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
                    boxShadow: '0 4px 20px rgba(34,197,94,0.15)'
                  }}
                >
                  <div className="text-white text-base font-medium leading-tight">{dashboardData.user.name}</div>
                  <div className="text-gray-300 text-xs mt-1">{dashboardData.user.email}</div>
                  <button className="mt-3 w-full rounded-full bg-gray-600/70 hover:bg-gray-600/80 text-white text-sm py-2">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-6 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
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
              <TrendingUp size={18} color="white" strokeWidth={2} />
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
                    style={{
                      background: currentReview === 1 ? 'linear-gradient(180deg, #1f8a4c, #16693a)' : 'linear-gradient(180deg, #3a443f, #2f3833)',
                      boxShadow: currentReview === 1 ? '0 0 26px rgba(34,197,94,0.22)' : 'none'
                    }}
                  >
                    Ideation
                  </div>
                  <div className="text-gray-300 text-xs mt-3">Review 1</div>
                </div>

                <div className="flex flex-col items-center">
                  <div
                    className="relative z-10 w-[92px] h-[92px] rounded-full flex items-center justify-center text-white text-sm text-center leading-tight"
                    style={{
                      background: currentReview === 2 ? 'linear-gradient(180deg, #1f8a4c, #16693a)' : 'linear-gradient(180deg, #3a443f, #2f3833)',
                      boxShadow: currentReview === 2 ? '0 0 26px rgba(34,197,94,0.22)' : 'none'
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
                    style={{
                      background: currentReview === 3 ? 'linear-gradient(180deg, #1f8a4c, #16693a)' : 'linear-gradient(180deg, #3a443f, #2f3833)',
                      boxShadow: currentReview === 3 ? '0 0 26px rgba(34,197,94,0.22)' : 'none'
                    }}
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
              <TrendingUp size={18} color="white" strokeWidth={2} />
              <span>Review Submission</span>
            </div>

            <div className="grid grid-cols-3 gap-10">
              <div className="space-y-5">
                <div>
                  <div className="text-gray-300 text-sm">Track</div>
                  <input
                    type="text"
                    className="mt-2 w-full h-9 rounded-md bg-white/10 px-3 text-gray-200 text-sm outline-none"
                    value={formData.track}
                    onChange={(e) => setFormData((p) => ({ ...p, track: e.target.value }))}
                    // SECURITY: backend must validate track input
                  />
                </div>
                <div>
                  <div className="text-gray-300 text-sm">Project Title</div>
                  <input
                    type="text"
                    className="mt-2 w-full h-9 rounded-md bg-white/10 px-3 text-gray-200 text-sm outline-none"
                    value={formData.title}
                    onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                    // SECURITY: backend must validate project title
                  />
                </div>
                <div>
                  <div className="text-gray-300 text-sm">Description</div>
                  <textarea
                    className="mt-2 w-full h-28 rounded-md bg-white/10 px-3 py-2 text-gray-200 text-sm resize-none outline-none"
                    value={formData.description}
                    onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
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
                    value={formData.github}
                    onChange={(e) => setFormData((p) => ({ ...p, github: e.target.value }))}
                    // SECURITY: backend must validate GitHub link
                  />
                </div>
                <div>
                  <div className="text-gray-300 text-sm">Figma Link</div>
                  <input
                    type="text"
                    className="mt-2 w-full h-9 rounded-md bg-white/10 px-3 text-gray-200 text-sm outline-none"
                    value={formData.figma}
                    onChange={(e) => setFormData((p) => ({ ...p, figma: e.target.value }))}
                    // SECURITY: backend must validate Figma link
                  />
                </div>
                <div className="pt-8 flex flex-col items-center gap-4">
                  <button
                    className="w-40 h-9 rounded-full bg-gray-500/70 text-white text-sm"
                    onMouseEnter={(e) => handleButtonHover(e.currentTarget, 1.05)}
                    onMouseLeave={(e) => handleButtonHover(e.currentTarget, 1)}
                  >
                    Edit
                  </button>
                  <button
                    className="w-40 h-9 rounded-full bg-green-800/60 text-white text-sm"
                    onMouseEnter={(e) => handleButtonHover(e.currentTarget, 1.05)}
                    onMouseLeave={(e) => handleButtonHover(e.currentTarget, 1)}
                  >
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
                    value={formData.miscLinks}
                    onChange={(e) => setFormData((p) => ({ ...p, miscLinks: e.target.value }))}
                    // SECURITY: backend must validate miscellaneous links
                  />
                </div>
                <div>
                  <div className="text-gray-300 text-sm">PPT Link</div>
                  <input
                    type="text"
                    className="mt-2 w-full h-9 rounded-md bg-white/10 px-3 text-gray-200 text-sm outline-none"
                    value={formData.ppt}
                    onChange={(e) => setFormData((p) => ({ ...p, ppt: e.target.value }))}
                    // SECURITY: backend must validate PPT link
                  />
                </div>
                <div>
                  <div className="text-gray-300 text-sm">Progress in R1</div>
                  <textarea
                    className="mt-2 w-full h-28 rounded-md bg-white/10 px-3 py-2 text-gray-200 text-sm resize-none outline-none"
                    value={formData.progressR1}
                    onChange={(e) => setFormData((p) => ({ ...p, progressR1: e.target.value }))}
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
              <Users size={18} color="white" strokeWidth={2} />
              <span>Team Details</span>
            </div>

            <div className="rounded-2xl bg-black/35 px-4 py-2">
              {dashboardData.team.members.map((member, idx) => (
                <div
                  key={member.regNo}
                  className={`flex items-center justify-between py-2.5 ${idx !== dashboardData.team.members.length - 1 ? 'border-b border-white/10' : ''}`}
                >
                  <div>
                    <div className="text-white text-sm leading-tight">{member.name}</div>
                    <div className="text-gray-400 text-[11px] mt-1 leading-none">{member.regNo}</div>
                  </div>
                  {member.role === 'leader' ? (
                    <button className="h-7 px-4 rounded-full bg-green-800/60 text-white text-[11px]">
                      Team Leader
                    </button>
                  ) : (
                    <button
                      className="h-7 px-4 rounded-full bg-green-800/45 text-white text-[11px]"
                      onMouseEnter={(e) => handleButtonHover(e.currentTarget, 1.05)}
                      onMouseLeave={(e) => handleButtonHover(e.currentTarget, 1)}
                    >
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
              <Link size={18} color="white" strokeWidth={2} />
              <span>Invite Members</span>
            </div>

            <div className="grid grid-cols-[1fr_auto] gap-6 items-start">
              <div className="space-y-5">
                <div>
                  <div className="text-gray-300 text-sm">Team ID</div>
                  <input
                    type="text"
                    value={dashboardData.team.id}
                    readOnly
                    className="mt-2 w-full h-9 rounded-md bg-white/10 px-3 text-gray-200 text-sm outline-none"
                    // SECURITY: backend will generate team ID
                  />
                </div>
                <div className="relative">
                  <div className="text-gray-300 text-sm">Sharable Link</div>
                  <input
                    type="text"
                    value={`https://team.example.com/invite/${dashboardData.team.id}`}
                    readOnly
                    className="mt-2 w-full h-9 rounded-md bg-white/10 px-3 text-gray-200 text-sm outline-none"
                    onClick={(e) => handleCopySharableLink(e.currentTarget.value)}
                    // SECURITY: backend will generate invite link & QR
                  />
                  {copiedSharableLink && (
                    <div className="absolute right-0 -top-1 text-gray-300 text-xs">Copied!</div>
                  )}
                </div>
              </div>

              <div>
                <div className="text-gray-300 text-sm text-right">QR code</div>
                <div className="mt-2 w-28 h-28 bg-white rounded-sm p-1">
                  <div className="w-full h-full bg-white">
                    <QrCode className="w-full h-full" color="#111" strokeWidth={2} />
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
