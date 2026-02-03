
// validates if a string is a valid URL

export function isValidUrl(url: string): boolean {
  if (!url || typeof url !== "string") return false;
  
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// validates GitHub repository URLs
// Accepts formats: https://github.com/username/repo or https://github.com/username/repo/
export function isValidGitHubUrl(url: string): boolean {
  if (!url) return true; // Optional field
  if (!isValidUrl(url)) return false;
  
  const githubRegex = /^https:\/\/github\.com\/[\w\-]+\/[\w\.\-]+\/?$/;
  return githubRegex.test(url);
}

/**
 * Validates Figma file URLs
 * Accepts: https://www.figma.com/file/...
 */
export function isValidFigmaUrl(url: string): boolean {
  if (!url) return true; // Optional field
  if (!isValidUrl(url)) return false;
  
  const figmaRegex = /^https:\/\/(www\.)?figma\.com\/file\/.+/;
  return figmaRegex.test(url);
}

// validates presentation URLs (Google Drive, Dropbox, OneDrive, etc.)
export function isValidPptUrl(url: string): boolean {
  if (!url) return true; // Optional field
  if (!isValidUrl(url)) return false;
  
  // Accept Google Drive, Dropbox, OneDrive, and other common sources
  const pptRegex = /^https:\/\/(docs\.google\.com|drive\.google\.com|dropbox\.com|1drv\.ms|onedrive\.live\.com).+/;
  return pptRegex.test(url);
}

// validates any URL (for other links)
export function isValidOtherUrl(url: string): boolean {
  if (!url) return true; // Optional field
  return isValidUrl(url);
}

// sanitizes and validates submission links
// @returns Object with validation results and cleaned URLs
export interface SubmissionLinksValidation {
  isValid: boolean;
  errors: {
    github?: string;
    figma?: string;
    ppt?: string;
    other?: string;
  };
  cleanedLinks: {
    githubLink: string;
    figmaLink: string;
    pptLink: string;
    otherLinks: string;
  };
}

export function validateSubmissionLinks(links: {
  githubLink?: string | null;
  figmaLink?: string | null;
  pptLink?: string | null;
  otherLinks?: string | null;
}): SubmissionLinksValidation {
  const errors: SubmissionLinksValidation["errors"] = {};
  const cleanedLinks = {
    githubLink: links.githubLink?.trim() || "",
    figmaLink: links.figmaLink?.trim() || "",
    pptLink: links.pptLink?.trim() || "",
    otherLinks: links.otherLinks?.trim() || "",
  };

  // Validate GitHub link
  if (cleanedLinks.githubLink && !isValidGitHubUrl(cleanedLinks.githubLink)) {
    errors.github = "Invalid GitHub URL. Please use format: https://github.com/username/repo";
  }

  // Validate Figma link
  if (cleanedLinks.figmaLink && !isValidFigmaUrl(cleanedLinks.figmaLink)) {
    errors.figma = "Invalid Figma URL. Please use a valid Figma file link.";
  }

  // Validate PPT link
  if (cleanedLinks.pptLink && !isValidPptUrl(cleanedLinks.pptLink)) {
    errors.ppt = "Invalid presentation link. Please use Google Drive, Dropbox, OneDrive, or similar.";
  }

  // Validate other links
  if (cleanedLinks.otherLinks && !isValidOtherUrl(cleanedLinks.otherLinks)) {
    errors.other = "Invalid URL format.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    cleanedLinks,
  };
}
