export interface ModalOperationHook {
    modalOperation: string,
    changeModalOperation: (newModalOperation: string) => void
}