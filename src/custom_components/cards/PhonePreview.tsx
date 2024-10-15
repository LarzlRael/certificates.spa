import { getTimeNow } from "@/utils/utils";
import "./PhoneCard.css";
import { useState } from "react";
import { webIconOnlyLogo, webName } from "@/constants/web-constants";

interface PhonePreviewProps {
  title?: string;
  body?: string;
  imageUrl?: string;
}
export const PhonePreview = ({ title, body, imageUrl }: PhonePreviewProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selected, setSelected] = useState(1);
  /* console.log(imageUrl); */
  return (
    <div className='Notification__preview'>
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <span
          className={selected === 1 ? "  Notifications__selected " : "selected"}
          onClick={() => {
            setSelected(1);
            setIsExpanded(false);
          }}
        >
          Estado inicial
        </span>
        <span
          className={selected === 2 ? " Notifications__selected " : "selected"}
          onClick={() => {
            setSelected(2);
            setIsExpanded(true);
          }}
        >
          Vista expandida
        </span>
      </div>

      <div
        className='notification'
        style={{
          height: isExpanded ? "240px" : "150px",
          transition: "all 0.1s ease",
        }}
      >
        <div className='notification__header'>
          <img className='notification__logo' src={webIconOnlyLogo} alt={webName} />
          <span className='notification__title'>{webName}</span>
          <span className='notification__time'>{getTimeNow()}</span>
        </div>

        <div
          className={`notification__body ${
            isExpanded && "notification__body-expanded"
          }`}
        >
          <div className='notification__content'>
            <span className='notification__content-title'>
              {title || "Titulo de la notificación"}
            </span>

            <span className='notification__content-text'>
              {body || "Contenido de la notificación"}
            </span>
          </div>
          <img
            className='notification__image'
            src={imageUrl || "https://via.placeholder.com/100x100"}
            alt='Notification Image'
          />
        </div>
      </div>
    </div>
  );
};
