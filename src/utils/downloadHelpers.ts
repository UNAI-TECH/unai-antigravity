import JSZip from "jszip";
import { JobApplication, EventRegistration, Job } from "@/context/DataContext";

/**
 * Trigger download of an in-memory Blob
 */
export const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
};

/**
 * Download a remote file (such as a PDF resume) to local machine with a specified filename.
 * Attempts fetch first for custom naming; falls back to direct browser link click if CORS restricts fetch.
 */
export const downloadFileFromUrl = async (url: string, suggestedFilename: string): Promise<boolean> => {
    try {
        const response = await fetch(url, { mode: 'cors' });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const blob = await response.blob();
        downloadBlob(blob, suggestedFilename);
        return true;
    } catch (err) {
        console.warn("Direct blob fetch failed (likely CORS), falling back to browser navigation download:", err);
        const link = document.createElement("a");
        link.href = url;
        link.download = suggestedFilename;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return false;
    }
};

/**
 * Format CSV cell according to RFC 4180
 */
const escapeCSVCell = (val: string | number | boolean | null | undefined): string => {
    if (val === null || val === undefined) return '""';
    const stringVal = String(val);
    // If contains double quotes, commas, or line breaks, enclose in double quotes and escape internal quotes
    if (stringVal.includes('"') || stringVal.includes(',') || stringVal.includes('\n') || stringVal.includes('\r')) {
        return `"${stringVal.replace(/"/g, '""')}"`;
    }
    return `"${stringVal}"`;
};

/**
 * Export table data to CSV file with UTF-8 BOM for full Excel / Sheets compatibility
 */
