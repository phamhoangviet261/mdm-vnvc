import React from 'react'
import styled from 'styled-components'

const Header = styled.div`
    display: flex;
    margin: 0 auto;
    margin-top: 20px;
    width: 100%;
    max-width: 1200px;
    background-color: #2A388A;
    height: 80px;
    border-top: 4px solid #FF7400;
`

const Filter = styled.div`
    width: 60%;
    margin: auto;
    display: flex;
`

const Label = styled.label`
    font-size: 16px;
    font-weight: 700;
    color: white;
    margin-right: 50px;
`

const Select = styled.select`
    height: 34px;
    outline: none;
    border-radius: 50px;
    flex: 1;
    color: #555;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 6px 12px;
    font-size: 14px;
`

const HeaderAdvisory = () => {
  return (
    <Header>
        <Filter>
            <Label>Chúng tôi có thể giúp gì cho bạn?</Label>
            <Select>
                <option>Tất cả chủ đề</option>
                <option>Vắc xin cho trẻ em</option>
                <option>Vắc xin cho người lớn</option>
                <option>Bệnh truyền nhiễm</option>
                <option>Phương pháp phòng ngừa</option>
                <option>Chi phí</option>
                <option>Thủ tục</option>
            </Select>
        </Filter>
    </Header>
  )
}

export default HeaderAdvisory