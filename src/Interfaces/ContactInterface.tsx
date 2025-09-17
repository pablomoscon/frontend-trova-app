export interface ContactInputFieldProps {
  id: string;
  label: string;
  type: 'text' | 'email' | 'textarea' | 'number';
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  autoComplete?: string;
  placeholder?: string;
  rows?: number;
  className: string;
}
export interface ContactSwitchFieldProps {
  agreed: boolean;
  setAgreed: React.Dispatch<React.SetStateAction<boolean>>;
}
