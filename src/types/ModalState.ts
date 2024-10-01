import { ReactNode } from "react";

export type ModalState = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};


export interface IModalComponent {
  closeModal?: () => void;
  closeButtonComponent?: ReactNode;
}