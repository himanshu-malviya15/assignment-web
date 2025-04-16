import SmallCardIcon1 from "@/components/images/small-card-icon-1.png";
import SmallCardIcon2 from "@/components/images/small-card-icon-2.png";
import SmallCardIcon3 from "@/components/images/small-card-icon-3.png";

export const issueTexts = [
  "Wasting valuable analyst time on false positives",
  "Processing one alert at a time, missing the big picture",
  "More time fixing SOAR automation, less time on real threats",
  "Wasting valuable analyst time on false positives",
  "Processing one alert at a time, missing the big picture",
  "More time fixing SOAR automation, less time on real threats",
];

export const SmallCardIcons = [SmallCardIcon1, SmallCardIcon2, SmallCardIcon3];

export const ignoredAlertExamples = [
  "Network scan from internal IP",
  "DNS lookup for rare domain",
  "Failed login attempt",
  "Port scan detected",
  "Unclassified network traffic",
  "Unusual process activity",
  "Large file transfer",
  "Antivirus update",
  "New device connected",
  "Authentication timeout",
];

export const wronglyClosedExamples = [
  "False positive malware alert",
  "Legitimate access marked suspicious",
  "Normal traffic pattern flagged",
  "Dev testing identified as attack",
  "VPN connection mistaken for breach",
];

export const activeThreatsExamples = [
  "Phishing attempt detected",
  "Brute force attack",
  "Potential data exfiltration",
  "Command and control traffic",
  "Ransomware indicators",
];
