export interface AuditDetails {
  title_quality: string;
  meta_quality: string;
  heading_structure: string;
  image_seo: string;
  page_speed: string;
  content_depth: string;
}

export interface AuditReport {
  score: number;
  impression: string;
  issues: string[];
  fixes: string[];
  details: AuditDetails;
}

export interface AuditResponse {
  report: AuditReport;
}
