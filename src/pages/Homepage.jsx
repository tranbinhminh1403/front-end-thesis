import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SearchIcon from '@mui/icons-material/Search';

const Homepage = () => {
    const navigate = useNavigate();
  return (
    <div className='homepage'>
        <div style={{marginLeft: 50, marginTop: 50, fontSize: 25}}>
            <h1>Trang web cung cấp khả năng theo dõi và so sánh giá cả laptop</h1>
            <div style={{marginTop: 20}}>
                <div><DoneAllIcon/> Theo dõi hơn 1000 sản phẩm từ 3 cửa hàng trực tuyến nổi tiếng</div>
                <div><DoneAllIcon/> Dữ liệu được cập nhật hàng ngày</div>
            </div>
            <div><SearchIcon/> Bắt đầu tìm kiếm hoặc so sánh sản phẩm tại đây</div>
            <div style={{marginTop: 20}}>
                <Button onClick={() => navigate('/search')} variant='contained' style={{marginRight: 5}}>Tìm kiếm</Button>
                <Button onClick={() => navigate('/comparison')} variant='outlined'>So sánh</Button>
            </div>
        </div>
    </div>
  )
}

export default Homepage