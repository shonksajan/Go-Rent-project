import './rating.css'
import React from 'react';
import { Rate } from 'antd';
function Rating() {
    return(
        <>
        <div className='card'>
            <div className='rate-head'>
            <h4> Customer Rating</h4>
</div>
             <Rate disabled defaultValue={2} />
             <Rate disabled defaultValue={3} />
             <Rate disabled defaultValue={4} />
             <Rate disabled defaultValue={5} />
        </div>
        </>
    )
}
export default Rating;