import { useState, useEffect, useRef } from 'react';
import { Modal } from 'bootstrap';

interface SaveDialogProps {
  proposedName: string;
  onClose: () => void;
  onSave: (filename: string, format: string) => void;
}

const SaveDialog = ({ proposedName, onClose, onSave }: SaveDialogProps) => {
  const [filename, setFilename] = useState(proposedName);
  const [format, setFormat] = useState('image/png');
  const modalRef = useRef<HTMLDivElement>(null);
  const bsModal = useRef<Modal | null>(null);

  useEffect(() => {
    setFilename(proposedName);
  }, [proposedName]);

  useEffect(() => {
    if (modalRef.current) {
      bsModal.current = new Modal(modalRef.current);
      bsModal.current?.show();

      const currentModal = modalRef.current;
      currentModal.addEventListener('hidden.bs.modal', onClose);

      return () => {
        currentModal.removeEventListener('hidden.bs.modal', onClose);
        bsModal.current?.dispose();
      };
    }
  }, [onClose]);

  const handleSave = () => {
    onSave(filename, format);
    onClose();
  };

  return (
    <div className="modal fade" ref={modalRef} tabIndex={-1} aria-labelledby="saveDialogLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="saveDialogLabel">
              Save File As...
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="filenameInput" className="form-label">
                Filename
              </label>
              <input
                type="text"
                className="form-label d-block w-100 p-2 border rounded"
                id="filenameInput"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formatSelect" className="form-label">
                Format
              </label>
              <select
                className="form-select"
                id="formatSelect"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
              >
                <option value="image/png">PNG</option>
                <option value="image/jpeg">JPEG</option>
                <option value="image/webp">WebP</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveDialog;
