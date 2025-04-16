export interface Alert {
  id: string;
  type: string;
  severity: "low" | "medium" | "high" | "critical";
  timestamp: string;
  source: string;
  description: string;
}

export const alertTypes = [
  "Phishing Email",
  "Suspicious Login",
  "Malware Detected",
  "Unusual Network Activity",
  "Unauthorized Access Attempt",
  "Data Exfiltration",
  "Privilege Escalation",
  "Brute Force Attack",
  "DDoS Attack",
  "SQL Injection Attempt",
  "Cross-Site Scripting",
  "Ransomware Activity",
  "Command & Control Traffic",
  "Insider Threat Activity",
  "Compromised Credentials",
];

export const alertSources = [
  "Endpoint Protection",
  "Network IDS",
  "Email Gateway",
  "Web Proxy",
  "Firewall",
  "SIEM",
  "Cloud Security",
  "User Behavior Analytics",
  "Threat Intelligence",
  "Vulnerability Scanner",
];

export function generateRandomAlert(): Alert {
  const type = alertTypes[Math.floor(Math.random() * alertTypes.length)];
  const source = alertSources[Math.floor(Math.random() * alertSources.length)];
  const severityLevels: Array<"low" | "medium" | "high" | "critical"> = [
    "low",
    "medium",
    "high",
    "critical",
  ];
  const severity =
    severityLevels[Math.floor(Math.random() * severityLevels.length)];

  const now = new Date();
  const timestamp = now.toISOString();

  return {
    id: `alert-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    type,
    severity,
    timestamp,
    source,
    description: `${type} detected from ${source}`,
  };
}

export function generateRandomAlerts(count: number): Alert[] {
  return Array.from({ length: count }, () => generateRandomAlert());
}
