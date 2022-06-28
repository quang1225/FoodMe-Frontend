export interface ICommonStageManager {
  openModal: string | SignUpPopup;
  googleMaps: any;
  isScrolling: boolean;
}

export interface SignUpPopup {
  title: string;
  description: string;
}
