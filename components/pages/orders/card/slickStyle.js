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
`
