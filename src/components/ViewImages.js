import * as React from 'react';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const ViewImages = ({ showImageViewer, images, closeModal }) => {
    return (
        <Modal onRequestClose={closeModal} visible={showImageViewer} transparent={true} >
                
            <ImageViewer imageUrls={images} />
        </Modal>
    );
}

export default ViewImages;