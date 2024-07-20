import './Hero.css';
import arrow_btn from '../../assets/right-arrow.png';
import play_icon from '../../assets/play.png';
import pause_icon from '../../assets/pause-button.png';
// import video from "../../assets/video1.mp4"
const Hero = ({ heroData, setHeroCount, heroCount, setPlayStatus, playStatus }) => {
    return (
        <div className='hero'>
            <div className='hero-text'>
                <p>{heroData.text1}</p>
                <p>{heroData.text2}</p>
            </div>
            <div className='hero-explore'>
                <p>explore the features</p>
                <img src={arrow_btn} alt="Explore features" />
            </div>
            <div className='hero-dot-play'>
                <ul className='hero-dots'>
                    <li onClick={() => setHeroCount(0)} className={heroCount === 0 ? "hero-dot orange" : "hero-dot"}></li>
                    <li onClick={() => setHeroCount(1)} className={heroCount === 1 ? "hero-dot orange" : "hero-dot"}></li>
                    <li onClick={() => setHeroCount(2)} className={heroCount === 2 ? "hero-dot orange" : "hero-dot"}></li>
                </ul>
                <div className='hero-play'>
                    <img onClick={() => setPlayStatus(!playStatus)} src={playStatus ? pause_icon : play_icon} alt="Play/Pause" />
                    <p>see the video</p>
                </div>
            </div>
        </div>
    );
};

export default Hero;

/*import './Hero.css'
import arrow_btn from '../../assets/right-arrow.png'
import play_icon from '../../assets/play.png'
import pause_icon from '../../assets/pause-button.png'
const Hero=({heroData,setHeroCount,heroCount,setPlayStatus,playStatus})=>{
    return (
        <div className='hero'>
            <div className='hero-text'>
                <p>{heroData.text1}</p>
                <p>{heroData.text2}</p>
            </div>
            <div className='hero-explore'>
                <p>explore the features</p>
                <img src={arrow_btn} alt=""/>
                <p></p>
            </div>
            <div className='hero-dot-play'>
                <ul className='hero-dots'>
                    <li onClick={()=>setHeroCount(0)} className={heroCount==0?"hero-dot orange":"hero-dot"}></li>
                    <li onClick={()=>setHeroCount(0)} className={heroCount==1?"hero-dot orange":"hero-dot"}></li>
                    <li onClick={()=>setHeroCount(0)} className={heroCount==2?"hero-dot orange":"hero-dot"}></li>
                </ul>
                <div className='hero-play'>
                    <img onClick={()=>setPlayStatus(!playStatus)} src={playStatus?pause_icon:play_icon} alt="" />
                    <p>see the video</p>
                </div>
            </div>

        </div>

    )
}

export default Hero
*/