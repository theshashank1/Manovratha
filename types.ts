
export interface Vertical {
  id: number;
  title: string;
  desc: string;
  list: string[];
  icon: string;
  color: string;
}

export type MoodType = 'Struggling' | 'Okay' | 'Good' | 'Great';

export interface MoodResponse {
  message: string;
  advice: string;
}

export type PageType = 'home' | 'students' | 'corporate' | 'community' | 'join';

export interface InquiryForm {
  name: string;
  email: string;
  type: 'professional' | 'student' | 'corporate' | 'intern';
  message: string;
}
