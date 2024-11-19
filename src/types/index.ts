export interface PropsForm {
    password: string;
    email: string;
}

export enum StatusProps {
    CAUTGHT = 'CAUTGHT',
    REQUIRED = 'REQUIRED',
    DELETE = 'DELETE',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
    PENDING = 'PENDING',
    DOWNLOAD = 'DOWNLOAD',
  }