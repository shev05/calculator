interface IProps {
    textButton : string,
    className? : string,
    handleButtonClick?: (value: string) => void;
}

export const Button = ({textButton, className, handleButtonClick} :IProps) =>{

    return(
        <div className={className}>
            <button 
            className="default__button"
            onClick={() => handleButtonClick && handleButtonClick(textButton)}
            >{textButton}</button>
        </div>
    )
}