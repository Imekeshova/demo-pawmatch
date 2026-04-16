export interface Swipe {
  id: number;
  animal: number;
  isLike: boolean;
  createdAt: string;
}

export interface SwipeResponse {
  status: 'swiped' | 'matched';
  match?: any;
}
