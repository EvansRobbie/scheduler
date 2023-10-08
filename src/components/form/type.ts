export interface formProps {
  control: string;
  name: string;
  label?: string;
  more?: string;
  placeholder?: string;
  required?: boolean;
  options?: {
    key: string;
    value: string;
    more?: string;
  }[];
  type?: string;
}
export interface fieldProps {
  name: string;
  label?: string;
  more?: string;
  placeholder?: string;
  required?: boolean;
  options?: {
    key: string;
    value: string;
    more?: string;
  }[];
}
// user details props
export interface dataProps {
  checkout_id: string;
  user: {
    ID: string;
    phone_number: string;
  };
}
