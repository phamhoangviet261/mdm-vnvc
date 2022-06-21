import { FC, useCallback, useEffect, useState } from "react";
import styled from 'styled-components'
import { theme } from "styles/theme"
import SearchIcon from "@mui/icons-material/Search";

export const Wrapper = styled.div`
  margin: 0 auto;
  text-align: center;

  & h2 {
    font-size: 24px;
    color: ${theme?.colors?.blue0};
    font-weight: 700;
  }
  & p {
    font-size: 16px;
  }

  .wrap {
    margin: 0 100px;
    border-bottom: 1px solid ${theme?.colors?.blue0};
    padding-bottom: 60px;
    margin-bottom: 60px;
    
  }
  .find {
    margin-top: 20px;
    text-align: left;
    .search {
      margin-bottom: 20px;
      input {
        font-size: 18px;
        color: ${theme?.colors?.blue0};
        padding: 4px;
        padding-left: 10px;
        outline: none;
        border: solid 1px ${theme?.colors?.blue0};
        border-radius: 4px;
        margin-right: 10px;
      }
      svg {
        font-size: 32px;
      }
      path: {
        fill: ${theme?.colors?.blue0};
        cursor: pointer;
      }
      svg:hover {
        fill: ${theme?.colors?.pink4};
      }
    }

    .find-top {
      display: flex;
      justify-content: space-between;
    }

    .tab-wrap {
      display: flex;
      span {
        line-height: 1.8;
        font-size: 16px;
      }
      .tab-item {
        margin-left: 20px;
        font-size: 20px;  
        cursor: pointer;
        font-weight: bold;

      }
    }

    .list-center {
      margin-top: 20px;
      li {
        padding: 10px 0;
      }
      h2 {
        font-size: 18px;
      }
    }
    
  }
  

  

  .active {
    font-weight: bold;
    color: ${theme?.colors?.blue0};
  }
`
export const Title = styled.h1`
  font-size: 32px;
  text-transform: uppercase;
  color: ${theme?.colors?.blue0};
  font-weight: bold;
  
`
export default function NearestCenter () {
  const [tab, setTab] = useState(true)
  return (
    <Wrapper>
        <div className="wrap">
          <Title>Trung tâm gần bạn nhất</Title>
          <h2>VNVC Hoàng Văn Thụ:</h2>
          <p>198 Hoàng Văn Thụ, P.9, Q.Phú Nhuận, TP.HCM</p>
        </div>
        <div className="wrap">
          <Title>Tìm trung tâm</Title>
          <div className="find">
            <div className="find-top">
              <div className="search">
                <input type="text" placeholder="Tìm trung tâm" />
                <button>
                  <SearchIcon />
                </button>
              </div>
              <div className="tab-wrap">
                <span>Tìm theo:</span>
                { tab? 
                <>
                  <div className="tab-item active">Hồ Chí Minh</div>
                  <div className="tab-item" onClick={() => setTab(false)}>Hà Nội</div></>
                  : 
                <>
                  <div className="tab-item" onClick={() => setTab(true)}>Hồ Chí Minh</div>
                  <div className="tab-item active">Hà Nội</div>
                </>}
                
              </div>
            </div>
            <div className="list-center">
              <ul>
                <li>
                  <h2>VNVC Hoàng Văn Thụ:</h2>
                  <p>198 Hoàng Văn Thụ, P.9, Q.Phú Nhuận, TP.HCM</p>
                </li>
                <li>
                  <h2>VNVC Hoàng Văn Thụ:</h2>
                  <p>198 Hoàng Văn Thụ, P.9, Q.Phú Nhuận, TP.HCM</p>
                </li>
                <li>
                  <h2>VNVC Hoàng Văn Thụ:</h2>
                  <p>198 Hoàng Văn Thụ, P.9, Q.Phú Nhuận, TP.HCM</p>
                </li>
              </ul>
            </div>
          </div>
          
        </div>
    </Wrapper>

  );
}
