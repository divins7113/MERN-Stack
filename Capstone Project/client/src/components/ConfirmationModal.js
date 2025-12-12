import React from 'react';

const ConfirmationModal = ({ isOpen, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
    };

    const modalStyle = {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center'
    };

    const buttonContainerStyle = {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'space-around'
    };

    const buttonStyle = {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1rem'
    };

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <p>{message}</p>
                <div style={buttonContainerStyle}>
                    <button
                        onClick={onConfirm}
                        style={{ ...buttonStyle, backgroundColor: '#dc3545', color: 'white' }}
                    >
                        Confirm
                    </button>
                    <button
                        onClick={onCancel}
                        style={{ ...buttonStyle, backgroundColor: '#6c757d', color: 'white' }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
