

import React, { useState } from 'react';
import { questions } from '../questions';
import { getRandom } from '../helpers';

const QuestionPage = () => {

    function findQuestion() {
        return questions[getRandom(questions.length)];
    }

    const [value, setValue] = useState('');                 // стэйт значения радиокнопок
    const [question, setQuestion] = useState(findQuestion); // стэйт открытого вопроса
    const [count, setCount] = useState(1);                  // счётчик вопросов
    const [correct, setCorrect] = useState(0);              // счётчик правильных ответов    
    const counter = 10;                                      // количество задаваемых вопросов
    
    // обработчик значений радиокнопок
    function handleChange(event) {
        setValue(event.target.value);
    }

    // обработчик клика на кнопку
    function handlerClick(e) {
        e.preventDefault();

        // изменяю счётчик вопросов
        setCount(count + 1);
        
        // изменяю счётчик правильных ответов
        value === question.correct ? setCorrect(correct + 1) : setCorrect(correct);

        // стираю значение старых ответов
        setValue('');

        // нахожу новый вопрос
        setQuestion(findQuestion);
    }

    function getStart() {
        setValue('');
        setCount(0);
        setCorrect(0);
        setQuestion(findQuestion);
    }

    return (
        <div className='container bc-green text-center p-20'>
            {count <= counter ?
                <form>
                    <p>{count} из {counter}</p>
                    <h2 className='mt-0'>{question.question}</h2>
                    
                    <div className='flex mb-20'>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="radio"
                                    value="1"
                                    checked={value === '1' ? true : false}
                                    onChange={handleChange}
                                />
                                <span className='custom-radio'>{question.variants[0]}</span>
                            </label>
                            <br />
                            <br />
                            <label>
                                <input
                                    type="radio"
                                    name="radio"
                                    value="2"
                                    checked={value === '2' ? true : false}
                                    onChange={handleChange}
                                    />
                                <span className='custom-radio'>{question.variants[1]}</span>
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="radio"
                                    value="3"
                                    checked={value === '3' ? true : false}
                                    onChange={handleChange}
                                    />
                                <span className='custom-radio'>{question.variants[2]}</span>
                            </label>
                            <br />
                            <br />
                            <label>
                                <input
                                    type="radio"
                                    name="radio"
                                    value="4"
                                    checked={value === '4' ? true : false}
                                    onChange={handleChange}
                                    />
                                <span className='custom-radio'>{question.variants[3]}</span>
                            </label>
                        </div>
                        
                    </div>

                    <button className='btn' type='submit' onClick={handlerClick}>следующий вопрос</button>
                </form>
                :
                <div>
                    <h2>результат</h2>
                    <p>{correct} из {counter}</p>
                    <button className='btn' onClick={getStart}>начать заново</button>
                </div>
            }
        </div>
    );
}

export default QuestionPage;
