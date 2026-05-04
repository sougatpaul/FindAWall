import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';

import Image from './Image';

import { setImages, extendImages, setPage } from '../actions/imagesActions';
import { connect } from 'react-redux';

const imageCount = 15;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const Notice = styled.div`
  width: 100%;
  padding: 2rem;
  color: #555;
  text-align: center;
`

const Images = ({images, page, keyword, loading, error, hasMore, dispatch}) => {

  useEffect(() => {
    dispatch(setImages({page,imageCount}));
    dispatch(setPage(page+1));
    // eslint-disable-next-line
  }, []);

  const fetchLatestImages = () => {
    dispatch(extendImages({page, imageCount, keyword: keyword}));
    dispatch(setPage(page+1));
  };

  return (
    <div>
      {error && <Notice>{error}</Notice>}
      {!loading && !error && images.length === 0 && (
        <Notice>No images found.</Notice>
      )}
      <InfiniteScroll
        dataLength={images.length}
        next={fetchLatestImages}
        hasMore={hasMore && !loading && !error}
        loader={<Notice>Loading...</Notice>}
        >
        <Container>
        {images.map((image, index) => (
          <Image
            key = {index}
            image = {image}
          />
        ))}
        </Container>
      </InfiniteScroll>
    </div>
  );
};

const mapStateToProps = (state) => ({
  images: state.imagesReducer.images,
  keyword: state.imagesReducer.keyword,
  page: state.imagesReducer.page,
  loading: state.imagesReducer.loading,
  error: state.imagesReducer.error,
  hasMore: state.imagesReducer.hasMore
})

export default connect(mapStateToProps)(Images);
