
export interface ContactInputFieldProps {
  id: string;
  label: string;
  type: string;
  name: string;
  autoComplete?: string;
  placeholder?: string;
rows?: number;
className: string;
}

export interface ContactSwitchFieldProps {
  agreed: boolean;
  setAgreed: React.Dispatch<React.SetStateAction<boolean>>;
}


