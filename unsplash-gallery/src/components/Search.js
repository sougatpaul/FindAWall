import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { ReactComponent as SearchIcon } from "../assets/search-solid.svg";

import { setKeyword, setImages, setPage } from "../actions/imagesActions";

const Form = styled.form`
  display: flex;
  background: #fff;
  padding: 0.5rem;
  padding-right: 0;
  border-radius: 0.5rem;
  overflow: hidden;
  width: 100%;
  max-width: 38rem;
  transition: width ease 0.2s;
  /* border: 1px solid white; */

  input {
    flex: 1;
    background: none;
    border: none;
    padding: 0.5rem 0.5rem;
  }

  button {
    border-radius: 0.5rem;
    border: none;
    background: none;
    padding: 0 1rem;
    font-weight: bold;
    font-size: 0.9rem;
    /* color: white; */
    cursor: pointer;

    svg {
      height: 1.5rem;
    }
  }
`;

const Search = (props) => {
  const [search, setSearch] = useState("");
  const formRef = useRef();

  useEffect(() => {
    setSearch(props.keyword || "");
  }, [props.keyword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const keyword = search.trim();

    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      props.dispatch(setKeyword(keyword));
      props.dispatch(setImages({ page: 1, imageCount: 15, keyword }));
      props.dispatch(setPage(2));
    }, 200);
  };

  return (
    <Form
      ref={formRef}
      className={props.showNavSearch ? "visible" : ""}
      onSubmit={handleSubmit}
    >
      <input
        onFocus={() => {
          formRef.current.classList.add("focus");
        }}
        onBlur={() => {
          formRef.current.classList.remove("focus");
        }}
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for.."
      />
      <button type="submit" aria-label="Search photos">
        <SearchIcon />
      </button>
    </Form>
  );
};

const mapStateToProps = (state) => ({
  keyword: state.imagesReducer.keyword,
  showNavSearch: state.appReducer.showNavSearch
});

export default connect(mapStateToProps)(Search);
