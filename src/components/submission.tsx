"use client";

import { useEffect, useState } from "react";

interface SubmissionFormData {
  githubLink: string;
  figmaLink: string;
  pptLink: string;
  otherLinks: string;
  progressNote: string;
}

interface TeamInfo {
  track?: string | null;
  projectTitle?: string | null;
  projectDescription?: string | null;
  roundNo: number;
}

interface SubmissionBoxProps {
  teamId: string;
  roundNo: number;
  initialLinks: SubmissionFormData;
  isLocked?: boolean;
  teamInfo?: TeamInfo;
}

interface SubmissionError {
  github?: string;
  figma?: string;
  ppt?: string;
  other?: string;
}

type MessageType = "success" | "error" | null;

export default function SubmissionBox({
  teamId,
  roundNo,
  initialLinks,
  isLocked = false,
  teamInfo,
}: SubmissionBoxProps) {
  const [form, setForm] = useState<SubmissionFormData>(initialLinks);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<MessageType>(null);
  const [validationErrors, setValidationErrors] = useState<SubmissionError>({});

  useEffect(() => {
    setForm(initialLinks);
    setValidationErrors({});
    setMessage(null);
  }, [initialLinks]);

  const handleChange = (
    key: keyof SubmissionFormData,
    value: string
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Clear validation error for this field when user starts editing
    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[key as keyof SubmissionError];
      return newErrors;
    });
  };

  const handleSave = async () => {
    if (isLocked) return;

    setSaving(true);
    setMessage(null);
    setValidationErrors({});

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamId,
          roundNo,
          githubLink: form.githubLink.trim(),
          figmaLink: form.figmaLink.trim(),
          pptLink: form.pptLink.trim(),
          otherLinks: form.otherLinks.trim(),
          progressNote: form.progressNote.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors from server
        if (data.errors) {
          setValidationErrors(data.errors);
          setMessage(data.message || "Please fix the validation errors below");
          setMessageType("error");
        } else {
          setMessage(
            data.message || "Failed to save submission. Please try again."
          );
          setMessageType("error");
        }
        return;
      }

      setMessage("Links saved successfully!");
      setMessageType("success");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong";
      setMessage(errorMessage);
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  };

  const getInputClass = (fieldName: keyof SubmissionError) => {
    const hasError = validationErrors[fieldName];
    return hasError ? "input-error" : "";
  };

  return (
    <div className="submissionBox">

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>

        <div className="form-group">
          <label htmlFor="track">Track</label>
          <input
            id="track"
            type="text"
            value={teamInfo?.track || ""}
            disabled
            style={{ opacity: 0.6 }}
            placeholder="—"
          />
        </div>

        <div className="form-group">
          <label htmlFor="github">Github Link</label>
          <input
            id="github"
            type="url"
            placeholder="https://github.com/username/repo"
            value={form.githubLink}
            disabled={isLocked || saving}
            onChange={(e) => handleChange("githubLink", e.target.value)}
            className={getInputClass("github")}
          />
          {validationErrors.github && (
            <span className="error-message">{validationErrors.github}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="other">Miscellaneous Links</label>
          <input
            id="other"
            type="url"
            placeholder="https://..."
            value={form.otherLinks}
            disabled={isLocked || saving}
            onChange={(e) => handleChange("otherLinks", e.target.value)}
            className={getInputClass("other")}
          />
          {validationErrors.other && (
            <span className="error-message">{validationErrors.other}</span>
          )}
        </div>
      </div>


      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>

        <div className="form-group">
          <label htmlFor="projectTitle">Project Title</label>
          <input
            id="projectTitle"
            type="text"
            value={teamInfo?.projectTitle || ""}
            disabled
            style={{ opacity: 0.6 }}
            placeholder="—"
          />
        </div>

 
        <div className="form-group">
          <label htmlFor="figma">Figma Link</label>
          <input
            id="figma"
            type="url"
            placeholder="https://www.figma.com/file/..."
            value={form.figmaLink}
            disabled={isLocked || saving}
            onChange={(e) => handleChange("figmaLink", e.target.value)}
            className={getInputClass("figma")}
          />
          {validationErrors.figma && (
            <span className="error-message">{validationErrors.figma}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="ppt">PPT Link</label>
          <input
            id="ppt"
            type="url"
            placeholder="https://docs.google.com/presentation/..."
            value={form.pptLink}
            disabled={isLocked || saving}
            onChange={(e) => handleChange("pptLink", e.target.value)}
            className={getInputClass("ppt")}
          />
          {validationErrors.ppt && (
            <span className="error-message">{validationErrors.ppt}</span>
          )}
        </div>
      </div>

   
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
     
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={teamInfo?.projectDescription || ""}
            disabled
            style={{
              opacity: 0.6,
              minHeight: "100px",
              padding: "0.75rem",
              border: "1px solid #26335c",
              borderRadius: "6px",
              background: "#0f162e",
              color: "#e8ecf5",
              fontFamily: "inherit",
              fontSize: "0.875rem",
              resize: "none",
            }}
            placeholder="—"
          />
        </div>

      
        <div className="form-group">
          <label htmlFor="progress">Progress in R{teamInfo?.roundNo || roundNo}</label>
          <textarea
            id="progress"
            value={form.progressNote}
            disabled={isLocked || saving}
            onChange={(e) => handleChange("progressNote", e.target.value)}
            placeholder={`Write your progress for Round ${teamInfo?.roundNo || roundNo}...`}
            style={{
              minHeight: "100px",
              padding: "0.75rem",
              border: "1px solid #26335c",
              borderRadius: "6px",
              background: "#0f162e",
              color: "#e8ecf5",
              fontFamily: "inherit",
              fontSize: "0.875rem",
              resize: "vertical",
            }}
          />
        </div>
      </div>


      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "1.5rem",
        }}
      >
        <button
          onClick={() => setForm(initialLinks)}
          disabled={isLocked || saving}
          style={{
            padding: "0.75rem 2rem",
            borderRadius: "6px",
            border: "1px solid #26335c",
            background: "#0f162e",
            color: "#e8ecf5",
            cursor: isLocked || saving ? "not-allowed" : "pointer",
            opacity: isLocked || saving ? 0.5 : 1,
          }}
        >
          Edit
        </button>
        <button
          onClick={handleSave}
          disabled={isLocked || saving}
          aria-busy={saving}
          style={{
            padding: "0.75rem 2rem",
            borderRadius: "6px",
            border: "none",
            background: "#10b981",
            color: "#0f162e",
            fontWeight: 600,
            cursor: isLocked || saving ? "not-allowed" : "pointer",
            opacity: isLocked || saving ? 0.5 : 1,
          }}
        >
          {saving ? "Saving..." : "Submit"}
        </button>
      </div>

      {message && (
        <span
          style={{
            display: "block",
            textAlign: "center",
            color: messageType === "success" ? "#10b981" : "#ef4444",
            fontSize: "0.875rem",
            marginTop: "0.75rem",
          }}
        >
          {message}
        </span>
      )}
    </div>
  );
}
