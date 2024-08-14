"use client";

import GatheringList from "@/components/gathering/GatheringList";
import { GatheringCategoryListType } from "@/types/GatheringCategoryDto";
import UrlQueryStringToObject from "@/utils/UrlQueryStringToObject";
import { useRef, useState } from "react";

interface IgatheringCategoryList {
  gatheringCategoryList: GatheringCategoryListType;
  sortDefaultValue: string;
}

const GatheringListContainer = ({gatheringCategoryList, sortDefaultValue}:IgatheringCategoryList) => {
  const [isModal, setIsModal] = useState(false);
  const [isExcludeCompleted, setIsExcludeCompleted] = useState(true)
  const [activeGatheringCategoryId, setActiveGatheringCategoryId] = useState(0);
  const keywordRef = useRef<HTMLInputElement>(null);
  const checkExcludeCompleteGatheringHandler = () => {
    setIsExcludeCompleted(prev => !prev);
    let _url = `/gathering?`;
    let temp = UrlQueryStringToObject(window.location.href) || {};
      delete temp.isExclude;
      if (isExcludeCompleted) {
        temp.isExclude = "false";
      }
      Object.entries(temp).map(i => {
        _url += i[0]+"="+i[1]+"&"
      })      
    if (_url.endsWith("&")) {
      _url = _url.slice(0, -1);
    }
    console.log("GatheringListContainer.tsx 파일 : ", _url);
    window.history.pushState(null, "", _url);
  } 
  const changeGatheringCategoryHandler = (id: number) => {
    setActiveGatheringCategoryId(id);
    let _url = `/gathering?`;
    let temp = UrlQueryStringToObject(window.location.href) || {};
    delete temp.gatheringCategoryId;
    if (id != 0) {
      temp.gatheringCategoryId = id;
    }
    Object.entries(temp).map(i => {
      _url += i[0]+"="+i[1]+"&"
    })      
    if (_url.endsWith("&")) {
      _url = _url.slice(0, -1);
    }
    console.log("GatheringListContainer.tsx 파일 : ", _url);
    window.history.pushState(null, "", _url);
  }

  const sortHandler = (value: string) => {
    let _url = `/gathering?`;
    let temp = UrlQueryStringToObject(window.location.href) || {};
    delete temp.sort;
    if (value != "") {
      temp.sort = value;
    }
    Object.entries(temp).map(i => {
      _url += i[0]+"="+i[1]+"&"
    })      
    if (_url.endsWith("&")) {
      _url = _url.slice(0, -1);
    }
    console.log("GatheringListContainer.tsx 파일 : ", _url);
    window.history.pushState(null, "", _url);
  }

  const searchHandler = (value: string) => {
    let _url = `/gathering?`;
    let temp = UrlQueryStringToObject(window.location.href) || {};
    delete temp.keyword;
    if (value != "") {
      temp.keyword = value;
    }
    Object.entries(temp).map(i => {
      _url += i[0]+"="+i[1]+"&"
    })      
    if (_url.endsWith("&")) {
      _url = _url.slice(0, -1);
    }
    console.log("GatheringListContainer.tsx 파일 : ", _url);
    window.history.pushState(null, "", _url);
  }

  return (
    <GatheringList
      isModal={isModal}
      closeModal={() => setIsModal(false)}
      openModal={() => setIsModal(true)}
      gatheringCategoryList={gatheringCategoryList}
      isExcludeCompleted={isExcludeCompleted}
      activeGatheringCategoryId={activeGatheringCategoryId}
      checkExcludeCompleteGatheringHandler={checkExcludeCompleteGatheringHandler}
      changeGatheringCategoryHandler={changeGatheringCategoryHandler}
      sortHandler={sortHandler}
      searchHandler={searchHandler}
      keywordRef={keywordRef}
      sortDefaultValue={sortDefaultValue}
    />
  );
};
export default GatheringListContainer;
