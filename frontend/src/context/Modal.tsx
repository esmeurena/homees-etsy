import { useRef, useState, useContext, createContext } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';


interface IModalContextProps {
  value: string;
  updateValue: (newValue: string) => void;
  modalRef?: any;
  modalContent?:any;
  closeModal?: any;
  setModalContent?: any;
  setOnModalClose?: any;
}

interface IModalProviderProps {
  children: any
}

interface IModalClose {
  onModalClose: any;
  setOnModalClose: React.Dispatch<React.SetStateAction<null>>
}


const ModalContext = createContext<IModalContextProps>({
  value: "",
  updateValue: () => {}
});


export function ModalProvider({ children }: IModalProviderProps):JSX.Element {
  const modalRef:any = useRef();
  const [modalContent, setModalContent] = useState(null);
  // callback function that will be called when modal is closing
  const [onModalClose, setOnModalClose] = useState<IModalClose | any>(null);

  const closeModal = () => {
    setModalContent(null); // clear the modal contents
    // If callback function is truthy, call the callback function and reset it
    // to null:
    if (typeof onModalClose === 'function') {
      setOnModalClose(null);
      onModalClose()
    }
  };

  const contextValue:any = {
    modalRef, // reference to modal div
    modalContent, // React component to render inside modal
    setModalContent, // function to set the React component to render inside modal
    setOnModalClose, // function to set the callback function called when modal is closing
    closeModal // function to close the modal
  };

  return (
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal() {
  const { modalRef, modalContent, closeModal } = useContext(ModalContext);
  // If there is no div referenced by the modalRef or modalContent is not a
  // truthy value, render nothing:
  if (!modalRef || !modalRef.current || !modalContent) return null;

  // Render the following component to the div referenced by the modalRef
  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={closeModal} />
      <div id="modal-content">
        {modalContent}
      </div>
    </div>,
    modalRef.current
  );
}

export const useModal = () => useContext(ModalContext);
