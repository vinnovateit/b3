'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Link, QrCode, TrendingUp, Users } from 'lucide-react';
import gsap from 'gsap';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

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
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const profilePopupRef = useRef(null);
  const avatarButtonRef = useRef(null);

  const [currentReview, setCurrentReview] = useState(getCurrentReview);

  const [formData, setFormData] = useState({
    track: '',
    title: '',
    github: '',
    figma: '',
    miscLinks: '',
    ppt: '',
    description: '',
    progress: ''
  });

  const [teamData, setTeamData] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [memberActionLoading, setMemberActionLoading] = useState(false);

  // All useEffect hooks must be before any conditional returns
  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const update = () => setCurrentReview(getCurrentReview());
    update();

    const intervalId = setInterval(update, 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Fetch user profile and team data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch user profile
        const profileRes = await fetch('/api/users/profile');
        if (!profileRes.ok) throw new Error('Failed to fetch profile');
        const profileData = await profileRes.json();
        
        if (profileData.success && profileData.data) {
          setUserProfile(profileData.data);

          // If user has a team, fetch team data
          if (profileData.data.vitStudent?.teamId) {
            const teamRes = await fetch('/api/team/get');
            if (!teamRes.ok) throw new Error('Failed to fetch team');
            const teamData = await teamRes.json();
            
            if (teamData.success && teamData.data) {
              setTeamData(teamData.data);
              
              // Populate form with existing team data
              setFormData({
                track: teamData.data.track || '',
                title: teamData.data.projectTitle || '',
                github: teamData.data.githubLink || '',
                figma: teamData.data.figmaLink || '',
                miscLinks: teamData.data.otherLinks || '',
                ppt: teamData.data.pptLink || '',
                description: teamData.data.projectDescription || '',
                progress: teamData.data.progressNote || ''
              });

              // Fetch QR code for team
              try {
                const qrRes = await fetch(`/api/team/qr?code=${teamData.data.code}`);
                if (qrRes.ok) {
                  const qrData = await qrRes.json();
                  if (qrData.success && qrData.data?.qrCode) {
                    setQrCodeUrl(qrData.data.qrCode);
                  }
                }
              } catch (qrErr) {
                console.error('Failed to fetch QR code:', qrErr);
              }
            }
          } else {
            // No team yet - clear team data
            setTeamData(null);
            setQrCodeUrl(null);
          }
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user) {
      fetchData();
    }
  }, [session?.user?.email]);

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

  // Guard: don't render dashboard for unauthenticated users
  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <p className="text-white text-lg">Checking your session...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    if (typeof window !== "undefined") {
      router.replace("/login");
    }
    return null;
  }

  const dashboardData = {
    user: {
      name: userProfile?.name || session?.user?.name || 'Participant',
      email: userProfile?.email || session?.user?.email || 'participant@vitstudent.ac.in'
    },
    team: {
      name: teamData?.name || 'No Team',
      id: teamData?.code || 'N/A',
      members: teamData?.vitStudents?.map((student, index) => ({
        name: student.name || student.user?.name || 'Member',
        email: student.user?.email || 'Unknown',
        role: index === 0 ? 'leader' : 'member' // First member is the leader
      })) || []
    }
  };

  const isCurrentUserLeader = React.useMemo(() => {
    const me = dashboardData.team.members.find(
      (m) => m.email === (userProfile?.email || session?.user?.email)
    );
    return me?.role === 'leader';
  }, [dashboardData.team.members, userProfile?.email, session?.user?.email]);

  const handleRemoveMember = async (memberEmail) => {
    if (!isCurrentUserLeader || !memberEmail) return;
    if (!confirm(`Remove ${memberEmail} from the team?`)) return;

    try {
      setMemberActionLoading(true);
      setError(null);

      const res = await fetch('/api/team/remove-member', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberEmail }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to remove member');
      }

      // Refresh team data
      const teamRes = await fetch('/api/team/get');
      const teamJson = await teamRes.json();
      if (teamRes.ok && teamJson.success && teamJson.data) {
        setTeamData(teamJson.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to remove member');
      console.error('Remove member error:', err);
    } finally {
      setMemberActionLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!teamData?.id) {
      setError('You must be part of a team to submit');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccessMessage(null);

      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teamId: teamData.id,
          projectTitle: formData.title,
          projectDescription: formData.description,
          track: formData.track,
          githubLink: formData.github || null,
          figmaLink: formData.figma || null,
          pptLink: formData.ppt || null,
          otherLinks: formData.miscLinks || null,
          progressNote: formData.progress || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Submission failed');
      }

      setSuccessMessage(data.message || 'Submission saved successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err.message);
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const handleResetTeam = async () => {
    try {
      setIsResetting(true);
      setError(null);

      const response = await fetch('/api/team/leave', {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to leave team');
      }

      // Redirect to setup/team
      router.push('/setup/team');
    } catch (err) {
      setError(err.message);
      console.error('Reset team error:', err);
      setShowResetModal(false);
    } finally {
      setIsResetting(false);
    }
  };

  // Dummy team members data
  return (
    <div
      className="h-screen font-sans overflow-hidden relative flex flex-col"
      style={{
        background:
          'radial-gradient(880px 320px at 30% 30%, rgba(34,197,94,0.20), transparent 62%), radial-gradient(760px 320px at 26% 78%, rgba(34,197,94,0.12), transparent 60%), linear-gradient(180deg, #050705, #0b120c)'
      }}
    >
      {/* Discord Floating Banner - Bottom Right */}
      <a
        href="https://discord.gg/TaFq4KDR"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 group"
      >
        <div 
          className="flex items-center gap-3 px-5 py-3 rounded-full border border-green-500/30 backdrop-blur-md transition-all hover:border-green-500/60 hover:shadow-lg hover:shadow-green-500/20"
          style={{
            background: 'linear-gradient(90deg, rgba(34,197,94,0.15), rgba(34,197,94,0.08))',
          }}
        >
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="white">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
          </div>
          <span className="text-white text-sm font-medium whitespace-nowrap">Find Teammates</span>
        </div>
      </a>

      {/* Top Header */}
      <header className="mx-auto w-full max-w-[1400px] px-6 pt-6 pb-3 flex-shrink-0">
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
                  className="absolute right-0 top-full mt-2 w-[220px] rounded-xl px-4 py-3 z-50"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
                    boxShadow: '0 4px 20px rgba(34,197,94,0.15)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <div className="text-white text-base font-medium leading-tight">{dashboardData.user.name}</div>
                  <div className="text-gray-300 text-xs mt-1">{dashboardData.user.email}</div>
                  <div className="mt-3 space-y-2">
                    <button 
                      onClick={() => router.push('/setup/profile')}
                      className="w-full rounded-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 transition-colors"
                    >
                      Update Profile
                    </button>
                    <button 
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="w-full rounded-full bg-gray-700 hover:bg-gray-800 text-white text-sm font-medium py-2 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1400px] px-6 pb-6 flex-1 overflow-hidden">
        <div className="grid grid-cols-[1fr_380px] gap-6 h-full">
          {/* Main Content */}
          <main className="space-y-4 overflow-y-auto pr-2" style={{scrollbarWidth: 'thin', scrollbarColor: 'rgba(34,197,94,0.3) transparent'}}>
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

            {/* Error and Success Messages */}
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm">
                {error}
              </div>
            )}
            {successMessage && (
              <div className="mb-4 p-3 rounded-lg bg-green-500/20 border border-green-500/50 text-green-200 text-sm">
                {successMessage}
              </div>
            )}
            {!teamData && !isLoading && (
              <div className="mb-4 p-3 rounded-lg bg-yellow-500/20 border border-yellow-500/50 text-yellow-200 text-sm">
                You need to join or create a team before submitting.
              </div>
            )}

            <div className="grid grid-cols-3 gap-10">
              <div className="space-y-5">
                <div>
                  <div className="text-gray-300 text-sm">Track</div>
                  <input
                    type="text"
                    className="mt-2 w-full h-9 rounded-md bg-white/10 px-3 text-gray-200 text-sm outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                    value={formData.track}
                    onChange={(e) => setFormData((p) => ({ ...p, track: e.target.value }))}
                    disabled={!isEditMode}
                  />
                </div>
                <div>
                  <div className="text-gray-300 text-sm">Project Title</div>
                  <input
                    type="text"
                    className="mt-2 w-full h-9 rounded-md bg-white/10 px-3 text-gray-200 text-sm outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                    value={formData.title}
                    onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                    disabled={!isEditMode}
                  />
                </div>
                <div>
                  <div className="text-gray-300 text-sm">Description</div>
                  <textarea
                    className="mt-2 w-full h-28 rounded-md bg-white/10 px-3 py-2 text-gray-200 text-sm resize-none outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                    value={formData.description}
                    onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                    disabled={!isEditMode}
                  />
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="text-gray-300 text-sm">Github Link</div>
                  <input
                    type="text"
                    className="mt-2 w-full h-9 rounded-md bg-white/10 px-3 text-gray-200 text-sm outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                    value={formData.github}
                    onChange={(e) => setFormData((p) => ({ ...p, github: e.target.value }))}
                    disabled={!isEditMode}
                  />
                </div>
                <div>
                  <div className="text-gray-300 text-sm">Figma Link</div>
                  <input
                    type="text"
                    className="mt-2 w-full h-9 rounded-md bg-white/10 px-3 text-gray-200 text-sm outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                    value={formData.figma}
                    onChange={(e) => setFormData((p) => ({ ...p, figma: e.target.value }))}
                    disabled={!isEditMode}
                  />
                </div>
                <div className="pt-8 flex flex-col items-center gap-4">
                  <button
                    className="w-40 h-9 rounded-full bg-gray-500/70 hover:bg-gray-600/70 text-white text-sm transition-colors"
                    onClick={() => {
                      setIsEditMode(!isEditMode);
                      setError(null);
                      setSuccessMessage(null);
                    }}
                    onMouseEnter={(e) => handleButtonHover(e.currentTarget, 1.05)}
                    onMouseLeave={(e) => handleButtonHover(e.currentTarget, 1)}
                  >
                    {isEditMode ? 'Cancel' : 'Edit'}
                  </button>
                  {isEditMode && (
                    <button
                      className="w-40 h-9 rounded-full bg-green-800/60 hover:bg-green-700/60 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handleSubmit}
                      disabled={isSubmitting || !teamData}
                      onMouseEnter={(e) => !isSubmitting && handleButtonHover(e.currentTarget, 1.05)}
                      onMouseLeave={(e) => !isSubmitting && handleButtonHover(e.currentTarget, 1)}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="text-gray-300 text-sm">Miscellaneous Links</div>
                  <input
                    type="text"
                    className="mt-2 w-full h-9 rounded-md bg-white/10 px-3 text-gray-200 text-sm outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                    value={formData.miscLinks}
                    onChange={(e) => setFormData((p) => ({ ...p, miscLinks: e.target.value }))}
                    disabled={!isEditMode}
                  />
                </div>
                <div>
                  <div className="text-gray-300 text-sm">PPT Link</div>
                  <input
                    type="text"
                    className="mt-2 w-full h-9 rounded-md bg-white/10 px-3 text-gray-200 text-sm outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                    value={formData.ppt}
                    onChange={(e) => setFormData((p) => ({ ...p, ppt: e.target.value }))}
                    disabled={!isEditMode}
                  />
                </div>
                <div>
                  <div className="text-gray-300 text-sm">Progress Update</div>
                  <textarea
                    className="mt-2 w-full h-28 rounded-md bg-white/10 px-3 py-2 text-gray-200 text-sm resize-none outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                    value={formData.progress}
                    onChange={(e) => setFormData((p) => ({ ...p, progress: e.target.value }))}
                    placeholder="Describe your current progress..."
                    disabled={!isEditMode}
                  />
                </div>
              </div>
            </div>
          </div>

          </main>

          {/* Sidebar */}
          <aside className="space-y-4 overflow-y-auto pr-2" style={{scrollbarWidth: 'thin', scrollbarColor: 'rgba(34,197,94,0.3) transparent'}}>
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
              {isLoading ? (
                <div className="py-6 text-center text-gray-400 text-sm">
                  Loading team members...
                </div>
              ) : dashboardData.team.members.length > 0 ? (
                dashboardData.team.members.map((member, idx) => (
                  <div
                    key={member.email || idx}
                    className={`flex items-center justify-between py-2.5 ${idx !== dashboardData.team.members.length - 1 ? 'border-b border-white/10' : ''}`}
                  >
                    <div>
                      <div className="text-white text-sm leading-tight">{member.name}</div>
                      <div className="text-gray-400 text-[11px] mt-1 leading-none">{member.email}</div>
                    </div>
                    {member.role === 'leader' ? (
                      <button className="h-7 px-4 rounded-full bg-green-800/60 text-white text-[11px]">
                        Team Leader
                      </button>
                    ) : isCurrentUserLeader ? (
                      <button
                        className="h-7 px-4 rounded-full bg-green-800/45 text-white text-[11px] disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => handleRemoveMember(member.email)}
                        disabled={memberActionLoading}
                        onMouseEnter={(e) => handleButtonHover(e.currentTarget, 1.05)}
                        onMouseLeave={(e) => handleButtonHover(e.currentTarget, 1)}
                      >
                        {memberActionLoading ? 'Removing...' : 'Remove member'}
                      </button>
                    ) : null}
                  </div>
                ))
              ) : (
                <div className="py-6 text-center">
                  <p className="text-gray-400 text-sm mb-4">No team members yet. Create or join a team!</p>
                  <button
                    onClick={() => router.push('/setup/team')}
                    className="px-6 py-2.5 rounded-lg bg-green-600/80 hover:bg-green-600 text-white text-sm font-medium transition-colors"
                    onMouseEnter={(e) => handleButtonHover(e.currentTarget, 1.05)}
                    onMouseLeave={(e) => handleButtonHover(e.currentTarget, 1)}
                  >
                    Create or Join Team
                  </button>
                </div>
              )}
            </div>

            {teamData && (
              <button
                onClick={() => setShowResetModal(true)}
                className="mt-4 w-full py-2.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 text-red-400 text-sm font-medium transition-colors"
                onMouseEnter={(e) => handleButtonHover(e.currentTarget, 1.05)}
                onMouseLeave={(e) => handleButtonHover(e.currentTarget, 1)}
              >
                Leave Team
              </button>
            )}
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
                    onClick={(e) => {
                      if (teamData) {
                        navigator.clipboard.writeText(e.target.value);
                        const originalValue = e.target.value;
                        e.target.value = 'Copied!';
                        setTimeout(() => {
                          e.target.value = originalValue;
                        }, 1500);
                      }
                    }}
                    className="mt-2 w-full h-9 rounded-md bg-white/10 px-3 text-gray-200 text-sm outline-none cursor-pointer hover:bg-white/15 transition-colors"
                  />
                </div>
                <div>
                  <div className="text-gray-300 text-sm">Sharable Link</div>
                  <input
                    type="text"
                    value={teamData ? `http://b3.vinnovateit.com/setup/join?code=${dashboardData.team.id}` : 'Join a team first'}
                    readOnly
                    onClick={(e) => {
                      if (teamData) {
                        navigator.clipboard.writeText(e.target.value);
                        // Optional: Show a brief success message
                        const originalValue = e.target.value;
                        e.target.value = 'Copied to clipboard!';
                        setTimeout(() => {
                          e.target.value = originalValue;
                        }, 1500);
                      }
                    }}
                    className="mt-2 w-full h-9 rounded-md bg-white/10 px-3 text-gray-200 text-sm outline-none cursor-pointer hover:bg-white/15 transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="text-gray-300 text-sm text-right">QR code</div>
                <div 
                  className="mt-2 w-28 h-28 bg-white rounded-sm p-1 flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => qrCodeUrl && setShowQrModal(true)}
                >
                  {qrCodeUrl ? (
                    <img src={qrCodeUrl} alt="Team QR Code" className="w-full h-full" />
                  ) : (
                    <QrCode className="w-20 h-20" color="#111" strokeWidth={2} />
                  )}
                </div>
              </div>
            </div>
          </div>
          </aside>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQrModal && qrCodeUrl && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setShowQrModal(false)}
        >
          <div 
            className="relative bg-white p-6 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-lg font-bold transition-colors"
            >
              ×
            </button>
            <img src={qrCodeUrl} alt="Team QR Code" className="w-96 h-96" />
            <div className="mt-4 text-center">
              <p className="text-gray-700 text-sm font-medium">Team Code: {dashboardData.team.id}</p>
              <p className="text-gray-500 text-xs mt-1">Scan to join the team</p>
            </div>
          </div>
        </div>
      )}

      {/* Reset Team Warning Modal */}
      {showResetModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => !isResetting && setShowResetModal(false)}
        >
          <div 
            className="relative p-8 rounded-2xl max-w-md border-2 border-red-500/50"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
              boxShadow: '0 10px 30px rgba(0,0,0,0.35), 0 4px 22px rgba(239,68,68,0.25)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white">Warning!</h3>
            </div>
            
            <div className="mb-6">
              <p className="text-red-400 font-semibold mb-3 text-lg">This action cannot be undone!</p>
              <p className="text-gray-300 text-sm leading-relaxed mb-2">
                You are about to leave your current team. This will:
              </p>
              <ul className="text-gray-400 text-sm space-y-2 ml-4 list-disc">
                <li>Remove you from the team immediately</li>
                <li>Remove your access to team submissions</li>
                <li>Require you to create or join a new team</li>
                <li>You will lose your current team code</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowResetModal(false)}
                disabled={isResetting}
                className="flex-1 py-3 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onMouseEnter={(e) => !isResetting && handleButtonHover(e.currentTarget, 1.05)}
                onMouseLeave={(e) => !isResetting && handleButtonHover(e.currentTarget, 1)}
              >
                Cancel
              </button>
              <button
                onClick={handleResetTeam}
                disabled={isResetting}
                className="flex-1 py-3 rounded-lg bg-red-600/80 hover:bg-red-600 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onMouseEnter={(e) => !isResetting && handleButtonHover(e.currentTarget, 1.05)}
                onMouseLeave={(e) => !isResetting && handleButtonHover(e.currentTarget, 1)}
              >
                {isResetting ? 'Leaving...' : 'Leave Team'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
