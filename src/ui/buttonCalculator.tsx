import { Mathematic } from "src/functional/math";
import { Button } from "./button"
import { basicOp, funcButtons, grayButtons, interpreter, numberButtons, roots } from "src/consts/const";
interface IProps {
    setClockFace:  React.Dispatch<React.SetStateAction<string>> 
    clockFace: string
}
export const ButtonCalculator = ({ setClockFace, clockFace }: IProps) => {

    const handleButtonClick = (value: string) => {
        if(value === 'AC')
            setClockFace('')
        else if(value === '<')
            setClockFace(clockFace.substring(0, clockFace.length-1))
        else if(value === '='){
            try {
                if (!clockFace.trim()) {
                    setClockFace('');
                    return;
                }
                
                if (clockFace.includes('/0') && !clockFace.includes('/0.')) {
                    throw new Error('Division by zero');
                }
                
                const result = Mathematic(clockFace);
                
                if (!isFinite(result)) {
                    throw new Error();
                }
                
                const formattedResult = Number.isInteger(result) 
                    ? result.toString() 
                    : result.toString().replace(/(\.\d*?[1-9])0+$/, '$1');
                
                setClockFace(formattedResult);
            } catch (error) {
                let errorMessage = 'Error';
                
                if (error instanceof Error) {
                    if (error.message.includes('Division by zero')) {
                        errorMessage = 'Деление на 0';
                    } 
                }
                
                setClockFace(errorMessage);
                setTimeout(() => {
                    setClockFace(prev => prev === errorMessage ? '' : prev);
                }, 3000);
            }
        }
        else if(roots.includes(value) && numberButtons.includes(clockFace[clockFace.length-1])){
            return
        }
        else if (value === '+/-') {
            if (!clockFace) return;
            const parts = clockFace.split(/([+\-*/^])/).filter(Boolean);
            if (parts.length === 0) return;               
            const lastPart = parts[parts.length - 1];
            let lastOp = '';
            if(parts.length>1)
                lastOp = parts[parts.length - 2]
            if (lastPart === '') return;
            if(lastOp !== ''){
                switch(lastOp){
                    case '+':{
                        parts[parts.length - 2] = '-'
                        break
                    }
                    case '-':{
                        parts[parts.length - 2] = '+'
                        break
                    }
                    default:{
                        parts[parts.length - 1] = '(-' + lastPart + ')';  
                    }         
                }
            }
            else{
                parts[parts.length - 1] = '(-' + lastPart + ')';               
            }
            console.log(parts)
            setClockFace(parts.join(''));
            return;
        }
        else{
            let element: string = value
            if(interpreter.includes(element)){
                if(clockFace.length === 0)
                    return
                element = '^'
                if(value === '²'){
                    element += '2'
                }
                else if(value === '³'){
                    element += '3'
                }
            }
            else if(roots.includes(element)){
                element = '√'
                if(value === '√'){
                    element = '2√'
                }
                else if(value === '∛'){
                    element = '3√'
                }
            }
            if(clockFace.length > 0) {
                if(basicOp.includes(element[0])){
                    if(!basicOp.includes(clockFace[clockFace.length - 1]))
                        setClockFace(prev => prev + element);
                }
                else {
                    setClockFace(prev => prev + element);
                }

            }
            else if(!basicOp.includes(element[0]))
                setClockFace(prev => prev + element);
        }
    };

  

  
    return (
      <div className="buttonCalculator">
        <div className="functional__button">
          {funcButtons.map(btn => (
            <Button 
              key={btn}
              textButton={btn}
              handleButtonClick={handleButtonClick}
              className={grayButtons.includes(btn) ? 'gray__button' : ''}
            />
          ))}
        </div>
        <div className="number_button">
          {numberButtons.map(num => (
            <Button 
              key={num}
              textButton={num}
              handleButtonClick={handleButtonClick}
              className={grayButtons.includes(num) ? 'gray__button' : ''}
            />
          ))}
        </div>
      </div>
    );
  };