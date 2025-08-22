export interface ComponentAnalysisResult {
  component: string;
  status: 'PASS' | 'FAIL';
  reason: string;
  severity: 'critical' | 'minor';
}
export interface AnalysisResult {
  overall_status: 'PASS' | 'FAIL';
  analysis: ComponentAnalysisResult[];
  fullAnalysisPrompt: string;
}

export interface History {
  id: string;
  timestamp: string;
  site_url: string;
  site_name: string;
  view_type: string;
  user_prompt: string;
  analysis_prompt: string;
  ai_result: AnalysisResult;
  images: {
    baseline: string;
    current: string;
    diff: string;
  };
  totalToken: number;
}

export interface HistoryParam {
  month: Date;
}
