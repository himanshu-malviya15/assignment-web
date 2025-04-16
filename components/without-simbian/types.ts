export type AlertType =
  | "Phishing Email"
  | "Suspicious Login"
  | "Malware Detected"
  | "Data Breach"
  | "Unusual Traffic"
  | "Failed Authentication";

export type AlertSeverity = "Low" | "Medium" | "High" | "Critical";

export interface Alert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  timestamp: Date;
}

export interface SmallAlert {
  id: number;
  icon: any;
}
// components/WithoutSimbian/types.ts
export interface SmallAlertProps {
  index: number;
  icon: any;
  startRef: React.RefObject<HTMLDivElement>; // No null allowed
  targetRef: React.RefObject<HTMLDivElement>; // No null allowed
  onAnimationComplete?: () => void;
  delay?: number;
}

export interface WithoutSimbianProps {
  standalone?: boolean;
}

export interface AlertCardProps {
  title: string;
  initialCount: number;
  icon: React.FC;
  count?: number;
  isActive?: boolean;
  onReceiveAlert?: () => void;
  countRef: React.RefObject<HTMLDivElement | null>;
}

export interface IssueCardProps {
  icon: React.FC;
  text: string;
  key: number;
  isRemoving?: boolean;
}
