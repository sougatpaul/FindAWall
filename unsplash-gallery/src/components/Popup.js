import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import styled from "styled-components";

import { setImageObject, setPopupState } from "../actions/appActions";
import LoaderAnimation from './LoaderAnimation'

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  z-index: 6000;
  padding: 2rem;
  overflow-y: auto;

  @media (max-width: 36rem) {
    padding: 1rem;
  }
`;
const PopupCard = styled.div`
  margin: auto;
  width: 100%;
  max-width: 72rem;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 18rem;
  height: 80vh;
  max-height: 45rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f3f3f3;
  border-radius: 0.5rem;
  padding: 1rem;
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 0.5rem;
  }
`;

const TitleSection = styled.div`
  background-size: cover;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  align-items: center;

  .artist-section{
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border: solid 1px #c3c3c3;
    border-radius: 0.5rem;
    text-decoration: none;
    .artist-image {
      height: 2rem;
      width: 2rem;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      margin-right: 0.5rem;
      border-radius: 1rem;
    }
    span{
      font-weight: bold;
    }
  }

  .btn-download{
    margin-left: auto;
    padding: 0.8rem 2rem;
    border : none;
    color: #fff;
    background: #000;
    border-radius: 0.5rem;
    cursor: pointer;
    box-shadow: 4px 4px 15px rgba(0,0,0,0.1);
    text-decoration: none;
  }

  @media (max-width: 36rem) {
    .artist-section,
    .btn-download {
      width: 100%;
      justify-content: center;
      margin-left: 0;
    }
  }
`;

const toDataURL = (url) =>
  fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );

export const Popup = ({ dispatch, image }) => {
  const [imageSrc, setImageSrc] = useState();

  useEffect(() => {
    toDataURL(image.urls.regular).then((dataUrl) => {
      setImageSrc(dataUrl);
    });
    // eslint-disable-next-line
  }, []);

  const closePopup = () => {
    window.document.body.style.overflow = "auto";
    dispatch(setPopupState(false));
    dispatch(setImageObject({}));
  };

  return (
    <PopupOverlay
      onClick={closePopup}
    >
      <PopupCard onClick={(e) => e.stopPropagation()}>
        <TitleSection>
          <a href={image.user.portfolio_url} target="_blank" rel="noopener noreferrer" className="artist-section">
            <div
              className="artist-image"
              style={{
                backgroundImage: `url(${image.user.profile_image.small})`,
              }}
            ></div>
            <span>
              {image.user.name}
            </span>
          </a>
          <a href={image.links.download} target="_blank" rel="noopener noreferrer" className="btn-download">Download</a>
        </TitleSection>
        <ImageContainer>
          {imageSrc ? (
            <img src={imageSrc} alt={image.alt_description} />
          ) : (
            <LoaderAnimation />
          )}
        </ImageContainer>
      </PopupCard>
    </PopupOverlay>
  );
};

const mapStateToProps = (state) => ({
  image: state.appReducer.image,
});

export default connect(mapStateToProps)(Popup);
