import styled from 'styled-components'

export const ProductListWrap = styled.div`
  .slick-track {
    width: 100%;
  }

  .slick-slide {
    position: relative;
  }
  .slick-arrow {
    position: absolute;
    top: -18px;
  }

  .slick-dots.slick-thumb {
    display: block !important;
    bottom: 19px !important;
  }
  .slick-dots.slick-thumb li {
    display: block;
    margin: 5px 13px;
    width: 29px;
    height: 29px;
    border: 1px solid #fff;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  .slick-dots.slick-thumb li.slick-active {
    border: 2px solid #fcb357;
  }
  .slick-pdt-thumb.slick-dots.slick-thumb {
    background: #fff;
    width: 70px;
    border-radius: 10px;
    padding: 10px;
    max-height: 208px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .slick-pdt-thumb.slick-dots.slick-thumb::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ,
  .slick-pdt-thumb.slick-dots.slick-thumb::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: #ccc;
  }
  ,
  .slick-pdt-thumb.slick-dots.slick-thumb::-webkit-scrollbar-track {
    border-radius: 4px;
    background: none;
  }

  @media screen and (min-width: 960px) {
    .slick-pdt-thumb.slick-dots.slick-thumb {
      max-height: 300px;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
  .slick-pdt-thumb.slick-dots li {
    width: 44px;
    height: 44px;
    margin-left: 0px;
    margin-right: 0px;
    cursor: pointer;
    border: 2px solid #e6e6e6;
  }
`
export const ProductDetailWrap = styled.div`
  .slick-track {
    width: 100%;
  }

  .slick-slide {
    position: relative;
  }
  .slick-arrow {
    position: absolute;
    top: -18px;
  }

  .slick-dots.slick-thumb {
    display: block !important;
    bottom: 19px !important;
  }
  .slick-dots.slick-thumb li {
    display: block;
    margin: 5px 13px;
    width: 29px;
    height: 29px;
    border: 1px solid #fff;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  .slick-dots.slick-thumb li.slick-active {
    border: 2px solid #fcb357;
  }
  .slick-pdt-thumb.slick-dots.slick-thumb {
    padding-top: 10%;
    left: 0;
    top: 0;
    bottom: 0 !important;
    margin: auto;
    height: auto;
    max-height: 280px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: transparent;
  }

  .slick-pdt-thumb.slick-dots.slick-thumb::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ,
  .slick-pdt-thumb.slick-dots.slick-thumb::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: #ccc;
  }
  ,
  .slick-pdt-thumb.slick-dots.slick-thumb::-webkit-scrollbar-track {
    border-radius: 4px;
    background: none;
  }

 

  .slick-pdt-thumb.slick-dots.slick-thumb li {
    background-color: #fff;
  }

  @media screen and (max-width: 959px) {
    .slick-list {
      margin-bottom: 15px;
    }

    .slick-pdt-thumb.slick-dots.slick-thumb {
      padding-top: 0
      max-height: auto;
      overflow-x: auto;
      overflow-y: hidden;
      width: auto;
      float: left;
      margin: 0 auto;
      position: relative;
      display: flex !important;
      gap: 10px;
      bottom: 0 !important;
      background: transparent;
      align-items: center;
      justify-content: space-between;
      flex-direction: row;
      left: 50%;
      transform: translateX(-50%);
      max-width: 100%;
    }

    .slick-pdt-thumb.slick-dots li {
      min-width: 35px;
      margin-rigth: 0px;
      margin-bottom: 0;
      width: 35px;
      height: 35px;
    }
  }

  @media screen and (max-width: 576px) {
    .slick-pdt-thumb.slick-dots li {
      min-width: 30px;
      width: 30px;
      height: 30px;
    }
  }
`
