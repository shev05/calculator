interface IProps {
    clockFace : string,
}
export const ClockFace = ({clockFace}:IProps) =>{
    return(
        <div className="clockFace">
            <p className="clockFace__text">{clockFace}</p>
        </div>
    )
}