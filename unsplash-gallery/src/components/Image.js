import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { setPopupState, setImageObject } from '../actions/appActions';

const ImageContainer = styled.div`
  position: relative;
  width: 20rem;
  max-width: calc(100vw - 2rem);
  height: 20rem;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 0.5rem;
  margin:1rem;
  background: #f3f3f3;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  .artist-overlay{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.4);
    opacity: 0;
    transition: opacity ease 0.2s;
    cursor: pointer;
    padding: 1rem;
    display: flex;
    justify-content: center;

    .artist-card{
      padding: 0.5rem 1rem;
      background: #f3f3f3;
      border-radius: 0.5rem;
      margin-top: auto;
      display: flex;
      align-items: center;

      .artist-image{
        width: 2rem;
        height: 2rem;
        margin-right: 0.5rem;
        border-radius: 1rem;
        border: 1px solid #ccc;
        background-size: contain;
      }
    }
    &:hover{
      opacity: 1
    }
  }
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const Image = ({image, dispatch}) => {
  const photoUrl = image && image.urls && (
    image.urls.small ||
    image.urls.regular ||
    image.urls.thumb
  );
  const user = (image && image.user) || {};
  const profileImage = user.profile_image && (
    user.profile_image.small ||
    user.profile_image.medium ||
    user.profile_image.large
  );

  if (!photoUrl) {
    return null;
  }

  return (
    <ImageContainer>
      <Photo
        src={photoUrl}
        alt={image.alt_description || image.description || 'Unsplash photo'}
      />
      <div 
        className="artist-overlay"
        onClick = {()=>{
          window.document.body.style.overflow = 'hidden'
          dispatch(setPopupState(true));
          dispatch(setImageObject(image));
        }}
      >
        <div className="artist-card">
          <div 
            className="artist-image"
            style={{
              backgroundImage : profileImage ? `url(${profileImage})` : 'none'
            }}
          >
          </div>
          {user.name || 'Unknown creator'}
        </div>
      </div>
    </ImageContainer>
  );
}

export default connect()(Image);