export const exportToCSV = (
    filename: string,
    headers: string[],
    rows: (string | number | boolean | null | undefined)[][]
) => {
    const headerLine = headers.map(escapeCSVCell).join(",");
    const rowsLines = rows.map(row => row.map(escapeCSVCell).join(","));
    const csvContent = "\uFEFF" + [headerLine, ...rowsLines].join("\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const finalFilename = filename.toLowerCase().endsWith(".csv") ? filename : `${filename}.csv`;
    downloadBlob(blob, finalFilename);
};

/**
 * Format answers dictionary into human-readable string for CSV
 */
const formatAnswersToString = (answers: any): string => {
    if (!answers) return "None";
    if (typeof answers === "string") return answers;
    if (typeof answers === "object") {
        try {
            return Object.entries(answers)
                .map(([q, a]) => `${q}: ${Array.isArray(a) ? a.join(", ") : String(a)}`)
                .join(" | ");
        } catch {
            return JSON.stringify(answers);
        }
    }
    return String(answers);
};

/**
 * Sanitize filename strings
 */
export const sanitizeFileName = (name: string): string => {
    return name.replace(/[^a-zA-Z0-9_\-\s]/g, "").trim().replace(/\s+/g, "_");
};

/**
 * Export a list of Job Applications to CSV
 */
export const exportJobApplicationsCSV = (
    applications: JobApplication[],
    positions: Job[] = [],
    customFilename?: string
) => {
    if (!applications || applications.length === 0) return;

    const headers = [
        "Application ID",
        "Applicant Name",
        "Email",
        "Phone",
        "Position / Role",
        "Department / Type",
        "Status",
        "Applied Timestamp",
        "Applied Timestamp (ISO)",
        "Resume URL",
        "Questionnaire Responses"
    ];

    const rows = applications.map(app => {
        const position = positions.find(p => p.id === app.job_id);
        const positionTitle = position?.title || "Unknown Position";
        const positionDept = position?.department || position?.type || "General";
        const appliedDate = app.created_at ? new Date(app.created_at).toLocaleString() : "N/A";
        const appliedISO = app.created_at || "N/A";
        const answersStr = formatAnswersToString(app.answers);

        return [
            app.id,
            app.applicant_name,
            app.email,
            app.phone,
            positionTitle,
            positionDept,
            app.status.toUpperCase(),
            appliedDate,
            appliedISO,
            app.resume_url || "No Resume Provided",
            answersStr
        ];
    });

    const dateStr = new Date().toISOString().split("T")[0];
    const filename = customFilename || `UNAI_Applications_${dateStr}.csv`;
    exportToCSV(filename, headers, rows);
};

/**
 * Export Event Registrations to CSV
 */
export const exportEventRegistrationsCSV = (
    registrations: EventRegistration[],
    eventTitle?: string,
    customFilename?: string
) => {
    if (!registrations || registrations.length === 0) return;

    const headers = [
        "Registration ID",
        "Event Title",
        "Attendee Name",
        "Email",
        "Phone",
        "Registered Timestamp",
        "Registered Timestamp (ISO)",
        "Form Responses"
    ];

    const rows = registrations.map(reg => {
        const regDate = reg.created_at ? new Date(reg.created_at).toLocaleString() : "N/A";
        const regISO = reg.created_at || "N/A";
        const answersStr = formatAnswersToString(reg.answers);

        return [
            reg.id,
            eventTitle || "Event",
            reg.applicant_name,
            reg.email,
            reg.phone,
            regDate,
            regISO,
            answersStr
        ];
    });

    const safeTitle = eventTitle ? sanitizeFileName(eventTitle) : "Event";
    const dateStr = new Date().toISOString().split("T")[0];
    const filename = customFilename || `${safeTitle}_Registrations_${dateStr}.csv`;
    exportToCSV(filename, headers, rows);
};

/**
 * Generates an applicant profile text card
 */
const generateApplicantProfileText = (app: JobApplication, position?: Job): string => {
    const lines = [
        "==================================================",
        "          UNAI APPLICATION DETAILS                ",
        "==================================================",
        `Candidate Name : ${app.applicant_name}`,
        `Email Address  : ${app.email}`,
        `Phone Number   : ${app.phone}`,
        `Position Applied: ${position?.title || "Position ID: " + app.job_id}`,
        `Department/Type: ${position?.department || position?.type || "N/A"}`,
        `Application ID : ${app.id}`,
        `Submission Date: ${app.created_at ? new Date(app.created_at).toLocaleString() : "N/A"}`,
        `Current Status : ${app.status.toUpperCase()}`,
        `Resume URL     : ${app.resume_url || "None provided"}`,
        "",
        "---------------- QUESTIONNAIRE RESPONSES ----------------",
    ];

    if (app.answers && typeof app.answers === "object") {
        Object.entries(app.answers).forEach(([q, a], idx) => {
            lines.push(`Q${idx + 1}: ${q}`);
            lines.push(`A: ${Array.isArray(a) ? a.join(", ") : String(a)}`);
            lines.push("");
        });
    } else {
        lines.push("No questionnaire responses provided.");
    }

    lines.push("==================================================");
    lines.push("Generated from UNAI Admin Portal");
    return lines.join("\r\n");
};

/**
 * Downloads a complete single application profile as a formatted document or opens print view
 */
export const printOrDownloadApplicationProfile = (app: JobApplication, position?: Job) => {
    const positionTitle = position?.title || "Position Application";
    const positionDept = position?.department || position?.type || "General";
    const dateStr = app.created_at ? new Date(app.created_at).toLocaleString() : "N/A";
    
    // Answers formatted HTML
    let answersHtml = "<p style='color: #64748b;'>No additional questions answered.</p>";
    if (app.answers && typeof app.answers === "object" && Object.keys(app.answers).length > 0) {
        answersHtml = Object.entries(app.answers).map(([q, a]) => `
            <div style="margin-bottom: 16px; padding: 12px; background: #f8fafc; border-left: 4px solid #3b82f6; border-radius: 4px;">
                <p style="margin: 0 0 6px 0; font-weight: 600; color: #1e293b; font-size: 14px;">${escapeHtml(q)}</p>
                <p style="margin: 0; color: #334155; font-size: 14px;">${escapeHtml(Array.isArray(a) ? a.join(", ") : String(a))}</p>
            </div>
        `).join("");
    }

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Application - ${escapeHtml(app.applicant_name)}</title>
        <meta charset="utf-8" />
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 40px; color: #0f172a; line-height: 1.5; background: #fff; }
            .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 24px; }
            .logo { font-size: 24px; font-weight: 800; letter-spacing: 2px; color: #2563eb; }
            .badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase; background: #e0f2fe; color: #0284c7; }
            .badge-pending { background: #fef3c7; color: #d97706; }
            .badge-approved { background: #dcfce7; color: #16a34a; }
            .badge-rejected { background: #fee2e2; color: #dc2626; }
            .section { margin-bottom: 28px; }
            .section-title { font-size: 16px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
            .field-label { font-size: 12px; text-transform: uppercase; color: #64748b; font-weight: 600; margin-bottom: 4px; }
            .field-value { font-size: 16px; font-weight: 600; color: #0f172a; }
            .btn-print { background: #2563eb; color: #fff; border: none; padding: 10px 18px; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: 600; margin-bottom: 20px; }
            @media print {
                .btn-print { display: none; }
                body { margin: 20mm; }
            }
        </style>
    </head>
    <body>
        <button class="btn-print" onclick="window.print()">🖨️ Print or Save as PDF</button>
        <div class="header">
            <div>
                <div class="logo">UNAI CANDIDATE APPLICATION</div>
                <h1 style="margin: 8px 0 0 0; font-size: 22px; color: #1e293b;">${escapeHtml(positionTitle)}</h1>
                <p style="margin: 4px 0 0 0; color: #64748b; font-size: 14px;">Department: ${escapeHtml(positionDept)}</p>
            </div>
            <div style="text-align: right;">
                <span class="badge badge-${escapeHtml(app.status)}">${escapeHtml(app.status)}</span>
                <p style="margin: 8px 0 0 0; font-size: 12px; color: #64748b;">Applied: ${escapeHtml(dateStr)}</p>
                <p style="margin: 2px 0 0 0; font-size: 11px; color: #94a3b8;">ID: ${escapeHtml(app.id)}</p>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Personal & Contact Information</div>
            <div class="grid">
                <div>
                    <div class="field-label">Full Name</div>
                    <div class="field-value">${escapeHtml(app.applicant_name)}</div>
                </div>
                <div>
                    <div class="field-label">Email Address</div>
                    <div class="field-value">${escapeHtml(app.email)}</div>
                </div>
                <div>
                    <div class="field-label">Phone Number</div>
                    <div class="field-value">${escapeHtml(app.phone)}</div>
                </div>
                <div>
                    <div class="field-label">Resume Attachment</div>
                    <div class="field-value">
                        ${app.resume_url ? `<a href="${app.resume_url}" target="_blank" style="color: #2563eb; text-decoration: underline;">View / Open Resume</a>` : '<span style="color: #94a3b8;">No resume provided</span>'}
                    </div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Questionnaire & Candidate Responses</div>
            ${answersHtml}
        </div>

        <div style="margin-top: 40px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; display: flex; justify-content: space-between;">
            <span>UNAI Admin Portal — Confidential Candidate Record</span>
            <span>Generated on ${new Date().toLocaleString()}</span>
        </div>
    </body>
    </html>
    `;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(htmlContent);
        printWindow.document.close();
    } else {
        // Pop-up blocked, fallback to downloading HTML file
        const blob = new Blob([htmlContent], { type: "text/html" });
        downloadBlob(blob, `Application_${sanitizeFileName(app.applicant_name)}_${sanitizeFileName(positionTitle)}.html`);
    }
};

const escapeHtml = (unsafe: string): string => {
    return String(unsafe)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};

/**
 * Bulk Download Resumes as ZIP with included Summary CSV and candidate profiles
 */
export const downloadApplicationsZip = async (
    applications: JobApplication[],
    positions: Job[] = [],
    zipFilename?: string,
    onProgress?: (current: number, total: number, message: string) => void
): Promise<{ success: number; failed: number }> => {
    if (!applications || applications.length === 0) {
        return { success: 0, failed: 0 };
    }

    const zip = new JSZip();
    const total = applications.length;
    let successCount = 0;
    let failedCount = 0;

    // 1. Generate Applications_Summary.csv inside the ZIP
    const headers = [
        "Application ID",
        "Applicant Name",
        "Email",
        "Phone",
        "Position",
        "Status",
        "Applied Date",
        "Resume Filename",
        "Resume URL"
    ];

    const rows: string[][] = [];

    // Folders inside ZIP
    const resumesFolder = zip.folder("resumes");
    const profilesFolder = zip.folder("profiles");

    onProgress?.(0, total, "Preparing package...");

    for (let i = 0; i < applications.length; i++) {
        const app = applications[i];
        const position = positions.find(p => p.id === app.job_id);
        const positionTitle = position?.title || "Position";
        const cleanName = sanitizeFileName(app.applicant_name) || `Applicant_${i + 1}`;
        const appliedDate = app.created_at ? new Date(app.created_at).toLocaleString() : "N/A";

        onProgress?.(i + 1, total, `Processing ${app.applicant_name} (${i + 1}/${total})...`);

        // Create individual text profile in ZIP
        const profileText = generateApplicantProfileText(app, position);
        profilesFolder?.file(`${cleanName}_Profile.txt`, profileText);

        let resumeFileNameInZip = "No Resume Provided";

        if (app.resume_url && app.resume_url.trim() !== "") {
            try {
                // Determine extension from url or fallback to pdf
                const urlParts = app.resume_url.split("?")[0].split(".");
                const ext = urlParts.length > 1 ? urlParts[urlParts.length - 1].toLowerCase() : "pdf";
                const safeExt = ["pdf", "docx", "doc", "rtf", "txt", "png", "jpg", "jpeg"].includes(ext) ? ext : "pdf";
                resumeFileNameInZip = `${cleanName}_Resume_${app.id.slice(0, 6)}.${safeExt}`;

                const response = await fetch(app.resume_url, { mode: 'cors' });
                if (response.ok) {
                    const blob = await response.blob();
                    resumesFolder?.file(resumeFileNameInZip, blob);
                    successCount++;
                } else {
                    throw new Error(`Status ${response.status}`);
                }
            } catch (err) {
                console.warn(`Could not fetch resume for ${app.applicant_name} directly:`, err);
                // Note the resume URL in a fallback text note inside resumes folder
                resumesFolder?.file(
                    `${cleanName}_Resume_Link.txt`,
                    `Resume URL for ${app.applicant_name}:\n${app.resume_url}\n\nNote: Direct browser download was restricted. Click the link above to view/download.`
                );
                resumeFileNameInZip = `${cleanName}_Resume_Link.txt (Link Saved)`;
                failedCount++;
            }
        } else {
            resumeFileNameInZip = "None";
        }

        rows.push([
            app.id,
            app.applicant_name,
            app.email,
            app.phone,
            positionTitle,
            app.status.toUpperCase(),
            appliedDate,
            resumeFileNameInZip,
            app.resume_url || "N/A"
        ]);
    }

    // Add Summary CSV to root of ZIP
    const headerLine = headers.map(escapeCSVCell).join(",");
    const rowsLines = rows.map(row => row.map(escapeCSVCell).join(","));
    const summaryCSV = "\uFEFF" + [headerLine, ...rowsLines].join("\r\n");
    zip.file("Applications_Summary.csv", summaryCSV);

    // Add a README to the ZIP
    zip.file(
        "README.txt",
        `UNAI APPLICATIONS EXPORT PACKAGE
=================================
Exported Date: ${new Date().toLocaleString()}
Total Candidates: ${total}

Folders:
- /resumes  : Candidate resume files
- /profiles : Detailed text profiles with questionnaire responses
- Applications_Summary.csv : Complete spreadsheet index of all candidates
`
    );

    onProgress?.(total, total, "Compressing ZIP archive...");

    const zipBlob = await zip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: { level: 6 }
    });

    const dateStr = new Date().toISOString().split("T")[0];
    const finalZipName = zipFilename || `UNAI_Applications_Package_${dateStr}.zip`;
    downloadBlob(zipBlob, finalZipName);

    return { success: successCount, failed: failedCount };
};
