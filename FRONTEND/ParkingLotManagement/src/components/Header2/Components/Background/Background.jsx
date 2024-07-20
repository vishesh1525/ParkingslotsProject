import './Background.css';
import video2 from '../../assets/video2.mp4';
import image4 from '../../assets/image4.webp';
import image5 from '../../assets/image5.jpg';
import image6 from '../../assets/image6.jpg';

const Background = ({ playStatus, heroCount }) => {
    if (playStatus) {
        return (
            <video className='background fade-in' autoPlay loop muted>
                <source src={video2} type='video/mp4' />
                Your browser does not support the video tag.
            </video>
        );
    } else if (heroCount === 0) {
        return <img src={image4} className='background fade-in' alt="Background 1" />;
    } else if (heroCount === 1) {
        return <img src={image5} className='background fade-in' alt="Background 2" />;
    } else if (heroCount === 2) {
        return <img src={image6} className='background fade-in' alt="Background 3" />;
    }
    return null; // Add a default return in case none of the conditions match
};

export default Background;

/*import './Background.css'
import video2 from '../../assets/video2.mp4'
import image4 from '../../assets/image4.webp'
import image5 from '../../assets/image5.jpg'
import image6 from '../../assets/image6.jpg'
const Background=({playStatus,heroCount})=>{
    if(playStatus){
        return(
            <video className='background fade-in' autoPlay loop muted>
                <source src={video2} type='video/mp4'/>
            </video>
        )
    }
    else if(heroCount==0){
        return <img src={image4} className='backgound fade-in' alt=""/>
    }
    else if(heroCount==1){
        return <img src={image5} className='backgound fade-in' alt=""/>
    }
    else if(heroCount==2){
        return <img src={image6} className='backgound fade-in' alt=""/>
    }
}

export default Background
*/