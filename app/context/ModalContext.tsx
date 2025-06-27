import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { Colors } from '@/constants/Colors'
import * as React from 'react'
import { ComponentType, FC, ReactNode, createContext, useContext, useState } from 'react'
import { Modal, StyleSheet, TouchableOpacity } from 'react-native'

type ModalContextType = {
  showLoginModal: () => void;
  hideModal: () => void;
}
 
interface ModalProviderProps {
  children: ReactNode;
  loginComponent: ComponentType;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 20,
    padding: 20,
    boxShadow: '0 2px 3.5px rgba(0, 0, 0, 0.25)', // Updated to use boxShadow
    elevation: 5
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    padding: 5
  }
})

const useModal = () => {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}


const ModalProvider: FC<ModalProviderProps> = ({ children, loginComponent: LoginComponent }) => {
  const [modalVisible, setModalVisible] = useState(false)

  const showLoginModal = () => {
    setModalVisible(true)
  }

  const hideModal = () => {
    setModalVisible(false)
  }

  return (
    <ModalContext.Provider value={{ showLoginModal, hideModal }}>
      {children}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={hideModal}>
        <ThemedView style={styles.centeredView}>
          <ThemedView style={styles.modalView}>
            <TouchableOpacity style={styles.closeButton} onPress={hideModal}>
              <IconSymbol name="chevron.right" size={24} color={Colors.light.tint} />
            </TouchableOpacity>
            <LoginComponent />
          </ThemedView>
        </ThemedView>
      </Modal>
    </ModalContext.Provider>
  )
}
export default ModalContext
export { ModalProvider, useModal }
export type { ModalContextType }
