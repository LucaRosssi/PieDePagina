import Counter from "./Counter"

const SkeletonItemDetail = ({detail}) => {

    return (
    <div className='item-detail-container'>
            <div className='item-info'>
                <div className='item-image-container'>
                    <div className='skeleton-item-image skeleton-image skeleton'></div>
                </div>
                <div className='item-detail'>
                    <div className='title'>
                        <div >
                            <div className='skeleton skeleton-text'></div>
                            <div className='skeleton skeleton-author'></div>
                            <div className='skeleton skeleton-author'></div>
                        </div>
                        <div className="skeleton skeleton-counter"></div>
                    </div>
                </div>
            </div>
            <div className='skeleton skeleton-h2'></div>
            <div className='skeleton skeleton-p'></div>
            <div className='skeleton skeleton-p'></div>
            <div className='skeleton skeleton-p'></div>
        </div>
    )

}

export default SkeletonItemDetail