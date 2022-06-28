export interface TextManagement {
  texts: Array<Text>;
  labels: Array<Label>;
  messages: Array<Message>;
  currentLang: string;
  textsFormation: Array<TextFormation>;
}

export interface TextFormation {
  id?: string;
  keyword: string;
  textTransformation: string;
}

export interface Label {
  id?: string;
  keyword: string;
  label: string;
  help: string;
}

export interface Text {
  id?: string;
  keyword: string;
  text: string;
}

export interface Message {
  id?: string;
  keyword: string;
  message: string;
}
