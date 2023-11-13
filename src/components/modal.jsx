export const Modal = ({ isOpen, onClose, title, subtitle, content, acceptBtn }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        {title && <h1>{title}</h1>}
        {subtitle && <p className="modal-title">{subtitle}</p>}
        <div>
          {content && content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <button className="accept-button" onClick={onClose}>{acceptBtn}</button>
      </div>
    </div>
  );
};
